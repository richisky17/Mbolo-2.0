"use client";

import LottieMascot from "@/components/LottieMascot";

type QuestionBubbleProps = {
  question: string;
};

const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <LottieMascot
        width={60}
        height={60}
        className="hidden lg:block"
      />

      <LottieMascot
        width={40}
        height={40}
        className="block lg:hidden"
      />

      <div className="relative border-2 rounded-xl text-sm lg:text-base px-4 py-2">
        {question}
        <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};

export default QuestionBubble;
