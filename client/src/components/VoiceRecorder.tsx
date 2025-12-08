import { useState, useRef } from "react";
import axios from "axios";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseData , setResponseData] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    audioChunks.current = [];

    recorder.ondataavailable = (e) => {
      audioChunks.current.push(e.data);
    };

    recorder.start();

    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    setIsRecording(false);

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const audioFile = new File([audioBlob], "voice.webm", { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audio", audioFile);

      try {
        const res = await axios.post("http://localhost:5000/api/voice/parse", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // setResponseText(JSON.stringify(res.data, null, 2));
        setResponseData(res.data);

      } catch (err: any) {
        console.error(err);
        setResponseText("Error while processing audio!");
      }
    };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Microphone Voice Test</h2>

      {!isRecording ? (
        <button onClick={startRecording}> Start Recording</button>
      ) : (
        <button onClick={stopRecording}> Stop Recording</button>
      )}

      <h3>Backend Response:</h3>
      {/* <pre>{responseText}</pre>
       */}

       {responseData && (
        <div>
       <h4>{`Text = ${responseData.transcript}`}</h4>
        <h2> {`Title = ${responseData.title}`}</h2>
        <h3> {`Description = ${responseData.description}`}</h3>
        <h3>{`Priority = ${responseData.priority}`}</h3>
        <h3>{`DueDate = ${responseData.dueDate}`}</h3>
        <h3> {`Status = ${responseData.status}`}</h3>
        </div> ) }
    </div>
  );
};

export default VoiceRecorder;
