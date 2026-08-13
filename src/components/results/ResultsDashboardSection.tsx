import { ChartBar as BarChart3, FileText } from 'lucide-react'
import { projectMetrics, projectParameters } from '../../data/projectData'

export function ResultsDashboardSection() {
  return (
    <section id="results" className="py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="section-label">
            <BarChart3 size={14} /> Results Dashboard
          </span>
          <h2 className="section-title mt-2">Engineering Results Dashboard</h2>
          <p className="text-slate-400 mt-3 max-w-3xl">
            Validated project metrics from the engineering report. Every value shown here is
            sourced directly from the report — no estimated or example numbers are used.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {projectMetrics.map((metric) => (
            <div key={metric.label} className="card-surface-hover p-5">
              <p className="stat-label mb-2">{metric.label}</p>
              <p className="stat-value">{metric.value}</p>
              <p className="text-sm text-slate-400 mt-2">{metric.detail}</p>
              <p className="text-xs text-slate-600 mt-2 font-mono flex items-center gap-1">
                <FileText size={11} /> {metric.reportSection} · p. {metric.reportPage}
              </p>
            </div>
          ))}
        </div>

        <div className="card-surface p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={18} className="text-cyan-400" />
            <h3 className="font-semibold text-white">Technical Parameters</h3>
            <span className="text-xs text-slate-500 font-mono ml-2">From report</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectParameters.map((p) => (
              <div
                key={p.label}
                className="p-4 rounded-lg bg-navy-850/50 border border-navy-700/40"
              >
                <p className="stat-label mb-1">{p.label}</p>
                <p className="text-xl font-bold font-mono text-cyan-300">{p.value}</p>
                <p className="text-xs text-slate-600 mt-1.5 font-mono">
                  {p.reportSection} · p. {p.page}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-navy-850/30 border border-navy-700/30">
          <p className="text-sm text-slate-500">
            <span className="text-cyan-400 font-mono">Source:</span> All values are sourced
            directly from the project's engineering report. Metrics not available in the report
            are not displayed here. To add additional validated data, update the centralized
            project data configuration.
          </p>
        </div>
      </div>
    </section>
  )
}
