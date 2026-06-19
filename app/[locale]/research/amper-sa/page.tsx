import { notFound } from 'next/navigation'
import { isValidLocale } from '@/i18n/config'

// ─── Data ─────────────────────────────────────────────────────────────────────

const HISTORICO = [
  { año: '2022', ventas: 337.5, ebitda: 11.0, margen: 3.3, dfn_ebitda: 9.8 },
  { año: '2023', ventas: 369.4, ebitda: 25.4, margen: 6.9, dfn_ebitda: 4.2 },
  { año: '2024', ventas: 419.5, ebitda: 35.2, margen: 8.4, dfn_ebitda: 3.1 },
  { año: '2025', ventas: 282.0, ebitda: 46.3, margen: 16.4, dfn_ebitda: 1.8 },
  { año: '2028E', ventas: 820, ebitda: 130, margen: 15.9, dfn_ebitda: null, guidance: true },
]

const ESCENARIOS = [
  {
    nombre: 'Conservador',
    ring: 'ring-amber-500/40',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400',
    ebitda: 90, multiplo: 8.0, dfn: 200, acciones: 100.1,
    precio: 5.19, precio_pre: 0.2076, potencial: -1.1,
    ev: 720, equity: 520,
    desc: 'Teltronic integra más lento de lo esperado. Márgenes por debajo del plan. Dilución adicional por pago de M&A en acciones. El mercado aplica descuento por riesgo de ejecución.',
    items: [
      'EBITDA 2028E: 90 M€ (vs guidance >130 M€)',
      'EV/EBITDA aplicado: 8x (descuento por riesgo)',
      'DFN 2028E: ~200 M€ (FCF generación lenta)',
      'Dilución: +10% acciones por M&A en papel',
    ],
  },
  {
    nombre: 'Base',
    ring: 'ring-sky-500/40',
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    dot: 'bg-sky-400',
    ebitda: 120, multiplo: 10.0, dfn: 140, acciones: 97.4,
    precio: 10.88, precio_pre: 0.4352, potencial: 107.2,
    ev: 1200, equity: 1060,
    desc: 'Teltronic bien integrado. Plan ejecutado ~90%. FCF generado reduce deuda. El mercado re-ratear hacia múltiplos industriales-defensa.',
    items: [
      'EBITDA 2028E: 120 M€ (~92% del guidance)',
      'EV/EBITDA aplicado: 10x (entre energía 11.3x y defensa 17.7x)',
      'DFN 2028E: ~140 M€',
      'Dilución: +7% acciones',
    ],
  },
  {
    nombre: 'Optimista',
    ring: 'ring-emerald-500/40',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
    ebitda: 140, multiplo: 13.0, dfn: 110, acciones: 94.7,
    precio: 18.06, precio_pre: 0.7224, potencial: 244.0,
    ev: 1820, equity: 1710,
    desc: 'Supera el guidance 2028. Defensa europea mantiene viento de cola. Rerate completo hacia peers. Offshore 2028 como catalizador adicional.',
    items: [
      'EBITDA 2028E: 140 M€ (supera guidance)',
      'EV/EBITDA aplicado: 13x (próximo a BAE 13.9x)',
      'DFN 2028E: ~110 M€ (generación FCF fuerte)',
      'Dilución mínima: +4% acciones',
    ],
  },
]

const COMPARABLES = [
  { empresa: 'Hensoldt AG', pais: 'DE', ev_ebitda: 25.5, tipo: 'peer' },
  { empresa: 'Media Defensa (CMD)', pais: '—', ev_ebitda: 17.7, tipo: 'benchmark' },
  { empresa: 'Indra Sistemas', pais: 'ES', ev_ebitda: 16.7, tipo: 'peer' },
  { empresa: 'Thales SA', pais: 'FR', ev_ebitda: 15.8, tipo: 'peer' },
  { empresa: 'BAE Systems', pais: 'UK', ev_ebitda: 13.9, tipo: 'peer' },
  { empresa: 'Media Energía (CMD)', pais: '—', ev_ebitda: 11.3, tipo: 'benchmark' },
  { empresa: 'Amper pre-Teltronic', pais: 'ES', ev_ebitda: 12.1, tipo: 'amper' },
  { empresa: 'Amper proforma (est.)', pais: 'ES', ev_ebitda: 10.5, tipo: 'amper' },
]

const RIESGOS = [
  { nivel: 'Alto', titulo: 'Dilución accionarial', desc: 'El pago en acciones para M&A puede diluir significativamente. Amper prevé pagar 20-30% de cada adquisición en acciones propias.' },
  { nivel: 'Alto', titulo: 'Integración Teltronic', desc: '225 M€ es una adquisición grande para una empresa de 478 M€ cap. Una integración lenta destruiría valor.' },
  { nivel: 'Alto', titulo: 'Dependencia contratos públicos', desc: 'Ciclos presupuestarios, retrasos en adjudicaciones y riesgo político en defensa.' },
  { nivel: 'Alto', titulo: 'Deuda post-M&A', desc: 'DFN podría superar 220 M€ si continúan las adquisiciones. DFN/EBITDA podría rebasar 3x en 2026.' },
  { nivel: 'Medio', titulo: 'Riesgo de ejecución del plan', desc: 'Objetivo 820 M€ ventas en 2028 implica un CAGR >43% desde 2025. Muy ambicioso.' },
  { nivel: 'Medio', titulo: 'Small cap y liquidez baja', desc: 'Volumen de negociación reducido. Difícil entrada/salida para inversores institucionales.' },
  { nivel: 'Medio', titulo: 'Historial bursátil', desc: 'Amper ha tenido históricamente credibilidad baja. El mercado puede aplicar un descuento estructural.' },
  { nivel: 'Bajo', titulo: 'Riesgo macro y tipos', desc: 'Subida de tipos encarece el servicio de la deuda. Inflación en cadena de suministro de defensa.' },
]

// ─── Sensitivity Matrix ────────────────────────────────────────────────────────

const EBITDA_ROWS = [80, 90, 100, 110, 120, 130, 140, 150]
const MULT_COLS   = [7, 8, 9, 10, 11, 12, 13, 14]
const SENS_DFN    = 140   // M€ base DFN 2028
const SENS_ACC    = 97.4  // M acciones post-split base

function sensPrice(ebitda: number, mult: number): number {
  return Math.max(0, (ebitda * mult - SENS_DFN) / SENS_ACC)
}

function cellColor(p: number): string {
  if (p < 5.25)  return 'bg-red-950/60 text-red-400'
  if (p < 8)     return 'bg-amber-950/60 text-amber-400'
  if (p < 13)    return 'bg-sky-950/60 text-sky-300'
  return 'bg-emerald-950/60 text-emerald-300'
}

function isScenario(ebitda: number, mult: number): string | null {
  if (ebitda === 90  && mult === 8)  return 'ring-1 ring-amber-400'
  if (ebitda === 120 && mult === 10) return 'ring-1 ring-sky-400'
  if (ebitda === 140 && mult === 13) return 'ring-1 ring-emerald-400'
  return null
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { params: { locale: string } }

export default function AmperPage({ params }: Props) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const maxEbitda = Math.max(...HISTORICO.map(d => d.ebitda))

  return (
    <main className="max-w-4xl mx-auto px-5 pt-28 pb-24 space-y-14">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70">
            // research · valoración
          </span>
          <span className="px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono">
            En progreso
          </span>
          <span className="px-2 py-0.5 rounded-full border border-border text-slate-500 text-xs font-mono">
            Junio 2026
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight mb-3">
          Amper S.A. <span className="text-slate-500 font-mono text-xl">BME: AMP</span>
        </h1>
        <p className="text-[#9AA7B8] text-base leading-relaxed max-w-2xl mb-4">
          Análisis de valoración EV/EBITDA de Amper S.A. en su transformación hacia
          defensa, comunicaciones críticas y energía. Plan Estratégico 2026–2028.
          Horizonte de valoración: 2028.
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {['Valoración', 'EV/EBITDA', 'Defensa', 'Small Cap', 'Python', 'CNMV'].map(t => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-border text-slate-500 text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4 flex gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">⚠</span>
          <p className="text-[#9AA7B8] text-xs leading-relaxed">
            Solo con fines académicos y analíticos. No constituye recomendación de inversión.
            Los datos provienen de fuentes públicas (CNMV, Amper IR, CMD abril 2026). Las proyecciones
            son estimaciones propias con supuestos explícitos. Invertir en bolsa implica riesgo de pérdida.
          </p>
        </div>
      </section>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-4">
          // datos de mercado · junio 2026
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Cap. bursátil', value: '~478 M€', sub: '2.276M acc × 0.21€', note: '' },
            { label: 'EV pre-Teltronic', value: '~560 M€', sub: 'cap + DFN 82.1 M€', note: '' },
            { label: 'EBITDA 2025A', value: '46.3 M€', sub: 'margen 16.4%', note: 'CMD 29/04/2026' },
            { label: 'DFN/EBITDA', value: '1.8x', sub: 'DFN dic-25: 82.1 M€', note: '' },
            { label: 'EV/EBITDA actual', value: '12.1x', sub: 'peers: 14–25x', note: 'pre-Teltronic' },
            { label: 'Cartera pedidos', value: '695 M€', sub: '+128% vs 2022', note: '' },
          ].map(kpi => (
            <div key={kpi.label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-[#9AA7B8] text-xs font-mono mb-1">{kpi.label}</p>
              <p className="text-[#F5F7FA] text-xl font-semibold tracking-tight">{kpi.value}</p>
              <p className="text-slate-600 text-xs mt-0.5">{kpi.sub}</p>
              {kpi.note && <p className="text-sky-500/60 text-xs mt-0.5 font-mono">{kpi.note}</p>}
            </div>
          ))}
        </div>

        {/* Contra-split notice */}
        <div className="mt-3 rounded-lg border border-sky-500/10 bg-sky-500/[0.03] p-3 flex gap-2 items-start">
          <span className="text-sky-400 text-xs shrink-0 font-mono mt-0.5">ℹ</span>
          <p className="text-[#9AA7B8] text-xs leading-relaxed">
            <span className="text-sky-300 font-medium">Contra-split 25:1 aprobado en AGM 30/06/2026.</span>
            {' '}2.276M acciones → 91M acciones. Precio: 0.21€ → ~5.25€ (misma capitalización).
            Los precios objetivo del análisis están en formato post contra-split.
          </p>
        </div>
      </section>

      {/* ── EBITDA Evolution ────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">
          // evolución ebitda
        </h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">
          EBITDA 2022–2025A vs Objetivo 2028
        </h3>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-end gap-3 h-44 mb-3">
            {HISTORICO.map(d => {
              const h = Math.round((d.ebitda / maxEbitda) * 100)
              const isTarget = d.guidance
              return (
                <div key={d.año} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className={`font-mono text-xs ${isTarget ? 'text-emerald-400' : 'text-sky-300'}`}>
                    {d.ebitda}
                  </span>
                  <div className="w-full flex items-end" style={{ height: '120px' }}>
                    <div
                      className={`w-full rounded-t transition-all ${
                        isTarget
                          ? 'bg-emerald-500/20 border border-emerald-500/30 border-dashed'
                          : 'bg-sky-500/25 border-t border-sky-500/40'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-slate-500">{d.año}</span>
                </div>
              )
            })}
          </div>

          {/* Margin evolution */}
          <div className="border-t border-border pt-4 mt-2">
            <p className="text-xs text-slate-500 font-mono mb-2">margen ebitda (%)</p>
            <div className="flex gap-3">
              {HISTORICO.map(d => (
                <div key={d.año} className="flex-1 text-center">
                  <span className={`font-mono text-xs ${
                    d.guidance ? 'text-emerald-400' : d.margen > 10 ? 'text-sky-300' : 'text-slate-500'
                  }`}>
                    {d.margen}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-600 text-xs mt-4 font-mono">
            Fuente: CMD Amper 29/04/2026. 2022–2024 incluyen Servicios Industriales (desinvertido 2025).
            2028E = guidance del plan estratégico.
          </p>
        </div>
      </section>

      {/* ── Sensitivity Table ───────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">
          // análisis de sensibilidad
        </h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">
          Precio por Acción (€) — EBITDA 2028E × EV/EBITDA
        </h3>
        <p className="text-[#9AA7B8] text-xs mb-5">
          Precio objetivo post contra-split (÷25 para pre-split). Supuestos fijos: DFN 2028 base = 140 M€ · Acciones = 97.4M post-split.
          Las celdas marcadas corresponden a los escenarios del análisis.
        </p>

        <div className="rounded-xl border border-border bg-surface overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-slate-500 font-medium w-24">
                  EBITDA↓ / EV×→
                </th>
                {MULT_COLS.map(m => (
                  <th key={m} className="p-2.5 text-center text-slate-400 font-medium border-l border-border/50">
                    {m}x
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EBITDA_ROWS.map((ebitda, ri) => (
                <tr key={ebitda} className={`border-b border-border/40 ${ri % 2 === 0 ? '' : 'bg-white/[0.015]'}`}>
                  <td className="p-3 text-slate-400 font-medium border-r border-border/50">
                    {ebitda} M€
                  </td>
                  {MULT_COLS.map(mult => {
                    const p = sensPrice(ebitda, mult)
                    const scenario = isScenario(ebitda, mult)
                    return (
                      <td
                        key={mult}
                        className={`p-2 text-center border-l border-border/30 ${cellColor(p)} ${
                          scenario ? scenario + ' relative' : ''
                        }`}
                      >
                        <span className="font-medium">
                          {p.toFixed(2)}€
                        </span>
                        {scenario && (
                          <span className="absolute -top-1.5 -right-1 text-[9px] leading-none">
                            {ebitda === 90 ? '🔶' : ebitda === 120 ? '🔵' : '🟢'}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-3">
          {[
            { color: 'bg-red-950/60', text: 'text-red-400', label: '< 5.25€ (precio actual)', range: '' },
            { color: 'bg-amber-950/60', text: 'text-amber-400', label: '5.25€ – 8€', range: '' },
            { color: 'bg-sky-950/60', text: 'text-sky-300', label: '8€ – 13€', range: '' },
            { color: 'bg-emerald-950/60', text: 'text-emerald-300', label: '> 13€', range: '' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-sm ${l.color} border border-white/5`} />
              <span className={`text-xs font-mono ${l.text}`}>{l.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
            <span className="text-xs font-mono text-amber-400">🔶 Conservador</span>
            <span className="text-xs font-mono text-sky-400">🔵 Base</span>
            <span className="text-xs font-mono text-emerald-400">🟢 Optimista</span>
          </div>
        </div>
      </section>

      {/* ── Comparables ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">
          // comparables ev/ebitda
        </h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">
          Posicionamiento vs. Peers
        </h3>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          {COMPARABLES.map((c, i) => {
            const isAmper = c.tipo === 'amper'
            const isBench = c.tipo === 'benchmark'
            const maxVal = 27
            const pct = Math.round((c.ev_ebitda / maxVal) * 100)
            return (
              <div
                key={c.empresa}
                className={`flex items-center gap-4 px-5 py-3 ${
                  i < COMPARABLES.length - 1 ? 'border-b border-border/50' : ''
                } ${isAmper ? 'bg-sky-500/[0.03]' : ''}`}
              >
                <div className="w-52 shrink-0">
                  <span className={`text-sm font-medium ${isAmper ? 'text-sky-300' : 'text-[#F5F7FA]'}`}>
                    {c.empresa}
                  </span>
                  <div className="flex gap-1.5 mt-0.5">
                    <span className="font-mono text-xs text-slate-600">{c.pais}</span>
                    {isBench && (
                      <span className="text-xs text-slate-600 font-mono">· Bloomberg CMD</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isAmper ? 'bg-sky-500' : isBench ? 'bg-slate-600' : 'bg-sky-400/50'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={`font-mono text-sm font-semibold w-14 text-right ${
                    isAmper ? 'text-sky-300' : isBench ? 'text-slate-400' : 'text-[#F5F7FA]'
                  }`}>
                    {c.ev_ebitda.toFixed(1)}x
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-slate-600 text-xs mt-2 font-mono">
          Fuentes: valueinvesting.io, investing.com, multiples.vc, CMD Amper (Bloomberg abr-26).
          Leonardo SpA y SAAB AB pendientes de verificar.
        </p>
      </section>

      {/* ── Scenarios ───────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">
          // escenarios de valoración · horizonte 2028
        </h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">
          Precio Objetivo por Escenario
        </h3>
        <p className="text-[#9AA7B8] text-xs mb-5">
          Precios en formato post contra-split (÷25 para equivalente pre-split).
          Cada escenario incorpora supuestos propios de DFN y dilución.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {ESCENARIOS.map(sc => (
            <div
              key={sc.nombre}
              className={`rounded-xl border border-border bg-surface p-5 ring-1 ${sc.ring}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${sc.badge}`}>
                  {sc.nombre}
                </span>
                <span className={`font-mono text-xs ${sc.potencial < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {sc.potencial > 0 ? '+' : ''}{sc.potencial}%
                </span>
              </div>

              <div className="mb-4">
                <p className="text-[#9AA7B8] text-xs font-mono mb-0.5">Precio objetivo</p>
                <p className="text-[#F5F7FA] text-3xl font-bold tracking-tight">{sc.precio.toFixed(2)}€</p>
                <p className="text-slate-600 text-xs font-mono">{sc.precio_pre.toFixed(4)}€ pre-split</p>
              </div>

              <div className="space-y-1 mb-4">
                {[
                  { k: 'EBITDA 2028E', v: `${sc.ebitda} M€` },
                  { k: 'EV/EBITDA', v: `${sc.multiplo}x` },
                  { k: 'EV implícito', v: `${sc.ev} M€` },
                  { k: 'DFN est. 2028', v: `${sc.dfn} M€` },
                  { k: 'Equity Value', v: `${sc.equity} M€` },
                ].map(row => (
                  <div key={row.k} className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs font-mono">{row.k}</span>
                    <span className="text-[#9AA7B8] text-xs font-mono">{row.v}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/50 pt-3">
                <p className="text-[#9AA7B8] text-xs leading-relaxed">{sc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Risks ───────────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">
          // riesgos principales
        </h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">
          Lo que puede salir mal
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {RIESGOS.map(r => {
            const nivel = r.nivel === 'Alto'
              ? 'text-red-400 bg-red-950/50 border-red-900/50'
              : r.nivel === 'Medio'
              ? 'text-amber-400 bg-amber-950/50 border-amber-900/50'
              : 'text-slate-400 bg-surface-2 border-border'
            return (
              <div key={r.titulo} className="rounded-xl border border-border bg-surface p-4 flex gap-3">
                <div className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border h-fit ${nivel}`}>
                  {r.nivel}
                </div>
                <div>
                  <p className="text-[#F5F7FA] text-sm font-medium mb-1">{r.titulo}</p>
                  <p className="text-[#9AA7B8] text-xs leading-relaxed">{r.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Methodology ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">
          // metodología y limitaciones
        </h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-4">
          Supuestos y Datos Pendientes
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h4 className="text-[#F5F7FA] text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-sky-400">⊕</span> Metodología
            </h4>
            <ul className="space-y-2">
              {[
                'Valoración por EV/EBITDA (no DCF — empresa en transformación)',
                'Tres escenarios con supuestos explícitos',
                'Tabla de sensibilidad EBITDA × múltiplo',
                'Comparables: peers europeos de defensa y energía',
                'Horizonte de valoración: 2028 (fin del plan estratégico)',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-sky-500 text-xs mt-0.5 shrink-0">→</span>
                  <span className="text-[#9AA7B8] text-xs leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h4 className="text-[#F5F7FA] text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-amber-400">⚠</span> Datos Pendientes
            </h4>
            <ul className="space-y-2">
              {[
                'Deuda post-Teltronic confirmada → resultados H1 2026 (sep-26)',
                'Precios históricos dic 2023/2024/2025 → BME manual',
                'EV/EBITDA Leonardo SpA y SAAB → Koyfin / MarketScreener',
                'Caja, deuda bruta, capex histórico 2022-24 → CNMV PDF',
              ].map(item => (
                <li key={item} className="flex gap-2">
                  <span className="text-amber-500 text-xs mt-0.5 shrink-0">○</span>
                  <span className="text-[#9AA7B8] text-xs leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Sources ─────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-border bg-surface p-5">
        <h4 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-3">
          // fuentes de datos
        </h4>
        <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            ['CNMV', 'Cuentas anuales, hechos relevantes', 'cnmv.es'],
            ['Amper IR · CMD abr-26', 'EBITDA, DFN, cartera, plan 2026-28', 'grupoamper.com'],
            ['Amper IR · Capital', 'Nº acciones, capital social', 'grupoamper.com'],
            ['Bolsamania / Investing.com', 'Precio acción, capitalización', 'jun-26'],
            ['valueinvesting.io', 'EV/EBITDA Hensoldt', 'mar-26'],
            ['investing.com', 'EV/EBITDA Indra LTM', 'jun-26'],
            ['multiples.vc', 'EV/EBITDA Thales, BAE Systems', 'mar-26'],
          ].map(([src, desc, date]) => (
            <div key={src} className="flex gap-2">
              <span className="text-sky-400/60 shrink-0">·</span>
              <div>
                <span className="text-[#9AA7B8]">{src}</span>
                <span className="text-slate-600 ml-2">{desc} · {date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
