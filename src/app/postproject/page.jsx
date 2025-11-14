"use client";

import * as React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createProject } from '@/store/posted-projects/projectThunk';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { X } from 'lucide-react';
import Modal from "@/components/modals/modal";

// Card components
// const Card = ({ className, ...props }) => (
//   <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${className}`} {...props} />
// );

// const CardHeader = ({ className, ...props }) => (
//   <div className={`p-4 sm:p-6 ${className}`} {...props} />
// );

// const CardTitle = ({ className, ...props }) => (
//   <h2 className={`text-xl sm:text-2xl font-semibold ${className}`} {...props} />
// );

// const CardContent = ({ className, ...props }) => (
//   <div className={`p-6 sm:p-8 md:p-10 pt-0 w-full max-w-[80%] mx-auto ${className}`} {...props} />
// );

// Input component
const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27aae2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

// Label component
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

// Textarea component
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#27aae2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// Select components
const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <select
    className={`flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

const SelectItem = React.forwardRef(({ className, ...props }, ref) => (
  <option
    ref={ref}
    className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  />
));
SelectItem.displayName = "SelectItem";

// const advantages = {
//   PRO: [
//     { text: "Verhoogde zichtbaarheid voor meer exposure" },
//     { text: "15 privé contacten per maand voor meer kansen" },
//     { text: "Uitgebreid profiel met portfolio showcase" },
//     { text: "Bespaar €48 met jaarlijks abonnement" },
//   ],
//   PREMIUM: [
//     { text: "Maximale zichtbaarheid voor optimaal bereik" },
//     { text: "Onbeperkt contact voor grenzeloze mogelijkheden" },
//     { text: "Prioriteit in zoekresultaten voor maximale exposure" },
//     { text: "Bespaar €120 met jaarlijks abonnement" },
//   ],
// };

export default function ProjectForm() {
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    budget: {
      min: 1000,
      max: 5000,
      currency: 'USD'
    },
    location: {
      city: '',
      state: '',
      country: ''
    },
    deadline: '',
    status: 'open',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  // const fileInputRef = useRef(null);
  const countries = [
    "Belgium", 
    "Holland", 
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return { ...prev, [parent]: { ...prev[parent], [child]: value } };
      }
      return { ...prev, [name]: value };
    });
    // Clear validation error when user starts typing
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (formData.budget.min <= 0) errors['budget.min'] = 'Minimum budget must be greater than 0';
    if (formData.budget.max <= formData.budget.min) errors['budget.max'] = 'Maximum budget must be greater than minimum';
    if (!formData.location.city.trim()) errors['location.city'] = 'City is required';
    if (!formData.location.country.trim()) errors['location.country'] = 'Country is required';
    if (!formData.deadline) errors.deadline = 'Deadline is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);

    const newUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prevUrls => [...prevUrls, ...newUrls]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => {
      const newUrls = prevUrls.filter((_, i) => i !== index);
      URL.revokeObjectURL(prevUrls[index]);
      return newUrls;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    setIsConfirmModalOpen(false);
    setIsSubmitting(true);
    setError(null);
    const token = Cookies.get('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setIsSubmitting(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      if (!userId) {
        setError('User ID not found in token. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      const projectData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'budget') {
          projectData.append('budget[min]', Number(value.min));
          projectData.append('budget[max]', Number(value.max));
          projectData.append('budget[currency]', value.currency);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            projectData.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          projectData.append(key, value);
        }
      });
      projectData.append('postedBy', userId);

      selectedFiles.forEach((file) => {
        projectData.append(`projectImages`, file);
      });

      await dispatch(createProject(projectData)).unwrap();
      console.log('Project submitted successfully');
      toast.success('Project submitted successfully');
      window.location.href = '/dashboard/individual';
    } catch (err) {
      console.error('Error submitting project:', err);
      setError(err.message || 'An error occurred while submitting the project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-[#27aae2] to-[#1f8dbb] px-4 sm:px-6 lg:px-8 py-16">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:16px_16px]"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            {/* Tagline */}
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm sm:text-base font-medium bg-white/10 text-white/90">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Nieuw Project
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Plaats Jouw Project
            </h1>

            {/* Subtitle */}
            <p className="text-lg  lg:text-xl text-white/90 max-w-3xl mx-auto">
              Vind de beste professional voor jouw klus in België & Nederland
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column with tips and info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#27aae2]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#27aae2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Tips voor je Project</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#27aae2]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#27aae2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Wees Specifiek</h3>
                      <p className="text-sm text-gray-500">Hoe meer details, hoe beter de offertes zullen aansluiten bij je wensen.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#27aae2]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#27aae2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Tijdlijn</h3>
                      <p className="text-sm text-gray-500">Geef aan wanneer het project moet starten en klaar moet zijn.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#27aae2]/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#27aae2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Budget</h3>
                      <p className="text-sm text-gray-500">Een realistisch budget trekt de juiste professionals aan.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#27aae2] to-[#1f8dbb] rounded-2xl shadow-sm p-6 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold">Waarom ProConnect?</h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span>Betrouwbare professionals</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span>Snelle reacties</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Gratis en vrijblijvend</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column with form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
                  <p className="mt-1 text-sm text-gray-500">Vul alle details in om de beste matches te vinden.</p>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                  {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded" role="alert">
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Title and Description */}
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="title" className="text-base">Projecttitel</Label>
                        <Input
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="Bijv. Complete badkamerrenovatie"
                          className={`mt-2 ${validationErrors.title ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.title && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.title}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-base">Projectbeschrijving</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Beschrijf je project in detail. Wat moet er gebeuren? Welke materialen? Specifieke wensen?"
                          className={`mt-2 min-h-[150px] ${validationErrors.description ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.description && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="category" className="text-base">Categorie</Label>
                        <Select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`mt-2 ${validationErrors.category ? 'border-red-500' : ''}`}
                        >
                          <SelectItem value="">Selecteer categorie</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="painting">Painting</SelectItem>
                          <SelectItem value="gardening">Gardening</SelectItem>
                        </Select>
                        {validationErrors.category && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="subCategory" className="text-base">Subcategorie</Label>
                        <Input
                          id="subCategory"
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          placeholder="Bijv. Keukenrenovatie"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label className="text-base">Budget Range</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <Input
                              type="number"
                              id="budget.min"
                              name="budget.min"
                              value={formData.budget.min}
                              onChange={handleInputChange}
                              placeholder="Min"
                              className={validationErrors['budget.min'] ? 'border-red-500' : ''}
                            />
                            {validationErrors['budget.min'] && (
                              <p className="text-red-500 text-sm mt-1">{validationErrors['budget.min']}</p>
                            )}
                          </div>
                          <div>
                            <Input
                              type="number"
                              id="budget.max"
                              name="budget.max"
                              value={formData.budget.max}
                              onChange={handleInputChange}
                              placeholder="Max"
                              className={validationErrors['budget.max'] ? 'border-red-500' : ''}
                            />
                            {validationErrors['budget.max'] && (
                              <p className="text-red-500 text-sm mt-1">{validationErrors['budget.max']}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="budget.currency" className="text-base">Valuta</Label>
                        <Select
                          id="budget.currency"
                          name="budget.currency"
                          value={formData.budget.currency}
                          onChange={handleInputChange}
                          className="mt-2"
                        >
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location.city" className="text-base">Stad</Label>
                        <Input
                          id="location.city"
                          name="location.city"
                          value={formData.location.city}
                          onChange={handleInputChange}
                          placeholder="Voer uw stad in"
                          className={`mt-2 ${validationErrors['location.city'] ? 'border-red-500' : ''}`}
                        />
                        {validationErrors['location.city'] && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors['location.city']}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location.country" className="text-base">Land</Label>
                        <Select
                          id="location.country"
                          name="location.country"
                          value={formData.location.country}
                          onChange={handleInputChange}
                          className={`mt-2 ${validationErrors['location.country'] ? 'border-red-500' : ''}`}
                        >
                          <SelectItem value="">Selecteer land</SelectItem>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </Select>
                        {validationErrors['location.country'] && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors['location.country']}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="deadline" className="text-base">Deadline</Label>
                        <Input
                          id="deadline"
                          name="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={handleInputChange}
                          className={`mt-2 ${validationErrors.deadline ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.deadline && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors.deadline}</p>
                        )}
                      </div>
                    </div>

                  {/* Project Images */}
                  <div>
                    <Label className="text-base">Projectafbeeldingen</Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Upload afbeeldingen van je project (max. 5)
                    </p>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-w-1 aspect-h-1 sm:aspect-w-16 sm:aspect-h-12 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={url}
                              alt={`Preview ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform group-hover:scale-110"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {previewUrls.length < 5 && (
                        <div className="aspect-w-1 aspect-h-1 sm:aspect-w-16 sm:aspect-h-12">
                          <label className="flex flex-col items-center justify-center w-full h-full rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#27aae2] transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 text-gray-400 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                              <p className="text-sm text-gray-500">Upload afbeelding</p>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                              multiple={previewUrls.length === 0}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row sm:justify-end sm:gap-4 gap-2 mt-8">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
                    >
                      Annuleren
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-lg bg-[#27aae2] text-white hover:bg-[#1f8dbb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Project Plaatsen...</span>
                        </>
                      ) : (
                        <>
                          <span>Project Plaatsen</span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Submission"
        buttons={[
          {
            label: "Cancel",
            onClick: () => setIsConfirmModalOpen(false),
            variant: "secondary"
          },
          {
            label: "OK",
            onClick: handleConfirmSubmit,
            variant: "primary"
          }
        ]}
      >
        <p>Are you sure you want to submit the project?</p>
      </Modal>
    </>
  );
}