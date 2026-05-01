'use client'

interface ScoreProps {
  // Nieuwe interface: score + optioneel label
  score?: number
  label?: string
  // Backwards compat met oude value prop
  value?: number
}

export function Score({ score, label, value }: ScoreProps) {
  const num = score ?? value ?? 0
  const pct = Math.round((num / 10) * 100)

  // Kleur op basis van score
  const color =
    num >= 9.0 ? '#16a34a' :  // groen
    num >= 8.0 ? '#2563eb' :  // blauw
    num >= 7.0 ? '#d97706' :  // oranje
                 '#dc2626'    // rood

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        margin: '12px 0',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderLeft: `4px solid ${color}`,
        borderRadius: '6px',
        fontFamily: 'inherit',
      }}
    >
      {/* Score cirkel */}
      <div
        style={{
          flexShrink: 0,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: color,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1 }}>
          {num.toFixed(1)}
        </span>
        <span style={{ fontSize: '9px', opacity: 0.85, lineHeight: 1 }}>/10</span>
      </div>

      {/* Label + voortgangsbalk */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {label && (
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '6px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {label}
          </div>
        )}
        {/* Voortgangsbalk */}
        <div
          style={{
            height: '6px',
            background: '#e2e8f0',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: color,
              borderRadius: '3px',
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Score
