
import { useState, useRef } from "react";
import axios from "axios";
import { Mic, Square } from "lucide-react";

interface Props {
  setRecording: (val: boolean) => void;
  setLoading: (val: boolean) => void;
  loading: boolean;
  onData: (data: any) => void;
}

const VoiceRecorder = ({ setRecording, setLoading, loading, onData }: Props) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
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
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
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
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <>
      {!isRecording ? (
        <button
          disabled={loading}
          onClick={startRecording}
          className="p-2.5 border border-slate-300 rounded-md hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Start voice recording"
        >
          <Mic size={20} className="text-slate-700" />
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors font-medium flex items-center gap-2"
          title="Stop recording"
        >
          <Square size={16} fill="currentColor" />
          Stop
        </button>
      )}
    </>
  );
};

export default VoiceRecorder;