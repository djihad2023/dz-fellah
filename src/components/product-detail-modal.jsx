import { X, ShoppingBasket, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

export default function ProductDetailModal({ product, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return null;

  // Mock multiple images for the gallery (using the main image 3 times for demo)
  const images = [product.image, product.image, product.image];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-[32px] w-full max-w-4xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-6 h-6 text-[#285153]" />
        </button>

        {/* Cart Icon */}
        <button className="absolute right-20 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
          <ShoppingBasket className="w-6 h-6 text-[#285153]" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-[400px] md:h-[600px]">
            <img 
              src={images[currentImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button 
                onClick={prevImage}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-[#285153]" />
              </button>
              <button 
                onClick={nextImage}
                className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-[#285153]" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImage ? "bg-[#285153]" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* details Section */}
          <div className="p-8 md:p-12 flex flex-col h-full bg-white">
            <h2 className="text-4xl text-[#285153] font-bold mb-4 font-serif">Product details</h2>
            
            <h3 className="text-3xl text-[#285153] font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 font-semibold mb-2">{product.farm || "local_farm"}</p>
            
            <p className="text-[#8B7355] text-xl mb-4">
              price :{product.price || "Contact for price"}
            </p>

            <div className="flex text-yellow-400 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <div className="space-y-2 mb-8 text-[#285153]">
              <p><span className="font-semibold">category:</span> {product.category || "General"}</p>
              <p><span className="font-semibold">state :</span> fresh</p>
            </div>

            <div className="mb-8">
              <h4 className="text-[#285153] font-bold mb-2">descreption:</h4>
              <p className="text-gray-700 leading-relaxed text-sm">
                Pure extra-virgin olive oil, cold-pressed from high-quality Algerian olives. Rich in
                flavor, full of antioxidants, and perfect for cooking, salads, and traditional dishes. A
                natural, healthy product directly from local farmers
              </p>
            </div>

            <div className="mt-auto flex gap-4">
              <button className="p-3 bg-[#4A6768] rounded-full text-white hover:bg-[#3d5556] transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="p-3 bg-[#4A6768] rounded-full text-white hover:bg-[#3d5556] transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <button className="flex-1 bg-[#4A6768] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#3d5556] transition-colors ml-4 text-lg">
                add to basket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
