import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p className = "text-center">Microphone: {listening ? 'on' : 'off'}</p>
      <button className="btn btn-outline-dark ms-1" onClick = {SpeechRecognition.startListening}>Start</button>
      <button className="btn btn-outline-dark ms-1" onClick = {SpeechRecognition.stopListening}>Stop</button>
      <button className="btn btn-outline-dark ms-1" onClick = {resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;