
import { BookOpen } from "lucide-react";

interface ChatHeaderProps {
  selectedSubject?: string;
  selectedGrade?: string;
}

export const ChatHeader = ({ selectedSubject, selectedGrade }: ChatHeaderProps) => {
  return (
    <div className="bg-white border-b p-6">
      <div className="flex items-center">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-full mr-3">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">ALIF Tutor (الف)</h2>
          <p className="text-sm text-gray-600">
            آپ کا ذاتی اردو استاد • Your Personal Urdu Tutor
            {selectedSubject && selectedGrade && (
              <span className="ml-2 text-emerald-600 font-medium">
                | {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} - {selectedGrade.charAt(0).toUpperCase() + selectedGrade.slice(1)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
