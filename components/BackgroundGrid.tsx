'use client'

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-base" />
      <div className="absolute inset-0 bg-grid opacity-100" />
      {/* Radial glow top */}
      <div
        className="absolute -top-64 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />
      {/* Radial glow bottom-right */}
      <div
        className="absolute -bottom-48 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
      />
    </div>
  )
}
