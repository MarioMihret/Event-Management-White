import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Image as ImageIcon, Tags, DollarSign, Users, Video, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import EventBasicInfo from '../components/create-event/EventBasicInfo';
import EventDateTime from '../components/create-event/EventDateTime';
import EventLocation from '../components/create-event/EventLocation';
import EventTicketing from '../components/create-event/EventTicketing';
import EventMedia from '../components/create-event/EventMedia';
import EventAdditionalInfo from '../components/create-event/EventAdditionalInfo';
import EventVideoMeeting from '../components/create-event/EventVideoMeeting';
import { useEvents } from '../context/EventContext';
import { EventFormData } from '../types';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>({
    basicInfo: {
      title: '',
      description: '',
      category: '',
      type: '',
      tags: [],
    },
    dateTime: {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      timezone: '',
    },
    location: {
      type: 'physical',
      venue: '',
      address: '',
      city: '',
      virtualLink: '',
    },
    ticketing: {
      type: 'free',
      price: 0,
      availableTickets: 0,
      ticketTypes: [],
    },
    media: {
      bannerImage: '',
      logo: '',
    },
    additionalInfo: {
      agenda: [],
      speakers: [],
      sponsors: [],
    },
    videoMeeting: {
      enableVideoMeeting: false,
      meetingId: '',
    },
  });

  const handleUpdateForm = (section: keyof typeof formData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.basicInfo.title && formData.basicInfo.description && formData.basicInfo.category;
      case 2:
        return formData.dateTime.startDate && formData.dateTime.startTime;
      case 3:
        return formData.location.type === 'virtual' 
          ? formData.location.virtualLink
          : (formData.location.venue && formData.location.address && formData.location.city);
      case 4:
        return formData.ticketing.type === 'free'
          ? formData.ticketing.availableTickets > 0
          : formData.ticketing.ticketTypes.length > 0;
      case 5:
        return formData.media.bannerImage;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    const newEvent = {
      title: formData.basicInfo.title,
      description: formData.basicInfo.description,
      category: formData.basicInfo.category,
      date: `${formData.dateTime.startDate}T${formData.dateTime.startTime}`,
      location: formData.location.type === 'physical'
        ? `${formData.location.venue}, ${formData.location.city}`
        : 'Virtual Event',
      price: formData.ticketing.type === 'free' ? 0 : formData.ticketing.ticketTypes[0]?.price || 0,
      image: formData.media.bannerImage,
      organizer: 'Current User',
      tickets: {
        available: formData.ticketing.type === 'free'
          ? formData.ticketing.availableTickets
          : formData.ticketing.ticketTypes.reduce((sum, type) => sum + type.quantity, 0),
        total: formData.ticketing.type === 'free'
          ? formData.ticketing.availableTickets
          : formData.ticketing.ticketTypes.reduce((sum, type) => sum + type.quantity, 0),
      },
      videoMeeting: formData.videoMeeting,
    };

    addEvent(newEvent);
    navigate('/events');
  };

  const steps = [
    { id: 1, title: 'Basic Info', icon: Tags, description: 'Event title, description & category' },
    { id: 2, title: 'Date & Time', icon: Calendar, description: 'Schedule your event' },
    { id: 3, title: 'Location', icon: MapPin, description: 'Venue or virtual details' },
    { id: 4, title: 'Ticketing', icon: DollarSign, description: 'Pricing & availability' },
    { id: 5, title: 'Media', icon: ImageIcon, description: 'Images & branding' },
    { id: 6, title: 'Additional Info', icon: Users, description: 'Speakers & agenda' },
    { id: 7, title: 'Video Meeting', icon: Video, description: 'Virtual meeting setup' },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EventBasicInfo data={formData.basicInfo} onUpdate={(data) => handleUpdateForm('basicInfo', data)} />;
      case 2:
        return <EventDateTime data={formData.dateTime} onUpdate={(data) => handleUpdateForm('dateTime', data)} />;
      case 3:
        return <EventLocation data={formData.location} onUpdate={(data) => handleUpdateForm('location', data)} />;
      case 4:
        return <EventTicketing data={formData.ticketing} onUpdate={(data) => handleUpdateForm('ticketing', data)} />;
      case 5:
        return <EventMedia data={formData.media} onUpdate={(data) => handleUpdateForm('media', data)} />;
      case 6:
        return <EventAdditionalInfo data={formData.additionalInfo} onUpdate={(data) => handleUpdateForm('additionalInfo', data)} />;
      case 7:
        return <EventVideoMeeting data={formData.videoMeeting} onUpdate={(data) => handleUpdateForm('videoMeeting', data)} />;
      default:
        return null;
    }
  };

  const completedSteps = Array.from({ length: currentStep - 1 }, (_, i) => i + 1);
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Event Creation Wizard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4">
              Create Your Event
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your vision into reality with our intuitive event creation process
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {steps.length}</span>
              <span className="text-sm font-medium text-indigo-600">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="mb-8">
            <div className="flex items-center justify-between overflow-x-auto pb-4">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = currentStep === step.id;
                const isClickable = index <= currentStep;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => isClickable && setCurrentStep(step.id)}
                      className={`group flex flex-col items-center space-y-2 min-w-[120px] p-3 rounded-xl transition-all duration-300 ${
                        isCurrent
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg scale-105'
                          : isCompleted
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : isClickable
                          ? 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!isClickable}
                    >
                      <div className={`relative p-3 rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'bg-white/20 backdrop-blur-sm'
                          : isCompleted
                          ? 'bg-green-100'
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      }`}>
                        {isCompleted ? (
                          <Check className={`w-6 h-6 ${
                            isCurrent ? 'text-white' : 'text-green-600'
                          }`} />
                        ) : (
                          <step.icon className={`w-6 h-6 ${
                            isCurrent ? 'text-white' : isClickable ? 'text-gray-600' : 'text-gray-400'
                          }`} />
                        )}
                        {isCurrent && (
                          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                        )}
                      </div>
                      <span className={`text-sm font-medium text-center leading-tight ${
                        isCurrent ? 'text-white' : isCompleted ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`hidden md:block w-8 h-px mx-2 transition-colors duration-300 ${
                        isCompleted ? 'bg-green-300' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8 mb-8 transition-all duration-500">
            <div className="animate-fadeIn">
              {renderStepContent()}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`group flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </span>
              <button
                onClick={() => {
                  if (currentStep === steps.length) {
                    handleSubmit();
                  } else if (validateStep(currentStep)) {
                    setCurrentStep((prev) => Math.min(steps.length, prev + 1));
                  }
                }}
                className={`group flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  validateStep(currentStep)
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-105'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                disabled={!validateStep(currentStep)}
              >
                <span>{currentStep === steps.length ? 'Create Event' : 'Next Step'}</span>
                {currentStep === steps.length ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}