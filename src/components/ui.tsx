import type { ReactNode } from 'react';
import { Alert, Check, Info, Spark } from './Icons';

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Callout({
  tone = 'note',
  title,
  children,
}: {
  tone?: 'note' | 'warn' | 'good';
  title: string;
  children: ReactNode;
}) {
  const Icon = tone === 'warn' ? Alert : tone === 'good' ? Check : Info;
  return (
    <div className={`callout callout--${tone}`}>
      <span className="callout__icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="callout__body">
        <p className="callout__title">{title}</p>
        <div className="callout__text">{children}</div>
      </div>
    </div>
  );
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`panel ${className}`.trim()}>{children}</div>;
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'warn' | 'good' | 'quiet';
}) {
  return <span className={`pill pill--${tone}`}>{children}</span>;
}

export function KeyValue({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="kv">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function ProgressRing({ value, size = 52 }: { value: number; size?: number }) {
  const stroke = 3;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <span className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} className="ring__track" fill="none" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="ring__value"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring__label">{Math.round(value)}</span>
    </span>
  );
}

export function SectionLabel({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__num">{num}</span>
      <span className="section-label__text">{children}</span>
    </div>
  );
}

export function Verdict({ children }: { children: ReactNode }) {
  return (
    <p className="verdict">
      <span className="verdict__icon" aria-hidden="true">
        <Spark />
      </span>
      <span>{children}</span>
    </p>
  );
}
