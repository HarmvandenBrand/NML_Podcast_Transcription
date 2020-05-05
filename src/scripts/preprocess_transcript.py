#!/bin/python3
"""
Takes a transcript with timestamps on the word level.
Format: [[word, offset, duration, speaker_id], ... etc.]
Outputs the transcript timestamped on sentence level, 
and with lower precision.

Additional preprocessing: if multiple speakers occur within a sentence,
take a majority vote to decide who is the speaker of the sentence.
"""

import json
import os
import re
from collections import Counter

def load_transcript(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        print('Processing', filename)
        data = json.load(f)
    return data['transcript']

def get_full_text(transcript):
    return ' '.join([ word[0] for word in transcript ])

def get_words_per_speaker(transcript):
    all_speaker_ids = [ word[3] for word in transcript ]
    return { id:all_speaker_ids.count(id) for id in set(all_speaker_ids) }

def get_sentences(full_text):
    """
    Quick and dirty for ezpz inspection
    """
    return { index:sentence for index, sentence in enumerate(full_text.replace('?','.').split('. ')) }

def split_on_sentences(transcript):
    # Find indices for sentence splits
    split_ids = []
    for idx, word_data in enumerate(transcript):
        # Following line works, kudo's for who can explain why. I just tried that for fun...
        #splits.append(idx) if '.' in word_data[0] else ...
        if '.' in word_data[0] or '?' in word_data[0]: split_ids.append(idx)

    # Divide the transcript in chunks based on split points
    sentence_chunks = []
    prev_id = 0
    for id in split_ids:
        sentence_chunks.append(transcript[prev_id:id+1])
        prev_id = id+1
    return sentence_chunks

def determine_sentence_speaker(chunk):
    """
    Validate for a chunk of the transcript (e.g. sentence) that there is one speaker.
    If not, take a majority vote to decide the speaker
    """
    speaker_ids = [ word[3] for word in chunk ]
    if len(set(speaker_ids)) != 1:
        print("Multiple speakers within one sentence:\n", chunk )
        return Counter(speaker_ids).most_common(1)[0]
    return chunk[0][3]

def merge_sentences(transcript):
    """
    Convert from word representation to sentence representation
    N.B. to avoid rounding errors I only lower the precision at a later point
    """
    sentence_chunks = split_on_sentences(transcript)
    sentences = []

    for chunk in sentence_chunks:
        offset = chunk[0][1]
        end = chunk[-1][1]+chunk[-1][2] # offset of last word + its duration
        duration = end-offset
        sentence = ' '.join([word[0] for word in chunk])
        speaker_id = determine_sentence_speaker(chunk)
        sentences.append([sentence, offset, duration, speaker_id])
    return sentences

def lower_time_precision(transcript, factor):
    """
    Truncates precision of the timestamps (offset and duration)
    from units of 100 nanoseconds (10^-7) i.e. a 'tick'
    to milliseconds (10^-3).
    N.B. this introduces rounding errors, so you can't 
    accurately compute the next offset by summing all previous times
    N.B. disregards decimal places
    """
    return [[x[0], int(x[1]/factor), int(x[2]/factor), x[3]] for x in transcript]

def test(transcript):
    full_text = get_full_text(transcript)
    print(get_words_per_speaker(transcript))
    print(get_sentences(full_text))
    merge_sentences(transcript)
    lower_time_precision(transcript, 10000)

if __name__ == '__main__':

    factor = 10000  # lower timestamp precision with this factor
    
    for root, dirs, files in os.walk(r'.'):
        # Do not bother with hidden files and dirs
        files = [f for f in files if not f[0] == '.']
        dirs[:] = [d for d in dirs if not d[0] == '.']
        for file in files:
            if file == 'transcript.json':
                transcript = load_transcript(os.path.join(root,file))
                timestamped_sentences = lower_time_precision(merge_sentences(transcript), factor)
                with open(os.path.join(root,'sentence_transcript.json'), 'w') as f:
                    json.dump(timestamped_sentences, f)
