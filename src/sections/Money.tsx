import { useMemo, useState } from 'react';
import { EARN_WAYS } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { ArrowRight, Alert } from '../components/Icons';
import { inr } from '../lib/hooks';

const STAGES = [
  { id: 'gap', label: 'After boards', rate: 250, note: 'Tutoring and writing, age 17 to 18' },
  { id: 'ba', label: 'In the BA', rate: 400, note: 'Senior tutoring, writing, part-time work' },
  { id: 'ma', label: 'In the master’s', rate: 550, note: 'Research assistance, mentoring, internships' },
  { id: 'phd', label: 'PhD fellow', rate: 0, note: 'UGC JRF, fixed' },
] as const;

type StageId = (typeof STAGES)[number]['id'];

const BUDGET = [
  {
    title: 'Living at home, DU or Jamia',
    tuition: 'Low. Jamia’s psychology fee was ₹13,475 a year in 2026-27.',
    living: 'No rent.',
    verdict: 'The best financial position by a wide margin.',
    tone: 'good' as const,
  },
  {
    title: 'Living at home, AUD',
    tuition: 'Higher than DU or Jamia, with need-based waivers published by the university.',
    living: 'No rent.',
    verdict: 'Comfortable, and protected by the 85% Delhi quota.',
    tone: 'good' as const,
  },
  {
    title: 'Hostel or another city',
    tuition: 'Tuition plus hostel and food, for four years.',
    living: 'The largest line item, and it compounds.',
    verdict: 'Only worth it if the programme is clearly better for you.',
    tone: 'warn' as const,
  },
];

export default function Money({ go }: { go: (id: string) => void }) {
  const [stage, setStage] = useState<StageId>('gap');
  const [hours, setHours] = useState(8);

  const stageInfo = STAGES.find((s) => s.id === stage)!;

  const monthly = useMemo(() => {
    if (stage === 'phd') return 37000;
    return hours * stageInfo.rate * 4.3;
  }, [hours, stage, stageInfo.rate]);

  const overLimit = stage !== 'phd' && hours > 12;

  return (
    <div className="stack-lg">
      <Callout tone="note" title="The rules at 17">
        You can work in non-hazardous jobs, with limits on hours and no night shifts. Tutoring and freelance writing
        both fit. Most formal platforms need you to be 18 for identity checks, and a contract signed by a minor is not
        enforceable, so a parent or guardian signs until your eighteenth birthday. That is a formality, not a barrier.
      </Callout>

      <section className="block" aria-labelledby="ways-heading">
        <Eyebrow>Four ways that fit around study</Eyebrow>
        <h3 id="ways-heading" className="h3">
          What actually pays, at each stage
        </h3>
        <div className="earn-grid">
          {EARN_WAYS.map((w) => (
            <article key={w.name} className="earn">
              <div className="earn__top">
                <h4 className="earn__name">{w.name}</h4>
                <Pill tone="quiet">{w.when}</Pill>
              </div>
              <p className="earn__range">{w.range}</p>
              <p className="earn__body">{w.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="calc-heading">
        <Eyebrow>Try a number</Eyebrow>
        <h3 id="calc-heading" className="h3">
          What could you earn in a month?
        </h3>

        <div className="calc">
          <div className="calc__controls">
            <div className="segmented" role="group" aria-label="Choose your stage">
              {STAGES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`segmented__btn ${stage === s.id ? 'is-on' : ''}`}
                  aria-pressed={stage === s.id}
                  onClick={() => setStage(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {stage !== 'phd' ? (
              <>
                <div className="calc__slider-head">
                  <label htmlFor="hours">Hours per week</label>
                  <span className="calc__slider-value">{hours} hrs</span>
                </div>
                <input
                  id="hours"
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="range"
                />
                <div className="calc__scale" aria-hidden="true">
                  <span>2</span>
                  <span>10</span>
                  <span>20</span>
                </div>
                <p className="calc__note">{stageInfo.note}. Assumes an average of about 4.3 weeks a month.</p>
              </>
            ) : (
              <p className="calc__note">
                The UGC JRF is fixed at ₹37,000 a month for the first two years, then ₹42,000, plus contingency and house
                rent where it applies. Outside paid work is not allowed while you hold it.
              </p>
            )}
          </div>

          <div className="calc__result" aria-live="polite">
            <span className="calc__result-label">Roughly, per month</span>
            <span className="calc__result-value">{inr(monthly)}</span>
            {stage === 'phd' ? (
              <span className="calc__result-note">A fellowship, not a salary.</span>
            ) : (
              <span className="calc__result-note">Before tax. Tutoring income is usually below the taxable threshold.</span>
            )}
            {overLimit && (
              <span className="calc__warn">
                <Alert /> Past twelve hours, attendance and grades start to suffer.
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="budget-heading">
        <Eyebrow>The other side of the ledger</Eyebrow>
        <h3 id="budget-heading" className="h3">
          Three honest budget shapes
        </h3>
        <div className="budget">
          {BUDGET.map((b) => (
            <article key={b.title} className={`budget__row budget__row--${b.tone}`}>
              <div className="budget__main">
                <h4 className="budget__title">{b.title}</h4>
                <p className="budget__tuition">{b.tuition}</p>
                <p className="budget__living">{b.living}</p>
              </div>
              <p className="budget__verdict">{b.verdict}</p>
            </article>
          ))}
        </div>
        <p className="footnote">
          Fees change every year. Jamia’s figure comes from its 2026-27 prospectus. For DU, AUD, and every other
          university, check the current bulletin before you plan. Ask about fee waivers early; they are often
          underused.
        </p>
      </section>

      <section className="block" aria-labelledby="week-heading">
        <Eyebrow>The week that works</Eyebrow>
        <h3 id="week-heading" className="h3">
          Ten hours is not a lot. Protect it anyway.
        </h3>
        <ul className="hours">
          <li>
            <span className="hours__num">10</span>
            <span className="hours__label">hours of paid work, in two or three blocks</span>
          </li>
          <li>
            <span className="hours__num">2</span>
            <span className="hours__label">evenings kept completely free, no work, no guilt</span>
          </li>
          <li>
            <span className="hours__num">1</span>
            <span className="hours__label">weekend day off, because burnout is expensive</span>
          </li>
        </ul>
        <p className="footnote">
          In the exam weeks before boards and university tests, drop the work to zero. Nobody remembers the month you
          earned an extra ₹3,000. Everyone remembers the semester you nearly failed.
        </p>
      </section>

      <div className="next-inline">
        <p>Still unsure about something? The doubts page is a fair place to check.</p>
        <button type="button" className="btn btn--solid" onClick={() => go('doubts')}>
          Questions and doubts
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
