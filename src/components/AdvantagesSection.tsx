
export const AdvantagesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Why ALIF Tutor 
            <span className="block text-emerald-600">Beats ChatGPT</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Designed specifically for Pakistani students with unique advantages that make learning more accessible and effective.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Offline Deployment</h3>
            <p className="text-gray-600">
              Works without internet connection, making quality education accessible to everyone, 
              even in areas with limited connectivity.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🇵🇰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cultural Context</h3>
            <p className="text-gray-600">
              Understands Pakistani education system, local examples, and cultural nuances 
              that make learning more relatable and effective.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Internet Search</h3>
            <p className="text-gray-600">
              Always up-to-date information with live internet search capabilities, 
              providing the latest knowledge and resources.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Document-based Learning</h3>
            <p className="text-gray-600">
              Upload your textbooks and study materials for personalized help based on 
              your actual curriculum and learning resources.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Voice Chat in Urdu</h3>
            <p className="text-gray-600">
              Natural conversation in your native language, making learning more 
              comfortable and intuitive for Pakistani students.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Free</h3>
            <p className="text-gray-600">
              No subscription fees or usage limits. Quality education should be 
              accessible to all, regardless of economic background.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
