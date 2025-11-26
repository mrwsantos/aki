import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [songs] = useState([
    {
      id: 1,
      title: "Things I cannot Understand",
      artist: "Willian Santos",
      duration: 203,
      url: "/songs/1.mp3",
      ai: false,
    },
    {
      id: 2,
      title: "Things I cannot Understand - Folk version",
      artist: "AI version",
      duration: 169,
      url: "/songs/2.mp3",
      ai: true,
    },
    {
      id: 3,
      title: "Things I cannot Understand - Pop Rock",
      artist: "AI version",
      duration: 229,
      url: "/songs/3.mp3",
      ai: true,
    },
    {
      id: 4,
      title: "Things I cannot Understand - Eletro",
      artist: "AI version",
      duration: 185,
      url: "/songs/4-Eletro.mp3",
      ai: true,
    },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = (Number(e.target.value) / 100) * currentSong.duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value) / 100);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setCurrentTime(0);
  };

  const previousSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = (currentTime / currentSong.duration) * 100;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          borderRadius: "24px",
          padding: "40px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          style={{
            width: "200px",
            margin: "0 0 20px",
            borderRadius: 20,
          }}
          src={
            currentSong.ai
              ? "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740&q=80"
              : "/will.jpg"
          }
        />
        {/* Song Info */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2
            style={{
              margin: "0 0 8px 0",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {currentSong.title}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#fff",
            }}
          >
            {currentSong.artist}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "16px" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercentage}
            onChange={handleSeek}
            style={{
              width: "100%",
              height: "6px",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#fff",
              marginTop: "8px",
            }}
          >
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={previousSong}
            style={{
              background: "#667eea",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "20px",
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlayPause}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              fontSize: "28px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
              color: "#000",
            }}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <button
            onClick={nextSong}
            style={{
              background: "#667eea",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "20px",
              cursor: "pointer",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s",
            }}
          >
            <SkipForward size={20} />
          </button>
        </div>

        <p style={{ color: "#fff", textAlign: "center", marginBottom: "10px" }}>
          Volume control:
        </p>
        {/* Volume Control */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#fff" }}>
            <Volume2 size={20} />
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            style={{
              flex: 1,
              height: "6px",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
          <span style={{ fontSize: "14px", color: "#fff", width: "40px" }}>
            {Math.round(volume * 100)}%
          </span>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextSong}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
