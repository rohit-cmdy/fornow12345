export default function DonutChart({ data, centerValue, centerLabel, size = 160, thickness = 22 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let offsetAccum = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((d) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const gap = circumference - dash;
          const strokeDashoffset = -offsetAccum;
          offsetAccum += dash;
          return (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={strokeDashoffset}
            />
          );
        })}
      </g>
      <text x="50%" y="47%" textAnchor="middle" className="donut-center-value" fill="var(--text-primary)">
        {centerValue}
      </text>
      <text x="50%" y="64%" textAnchor="middle" className="donut-center-label" fill="var(--text-tertiary)">
        {centerLabel}
      </text>
    </svg>
  );
}
