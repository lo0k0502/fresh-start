import { useSignal } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';

interface VideoPreviewProps {
  url: string;
}

export const VideoPreview = ({ url }: VideoPreviewProps) => {
  const ready = useSignal(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    ready.value = videoRef.current.readyState === 4;
  }, []);

  return (
    <>
      <video ref={videoRef} class={`h-20 ${ready.value ? '' : 'w-0'}`} src={url}></video>
      {!ready.value && <img src='/mit/video.svg' class='h-20' />}
    </>
  );
};
