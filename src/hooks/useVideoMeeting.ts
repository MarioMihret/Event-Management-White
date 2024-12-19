import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import SimplePeer from 'simple-peer';

export function useVideoMeeting(roomId: string) {
  const [peers, setPeers] = useState<SimplePeer.Instance[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const socketRef = useRef<Socket>();
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<{ peerId: string; peer: SimplePeer.Instance }[]>([]);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }

        socketRef.current?.emit('join-room', roomId);

        socketRef.current?.on('user-connected', (userId: string) => {
          connectToNewUser(userId, stream);
        });

        socketRef.current?.on('user-disconnected', (userId: string) => {
          const peer = peersRef.current.find(p => p.peerId === userId);
          if (peer) {
            peer.peer.destroy();
            peersRef.current = peersRef.current.filter(p => p.peerId !== userId);
            setPeers(peers => peers.filter(p => p !== peer.peer));
          }
        });
      });

    return () => {
      stream?.getTracks().forEach(track => track.stop());
      socketRef.current?.disconnect();
      peers.forEach(peer => peer.destroy());
    };
  }, [roomId]);

  function connectToNewUser(userId: string, stream: MediaStream) {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socketRef.current?.emit('sending-signal', { userToSignal: userId, signal });
    });

    peersRef.current.push({ peerId: userId, peer });
    setPeers(peers => [...peers, peer]);
  }

  return {
    stream,
    userVideoRef,
    peers,
  };
}