# 🎙️ AMMA'S VOICE

### Learn. Listen. Speak with Confidence.

AMMA'S VOICE is a voice-first Telugu-English learning assistant designed to help users improve their English speaking and pronunciation skills through adaptive learning, voice interaction, Telugu explanations, and personalized feedback.

The project is inspired by the traditional way mothers teach and guide children patiently. AMMA'S VOICE brings that supportive learning experience into a modern digital platform.

---

<img width="1626" height="935" alt="Screenshot 2026-09-06 213618" src="https://github.com/user-attachments/assets/f344afd3-f9aa-4125-a489-1350d4a1eec8" />


## 🌟 Project Overview

Many learners understand English but hesitate to speak because of pronunciation difficulties, lack of confidence, and limited access to personalized guidance.

AMMA'S VOICE provides an interactive learning environment where users can:

- Listen to English phrases
- Understand Telugu meanings
- Practice speaking using voice recognition
- Receive pronunciation scores
- Identify difficult words
- Get adaptive learning recommendations
- Learn at a comfortable speed

The system adapts its learning strategy based on the learner's performance and feedback.

---

# 🎯 Problem Statement

Traditional English learning platforms often focus heavily on grammar and text-based learning. Many Telugu-speaking learners face difficulties in:

- Pronouncing English words correctly
- Understanding English meanings
- Speaking confidently
- Receiving personalized feedback
- Practicing at their own learning speed

There is a need for a simple, voice-first learning platform that combines Telugu explanations with English speaking practice.

---

# 💡 Proposed Solution

AMMA'S VOICE is an adaptive Telugu-English voice learning assistant that helps users learn English through listening, speaking, and practicing.

The system provides:

1. English phrase learning
2. Telugu meaning explanations
3. Speech recognition
4. Pronunciation analysis
5. Difficult word assistance
6. Adaptive learning strategies
7. Personalized feedback
8. Learning progress tracking

---

<img width="1136" height="378" alt="Screenshot 2026-09-06 213649" src="https://github.com/user-attachments/assets/23c0bf12-9101-4eed-b669-49c832cbce2e" />



# 🚀 Key Features

## 🗣️ Voice-Based English Learning

Users can listen to English phrases and practice speaking them.

- English Text-to-Speech
- Speech Recognition
- Voice interaction
- Adjustable learning speed

---

<img width="1117" height="400" alt="Screenshot 2026-09-06 213709" src="https://github.com/user-attachments/assets/4c96525c-acb7-4003-98ca-585e77e31bb8" />


## 🌐 Telugu-English Learning

The platform supports bilingual learning.

Users can:

- View English phrases
- Listen to Telugu meanings
- Learn through Telugu + English explanations
- Switch between English and Telugu interface languages

---

## 🎯 Pronunciation Analysis

The system analyzes the spoken sentence by comparing the recognized speech with the target phrase.

Features include:

- Pronunciation score
- Word-level analysis
- Correct word detection
- Difficult word identification
- Personalized learning feedback

---

## 🧠 Adaptive Learning Engine

AMMA'S VOICE adapts based on user feedback.

The learning engine can recommend:

- ⚡ Normal Learning
- 🎧 Slow Learning
- 🐢 Deep Practice

Voice speed is adjusted based on the learner's difficulty level.

---

## 🔤 Difficult Word Assistant

Users can practice difficult English words separately.

Users can:

- Type a difficult word
- Speak a difficult word using the microphone
- Listen to the pronunciation
- Repeat the word multiple times

---

<img width="842" height="266" alt="Screenshot 2026-09-06 214523" src="https://github.com/user-attachments/assets/fa49cc6f-b804-4abe-8ae0-d081bb167cdf" />



## 📊 Learning Progress Tracking

The application tracks:

- Understood phrases
- Partially understood phrases
- Phrases requiring more practice
- Total phrases
- Practiced phrases
- Pronunciation performance
- Average pronunciation score

<img width="835" height="782" alt="Screenshot 2026-09-06 214618" src="https://github.com/user-attachments/assets/308e16ee-6d0d-4fd0-aeef-1c4eb1a44ad6" />


<img width="1024" height="559" alt="learning flow image" src="https://github.com/user-attachments/assets/55f444a4-3cee-4e64-ba82-c9d02e392112" />


---

## 🎨 Modern User Interface

AMMA'S VOICE includes:

- Professional landing page
- Custom branding
- Telugu/English language toggle
- Dark/Light mode
- Voice-learning dashboard
- Session completion report
- Responsive design

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       USER           │
                    │  Telugu/English      │
                    └──────────┬───────────┘
                               │
                               ▼
                ┌──────────────────────────┐
                │      REACT FRONTEND      │
                │                          │
                │ • Landing Page           │
                │ • Learning Dashboard     │
                │ • Language Toggle        │
                │ • Theme Toggle           │
                │ • Progress Tracking      │
                └────────────┬─────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
 ┌────────────────┐ ┌────────────────┐ ┌──────────────────┐
 │ Speech Engine  │ │ Adaptive Engine│ │ Pronunciation    │
 │                │ │                │ │ Analysis         │
 │ • Text-to-Speech│ │ • Difficulty   │ │ • Speech-to-Text │
 │ • Telugu Voice │ │ • Speed Control│ │ • Word Matching  │
 └────────────────┘ └────────────────┘ └──────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   BACKEND SERVER    │
                  │                     │
                  │ • Voice Processing  │
                  │ • API Services      │
                  └─────────────────────┘
<img width="552" height="896" alt="Screenshot 2026-09-06 214910" src="https://github.com/user-attachments/assets/a9ed5a5c-c79e-4924-b19c-c2f818122362" />




local host deployment :  http://localhost:5173/

frontend commands:
1) cd ammas-voice
2) Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
3) npm run dev


backend commands:
1) cd backend
2) node server.js
