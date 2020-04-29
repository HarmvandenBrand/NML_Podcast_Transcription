#!/bin/python3

"""
Takes a transcript with timestamps on the world level 
of format: [[word, offset, duration, speaker_id], ... etc.]
and outputs a new transcript now timestamped on sentence level.

Additional preprocessing: if multiple speakers occur within a sentence,
take a majority vote to decide who is the speaker of the sentence.

TODO Important: also changes timestamps to milliseconds
Time seems to be a "tick" i.e. 100 nanoseconds (1 nanosecond = 1*10^-9 second) i.e. 1*10^-7 seconds.
So to convert to ms, divide the timestamp by 10.000

"""

import json
import os
import re
from collections import Counter

def load_transcript(filename):
    with open(filename, 'r', encoding='utf-8') as f:
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
    # TODO maybe use a regex instead. 
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
    Validate for a chunk of the transcript that there is one speaker
    if not, take a majority vote to decide the speaker
    """
    speaker_ids = [ word[3] for word in chunk ]
    if len(set(speaker_ids)) != 1:
        print("Multiple speakers:\n", chunk )
        return Counter(speaker_ids).most_common(1)[0]
    return chunk[0][3]

def merge_sentences(transcript):

    sentence_chunks = split_on_sentences(transcript)
    sentences = []

    # TODO convert timestamps to microseconds + handle rounding mistakes

    for chunk in sentence_chunks:
        offset = chunk[0][1]
        end = chunk[-1][1]+chunk[-1][2] # offset of last word + its duration
        duration = end-offset
        sentence = ' '.join([word[0] for word in chunk])
        speaker_id = determine_sentence_speaker(chunk)
        sentences.append([sentence, offset, duration, speaker_id])
    return sentences

def test(transcript):
    full_text = get_full_text(transcript)
    print(get_words_per_speaker(transcript))
    print(get_sentences(full_text))
    merge_sentences(transcript)

if __name__ == '__main__':
    
    for root, dirs, files in os.walk(r'.'):
        # Do not bother with hidden files and dirs
        files = [f for f in files if not f[0] == '.']
        dirs[:] = [d for d in dirs if not d[0] == '.']
        for file in files:
            if file == 'transcript.json':
                transcript = load_transcript(os.path.join(root,file))
                #test(transcript)
                timestamped_sentences = merge_sentences(transcript)
                with open(os.path.join(root,'sentence_transcript.json'), 'w') as f:
                    json.dump(timestamped_sentences, f)
