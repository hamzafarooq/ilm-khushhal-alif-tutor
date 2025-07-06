
import { Button } from "@/components/ui/button";

export const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform 
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {" "}Education?
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Join schools, NGOs, and families across Pakistan who are already 
            empowering their students with ALIF's intelligent tutoring.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🏫</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Schools & Institutions</h3>
            <p className="text-gray-600 mb-6">
              Pilot ALIF in your classrooms and see immediate improvement in student engagement and learning outcomes.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Request School Demo
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">NGOs & Organizations</h3>
            <p className="text-gray-600 mb-6">
              Partner with us to bring quality education to underserved communities across Pakistan.
            </p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Partner With Us
            </Button>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Parents & Students</h3>
            <p className="text-gray-600 mb-6">
              Give your children the gift of personalized learning that adapts to their unique needs and interests.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Start Free Trial
            </Button>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-12 rounded-3xl text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Early Access Program</h3>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Be among the first to experience ALIF's revolutionary approach to education. 
            Limited spots available for our pilot program launching this month.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
            >
              Join Early Access
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Schedule a Call
            </Button>
          </div>
          
          <p className="text-sm text-emerald-200 mt-6">
            ⚡ Limited time: Free access for first 1000 students • No setup fees • Full support included
          </p>
        </div>
      </div>
    </section>
  );
};
