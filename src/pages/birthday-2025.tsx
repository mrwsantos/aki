import React, { useState } from "react";
import { Gift, Cake, Heart, PhoneCall, Smartphone, X } from "lucide-react";
import Phone from "@/components/cellphone/Phone";

const Birthday2025 = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [phoneOpened, setPhoneOpened] = useState(false);

  // const menuItems = [
  //   { icon: Gift, action: () => setShowCard(!showCard), angle: -60, label: 'Card' },
  //   { icon: Cake, action: () => setShowMessage(!showMessage), angle: 0, label: 'Message' },
  //   { icon: Heart, action: () => setShowPhotos(!showPhotos), angle: 60, label: 'Photos' }
  // ];

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {phoneOpened && <Phone />}

      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      >
        <source type="video/mp4" src="/aki-birthday-2025.mp4" />
      </video>

      <button className="btn-phone" onClick={()=> setPhoneOpened(prev => !prev)}>
         {phoneOpened ? <><X />Leave Phone</> : <><Smartphone />Grab Phone</>}
      </button>
    </div>
  );
};

export default Birthday2025;
