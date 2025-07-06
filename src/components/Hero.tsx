import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleTryFree = () => {
    navigate("/auth");
  };

  const handleWatchDemo = () => {
    // Smooth scroll to demo section
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-600 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-amber-500 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-400 rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-8 inline-flex items-center px-6 py-3 bg-emerald-100 rounded-full text-emerald-800 font-medium">
          <BookOpen className="w-5 h-5 mr-2" />
          Powered by ALIF - The First Letter of Learning (الف) | Traversaal.ai
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Learn Confidently.
          <span className="block bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Learn Locally.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
          Meet ALIF - your AI tutor that speaks your language, understands your culture, and adapts to your learning style.
        </p>
        
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Starting with الف (Alif), the first letter of the Urdu alphabet, we're building the foundation 
          for quality education across Pakistan. Empowering students with personalized learning in both English and Urdu.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            onClick={handleTryFree}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Try ALIF Tutor for Free
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={handleWatchDemo}
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg font-semibold rounded-xl"
          >
            Watch Demo
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 space-y-1">
          <p>✨ No credit card required • Available 24/7 • Works on any device</p>
          <p className="font-medium text-emerald-700">اردو اور انگریزی میں دستیاب - Available in Urdu and English</p>
          <p className="text-xs text-gray-400 mt-2">Powered by Traversaal.ai • 2025</p>
        </div>
      </div>
    </section>
  );
};
