
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
    <section className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-rose-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Hero Image - More visible */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f7c634e7-8f5e-4b73-af4c-54e54f5e59b5.png" 
          alt="Pakistani children running joyfully in golden sunset light"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 via-transparent to-rose-900/30"></div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 z-1">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-rose-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-600 rounded-full"></div>
      </div>
      
      {/* Content positioned to the left side */}
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <div className="mb-8 inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 font-medium border border-red-200/50 shadow-lg">
            <BookOpen className="w-5 h-5 mr-2" />
            <span className="text-red-600">Powered by Traversaal.ai</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Learn with 
            <span className="block bg-gradient-to-r from-red-300 via-rose-300 to-pink-300 bg-clip-text text-transparent">
              ALIF Tutor
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-red-200 font-medium mt-2">
              الف ٹیوٹر
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl leading-relaxed font-medium drop-shadow-lg">
            Your AI tutor that speaks your language and understands your culture. Better than ChatGPT for Pakistani students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              onClick={handleTryFree}
              className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-0"
            >
              Try ALIF Tutor for Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleWatchDemo}
              className="border-2 border-white text-white hover:bg-white hover:text-red-700 bg-white/20 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="text-sm text-white space-y-1 bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <p>✨ No credit card required • Available 24/7 • Works offline</p>
            <p className="font-medium text-red-200">اردو اور انگریزی میں دستیاب</p>
            <p className="text-xs text-red-100 mt-2">Powered by Traversaal.ai • 2025</p>
          </div>
        </div>
        
        {/* Right side - let the image show through */}
        <div className="hidden lg:block">
          {/* This space allows the image to be more visible */}
        </div>
      </div>
    </section>
  );
};
