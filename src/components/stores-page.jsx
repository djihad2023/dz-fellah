import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, MapPin, Globe, Mail, Clock, ArrowLeft } from "lucide-react";
import ProductDetailModal from "./product-detail-modal";

// Assets
import logoImage from "../assets/logo-dzfellah.png";
import farmerImage from "../assets/farmer.png";
import farmHeader from "../assets/farm-header.png";
import farmThumb1 from "../assets/farm-thumb-1.png";
import farmThumb2 from "../assets/farm-thumb-2.png";
import vegetablesBgImage from "../assets/vegetables-bg.png";

// Product Images (reused)
import oliveOilImage from "../assets/olive-oil.png";
import tomatoesImage from "../assets/tomatoes.png";
import potatoesImage from "../assets/potatoes.png";
import orangesImage from "../assets/oranges.png";
import honeyImage from "../assets/asel-nature.png";
import datesImage from "../assets/deglet-nour.png";
import milkImage from "../assets/halib-frech.png";
import lbenImage from "../assets/lben-elmaraa.png";
import mandarinImage from "../assets/mandarine.png";
import fromageImage from "../assets/fromage.png";

export default function StoresPage({ onNavigateToHome, onNavigateToLogin, onNavigateToSignup, onNavigateToProducts }) {
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

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
    // Duplicating for grid demo
    { id: 4, name: "tizi_wezou_farm", farmerName: "taher miloudi", image: farmThumb2, avatar: farmThumb1, products: "vegetables, oils" },
    { id: 5, name: "boumerdas_lands", farmerName: "salah chawdar", image: farmThumb1, avatar: farmerImage, products: "vegetables, fruits" },
    { id: 6, name: "tizi_wezou_farm", farmerName: "moustafa farhan", image: farmThumb2, avatar: farmThumb1, products: "vegetables, fruits" },
    { id: 7, name: "tizi_wezou_farm", farmerName: "taher miloudi", image: farmThumb2, avatar: farmThumb1, products: "vegetables, oils" },
    { id: 8, name: "boumerdas_lands", farmerName: "salah chawdar", image: farmThumb1, avatar: farmerImage, products: "vegetables, fruits" },
    { id: 9, name: "tizi_wezou_farm", farmerName: "moustafa farhan", image: farmThumb2, avatar: farmThumb1, products: "vegetables, fruits" },
  ];

  const storeProducts = [
    { id: 1, name: "zit zitoun", farm: "tizi_wezou_farm", price: "700Da/Liter", category: "Oils", image: oliveOilImage },
    { id: 2, name: "toumatich", farm: "boumerdas_lands", price: "200Da/kg", category: "Vegetables", image: tomatoesImage },
    { id: 3, name: "batata", farm: "setif_mezloug_farms", price: "700Da/Kg", category: "Vegetables", image: potatoesImage },
    { id: 4, name: "Asel_nature", farm: "jijel_mountain_farm", price: "1500Da/jar", category: "Honey", image: honeyImage },
    { id: 5, name: "deglet_nour", farm: "biskra_oases", price: "700Da/kg", category: "Dates", image: datesImage },
    { id: 6, name: "moudarine", farm: "djnan_rezlane_orange", price: "150Da/kg", category: "Fruits", image: mandarinImage },
  ];
  
  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % storeProducts.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + storeProducts.length) % storeProducts.length);
  };

  const getVisibleProducts = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(storeProducts[(currentProductIndex + i) % storeProducts.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation Bar */}
      <nav className="bg-[#285153] px-6 lg:px-16 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateToHome}>
             <img src={logoImage} alt="FELLAH" className="h-8 w-auto brightness-0 invert" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={onNavigateToHome} className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">home</button>
            <button onClick={onNavigateToHome} className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">About</button>
            <a href="#contact" className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">Contact</a>
            <button onClick={onNavigateToProducts} className="text-white hover:text-gray-200 font-medium opacity-90 hover:opacity-100">Products</button>
            <button className="text-white font-bold border-b-2 border-white">Stores</button>
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

      {selectedStore ? (
        /* DETAIL VIEW */
        <div>
          {/* Header Image */}
           <div className="w-full h-[400px] relative">
            <img src={farmHeader} alt="Farm Header" className="w-full h-full object-cover" />
            
            {/* Back Button */}
            <button 
              onClick={() => setSelectedStore(null)}
              className="absolute top-8 left-8 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#285153]" />
            </button>
          </div>

          {/* Info Card */}
          <div className="max-w-4xl mx-auto relative px-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 -mt-24 relative z-10">
              <h1 className="text-3xl font-bold text-[#285153] mb-4">{selectedStore.name}</h1>
              
              <div className="flex items-start gap-4 mb-4">
                <img src={selectedStore.avatar} alt="Farmer" className="w-16 h-16 rounded-full object-cover border-2 border-[#285153]" />
                <div>
                   <h2 className="text-xl font-bold text-gray-800">{selectedStore.farmerName}</h2>
                   <p className="text-xs text-gray-500">taher_miloudi@gmail.com</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-6">
                 <p><span className="font-semibold text-[#285153]">Phone number:</span> 0687654322</p>
                 <p><span className="font-semibold text-[#285153]">Location:</span> tizou_wezou_tigzirt</p>
                 <p><span className="font-semibold text-[#285153]">Location:</span> tizou_wezou_tigzirt</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#285153] mb-2">Description:</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  orem Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo con
                </p>
              </div>
            </div>
          </div>

           {/* Products Grid */}
          <section className="py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#285153] text-center mb-12">
                our products
              </h2>
              
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeProducts.map((product) => (
                  <div key={product.id} className="bg-[#3e5f60] rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-2 text-white">
                      <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                      <p className="text-xs opacity-80 mb-2">{product.farm}</p>
                      <div className="flex justify-between items-center mt-4">
                        <p className="text-white text-sm font-medium">price :{product.price}</p>
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="bg-white text-[#285153] h-2 w-8 rounded-full hover:bg-gray-100 transition-colors"
                        >
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-12">
                <button className="bg-[#3e5f60] p-2 rounded-full hover:bg-[#285153] transition-colors">
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button className="bg-[#3e5f60] p-2 rounded-full hover:bg-[#285153] transition-colors">
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

            </div>
          </section>

        </div>
      ) : (
        /* LIST VIEW */
        <div>
           {/* Hero / Search */}
           <div className="bg-white py-12 text-center px-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#285153] mb-8">
                Find Your Local Farm and Fresh
                <br />
                Products Easily
              </h1>

              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="search for a Product"
                  className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
           </div>

           {/* Stores Grid */}
           <div className="bg-[#3e5f60] py-16 px-6 lg:px-16 min-h-[600px]">
              <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.map((store) => (
                       <div 
                        key={store.id} 
                        onClick={() => setSelectedStore(store)}
                        className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                       >
                          <div className="h-48 w-full">
                             <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-4 border-t border-gray-100">
                             <div className="flex items-center gap-3 mb-3">
                                <img src={store.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                                <h3 className="font-bold text-[#285153] text-sm">{store.name}</h3>
                             </div>
                             <div>
                                <p className="text-xs font-semibold text-gray-800 mb-1">{store.farmerName}</p>
                                <p className="text-[10px] text-gray-500">product types : {store.products}</p>
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
           </div>
           
      {/* Available Products Section */}
      <section className="py-16 lg:py-24 bg-[#3e5f60]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-12">
            Available Products
          </h2>

          <div className="relative">
             {/* Navigation Arrows */}
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-[#285153]" />
            </button>

            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-[#285153]" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleProducts().map((product, index) => (
                <div key={`${product.id}-${index}`} className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-2">
                    <h3 className="text-xl font-bold text-[#285153] mb-1">{product.name}</h3>
                    <p className="text-xs text-black font-semibold mb-2">{product.farm}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-[#8B7355] text-sm font-medium">price :{product.price}</p>
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="bg-[#3e5f60] text-white text-xs px-4 py-1.5 rounded bg-opacity-90 hover:bg-opacity-100 transition-colors"
                      >
                        See details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
               onClick={onNavigateToProducts}
               className="bg-white text-[#285153] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153]"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153]"
                />
                <textarea
                  placeholder="Type your demands"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#285153]"
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
 
        </div>
      )}

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
    </div>
  );
}
