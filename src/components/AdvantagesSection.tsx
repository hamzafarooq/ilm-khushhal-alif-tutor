
export const AdvantagesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Why 
            <span className="text-emerald-600"> ALIF Tutor</span> beats 
            <span className="text-gray-700"> ChatGPT</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Designed specifically for Pakistani students with features that matter most for local education.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Offline Deployment</h3>
            <p className="text-gray-600">
              Works without internet connection, making quality education accessible 
              to everyone, even in remote areas with poor connectivity.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🇵🇰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Context</h3>
            <p className="text-gray-600">
              Understands Pakistani education system, local examples, 
              and cultural nuances that generic AI tools miss.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Internet Search</h3>
            <p className="text-gray-600">
              Always up-to-date information with live web search capabilities 
              when internet is available.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Document-based Learning</h3>
            <p className="text-gray-600">
              Upload your textbooks and get personalized help based on 
              your specific curriculum and materials.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Chat in Urdu</h3>
            <p className="text-gray-600">
              Natural conversation in your native language with 
              advanced speech recognition and synthesis.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Learning</h3>
            <p className="text-gray-600">
              Adapts to your learning pace and style, providing customized 
              explanations and practice problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
