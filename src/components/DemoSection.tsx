
import { ChatbotDemo } from "./ChatbotDemo";

export const DemoSection = () => {
  return (
    <section id="demo-section" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            See ALIF in 
            <span className="text-blue-600"> Action</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Experience how ALIF seamlessly switches between English and Urdu, 
            using familiar examples to make learning engaging and effective.
          </p>
        </div>
        
        {/* Main Demo Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src="/lovable-uploads/273ac8b5-bec1-4443-bf00-ed6c0a7aa7bc.png" 
              alt="Pakistani child looking up with hope and curiosity"
              className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
            />
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <ChatbotDemo />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🗣️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Natural Conversation</h3>
            <p className="text-gray-700">
              Chat with ALIF just like you would with a friend. Ask questions in 
              English, Urdu, or mix both languages naturally.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🇵🇰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Pakistani Context</h3>
            <p className="text-gray-700">
              Learn math with Pakistani rupees, science with local examples, 
              and stories that reflect our rich cultural heritage.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-amber-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Help</h3>
            <p className="text-gray-700">
              Get explanations, solve problems, and clear doubts instantly. 
              ALIF is always ready to help, day or night.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
