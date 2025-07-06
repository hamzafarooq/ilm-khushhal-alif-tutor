
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              ALIF AI Tutor
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Starting with الف (Alif), the first letter of learning. Empowering every Pakistani student 
              with intelligent, culturally-relevant, and personalized education in both English and Urdu.
            </p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>🇵🇰 Made with love in Pakistan</p>
              <p>🌟 For Pakistani students, by Pakistani educators</p>
              <p>⚡ Powered by Traversaal.ai • 2025</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">For Schools</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">For Parents</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📧 hello@traversaal.ai</li>
              <li>📱 +92 300 1234567</li>
              <li>📍 Karachi, Pakistan</li>
              <li>
                <div className="flex space-x-3 mt-4">
                  <span className="text-2xl">🌐</span>
                  <span className="text-2xl">📱</span>
                  <span className="text-2xl">💬</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 ALIF AI Tutor by Traversaal.ai. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <p className="text-gray-400 text-sm">
            Built with ❤️ for the future of Pakistani education
          </p>
        </div>
      </div>
    </footer>
  );
};
