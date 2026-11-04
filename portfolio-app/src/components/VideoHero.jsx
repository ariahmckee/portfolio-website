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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference)
      return () => mediaQuery.removeEventListener('change', updatePreference)
    }

    mediaQuery.addListener(updatePreference)
    return () => mediaQuery.removeListener(updatePreference)
  }, [])

  const fallbackSource = useMemo(
    () => sources.desktop || sources.standard || sources.mobile || '',
    [sources],
  )

  const renderVideo = !videoFailed && Boolean(fallbackSource)

  const mediaPlacementClass = mediaSide === 'right' ? 'video-hero--media-right' : 'video-hero--media-left'

  return (
    <section className={`video-hero ${mediaPlacementClass} ${className}`.trim()}>
      <div className="video-hero__media" aria-hidden={renderVideo ? 'false' : 'true'}>
        {renderVideo ? (
          <video
            className="video-hero__video"
            autoPlay={!prefersReducedMotion}
            muted
            loop={!prefersReducedMotion}
            playsInline
            poster={poster}
            onError={() => setVideoFailed(true)}
          >
            {sources.desktop ? <source src={sources.desktop} type="video/webm" media="(min-width: 1200px)" /> : null}
            {sources.standard ? <source src={sources.standard} type="video/webm" media="(min-width: 700px)" /> : null}
            {sources.mobile ? <source src={sources.mobile} type="video/webm" media="(max-width: 699px)" /> : null}
            <source src={fallbackSource} type="video/webm" />
          </video>
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
