
export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Fatima Ahmed",
      role: "Grade 6 Student, Lahore",
      quote: "ALIF explained algebra in Urdu using cricket scores! Now I finally understand mathematics and I'm not afraid of numbers anymore.",
      avatar: "👧🏽"
    },
    {
      name: "Ustad Muhammad Hassan",
      role: "Primary School Teacher, Karachi",
      quote: "In 30 years of teaching, I've never seen students so engaged. ALIF helps me give individual attention to all 45 students in my class.",
      avatar: "👨🏽‍🏫"
    },
    {
      name: "Ayesha Malik",
      role: "Mother of 3, Islamabad",
      quote: "My children practice English and Urdu every day with ALIF. It's like having a patient, knowledgeable teacher at home 24/7.",
      avatar: "👩🏽"
    },
    {
      name: "Ahmed Ali",
      role: "Grade 8 Student, Faisalabad",
      quote: "I was failing in science, but ALIF taught me about plants using examples from our family's wheat farm. Now I love biology!",
      avatar: "👦🏽"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Stories, 
            <span className="text-blue-600"> Real Impact</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Hear from students, teachers, and parents across Pakistan who are experiencing 
            the joy of personalized, culturally-relevant learning.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white px-8 py-4 rounded-full shadow-lg">
            <span className="text-2xl mr-3">🎉</span>
            <span className="text-lg font-semibold text-gray-900">
              Join 10,000+ students already learning with ALIF
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
