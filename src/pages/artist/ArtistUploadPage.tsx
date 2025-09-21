import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Upload, Image, DollarSign, FileText, CheckCircle, X, Camera } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const schema = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title must be less than 100 characters'),
  description: yup.string().required('Description is required').max(1000, 'Description must be less than 1000 characters'),
  price: yup.number().min(0, 'Price must be positive').required('Price is required'),
});

type FormData = yup.InferType<typeof schema>;

const ArtistUploadPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxFiles = 5;

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name}: Only JPG, JPEG, and PNG files are allowed`);
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name}: File size must be less than 5MB`);
        return false;
      }
      return true;
    });

    if (uploadedImages.length + validFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Create previews for valid files
    const newPreviews: string[] = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          if (newPreviews.length === validFiles.length) {
            setImagePreviews(prev => [...prev, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    setUploadedImages(prev => [...prev, ...validFiles]);
    toast.success(`${validFiles.length} image(s) uploaded successfully`);
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  const onSubmit = async (data: FormData) => {
    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image of your work');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Append images
      uploadedImages.forEach((image, index) => {
        formData.append(`images`, image);
      });

      // Append form data
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());

      await axios.post('/artist/upload-work', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Your work has been uploaded successfully!');
      navigate('/find-work');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to upload work';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Upload Your Work</h1>
            <p className="text-amber-100 mt-2">
              Showcase your artistic creations to potential clients
            </p>
          </div>

         

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-8">
            {/* Image Upload Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Image className="mr-2 text-amber-600" size={20} />
                  Upload Photos 
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 px-3 rounded-md transition-colors duration-200 text-sm"
                >
                  <span>✨</span>
                  <span>Image Enhancement</span>
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="images" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload photos of your work
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        JPG, JPEG, PNG up to 5MB each (max 5 images)
                      </span>
                    </label>
                    <input
                      id="images"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/jpg,image/png"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Images:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Work Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 text-amber-600" size={20} />
                Work Details
              </h3>
              
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter a descriptive title for your work"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>


                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Describe your work, techniques used, inspiration, and any special details..."
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center space-x-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-1.5 px-3 rounded-md transition-colors duration-200 text-sm"
                    >
                      <span>🤖</span>
                      <span>Write with AI</span>
                    </button>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>

                {/* Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pricing (₹) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">₹</span>
                    </div>
                    <input
                      {...register('price', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Enter your price in rupees"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the price for this specific work or service in Indian Rupees
                  </p>
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/find-work')}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      <span>Upload Work</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistUploadPage;
