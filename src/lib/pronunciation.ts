/**
 * Pronunciation scoring and analysis utilities
 */

export interface PhonemeScore {
  phoneme: string;
  accuracy: number; // 0-100
  timing: number; // Timing accuracy
  stress: boolean; // Correct stress
}

export interface PronunciationResult {
  score: number; // Overall score 0-100
  accuracy: number; // Phoneme accuracy 0-100
  fluency: number; // Fluency score 0-100
  completeness: number; // Completeness 0-100
  intonationScore: number; // Intonation 0-100
  phonemeDetails: PhonemeScore[];
  stressPattern: string[];
  errors: string[];
}

/**
 * Analyze pronunciation using Web Speech API and custom algorithms
 */
export async function analyzePronunciation(
  audioBlob: Blob,
  targetText: string
): Promise<PronunciationResult> {
  // For now, we'll use a mock implementation
  // In production, integrate with Google Speech-to-Text or Azure Speech
  
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock pronunciation analysis
  // In production, this would:
  // 1. Send audio to speech recognition API
  // 2. Get phoneme-level transcription
  // 3. Compare with target text
  // 4. Calculate scores based on differences
  
  const baseScore = Math.floor(Math.random() * 30) + 70; // 70-100
  
  const phonemeDetails: PhonemeScore[] = targetText
    .split(" ")
    .slice(0, 10)
    .map((word, i) => ({
      phoneme: word,
      accuracy: Math.min(100, baseScore + Math.floor(Math.random() * 20) - 10),
      timing: Math.min(100, baseScore + Math.floor(Math.random() * 15) - 5),
      stress: Math.random() > 0.3,
    }));
  
  const errors: string[] = [];
  if (baseScore < 85) {
    errors.push("Some phonemes need improvement");
  }
  if (baseScore < 80) {
    errors.push("Focus on stress patterns");
  }
  
  return {
    score: baseScore,
    accuracy: baseScore + Math.floor(Math.random() * 10) - 5,
    fluency: baseScore + Math.floor(Math.random() * 15) - 7,
    completeness: Math.min(100, baseScore + 5),
    intonationScore: baseScore + Math.floor(Math.random() * 10) - 5,
    phonemeDetails,
    stressPattern: targetText.split(" ").map(() => 
      Math.random() > 0.5 ? "stressed" : "unstressed"
    ),
    errors,
  };
}

/**
 * Calculate improvement rate
 */
export function calculateImprovementRate(
  currentScore: number,
  previousScores: number[]
): number {
  if (previousScores.length === 0) return 0;
  
  const averagePrevious = previousScores.reduce((a, b) => a + b, 0) / previousScores.length;
  return Math.round(((currentScore - averagePrevious) / averagePrevious) * 100);
}

/**
 * Identify weak phonemes based on practice history
 */
export function identifyWeakPhonemes(
  practiceHistory: PhonemeScore[][]
): string[] {
  const phonemeScores: Record<string, number[]> = {};
  
  practiceHistory.forEach(practice => {
    practice.forEach(({ phoneme, accuracy }) => {
      if (!phonemeScores[phoneme]) {
        phonemeScores[phoneme] = [];
      }
      phonemeScores[phoneme].push(accuracy);
    });
  });
  
  const weakPhonemes: string[] = [];
  
  Object.entries(phonemeScores).forEach(([phoneme, scores]) => {
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    if (average < 70) {
      weakPhonemes.push(phoneme);
    }
  });
  
  return weakPhonemes;
}

