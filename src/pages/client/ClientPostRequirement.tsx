import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, DollarSign, MapPin, Briefcase } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const schema = yup.object({
  title: yup.string().min(5, 'Title must be at least 5 characters').max(100, 'Title cannot exceed 100 characters').required('Title is required'),
  description: yup.string().min(20, 'Description must be at least 20 characters').max(1000, 'Description cannot exceed 1000 characters').required('Description is required'),
  role: yup.string().min(2, 'Role must be at least 2 characters').max(50, 'Role cannot exceed 50 characters').required('Role is required'),
  location: yup.string().min(2, 'Location must be at least 2 characters').max(50, 'Location cannot exceed 50 characters').required('Location is required'),
  compensation: yup.number().min(0, 'Compensation cannot be negative').required('Compensation is required'),
  compensationType: yup.string().oneOf(['fixed', 'hourly', 'negotiable']).required('Compensation type is required'),
  category: yup.string().oneOf(['music', 'dance', 'yoga', 'crafts']).required('Category is required'),
  requirements: yup.array().of(yup.string().min(1, 'Requirement cannot be empty'))
});

type FormData = yup.InferType<typeof schema>;

const ClientPostRequirement = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      requirements: ['']
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'requirements'
  });

  const selectedCategory = watch('category');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const filteredRequirements = data.requirements?.filter(req => req.trim() !== '') || [];
      
      await axios.post('/client/requirements', {
        ...data,
        requirements: filteredRequirements
      });

      toast.success('Requirement posted successfully!');
      navigate('/client/requirements');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to post requirement';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: 'music', label: 'Music', icon: '🎵' },
    { value: 'dance', label: 'Dance', icon: '💃' },
    { value: 'yoga', label: 'Yoga & Meditation', icon: '🧘' },
    { value: 'crafts', label: 'Traditional Crafts', icon: '🎨' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/client/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Post a Requirement</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Create Job Requirement</h2>
            <p className="text-blue-100 mt-2">Find the perfect artist for your project</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="mr-2 text-blue-600" size={20} />
                Basic Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Bharatanatyam Instructor for Cultural Event"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    {...register('role')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Dance Instructor, Music Teacher"
                  />
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description')}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe your project, expectations, and what you're looking for in an artist..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Category *</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoryOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      {...register('category')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <span className="text-2xl mb-2">{option.icon}</span>
                    <span className="font-medium text-center">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Location & Compensation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline mr-1" size={16} />
                  Location *
                </label>
                <input
                  {...register('location')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mumbai, Delhi"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline mr-1" size={16} />
                  Compensation *
                </label>
                <div className="flex space-x-2">
                  <input
                    {...register('compensation', { valueAsNumber: true })}
                    type="number"
                    min="0"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Amount"
                  />
                  <select
                    {...register('compensationType')}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="hourly">Per Hour</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
                {errors.compensation && (
                  <p className="mt-1 text-sm text-red-600">{errors.compensation.message}</p>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2">
                    <input
                      {...register(`requirements.${index}` as const)}
                      type="text"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Minimum 5 years experience"
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-3 text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append('')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Plus size={16} />
                  <span>Add Requirement</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Posting Requirement...</span>
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    <span>Post Requirement</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientPostRequirement;