import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Users } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';
import DeviceSetup from '../components/video-meeting/DeviceSetup';

export default function VideoMeeting() {
  const { roomId } = useParams();
  const [isJoined, setIsJoined] = useState(false);
  const [showDeviceSetup, setShowDeviceSetup] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [participants, setParticipants] = useState<string[]>([]);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const socketRef = useRef<Socket>();
  const streamRef = useRef<MediaStream>();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:5000');

    // Handle socket events
    socketRef.current.on('participant-joined', (participantId: string) => {
      setParticipants(prev => [...prev, participantId]);
      toast.success('A new participant has joined');
    });

    socketRef.current.on('participant-left', (participantId: string) => {
      setParticipants(prev => prev.filter(id => id !== participantId));
      toast.info('A participant has left');
    });

    return () => {
      socketRef.current?.disconnect();
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleJoinMeeting = () => {
    socketRef.current?.emit('join-room', roomId);
    setIsJoined(true);
    setShowDeviceSetup(false);
    toast.success('You have joined the meeting');
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const leaveMeeting = () => {
    socketRef.current?.disconnect();
    streamRef.current?.getTracks().forEach(track => track.stop());
    window.location.href = '/events';
  };

  if (showDeviceSetup) {
    return (
      <DeviceSetup
        onJoin={handleJoinMeeting}
        onCancel={() => window.location.href = '/events'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Local Video */}
        <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Placeholder for other participants */}
        {participants.map((participantId) => (
          <div
            key={participantId}
            className="aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
          >
            <div className="text-white text-center">
              <Users className="h-12 w-12 mx-auto mb-2" />
              <p>Participant {participantId}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-600' : 'bg-gray-600'
            } hover:bg-opacity-80`}
          >
            {isMuted ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${
              !isVideoEnabled ? 'bg-red-600' : 'bg-gray-600'
            } hover:bg-opacity-80`}
          >
            {isVideoEnabled ? (
              <VideoIcon className="h-6 w-6 text-white" />
            ) : (
              <VideoOff className="h-6 w-6 text-white" />
            )}
          </button>

          <button
            onClick={leaveMeeting}
            className="p-3 rounded-full bg-red-600 hover:bg-red-700"
          >
            <PhoneOff className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}