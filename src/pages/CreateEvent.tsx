import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Image as ImageIcon, Tags, DollarSign, Users, Video } from 'lucide-react';
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
    { id: 1, title: 'Basic Info', icon: Tags },
    { id: 2, title: 'Date & Time', icon: Calendar },
    { id: 3, title: 'Location', icon: MapPin },
    { id: 4, title: 'Ticketing', icon: DollarSign },
    { id: 5, title: 'Media', icon: ImageIcon },
    { id: 6, title: 'Additional Info', icon: Users },
    { id: 7, title: 'Video Meeting', icon: Video },
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Create New Event</h1>
          
          {/* Progress Steps */}
          <nav className="flex justify-between items-center mb-8 overflow-x-auto">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex flex-col items-center space-y-2 min-w-[100px] ${
                  currentStep === step.id
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  currentStep === step.id
                    ? 'bg-indigo-100'
                    : 'bg-gray-100'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
              </button>
            ))}
          </nav>

          {/* Form Content */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep === steps.length) {
                  handleSubmit();
                } else if (validateStep(currentStep)) {
                  setCurrentStep((prev) => Math.min(steps.length, prev + 1));
                }
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                validateStep(currentStep)
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!validateStep(currentStep)}
            >
              {currentStep === steps.length ? 'Create Event' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}