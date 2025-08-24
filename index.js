import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for pneumonia care in newborns." },
        { role: "user", content: message },
      ],
      max_tokens: 200,
    });

    res.json({ reply: response.choices[0].message?.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, I couldn't process your request." });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
