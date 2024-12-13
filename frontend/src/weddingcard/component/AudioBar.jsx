/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import { useWeddingCard } from "../../customhooks/WeddingCardContext";

function AudioBar({ isPlaying, setIsPlaying }) {
  const { weddingCard } = useWeddingCard();

  useEffect(() => {
    const audioElement = document.getElementById("audio-element");

    // Start or pause the audio based on `isPlaying`
    if (audioElement) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const audioElement = document.getElementById("audio-element");

      if (document.hidden && isPlaying && audioElement) {
        // Pause audio when the tab is hidden
        audioElement.pause();
        setIsPlaying(false); // Update the state to reflect the paused state
      }
    };

    // Attach the visibility change event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying, setIsPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="flex z-50 sticky justify-center content-center top-0 bg-transparent p-6 pt-10 text-center">
      <button
        id="music-btn"
        onClick={togglePlayPause}
        className="text-black font-bold py-2 px-4 border border-gray-400 bg-gray-100 rounded-full flex"
      >
        <div className="music-player play text-blue-700">
          {isPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
        </div>
        <span className="text-xs ml-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">
          {weddingCard.bgSongTitle}
        </span>
      </button>

      {/* Audio Element */}
      <audio
        id="audio-element"
        src={weddingCard.bgSong}
        controlsList="nodownload"
        loop
        className="hidden"
      />
    </div>
  );
}

export default AudioBar;
