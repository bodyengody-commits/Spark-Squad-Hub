import { ArrowRight, ImageOff } from 'lucide-react'
import { projectAssets } from '../../data/projectData'

export function BeforeAfterSection() {
  const before = projectAssets.find((a) => a.label === 'Original / before heatmap')
  const after = projectAssets.find((a) => a.label === 'Optimized / after heatmap')

  const renderHeatmap = (
    asset: typeof before,
    label: string,
    accent: 'cyan' | 'gold',
  ) => {
    const accentColor = accent === 'cyan' ? 'cyan' : 'gold'
    return (
      <div className="card-surface p-5 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2 h-2 rounded-full bg-${accentColor}-400`} />
          <h3 className="font-semibold text-white">{label}</h3>
        </div>

        {asset?.path ? (
          <div className="rounded-lg overflow-hidden border border-navy-700/50">
            <img src={asset.path} alt={asset.label} className="w-full h-auto" />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-navy-600 bg-navy-950/50 aspect-video flex flex-col items-center justify-center p-6 text-center">
            <ImageOff size={32} className="text-slate-600 mb-3" />
            <p className="text-sm text-slate-500 font-mono">Awaiting validated project data</p>
            <p className="text-xs text-slate-600 mt-1">{asset?.description}</p>
          </div>
        )}

        <p className="text-xs text-slate-600 mt-3 font-mono">{asset?.reportSection}</p>
      </div>
    )
  }

  return (
    <section id="before-after" className="py-20 px-4 md:px-8 relative grid-bg">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <span className="section-label">
            <ArrowRight size={14} /> Before → After Optimization
          </span>
          <h2 className="section-title mt-2">Before → After Optimization</h2>
          <p className="text-slate-400 mt-3 max-w-3xl">
            A side-by-side comparison of signal coverage before and after the optimization
            process. When real heatmaps are added to the project data configuration, they
            will appear here automatically.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {renderHeatmap(before, 'Before Optimization', 'cyan')}
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-navy-850 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <ArrowRight size={20} className="text-cyan-400 rotate-90 md:rotate-0" />
            </div>
          </div>
          {renderHeatmap(after, 'After Optimization', 'gold')}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-navy-850/30 border border-navy-700/30">
          <p className="text-sm text-slate-500">
            <span className="text-gold-400 font-mono">Note:</span> Heatmap placeholders are
            shown because validated project heatmap assets have not yet been added to the
            centralized data configuration. The UI is ready to display them as soon as the
            real assets are provided.
          </p>
        </div>
      </div>
    </section>
  )
}
