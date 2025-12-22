import { useState, useEffect } from "react";
import { X, Upload, Calendar } from "lucide-react";

export default function AddProductModal({ onClose, onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo_url: null,
    sale_type: "unit", // "unit" or "weight"
    price: "",
    stock: "",
    product_type: "fresh", // "fresh", "processed", "other"
    harvest_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target.result);
        setFormData((prev) => ({
          ...prev,
          photo_url: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation logic
    // Stock validation based on sale_type
    const stockVal = parseFloat(formData.stock);
    if (formData.sale_type === "unit" && !Number.isInteger(stockVal)) {
        alert("Stock must be a whole number for 'Unit' sale type");
        setLoading(false);
        return;
    }

    setTimeout(() => {
      setLoading(false);
      
      const payload = {
        ...formData,
        // Auto-calculated fields would be handled by backend, but we send what we have
        is_anti_gaspi: false, // Backend calculates this
      };
      
      console.log("=== PRODUCT PAYLOAD (Snake Case) ===", payload);
      if (onProductAdded) onProductAdded(payload);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-[#285153]">Add New Product</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* Photo Upload */}
            <div className="flex justify-center">
                <div className="relative w-full max-w-md h-48 border-2 border-dashed border-[#285153] rounded-2xl flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
                    {photoPreview ? (
                        <>
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                type="button"
                                onClick={() => { setPhotoPreview(null); setFormData(prev => ({...prev, photo_url: null})); }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                            <Upload className="w-8 h-8 text-[#285153] mb-2" />
                            <span className="text-sm font-semibold text-[#285153]">Upload Product Photo</span>
                            <span className="text-xs text-gray-500 mt-1">(Optional)</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                        </label>
                    )}
                </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Product Name *</label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                        placeholder="e.g. Organic Tomatoes"
                    />
                </div>
                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1">Product Type *</label>
                     <select 
                        name="product_type"
                        value={formData.product_type}
                        onChange={handleChange}
                        className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                     >
                         <option value="fresh">Fresh</option>
                         <option value="processed">Processed</option>
                         <option value="other">Other</option>
                     </select>
                </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Sale Type *</label>
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button 
                            type="button"
                            onClick={() => setFormData(p => ({...p, sale_type: "unit"}))}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.sale_type === 'unit' ? 'bg-white shadow text-[#285153]' : 'text-gray-500'}`}
                        >
                            Unit (Piece)
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFormData(p => ({...p, sale_type: "weight"}))}
                             className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.sale_type === 'weight' ? 'bg-white shadow text-[#285153]' : 'text-gray-500'}`}
                        >
                            Weight (Kg)
                        </button>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (DZD) *</label>
                    <input 
                        type="number" 
                        name="price" 
                        required 
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                        placeholder="0.00"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                    Stock ({formData.sale_type === 'unit' ? 'Units' : 'Kg'}) *
                </label>
                <input 
                    type="number" 
                    name="stock" 
                    required 
                    min="0"
                    step={formData.sale_type === 'weight' ? "0.01" : "1"}
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    placeholder={formData.sale_type === 'weight' ? "e.g. 10.5" : "e.g. 50"}
                />
                 {formData.sale_type === 'unit' && (
                    <p className="text-xs text-gray-500 mt-1">Must be a whole number for unit sales.</p>
                 )}
            </div>

            {/* Conditional Harvest Date */}
            {formData.product_type === 'fresh' && (
                <div className="bg-[#e8efef] p-4 rounded-xl">
                    <label className="block text-sm font-bold text-[#285153] mb-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Harvest Date
                    </label>
                    <input 
                        type="date" 
                        name="harvest_date" 
                        value={formData.harvest_date}
                        onChange={handleChange}
                        className="w-full bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Required to calculate anti-gaspi status.</p>
                </div>
            )}

            {/* Description */}
            <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                 <textarea 
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    placeholder="Describe your product..."
                 />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#285153] hover:bg-[#1f4042] text-white font-bold py-4 rounded-full transition-colors disabled:opacity-50"
            >
                {loading ? "Adding Product..." : "Add Product"}
            </button>

        </form>
      </div>
    </div>
  );
}
