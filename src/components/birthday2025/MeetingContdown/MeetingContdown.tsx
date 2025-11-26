import React, { useState, useEffect } from 'react'

const MeetingCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Data futura do evento (ajuste conforme necessário)
    const targetDate = new Date('2025-12-07T15:00:00+09:00') // Exemplo: 1 de dezembro de 2025, 15:00 no horário do Japão

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsFinished(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num:number) => String(num).padStart(2, '0')

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #1e3a8a, #581c87, #312e81)'
    }}>
      <div>
        {isFinished ? (
          <div style={{
            borderRadius: '24px',
            padding: '100px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '30px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>Event Finished!</h2>
          </div>
        ) : (
          <div style={{
            padding: '100px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '30px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '32px'
            }}>Next meeting in:</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              justifyContent: 'center'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                minWidth: '100px'
              }}>
                <div style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {formatNumber(timeLeft.days)}
                </div>
                <div style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#bfdbfe'
                }}>Days</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                minWidth: '100px'
              }}>
                <div style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {formatNumber(timeLeft.hours)}
                </div>
                <div style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#bfdbfe'
                }}>Hours</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                minWidth: '100px'
              }}>
                <div style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {formatNumber(timeLeft.minutes)}
                </div>
                <div style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#bfdbfe'
                }}>Minutes</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                minWidth: '100px'
              }}>
                <div style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '8px'
                }}>
                  {formatNumber(timeLeft.seconds)}
                </div>
                <div style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#bfdbfe'
                }}>Seconds</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingCountdown