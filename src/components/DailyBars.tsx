import { useEffect, useRef, useState } from "react";

export type DayCount = { date: Date; count: number };

const H = 200;
const PAD = { top: 12, right: 8, bottom: 26, left: 30 };
const GAP = 2;

/** Single-series daily bar chart with a hover tooltip and a table view. */
export default function DailyBars({ days, label }: { days: DayCount[]; label: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const [asTable, setAsTable] = useState(false);
  const [W, setW] = useState(640);
  const box = useRef<HTMLDivElement>(null);

  // Draw at the container's real pixel width so text and marks keep their size.
  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(240, Math.floor(entry.contentRect.width))));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const max = Math.max(1, ...days.map((d) => d.count));
  const ticks = niceTicks(max);
  const top = ticks[ticks.length - 1];
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const slot = innerW / days.length;
  const barW = Math.max(2, Math.min(28, slot - GAP * 2));
  const y = (v: number) => PAD.top + innerH - (v / top) * innerH;
  const dayLabel = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const labelEvery = Math.ceil(days.length / Math.max(2, Math.floor(innerW / 64)));

  return (
    <div className="chart" ref={box}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
        <button className="link-btn" onClick={() => setAsTable((t) => !t)}>
          {asTable ? "Show chart" : "Show table"}
        </button>
      </div>
      {asTable ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th className="num">{label}</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.date.toISOString()}>
                  <td>{dayLabel(d.date)}</td>
                  <td className="num">{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${label} per day`} onMouseLeave={() => setHover(null)}>
            {ticks.map((t) => (
              <g key={t}>
                <line className="grid-line" x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} />
                <text className="axis-label" x={PAD.left - 8} y={y(t) + 4} textAnchor="end">
                  {t}
                </text>
              </g>
            ))}
            {days.map((d, i) => {
              const cx = PAD.left + slot * i + slot / 2;
              const h = y(0) - y(d.count);
              return (
                <g key={d.date.toISOString()}>
                  <rect
                    x={PAD.left + slot * i}
                    y={PAD.top}
                    width={slot}
                    height={innerH}
                    fill="transparent"
                    onMouseEnter={() => setHover(i)}
                  />
                  {d.count > 0 && (
                    <path className={`bar${hover === i ? " hover" : ""}`} d={topRoundedBar(cx - barW / 2, y(0), barW, h)} pointerEvents="none" />
                  )}
                  {i % labelEvery === 0 && (
                    <text className="axis-label" x={cx} y={H - 6} textAnchor="middle">
                      {dayLabel(d.date)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          {hover !== null && (
            <div
              className="chart-tip"
              style={{
                left: Math.min(W - 70, Math.max(70, PAD.left + slot * hover + slot / 2)),
                top: y(days[hover].count) + 24,
              }}
            >
              {dayLabel(days[hover].date)} · <strong>{days[hover].count}</strong> {label.toLowerCase()}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** Bar anchored at the baseline with 4px rounded top corners. */
function topRoundedBar(x: number, base: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${base} V${base - h + r} Q${x},${base - h} ${x + r},${base - h} H${x + w - r} Q${x + w},${base - h} ${x + w},${base - h + r} V${base} Z`;
}

function niceTicks(max: number) {
  const raw = max / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const n = raw / mag;
  const step = max <= 4 ? 1 : Math.max(1, (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag);
  const ticks = [];
  for (let t = 0; t <= Math.ceil(max / step) * step; t += step) ticks.push(t);
  return ticks;
}

/** Buckets timestamps into the last `n` local days, oldest first. */
export function countByDay(timestamps: string[], n: number): DayCount[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: DayCount[] = Array.from({ length: n }, (_, i) => ({
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - (n - 1 - i)),
    count: 0,
  }));
  for (const ts of timestamps) {
    const d = new Date(ts);
    d.setHours(0, 0, 0, 0);
    const idx = Math.round((d.getTime() - days[0].date.getTime()) / 86_400_000);
    if (idx >= 0 && idx < n) days[idx].count++;
  }
  return days;
}
