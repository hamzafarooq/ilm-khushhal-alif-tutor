
import { BookOpen, MessageSquare, Users, School } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Personalized Learning Paths",
      description: "Every child learns differently. ALIF creates custom lesson plans that adapt to your pace, interests, and learning style.",
      color: "emerald"
    },
    {
      icon: MessageSquare,
      title: "Voice & Chat Learning",
      description: "Ask questions naturally in Urdu or English. ALIF responds with patience, just like a caring teacher would.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Cultural Context",
      description: "Learn math with Pakistani rupees, science with local examples, and stories that reflect our rich heritage.",
      color: "amber"
    },
    {
      icon: School,
      title: "Foundation Subjects",
      description: "Master reading, writing, mathematics, and science fundamentals with interactive lessons and practice.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      amber: "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
      orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Students Love 
            <span className="text-emerald-600"> ALIF</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Designed with love for Pakistani students, by educators who understand 
            the unique challenges and opportunities in our education system.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-blue-600 p-8 rounded-3xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Available Anytime, Anywhere</h3>
          <p className="text-lg text-emerald-100 max-w-3xl mx-auto">
            Whether it's 6 AM before school or 10 PM during homework time, ALIF is ready to help. 
            Works on smartphones, tablets, and computers with offline capabilities coming soon.
          </p>
        </div>
      </div>
    </section>
  );
};
