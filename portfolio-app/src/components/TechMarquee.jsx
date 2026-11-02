import { useEffect, useRef } from 'react'

export default function TechMarquee({ items = [], className = '' }) {
  const trackRef = useRef(null)
  const firstSetRef = useRef(null)
  const offsetRef = useRef(0)
  const maxScrollRef = useRef(0)
  const animationFrameRef = useRef(0)
  const lastTimestampRef = useRef(0)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const firstSet = firstSetRef.current
    if (!track || !firstSet || items.length === 0) return undefined

    const updateLayout = () => {
      maxScrollRef.current = firstSet.offsetWidth
      if (maxScrollRef.current <= 0) return

      offsetRef.current = ((offsetRef.current % maxScrollRef.current) + maxScrollRef.current) % maxScrollRef.current
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
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

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', updateLayout)
    }
  }, [items])

  const handleWheel = (event) => {
    const track = trackRef.current
    if (!track) return

    event.preventDefault()
    const maxScroll = maxScrollRef.current || track.scrollWidth / 2
    if (maxScroll <= 0) return

    const delta = event.deltaY * 0.35
    offsetRef.current += delta

    while (offsetRef.current < 0) offsetRef.current += maxScroll
    while (offsetRef.current >= maxScroll) offsetRef.current -= maxScroll

    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
    lastTimestampRef.current = performance.now()
  }

  return (
    <div
      className={`companies ${className}`.trim()}
      onMouseEnter={() => {
        hoveringRef.current = true
      }}
      onMouseLeave={() => {
        hoveringRef.current = false
      }}
      onWheel={handleWheel}
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
