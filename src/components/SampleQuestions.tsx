
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, Calculator, Globe } from "lucide-react";

interface SampleQuestionsProps {
  onQuestionSelect: (question: string) => void;
  isVisible: boolean;
}

export const SampleQuestions = ({ onQuestionSelect, isVisible }: SampleQuestionsProps) => {
  const sampleQuestions = [
    {
      icon: <Calculator className="w-4 h-4" />,
      text: "Solve: 2x + 5 = 15",
      category: "Math"
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: "اردو میں فعل کیا ہے؟",
      category: "Urdu Grammar"
    },
    {
      icon: <Globe className="w-4 h-4" />,
      text: "Explain photosynthesis",
      category: "Science"
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Pakistan کی ثقافت کے بارے میں بتائیں",
      category: "Culture"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="p-6 border-b bg-gradient-to-r from-emerald-50 to-blue-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Try asking ALIF:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {sampleQuestions.map((question, index) => (
          <Button
            key={index}
            onClick={() => onQuestionSelect(question.text)}
            variant="outline"
            className="h-auto p-4 text-left justify-start hover:bg-white hover:border-emerald-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="text-emerald-600">
                {question.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {question.text}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {question.category}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
