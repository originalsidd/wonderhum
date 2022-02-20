import React, { useState, useEffect } from 'react'
import "./start.css"
import { FaPlay } from "react-icons/fa";
import { ReactMic } from 'react-mic';

const Start = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);

	useEffect(() => {
		navigator.getUserMedia({ audio: true },
			() => {
				console.log('Permission Granted');
				setIsBlocked(false);
			},
			() => {
				console.log('Permission Denied');
				setIsBlocked(true);
			},
		);
	}, []);

	const recordHandler = (event) => {
		if (isBlocked) {
    	console.log('Permission Denied');
  	} else {
			setIsRecording(!isRecording);
  	}
	}

	const audioHandler = (audio) => {
		const player = new Audio(audio.blobURL);
		player.play();
		console.log("Size: " + audio.blob.size);
		console.log("Time: " + (audio.stopTime - audio.startTime)/1000 + "s");
	}

  return (
		<div className="screen">
			<ReactMic
				record={isRecording}
				visualSetting="sinewave"
				className="sound-wave"
				onStop={audioHandler}
				strokeColor="ff0000"
				backgroundColor="#fff" 
			/>
			<button className="start-btn" onClick={recordHandler}>
				<FaPlay size={50} className="btn" />
			</button>
			{isRecording ? <div className="rec" /> : <div className="rec1" />}
		</div>
  )
}

export default Start