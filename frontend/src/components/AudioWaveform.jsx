// A fixed, deterministic pattern of bar heights (percent) — repeats to fill
// whatever width is available. No randomness, so it renders identically
// every time and never produces a jarring layout shift.
const PATTERN = [30, 45, 60, 35, 70, 50, 25, 65, 40, 55, 75, 30, 50, 42, 66, 38, 58, 48, 70, 33];
const BAR_COUNT = 60;

export default function AudioWaveform() {
  return (
    <div className="waveform" aria-hidden="true">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <span
          key={i}
          className="waveform-bar"
          style={{
            '--h': `${PATTERN[i % PATTERN.length]}%`,
            animationDelay: `${(i % PATTERN.length) * 45}ms`,
          }}
        />
      ))}
    </div>
  );
}
