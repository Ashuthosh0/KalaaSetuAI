import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, User, MapPin, Award, Calendar, AlertCircle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const schema = yup.object({
  gender: yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
  address: yup.object({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    pincode: yup.string().matches(/^[0-9]{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
  }),
  category: yup.string().oneOf(['music', 'dance', 'yoga', 'crafts']).required('Art category is required'),
  experience: yup.number().min(0, 'Experience cannot be negative').max(50, 'Experience cannot exceed 50 years').required('Years of experience is required'),
  introduction: yup.string().max(500, 'Introduction cannot exceed 500 characters'),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

type FormData = yup.InferType<typeof schema>;

const ArtistApplicationPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingApplication, setHasExistingApplication] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      address: {
        street: '',
        city: '',
        state: '',
        pincode: ''
      }
    }
  });

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    try {
      const response = await axios.get('/artist/application-status');
      if (response.data.application) {
        setHasExistingApplication(true);
        setApplicationStatus(response.data.application.status);
      }
    } catch (error: any) {
      // If 404, user doesn't have an application yet
      if (error.response?.status !== 404) {
        console.error('Error checking application status:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = watch('category');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF, JPG, or PNG file');
        return;
      }

      if (file.size > maxSize) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setUploadedFile(file);
      toast.success('File uploaded successfully');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!uploadedFile) {
      toast.error('Please upload your degree/certificate');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('certificate', uploadedFile);
      formData.append('applicationData', JSON.stringify(data));

      await axios.post('/artist/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Application submitted successfully! Please wait for approval.');
      navigate('/artist/application-status');
    } catch (error: any) {
      if (error.response?.data?.hasExistingApplication) {
        setHasExistingApplication(true);
        setApplicationStatus(error.response.data.applicationStatus);
        toast.error('You have already submitted an application');
      } else {
        const message = error.response?.data?.message || 'Failed to submit application';
        toast.error(message);
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Show existing application status if user has already applied
  if (hasExistingApplication) {
    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'pending':
          return <Clock className="text-yellow-500" size={48} />;
        case 'approved':
          return <CheckCircle className="text-green-500" size={48} />;
        case 'rejected':
          return <AlertCircle className="text-red-500" size={48} />;
        default:
          return <Clock className="text-gray-500" size={48} />;
      }
    };

    const getStatusMessage = (status: string) => {
      switch (status) {
        case 'pending':
          return {
            title: 'Application Under Review',
            message: 'Your artist application has been submitted and is currently being reviewed by our team. We will notify you via email once a decision has been made.',
            action: 'View Application Status',
            actionPath: '/artist/application-status'
          };
        case 'approved':
          return {
            title: 'Application Approved!',
            message: 'Congratulations! Your artist application has been approved. You can now browse and apply for opportunities posted by clients.',
            action: 'Find Work Opportunities',
            actionPath: '/find-work'
          };
        case 'rejected':
          return {
            title: 'Application Needs Revision',
            message: 'Your application was not approved. Please check the feedback and feel free to reapply with the necessary improvements.',
            action: 'View Feedback & Reapply',
            actionPath: '/artist/application-status'
          };
        default:
          return {
            title: 'Application Status',
            message: 'Please check your application status for more details.',
            action: 'View Status',
            actionPath: '/artist/application-status'
          };
      }
    };

    const statusInfo = getStatusMessage(applicationStatus || '');

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-8 py-6">
              <h1 className="text-3xl font-bold text-white">Artist Application</h1>
              <p className="text-amber-100 mt-2">
                You have already submitted your application
              </p>
            </div>

            <div className="px-8 py-12 text-center">
              <div className="mb-6">
                {getStatusIcon(applicationStatus || '')}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {statusInfo.title}
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {statusInfo.message}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => navigate(statusInfo.actionPath)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  {statusInfo.action}
                </button>
                
                <button
                  onClick={() => navigate('/')}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Artist Application</h1>
            <p className="text-amber-100 mt-2">
              Complete your profile to start receiving opportunities
            </p>
          </div>

          {/* Welcome Message */}
          <div className="px-8 py-6 bg-amber-50 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome, {user?.firstName} {user?.lastName}!
                </h2>
                <p className="text-gray-600">Please complete your artist profile below</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2 text-amber-600" size={20} />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    {...register('gender')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="mr-2 text-amber-600" size={20} />
                Address
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    {...register('address.street')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter your street address"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      {...register('address.city')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="City"
                    />
                    {errors.address?.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      {...register('address.state')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="State"
                    />
                    {errors.address?.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      {...register('address.pincode')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="000000"
                    />
                    {errors.address?.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.pincode.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Art Category */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="mr-2 text-amber-600" size={20} />
                Art Category
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoryOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === option.value
                        ? 'border-amber-500 bg-amber-50'
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

            {/* Experience */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-2 text-amber-600" size={20} />
                Experience
              </h3>
              
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  {...register('experience', { valueAsNumber: true })}
                  type="number"
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter years of experience"
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                )}
              </div>
            </div>

            {/* Certificate Upload */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2 text-amber-600" size={20} />
                Certificate/Degree
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="certificate" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload your degree or certificate
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PDF, JPG, PNG up to 5MB
                      </span>
                    </label>
                    <input
                      id="certificate"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                {uploadedFile && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">{uploadedFile.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Introduction */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Introduction (Optional)
              </label>
              <textarea
                {...register('introduction')}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Tell us about yourself and your artistic journey..."
              />
              {errors.introduction && (
                <p className="mt-1 text-sm text-red-600">{errors.introduction.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start space-x-3">
                <input
                  {...register('termsAccepted')}
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    <span>Submit Application</span>
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

export default ArtistApplicationPage;