export function difficultyLabel(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
    default:
      return difficulty;
  }
}