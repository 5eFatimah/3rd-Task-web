# 3rd Task - ChatBot with Node.js and React

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
