'use client'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Plus, Loader } from 'lucide-react';
import Image from 'next/image';
import {
  getProfile,
  updateProfile,
} from '@/store/craftsmanProfile/craftsmanProfileThunk';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.craftsmanProfile);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    phoneNumber: '',
    skills: '',
    experience: '',
    profilePicture: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);
  // Fetch the profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // Update the form when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.userId?.firstName,
        lastName: profile.userId?.lastName,
        email: profile.userId?.email || '',
        address: {
          street: profile.userId?.address?.street || '',
          city: profile.userId?.address?.city || '',
          state: profile.userId?.address?.state || '',
          zipCode: profile.userId?.address?.zipCode || '',
          country: profile.userId?.address?.country || '',
        },
        phoneNumber: profile.userId?.phoneNumber || '',
        skills: profile.skills || '',
        experience: profile.experience || '',
        profilePicture: profile.userId?.profilePicture,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the file in state
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: e.target.result, // Temporarily display the image
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const updatedData = { ...formData };
    if (selectedImage) {
      updatedData.profilePicture = selectedImage; // Include the file if selected
    }
    dispatch(updateProfile(updatedData));
  };

  if (loading) return <div className='flex flex-col min-h-screen justify-center items-center'><Loader width={50} height={50}></Loader></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[#27aae2] py-16 sm:py-24 px-4 relative w-full overflow-hidden">
        <div className="relative z-10 mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">
            {userType === 'craftsman' ? 'Vakman' : 'Individueel'}
          </h2>
          <h2 className="text-lg md:text-lg mb-6 sm:mb-8 lg:mb-12">
            {userType === 'craftsman' 
              ? 'Projectmatig werken en vacatures plaatsen'
              : 'Beheer je profiel en projectvoorkeuren'}
          </h2>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr_300px] gap-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">First Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Last Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">E-mail</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      disabled
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Persoonlijke Informatie</h3>
                <h3 className="text-xl font-semibold">Adres Informatie</h3>
                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Street</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">City</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">State</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Zip Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Country</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Telefoonnummer</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
                    />
                    <Edit2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#27aae2] cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Professionele Informatie</h3>

                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Vaardigheden</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent min-h-[100px] resize-y"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm text-gray-600 block mb-1">Werkervaring</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent min-h-[100px] resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="space-y-8">
              <div className="relative">
                <div className="relative w-[250px] h-[250px] mx-auto rounded-full">
                  <Image
                    src={formData.profilePicture || '/user.png'}
                    alt="Profile"
                    fill
                    className="object-cover rounded-full"
                  />
                  <button
                    onClick={() => document.getElementById('fileInput').click()}
                    className="absolute bottom-4 right-4 bg-[#27aae2] rounded-full p-2 text-white hover:bg-[#2299cc] transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#27aae2] text-white rounded-md hover:bg-[#2299cc] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
