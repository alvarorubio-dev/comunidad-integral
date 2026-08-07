export function UmbralITEDiagram() {
  return (
    <div className="my-8 py-2">
      <svg width="100%" viewBox="0 0 680 136" role="img">
        <title>Umbral de edad para pasar la ITE o IEE según la ciudad</title>
        <desc>
          Comparación entre Madrid (30 años, Ordenanza municipal), Cataluña (45 años, Decret
          67/2015) y Valencia (50 años, IEEV.CV)
        </desc>
        <g>
          <rect
            x="50"
            y="40"
            width="180"
            height="56"
            rx="8"
            fill="var(--color-crema-100)"
            stroke="var(--color-verde-700)"
            strokeWidth="0.5"
          />
          <text
            x="140"
            y="58"
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            fill="var(--color-verde-700)"
          >
            Madrid — 30 años
          </text>
          <text x="140" y="76" textAnchor="middle" fontSize="12" fill="var(--color-ink-soft)">
            Ordenanza municipal
          </text>
        </g>
        <g>
          <rect
            x="250"
            y="40"
            width="180"
            height="56"
            rx="8"
            fill="var(--color-crema-100)"
            stroke="var(--color-oxido-500)"
            strokeWidth="0.5"
          />
          <text
            x="340"
            y="58"
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            fill="var(--color-oxido-600)"
          >
            Cataluña — 45 años
          </text>
          <text x="340" y="76" textAnchor="middle" fontSize="12" fill="var(--color-ink-soft)">
            Decret 67/2015
          </text>
        </g>
        <g>
          <rect
            x="450"
            y="40"
            width="180"
            height="56"
            rx="8"
            fill="var(--color-crema-100)"
            stroke="var(--color-laton-500)"
            strokeWidth="0.5"
          />
          <text
            x="540"
            y="58"
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
            fill="var(--color-laton-600)"
          >
            Valencia — 50 años
          </text>
          <text x="540" y="76" textAnchor="middle" fontSize="12" fill="var(--color-ink-soft)">
            IEEV.CV
          </text>
        </g>
      </svg>
    </div>
  );
}
