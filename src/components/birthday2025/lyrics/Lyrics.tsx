import { X } from "lucide-react";
import React from "react";

interface LyricsProps {
  setLyricsOpened: (x: boolean) => void;
}

const Lyrics: React.FC<LyricsProps> = ({ setLyricsOpened }) => {
  return (
    <div className="lyrics">
      <button onClick={() => setLyricsOpened(false)} className="close">
        <X />
      </button>

      <h2>Things I Cannot Explain 🎵</h2>

      <div
        style={{
          fontSize: 18,
          lineHeight: 1.5,
          marginTop: 30,
        }}
      >
        <b>Verse 1:</b>
        <p>The moment I saw your face for the first time</p>
        <p>{"I couldn't imagine I'd wanna be with you all my life"}</p>

        <b>Chorus 1:</b>
        <p>Something happened since then</p>
        <p>You opened my heart in a way</p>
        <p>That I cannot explain</p>

        <b>Verse 2:</b>
        <p>{"You're the kind of girl that I thought I'd never find"}</p>
        <p>Not even this long distance could break us apart</p>

        <b>Chorus 2:</b>
        <p>{"I've been waiting for you"}</p>
        <p>My dark skies turned into blue</p>
        <p>And I cannot explain</p>

        <p style={{ margin: "20px 0" }}>🎵🎵🎵</p>

        <b>Bridge 1:</b>
        <p>{"I'll never gonna leave your side"}</p>
        <p>{"You'll never gonna be alone"}</p>
        <p>This love is within our bones</p>
        <p>I see myself in your eyes</p>

        <b>Bridge 2:</b>
        <p>I can see your smiling face</p>
        <p>I want you to feel amazed</p>
        <p>{"I'm in every part of you"}</p>
        <p>愛に心を賭ける</p>

        <b>Final:</b>
        <p>The moment our eyes first met</p>
        <p>I wish that I never forget</p>

        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            width: "100%",
            textAlign: "right",
          }}
        >
          Author: Willian Santos
        </p>
      </div>
    </div>
  );
};

export default Lyrics;
