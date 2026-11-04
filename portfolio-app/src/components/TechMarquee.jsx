import { useEffect, useRef } from 'react'

export default function TechMarquee({ items = [], className = '', animated = true }) {
  const trackRef = useRef(null)
  const marqueeRef = useRef(null)
  const firstSetRef = useRef(null)
  const offsetRef = useRef(0)
  const maxScrollRef = useRef(0)
  const animationFrameRef = useRef(0)
  const lastTimestampRef = useRef(0)
  const hoveringRef = useRef(false)

  useEffect(() => {
    if (!animated) return undefined

    const track = trackRef.current
    const firstSet = firstSetRef.current
    const marquee = marqueeRef.current
    if (!track || !firstSet || !marquee || items.length === 0) return undefined

    const updateLayout = () => {
      maxScrollRef.current = firstSet.offsetWidth
      if (maxScrollRef.current <= 0) return

      offsetRef.current = ((offsetRef.current % maxScrollRef.current) + maxScrollRef.current) % maxScrollRef.current
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    }

    const handleWheel = (event) => {
      if (!animated) return
      const targetTrack = trackRef.current
      if (!targetTrack) return

      if (event.cancelable) {
        event.preventDefault()
      }

      const maxScroll = maxScrollRef.current || targetTrack.scrollWidth / 2
      if (maxScroll <= 0) return

      const delta = event.deltaY * 0.35
      offsetRef.current += delta

      while (offsetRef.current < 0) offsetRef.current += maxScroll
      while (offsetRef.current >= maxScroll) offsetRef.current -= maxScroll

      targetTrack.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      lastTimestampRef.current = performance.now()
    }

    const animate = (timestamp) => {
      if (!hoveringRef.current && maxScrollRef.current > 0) {
        const dt = timestamp - (lastTimestampRef.current || timestamp)
        lastTimestampRef.current = timestamp
        offsetRef.current = (offsetRef.current + dt * 0.021) % maxScrollRef.current
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      } else {
        lastTimestampRef.current = timestamp
      }

      animationFrameRef.current = window.requestAnimationFrame(animate)
    }

    updateLayout()
    lastTimestampRef.current = performance.now()
    animationFrameRef.current = window.requestAnimationFrame(animate)
    window.addEventListener('resize', updateLayout)
    marquee.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', updateLayout)
      marquee.removeEventListener('wheel', handleWheel)
    }
  }, [animated, items])

  if (!animated) {
    return (
      <div className={`companies static-companies ${className}`.trim()}>
        <div className="static-track">
          {items.map((item) => (
            <a key={item.id} href={item.href || 'https://www.example.com'} aria-label={`${item.label || item.id} brand logo`}>
              <i className={item.icon} />
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={marqueeRef}
      className={`companies ${className}`.trim()}
      onMouseEnter={() => {
        hoveringRef.current = true
      }}
      onMouseLeave={() => {
        hoveringRef.current = false
      }}
    >
      <div className="scroll-track" ref={trackRef}>
        <div className="set" ref={firstSetRef}>
          {items.map((item) => (
            <a key={item.id} href={item.href || 'https://www.example.com'} aria-label={`${item.label || item.id} brand logo`}>
              <i className={item.icon} />
            </a>
          ))}
        </div>
        <div className="set" aria-hidden="true">
          {items.map((item) => (
            <a key={`${item.id}-duplicate`} href={item.href || 'https://www.example.com'} aria-label={`${item.label || item.id} brand logo`}>
              <i className={item.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
