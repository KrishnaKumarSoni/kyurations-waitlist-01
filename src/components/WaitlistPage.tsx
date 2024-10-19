import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Sparkles, Zap, Share2 } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  expectation: string;
};

const WaitlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    const mockUniqueCode = 'ABC123'; // In real app, this would come from the server
    navigate(`/share/${mockUniqueCode}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-orange-600 mb-6 flex items-center">
        <Sparkles className="mr-2" /> Kyurations Waitlist
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Join the waitlist for Kyurations - Your AI-powered content curation and retrieval platform.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 flex items-center"
      >
        <Zap className="mr-2" /> Join the Waitlist
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Join the Kyurations Waitlist</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label htmlFor="expectation" className="block text-sm font-medium text-gray-700">What do you expect from Kyurations?</label>
                <select
                  {...register("expectation", { required: "Please select an option" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select an option</option>
                  <option value="efficient-curation">Efficient content curation</option>
                  <option value="ai-search">AI-powered search</option>
                  <option value="knowledge-graphs">Visual knowledge graphs</option>
                  <option value="collaboration">Social and collaborative features</option>
                  <option value="cross-device">Cross-device synchronization</option>
                  <option value="newsletters">Newsletter creation</option>
                  <option value="seo-friendly">SEO-friendly public lists</option>
                  <option value="data-ownership">Clear data ownership</option>
                  <option value="derived-ideas">AI-generated derived ideas</option>
                  <option value="interactive-quizzes">Interactive quizzes</option>
                </select>
                {errors.expectation && <p className="text-red-500 text-xs mt-1">{errors.expectation.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center"
              >
                <Share2 className="mr-2" /> Join and Share
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitlistPage;