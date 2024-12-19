import { useState } from 'react';
import { Video, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface EventVideoMeetingButtonProps {
  meetingId: string;
  isOrganizer?: boolean;
}

export default function EventVideoMeetingButton({ meetingId, isOrganizer }: EventVideoMeetingButtonProps) {
  const [copied, setCopied] = useState(false);

  const getMeetingUrl = () => {
    return `${window.location.origin}/meeting/${meetingId}`;
  };

  const copyMeetingLink = async () => {
    try {
      await navigator.clipboard.writeText(getMeetingUrl());
      setCopied(true);
      toast.success('Meeting link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy meeting link');
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Video className="h-5 w-5 text-indigo-600" />
        <h3 className="text-sm font-medium text-gray-900">
          {isOrganizer ? 'Video Meeting Link' : 'Join Video Meeting'}
        </h3>
      </div>

      <div className="space-y-4">
        {isOrganizer && (
          <div className="bg-white p-3 rounded-md border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Share this link with attendees:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-50 px-2 py-1 rounded text-sm font-mono truncate">
                {getMeetingUrl()}
              </code>
              <button
                onClick={copyMeetingLink}
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
              >
                <LinkIcon className="h-4 w-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <Link
            to={`/meeting/${meetingId}`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Video className="h-4 w-4 mr-2" />
            {isOrganizer ? 'Start Meeting' : 'Join Meeting'}
          </Link>
          {!isOrganizer && (
            <button
              onClick={copyMeetingLink}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}