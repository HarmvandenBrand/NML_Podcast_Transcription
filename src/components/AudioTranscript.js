import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { metadata, audio, transcript } from '../examplePodcast'; // example

function TranscriptView(props) {
	const { transcript, title } = props;

	return (
		<Container maxWidth={'md'} style={{ marginTop: '4vh', marginBottom: '8vh' }}>
			<Typography variant='h6'>{title}</Typography>
			<Typography component={'div'}>
				{transcript}
			</Typography>
		</Container>
	);
}

function AudioPlayer(props) {
	const { audioSrc, audioRef } = props;

	return (
		<audio
			controls
			style={{ position: 'fixed', bottom: 0, width: '100%' }}
			ref={audioRef}
		>
			<source src={audioSrc} type='audio/mpeg' />
		</audio>
	);
}

/**
 * Maps paragraph tags around each paragraph of the transcript.
 * For illustrative purposes, it also maps a span around the paragraph
 * with dummy (meaningless) timestamps to make the paragraph clickable.
 * 
 * @param {string} transcript the podcast transcript
 * @param {function} handleClick _onClick_ handler
 */
function mapParagraphTag(transcript, handleClick) {
	let paragraphs = transcript.split(/\r?\n/).filter(Boolean);
	// index as key is bad practice in general but as the order of 
	// the paragraphs is fixed this is not an issue here
	return paragraphs.map((p, idx) =>
		<p key={idx}>
			<span onClick={() => handleClick(idx)}>
				{p}
			</span>
		</p>);
}

function AudioTranscript(props) {
	const audioRef = React.useRef(null);

	const handleClick = (idx) => {
		audioRef.current.currentTime = Math.fround(idx * 20);
	};

	// example with dummy timestamps
	let transcriptParagraphs = mapParagraphTag(transcript, handleClick);

	return (
		<>
			<TranscriptView transcript={transcriptParagraphs} title={metadata.title}/>
			<AudioPlayer audioSrc={audio} audioRef={audioRef} />
		</>
	);
}

export default AudioTranscript;
