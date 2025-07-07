
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BookOpen, Calculator, FlaskConical, Globe, Languages, Palette, Music, Trophy } from "lucide-react";

interface SubjectSelectionProps {
  onSelectionComplete: (subject: string, grade: string) => void;
}

const subjects = [
  { id: 'math', name: 'Mathematics', icon: Calculator, description: 'Numbers, algebra, geometry and problem solving' },
  { id: 'science', name: 'Science', icon: FlaskConical, description: 'Physics, chemistry, biology and experiments' },
  { id: 'english', name: 'English', icon: BookOpen, description: 'Reading, writing, grammar and literature' },
  { id: 'urdu', name: 'Urdu', icon: Languages, description: 'اردو زبان، ادب اور تحریر' },
  { id: 'social', name: 'Social Studies', icon: Globe, description: 'History, geography and civics' },
  { id: 'art', name: 'Art & Craft', icon: Palette, description: 'Drawing, painting and creative activities' },
  { id: 'music', name: 'Music', icon: Music, description: 'Songs, instruments and rhythm' },
  { id: 'sports', name: 'Physical Education', icon: Trophy, description: 'Sports, exercise and health' },
];

const grades = [
  { id: 'nursery', name: 'Nursery', description: 'Ages 3-4' },
  { id: 'kg', name: 'Kindergarten', description: 'Ages 4-5' },
  { id: 'grade1', name: 'Grade 1', description: 'Ages 5-6' },
  { id: 'grade2', name: 'Grade 2', description: 'Ages 6-7' },
  { id: 'grade3', name: 'Grade 3', description: 'Ages 7-8' },
  { id: 'grade4', name: 'Grade 4', description: 'Ages 8-9' },
  { id: 'grade5', name: 'Grade 5', description: 'Ages 9-10' },
  { id: 'grade6', name: 'Grade 6', description: 'Ages 10-11' },
  { id: 'grade7', name: 'Grade 7', description: 'Ages 11-12' },
  { id: 'grade8', name: 'Grade 8', description: 'Ages 12-13' },
  { id: 'grade9', name: 'Grade 9', description: 'Ages 13-14' },
  { id: 'grade10', name: 'Grade 10', description: 'Ages 14-15' },
];

export const SubjectSelection = ({ onSelectionComplete }: SubjectSelectionProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  const handleStartLearning = () => {
    if (selectedSubject && selectedGrade) {
      onSelectionComplete(selectedSubject, selectedGrade);
    }
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
  const selectedGradeData = grades.find(g => g.id === selectedGrade);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            What would you like to learn today?
          </h1>
          <p className="text-xl text-gray-600">
            آج آپ کیا سیکھنا چاہتے ہیں؟
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subject Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Choose Subject / مضمون منتخب کریں
              </CardTitle>
              <CardDescription>
                Select the subject you want to learn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
                <div className="grid grid-cols-1 gap-3">
                  {subjects.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <div key={subject.id}>
                        <RadioGroupItem
                          value={subject.id}
                          id={subject.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={subject.id}
                          className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-emerald-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 cursor-pointer transition-all"
                        >
                          <Icon className="w-6 h-6 text-emerald-600" />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{subject.name}</div>
                            <div className="text-sm text-gray-600">{subject.description}</div>
                          </div>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Grade Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Choose Grade / جماعت منتخب کریں
              </CardTitle>
              <CardDescription>
                Select your current grade level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedGrade} onValueChange={setSelectedGrade}>
                <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                  {grades.map((grade) => (
                    <div key={grade.id}>
                      <RadioGroupItem
                        value={grade.id}
                        id={grade.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={grade.id}
                        className="flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{grade.name}</div>
                          <div className="text-sm text-gray-600">{grade.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Selection Summary and Start Button */}
        {(selectedSubject || selectedGrade) && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Selection / آپ کا انتخاب
                </h3>
                <div className="flex justify-center gap-8 mb-6">
                  {selectedSubjectData && (
                    <div className="text-center">
                      <div className="font-medium text-emerald-600">Subject</div>
                      <div className="text-gray-900">{selectedSubjectData.name}</div>
                    </div>
                  )}
                  {selectedGradeData && (
                    <div className="text-center">
                      <div className="font-medium text-blue-600">Grade</div>
                      <div className="text-gray-900">{selectedGradeData.name}</div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleStartLearning}
                  disabled={!selectedSubject || !selectedGrade}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                >
                  Start Learning / سیکھنا شروع کریں 🚀
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
