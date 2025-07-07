
import { BookOpen, Calculator, FlaskConical, Globe, Languages, Palette, Music, Trophy, Users, Clock, Star, Award } from "lucide-react";

const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    urduName: 'ریاضی',
    icon: Calculator,
    description: 'From basic counting to advanced algebra and geometry',
    urduDescription: 'بنیادی گنتی سے لے کر اعلیٰ الجبرا اور ہندسہ تک',
    grades: 'Nursery - Grade 10',
    topics: ['Arithmetic', 'Algebra', 'Geometry', 'Statistics'],
    color: 'bg-blue-500'
  },
  {
    id: 'science',
    name: 'Science',
    urduName: 'سائنس',
    icon: FlaskConical,
    description: 'Explore physics, chemistry, biology and earth sciences',
    urduDescription: 'طبیعیات، کیمیا، حیاتیات اور علوم ارض کا مطالعہ',
    grades: 'Grade 1 - Grade 10',
    topics: ['Physics', 'Chemistry', 'Biology', 'Earth Science'],
    color: 'bg-green-500'
  },
  {
    id: 'english',
    name: 'English',
    urduName: 'انگریزی',
    icon: BookOpen,
    description: 'Reading, writing, grammar and literature mastery',
    urduDescription: 'پڑھنا، لکھنا، گرامر اور ادب میں مہارت',
    grades: 'Nursery - Grade 10',
    topics: ['Reading', 'Writing', 'Grammar', 'Literature'],
    color: 'bg-purple-500'
  },
  {
    id: 'urdu',
    name: 'Urdu',
    urduName: 'اردو',
    icon: Languages,
    description: 'Master the national language with literature and grammar',
    urduDescription: 'ادب اور گرامر کے ساتھ قومی زبان میں مہارت',
    grades: 'Nursery - Grade 10',
    topics: ['Grammar', 'Literature', 'Poetry', 'Composition'],
    color: 'bg-emerald-500'
  },
  {
    id: 'social',
    name: 'Social Studies',
    urduName: 'سماجی علوم',
    icon: Globe,
    description: 'History, geography, civics and cultural studies',
    urduDescription: 'تاریخ، جغرافیہ، شہریات اور ثقافتی مطالعات',
    grades: 'Grade 1 - Grade 10',
    topics: ['History', 'Geography', 'Civics', 'Culture'],
    color: 'bg-orange-500'
  },
  {
    id: 'art',
    name: 'Art & Craft',
    urduName: 'فن اور دستکاری',
    icon: Palette,
    description: 'Creative expression through drawing, painting and crafts',
    urduDescription: 'ڈرائنگ، پینٹنگ اور دستکاری کے ذریعے تخلیقی اظہار',
    grades: 'Nursery - Grade 8',
    topics: ['Drawing', 'Painting', 'Crafts', 'Design'],
    color: 'bg-pink-500'
  }
];

const features = [
  {
    icon: Users,
    title: 'Age-Appropriate Content',
    description: 'Curriculum designed specifically for each grade level'
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    description: 'Learn at your own pace, anytime, anywhere'
  },
  {
    icon: Star,
    title: 'Interactive Lessons',
    description: 'Engaging content with real-time AI assistance'
  },
  {
    icon: Award,
    title: 'Progress Tracking',
    description: 'Monitor learning progress and achievements'
  }
];

export const CoursesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Diverse Learning Opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            متنوع تعلیمی مواقع
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From early childhood to advanced studies, ALIF offers comprehensive courses 
            across multiple subjects, tailored for Pakistani students in both English and Urdu.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <div
                key={subject.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`${subject.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      {subject.grades}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
                  <p className="text-lg opacity-90">{subject.urduName}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{subject.description}</p>
                  <p className="text-gray-600 text-sm mb-4 italic">{subject.urduDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose ALIF's Diverse Curriculum?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to explore our comprehensive curriculum?
          </p>
          <a
            href="/auth"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors duration-200"
          >
            Start Learning Today
            <span className="ml-2">🚀</span>
          </a>
        </div>
      </div>
    </section>
  );
};
