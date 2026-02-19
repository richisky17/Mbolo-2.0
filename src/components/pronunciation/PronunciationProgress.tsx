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
    
    // Listen for practice completion events to refresh progress
    const handlePracticeComplete = () => {
      fetchProgress();
    };
    
    window.addEventListener('pronunciation-practice-completed', handlePracticeComplete);
    
    return () => {
      window.removeEventListener('pronunciation-practice-completed', handlePracticeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const url = courseId
        ? `/api/pronunciation/progress?courseId=${courseId}`
        : "/api/pronunciation/progress";
      
      const response = await fetch(url);
      const data = await response.json();
      setProgressData(data);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  const progress = progressData?.progress || {
    totalPractices: 0,
    averageScore: 0,
    improvementRate: 0,
  };

  // Reverse scores to show chronological order (oldest first)
  const chartData = progressData?.recentScores
    ?.slice()
    .reverse()
    .map((item: any, index: number) => ({
      name: `Practice ${index + 1}`,
      score: item.score,
      accuracy: item.accuracy,
      fluency: item.fluency,
    })) || [];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-emerald-200 shadow-lg space-y-4 sm:space-y-6 w-full">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Pronunciation Progress
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 min-h-[80px]">
          <StatCard 
            key="practices"
            label="Total Practices" 
            value={progress.totalPractices} 
          />
          <StatCard 
            key="average"
            label="Average Score" 
            value={`${progress.averageScore}%`} 
          />
          <StatCard
            key="improvement"
            label="Improvement"
            value={`${progress.improvementRate > 0 ? "+" : ""}${progress.improvementRate}%`}
            color={progress.improvementRate > 0 ? "text-emerald-600" : progress.improvementRate < 0 ? "text-rose-600" : "text-gray-600"}
          />
        </div>
      </div>

      {chartData.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-4">Score Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#6b7280" 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4 }}
                name="Overall Score"
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={{ fill: "#06b6d4", r: 3 }}
                name="Accuracy"
              />
              <Line
                type="monotone"
                dataKey="fluency"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", r: 3 }}
                name="Fluency"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No practice data yet. Start practicing to see your progress!</p>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "text-gray-700",
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-emerald-200 min-w-0 flex flex-col items-center justify-center text-center w-full h-full">
      <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gray-600 mb-1 leading-tight break-words w-full px-1 line-clamp-2">{label}</p>
      <p className={`text-base sm:text-xl md:text-2xl font-bold ${color} whitespace-nowrap`}>{value}</p>
    </div>
  );
}

