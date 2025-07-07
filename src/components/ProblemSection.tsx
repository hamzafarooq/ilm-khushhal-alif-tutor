
export const ProblemSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Every Child Deserves 
            <span className="block text-red-600">Quality Education</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            But millions of children in Pakistan face barriers that shouldn't exist in 2024.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-red-600 mb-4">22.8M</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Children Out of School</h3>
            <p className="text-gray-600">
              Pakistan has the world's second-highest number of out-of-school children, 
              with many lacking access to quality educational resources.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-orange-600 mb-4">58%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Low Literacy Rate</h3>
            <p className="text-gray-600">
              Language barriers and inadequate teaching methods prevent children 
              from building strong foundational skills in reading and comprehension.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-amber-600 mb-4">1:50</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Teacher-Student Ratio</h3>
            <p className="text-gray-600">
              Shortage of qualified teachers means students don't get the personalized 
              attention they need to truly understand and retain knowledge.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl font-bold text-blue-600 mb-4">37%</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Internet Access</h3>
            <p className="text-gray-600">
              Many students lack reliable internet connectivity, preventing them from 
              accessing online educational resources and modern learning tools.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-100 to-orange-100 p-8 rounded-2xl text-center">
          <p className="text-lg text-gray-800 font-medium">
            When children can't learn in their native language or at their own pace, 
            <span className="text-red-700 font-semibold"> dreams remain unfulfilled</span> and 
            potential goes unrealized.
          </p>
        </div>
      </div>
    </section>
  );
};
