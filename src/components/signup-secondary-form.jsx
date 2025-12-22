/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Upload, Phone, MapPin } from "lucide-react";
import heroImage from "../assets/signup-hero.png";

const PRODUCT_TYPES = [
  { id: "fruits", label: "Fruits" },
  { id: "oils", label: "Oils" },
  { id: "honey", label: "Honey" },
  { id: "vegetables", label: "Vegetables" },
  { id: "dairy", label: "Dairy" },
  { id: "legumes", label: "Legumes" },
];

export default function SignupSecondaryForm({ userType = "producer", onComplete }) {
  const [formData, setFormData] = useState({
    profilePhoto: null,
    phoneNumber: "",
    description: "",
    farmName: "",
    farmPhoto: null,
    farmLocation: "",
    productTypes: [],
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [farmPhotoPreview, setFarmPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e, isFarmPhoto = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (isFarmPhoto) {
          setFarmPhotoPreview(event.target.result);
          setFormData((prev) => ({
            ...prev,
            farmPhoto: file,
          }));
        } else {
          setPhotoPreview(event.target.result);
          setFormData((prev) => ({
            ...prev,
            profilePhoto: file,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductTypeChange = (productId) => {
    setFormData((prev) => ({
      ...prev,
      productTypes: prev.productTypes.includes(productId)
        ? prev.productTypes.filter((id) => id !== productId)
        : [...prev.productTypes, productId],
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete(); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] lg:h-[400px]">
        <img
          src={heroImage}
          alt="Farmer in field"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#285153] mb-4">
            Welcome to the DZ-Fellah Family!
          </h1>
          <p className="text-lg text-[#3e5f60] font-medium">
            Let's get your farm shining—fill in a few details so your fresh produce reaches the right customers
          </p>
        </div>

        {userType === "consumer" ? (
           /* CONSUMER LAYOUT */
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
             {/* LEFT COLUMN: Large Profile Photo Upload */}
             <div>
                <div className="border-2 border-dashed border-[#285153] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative bg-white h-full min-h-[400px]">
                  {photoPreview ? (
                    <div className="relative w-full h-64 mb-4">
                      <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover rounded-xl" />
                      <button 
                         onClick={() => setPhotoPreview(null)}
                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="mb-6 bg-[#e8efef] p-8 rounded-full">
                      <div className="relative">
                        <Upload className="w-12 h-12 text-[#285153]" />
                         <div className="absolute -bottom-1 -right-1 bg-[#285153] text-white rounded-full p-0.5">
                          <span className="text-xs font-bold">+</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-[#285153] mb-2">Upload profile photo</h3>
                  <p className="text-sm text-gray-500 font-semibold mb-8">Drag and drop or click to upload. (Optional)</p>
                  
                  <input
                    id="consumer-profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e, false)}
                    className="hidden"
                  />
                  <label
                    htmlFor="consumer-profile-upload"
                    className="bg-[#285153] text-white px-10 py-3 rounded-full font-semibold text-base cursor-pointer hover:bg-[#1f4042] transition-colors"
                  >
                    Choose file
                  </label>
                </div>
             </div>

             {/* RIGHT COLUMN: Phone & Description */}
             <div className="space-y-8">
               {/* Phone Number */}
                <div>
                  <label className="block text-xl font-bold text-black mb-2">Phone Number</label>
                  <div className="relative">
                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#285153] w-5 h-5" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xl font-bold text-black mb-2">Descreption</label>
                  <textarea
                    name="description"
                    placeholder="add somthing...."
                    value={formData.description}
                    onChange={handleChange}
                    rows={12}
                    className="w-full bg-[#f3f4f6] text-gray-700 p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#285153] resize-none"
                  />
                </div>
             </div>
           </div>
        ) : (
          /* PRODUCER LAYOUT (Existing) */
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* LEFT COLUMN: Uploads */}
              <div className="space-y-8">
                {/* Farm Photo Upload */}
                <div className="border-2 border-dashed border-[#285153] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative bg-white">
                  {farmPhotoPreview ? (
                    <div className="relative w-full h-48 mb-4">
                      <img src={farmPhotoPreview} alt="Farm preview" className="w-full h-full object-cover rounded-xl" />
                      <button 
                         onClick={() => setFarmPhotoPreview(null)}
                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="mb-4 bg-[#e8efef] p-6 rounded-full">
                      <div className="relative">
                        <Upload className="w-10 h-10 text-[#285153]" />
                        <div className="absolute -bottom-1 -right-1 bg-[#285153] text-white rounded-full p-0.5">
                          <span className="text-[10px] font-bold">+</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-[#285153] mb-1">Upload Farm photo</h3>
                  <p className="text-xs text-gray-500 font-semibold mb-6">Drag and drop or click to upload. (Optional)</p>
                  
                  <input
                    id="farm-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e, true)}
                    className="hidden"
                  />
                  <label
                    htmlFor="farm-photo-upload"
                    className="bg-[#285153] text-white px-8 py-2.5 rounded-full font-semibold text-sm cursor-pointer hover:bg-[#1f4042] transition-colors"
                  >
                    Choose file
                  </label>
                </div>

                {/* Profile Photo Upload */}
                <div className="border-2 border-dashed border-[#285153] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative bg-white">
                  {photoPreview ? (
                    <div className="relative w-32 h-32 mb-4">
                      <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover rounded-full" />
                      <button 
                         onClick={() => setPhotoPreview(null)}
                         className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="mb-4 bg-[#e8efef] p-6 rounded-full">
                      <div className="relative">
                        <Upload className="w-10 h-10 text-[#285153]" />
                         <div className="absolute -bottom-1 -right-1 bg-[#285153] text-white rounded-full p-0.5">
                          <span className="text-[10px] font-bold">+</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-[#285153] mb-1">Upload profile photo</h3>
                  <p className="text-xs text-gray-500 font-semibold mb-6">Drag and drop or click to upload. (Optional)</p>
                  
                  <input
                    id="profile-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e, false)}
                    className="hidden"
                  />
                  <label
                    htmlFor="profile-photo-upload"
                    className="bg-[#285153] text-white px-8 py-2.5 rounded-full font-semibold text-sm cursor-pointer hover:bg-[#1f4042] transition-colors"
                  >
                    Choose file
                  </label>
                </div>
              </div>

              {/* RIGHT COLUMN: Form Fields */}
              <div className="space-y-6">
                {/* Farm Name */}
                <div>
                  <label className="block text-xl font-bold text-black mb-2">Farm Full Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                       <img src="https://cdn-icons-png.flaticon.com/512/2098/2098083.png" alt="" className="w-5 h-5 opacity-50 filter grayscale" /> {/* Placeholder for barn icon */}
                       {/* Or use lucide MapPin/Home if icon not exact match */}
                    </div>
                    <input
                      type="text"
                      name="farmName"
                      placeholder="Farm Name"
                      value={formData.farmName}
                      onChange={handleChange}
                      className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xl font-bold text-black mb-2">Phone Number</label>
                  <div className="relative">
                     <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#285153] w-5 h-5" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    />
                  </div>
                </div>

                {/* Farm Location */}
                <div>
                  <label className="block text-xl font-bold text-black mb-2">Farm Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#285153] w-5 h-5" />
                    <input
                      type="text"
                      name="farmLocation"
                      placeholder="Farm location"
                      value={formData.farmLocation}
                      onChange={handleChange}
                      className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                    />
                  </div>
                </div>

                {/* Products Type */}
                <div>
                  <label className="block text-xl font-bold text-black mb-4">products type</label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                    {PRODUCT_TYPES.map((product) => (
                      <label key={product.id} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center w-6 h-6">
                          <input
                            type="checkbox"
                            className="peer appearance-none w-5 h-5 border-2 border-[#285153] rounded-full checked:bg-[#285153] transition-colors"
                            checked={formData.productTypes.includes(product.id)}
                            onChange={() => handleProductTypeChange(product.id)}
                          />
                          <div className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="text-lg font-semibold text-[#285153]">{product.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-12">
              <label className="block text-3xl font-bold text-black mb-4">Descreption</label>
              <textarea
                name="description"
                placeholder="add somthing...."
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className="w-full bg-[#f3f4f6] text-gray-700 p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#285153] resize-none"
              />
            </div>
          </>
        )}

        {/* Bottom Actions */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#3e5f60] hover:bg-[#2e4849] text-white px-12 py-3 rounded-full font-bold text-lg transition-colors shadow-lg"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-[#285153] font-medium">
          <a href="mailto:dz_fellah@gmail.com" className="hover:underline">dz_fellah@gmail.com</a>
          <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:underline">Contact us</a>
             <a href="#" className="hover:underline">About Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
