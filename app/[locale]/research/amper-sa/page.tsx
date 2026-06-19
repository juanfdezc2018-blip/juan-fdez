import { notFound } from 'next/navigation'
import { isValidLocale } from '@/i18n/config'

// ─── Static Data ──────────────────────────────────────────────────────────────

const HISTORICO = [
  { año: '2022', ventas: 337.5, ebitda: 11.0,  margen: 3.3,  dfn_ebitda: 9.8  },
  { año: '2023', ventas: 369.4, ebitda: 25.4,  margen: 6.9,  dfn_ebitda: 4.2  },
  { año: '2024', ventas: 419.5, ebitda: 35.2,  margen: 8.4,  dfn_ebitda: 3.1  },
  { año: '2025', ventas: 282.0, ebitda: 46.3,  margen: 16.4, dfn_ebitda: 1.8  },
  { año: '2028E', ventas: 820,  ebitda: 130,   margen: 15.9, dfn_ebitda: null, guidance: true },
]

const ESCENARIOS = [
  {
    nombre: 'Conservador',
    ring: 'ring-amber-500/30', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    ebitda: 90, multiplo: '6x–8x',
    rango_post: { low: 4.5, high: 6.0 },
    rango_pre:  { low: 0.18, high: 0.24 },
    potencial:  { low: -14, high: +14 },
    desc: 'Teltronic se integra más lento de lo previsto. El EBITDA mejora, pero no alcanza plenamente el plan. El mercado mantiene descuento por historial bursátil, baja liquidez y riesgo de dilución.',
    items: ['EBITDA 2028E: ~90 M€ (vs guidance >130 M€)', 'EV/EBITDA: 6x–8x (descuento por riesgo)', 'DFN 2028E: ~200 M€ (FCF generación lenta)', 'Dilución: +10% acciones'],
  },
  {
    nombre: 'Base',
    ring: 'ring-sky-500/30', badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    ebitda: 120, multiplo: '8x–11x',
    rango_post: { low: 8.5, high: 12.0 },
    rango_pre:  { low: 0.34, high: 0.48 },
    potencial:  { low: +62, high: +129 },
    desc: 'Amper ejecuta gran parte del plan, integra Teltronic sin destruir margen y reduce deuda con generación de caja. El mercado empieza a valorar la compañía como plataforma industrial de defensa, telecom y energía.',
    items: ['EBITDA 2028E: ~120 M€ (~92% del guidance)', 'EV/EBITDA: 8x–11x (entre energía y defensa)', 'DFN 2028E: ~140 M€', 'Dilución: +7% acciones'],
  },
  {
    nombre: 'Optimista',
    ring: 'ring-emerald-500/30', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ebitda: 140, multiplo: '11x–13x',
    rango_post: { low: 14.0, high: 18.5 },
    rango_pre:  { low: 0.56, high: 0.74 },
    potencial:  { low: +167, high: +252 },
    desc: 'La compañía supera guidance, mejora márgenes, convierte cartera en ventas y reduce deuda. Defensa europea mantiene viento de cola y el mercado aplica múltiplos más cercanos a peers.',
    items: ['EBITDA 2028E: ~140 M€ (supera guidance)', 'EV/EBITDA: 11x–13x (próximo a BAE 13.9x)', 'DFN 2028E: ~110 M€ (FCF fuerte)', 'Dilución: +4% acciones'],
  },
]

const COMPARABLES = [
  { empresa: 'Hensoldt AG',           pais: 'DE', ev_ebitda: 25.5, tipo: 'peer',      fuente: 'valueinvesting.io mar-26' },
  { empresa: 'Media Defensa (CMD)',    pais: '—',  ev_ebitda: 17.7, tipo: 'benchmark', fuente: 'Bloomberg CMD abr-26' },
  { empresa: 'Indra Sistemas',         pais: 'ES', ev_ebitda: 16.7, tipo: 'peer',      fuente: 'investing.com LTM jun-26' },
  { empresa: 'Thales SA',              pais: 'FR', ev_ebitda: 15.8, tipo: 'peer',      fuente: 'multiples.vc mar-26' },
  { empresa: 'SAAB AB',                pais: 'SE', ev_ebitda: 25.1, tipo: 'peer',      fuente: 'MarketScreener [⚠ cross-check]' },
  { empresa: 'BAE Systems',            pais: 'UK', ev_ebitda: 13.9, tipo: 'peer',      fuente: 'multiples.vc oct-25' },
  { empresa: 'Leonardo S.p.A.',        pais: 'IT', ev_ebitda: 12.1, tipo: 'peer',      fuente: 'MarketScreener [⚠ cross-check]' },
  { empresa: 'Media Energía (CMD)',    pais: '—',  ev_ebitda: 11.3, tipo: 'benchmark', fuente: 'Bloomberg CMD abr-26' },
  { empresa: 'Amper pre-Teltronic',   pais: 'ES', ev_ebitda: 12.1, tipo: 'amper',     fuente: 'Calculado cap 478M€ + DFN 82M€' },
  { empresa: 'Amper proforma (est.)', pais: 'ES', ev_ebitda: 10.5, tipo: 'amper',     fuente: 'Estimado DFN +138M€ Teltronic' },
]

const CATALIZADORES = [
  { titulo: 'Resultados H1 2026',           impacto: 'Alto',  sesgo: 'Mixto',    que_mirar: 'EBITDA real vs guidance, deuda post-Teltronic, caja operativa' },
  { titulo: 'Integración Teltronic',         impacto: 'Alto',  sesgo: 'Positivo', que_mirar: 'EBITDA incremental Teltronic, sinergias, costes de integración' },
  { titulo: 'Evolución deuda neta',          impacto: 'Alto',  sesgo: 'Mixto',    que_mirar: 'DFN/EBITDA post-adquisiciones, si se mantiene <3x' },
  { titulo: 'Riesgo dilución M&A',           impacto: 'Alto',  sesgo: 'Negativo', que_mirar: '% de adquisiciones pagadas en acciones, nuevas ampliaciones' },
  { titulo: 'Conversión cartera → ventas',  impacto: 'Medio', sesgo: 'Positivo', que_mirar: 'Book-to-bill, cartera 2026 vs 695 M€ cierre 2025' },
  { titulo: 'Nuevos contratos defensa/telecom', impacto: 'Medio', sesgo: 'Positivo', que_mirar: 'Contratos marcos, PERTE Aeronáutica, comunicaciones críticas' },
  { titulo: 'Confirmación/revisión guidance 2028', impacto: 'Medio', sesgo: 'Mixto', que_mirar: '¿Mantiene >130 M€ EBITDA? ¿Revisa a la baja?' },
  { titulo: 'Liquidez post contra-split',   impacto: 'Bajo',  sesgo: 'Positivo', que_mirar: 'Volumen negociación tras AGM 30/06/2026, entrada fondos' },
]

const TESIS = {
  descuenta: [
    'Transformación operativa 2022–2025',
    'Teltronic como adquisición estratégica',
    'Mayor exposición a defensa/telecom',
    'Mejora del EBITDA desde 11 M€ a 46 M€',
  ],
  no_descuenta: [
    'Escala si ejecuta el plan completo 2028',
    'Rerate hacia múltiplos industriales-defensa',
    'Cartera de pedidos elevada (695 M€)',
    'Mejora de márgenes si la integración funciona',
  ],
  rompe: [
    'Dilución accionarial excesiva por M&A',
    'Deuda post-adquisiciones fuera de control',
    'Integración lenta o costosa de Teltronic',
    'Retrasos en contratos públicos / presupuestos',
    'Baja generación de caja operativa',
  ],
  cambia: [
    'EBITDA real 2026 vs guidance',
    'Deuda neta post-Teltronic confirmada',
    'Caja operativa en H1/H2 2026',
    'Nuevos contratos y cartera fin de año',
    'Revisión del plan estratégico 2028',
  ],
}

// ─── Business Map ─────────────────────────────────────────────────────────────

const SEGMENTOS = [
  {
    id: 'defensa', icono: '⬡', titulo: 'Defensa y Seguridad Nacional',
    color: { card: 'border-sky-500/25 bg-sky-500/[0.04]', accent: 'text-sky-400', chip: 'bg-sky-500/10 border-sky-500/20 text-sky-400/90' },
    desc: 'Sistemas de comunicaciones, integración de soluciones y tecnologías duales civil-militar para defensa y seguridad nacional.',
    subcaps: ['Comunicaciones militares', 'Integración sistemas defensa', 'Seguridad nacional', 'Tecnologías duales', 'C-UAS / antidron ¹', 'SIGINT ¹'],
    ingresos: ['Contratos públicos', 'Programas defensa largo plazo', 'Integración de sistemas', 'Mantenimiento y soporte'],
    que_mirar: ['Nuevos contratos adjudicados', 'Presupuesto defensa europeo', 'Conversión cartera pedidos', 'Margen EBITDA por segmento'],
    riesgos: ['Ciclos presupuestarios', 'Retrasos en adjudicaciones', 'Riesgo político', 'Concentración de clientes'],
  },
  {
    id: 'telecom', icono: '◈', titulo: 'Comunicaciones Críticas',
    color: { card: 'border-violet-500/25 bg-violet-500/[0.04]', accent: 'text-violet-400', chip: 'bg-violet-500/10 border-violet-500/20 text-violet-400/90' },
    desc: 'Redes para entornos de misión crítica: defensa, emergencias, transporte y seguridad pública. Teltronic refuerza este bloque significativamente.',
    nota: 'Teltronic — anunciada mayo 2026 · hasta 225 M€ · sujeta a integración',
    subcaps: ['Redes privadas profesionales', 'Misión crítica / TETRA', 'Emergencias y seguridad pública', 'Soluciones defensa/telecom', 'Internacionalización ¹'],
    ingresos: ['Venta de sistemas', 'Integración de redes', 'Servicios recurrentes', 'Mantenimiento y soporte', 'Contratos internacionales'],
    que_mirar: ['Avance integración Teltronic', 'EBITDA incremental', 'Sinergias comerciales', 'Nuevos contratos internacionales'],
    riesgos: ['Precio elevado vs cap actual', 'Integración operativa', 'Deuda asumida', 'Pago en acciones / dilución'],
  },
  {
    id: 'energia', icono: '⊗', titulo: 'Energía y Sostenibilidad',
    color: { card: 'border-emerald-500/25 bg-emerald-500/[0.04]', accent: 'text-emerald-400', chip: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400/90' },
    desc: 'Electrónica de potencia, sistemas eléctricos industriales y energía naval. Elinsa aporta capacidades estratégicas en este segmento.',
    nota: 'Elinsa — integrada · electrónica de potencia y energía naval/industrial',
    subcaps: ['Electrónica de potencia', 'Almacenamiento energético', 'Sistemas eléctricos industriales', 'Energía naval e industrial', 'Eólica marina ¹', 'Agua e industria ¹'],
    ingresos: ['Fabricación de equipos', 'Contratos industriales', 'Proyectos llave en mano', 'Ingeniería y mantenimiento'],
    que_mirar: ['Contratos marco', 'Capex requerido', 'Margen industrial', 'Conversión de pedidos'],
    riesgos: ['Capex elevado', 'Presión en márgenes', 'Ciclos industriales', 'Ejecución proyectos complejos'],
  },
  {
    id: 'ma', icono: '⊕', titulo: 'M&A / Perímetro en expansión',
    color: { card: 'border-amber-500/25 bg-amber-500/[0.04]', accent: 'text-amber-400', chip: 'bg-amber-500/10 border-amber-500/20 text-amber-400/90' },
    desc: 'El plan contempla 3–5 adquisiciones adicionales. El M&A es el principal acelerador del EBITDA 2028, pero también el principal riesgo por deuda, dilución e integración.',
    nota: 'Opcionalidad M&A — futuras compras no incluidas en el modelo base · nombres y precios sin confirmar',
    subcaps: ['Teltronic (anunciada)', 'Elinsa (integrada)', '3–5 compras previstas', 'Defensa / seguridad', 'Comunicaciones', 'Energía / almacenamiento'],
    ingresos: ['Ampliación de ventas', 'Aumento de EBITDA', 'Nuevas capacidades tecnológicas', 'Acceso a nuevos mercados'],
    que_mirar: ['Anuncios de nuevas compras', '% pagado en acciones', 'Deuda asumida', 'EBITDA adquirido', 'Calendario integración'],
    riesgos: ['Dilución accionarial', 'Endeudamiento excesivo', 'Integraciones fallidas', 'Comprar caro en ciclo alto', 'Destrucción de valor'],
  },
]

const VISIBILIDAD: Array<{ item: string; conf: boolean; prob: boolean; pend: boolean }> = [
  { item: 'EBITDA 2025A',               conf: true,  prob: false, pend: false },
  { item: 'Cartera pedidos actual',      conf: true,  prob: false, pend: false },
  { item: 'Adquisición Teltronic',       conf: true,  prob: false, pend: false },
  { item: 'Integración Teltronic',       conf: false, prob: true,  pend: false },
  { item: 'Elinsa (integrada)',          conf: true,  prob: false, pend: false },
  { item: 'EBITDA proforma Teltronic',   conf: false, prob: true,  pend: false },
  { item: 'Deuda post-M&A',             conf: false, prob: false, pend: true  },
  { item: 'Futuras adquisiciones',       conf: false, prob: false, pend: true  },
  { item: 'Dilución futura',             conf: false, prob: false, pend: true  },
  { item: 'Guidance 2028',              conf: false, prob: true,  pend: false },
  { item: 'Sinergias Teltronic',         conf: false, prob: false, pend: true  },
  { item: 'FCF libre 2026–2028',         conf: false, prob: false, pend: true  },
]

// ─── Sensitivity Matrix ────────────────────────────────────────────────────────

const EBITDA_ROWS = [80, 90, 100, 110, 120, 130, 140, 150]
const MULT_COLS   = [7, 8, 9, 10, 11, 12, 13, 14]
const SENS_DFN    = 140
const SENS_ACC    = 97.4

function sensPrice(ebitda: number, mult: number) {
  return Math.max(0, (ebitda * mult - SENS_DFN) / SENS_ACC)
}

function cellColor(p: number) {
  if (p < 5.25) return 'bg-red-950/50 text-red-400/80'
  if (p < 8)    return 'bg-amber-950/50 text-amber-400/90'
  if (p < 13)   return 'bg-sky-950/50 text-sky-300'
  return 'bg-emerald-950/50 text-emerald-300'
}

function scenarioMark(ebitda: number, mult: number) {
  if (ebitda === 90  && mult === 8)  return 'ring-1 ring-amber-400/60'
  if (ebitda === 120 && mult === 10) return 'ring-1 ring-sky-400/60'
  if (ebitda === 140 && mult === 13) return 'ring-1 ring-emerald-400/60'
  return null
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props { params: { locale: string } }

export default function AmperPage({ params }: Props) {
  if (!isValidLocale(params.locale)) notFound()

  const maxEbitda = Math.max(...HISTORICO.map(d => d.ebitda))

  return (
    <main className="max-w-4xl mx-auto px-5 pt-28 pb-24 space-y-16">

      {/* ── Header ── */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70">// research · valoración</span>
          <span className="px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-mono">En progreso</span>
          <span className="px-2 py-0.5 rounded-full border border-border text-slate-500 text-xs font-mono">Junio 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight mb-3">
          Amper S.A. <span className="text-slate-500 font-mono text-xl">BME: AMP</span>
        </h1>
        <p className="text-[#9AA7B8] text-base leading-relaxed max-w-2xl mb-5">
          Análisis EV/EBITDA de Amper S.A. en su transformación hacia defensa, comunicaciones críticas
          y energía. Incluye valoración táctica 2026–2027, escenarios 2028 por rangos y catalizadores a seguir.
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {['Valoración', 'EV/EBITDA', 'Defensa', 'Small Cap', 'Python', 'CNMV'].map(t => (
            <span key={t} className="px-2 py-0.5 rounded bg-white/[0.04] border border-border text-slate-500 text-xs">{t}</span>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-4 flex gap-3">
          <span className="text-amber-400 text-sm mt-0.5 shrink-0">⚠</span>
          <p className="text-[#9AA7B8] text-xs leading-relaxed">
            <span className="text-amber-300 font-medium">No es una recomendación de inversión.</span>{' '}
            Es un modelo de escenarios sujeto a alta incertidumbre. Los datos pendientes pueden cambiar
            de forma material la valoración. Solo con fines académicos y analíticos.
          </p>
        </div>
      </section>

      {/* ── KPI Cards ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-4">// datos de mercado · junio 2026</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {[
            { label: 'Cap. bursátil',    value: '~478 M€',  sub: '2.276M acc × 0.21€' },
            { label: 'EV pre-Teltronic', value: '~560 M€',  sub: 'cap + DFN 82.1 M€' },
            { label: 'EBITDA 2025A',     value: '46.3 M€',  sub: 'margen 16.4% · CMD abr-26' },
            { label: 'DFN / EBITDA',     value: '1.8x',     sub: 'DFN dic-25: 82.1 M€' },
            { label: 'EV/EBITDA actual', value: '12.1x',    sub: 'vs peers 14–25x · pre-Teltronic' },
            { label: 'Cartera pedidos',  value: '695 M€',   sub: '+128% vs 2022' },
          ].map(k => (
            <div key={k.label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-[#9AA7B8] text-xs font-mono mb-1">{k.label}</p>
              <p className="text-[#F5F7FA] text-xl font-semibold tracking-tight">{k.value}</p>
              <p className="text-slate-600 text-xs mt-0.5">{k.sub}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-sky-500/10 bg-sky-500/[0.03] p-3 flex gap-2 items-start">
          <span className="text-sky-400 text-xs shrink-0 font-mono mt-0.5">ℹ</span>
          <p className="text-[#9AA7B8] text-xs leading-relaxed">
            <span className="text-sky-300 font-medium">Contra-split 25:1 aprobado en AGM 30/06/2026.</span>{' '}
            2.276M acciones → 91M acciones. Precio: 0.21€ → ~5.25€ (misma capitalización).
            Los precios objetivo están expresados en formato post contra-split.
          </p>
        </div>
      </section>

      {/* ── EBITDA Evolution ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// evolución ebitda</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">EBITDA 2022–2025A vs Objetivo 2028</h3>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-end gap-3 mb-3" style={{ height: '160px' }}>
            {HISTORICO.map(d => {
              const h = Math.round((d.ebitda / maxEbitda) * 100)
              return (
                <div key={d.año} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className={`font-mono text-xs ${d.guidance ? 'text-emerald-400' : 'text-sky-300'}`}>{d.ebitda}</span>
                  <div
                    className={`w-full rounded-t ${d.guidance
                      ? 'bg-emerald-500/15 border border-emerald-500/25 border-dashed'
                      : 'bg-sky-500/20 border-t border-sky-500/35'}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="font-mono text-xs text-slate-500">{d.año}</span>
                </div>
              )
            })}
          </div>
          <div className="border-t border-border pt-3 flex gap-3">
            {HISTORICO.map(d => (
              <div key={d.año} className="flex-1 text-center">
                <span className={`font-mono text-xs ${d.guidance ? 'text-emerald-400' : d.margen > 10 ? 'text-sky-300' : 'text-slate-500'}`}>
                  {d.margen}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-[10px] font-mono mt-3">
            Fuente: CMD Amper 29/04/2026. 2022–2024 incluyen Servicios Industriales (desinvertido 2025). 2028E = guidance plan estratégico.
          </p>
        </div>
      </section>

      {/* ── Business Map ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// business map</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">Amper como plataforma industrial: capacidades, verticales y opcionalidad M&A</h3>
        <p className="text-[#9AA7B8] text-sm leading-relaxed mb-6 max-w-2xl">
          Amper no es una sola empresa. Es un grupo que intenta construir una plataforma industrial-tecnológica a través de adquisiciones y desarrollo interno.
          Este mapa muestra qué hay dentro, qué está confirmado y qué sigue siendo tesis.
        </p>

        {/* Hub card */}
        <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.03] p-5 mb-4">
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-sky-400 text-base">◉</span>
                <span className="text-[#F5F7FA] font-semibold text-base">Grupo Amper</span>
                <span className="font-mono text-xs text-slate-500 ml-1">BME: AMP</span>
              </div>
              <p className="text-[#9AA7B8] text-xs leading-relaxed">
                Holding industrial-tecnológico cotizado en BME. Plan estratégico 2026–2028: escala vía M&A en defensa, comunicaciones críticas y energía.
                EBITDA objetivo: ≥130 M€ en 2028. Cap actual ~478 M€.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {['Defensa', 'Com. Críticas', 'Energía', 'M&A'].map((v, i) => (
                <span key={v} className={`px-2.5 py-1 rounded-full border text-xs font-mono ${
                  i === 0 ? 'border-sky-500/30 bg-sky-500/10 text-sky-400' :
                  i === 1 ? 'border-violet-500/30 bg-violet-500/10 text-violet-400' :
                  i === 2 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                  'border-amber-500/30 bg-amber-500/10 text-amber-400'
                }`}>{v}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Ventas 2025A', val: '282 M€' },
              { label: 'EBITDA 2025A', val: '46.3 M€' },
              { label: 'Cartera pedidos', val: '695 M€' },
              { label: 'Objetivo EBITDA 2028', val: '≥130 M€' },
            ].map(kpi => (
              <div key={kpi.label} className="rounded-lg border border-border/60 bg-surface-2/60 p-3">
                <div className="text-[10px] font-mono text-slate-500 mb-0.5 uppercase tracking-wide">{kpi.label}</div>
                <div className="text-[#F5F7FA] font-semibold text-sm font-mono">{kpi.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual connector */}
        <div className="flex justify-center my-1">
          <div className="w-px h-6 bg-border/50" />
        </div>

        {/* Segment cards 2×2 */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {SEGMENTOS.map(seg => (
            <div key={seg.id} className={`rounded-xl border ${seg.color.card} p-5`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-mono ${seg.color.accent} text-base`}>{seg.icono}</span>
                <h4 className={`${seg.color.accent} text-xs font-mono font-semibold uppercase tracking-wide`}>{seg.titulo}</h4>
              </div>
              <p className="text-[#9AA7B8] text-xs leading-relaxed mb-3">{seg.desc}</p>
              {'nota' in seg && (
                <div className={`rounded border ${seg.color.card} border-opacity-60 px-2.5 py-1.5 mb-3`}>
                  <span className={`${seg.color.accent} text-[10px] font-mono`}>↳ {seg.nota}</span>
                </div>
              )}

              <div className="mb-3">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1.5">Subcapacidades</div>
                <div className="flex flex-wrap gap-1">
                  {seg.subcaps.map(s => (
                    <span key={s} className={`px-2 py-0.5 rounded border text-[10px] font-mono ${seg.color.chip}`}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1">Modelo de ingresos</div>
                  <ul className="space-y-0.5">
                    {seg.ingresos.map(i => (
                      <li key={i} className="flex gap-1.5 items-start">
                        <span className={`${seg.color.accent} opacity-50 shrink-0 mt-0.5 text-[10px]`}>·</span>
                        <span className="text-[#9AA7B8] text-[11px]">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1">Qué mirar</div>
                    <ul className="space-y-0.5">
                      {seg.que_mirar.map(q => (
                        <li key={q} className="flex gap-1.5 items-start">
                          <span className="text-sky-400/40 shrink-0 mt-0.5 text-[10px]">→</span>
                          <span className="text-[#9AA7B8] text-[11px]">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1">Riesgos</div>
                    <ul className="space-y-0.5">
                      {seg.riesgos.map(r => (
                        <li key={r} className="flex gap-1.5 items-start">
                          <span className="text-red-400/40 shrink-0 mt-0.5 text-[10px]">!</span>
                          <span className="text-[#9AA7B8] text-[11px]">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value creation pipeline */}
        <div className="rounded-xl border border-border bg-surface p-5 mb-4">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-3">Pipeline de creación de valor</div>
          <div className="flex flex-wrap items-center gap-1 mb-3">
            {[
              { label: 'Cartera', sub: '695 M€', color: 'border-sky-500/30 bg-sky-500/[0.06] text-sky-400' },
              { label: 'Ventas', sub: '→ 820 M€', color: 'border-sky-400/25 bg-sky-400/[0.04] text-sky-300' },
              { label: 'EBITDA', sub: '→ ≥130 M€', color: 'border-violet-500/30 bg-violet-500/[0.06] text-violet-400' },
              { label: 'Deuda / Dilución', sub: 'Riesgo', color: 'border-amber-500/30 bg-amber-500/[0.06] text-amber-400' },
              { label: 'Equity Value', sub: '?', color: 'border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-400' },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-1">
                <div className={`rounded-lg border ${step.color} px-3 py-2`}>
                  <div className="text-[11px] font-mono font-semibold">{step.label}</div>
                  <div className="text-[10px] opacity-70">{step.sub}</div>
                </div>
                {i < arr.length - 1 && <span className="text-slate-600 text-xs font-mono">→</span>}
              </div>
            ))}
          </div>
          <p className="text-[#9AA7B8] text-[11px] leading-relaxed">
            La cartera de pedidos es el punto de partida. Convertirla en ventas, luego en EBITDA, y controlar cuánto de ese EBITDA queda para el accionista
            después de deuda e intereses y dilución por M&A: ese es el recorrido completo de la tesis.
          </p>
        </div>

        {/* Visibility matrix */}
        <div className="rounded-xl border border-border bg-surface overflow-x-auto mb-4">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Matriz de visibilidad — qué está confirmado y qué no</span>
          </div>
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left p-3 text-slate-400 font-medium text-[11px]">Elemento</th>
                <th className="p-3 text-center text-emerald-400 font-medium text-[11px] border-l border-border/40">✓ Confirmado</th>
                <th className="p-3 text-center text-sky-400 font-medium text-[11px] border-l border-border/40">~ Probable</th>
                <th className="p-3 text-center text-amber-400 font-medium text-[11px] border-l border-border/40">? Pendiente</th>
              </tr>
            </thead>
            <tbody>
              {VISIBILIDAD.map((row, i) => (
                <tr key={row.item} className={`border-b border-border/30 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                  <td className="p-3 text-[#9AA7B8] text-[11px]">{row.item}</td>
                  <td className="p-3 text-center border-l border-border/40">
                    {row.conf && <span className="inline-block w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] leading-4">✓</span>}
                  </td>
                  <td className="p-3 text-center border-l border-border/40">
                    {row.prob && <span className="inline-block w-4 h-4 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-400 text-[10px] leading-4">~</span>}
                  </td>
                  <td className="p-3 text-center border-l border-border/40">
                    {row.pend && <span className="inline-block w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] leading-4">?</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes + footnote */}
        <div className="space-y-2 mb-4">
          <div className="rounded-lg border border-border/40 bg-surface-2/40 px-4 py-2.5">
            <p className="text-[#9AA7B8] text-[11px] leading-relaxed">
              <span className="text-slate-400 font-mono">Nota metodológica:</span> Los segmentos de ingresos y subcapacidades se basan en fuentes oficiales Amper IR y CMD 29/04/2026.
              Las capacidades marcadas con ¹ son áreas mencionadas en el plan estratégico pero sin ingresos verificados en cuentas anuales.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.03] px-4 py-2.5">
            <p className="text-[#9AA7B8] text-[11px] leading-relaxed">
              <span className="text-amber-400 font-mono">¹ Pendiente de verificación en fuentes oficiales.</span>{' '}
              Las futuras adquisiciones previstas en el plan no tienen nombres confirmados ni precios. El EBITDA de Teltronic (~20 M€) es estimación proforma.
              La deuda post-M&A consolidada dependerá del número de operaciones, el mix cash/acciones y la generación de caja 2026–2028.
            </p>
          </div>
        </div>

        {/* Lectura rápida del mapa */}
        <div className="rounded-xl border border-border bg-surface-2/30 p-5">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-3">Lectura rápida del mapa</div>
          <ul className="space-y-2">
            {[
              'Defensa y Comunicaciones Críticas son los segmentos con mayor viento de cola y mejores márgenes potenciales.',
              'Teltronic es la adquisición más relevante: refuerza Comunicaciones Críticas, pero el precio (~225 M€) implica riesgo de deuda y dilución.',
              'Energía/Elinsa aporta diversificación, pero los márgenes industriales son más ajustados y el capex puede ser elevado.',
              'El M&A es el motor del plan 2028. Si las adquisiciones son caras o se pagan en acciones, el valor por acción puede no crecer aunque el EBITDA sí lo haga.',
              'El riesgo no es que Amper no crezca. El riesgo es que crezca destruyendo valor para el accionista actual.',
            ].map((point, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <span className="font-mono text-sky-400/60 text-xs shrink-0 mt-0.5">{i + 1}.</span>
                <span className="text-[#9AA7B8] text-xs leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Lectura rápida de la tesis ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// lectura de la tesis</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">Qué está en precio y qué no</h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              icon: '✓', title: 'Ya descuenta', color: 'border-sky-500/20 bg-sky-500/[0.03]', tc: 'text-sky-400',
              items: TESIS.descuenta,
            },
            {
              icon: '○', title: 'Aún no descuenta del todo', color: 'border-emerald-500/20 bg-emerald-500/[0.03]', tc: 'text-emerald-400',
              items: TESIS.no_descuenta,
            },
            {
              icon: '✗', title: 'Puede romper la tesis', color: 'border-red-500/20 bg-red-500/[0.03]', tc: 'text-red-400',
              items: TESIS.rompe,
            },
            {
              icon: '→', title: 'Qué dato cambia la historia', color: 'border-amber-500/20 bg-amber-500/[0.03]', tc: 'text-amber-400',
              items: TESIS.cambia,
            },
          ].map(col => (
            <div key={col.title} className={`rounded-xl border ${col.color} p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`${col.tc} font-mono text-sm`}>{col.icon}</span>
                <h4 className={`${col.tc} text-xs font-mono font-semibold uppercase tracking-wide`}>{col.title}</h4>
              </div>
              <ul className="space-y-1.5">
                {col.items.map(item => (
                  <li key={item} className="flex gap-2">
                    <span className={`${col.tc} text-xs shrink-0 mt-0.5 opacity-60`}>·</span>
                    <span className="text-[#9AA7B8] text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Valoración puente 2026-2027 ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// valoración táctica</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">Puente: del precio actual al plan 2028</h3>
        <p className="text-[#9AA7B8] text-sm leading-relaxed mb-5 max-w-2xl">
          El mercado no va a valorar Amper como si el plan 2028 ya estuviera ejecutado. El rerating
          será progresivo y dependerá de resultados, caja, deuda e integración de Teltronic.
          La tabla muestra los EV implícitos bajo distintos niveles de EBITDA 2026–2027 y múltiplos razonables.
        </p>

        <div className="rounded-xl border border-border bg-surface overflow-x-auto mb-4">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3.5 text-slate-500 font-medium">EBITDA 2026/27E</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">9x</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">10x</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">11x</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">12x</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Bajo · 50 M€',  ebitda: 50 },
                { label: 'Medio · 60 M€', ebitda: 60 },
                { label: 'Alto · 65 M€',  ebitda: 65 },
              ].map((row, ri) => (
                <tr key={row.label} className={`border-b border-border/40 ${ri % 2 !== 0 ? 'bg-white/[0.015]' : ''}`}>
                  <td className="p-3.5 text-[#9AA7B8] font-medium border-r border-border/50">{row.label}</td>
                  {[9, 10, 11, 12].map(m => {
                    const ev = row.ebitda * m
                    return (
                      <td key={m} className="p-3 text-center border-l border-border/30 text-[#9AA7B8]">
                        <span className="text-[#F5F7FA] font-medium">{ev} M€</span>
                        <span className="text-slate-600 block text-[10px] mt-0.5">EV → restar DFN</span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-border bg-surface-2 p-4 text-xs text-[#9AA7B8] leading-relaxed space-y-1">
          <p><span className="text-sky-400 font-mono">→ Lectura:</span> Con EBITDA 60 M€ y un 10x, el EV implícito sería ~600 M€. Restando DFN estimada post-Teltronic (~220 M€), el equity value sería ~380 M€ y el precio por acción ~4.2€ post contra-split.</p>
          <p><span className="text-slate-500 font-mono">→ Nota:</span> No es un precio objetivo. Es una aproximación para entender dónde puede estar el mercado en 2026–2027 antes de que exista evidencia de ejecución del plan completo.</p>
        </div>
      </section>

      {/* ── Sensitivity Table ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// análisis de sensibilidad · 2028</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">Precio por Acción — EBITDA 2028E × EV/EBITDA</h3>

        <div className="rounded-lg border border-amber-500/15 bg-amber-500/[0.025] p-3.5 mb-5 flex gap-2.5">
          <span className="text-amber-400 text-xs shrink-0 font-mono mt-0.5">⚠</span>
          <p className="text-[#9AA7B8] text-xs leading-relaxed">
            Esta tabla no predice precios. Muestra cuánto valdría la acción bajo distintas
            combinaciones de EBITDA 2028 y múltiplo EV/EBITDA. El mercado probablemente no aplicará
            estos valores hasta que exista evidencia de ejecución, reducción de deuda y menor riesgo
            de dilución. Supuestos fijos: DFN base 2028 = 140 M€ · Acciones = 97.4M post contra-split.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-slate-500 font-medium w-24">EBITDA↓ / EV×→</th>
                {MULT_COLS.map(m => (
                  <th key={m} className="p-2.5 text-center text-slate-400 font-medium border-l border-border/50">{m}x</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EBITDA_ROWS.map((ebitda, ri) => (
                <tr key={ebitda} className={`border-b border-border/40 ${ri % 2 !== 0 ? 'bg-white/[0.015]' : ''}`}>
                  <td className="p-3 text-slate-400 font-medium border-r border-border/50">{ebitda} M€</td>
                  {MULT_COLS.map(mult => {
                    const p = sensPrice(ebitda, mult)
                    const mark = scenarioMark(ebitda, mult)
                    return (
                      <td key={mult} className={`p-2 text-center border-l border-border/30 ${cellColor(p)} ${mark ?? ''}`}>
                        {p.toFixed(1)}€
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
          {[
            { bg: 'bg-red-950/50', tc: 'text-red-400/80', label: '< 5.25€ precio actual' },
            { bg: 'bg-amber-950/50', tc: 'text-amber-400/90', label: '5.25€ – 8€' },
            { bg: 'bg-sky-950/50', tc: 'text-sky-300', label: '8€ – 13€' },
            { bg: 'bg-emerald-950/50', tc: 'text-emerald-300', label: '> 13€' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded-sm ${l.bg}`} />
              <span className={`text-xs font-mono ${l.tc}`}>{l.label}</span>
            </div>
          ))}
          <span className="text-xs font-mono text-slate-600 ml-1">· Celdas marcadas = escenarios del análisis</span>
        </div>
      </section>

      {/* ── Comparables ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// comparables ev/ebitda</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">Posicionamiento vs. Peers Europeos</h3>
        <p className="text-[#9AA7B8] text-xs mb-5 leading-relaxed">
          Leonardo y SAAB son referencias europeas, pero no son comparables perfectos: mucho más grandes, líquidas
          e institucionales. Sus múltiplos no deben aplicarse directamente a Amper.
          Los marcados con ⚠ requieren verificación cruzada con Koyfin antes de publicar.
        </p>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          {COMPARABLES.map((c, i) => {
            const isAmper = c.tipo === 'amper'
            const isBench = c.tipo === 'benchmark'
            const pct = Math.round((c.ev_ebitda / 28) * 100)
            return (
              <div key={c.empresa} className={`flex items-center gap-4 px-5 py-3 ${i < COMPARABLES.length - 1 ? 'border-b border-border/40' : ''} ${isAmper ? 'bg-sky-500/[0.03]' : ''}`}>
                <div className="w-52 shrink-0">
                  <span className={`text-sm font-medium ${isAmper ? 'text-sky-300' : 'text-[#F5F7FA]'}`}>{c.empresa}</span>
                  <p className="text-slate-600 text-[10px] font-mono mt-0.5">{c.pais} · {c.fuente}</p>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${isAmper ? 'bg-sky-500' : isBench ? 'bg-slate-600' : 'bg-sky-400/40'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className={`font-mono text-sm font-semibold w-14 text-right ${isAmper ? 'text-sky-300' : isBench ? 'text-slate-400' : 'text-[#F5F7FA]'}`}>
                    {c.ev_ebitda.toFixed(1)}x
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Consenso Analistas ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// consenso de analistas · junio 2026</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">¿A cuánto debería estar la acción según los analistas?</h3>
        <p className="text-[#9AA7B8] text-sm leading-relaxed mb-5 max-w-2xl">
          A día de hoy, el consenso es reducido (3 analistas) pero unánime en compra.
          Renta 4 es el broker de referencia en el valor — su metodología es DCF 2026/30 y <span className="text-amber-400/80 font-mono text-xs">no incluye operaciones corporativas adicionales</span>.
          Eso significa que el precio objetivo de 0,24 € es <em>sin ejecutar el plan completo de M&A</em>.
        </p>

        {/* Main consensus table */}
        <div className="rounded-xl border border-border bg-surface overflow-x-auto mb-4">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3.5 text-slate-500 font-medium">Fuente</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">Recomendación</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">P.O. pre-split</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">P.O. post-split ×25</th>
                <th className="p-3 text-center text-slate-400 font-medium border-l border-border/50">Upside vs ~0,21 €</th>
                <th className="p-3 text-left text-slate-400 font-medium border-l border-border/50">Metodología / Nota</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  fuente: 'Renta 4 (Iván San Félix)', rec: 'Sobreponderar', rec_color: 'text-emerald-400',
                  po_pre: '0,24 €', po_post: '6,00 €', upside: '+14%', upside_color: 'text-sky-400',
                  nota: 'DCF 2026/30e · no incluye M&A adicional · ingresos -15% vs guía, EBITDA -1% vs guía · margen 16,9% en 2028', fecha: '6 mayo 2026',
                },
                {
                  fuente: 'Consenso Investing (3 analistas)', rec: 'Strong Buy', rec_color: 'text-emerald-400',
                  po_pre: '0,2367 €', po_post: '5,92 €', upside: '+13%', upside_color: 'text-sky-400',
                  nota: 'Rango: 0,22–0,25 € · precio actual en Investing: ~0,1978 € · muestra pequeña', fecha: 'jun. 2026',
                },
              ].map(row => (
                <tr key={row.fuente} className="border-b border-border/30">
                  <td className="p-3.5 text-[#9AA7B8]">
                    <div>{row.fuente}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5">{row.fecha}</div>
                  </td>
                  <td className={`p-3 text-center border-l border-border/40 font-semibold ${row.rec_color}`}>{row.rec}</td>
                  <td className="p-3 text-center border-l border-border/40 text-[#F5F7FA] font-semibold">{row.po_pre}</td>
                  <td className="p-3 text-center border-l border-border/40 text-sky-300 font-semibold">{row.po_post}</td>
                  <td className={`p-3 text-center border-l border-border/40 font-semibold ${row.upside_color}`}>{row.upside}</td>
                  <td className="p-3 border-l border-border/40 text-[#9AA7B8] text-[10px] leading-relaxed max-w-xs">{row.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interpretation boxes */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.03] p-4">
            <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wide mb-2">Qué implica el P.O. de Renta 4</div>
            <ul className="space-y-1.5">
              {[
                'Cap implícita: 0,24 × 2.276M acc = ~547 M€',
                'EV implícito (pre-Teltronic): ~547 + 82 = 629 M€',
                'EV/EBITDA 2025 implícito: 629 / 46,3 = 13,6x',
                'Sin operaciones corporativas adicionales',
                'Upside limitado desde precio actual (+14%)',
              ].map(p => (
                <li key={p} className="flex gap-1.5 items-start">
                  <span className="text-sky-400/50 text-[10px] shrink-0 mt-0.5">·</span>
                  <span className="text-[#9AA7B8] text-[11px]">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-4">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wide mb-2">Limitaciones del consenso</div>
            <ul className="space-y-1.5">
              {[
                'Solo 3 analistas: muestra estadísticamente pequeña',
                'Renta 4 no modela el impacto de Teltronic ni M&A futuro',
                'El P.O. no refleja el plan 2028 completo',
                'Si el plan se ejecuta, el P.O. quedaría obsoleto rápido',
                'La acción ya cotiza cerca del objetivo actual',
              ].map(p => (
                <li key={p} className="flex gap-1.5 items-start">
                  <span className="text-amber-400/50 text-[10px] shrink-0 mt-0.5">!</span>
                  <span className="text-[#9AA7B8] text-[11px]">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Context vs our scenarios */}
        <div className="rounded-xl border border-border bg-surface-2/40 p-4">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-3">Contexto: consenso analistas vs escenarios de este análisis</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: 'Precio actual', val: '~0,21 €', sub: '5,25 € post-split', color: 'text-slate-400' },
              { label: 'Renta 4 P.O.', val: '0,24 €', sub: '6,00 € post-split', color: 'text-sky-400' },
              { label: 'Escenario base', val: '0,34–0,48 €', sub: '8,5–12 € post-split', color: 'text-sky-400' },
              { label: 'Escenario optimista', val: '0,56–0,74 €', sub: '14–18,5 € post-split', color: 'text-emerald-400' },
            ].map(item => (
              <div key={item.label} className="rounded-lg border border-border/60 bg-surface/60 p-3">
                <div className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-wide">{item.label}</div>
                <div className={`font-semibold text-sm font-mono ${item.color}`}>{item.val}</div>
                <div className="text-[10px] text-slate-600 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-[#9AA7B8] text-[11px] leading-relaxed mt-3">
            El P.O. de Renta 4 (0,24 €) está justo en la parte baja del escenario conservador de este análisis. Tiene sentido: no modela el upside del M&A completo.
            Los escenarios base y optimista asumen ejecución del plan 2028 e integración de Teltronic — eso implica un horizonte de 2–3 años, no 12 meses.
          </p>
        </div>

        <p className="text-[10px] text-slate-600 mt-3 leading-relaxed">
          Disclaimer: los precios objetivo de analistas son estimaciones. No constituyen recomendación de compra. Fuentes: Renta 4 (informe 6/05/2026, analista Iván San Félix) · Investing.com consenso (jun. 2026).
        </p>
      </section>

      {/* ── Escenarios 2028 ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// escenarios de valoración · horizonte 2028</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-2">Rangos de Precio Objetivo por Escenario</h3>
        <p className="text-[#9AA7B8] text-xs mb-6 leading-relaxed">
          Se muestran rangos, no precios exactos. La incertidumbre sobre DFN 2028, dilución y múltiplo hace que un único número sea
          falsa precisión. Precios en formato post contra-split (÷25 para pre-split equivalente).
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {ESCENARIOS.map(sc => (
            <div key={sc.nombre} className={`rounded-xl border border-border bg-surface p-5 ring-1 ${sc.ring}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${sc.badge}`}>{sc.nombre}</span>
                <span className="font-mono text-xs text-slate-500">{sc.multiplo} EV/EBITDA</span>
              </div>

              {/* Price range */}
              <div className="mb-4">
                <p className="text-[#9AA7B8] text-xs font-mono mb-1">Rango precio objetivo</p>
                <p className="text-[#F5F7FA] text-2xl font-bold tracking-tight">
                  {sc.rango_post.low.toFixed(1)}€ – {sc.rango_post.high.toFixed(1)}€
                </p>
                <p className="text-slate-500 text-xs font-mono mt-0.5">
                  {sc.rango_pre.low.toFixed(2)}€ – {sc.rango_pre.high.toFixed(2)}€ pre-split
                </p>
                <p className={`text-xs font-mono mt-1.5 ${sc.potencial.low < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {sc.potencial.low > 0 ? '+' : ''}{sc.potencial.low}% / +{sc.potencial.high}% vs 5.25€
                </p>
              </div>

              <div className="space-y-1 mb-4 pb-4 border-b border-border/50">
                {[
                  { k: 'EBITDA 2028E', v: `~${sc.ebitda} M€` },
                  { k: 'EV/EBITDA rango', v: sc.multiplo },
                ].map(row => (
                  <div key={row.k} className="flex justify-between">
                    <span className="text-slate-500 text-xs font-mono">{row.k}</span>
                    <span className="text-[#9AA7B8] text-xs font-mono">{row.v}</span>
                  </div>
                ))}
              </div>

              <p className="text-[#9AA7B8] text-xs leading-relaxed mb-3">{sc.desc}</p>

              <ul className="space-y-1">
                {sc.items.map(item => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-slate-600 text-xs shrink-0">·</span>
                    <span className="text-slate-500 text-xs leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Catalizadores ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// catalizadores 6–12 meses</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">Qué seguir de cerca</h3>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-2.5 border-b border-border text-[10px] font-mono text-slate-600 uppercase tracking-wide">
            <span className="col-span-5">Catalizador</span>
            <span className="col-span-2 text-center">Impacto</span>
            <span className="col-span-2 text-center">Sesgo</span>
            <span className="col-span-3">Qué mirar</span>
          </div>

          {CATALIZADORES.map((c, i) => {
            const impColor = c.impacto === 'Alto' ? 'text-red-400 bg-red-950/50 border-red-900/40'
              : c.impacto === 'Medio' ? 'text-amber-400 bg-amber-950/50 border-amber-900/40'
              : 'text-slate-400 bg-surface-2 border-border'
            const sesgoColor = c.sesgo === 'Positivo' ? 'text-emerald-400'
              : c.sesgo === 'Negativo' ? 'text-red-400'
              : 'text-amber-400'
            return (
              <div key={c.titulo} className={`grid grid-cols-12 items-start px-5 py-3.5 gap-2 ${i < CATALIZADORES.length - 1 ? 'border-b border-border/40' : ''}`}>
                <div className="col-span-5">
                  <p className="text-[#F5F7FA] text-xs font-medium">{c.titulo}</p>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${impColor}`}>{c.impacto}</span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className={`text-xs font-mono font-medium ${sesgoColor}`}>{c.sesgo}</span>
                </div>
                <p className="col-span-3 text-[#9AA7B8] text-xs leading-relaxed">{c.que_mirar}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Risks ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// riesgos principales</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-5">Lo que puede salir mal</h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { n: 'Alto',  t: 'Dilución accionarial',        d: 'Pago en acciones para M&A puede diluir significativamente. Amper prevé pagar 20-30% de cada adquisición en papel.' },
            { n: 'Alto',  t: 'Integración Teltronic',       d: '225 M€ es una adquisición grande para 478 M€ de cap. Una integración lenta o costosa destruiría valor.' },
            { n: 'Alto',  t: 'Dependencia contratos públicos', d: 'Ciclos presupuestarios, retrasos en adjudicaciones y riesgo político en defensa.' },
            { n: 'Alto',  t: 'Deuda post-M&A',              d: 'DFN podría superar 220 M€ si continúan las adquisiciones. DFN/EBITDA podría rebasar 3x en 2026.' },
            { n: 'Medio', t: 'Ejecución del plan 2028',     d: 'Objetivo 820 M€ ventas implica CAGR >43% desde 2025. Requiere M&A adicional y ejecución perfecta.' },
            { n: 'Medio', t: 'Small cap y liquidez baja',   d: 'Volumen de negociación reducido. Difícil entrada/salida para fondos institucionales.' },
            { n: 'Medio', t: 'Historial bursátil',          d: 'Amper ha tenido históricamente credibilidad baja. El mercado puede aplicar un descuento estructural persistente.' },
            { n: 'Bajo',  t: 'Riesgo macro y tipos',        d: 'Subida de tipos encarece el servicio de la deuda. Inflación en cadena de suministro de defensa.' },
          ].map(r => {
            const nc = r.n === 'Alto'
              ? 'text-red-400 bg-red-950/50 border-red-900/50'
              : r.n === 'Medio'
              ? 'text-amber-400 bg-amber-950/50 border-amber-900/50'
              : 'text-slate-400 bg-surface-2 border-border'
            return (
              <div key={r.t} className="rounded-xl border border-border bg-surface p-4 flex gap-3">
                <div className={`shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border h-fit ${nc}`}>{r.n}</div>
                <div>
                  <p className="text-[#F5F7FA] text-sm font-medium mb-1">{r.t}</p>
                  <p className="text-[#9AA7B8] text-xs leading-relaxed">{r.d}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Methodology ── */}
      <section>
        <h2 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-1">// metodología y limitaciones</h2>
        <h3 className="text-[#F5F7FA] font-semibold text-lg mb-4">Supuestos y Datos Pendientes</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h4 className="text-[#F5F7FA] text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="text-sky-400">⊕</span> Metodología
            </h4>
            <ul className="space-y-2">
              {[
                'Valoración por EV/EBITDA (no DCF — empresa en transformación)',
                'Escenarios con rangos, no precios únicos',
                'Valoración táctica 2026–27 independiente del plan 2028',
                'Tabla de sensibilidad EBITDA × múltiplo',
                'Comparables: peers europeos defensa/aeroespacial',
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
              <span className="text-amber-400">○</span> Datos Pendientes
            </h4>
            <ul className="space-y-2">
              {[
                'Deuda confirmada post-Teltronic → H1 2026 (sep-26)',
                'Precios cierre dic 2023 y 2024 → BME manual',
                'EV/EBITDA Leonardo y SAAB → Koyfin (LDO IM / SAAB B SS)',
                'Caja, deuda bruta, capex 2022-2024 → PDFs CNMV',
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

      {/* ── Sources ── */}
      <section className="rounded-xl border border-border bg-surface p-5">
        <h4 className="font-mono text-xs text-sky-400 uppercase tracking-widest opacity-70 mb-3">// fuentes de datos</h4>
        <div className="grid sm:grid-cols-2 gap-1.5 text-xs font-mono">
          {[
            ['CNMV', 'Cuentas anuales, hechos relevantes'],
            ['Amper IR · CMD abr-26', 'EBITDA, DFN, cartera, plan 2026–28'],
            ['Amper IR · Capital social', 'Nº acciones, contra-split'],
            ['Bolsamania / Investing.com', 'Precio jun-26'],
            ['MarketScreener', 'Leonardo, SAAB EV/EBITDA [needs_cross_check]'],
            ['valueinvesting.io', 'Hensoldt EV/EBITDA [verified mar-26]'],
          ].map(([src, desc]) => (
            <div key={src} className="flex gap-2">
              <span className="text-sky-400/50 shrink-0">·</span>
              <span className="text-[#9AA7B8]">{src}<span className="text-slate-600 ml-1.5">{desc}</span></span>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
