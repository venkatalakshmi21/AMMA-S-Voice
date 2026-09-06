export function getLearningStrategy(feedback) {

  if (feedback === "understood") {

    return {
      level: "Easy",

      speed: "Normal",

      message:
        "Great! You understood the phrase well.",

      instruction:
        "Continue with the next phrase."
    };
  }


  if (feedback === "partial") {

    return {
      level: "Medium",

      speed: "Slow",

      message:
        "You partially understood the phrase.",

      instruction:
        "Listen again slowly and focus on difficult words."
    };
  }


  if (feedback === "not-understood") {

    return {
      level: "High",

      speed: "Very Slow",

      message:
        "This phrase needs additional practice.",

      instruction:
        "Practice each difficult word individually before trying again."
    };
  }


  return {
    level: "Easy",

    speed: "Normal",

    message:
      "Continue learning.",

    instruction:
      "Listen carefully."
  };
}