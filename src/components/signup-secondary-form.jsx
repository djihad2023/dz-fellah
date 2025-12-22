/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Upload, Phone, MapPin } from "lucide-react";
import heroImage from "../assets/signup-hero.png";



const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Aréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt",
  "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naama", "Aïn Témouchent", "Ghardaïa", "Relizane"
];

export default function SignupSecondaryForm({ userType, initialData, onComplete }) {
  const [formData, setFormData] = useState({
    photo_url: null, // Mapped to photo_url in backend
    phone: initialData?.phone || "",
    description: "",
    address: "",
    wilaya: "",
    // Producer specific
    is_bio_certified: false,
    shop_name: initialData?.shop_name || "",
    // Client specific
    // (address and wilaya are common)
  });
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
          photo_url: file, // Store file object, would upload to storage in real app
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      // Combine all data
      const finalPayload = {
        ...initialData,
        ...formData,
        // Override/ensure correct shop_name if edited here
        ...(userType === 'producer' ? { shop_name: formData.shop_name } : {}),
      };

      console.log("=== SIGNUP PAYLOAD (Snake Case) ===", finalPayload);
      // In real app: await api.signup(finalPayload);
      
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
            Let's get your {userType === "producer" ? "farm" : "profile"} shining—fill in a few details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT COLUMN: Photo Upload */}
          <div>
            <div className="border-2 border-dashed border-[#285153] rounded-3xl p-8 flex flex-col items-center justify-center text-center relative bg-white h-full min-h-[400px]">
              {photoPreview ? (
                <div className="relative w-full h-64 mb-4">
                  <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover rounded-xl" />
                  <button 
                      onClick={() => { setPhotoPreview(null); setFormData(p => ({...p, photo_url: null})); }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center font-bold"
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
              
              <h3 className="text-2xl font-bold text-[#285153] mb-2">Upload {userType === 'producer' ? 'Shop/Farm' : 'Profile'} photo</h3>
              <p className="text-sm text-gray-500 font-semibold mb-8">Drag and drop or click to upload. (Optional)</p>
              
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="bg-[#285153] text-white px-10 py-3 rounded-full font-semibold text-base cursor-pointer hover:bg-[#1f4042] transition-colors"
              >
                Choose file
              </label>
            </div>
          </div>

          {/* RIGHT COLUMN: Form Fields */}
          <div className="space-y-8">
            
            {/* Common: Phone */}
            <div>
              <label className="block text-xl font-bold text-black mb-2">Phone Number</label>
              <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#285153] w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                />
              </div>
            </div>

            {/* Common: Address */}
            <div>
              <label className="block text-xl font-bold text-black mb-2">Address (Optional)</label>
              <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#285153] w-5 h-5" />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                />
              </div>
            </div>

            {/* Common: Wilaya Dropdown */}
            <div>
              <label className="block text-xl font-bold text-black mb-2">Wilaya (Optional)</label>
              <div className="relative">
                <select
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153] appearance-none"
                >
                  <option value="">Select Wilaya</option>
                  {WILAYAS.map((wilaya) => (
                    <option key={wilaya} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </div>
              </div>
            </div>

            {/* Producer Specific */}
            {userType === "producer" && (
              <>
                <div>
                  <label className="block text-xl font-bold text-black mb-2">Shop/Farm Name</label>
                  <input
                    type="text"
                    name="shop_name"
                    placeholder="Shop Name"
                    value={formData.shop_name}
                    onChange={handleChange}
                    className="w-full bg-[#f3f4f6] text-gray-700 px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#285153]"
                  />
                </div>

                <div className="flex items-center gap-3">
                   <input 
                      type="checkbox" 
                      id="is_bio_certified"
                      name="is_bio_certified"
                      checked={formData.is_bio_certified}
                      onChange={handleChange}
                      className="w-6 h-6 text-[#285153] rounded focus:ring-[#285153]"
                   />
                   <label htmlFor="is_bio_certified" className="text-lg font-semibold text-gray-700">Is Bio Certified?</label>
                </div>
              </>
            )}

            {/* Description (Common or Producer specific, user asked for it in Producer Additional but good for both potentially, I'll restrict to Producer or generic) */}
            <div>
              <label className="block text-xl font-bold text-black mb-2">Description (Optional)</label>
              <textarea
                name="description"
                placeholder="Tell us about yourself..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#f3f4f6] text-gray-700 p-6 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#285153] resize-none"
              />
            </div>

          </div>
        </div>

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
