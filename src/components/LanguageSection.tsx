
export const LanguageSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              دونوں زبانوں میں سیکھیں
              <span className="block text-green-200">Learn in Both Languages</span>
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              ALIF seamlessly switches between Urdu and English, helping students 
              build confidence in both languages while mastering core subjects.
            </p>
            
            <div className="Space-y-6">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">🗣️ Natural Language Processing</h3>
                <p className="text-green-100">
                  Ask questions in your preferred language and get explanations 
                  that make sense in your cultural context.
                </p>
              </div>
              
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">📚 Bilingual Content</h3>
                <p className="text-green-100">
                  All lessons available in both languages with culturally relevant 
                  examples and Pakistani curriculum alignment.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-gray-900">
            <h3 className="text-2xl font-bold mb-6 text-center">Language Switching Demo</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="font-medium text-blue-800">Student:</p>
                <p>"What is the water cycle? اردو میں بتائیے"</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="font-medium text-green-800">ALIF:</p>
                <p className="mb-2">
                  <strong>Water Cycle (پانی کا چکر):</strong>
                </p>
                <p className="text-sm">
                  The water cycle is like a continuous journey of water. پانی سمندر سے بخارات بن کر اوپر جاتا ہے...
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-xl text-center">
                <p className="text-sm text-amber-700 font-medium">
                  ✨ Switches languages naturally • Uses local examples • Maintains context
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
