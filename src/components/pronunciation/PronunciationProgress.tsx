"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PronunciationProgressProps {
  courseId?: number;
}

export default function PronunciationProgress({ courseId }: PronunciationProgressProps) {
  const [progressData, setProgressData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
    const handlePracticeComplete = () => fetchProgress();
    window.addEventListener('pronunciation-practice-completed', handlePracticeComplete);
    return () => window.removeEventListener('pronunciation-practice-completed', handlePracticeComplete);
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const url = courseId ? `/api/pronunciation/progress?courseId=${courseId}` : "/api/pronunciation/progress";
      const response = await fetch(url);
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error("Error al obtener el progreso:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-800/30 rounded"></div>
        </div>
      </div>
    );
  }

  const progress = progressData?.progress || { totalPractices: 0, averageScore: 0, improvementRate: 0 };
  const chartData = progressData?.recentScores?.slice().reverse().map((item: any, index: number) => ({
    name: `Práctica ${index + 1}`,
    score: item.score,
    accuracy: item.accuracy,
    fluency: item.fluency,
  })) || [];

  return (
    <div className="bg-gray-900/50 rounded-2xl p-4 sm:p-6 border border-gray-800 shadow-lg space-y-4 sm:space-y-6 w-full">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
          Progreso en la pronunciación
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 min-h-[80px]">
          <StatCard label="Total de prácticas" value={progress.totalPractices} />
          <StatCard label="Puntuación media" value={`${progress.averageScore}%`} />
          <StatCard
            label="Mejora"
            value={`${progress.improvementRate > 0 ? "+" : ""}${progress.improvementRate}%`}
            color={progress.improvementRate > 0 ? "text-emerald-400" : progress.improvementRate < 0 ? "text-rose-400" : "text-gray-400"}
          />
        </div>
      </div>

      {chartData.length > 0 ? (
        <div>
          <h4 className="font-semibold text-gray-300 mb-4">Tendencia de puntuación</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                }}
                labelStyle={{ color: "#f3f4f6" }}
                itemStyle={{ color: "#f3f4f6" }}
              />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: "#10b981", r: 4 }} name="Puntuación global" />
              <Line type="monotone" dataKey="accuracy" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 3 }} name="Precisión" />
              <Line type="monotone" dataKey="fluency" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 3 }} name="Fluidez" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>Aún no hay datos de práctica. ¡Empieza a practicar para ver tu progreso!</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color = "text-white" }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-700 flex flex-col items-center justify-center text-center">
      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-400 mb-1 break-words line-clamp-2">{label}</p>
      <p className={`text-base sm:text-xl md:text-2xl font-bold ${color} whitespace-nowrap`}>{value}</p>
    </div>
  );
}