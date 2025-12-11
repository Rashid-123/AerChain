import { useState, useRef } from "react";
import axios from "axios";

interface Props {
  setRecording: (val: boolean) => void;
  setLoading: (val: boolean) => void;
  onData: (data: any) => void;
}
const VoiceRecorder = ({setRecording, setLoading, onData} : Props) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const[isRecording , setIsRecording] = useState<boolean>(false);
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
    setRecording(true);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    setRecording(false);
    setIsRecording(false);
    setLoading(true);

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const audioFile = new File([audioBlob], "voice.webm", { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audio", audioFile);

      try {
        const res = await axios.post("http://localhost:5000/api/voice/parse", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        onData(res.data);

      } catch (err: any) {
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
  };

  return (
    <>
      {!isRecording ? (
        <button onClick={startRecording}> Start Recording</button>
      ) : (
        <button onClick={stopRecording}> Stop Recording</button>
      )}
    </>
  );
};

export default VoiceRecorder;
