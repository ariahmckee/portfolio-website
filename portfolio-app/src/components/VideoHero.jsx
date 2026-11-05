import { useEffect, useMemo, useState } from 'react'

export default function VideoHero({
  heading,
  description,
  sources = {},
  poster,
  className = '',
  contentClassName = '',
  mediaSide = 'left',
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200))

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()

    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      setVideoFailed(false)
    }
    handleResize()

    window.addEventListener('resize', handleResize)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference)
      return () => {
        mediaQuery.removeEventListener('change', updatePreference)
        window.removeEventListener('resize', handleResize)
      }
    }

    mediaQuery.addListener(updatePreference)
    return () => {
      mediaQuery.removeListener(updatePreference)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const selectedSource = useMemo(() => {
    if (viewportWidth >= 1200 && sources.desktop) return sources.desktop
    if (viewportWidth >= 700 && sources.standard) return sources.standard
    return sources.mobile || sources.standard || sources.desktop || ''
  }, [sources, viewportWidth])

  const renderVideo = !videoFailed && Boolean(selectedSource)

  const mediaPlacementClass = mediaSide === 'right' ? 'video-hero--media-right' : 'video-hero--media-left'

  return (
    <section className={`video-hero ${mediaPlacementClass} ${className}`.trim()}>
      <div className="video-hero__media" aria-hidden={renderVideo ? 'false' : 'true'}>
        {renderVideo ? (
          <video
            key={selectedSource}
            className="video-hero__video"
            src={selectedSource}
            type="video/webm"
            autoPlay={!prefersReducedMotion}
            muted
            loop={!prefersReducedMotion}
            playsInline
            preload="auto"
            poster={poster}
            onError={() => setVideoFailed(true)}
          />
        ) : poster ? (
          <img className="video-hero__poster" src={poster} alt={heading || 'Hero media'} />
        ) : null}
      </div>

      <div className={`video-hero__content ${contentClassName}`.trim()}>
        {heading ? <h2>{heading}</h2> : null}
        {description ? <p>{description}</p> : null}
      </div>
    </section>
  )
}
