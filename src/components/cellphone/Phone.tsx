import React, { useEffect, useState, useCallback } from "react";
import backCell from "@/img/back-cell.png";
import {
  BookImage,
  Cake,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  MicVocal,
  Music,
  Video,
  X,
} from "lucide-react";

import Card from "../birthday2025/Card";
import Lyrics from "../birthday2025/lyrics/Lyrics";
import Album from "../birthday2025/album/Album";
import MeetingCountdown from "../birthday2025/MeetingContdown/MeetingContdown";
import MusicPlayer from "../birthday2025/songs/MusicPlayer";
import VideoPlayer from "../birthday2025/video/Video";

import type { LucideProps } from "lucide-react";

// -----------------------
// Tipos
// -----------------------
type AppId = "card" | "video" | "lyrics" | "album" | "meeting" | "music";

interface AppItem {
  id: AppId;
  icon: React.ComponentType<LucideProps>; // ✔ tipo correto
  label: string;
  color: string;
}

// -----------------------
// Constantes
// -----------------------
const APPS: AppItem[] = [
  { id: "card", icon: Cake, label: "Open", color: "#f5b9ff" },
  { id: "video", icon: Video, label: "Video", color: "#f3ff94" },
  { id: "lyrics", icon: MicVocal, label: "Lyrics", color: "#88f9ff" },
  { id: "album", icon: BookImage, label: "Album", color: "#98ffa6" },
  { id: "meeting", icon: Clock, label: "Meeting", color: "#b598ff" },
  { id: "music", icon: Music, label: "Music", color: "#ffc198" },
];

// -----------------------
// Componente principal
// -----------------------
const Phone: React.FC = () => {
  const [showCard, setShowCard] = useState<boolean>(false);
  const [openMenuMain, setOpenMenuMain] = useState<boolean>(false);
  const [openLyrics, setOpenLyrics] = useState<boolean>(false);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [hour, setHour] = useState<string>("");

  // Atualiza horário
  const updateTime = useCallback(() => {
    const time = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
    });
    setHour(time);
  }, []);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [updateTime]);

  // Abrir apps
  const handleAppOpen = useCallback((appId: AppId) => {
    switch (appId) {
      case "card":
        setShowCard(prev => !prev);
        break;
      case "lyrics":
        setOpenLyrics(prev => !prev);
        break;
      case "video":
      case "album":
      case "meeting":
      case "music":
        setActiveApp(appId);
        break;
      default:
        break;
    }
  }, []);

  const handleCloseApp = useCallback(() => {
    setActiveApp(null);
  }, []);

  const renderActiveApp = () => {
    switch (activeApp) {
      case "video":
        return <VideoPlayer />;
      case "album":
        return <Album />;
      case "meeting":
        return <MeetingCountdown />;
      case "music":
        return <MusicPlayer />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="phone"
        style={{
          backgroundImage: `url(${backCell.src})`,
        }}
      >
        {!activeApp && (
          <>
            {!openMenuMain && <div className="hora">{hour}</div>}

            {openMenuMain && (
              <>
                <h3
                  style={{
                    fontSize: 40,
                    color: "#fff",
                    marginTop: 30,
                    padding: 10,
                    backgroundColor: "#00000075",
                    borderRadius: 10,
                    width: "100%",
                    textAlign: "center",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  Apps
                </h3>

                <div className="menu">
                  {APPS.map((app) => {
                    const Icon = app.icon;
                    return (
                      <div className="item" key={app.id}>
                        <button
                          style={{ backgroundColor: app.color }}
                          onClick={() => handleAppOpen(app.id)}
                          aria-label={app.label}
                        >
                          <Icon size={30} />
                        </button>
                        <p>{app.label}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {!openMenuMain && (
              <span
                style={{
                  color: "#ffffff",
                  marginTop: "500px",
                  fontSize: "14px",
                }}
              >
                Click menu below to start
              </span>
            )}
          </>
        )}

        {activeApp && (
          <div className="action-page">
            <button
              onClick={handleCloseApp}
              className="close"
              aria-label="Close"
            >
              <X />
            </button>
            {renderActiveApp()}
          </div>
        )}

        <div className="actions">
          <button aria-label="Back">
            <ChevronLeft />
          </button>
          <button
            onClick={() => setOpenMenuMain((prev) => !prev)}
            aria-label="Home"
          >
            <Circle />
          </button>
          <button aria-label="Forward">
            <ChevronRight />
          </button>
        </div>
      </div>

      {showCard && <Card />}
      {openLyrics && <Lyrics setLyricsOpened={setOpenLyrics} />}
    </>
  );
};

export default Phone;
