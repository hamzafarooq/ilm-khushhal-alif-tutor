
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, Calculator, Globe, FlaskConical, Languages, Palette, Music, Trophy } from "lucide-react";

interface SampleQuestionsProps {
  onQuestionSelect: (question: string) => void;
  isVisible: boolean;
  selectedSubject?: string;
  selectedGrade?: string;
}

export const SampleQuestions = ({ onQuestionSelect, isVisible, selectedSubject, selectedGrade }: SampleQuestionsProps) => {
  const getSubjectSpecificQuestions = () => {
    const gradeLevel = selectedGrade?.includes('nursery') || selectedGrade?.includes('kg') ? 'early' : 
                     selectedGrade?.includes('grade1') || selectedGrade?.includes('grade2') || selectedGrade?.includes('grade3') ? 'elementary' :
                     selectedGrade?.includes('grade4') || selectedGrade?.includes('grade5') || selectedGrade?.includes('grade6') ? 'middle' : 'high';

    const questionsBySubject: Record<string, any> = {
      math: {
        early: [
          { icon: <Calculator className="w-4 h-4" />, text: "Count from 1 to 10", category: "Basic Counting" },
          { icon: <Calculator className="w-4 h-4" />, text: "What comes after 5?", category: "Number Sequence" },
          { icon: <Calculator className="w-4 h-4" />, text: "2 + 2 = ?", category: "Simple Addition" },
          { icon: <Calculator className="w-4 h-4" />, text: "Show me shapes around us", category: "Shapes" }
        ],
        elementary: [
          { icon: <Calculator className="w-4 h-4" />, text: "15 + 27 = ?", category: "Addition" },
          { icon: <Calculator className="w-4 h-4" />, text: "What is 8 × 7?", category: "Multiplication" },
          { icon: <Calculator className="w-4 h-4" />, text: "Tell me about fractions", category: "Fractions" },
          { icon: <Calculator className="w-4 h-4" />, text: "How to measure length?", category: "Measurement" }
        ],
        middle: [
          { icon: <Calculator className="w-4 h-4" />, text: "Solve: 3x + 15 = 30", category: "Algebra" },
          { icon: <Calculator className="w-4 h-4" />, text: "Find the area of a rectangle", category: "Geometry" },
          { icon: <Calculator className="w-4 h-4" />, text: "What are decimals?", category: "Decimals" },
          { icon: <Calculator className="w-4 h-4" />, text: "Explain percentage", category: "Percentage" }
        ],
        high: [
          { icon: <Calculator className="w-4 h-4" />, text: "Solve: 2x + 5 = 15", category: "Algebra" },
          { icon: <Calculator className="w-4 h-4" />, text: "Pythagorean theorem", category: "Geometry" },
          { icon: <Calculator className="w-4 h-4" />, text: "Calculate compound interest", category: "Finance Math" },
          { icon: <Calculator className="w-4 h-4" />, text: "Quadratic equations", category: "Advanced Algebra" }
        ]
      },
      science: {
        early: [
          { icon: <FlaskConical className="w-4 h-4" />, text: "What do plants need to grow?", category: "Life Science" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Hot and cold things", category: "Physical Science" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Day and night", category: "Earth Science" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Parts of our body", category: "Human Body" }
        ],
        elementary: [
          { icon: <FlaskConical className="w-4 h-4" />, text: "What is photosynthesis?", category: "Biology" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "States of matter", category: "Chemistry" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Solar system planets", category: "Astronomy" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "How do magnets work?", category: "Physics" }
        ],
        middle: [
          { icon: <FlaskConical className="w-4 h-4" />, text: "Explain photosynthesis", category: "Biology" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Chemical reactions", category: "Chemistry" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Force and motion", category: "Physics" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Water cycle", category: "Earth Science" }
        ],
        high: [
          { icon: <FlaskConical className="w-4 h-4" />, text: "DNA and genetics", category: "Advanced Biology" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Periodic table", category: "Chemistry" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Newton's laws", category: "Physics" },
          { icon: <FlaskConical className="w-4 h-4" />, text: "Climate change", category: "Environmental Science" }
        ]
      },
      urdu: {
        early: [
          { icon: <Languages className="w-4 h-4" />, text: "اردو حروف تہجی", category: "Urdu Alphabet" },
          { icon: <Languages className="w-4 h-4" />, text: "آسان الفاظ", category: "Simple Words" },
          { icon: <Languages className="w-4 h-4" />, text: "رنگوں کے نام", category: "Colors" },
          { icon: <Languages className="w-4 h-4" />, text: "نمبرز اردو میں", category: "Numbers in Urdu" }
        ],
        elementary: [
          { icon: <Languages className="w-4 h-4" />, text: "اردو میں فعل کیا ہے؟", category: "Urdu Grammar" },
          { icon: <Languages className="w-4 h-4" />, text: "اسم کی اقسام", category: "Types of Nouns" },
          { icon: <Languages className="w-4 h-4" />, text: "آسان شاعری", category: "Simple Poetry" },
          { icon: <Languages className="w-4 h-4" />, text: "روزمرہ کے جملے", category: "Daily Sentences" }
        ],
        middle: [
          { icon: <Languages className="w-4 h-4" />, text: "اردو میں فعل کیا ہے؟", category: "Urdu Grammar" },
          { icon: <Languages className="w-4 h-4" />, text: "مرکب اور مشتق الفاظ", category: "Compound Words" },
          { icon: <Languages className="w-4 h-4" />, text: "اردو کہانیاں", category: "Urdu Stories" },
          { icon: <Languages className="w-4 h-4" />, text: "محاورے اور کہاوتیں", category: "Idioms" }
        ],
        high: [
          { icon: <Languages className="w-4 h-4" />, text: "اردو ادب کی تاریخ", category: "Urdu Literature" },
          { icon: <Languages className="w-4 h-4" />, text: "غزل اور نظم", category: "Poetry Forms" },
          { icon: <Languages className="w-4 h-4" />, text: "اردو میں مضمون نویسی", category: "Essay Writing" },
          { icon: <Languages className="w-4 h-4" />, text: "مشہور شعراء", category: "Famous Poets" }
        ]
      }
    };

    return questionsBySubject[selectedSubject || 'general']?.[gradeLevel] || [];
  };

  const defaultQuestions = [
    {
      icon: <Calculator className="w-4 h-4" />,
      text: "Solve: 2x + 5 = 15",
      category: "Math"
    },
    {
      icon: <Languages className="w-4 h-4" />,
      text: "اردو میں فعل کیا ہے؟",
      category: "Urdu Grammar"
    },
    {
      icon: <FlaskConical className="w-4 h-4" />,
      text: "Explain photosynthesis",
      category: "Science"
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Pakistan کی ثقافت کے بارے میں بتائیں",
      category: "Culture"
    }
  ];

  const sampleQuestions = selectedSubject ? getSubjectSpecificQuestions() : defaultQuestions;

  if (!isVisible) return null;

  return (
    <div className="p-6 border-b bg-gradient-to-r from-emerald-50 to-blue-50">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {selectedSubject && selectedGrade 
          ? `Try these ${selectedSubject} questions for ${selectedGrade}:`
          : "Try asking ALIF:"
        }
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
