import { useState, useEffect, useRef } from 'react';
import { Video, Mic, Volume2, Monitor, Settings, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface DeviceSetupProps {
  onJoin: () => void;
  onCancel: () => void;
}

export default function DeviceSetup({ onJoin, onCancel }: DeviceSetupProps) {
  const [devices, setDevices] = useState<{
    videoDevices: MediaDeviceInfo[];
    audioDevices: MediaDeviceInfo[];
    audioOutputDevices: MediaDeviceInfo[];
  }>({
    videoDevices: [],
    audioDevices: [],
    audioOutputDevices: [],
  });

  const [selectedDevices, setSelectedDevices] = useState<{
    videoDeviceId: string;
    audioDeviceId: string;
    audioOutputDeviceId: string;
  }>({
    videoDeviceId: '',
    audioDeviceId: '',
    audioOutputDeviceId: '',
  });

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAudioWorking, setIsAudioWorking] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContext = useRef<AudioContext>();
  const audioAnalyser = useRef<AnalyserNode>();
  const animationFrame = useRef<number>();

  useEffect(() => {
    // Initialize audio context
    audioContext.current = new AudioContext();
    loadDevices();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      stream?.getTracks().forEach(track => track.stop());
      audioContext.current?.close();
    };
  }, []);

  const loadDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();

      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const audioDevices = devices.filter(device => device.kind === 'audioinput');
      const audioOutputDevices = devices.filter(device => device.kind === 'audiooutput');

      setDevices({ videoDevices, audioDevices, audioOutputDevices });

      if (videoDevices.length > 0) {
        setSelectedDevices(prev => ({ ...prev, videoDeviceId: videoDevices[0].deviceId }));
      }
      if (audioDevices.length > 0) {
        setSelectedDevices(prev => ({ ...prev, audioDeviceId: audioDevices[0].deviceId }));
      }
      if (audioOutputDevices.length > 0) {
        setSelectedDevices(prev => ({ ...prev, audioOutputDeviceId: audioOutputDevices[0].deviceId }));
      }

      await setupStream(videoDevices[0]?.deviceId, audioDevices[0]?.deviceId);
    } catch (error) {
      console.error('Error loading devices:', error);
      toast.error('Failed to access media devices');
    }
  };

  const setupStream = async (videoDeviceId: string, audioDeviceId: string) => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: videoDeviceId ? { deviceId: videoDeviceId } : true,
        audio: audioDeviceId ? { deviceId: audioDeviceId } : true,
      });

      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      // Setup audio analysis
      if (audioContext.current) {
        const audioSource = audioContext.current.createMediaStreamSource(newStream);
        audioAnalyser.current = audioContext.current.createAnalyser();
        audioSource.connect(audioAnalyser.current);
        analyzeAudio();
      }
    } catch (error) {
      console.error('Error setting up stream:', error);
      toast.error('Failed to setup media stream');
    }
  };

  const analyzeAudio = () => {
    if (!audioAnalyser.current) return;

    const dataArray = new Uint8Array(audioAnalyser.current.frequencyBinCount);
    
    const checkAudio = () => {
      audioAnalyser.current?.getByteFrequencyData(dataArray);
      const audioLevel = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      setIsAudioWorking(audioLevel > 10);
      animationFrame.current = requestAnimationFrame(checkAudio);
    };

    checkAudio();
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraEnabled(!isCameraEnabled);
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicEnabled(!isMicEnabled);
    }
  };

  const playTestSound = () => {
    const audio = new Audio('/test-sound.mp3');
    if (selectedDevices.audioOutputDeviceId) {
      // @ts-ignore - setSinkId is not in the type definitions yet
      audio.setSinkId(selectedDevices.audioOutputDeviceId);
    }
    audio.play();
  };

  const handleDeviceChange = async (deviceId: string, type: 'video' | 'audio' | 'audioOutput') => {
    setSelectedDevices(prev => ({
      ...prev,
      [type === 'video' ? 'videoDeviceId' : type === 'audio' ? 'audioDeviceId' : 'audioOutputDeviceId']: deviceId
    }));

    if (type === 'video' || type === 'audio') {
      await setupStream(
        type === 'video' ? deviceId : selectedDevices.videoDeviceId,
        type === 'audio' ? deviceId : selectedDevices.audioDeviceId
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Your Devices</h2>

        <div className="space-y-6">
          {/* Video Preview */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${!isCameraEnabled ? 'hidden' : ''}`}
            />
            {!isCameraEnabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <Video className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Device Controls */}
          <div className="grid grid-cols-2 gap-4">
            {/* Camera Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Camera
              </label>
              <select
                value={selectedDevices.videoDeviceId}
                onChange={(e) => handleDeviceChange(e.target.value, 'video')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {devices.videoDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                  </option>
                ))}
              </select>
            </div>

            {/* Microphone Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Microphone
              </label>
              <select
                value={selectedDevices.audioDeviceId}
                onChange={(e) => handleDeviceChange(e.target.value, 'audio')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {devices.audioDevices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Microphone ${device.deviceId.slice(0, 5)}...`}
                  </option>
                ))}
              </select>
            </div>

            {/* Speaker Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Speaker
              </label>
              <div className="flex space-x-2">
                <select
                  value={selectedDevices.audioOutputDeviceId}
                  onChange={(e) => handleDeviceChange(e.target.value, 'audioOutput')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {devices.audioOutputDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Speaker ${device.deviceId.slice(0, 5)}...`}
                    </option>
                  ))}
                </select>
                <button
                  onClick={playTestSound}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Volume2 className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Audio Level Indicator */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio Level
              </label>
              <div className="h-10 bg-gray-100 rounded-md overflow-hidden">
                <div
                  className={`h-full transition-all duration-150 ${
                    isAudioWorking ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  style={{ width: isAudioWorking ? '100%' : '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full ${
                isCameraEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Video className="h-6 w-6" />
            </button>
            <button
              onClick={toggleMicrophone}
              className={`p-3 rounded-full ${
                isMicEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Mic className="h-6 w-6" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onJoin}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Join Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}