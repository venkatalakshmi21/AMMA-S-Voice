const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AMMA'S VOICE Backend is Running!"
  });
});


/*
  POST /api/speak

  Receives:
  - text
  - speed

  Sends the text to Rime AI
  Returns generated audio to frontend
*/

app.post("/api/speak", async (req, res) => {
  try {
    const { text, speed=1.0 } = req.body;
    const speedAlpha=Number(speed);
    speedAlpha: speedAlpha

if (speed === "Medium") {
  speedAlpha = 0.7;
}

if (speed === "High") {
  speedAlpha = 0.5;
}

if (speed === "slow") {
  speedAlpha = 0.6;
}
    if (!text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }
    speedAlpha: Number(speed)

    // Convert learning speed into a REAL NUMBER for Rime

    if (speed === "slow") {
      speedAlpha = 0.8;
    } else if (speed === "very-slow") {
      speedAlpha = 0.6;
    } else if (typeof speed === "number") {
      speedAlpha = speed;
    }

    console.log("Text:", text);
    console.log("Requested Speed:", speed);
    console.log("Rime speedAlpha:", speedAlpha);
    console.log("Type:", typeof speedAlpha);

    const response = await fetch(
      "https://users.rime.ai/v1/rime-tts",
      {
        method: "POST",

        headers: {
          "Accept": "audio/wav",
          "Authorization": `Bearer ${process.env.RIME_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          text: text,
          speaker: "peak",
          modelId: "mistv3",
          lang: "eng",

          // IMPORTANT: This must be a NUMBER
          speedAlpha: Number(speedAlpha)
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("========== RIME ERROR ==========");
      console.error("Status:", response.status);
      console.error("Response Data:", errorText);
      console.error("================================");

      return res.status(response.status).json({
        error: "Rime API request failed",
        details: errorText
      });
    }

    const audioBuffer = await response.arrayBuffer();

    res.set({
      "Content-Type": "audio/wav"
    });

    res.send(Buffer.from(audioBuffer));

  } catch (error) {
    console.error("SERVER ERROR:", error);

    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
