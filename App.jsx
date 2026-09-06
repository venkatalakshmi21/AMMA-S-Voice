import { useState, useEffect } from "react";
import "./App.css";
import { getLearningStrategy } from "./utils/adaptiveEngine.js";
import phrases from "./data/phrases.js";
import landingBackground from "./assets/amma-background.png";
function App() {
  const [started, setStarted] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // THEME
  const [theme, setTheme] = useState("light");

  // LANGUAGE
  const [language, setLanguage] = useState("en");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [strategy, setStrategy] = useState(null);

  const [progress, setProgress] = useState({
    understood: 0,
    partially: 0,
    notUnderstood: 0,
  });

  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState("");
  const [pronunciationScore, setPronunciationScore] = useState(null);
  const [wordAnalysis, setWordAnalysis] = useState([]);
  const [personalFeedback, setPersonalFeedback] = useState(null);

  const [practicedPhrases, setPracticedPhrases] = useState([]);
  const [scores, setScores] = useState([]);

  // DIFFICULT WORD ASSISTANT
  const [customWord, setCustomWord] = useState("");
  const [spokenWord, setSpokenWord] = useState("");
  const [isWordListening, setIsWordListening] = useState(false);

  const currentPhrase = phrases[currentIndex];

  // =====================================
  // LANGUAGE TRANSLATIONS
  // =====================================

  const translations = {
    en: {
      title: "AMMA'S VOICE",
      subtitle: "Your Adaptive Telugu-English Voice Learning Assistant",
      learn: "Learn. Listen. Speak with Confidence.",
      description:
        "A voice-first Telugu-English learning assistant that adapts to your learning.",
      start: "Start Learning →",
      progress: "Your Learning Progress",
      understood: "Understood",
      partially: "Partially",
      needPractice: "Need Practice",
      recommendation: "AVA Recommendation",
      normalRecommendation:
        "Great progress! AVA recommends normal speech speed.",
      slowRecommendation:
        "AVA recommends moderate speech speed and repeated listening.",
      deepRecommendation:
        "AVA recommends slower speech and word-by-word practice.",
      phrase: "Phrase",
      of: "of",
      voiceEngine: "AVA Voice Engine",
      currentMode: "Current Mode",
      voiceSpeed: "Voice Speed",
      listenEnglish: "Listen English",
      speakNow: "Speak Now",
      listening: "Listening...",
      teluguMeaning: "Listen Telugu Meaning",
      learnMixed: "Learn in Telugu + English",
      difficultAssistant: "Difficult Word Assistant",
      difficultDescription:
        "Speak or type any English word you find difficult.",
      speakWord: "Speak a Word",
      typeWord: "Type a Word",
      typePlaceholder: "Type an English word...",
      speakTypedWord: "Speak This Word",
      didUnderstand: "Did you understand?",
      didntUnderstand: "Didn't Understand",
      previous: "← Previous",
      next: "Next →",
      finish: "Finish Learning 🎉",
      totalPhrases: "Total Phrases Available",
      practiced: "Phrases Practiced",
      pronunciation: "Pronunciation Performance",
      accuracy: "Pronunciation Accuracy",
      wordsCorrect: "Words Correct",
      needsMorePractice: "Needs More Practice",
      wordAnalysis: "Word Analysis",
      completion: "Learning Session Complete!",
      greatJob: "Great job! Here is your learning performance.",
      averageScore: "Average Pronunciation Score",
      restart: "Start New Learning Session",
      dark: "Dark",
      light: "Light",
      telugu: "తెలుగు",
      english: "English",
    },

    te: {
      title: "అమ్మ వాయిస్",
      subtitle: "మీ తెలుగు-ఇంగ్లీష్ వాయిస్ లెర్నింగ్ అసిస్టెంట్",
      learn: "నేర్చుకోండి. వినండి. ధైర్యంగా మాట్లాడండి.",
      description:
        "మీ అభ్యాసానికి అనుగుణంగా మారే తెలుగు-ఇంగ్లీష్ వాయిస్ లెర్నింగ్ అసిస్టెంట్.",
      start: "నేర్చుకోవడం ప్రారంభించండి →",
      progress: "మీ అభ్యాస పురోగతి",
      understood: "అర్థమైంది",
      partially: "కొంతవరకు అర్థమైంది",
      needPractice: "మరింత అభ్యాసం అవసరం",
      recommendation: "AVA సిఫార్సు",
      normalRecommendation:
        "చాలా మంచి పురోగతి! AVA సాధారణ వేగాన్ని సూచిస్తోంది.",
      slowRecommendation:
        "AVA మితమైన వేగం మరియు పదేపదే వినడాన్ని సూచిస్తోంది.",
      deepRecommendation:
        "AVA నెమ్మదిగా వినడం మరియు పదం పదంగా అభ్యాసం చేయడాన్ని సూచిస్తోంది.",
      phrase: "వాక్యం",
      of: "లో",
      voiceEngine: "AVA వాయిస్ ఇంజిన్",
      currentMode: "ప్రస్తుత మోడ్",
      voiceSpeed: "వాయిస్ వేగం",
      listenEnglish: "ఇంగ్లీష్ వినండి",
      speakNow: "ఇప్పుడు మాట్లాడండి",
      listening: "వింటోంది...",
      teluguMeaning: "తెలుగు అర్థం వినండి",
      learnMixed: "తెలుగు + ఇంగ్లీష్‌లో నేర్చుకోండి",
      difficultAssistant: "కష్టమైన పదాల సహాయకుడు",
      difficultDescription:
        "మీకు కష్టంగా అనిపించే ఏ ఇంగ్లీష్ పదాన్నైనా మాట్లాడండి లేదా టైప్ చేయండి.",
      speakWord: "ఒక పదం మాట్లాడండి",
      typeWord: "ఒక పదం టైప్ చేయండి",
      typePlaceholder: "ఇంగ్లీష్ పదాన్ని టైప్ చేయండి...",
      speakTypedWord: "ఈ పదాన్ని వినండి",
      didUnderstand: "మీకు అర్థమైందా?",
      didntUnderstand: "అర్థం కాలేదు",
      previous: "← వెనుకకు",
      next: "తదుపరి →",
      finish: "అభ్యాసం ముగించండి 🎉",
      totalPhrases: "మొత్తం వాక్యాలు",
      practiced: "అభ్యాసం చేసిన వాక్యాలు",
      pronunciation: "ఉచ్చారణ ఫలితం",
      accuracy: "ఉచ్చారణ ఖచ్చితత్వం",
      wordsCorrect: "సరైన పదాలు",
      needsMorePractice: "మరింత అభ్యాసం అవసరం",
      wordAnalysis: "పదాల విశ్లేషణ",
      completion: "అభ్యాస సెషన్ పూర్తయింది!",
      greatJob: "చాలా బాగా చేశారు! మీ అభ్యాస ఫలితాలు ఇవి.",
      averageScore: "సగటు ఉచ్చారణ స్కోర్",
      restart: "కొత్త అభ్యాసం ప్రారంభించండి",
      dark: "డార్క్",
      light: "లైట్",
      telugu: "తెలుగు",
      english: "English",
    },
  };

  const t = translations[language];

  // =====================================
  // APPLY THEME
  // =====================================

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
  }, [theme]);

  // =====================================
  // NORMALIZE TEXT
  // =====================================

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // =====================================
  // ENGLISH VOICE
  // =====================================

  const speakText = (text, speed = 0.8) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = speed;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const speakPhrase = async () => {
    try {
      let speed = 1.0;

      if (strategy?.level === "Medium") {
        speed = 0.7;
      }

      if (strategy?.level === "High") {
        speed = 0.5;
      }

      const response = await fetch(
        "http://localhost:5000/api/speak",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: currentPhrase.english,
            speed: speed,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const audioBlob = await response.blob();
      const audioURL = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioURL);

      await audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioURL);
      };
    } catch (error) {
      speakText(currentPhrase.english, 0.8);
    }
  };

  // =====================================
  // TELUGU MEANING VOICE
  // =====================================

  const speakTeluguMeaning = () => {
    window.speechSynthesis.cancel();

    const teluguText = currentPhrase?.telugu;

    if (!teluguText) {
      alert("Telugu meaning is not available.");
      return;
    }

    const speakNow = () => {
      const voices = window.speechSynthesis.getVoices();

      const teluguVoice =
        voices.find(
          (voice) => voice.lang.toLowerCase() === "te-in"
        ) ||
        voices.find((voice) =>
          voice.lang.toLowerCase().startsWith("te")
        );

      const speech = new SpeechSynthesisUtterance(teluguText);

      speech.lang = "te-IN";
      speech.rate = 0.75;

      if (teluguVoice) {
        speech.voice = teluguVoice;
      }

      window.speechSynthesis.speak(speech);
    };

    const voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = speakNow;
    } else {
      speakNow();
    }
  };

  // =====================================
  // DIFFICULT WORD VOICE
  // =====================================

  const speakWord = (word) => {
    if (!word || !word.trim()) {
      alert("Please enter or speak a word first.");
      return;
    }

    speakText(word.trim(), 0.65);
  };

  // =====================================
  // CUSTOM WORD MICROPHONE
  // User speaks → text appears
  // =====================================

  const startWordListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsWordListening(true);
      setSpokenWord("");
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();

      setSpokenWord(transcript);
      setCustomWord(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Word microphone error:", event.error);

      if (event.error === "not-allowed") {
        alert("Microphone permission denied.");
      }

      setIsWordListening(false);
    };

    recognition.onend = () => {
      setIsWordListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      setIsWordListening(false);
    }
  };

  // =====================================
  // PRONUNCIATION ANALYSIS
  // =====================================

  const analyzePronunciation = (spokenText) => {
    const targetText = normalizeText(
      currentPhrase?.english || ""
    );

    const userText = normalizeText(spokenText);

    const targetWords = targetText.split(" ");
    const spokenWords = userText.split(" ");

    let correctWordsCount = 0;

    const analysis = targetWords.map((word) => {
      const found = spokenWords.some(
        (spokenWord) =>
          spokenWord === word ||
          spokenWord.includes(word) ||
          word.includes(spokenWord)
      );

      if (found) {
        correctWordsCount++;
      }

      return {
        word,
        correct: found,
      };
    });

    const score = Math.round(
      (correctWordsCount / targetWords.length) * 100
    );

    setPronunciationScore(score);
    setWordAnalysis(analysis);

    setPracticedPhrases((prev) => {
      if (!prev.includes(currentIndex)) {
        return [...prev, currentIndex];
      }

      return prev;
    });

    setScores((prev) => {
      const filtered = prev.filter(
        (item) => item.index !== currentIndex
      );

      return [
        ...filtered,
        {
          index: currentIndex,
          score: score,
        },
      ];
    });

    const incorrectWords = analysis
      .filter((item) => !item.correct)
      .map((item) => item.word);

    if (score >= 90) {
      setPersonalFeedback({
        title: "🎉 Excellent!",
        message:
          "Excellent pronunciation! You spoke the sentence very clearly.",
        recommendation:
          "AVA recommends moving to the next phrase.",
      });
    } else if (score >= 75) {
      setPersonalFeedback({
        title: "👍 Good Attempt!",
        message:
          incorrectWords.length > 0
            ? `You did well. Practice these words again: ${incorrectWords.join(
                ", "
              )}.`
            : "Good pronunciation!",
        recommendation:
          "Listen again and repeat the phrase slowly.",
      });
    } else {
      setPersonalFeedback({
        title: "💪 Keep Practicing!",
        message:
          incorrectWords.length > 0
            ? `Focus on these difficult words: ${incorrectWords.join(
                ", "
              )}.`
            : "Try speaking the sentence again.",
        recommendation:
          "AVA recommends slower listening and repeated practice.",
      });
    }
  };

  // =====================================
  // MAIN SPEECH RECOGNITION
  // =====================================

  const startListening = () => {
    setSpeechResult("");
    setPronunciationScore(null);
    setWordAnalysis([]);
    setPersonalFeedback(null);

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition is not supported. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();

      setSpeechResult(transcript);

      analyzePronunciation(transcript);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        alert("No speech detected. Please try again.");
      }

      if (event.error === "not-allowed") {
        alert(
          "Microphone permission denied. Please allow microphone access."
        );
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      setIsListening(false);
    }
  };

  // =====================================
  // USER FEEDBACK
  // =====================================

  const handleFeedback = (feedback) => {
    setProgress((prev) => {
      if (feedback === "understood") {
        return {
          ...prev,
          understood: prev.understood + 1,
        };
      }

      if (feedback === "partial") {
        return {
          ...prev,
          partially: prev.partially + 1,
        };
      }

      if (feedback === "not-understood") {
        return {
          ...prev,
          notUnderstood: prev.notUnderstood + 1,
        };
      }

      return prev;
    });

    const learningStrategy =
      getLearningStrategy(feedback);

    setStrategy(learningStrategy);
  };

  // =====================================
  // NEXT / PREVIOUS
  // =====================================

  const resetPhraseData = () => {
    setStrategy(null);
    setSpeechResult("");
    setPronunciationScore(null);
    setWordAnalysis([]);
    setPersonalFeedback(null);
  };

  const nextPhrase = () => {
    if (currentIndex < phrases.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetPhraseData();
    }
  };

  const previousPhrase = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetPhraseData();
    }
  };

  // =====================================
  // SESSION
  // =====================================

  const finishSession = () => {
    setSessionCompleted(true);
  };

  const restartSession = () => {
    setStarted(true);
    setSessionCompleted(false);
    setCurrentIndex(0);

    setProgress({
      understood: 0,
      partially: 0,
      notUnderstood: 0,
    });

    setStrategy(null);
    setSpeechResult("");
    setPronunciationScore(null);
    setWordAnalysis([]);
    setPersonalFeedback(null);
    setPracticedPhrases([]);
    setScores([]);
  };

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (total, item) => total + item.score,
            0
          ) / scores.length
        )
      : 0;

  const correctWords = wordAnalysis.filter(
    (word) => word.correct
  ).length;

  const incorrectWords = wordAnalysis.filter(
    (word) => !word.correct
  );
// =====================================
// GO BACK TO HOME
// =====================================

const goBackToHome = () => {
  window.speechSynthesis.cancel();

  setStarted(false);
  setSessionCompleted(false);

  setCurrentIndex(0);
  setStrategy(null);
  setSpeechResult("");
  setPronunciationScore(null);
  setWordAnalysis([]);
  setPersonalFeedback(null);
};

const BackButton = () => (
  <button
    className="back-home-btn"
    onClick={goBackToHome}
  >
    ← Back to Home
  </button>
);
  // =====================================
  // TOP CONTROLS
  // =====================================

  const TopControls = () => (
    <div className="top-controls">
      <button
        className="language-toggle"
        onClick={() =>
          setLanguage(
            language === "en" ? "te" : "en"
          )
        }
      >
        🌐 {language === "en" ? "తెలుగు" : "English"}
      </button>

      <button
        className="theme-toggle"
        onClick={() =>
          setTheme(
            theme === "light" ? "dark" : "light"
          )
        }
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );

  // =====================================
  // LANDING PAGE
  // =====================================

  if (!started) {
  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${landingBackground})`,
      }}
    >
      {/* Dark / Light overlay */}
      <div className="landing-overlay"></div>

      <TopControls />

      <div className="hero">
        <div className="logo-circle">🎙️</div>

        <h1>{t.title}</h1>

        <h2>{t.learn}</h2>

        <p>{t.description}</p>

        <button
          className="start-btn"
          onClick={() => setStarted(true)}
        >
          {t.start}
        </button>
      </div>
    </div>
  );
}

  // =====================================
  // COMPLETION PAGE
  // =====================================

  if (sessionCompleted) {
    return (
      <div className="completion-screen">
        <BackButton />
        <TopControls />

        <div className="completion-card">
          <h1>🎉 {t.completion}</h1>

          <p>{t.greatJob}</p>

          <div className="average-score">
            <h2>{t.averageScore}</h2>

            <div className="big-score">
              {averageScore}%
            </div>
          </div>

          <div className="final-stats">
            <div className="final-stat">
              <h3>😊 {t.understood}</h3>
              <span>{progress.understood}</span>
            </div>

            <div className="final-stat">
              <h3>😐 {t.partially}</h3>
              <span>{progress.partially}</span>
            </div>

            <div className="final-stat">
              <h3>❌ {t.needPractice}</h3>
              <span>{progress.notUnderstood}</span>
            </div>
          </div>

          <div className="session-summary">
            <p>
              📚 {t.totalPhrases}:{" "}
              <strong>{phrases.length}</strong>
            </p>

            <p>
              🎤 {t.practiced}:{" "}
              <strong>
                {practicedPhrases.length}
              </strong>
            </p>
          </div>

          <div className="final-recommendation">
            <h2>🤖 AVA Final Recommendation</h2>

            {averageScore >= 85 ? (
              <p>
                🌟 Excellent work! Continue practicing
                new phrases.
              </p>
            ) : averageScore >= 60 ? (
              <p>
                👍 Good progress! Practice difficult
                phrases once more.
              </p>
            ) : (
              <p>
                💪 Keep practicing! Use slow listening
                and repeat each phrase multiple times.
              </p>
            )}
          </div>

          <button
            className="restart-btn"
            onClick={restartSession}
          >
            🔄 {t.restart}
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // MAIN PAGE
  // =====================================

  return (
    <div className="learning-screen">
       <BackButton />
       <TopControls />

      <header>
        <h1>🎙️ {t.title}</h1>

        <p>{t.subtitle}</p>
      </header>

      <div className="progress-dashboard">
        <h2>📊 {t.progress}</h2>

        <div className="progress-stats">
          <div className="stat-card success">
            <span className="stat-number">
              {progress.understood}
            </span>
            <span>{t.understood}</span>
          </div>

          <div className="stat-card partial">
            <span className="stat-number">
              {progress.partially}
            </span>
            <span>{t.partially}</span>
          </div>

          <div className="stat-card difficult">
            <span className="stat-number">
              {progress.notUnderstood}
            </span>
            <span>{t.needPractice}</span>
          </div>
        </div>
      </div>

      <div className="adaptive-recommendation">
        <h3>🤖 {t.recommendation}</h3>

        {progress.notUnderstood >
        progress.understood ? (
          <p>{t.deepRecommendation}</p>
        ) : progress.partially >
          progress.understood ? (
          <p>{t.slowRecommendation}</p>
        ) : (
          <p>{t.normalRecommendation}</p>
        )}
      </div>

      <div className="voice-mode-card">
        <h3>🎙️ {t.voiceEngine}</h3>

        <p>
          <strong>{t.currentMode}:</strong>{" "}
          {strategy?.level === "High"
            ? "🐢 Deep Practice"
            : strategy?.level === "Medium"
            ? "🎧 Slow Learning"
            : "⚡ Normal Learning"}
        </p>

        <p>
          <strong>{t.voiceSpeed}:</strong>{" "}
          {strategy?.level === "High"
            ? "0.5x"
            : strategy?.level === "Medium"
            ? "0.7x"
            : "1.0x"}
        </p>

        <p className="rime-active">
          ● Rime AI Voice Active
        </p>
      </div>

      <div className="progress-text">
        {t.phrase} {currentIndex + 1} {t.of}{" "}
        {phrases.length}
      </div>

      <div className="phrase-card">
        <span className="category">
          🏷️ {currentPhrase?.category}
        </span>

        <h2>{currentPhrase?.english}</h2>

        <p className="telugu">
          {currentPhrase?.telugu}
        </p>

        <button
          className="explain-btn"
          onClick={speakTeluguMeaning}
        >
          🔊 {t.teluguMeaning}
        </button>

        <div className="code-switch-box">
          <h3>🗣️ {t.learnMixed}</h3>

          <p>
            {currentPhrase?.mixedExplanation}
          </p>
        </div>

        <div className="voice-buttons">
          <button
            className="listen-btn"
            onClick={speakPhrase}
          >
            🔊 {t.listenEnglish}
          </button>

          <button
            className="speak-btn"
            onClick={startListening}
            disabled={isListening}
          >
            {isListening
              ? `🎙️ ${t.listening}`
              : `🎤 ${t.speakNow}`}
          </button>
        </div>

        {/* =====================================
            DIFFICULT WORD ASSISTANT
        ===================================== */}

        <div className="difficult-word-assistant">
          <h3>
            🧠 {t.difficultAssistant}
          </h3>

          <p>
            {t.difficultDescription}
          </p>

          <div className="custom-word-actions">
            <button
              className="word-mic-btn"
              onClick={startWordListening}
              disabled={isWordListening}
            >
              {isWordListening
                ? "🎙️ Listening..."
                : `🎤 ${t.speakWord}`}
            </button>

            <input
              type="text"
              placeholder={t.typePlaceholder}
              value={customWord}
              onChange={(e) =>
                setCustomWord(e.target.value)
              }
            />

            <button
              className="custom-speak-btn"
              onClick={() => speakWord(customWord)}
            >
              🔊 {t.speakTypedWord}
            </button>
          </div>

          {spokenWord && (
            <div className="spoken-word-result">
              <strong>You said:</strong>
              <p>{spokenWord}</p>

              <button
                onClick={() =>
                  speakWord(spokenWord)
                }
              >
                🔊 Hear Again
              </button>
            </div>
          )}
        </div>

        {speechResult && (
          <div className="speech-result">
            <h3>
              Speech received successfully.
            </h3>

            <p>
              🎤 You Said:
              <br />
              "{speechResult}"
            </p>
          </div>
        )}

        <div className="practice-stats">
          <p>
            📚 {t.totalPhrases}:{" "}
            <strong>{phrases.length}</strong>
          </p>

          <p>
            🎤 {t.practiced}:{" "}
            <strong>
              {practicedPhrases.length}
            </strong>
          </p>
        </div>

        {pronunciationScore !== null && (
          <div className="pronunciation-dashboard">
            <h3>
              🎯 {t.pronunciation}
            </h3>

            <div className="score-circle">
              <span>
                {pronunciationScore}%
              </span>
            </div>

            <h2>
              {pronunciationScore >= 90
                ? "🌟 Excellent!"
                : pronunciationScore >= 75
                ? "👍 Good Attempt!"
                : pronunciationScore >= 50
                ? "💪 Keep Practicing!"
                : "🎯 Let's Practice More!"}
            </h2>

            <div className="score-bar-container">
              <div
                className="score-bar"
                style={{
                  width: `${pronunciationScore}%`,
                }}
              />
            </div>

            <p>
              {t.accuracy}:{" "}
              <strong>
                {pronunciationScore}%
              </strong>
            </p>

            <p className="word-count">
              📚 {t.wordsCorrect}:{" "}
              <strong>
                {correctWords} /{" "}
                {wordAnalysis.length}
              </strong>
            </p>

            {incorrectWords.length > 0 && (
              <div className="needs-practice">
                <h4>
                  🎯 {t.needsMorePractice}
                </h4>

                {incorrectWords.map(
                  (word) => (
                    <span
                      key={word.word}
                      className="practice-word"
                    >
                      {word.word}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        )}

        <div className="feedback-section">
          <h3>{t.didUnderstand}</h3>

          <div className="feedback-buttons">
            <button
              onClick={() =>
                handleFeedback("understood")
              }
            >
              😊 {t.understood}
            </button>

            <button
              onClick={() =>
                handleFeedback("partial")
              }
            >
              😐 {t.partially}
            </button>

            <button
              onClick={() =>
                handleFeedback(
                  "not-understood"
                )
              }
            >
              ❌ {t.didntUnderstand}
            </button>
          </div>
        </div>

        {wordAnalysis.length > 0 && (
          <div className="word-analysis">
            <h3>
              🔍 {t.wordAnalysis}
            </h3>

            <div className="analysis-words">
              {wordAnalysis.map(
                (item, index) => (
                  <span
                    key={index}
                    className={
                      item.correct
                        ? "correct-word"
                        : "incorrect-word"
                    }
                  >
                    {item.correct
                      ? "🟢"
                      : "🔴"}{" "}
                    {item.word}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {personalFeedback && (
          <div className="personal-feedback">
            <h3>
              🤖 AVA Personalized Feedback
            </h3>

            <h2>
              {personalFeedback.title}
            </h2>

            <p>
              {personalFeedback.message}
            </p>

            <p>
              <strong>
                AVA Recommends:
              </strong>
            </p>

            <p>
              {personalFeedback.recommendation}
            </p>
          </div>
        )}

        {strategy && (
          <div
            className={`strategy ${strategy.level?.toLowerCase()}`}
          >
            <h3>
              AVA Learning Strategy:{" "}
              {strategy.level}
            </h3>

            <p>{strategy.message}</p>

            <p>
              <strong>
                Voice Speed:
              </strong>{" "}
              {strategy.speed}
            </p>

            <p>{strategy.instruction}</p>

            {strategy.level !== "Easy" && (
              <div className="word-practice">
                <h3>
                  🎯 Practice Difficult Words
                </h3>

                {currentPhrase?.difficultWords?.map(
                  (word, index) => (
                    <div
                      className="word-card"
                      key={index}
                    >
                      <div className="word-info">
                        <h3>
                          {word.word}
                        </h3>

                        <p className="telugu-word">
                          {word.meaning}
                        </p>

                        <p className="pronunciation">
                          🗣 Pronunciation:{" "}
                          {word.pronunciation}
                        </p>
                      </div>

                      <button
                        className="word-speak-btn"
                        onClick={() =>
                          speakWord(word.word)
                        }
                      >
                        🔊
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        <div className="navigation">
          <button
            onClick={previousPhrase}
            disabled={currentIndex === 0}
          >
            {t.previous}
          </button>

          {currentIndex ===
          phrases.length - 1 ? (
            <button
              className="finish-btn"
              onClick={finishSession}
            >
              {t.finish}
            </button>
          ) : (
            <button onClick={nextPhrase}>
              {t.next}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;