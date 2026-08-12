import { useState, useRef, useEffect, useCallback } from 'react'
import { Gamepad2, ExternalLink, Maximize, Minimize, RotateCw, Link2, Trash2, Loader as Loader2, TriangleAlert as AlertTriangle, Check, Gamepad } from 'lucide-react'

const STORAGE_KEY = 'sch_simulator_url'

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

export function SimulatorSection() {
  const [simUrl, setSimUrl] = useState<string | null>(null)
  const [inputUrl, setInputUrl] = useState('')
  const [inputError, setInputError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && isValidUrl(saved)) {
        setSimUrl(saved)
      } else {
        setShowUrlInput(true)
      }
    } catch {
      setShowUrlInput(true)
    }
  }, [])

  useEffect(() => {
    if (simUrl) {
      localStorage.setItem(STORAGE_KEY, simUrl)
    }
  }, [simUrl])

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const handleLoadSimulator = useCallback(() => {
    const trimmed = inputUrl.trim()
    if (!trimmed) {
      setInputError('Please enter a URL.')
      return
    }
    if (!isValidUrl(trimmed)) {
      setInputError('Enter a valid http:// or https:// URL.')
      return
    }
    setInputError('')
    setLoading(true)
    setLoadError(false)
    setSimUrl(trimmed)
    setShowUrlInput(false)

    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current)
    loadTimeoutRef.current = setTimeout(() => {
      setLoading(false)
      setLoadError(true)
    }, 12000)
  }, [inputUrl])

  const handleIframeLoad = useCallback(() => {
    setLoading(false)
    setLoadError(false)
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current)
      loadTimeoutRef.current = null
    }
  }, [])

  const handleReload = useCallback(() => {
    if (iframeRef.current) {
      setLoading(true)
      setLoadError(false)
      iframeRef.current.src = iframeRef.current.src
    }
  }, [])

  const handleChangeUrl = useCallback(() => {
    setShowUrlInput(true)
    setInputUrl(simUrl || '')
    setInputError('')
  }, [simUrl])

  const handleClearUrl = useCallback(() => {
    if (confirm('Remove the simulator URL? You can add a new one later.')) {
      setSimUrl(null)
      setInputUrl('')
      setInputError('')
      setShowUrlInput(true)
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    }
  }, [])

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  return (
    <section id="simulation" className="py-20 px-4 md:px-8 relative grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="section-label">
            <Gamepad2 size={14} /> Interactive Simulation
          </span>
          <h2 className="section-title mt-2">Explore the Simulation</h2>
          <p className="text-slate-400 mt-3 max-w-3xl">
            This is the interactive game built to explain the RF coverage problem. Enter the public
            URL of the simulator below to embed it directly in the hub — visitors can play without
            leaving this page.
          </p>
        </div>

        {showUrlInput && (
          <div className="card-surface p-6 mb-6">
            <label className="block text-sm font-mono uppercase tracking-wider text-cyan-400/80 mb-3">
              Game URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLoadSimulator()}
                placeholder="https://your-simulator-url.com"
                className="input-field flex-1"
                autoFocus
              />
              <button onClick={handleLoadSimulator} className="btn-primary whitespace-nowrap">
                <Gamepad size={18} /> Load Simulator
              </button>
            </div>
            {inputError && (
              <p className="text-sm text-red-400 mt-2 flex items-center gap-1.5">
                <AlertTriangle size={14} /> {inputError}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-3">
              The URL must allow iframe embedding. Some sites block embedding via security headers —
              if that happens, an "Open Simulator" button will appear instead.
            </p>
          </div>
        )}

        {simUrl && !showUrlInput && (
          <div className="card-surface overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-navy-700/50 bg-navy-850/50">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                <span className="text-sm text-slate-400 font-mono truncate">{simUrl}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={handleReload} className="btn-ghost" title="Reload Simulator">
                  <RotateCw size={16} />
                </button>
                <button onClick={handleFullscreen} className="btn-ghost" title="Fullscreen">
                  {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
                <a
                  href={simUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  title="Open in New Tab"
                >
                  <ExternalLink size={16} />
                </a>
                <button onClick={handleChangeUrl} className="btn-ghost" title="Change URL">
                  <Link2 size={16} />
                </button>
                <button onClick={handleClearUrl} className="btn-ghost hover:text-red-400" title="Clear URL">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div
              ref={containerRef}
              className="relative w-full bg-navy-950"
              style={{ height: isFullscreen ? '100vh' : '60vh', minHeight: '400px' }}
            >
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-navy-950/90">
                  <Loader2 size={40} className="text-cyan-400 animate-spin mb-4" />
                  <p className="text-slate-400 font-mono text-sm">Loading simulator...</p>
                </div>
              )}

              {loadError && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-navy-950/95 p-8 text-center">
                  <AlertTriangle size={40} className="text-gold-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    Simulator Could Not Be Embedded
                  </h3>
                  <p className="text-slate-400 max-w-md mb-6">
                    This site may block iframe embedding for security reasons. You can still open
                    the simulator in a new tab.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={simUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <ExternalLink size={18} /> Open Simulator
                    </a>
                    <button onClick={handleReload} className="btn-secondary">
                      <RotateCw size={16} /> Try Again
                    </button>
                  </div>
                </div>
              )}

              {!loadError && (
                <iframe
                  ref={iframeRef}
                  src={simUrl}
                  onLoad={handleIframeLoad}
                  className="w-full h-full border-0"
                  title="Signal Coverage Simulator"
                  allow="fullscreen; autoplay; gamepad"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        )}

        {!simUrl && !showUrlInput && (
          <div className="card-surface p-12 text-center">
            <Gamepad2 size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">Enter a simulator URL above to embed it here.</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: Check, label: 'URL Validation' },
            { icon: RotateCw, label: 'Reload Button' },
            { icon: Maximize, label: 'Fullscreen Mode' },
            { icon: ExternalLink, label: 'New Tab Fallback' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2 text-sm text-slate-400">
              <f.icon size={16} className="text-cyan-400/60" />
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
