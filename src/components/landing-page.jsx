"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Globe, Mail, Clock } from "lucide-react";
import FadeInSection from "./fade-in-section";
import farmerImage from "../assets/farmer.png";
import leafImage from "../assets/leaf.png";
import oliveOilImage from "../assets/olive-oil.png";
import tomatoesImage from "../assets/tomatoes.png";
import potatoesImage from "../assets/potatoes.png";
import orangesImage from "../assets/oranges.png";
import vegetablesBgImage from "../assets/vegetables-bg.png";
import logoImage from "../assets/logo-dzfellah1.png";
import decor1 from "../assets/decoration.png";
import decor2 from "../assets/decoration2.png";
import decor3 from "../assets/decoration3.png";
import decor4 from "../assets/decoration4.png";

export default function LandingPage({ onNavigateToLogin, onNavigateToSignup, onNavigateToProducts, onNavigateToStores }) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "oil 250ml",
      category: "oil, organic",
      price: null,
      image: oliveOilImage,
      seasonal: false,
    },
    {
      id: 2,
      name: "toumattich",
      category: "Seasonal, 200 DA",
      price: "200 DA",
      image: tomatoesImage,
      seasonal: true,
    },
    {
      id: 3,
      name: "batata",
      category: "Seasonal, 200 DA",
      price: "200 DA",
      image: potatoesImage,
      seasonal: true,
    },
  ];

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(products[(currentProductIndex + i) % products.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 lg:px-16 py-4 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <img src={logoImage} alt="FELLAH" className="h-12 w-auto" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-[#285153] font-medium hover:underline underline-offset-4 transition-all">Home</a>
            <a href="#about" className="text-gray-700 hover:text-[#285153] font-medium hover:underline underline-offset-4 transition-all">About</a>
            <a href="#contact" className="text-gray-700 hover:text-[#285153] font-medium hover:underline underline-offset-4 transition-all">Contact</a>
            <a href="#projects" className="text-gray-700 hover:text-[#285153] font-medium hover:underline underline-offset-4 transition-all" onClick={(e) => { e.preventDefault(); onNavigateToProducts(); }}>Products</a>
            <a href="#stores" className="text-gray-700 hover:text-[#285153] font-medium hover:underline underline-offset-4 transition-all" onClick={(e) => { e.preventDefault(); onNavigateToStores(); }}>Stores</a>
            <button 
              onClick={onNavigateToLogin}
              className="text-gray-700 hover:text-[#285153] font-medium hover:scale-105 transition-transform"
            >
              login
            </button>
          </div>

          <button 
            onClick={onNavigateToSignup}
            className="bg-[#285153] hover:bg-[#1a3839] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-[#285153] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection className="text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                Salam,
                <br />
                welcome to dz fellah
              </h1>
              <p className="text-xl font-semibold mb-4 opacity-90">Fresh from Our Farmers, Directly to You</p>
              <p className="text-white/90 mb-6 leading-relaxed max-w-lg">
                Discover local fruits, vegetables, and farm products while supporting Algeria's small producers
              </p>
              
              <div className="flex gap-4 mb-8">
                <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-110"><i className="fab fa-facebook text-xl"></i></a>
                <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-110"><i className="fab fa-instagram text-xl"></i></a>
                <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-110"><i className="fab fa-twitter text-xl"></i></a>
                <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-110"><i className="fab fa-youtube text-xl"></i></a>
              </div>

              <button 
                onClick={onNavigateToSignup}
                className="bg-white text-[#285153] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              >
                Join us
              </button>
            </FadeInSection>

            <FadeInSection delay={200} className="relative">
              <img 
                src={farmerImage} 
                alt="Farmer with vegetables" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
              {/* Decorative elements */}
              <img src={decor3} alt="" className="absolute -top-10 -right-10 w-24 h-24 animate-pulse" />
              <img src={decor2} alt="" className="absolute -bottom-10 -left-10 w-32 h-32 animate-bounce-slow" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection className="relative">
              <img 
                src={leafImage} 
                alt="Decorative leaf" 
                className="w-full max-w-md mx-auto hover:rotate-2 transition-transform duration-700"
              />
              {/* Decorative elements */}
              <img src={decor2} alt="" className="absolute -top-8 -left-8 w-24 h-24 rotate-12" />
              <img src={decor1} alt="" className="absolute -bottom-8 -left-8 w-20 h-20 -rotate-12" />
            </FadeInSection>

            <FadeInSection delay={200}>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#285153] mb-6">About Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                At <span className="font-semibold">dz Fellah</span>, we believe that access to fresh, local food can 
                transform communities. We connect farmers, small producers, and consumers to promote sustainable agriculture and support 
                local livelihoods across Algeria. Our platform makes it simple, 
                convenient, and rewarding to buy seasonal products, discover 
                high-quality seasonal products, by highlighting local producers 
                and streamlining direct purchases, we help communities access 
                fresh produce while empowering farmers to grow and thrive. 
                Together, we nurture local growth and empower citizens to make 
                conscious, meaningful choices in their daily lives.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Available Products Section */}
      <section id="products" className="py-16 lg:py-24 bg-[#285153] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <FadeInSection>
            <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-12">
              Available Products
            </h2>
          </FadeInSection>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-90 z-10"
            >
              <ChevronLeft className="w-6 h-6 text-[#285153]" />
            </button>

            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 active:scale-90 z-10"
            >
              <ChevronRight className="w-6 h-6 text-[#285153]" />
            </button>

            {/* Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleProducts().map((product, index) => (
                <FadeInSection key={`${product.id}-${index}`} delay={index * 100}>
                  <div
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="aspect-square bg-gray-100 rounded-2xl mb-4 overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.seasonal && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                          Seasonal
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#285153] mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.category}</p>
                    <button className="w-full bg-[#285153] hover:bg-[#1a3839] text-white py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-md active:scale-95">
                      add to cart
                    </button>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>

          <FadeInSection delay={300} className="text-center mt-12">
            <button className="bg-white text-[#285153] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
              See more
            </button>
          </FadeInSection>
        </div>

        {/* Decorative element */}
        <img src={decor4} alt="" className="absolute bottom-8 right-8 w-24 h-24 animate-bounce-slow" />
      </section>

      {/* Seasonal Offers Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#285153] mb-6">
                Seasonal offers
              </h2>
              <p className="text-lg font-semibold text-[#285153] mb-4">
                Special Orange Offer - Fresh, Local and Perfectly Priced
              </p>
              <p className="text-gray-700 leading-relaxed text-justify">
                Enjoy the rich taste of Algeria's finest winter oranges, 
                harvested at peak ripeness for maximum flavor and nutrition. 
                Due to high availability this year, we offer exceptional 
                prices without compromising on freshness or quality. 
                Don't miss the chance to stock up on these sweet, 
                juicy oranges—perfect for breakfast, fresh juice, or healthy 
                snacks. But oranges' shelves' wholesale value 
                won't last for long, so grab up on this limited-time offer 
                at the best price of the season!
              </p>
            </FadeInSection>

            <FadeInSection delay={200} className="relative group">
              <img 
                src={orangesImage} 
                alt="Fresh oranges" 
                className="w-full max-w-md mx-auto rounded-3xl shadow-xl transition-transform duration-500 group-hover:rotate-1"
              />
              {/* Decorative elements */}
              <img src={decor2} alt="" className="absolute -bottom-10 -right-10 w-28 h-28 animate-spin-slow" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: `url(${vegetablesBgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <FadeInSection className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Be Part of Algeria's Fresh
            <br />
            Food Revolution
          </h2>
          <p className="text-xl text-white/90 mb-8 font-light">
            Join DZ Fellah and Support Local Farmers Today
          </p>
          <button 
            onClick={onNavigateToSignup}
            className="bg-white text-[#285153] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
          >
            join us
          </button>
        </FadeInSection>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <FadeInSection>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#285153] text-center mb-12">
              contact us
            </h2>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeInSection delay={100}>
              <h3 className="text-2xl font-bold text-[#285153] mb-6">Get in touch with us</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] transition-all hover:bg-gray-50 focus:bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] transition-all hover:bg-gray-50 focus:bg-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] transition-all hover:bg-gray-50 focus:bg-white"
                />
                <textarea
                  placeholder="Type your demands"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] transition-all hover:bg-gray-50 focus:bg-white"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#285153] hover:bg-[#1a3839] text-white py-3 rounded-full font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95"
                >
                  Submit
                </button>
              </form>
            </FadeInSection>

            {/* Contact Info */}
            <FadeInSection delay={200}>
              <h3 className="text-2xl font-bold text-[#285153] mb-6">Get in touch with us</h3>
              <p className="text-gray-700 mb-8">
                If you have any questions at all, we're here to help! Our friendly team is ready 
                to assist you with any inquiries. Don't hesitate to reach out!
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: "Address", value: "Algiers, Algeria" },
                  { icon: Globe, label: "Website", value: "+213 555 555" },
                  { icon: Mail, label: "email", value: "fellah@gmail.com" },
                  { icon: Clock, label: "availability", value: "24h / 24h" },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-4 flex items-center gap-3 hover:bg-gray-200 transition-colors duration-300 group cursor-default">
                    <item.icon className="w-5 h-5 text-[#285153] group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#285153] py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm">
              Check out our social media for updates and fresh farm news
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-125"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-125"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-125"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-white hover:text-white/80 transition-transform hover:scale-125"><i className="fab fa-youtube text-xl"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
