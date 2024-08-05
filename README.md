# 3rd Task - ChatBot with Node.js and React


https://github.com/user-attachments/assets/ebb7126e-e63e-4500-ab2c-2e58f766d8ae


### Setting Up the React App with Vite
1 - Create a new Vite project:
  ```
  npm create vite@latest
  ```
2 - Open the project in your preferred IDE.

### Configuring Environment Variables
 1 - Create a .env file in the root directory.
  ```
  VITE_OPEN_AI_KEY= <Secret Key>
  ```
### Installing Necessary Libraries
```
npm install openai          # To use the OpenAI API
npm install express         # To create the web server
npm install axios           # To handle HTTP requests
npm install cors            # To enable cross-origin requests between frontend and server
```
### Creating the Server
1 - Create a server.js file in the root directory.

2 - Initialize the OpenAI API and set up the server:
```
import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
const port = process.env.PORT || 3005;
const apiKey = process.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```
### Handling POST Requests
```
app.post("/chatbot", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
      model: "gpt-4o-mini",
      max_tokens: 100,
    });

    res.send(response.choices[0].message.content);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

```
### Bulid React Component
1 - In `App.tsx`, I created a basic container that includes:
  * A button to start recording, which captures voice input and displays it in the input box.
  * A button to send the question to the API.
  * A div to display the response.
```
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
```
2 - State and event handling for chatbot input/response.
```
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
```
3 - Define `startRecognition()` to Record for 5000ms and Save Voice Content
```
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
```
