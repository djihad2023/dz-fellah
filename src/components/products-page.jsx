import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, MapPin, Globe, Mail, Clock, Plus } from "lucide-react";
import ProductDetailModal from "./product-detail-modal";
import AddProductModal from "./add-product-modal";

// Assets
import logoImage from "../assets/logo-dzfellah.png";
import farmerImage from "../assets/farmer.png"; // Placeholder for hero
import leafImage from "../assets/leaf.png";
import decor1 from "../assets/decoration.png";
import decor2 from "../assets/decoration2.png";
import decor4 from "../assets/decoration4.png";

// Store Images
import farmThumb1 from "../assets/farm-thumb-1.png";
import farmThumb2 from "../assets/farm-thumb-2.png";

// Product Images
import oliveOilImage from "../assets/olive-oil.png";
import tomatoesImage from "../assets/tomatoes.png";
import potatoesImage from "../assets/potatoes.png";
import orangesImage from "../assets/oranges.png"; // For moudarine
import honeyImage from "../assets/asel-nature.png";
import datesImage from "../assets/deglet-nour.png";
import milkImage from "../assets/halib-frech.png";
import lbenImage from "../assets/lben-elmaraa.png";
import mandarinImage from "../assets/mandarine.png";
import fromageImage from "../assets/fromage.png";

export default function ProductsPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup, onNavigateToStores }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "zit zitoun",
      farm: "tizi_wezou_farm",
      price: "700Da/Liter",
      category: "Oils",
      image: oliveOilImage,
      seasonal: false,
    },
    {
      id: 2,
      name: "toumatich",
      farm: "boumerdas_lands",
      price: "200Da/kg",
      category: "Vegetables",
      image: tomatoesImage,
      seasonal: true,
    },
    {
      id: 3,
      name: "batata",
      farm: "oued_souf_farms",
      price: "100Da/kg",
      category: "Vegetables",
      image: potatoesImage,
      seasonal: true,
    },
    {
      id: 4,
      name: "Asel_nature",
      farm: "jijel_mountain_farm",
      price: "1500Da/jar",
      category: "Honey",
      image: honeyImage,
      seasonal: false,
    },
    {
      id: 5,
      name: "deglet_nour",
      farm: "biskra_oases",
      price: "700Da/kg",
      category: "Dates",
      image: datesImage,
      seasonal: true,
    },
    {
      id: 6,
      name: "moudarine",
      farm: "djnan_rezlane_orange",
      price: "150Da/kg",
      category: "Fruits",
      image: mandarinImage,
      seasonal: true,
    },
    {
      id: 7,
      name: "fromage",
      farm: "boumerdes",
      price: "1000Da/kg",
      category: "Dairy",
      image: fromageImage, 
      seasonal: false,
    },
    {
      id: 8,
      name: "lben_elmaraa",
      farm: "setif_farms_mezloug",
      price: "250Da/Liter",
      category: "Dairy",
      image: lbenImage,
      seasonal: false,
    },
    {
      id: 9,
      name: "halib_frech",
      farm: "milas_farms",
      price: "150Da/Liter",
      category: "Dairy",
      image: milkImage,
      seasonal: false,
    },
  ];

  const stores = [
    {
      id: 1,
      name: "tizi_wezou_farm",
      farmerName: "taher miloudi",
      image: farmThumb2,
      avatar: farmThumb1,
      products: "vegetables, oils"
    },
    {
      id: 2,
      name: "boumerdas_lands",
      farmerName: "salah chawdar",
      image: farmThumb1,
      avatar: farmerImage,
      products: "vegetables, fruits"
    },
    {
      id: 3,
      name: "tizi_wezou_farm",
      farmerName: "moustafa farhan",
      image: farmThumb2,
      avatar: farmThumb1,
      products: "vegetables, fruits"
    },
    // Adding duplicates for carousel testing
    { id: 4, name: "tizi_wezou_farm", farmerName: "taher miloudi", image: farmThumb2, avatar: farmThumb1, products: "vegetables, oils" },
    { id: 5, name: "boumerdas_lands", farmerName: "salah chawdar", image: farmThumb1, avatar: farmerImage, products: "vegetables, fruits" },
  ];

  const nextStore = () => {
    setCurrentStoreIndex((prev) => (prev + 1) % stores.length);
  };

  const prevStore = () => {
    setCurrentStoreIndex((prev) => (prev - 1 + stores.length) % stores.length);
  };

  const getVisibleStores = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(stores[(currentStoreIndex + i) % stores.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation Bar */}
      <nav className="bg-[#285153] px-6 lg:px-16 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateToHome}>
            {/* Using a filter to make the logo white if it's not already, or we can switch to the white logo asset if available */}
             <img src={logoImage} alt="FELLAH" className="h-8 w-auto brightness-0 invert" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={onNavigateToHome} className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">home</button>
            <button onClick={onNavigateToHome} className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">About</button>
            <a href="#contact" className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">Contact</a>
            <button className="text-white font-bold border-b-2 border-white">Products</button>
            <button onClick={onNavigateToStores} className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">Stores</button>
            <button 
              onClick={onNavigateToLogin}
              className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100"
            >
              login
            </button>
          </div>

          <button 
            onClick={onNavigateToSignup}
            className="bg-white hover:bg-gray-100 text-[#285153] px-6 py-2 rounded-full font-semibold transition-colors"
          >
            sign up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#eff3f3] relative overflow-hidden py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div className="relative">
              <img 
                src={farmerImage} 
                alt="Farmer showing products" 
                className="w-full max-w-md mx-auto rounded-3xl z-10 relative"
              />
              <img src={decor2} alt="" className="absolute top-0 left-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2" />
              <img src={leafImage} alt="" className="absolute bottom-0 right-0 w-32 h-32 translate-x-1/4 translate-y-1/4 opacity-50" />
            </div>

            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#285153] mb-4">
                Discover our products
              </h1>
              <p className="text-[#285153] font-semibold mb-2">Fresh from Our Farmers, Directly to You</p>
              <p className="text-gray-600 mb-6 max-w-md">
                Discover local fruits, vegetables, and farm products while supporting Algeria's small producers
              </p>
              
              <div className="flex gap-4 text-gray-400 mb-8">
                <i className="fab fa-whatsapp text-xl"></i>
                <i className="fab fa-instagram text-xl"></i>
                <i className="fab fa-facebook text-xl"></i>
                <i className="fab fa-linkedin text-xl"></i>
              </div>

              <div className="relative max-w-md mb-6">
                <input
                  type="text"
                  placeholder="search for a Product"
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Demo Add Product Button */}
               <button 
                  onClick={() => setShowAddProduct(true)}
                  className="bg-[#285153] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1f4042] transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add New Product
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar & Filters */}
      <section className="bg-[#3e5f60] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center text-white">
          <h2 className="text-xl font-bold mb-4 md:mb-0">Search by Category</h2>
          <select 
            className="bg-white text-gray-700 px-4 py-2 rounded-lg w-full md:w-64 focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Choose category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Oils">Oils</option>
            <option value="Honey">Honey</option>
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-[#3e5f60] pb-20 pt-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-[#285153] mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 font-semibold mb-2">{product.farm}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-[#8B7355] text-sm font-medium">price :{product.price}</p>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-[#4A6768] text-white text-xs px-4 py-1.5 rounded bg-opacity-90 hover:bg-opacity-100 transition-colors"
                    >
                      See details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-12">
            <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-6 h-6 text-[#285153]" />
            </button>
            <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-6 h-6 text-[#285153]" />
            </button>
          </div>
        </div>
      </section>

      {/* Some of Our Stores Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#285153] text-center mb-12 uppercase">
            SOME OF OUR STORES
          </h2>

          <div className="relative">
             {/* Navigation Arrows */}
            <button
              onClick={prevStore}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-[#3e5f60] rounded-full p-3 shadow-lg hover:bg-[#285153] transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextStore}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-[#3e5f60] rounded-full p-3 shadow-lg hover:bg-[#285153] transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleStores().map((store, index) => (
                <div key={`${store.id}-${index}`} className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  {/* Background Image */}
                  <img 
                    src={store.image} 
                    alt={store.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#285153]/90 via-[#285153]/40 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
                    <h3 className="text-xl font-bold text-white mb-2">{store.name}</h3>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                        src={store.avatar} 
                        alt={store.farmerName} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <span className="text-white text-sm font-medium">{store.farmerName}</span>
                    </div>

                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-xs text-gray-300 mb-0.5">products types:</p>
                          <p className="text-xs font-semibold text-white">{store.products}</p>
                       </div>
                       
                       <button className="bg-white text-[#285153] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors">
                         see more
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={onNavigateToStores}
              className="bg-[#3e5f60] text-white px-8 py-3 rounded-full font-bold hover:bg-[#285153] transition-colors"
            >
              See more
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section (Reused) */}
      <section id="contact" className="py-16 lg:py-24 bg-[#285153] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-12">
            contact us
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get in touch with us</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] text-gray-800"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] text-gray-800"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] text-gray-800"
                />
                <textarea
                  placeholder="Type your demands"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153] text-gray-800"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-[#285153] py-3 rounded-full font-bold transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get in touch with us</h3>
              <p className="text-gray-200 mb-8">
                If you have any questions at all, we're here to help! Our friendly team is ready 
                to assist you with any inquiries. Don't hesitate to reach out!
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#3e5f60] rounded-lg p-4 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white" />
                  <div>
                    <p className="font-semibold text-sm text-white">Address</p>
                    <p className="text-xs text-gray-200">Algiers, Algeria</p>
                  </div>
                </div>

                <div className="bg-[#3e5f60] rounded-lg p-4 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-white" />
                  <div>
                    <p className="font-semibold text-sm text-white">Website</p>
                    <p className="text-xs text-gray-200">+213 555 555</p>
                  </div>
                </div>

                <div className="bg-[#3e5f60] rounded-lg p-4 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <div>
                    <p className="font-semibold text-sm text-white">email</p>
                    <p className="text-xs text-gray-200">fellah@gmail.com</p>
                  </div>
                </div>

                <div className="bg-[#3e5f60] rounded-lg p-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white" />
                  <div>
                    <p className="font-semibold text-sm text-white">availability</p>
                    <p className="text-xs text-gray-200">24h / 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#285153] py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm">
              Check out our social media for updates and fresh farm news
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProductModal 
            onClose={() => setShowAddProduct(false)}
            onProductAdded={(newProduct) => console.log("New Product Added:", newProduct)}
        />
      )}
    </div>
  );
}
