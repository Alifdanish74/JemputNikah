import { useState } from 'react';
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";

function AudioBar() {
  const [isPlaying, setIsPlaying] = useState(false); // Track play state

  // Toggle play/pause functionality
  const togglePlayPause = () => {
    const audioElement = document.getElementById('audio-element');
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause(); // Pause the audio
        setIsPlaying(false);
      } else {
        audioElement.play(); // Play the audio
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="flex -z-1 sticky justify-center content-center top-0 bg-transparent p-6 pt-10 text-center">
      <button
        id="music-btn"
        onClick={togglePlayPause} // Handle play/pause functionality
        className="text-black font-bold py-2 px-4 bg-gray-100 rounded-full flex"
      >
        <div className="music-player play text-blue-700">
          {isPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />} {/* Toggle between play/pause icons */}
        </div>
        <span className="text-xs ml-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
          Kisah Cinta Kita - Hafiz Suip (Instrumental)
        </span>
      </button>

      {/* Audio Element */}
      <audio
        id="audio-element" // Access audio element by ID
        src="https://l4lp5z4mhbcqycfi.public.blob.vercel-storage.com/Kisahcintakita-rLEvlErlgGc2SaWcG5ZxlmhfpZ8c4i.mp3"
        controlsList="nodownload"
        loop
        className="hidden" // Keep audio element hidden
      />
    </div>
  );
}

export default AudioBar;
