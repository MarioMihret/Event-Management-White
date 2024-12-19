import { useState } from 'react';
import { Video, Copy, Mail } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import EventVideoMeetingButton from '../EventVideoMeetingButton';

interface EventVideoMeetingProps {
  data: {
    enableVideoMeeting: boolean;
    meetingId: string;
  };
  onUpdate: (data: any) => void;
}

export default function EventVideoMeeting({ data, onUpdate }: EventVideoMeetingProps) {
  const handleEnableVideoMeeting = () => {
    if (!data.enableVideoMeeting) {
      const meetingId = uuidv4();
      onUpdate({ enableVideoMeeting: true, meetingId });
    } else {
      onUpdate({ enableVideoMeeting: false, meetingId: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={data.enableVideoMeeting}
            onChange={handleEnableVideoMeeting}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            Enable video meeting for this event
          </span>
        </label>
      </div>

      {data.enableVideoMeeting && (
        <EventVideoMeetingButton 
          meetingId={data.meetingId}
          isOrganizer={true}
        />
      )}
    </div>
  );
}