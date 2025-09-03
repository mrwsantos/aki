import React, { useState, useEffect } from 'react';
import styles from "../styles/components/Main.module.scss";
import collage from "@/img/third-collage.jpg";


const DigitalClock = () => {
  const [targetDate, setTargetDate] = useState('2025-09-11');
  const [targetTime, setTargetTime] = useState('11:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration error by only showing time after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(`${targetDate}T${targetTime}`);
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFinished(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsFinished(false);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime, mounted]);

  const formatTimeDisplay = (days: number, hours: number, minutes: number, seconds: number) => {
    const d1 = Math.floor(days / 10);
    const d2 = days % 10;
    const h1 = Math.floor(hours / 10);
    const h2 = hours % 10;
    const m1 = Math.floor(minutes / 10);
    const m2 = minutes % 10;
    const s1 = Math.floor(seconds / 10);
    const s2 = seconds % 10;

    return { d1, d2, h1, h2, m1, m2, s1, s2 };
  };

  const getCurrentDateTime = () => {
    if (!mounted) return { date: '', time: '' };
    
    const now = new Date();
    // Convert to New Zealand timezone
    const nzTime = new Date(now.toLocaleString("en-US", {timeZone: "Pacific/Auckland"}));
    const date = nzTime.toLocaleDateString('ja-JP');
    const time = nzTime.toLocaleTimeString('ja-JP');
    return { date, time };
  };

  const displayTime = formatTimeDisplay(timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds);
  const currentDateTime = getCurrentDateTime();

  const DigitDisplay: React.FC<{ value: number; show?: boolean }> = ({ value, show = true }) => (
    <div style={{
      position: 'relative',
      width: '80px',
      height: '120px',
      opacity: show ? 1 : 0
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        {Array.from({ length: 7 }, (_, i) => (
          <span 
            key={i} 
            style={{
              position: 'absolute',
              backgroundColor: getSegmentClass(value, i + 1) ? '#eddf86' : '#1f2937',
              transition: 'all 0.3s ease',
              boxShadow: getSegmentClass(value, i + 1) ? '0 0 20px #eddf86' : 'none',
              ...getSegmentStyle(i + 1)
            }}
          />
        ))}
      </div>
    </div>
  );

  const getSegmentStyle = (segment: number) => {
    const styles: Record<number, React.CSSProperties> = {
      1: {
        top: '8px',
        left: '12px',
        width: '56px',
        height: '8px',
        clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
      },
      2: {
        top: '16px',
        right: '8px',
        width: '8px',
        height: '40px',
        clipPath: 'polygon(0% 0%, 100% 15%, 100% 85%, 0% 100%)'
      },
      3: {
        bottom: '16px',
        right: '8px',
        width: '8px',
        height: '40px',
        clipPath: 'polygon(0% 0%, 100% 15%, 100% 85%, 0% 100%)'
      },
      4: {
        bottom: '8px',
        left: '12px',
        width: '56px',
        height: '8px',
        clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)'
      },
      5: {
        bottom: '16px',
        left: '8px',
        width: '8px',
        height: '40px',
        clipPath: 'polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)'
      },
      6: {
        top: '16px',
        left: '8px',
        width: '8px',
        height: '40px',
        clipPath: 'polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)'
      },
      7: {
        top: '56px',
        left: '12px',
        width: '56px',
        height: '8px',
        clipPath: 'polygon(15% 0%, 85% 0%, 70% 100%, 30% 100%)'
      }
    };
    return styles[segment] || {};
  };

  const getSegmentClass = (digit: number, segment: number): boolean => {
    const segments: Record<number, number[]> = {
      0: [1, 2, 3, 4, 5, 6],
      1: [2, 3],
      2: [1, 2, 7, 5, 4],
      3: [1, 2, 7, 3, 4],
      4: [6, 7, 2, 3],
      5: [1, 6, 7, 3, 4],
      6: [1, 6, 5, 4, 3, 7],
      7: [1, 2, 3],
      8: [1, 2, 3, 4, 5, 6, 7],
      9: [1, 2, 3, 4, 6, 7]
    };
    return segments[digit]?.includes(segment) || false;
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(16px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '64rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Days */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>日</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
              </div>
            </div>
            <div style={{ fontSize: '4rem', color: '#4b5563' }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>時間</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
              </div>
            </div>
            <div style={{ fontSize: '4rem', color: '#4b5563' }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>分</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
              </div>
            </div>
            <div style={{ fontSize: '4rem', color: '#4b5563' }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>秒</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
                <div style={{ width: '80px', height: '128px', backgroundColor: '#1f2937', borderRadius: '0.5rem', opacity: 0.5 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative'
    }} >
 <img src={collage.src} alt="" style={{position: 'absolute', opacity: 0.05, width: '100%', height: '100%', objectFit: 'cover'}} />

      {/* Current Date/Time - Top Right */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        textAlign: 'right',
        zIndex: 10
      }}>
        <div style={{
          color: '#eddf86',
          fontSize: '1.125rem',
          fontFamily: 'monospace'
        }}>
          {currentDateTime.time}
        </div>
        <div style={{
          color: '#9ca3af',
          fontSize: '0.875rem'
        }}>
          {currentDateTime.date}
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '64rem',
        zIndex: 5,
        position: 'relative'
      }}>
        
        {/* Event Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            color: '#eddf86',
            fontSize: '3rem',
            fontWeight: 'bold',
            margin: 0,
            textShadow: '0 0 30px rgba(237, 223, 134, 0.5)',
            fontFamily: 'serif'
          }}>
            オークランドへようこそ、亜紀ちゃん！
          </h1>
        </div>

        {/* Digital Display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '2rem'
        }} className={styles.clockResponsive}>
          {/* Days */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              fontFamily: 'monospace'
            }}>日</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <DigitDisplay value={displayTime.d1} />
              <DigitDisplay value={displayTime.d2} />
            </div>
          </div>
          
          <div style={{
            fontSize: '4rem',
            color: '#eddf86',
            fontFamily: 'monospace',
            animation: 'pulse 2s infinite'
          }}>:</div>
          
          {/* Hours */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              fontFamily: 'monospace'
            }}>時間</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <DigitDisplay value={displayTime.h1} />
              <DigitDisplay value={displayTime.h2} />
            </div>
          </div>
          
          <div style={{
            fontSize: '4rem',
            color: '#eddf86',
            fontFamily: 'monospace',
            animation: 'pulse 2s infinite'
          }}>:</div>
          
          {/* Minutes */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              fontFamily: 'monospace'
            }}>分</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <DigitDisplay value={displayTime.m1} />
              <DigitDisplay value={displayTime.m2} />
            </div>
          </div>
          
          <div style={{
            fontSize: '4rem',
            color: '#eddf86',
            fontFamily: 'monospace',
            animation: 'pulse 2s infinite'
          }}>:</div>
          
          {/* Seconds */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              fontFamily: 'monospace'
            }}>秒</div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <DigitDisplay value={displayTime.s1} />
              <DigitDisplay value={displayTime.s2} />
            </div>
          </div>
        </div>

        {/* Status */}
        <div style={{ textAlign: 'center' }}>
          {isFinished ? (
            <div style={{
              color: '#f87171',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              animation: 'pulse 2s infinite'
            }}>
              時間切れ！
            </div>
          ) : (
            <div style={{
              color: '#9ca3af',
              fontSize: '1.125rem'
            }}>
              {new Date(`${targetDate}T${targetTime}`).toLocaleDateString('ja-JP')} {targetTime}までカウントダウン中
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalClock;