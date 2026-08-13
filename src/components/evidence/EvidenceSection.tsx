import { ShieldCheck, FileText, ArrowRight } from 'lucide-react'
import { evidenceItems, getReportSection, reportPageUrl } from '../../data/projectData'

export function EvidenceSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="evidence" className="py-20 px-4 md:px-8 relative grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="section-label">
            <ShieldCheck size={14} /> Evidence
          </span>
          <h2 className="section-title mt-2">Project Evidence</h2>
          <p className="text-slate-400 mt-3 max-w-3xl">
            Each evidence item shows what it proves, where it comes from in the report, and
            why it matters to the project. All references point to actual report sections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evidenceItems.map((item) => {
            const report = getReportSection(item.reportId)
            return (
              <div key={item.title} className="card-surface-hover p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-850 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={18} className="text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-300 mt-1.5">
                      <span className="text-cyan-400/80 font-mono">Proves:</span> {item.proves}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 font-mono">
                      {item.source} · p. {item.page}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      {report && (
                        <button
                          onClick={() => scrollTo('report')}
                          className="text-xs text-cyan-400/60 font-mono hover:text-cyan-300 transition-colors flex items-center gap-1"
                        >
                          <FileText size={11} /> Report — Section {report.number}
                        </button>
                      )}
                      <a
                        href={reportPageUrl(item.page)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 font-mono hover:text-cyan-300 transition-colors flex items-center gap-1"
                      >
                        <ArrowRight size={11} /> Open in PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
