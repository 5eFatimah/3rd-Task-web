import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [response, setResponse] = useState<string>("كيف يمكنني مساعدتك ؟");
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
      const response = await axios.post("http://localhost:3005/chatbot", {
        question: value,
      });
      setResponse(response.data);
    };

  function startReconition () {
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.lang = "ar-SA";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      const startButton = document.getElementById("start");
      if (startButton) {
        startButton.classList.add('recording');
      }
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setValue(transcript);
    };

    recognition.onend = () => {
      const startButton = document.getElementById("start");
      if (startButton) {
        startButton.classList.remove('recording');
      }
    };

    recognition.start();

    setTimeout(() => {
      recognition.stop();
    }, 5000);
}

return (
    <div className="container">
      <div className="content">
        <input
          id="result"
          type="text"
          value={value}
          onChange={onChange}
        >
        </input>
        <button id="start" onClick={startReconition}>
            <i className="bi bi-mic-fill"></i>
        </button>
      </div>
      <div>
        <button className="button-s" onClick={handleSubmit}> أرسل!</button>
      </div>
      <div>
        <p>البوت: {response}</p>
      </div>
    </div>
  );
}

export default App;


