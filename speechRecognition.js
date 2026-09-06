export function startSpeechRecognition(
  onResult,
  onError,
  onStart,
  onEnd
) {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Speech Recognition is not supported. Please use Google Chrome."
    );

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;


  recognition.onstart = () => {

    console.log("Microphone started listening...");

    if (onStart) {
      onStart();
    }

  };


  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    console.log(
      "Recognized:",
      transcript
    );

    onResult(transcript);

  };


  recognition.onerror = (event) => {

    console.log(
      "Speech recognition event:",
      event.error
    );


    // Don't treat silence as a serious error
    if (event.error === "no-speech") {

      alert(
        "We couldn't hear you. Please click Speak Now and start speaking clearly."
      );

      return;
    }


    if (event.error === "not-allowed") {

      alert(
        "Microphone permission is blocked. Please allow microphone access in Chrome."
      );

      return;
    }


    if (onError) {

      onError(event.error);

    }

  };


  recognition.onend = () => {

    console.log(
      "Microphone stopped listening."
    );

    if (onEnd) {
      onEnd();
    }

  };


  recognition.start();

}