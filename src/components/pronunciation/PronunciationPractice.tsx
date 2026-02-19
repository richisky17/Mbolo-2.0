"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Play, Pause, RotateCcw, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { toast } from "sonner";

interface PronunciationPracticeProps {
  targetText: string;
  courseId?: number;
  onComplete?: (score: number) => void;
}

export default function PronunciationPractice({
  targetText,
  courseId,
  onComplete,
}: PronunciationPracticeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [correctPronunciationUrl, setCorrectPronunciationUrl] = useState<string | null>(null);
  const [isLoadingCorrectAudio, setIsLoadingCorrectAudio] = useState(false);
  const [isPlayingCorrectAudio, setIsPlayingCorrectAudio] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const correctAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (correctPronunciationUrl) {
        URL.revokeObjectURL(correctPronunciationUrl);
      }
    };
  }, [audioUrl, correctPronunciationUrl]);

  // Load correct pronunciation audio when component mounts
  useEffect(() => {
    loadCorrectPronunciation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetText]);

  const loadCorrectPronunciation = async () => {
    if (!targetText) return;
    
    setIsLoadingCorrectAudio(true);
    try {
      const response = await fetch("/api/pronunciation/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: targetText,
          voice: "nova", // Natural female voice - you can make this configurable
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate correct pronunciation");
      }

      const data = await response.json();
      
      if (data.audio) {
        // Convert base64 to blob
        const binaryString = atob(data.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        setCorrectPronunciationUrl(url);
      }
    } catch (error) {
      console.error("Error loading correct pronunciation:", error);
      // Don't show error toast - fail silently if API not configured
    } finally {
      setIsLoadingCorrectAudio(false);
    }
  };

  const playCorrectPronunciation = () => {
    if (correctAudioRef.current && correctPronunciationUrl) {
      correctAudioRef.current.play();
      setIsPlayingCorrectAudio(true);
      
      correctAudioRef.current.onended = () => {
        setIsPlayingCorrectAudio(false);
      };
      
      correctAudioRef.current.onpause = () => {
        setIsPlayingCorrectAudio(false);
      };
    }
  };

  const pauseCorrectPronunciation = () => {
    if (correctAudioRef.current) {
      correctAudioRef.current.pause();
      setIsPlayingCorrectAudio(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecorded(true);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to access microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  };

  const analyzeAudio = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("targetText", targetText);

      const response = await fetch("/api/pronunciation/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze pronunciation");
      }

      const data = await response.json();
      setResult(data);

      // Save to database
      await fetch("/api/pronunciation/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          text: targetText,
          targetText,
          audioUrl: audioUrl,
          score: data.score,
          accuracy: data.accuracy,
          fluency: data.fluency,
          completeness: data.completeness,
          phonemeDetails: data.phonemeDetails,
          stressPattern: data.stressPattern,
          intonationScore: data.intonationScore,
          errors: data.errors,
        }),
      });

      if (onComplete) {
        onComplete(data.score);
      }

      toast.success(`Pronunciation score: ${data.score}%`);
      
      // Trigger progress refresh in parent component
      window.dispatchEvent(new CustomEvent('pronunciation-practice-completed'));
    } catch (error) {
      console.error("Error analyzing pronunciation:", error);
      toast.error("Failed to analyze pronunciation");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setHasRecorded(false);
    setAudioBlob(null);
    setResult(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Target Text */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 border-2 border-emerald-200">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-emerald-700 mb-2">Practice saying:</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words">{targetText}</p>
          </div>
          
          {/* Correct Pronunciation Button */}
          <div className="flex flex-row sm:flex-col items-center gap-2 w-full sm:w-auto">
            <audio ref={correctAudioRef} src={correctPronunciationUrl || undefined} />
            {isLoadingCorrectAudio ? (
              <Button
                disabled
                variant="secondaryOutline"
                className="border-emerald-300 text-emerald-600 w-full sm:w-[140px] sm:min-w-[140px]"
              >
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </Button>
            ) : correctPronunciationUrl ? (
              isPlayingCorrectAudio ? (
                <Button
                  onClick={pauseCorrectPronunciation}
                  variant="secondaryOutline"
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 w-full sm:w-[140px] sm:min-w-[140px]"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={playCorrectPronunciation}
                  variant="secondaryOutline"
                  className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 w-full sm:w-[140px] sm:min-w-[140px]"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  <span className="sm:hidden">Listen to Correct</span>
                  <span className="hidden sm:inline">Listen</span>
                </Button>
              )
            ) : (
              <Button
                onClick={loadCorrectPronunciation}
                variant="secondaryOutline"
                className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 w-full sm:w-[140px] sm:min-w-[140px]"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                <span className="sm:hidden">Generate Audio</span>
                <span className="hidden sm:inline">Generate</span>
              </Button>
            )}
            <p className="text-xs text-gray-500 text-center hidden sm:block">Correct<br />Pronunciation</p>
          </div>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="flex flex-col items-center gap-4">
        {!hasRecorded ? (
          <div className="flex items-center gap-4">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <Mic className="h-8 w-8" />
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-full h-20 w-20 flex items-center justify-center shadow-lg hover:shadow-xl transition-all animate-pulse"
              >
                <MicOff className="h-8 w-8" />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <audio ref={audioRef} src={audioUrl || undefined} />
            <Button
              onClick={playAudio}
              variant="secondaryOutline"
              className="border-emerald-300 text-emerald-600"
            >
              <Play className="h-5 w-5 mr-2" />
              Play
            </Button>
            <Button
              onClick={pauseAudio}
              variant="secondaryOutline"
              className="border-emerald-300 text-emerald-600"
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </Button>
            <Button
              onClick={analyzeAudio}
              disabled={isProcessing}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
            >
              {isProcessing ? "Analyzing..." : "Analyze Pronunciation"}
            </Button>
            <Button onClick={reset} variant="secondaryOutline">
              <RotateCcw className="h-5 w-5 mr-2" />
              Record Again
            </Button>
          </div>
        )}

        {isRecording && (
          <div className="flex items-center gap-2 text-rose-500 animate-pulse">
            <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
            <span className="font-semibold">Recording...</span>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <PronunciationFeedback result={result} />
      )}
    </div>
  );
}

function PronunciationFeedback({ result }: { result: any }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-lg space-y-6">
      {/* Overall Score */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-24 h-24 text-3xl font-bold shadow-lg">
          {result.score}%
        </div>
        <p className="text-lg font-semibold text-gray-700 mt-4">Overall Score</p>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label="Accuracy" score={result.accuracy} />
        <ScoreCard label="Fluency" score={result.fluency} />
        <ScoreCard label="Completeness" score={result.completeness} />
        <ScoreCard label="Intonation" score={result.intonationScore} />
      </div>

      {/* Errors */}
      {result.errors && result.errors.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
          <p className="font-semibold text-amber-800 mb-2">Areas to Improve:</p>
          <ul className="list-disc list-inside space-y-1 text-amber-700">
            {result.errors.map((error: string, i: number) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Phoneme Breakdown */}
      {result.phonemeDetails && result.phonemeDetails.length > 0 && (
        <div>
          <p className="font-semibold text-gray-700 mb-3">Phoneme Breakdown:</p>
          <div className="space-y-2">
            {result.phonemeDetails.slice(0, 5).map((phoneme: any, i: number) => (
              <div key={i} className="flex items-center gap-4">
                <span className="font-medium text-gray-600 w-32">{phoneme.phoneme}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                    style={{ width: `${phoneme.accuracy}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-600 w-12">{phoneme.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-teal-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-rose-500 to-red-500";
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <p className="text-sm font-semibold text-gray-600 mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${getColor(score)} h-2 rounded-full transition-all`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-bold text-gray-700">{score}%</span>
      </div>
    </div>
  );
}

