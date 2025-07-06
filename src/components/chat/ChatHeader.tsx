
import { BookOpen } from "lucide-react";

export const ChatHeader = () => {
  return (
    <div className="bg-white border-b p-6">
      <div className="flex items-center">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-full mr-3">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">ALIF Tutor (الف)</h2>
          <p className="text-sm text-gray-600">آپ کا ذاتی اردو استاد • Your Personal Urdu Tutor</p>
        </div>
      </div>
    </div>
  );
};
