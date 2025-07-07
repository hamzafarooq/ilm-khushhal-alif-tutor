
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
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Interactive. Bilingual. Always Learning.
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full min-w-fit">
                  <span className="text-2xl">🗣️</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Natural Conversation</h4>
                  <p className="text-gray-700">
                    Chat with ALIF just like you would with a friend. Ask questions in 
                    English, Urdu, or mix both languages naturally.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full min-w-fit">
                  <span className="text-2xl">🇵🇰</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Pakistani Context</h4>
                  <p className="text-gray-700">
                    Learn math with Pakistani rupees, science with local examples, 
                    and stories that reflect our rich cultural heritage.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-3 rounded-full min-w-fit">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Instant Help</h4>
                  <p className="text-gray-700">
                    Get explanations, solve problems, and clear doubts instantly. 
                    ALIF is always ready to help, day or night.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="w-full">
              <img 
                src="/lovable-uploads/273ac8b5-bec1-4443-bf00-ed6c0a7aa7bc.png" 
                alt="Pakistani child looking up with hope and curiosity"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
            
            <div className="w-full">
              <ChatbotDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
