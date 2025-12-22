import { useNavigate } from "react-router-dom";
import { MapPin, Globe, Mail, Clock, ArrowLeft } from "lucide-react";
import logoImage from "../assets/logo-dzfellah1.png";
import decor1 from "../assets/decoration.png";
import decor2 from "../assets/decoration2.png";
import vegetablesBgImage from "../assets/vegetables-bg.png";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 lg:px-16 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <img src={logoImage} alt="FELLAH" className="h-12 w-auto" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-gray-700 hover:text-[#285153] font-medium">Home</button>
            <button onClick={() => navigate("/products")} className="text-gray-700 hover:text-[#285153] font-medium">Products</button>
            <button onClick={() => navigate("/stores")} className="text-gray-700 hover:text-[#285153] font-medium">Stores</button>
          </div>

          <button 
            onClick={() => navigate("/")}
            className="bg-[#285153] hover:bg-[#1a3839] text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Go Home
          </button>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden py-24">
        <div className="max-w-2xl mx-auto text-center px-6 relative z-10">
          <h1 className="text-9xl font-bold text-[#285153] mb-4">404</h1>
          <h2 className="text-4xl font-bold text-[#285153] mb-6">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you are looking for seems to have grown legs and walked away, 
            or maybe it was harvested too early.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="bg-[#285153] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1a3839] transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Decorative background elements consistent with other pages */}
        <img src={decor2} alt="" className="absolute top-20 left-10 w-32 h-32 opacity-50" />
        <img src={decor1} alt="" className="absolute bottom-20 right-10 w-40 h-40 opacity-50" />
      </div>

      {/* Call to Action Section (Simplified) */}
      <section className="relative py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${vegetablesBgImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Looking for fresh products?
          </h2>
          <button 
            onClick={() => navigate("/products")}
            className="bg-white text-[#285153] px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors mt-4"
          >
            Browse Products
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#285153] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm">
              &copy; 2024 DZ Fellah. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-white/80"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="text-white hover:text-white/80"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-white hover:text-white/80"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-white hover:text-white/80"><i className="fab fa-youtube text-xl"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
