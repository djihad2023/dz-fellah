/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Upload, Phone, MapPin } from "lucide-react";

const PRODUCT_TYPES = [
  { id: "fruits", label: "Fruits" },
  { id: "oils", label: "Oils" },
  { id: "honey", label: "Honey" },
  { id: "vegetables", label: "Vegetables" },
  { id: "dairy", label: "Dairy" },
  { id: "legumes", label: "Legumes" },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80";

export default function SignupSecondaryForm() {
  const [userType] = useState("producer"); // Change to "consumer" to see consumer view
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
    if (!formData.phoneNumber || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    if (
      userType === "producer" &&
      (!formData.farmName || formData.productTypes.length === 0)
    ) {
      alert("Please fill in farm details and select product types");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative h-64 sm:h-80">
            <img
              src={HERO_IMAGE}
              alt="DZ-Fellah welcome"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-teal-800/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
                <div className="text-4xl font-bold text-white">🌾</div>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 drop-shadow-lg">
                Welcome to the DZ-Fellah Family!
              </h1>
              <p className="text-sm sm:text-base text-teal-50 max-w-2xl mx-auto font-light">
                {userType === "producer"
                  ? "Let's get your farm shining—fill in a few details so your fresh produce reaches the right customers."
                  : "Complete your profile so we can tailor the freshest experience just for you."}
              </p>
            </div>
          </div>

          <div className="px-6 sm:px-12 py-12 space-y-10">
            {/* Consumer Secondary Info */}
            {userType === "consumer" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Photo Upload */}
                <div className="border-2 border-dashed border-teal-300 rounded-2xl p-10 bg-gradient-to-br from-teal-50 to-emerald-50 text-center flex flex-col items-center justify-center hover:border-teal-400 transition-colors">
                  {photoPreview ? (
                    <div className="relative w-32 h-32 mb-6">
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-full shadow-xl ring-4 ring-white"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Upload className="w-12 h-12 text-teal-600" />
                    </div>
                  )}
                  <h3 className="text-teal-900 font-bold text-lg mb-2">
                    Upload profile photo
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Drag and drop or click to upload
                  </p>
                  <input
                    id="consumer-profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e, false)}
                    className="sr-only"
                  />
                  <label
                    htmlFor="consumer-profile-upload"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <Upload className="w-5 h-5" />
                    Choose file
                  </label>
                </div>

                <div className="space-y-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-teal-900 mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 w-5 h-5" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full pl-14 pr-5 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-teal-900 mb-2 uppercase tracking-wide">
                      About You
                    </label>
                    <textarea
                      name="description"
                      placeholder="Tell us about yourself..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={7}
                      className="w-full px-5 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none shadow-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Producer Secondary Info */}
            {userType === "producer" && (
              <div className="space-y-10">
                {/* Farm Photos Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Farm photo", isFarm: true },
                    { label: "Profile photo", isFarm: false },
                  ].map(({ label, isFarm }) => {
                    const preview = isFarm ? farmPhotoPreview : photoPreview;
                    const inputId = `${label
                      .replace(" ", "-")
                      .toLowerCase()}-upload`;
                    return (
                      <div
                        key={label}
                        className="border-2 border-dashed border-teal-300 rounded-2xl p-8 bg-gradient-to-br from-teal-50 to-emerald-50 text-center flex flex-col items-center justify-center hover:border-teal-400 transition-colors"
                      >
                        {preview ? (
                          <div className="relative w-28 h-28 mb-4">
                            <img
                              src={preview}
                              alt={`${label} preview`}
                              className="w-full h-full object-cover rounded-2xl shadow-xl ring-4 ring-white"
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                            <Upload className="w-10 h-10 text-teal-600" />
                          </div>
                        )}
                        <h3 className="text-teal-900 font-bold mb-2">
                          Upload {label}
                        </h3>
                        <p className="text-gray-600 text-xs mb-5">
                          Drag and drop or click to upload
                        </p>
                        <input
                          id={inputId}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoChange(e, isFarm)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={inputId}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer shadow-md hover:shadow-lg"
                        >
                          <Upload className="w-4 h-4" />
                          Choose file
                        </label>
                      </div>
                    );
                  })}
                </div>

                {/* Farm Details */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 space-y-6 shadow-inner">
                  <h3 className="text-xl font-bold text-teal-900 mb-4">
                    Farm Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="farmName"
                      placeholder="Farm full name"
                      value={formData.farmName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                    />
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 w-5 h-5" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full pl-14 pr-5 py-4 bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                      />
                    </div>
                    <div className="relative md:col-span-2">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-600 w-5 h-5" />
                      <input
                        type="text"
                        name="farmLocation"
                        placeholder="Farm location"
                        value={formData.farmLocation}
                        onChange={handleChange}
                        className="w-full pl-14 pr-5 py-4 bg-white text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Types */}
                <div>
                  <label className="block text-lg font-bold text-teal-900 mb-4">
                    What do you grow?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {PRODUCT_TYPES.map((product) => (
                      <button
                        type="button"
                        key={product.id}
                        onClick={() => handleProductTypeChange(product.id)}
                        className={`px-6 py-3 rounded-full font-semibold transition-all shadow-sm hover:shadow-md ${
                          formData.productTypes.includes(product.id)
                            ? "bg-gradient-to-r from-teal-700 to-teal-600 text-white scale-105"
                            : "bg-white text-teal-700 border-2 border-teal-200 hover:border-teal-400"
                        }`}
                      >
                        {product.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-lg font-bold text-teal-900 mb-4">
                    Tell us about your farm
                  </label>
                  <textarea
                    name="description"
                    placeholder="Share your story, farming practices, and what makes your produce special..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-5 py-4 bg-gradient-to-br from-emerald-50 to-teal-50 text-gray-900 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 hover:from-teal-800 hover:via-teal-700 hover:to-emerald-700 text-white px-6 py-5 rounded-xl font-bold text-lg tracking-wide transition-all disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            dz_fellah@gmail.com
            <span className="mx-3">·</span>
            <a href="#" className="hover:text-teal-700 transition-colors">
              Contact us
            </a>
            <span className="mx-3">·</span>
            <a href="#" className="hover:text-teal-700 transition-colors">
              About Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
