
import { BookOpen, Users, MessageSquare } from "lucide-react";

export const SolutionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Your 
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {" "}AI Tutor
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            ALIF (Adaptive Learning Intelligent Framework) is more than technology—
            it's a caring teacher that understands every student's unique journey.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Intelligent. Personal. Always Available.
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Adapts to Every Student</h4>
                  <p className="text-gray-700">
                    ALIF learns how each child thinks, what challenges them, and adjusts 
                    lessons in real-time to match their learning style and pace.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Speaks Your Language</h4>
                  <p className="text-gray-700">
                    Explains complex concepts in simple Urdu or English, using familiar 
                    examples from Pakistani culture and daily life.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Builds Confidence</h4>
                  <p className="text-gray-700">
                    Celebrates every achievement, provides patient support during challenges, 
                    and helps students believe in their ability to learn and grow.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-2xl">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-500 p-6 rounded-2xl text-white mb-6">
              <h4 className="text-lg font-semibold mb-2">ALIF Tutor</h4>
              <p className="text-emerald-100">Hello! I'm here to help you learn. What would you like to explore today?</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-gray-800">"Can you explain photosynthesis in simple Urdu?"</p>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-100 to-blue-100 p-4 rounded-xl">
                <p className="text-gray-800 mb-2">
                  <strong>بالکل!</strong> Photosynthesis is like cooking for plants...
                </p>
                <p className="text-sm text-gray-600">
                  🌱 Uses local examples • 🎯 Matches your level • 💡 Interactive explanations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
