import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBar = useRef(); // Reference for seek bar to manipulate width
  const seekBg = useRef(); // Reference for the seek background
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0, percent: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current?.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    const clickPosition = e.nativeEvent.offsetX;
    const barWidth = seekBg.current.offsetWidth;
    const newTime = (clickPosition / barWidth) * audioRef.current.duration;
  
    // Update the audio's current time to the calculated position
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;

        setTime({
          currentTime: {
            second: Math.floor(currentTime % 60),
            minute: Math.floor(currentTime / 60),
            percent: (currentTime / duration) * 100 || 0,
          },
          totalTime: {
            second: Math.floor(duration % 60) || 0,
            minute: Math.floor(duration / 60) || 0,
          },
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = updateCurrentTime;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null;
      }
    };
  }, [audioRef, track]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg, // Add seekBg to the context value
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
