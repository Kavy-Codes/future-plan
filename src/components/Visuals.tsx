import { DU_CUTOFFS, ROUTE } from '../data/content';
import { Check, Close, Info } from './Icons';

export function RouteMap() {
  return (
    <ol className="route-map" aria-label="The recommended route from 2027 to 2036">
      {ROUTE.map((stop, i) => (
        <li key={stop.year} className="route-map__step">
          <span className="route-map__badge" aria-hidden="true">
            {i + 1}
          </span>
          <div className="route-map__body">
            <p className="route-map__meta">
              <span>{stop.year}</span>
              <span>Age {stop.age}</span>
            </p>
            <h3 className="route-map__title">{stop.title}</h3>
            <p className="route-map__text">{stop.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const LADDER = [
  {
    title: 'Four-year psychology degree',
    body: 'A B.A. or B.Sc. with the fourth, research year. Aim for 55% or more.',
  },
  {
    title: 'Two-year RCI master’s',
    body: 'M.A. Clinical Psychology, now also called M.Clin.Psy. Regular mode only.',
  },
  {
    title: 'CRR registration',
    body: 'Your name goes on the Central Rehabilitation Register. This is the licence.',
  },
  {
    title: 'Clinical practice',
    body: 'Assess, diagnose, and do therapy. You still cannot prescribe medicine.',
  },
];

export function LicenceLadder() {
  return (
    <div className="ladder">
      <ol className="ladder__steps">
        {LADDER.map((step, i) => (
          <li key={step.title} className={`ladder__step ${i === LADDER.length - 1 ? 'is-last' : ''}`}>
            <span className="ladder__num" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="ladder__title">{step.title}</p>
              <p className="ladder__body">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="ladder__note">
        <Info />
        <span>These do not lead to a licence: a BA alone, a general MA with a clinical elective, or any distance degree.</span>
      </p>
    </div>
  );
}

const SCORE_FLOOR = 700;
const SCORE_MAX = 1000;
const SCORE_STRONG = 900;
const scorePercent = (score: number) => ((score - SCORE_FLOOR) / (SCORE_MAX - SCORE_FLOOR)) * 100;

export function ScoreBars() {
  return (
    <div className="score-chart">
      <div className="score-chart__key">
        <span>Bars start at 700, so the gaps are visible</span>
        <span className="score-chart__threshold">
          <span aria-hidden="true" />
          900 is strong
        </span>
      </div>
      <ul className="score-chart__list">
        {DU_CUTOFFS.map((row) => {
          const score = Number(row.score);
          const applied = row.programme.includes('Applied');
          return (
            <li key={row.college} className="score-row">
              <div className="score-row__head">
                <span className="score-row__name">{row.college}</span>
                <span className="score-row__value">{row.score}</span>
              </div>
              <div className="score-row__track">
                <span style={{ width: `${scorePercent(score)}%` }} />
                <span
                  className="score-row__mark"
                  style={{ left: `${scorePercent(SCORE_STRONG)}%` }}
                  aria-hidden="true"
                />
              </div>
              {applied ? <span className="score-row__tag">Applied psychology</span> : null}
            </li>
          );
        })}
      </ul>
      <p className="score-chart__foot">
        2025 first round, general category, out of 1,000. The chart starts at 700. The dashed line marks 900. Treat the
        numbers as calibration, not a target.
      </p>
    </div>
  );
}

const PAY = [
  {
    label: 'Tutoring, after boards',
    range: '₹4,000 to ₹10,000',
    low: 4000,
    high: 10000,
    note: 'About 10 hours a week, at 17.',
  },
  {
    label: 'Tutoring, in the BA',
    range: '₹9,000 to ₹17,000',
    low: 9000,
    high: 17000,
    note: '8 to 10 hours a week, around classes.',
  },
  {
    label: 'Research assistant, master’s',
    range: '₹5,000 to ₹15,000',
    low: 5000,
    high: 15000,
    note: 'Part time, and the best preparation for a PhD.',
  },
  {
    label: 'UGC JRF, PhD',
    range: '₹37,000 to ₹42,000',
    low: 37000,
    high: 42000,
    note: 'Full time. You cannot take other paid work.',
  },
];

const PAY_MAX = 42000;

export function MoneyBars() {
  return (
    <div className="pay-chart">
      <ul className="pay-chart__list">
        {PAY.map((item) => (
          <li key={item.label} className="pay-row">
            <div className="pay-row__head">
              <span className="pay-row__label">{item.label}</span>
              <span className="pay-row__value">{item.range}</span>
            </div>
            <div className="pay-row__track">
              <span
                className="pay-row__fill"
                style={{
                  marginLeft: `${(item.low / PAY_MAX) * 100}%`,
                  width: `${Math.max(4, ((item.high - item.low) / PAY_MAX) * 100)}%`,
                }}
              />
            </div>
            <p className="pay-row__note">{item.note}</p>
          </li>
        ))}
      </ul>
      <p className="pay-chart__foot">Monthly, before tax. Each bar starts at the low end of the range.</p>
    </div>
  );
}

const LANES = [
  {
    tag: 'Psychology first',
    steps: [
      ['2027', 'Start a four-year BA'],
      ['2031', 'BA done, start the master’s'],
      ['2033', 'Licence, or a funded PhD'],
    ],
    total: '6 years to a licence',
    tone: 'good',
  },
  {
    tag: 'D.El.Ed first',
    steps: [
      ['2027', 'Start a two-year D.El.Ed'],
      ['2029', 'Diploma done, start the BA'],
      ['2033', 'BA done, start the master’s'],
      ['2035', 'Licence'],
    ],
    total: '8 years, with two years repeated',
    tone: 'warn',
  },
];

export function TeachingFork() {
  return (
    <div className="fork">
      {LANES.map((lane) => (
        <div key={lane.tag} className={`fork__lane fork__lane--${lane.tone}`}>
          <p className="fork__tag">{lane.tag}</p>
          <ol className="fork__steps">
            {lane.steps.map(([year, text]) => (
              <li key={year + text} className="fork__step">
                <span className="fork__year">{year}</span>
                <span className="fork__text">{text}</span>
              </li>
            ))}
          </ol>
          <p className="fork__total">{lane.total}</p>
        </div>
      ))}
      <p className="fork__note">Both routes are full time. Doing one first does not shorten the other.</p>
    </div>
  );
}

const MYTHS = [
  {
    claim: 'A distance degree is fine.',
    truth: 'Psychology in open, distance, or online mode lost UGC recognition from the July-August 2025 session. No new admissions are allowed.',
  },
  {
    claim: 'D.El.Ed is a quick government job.',
    truth: 'It is two full-time years. Then CTET, then a recruitment cycle that can take another year or more.',
  },
  {
    claim: 'A nursery certificate gets you a school post.',
    truth: 'Private nursery training certificates do not meet the qualification for government primary teacher posts.',
  },
  {
    claim: 'Any master’s lets you practise.',
    truth: 'Clinical practice needs an RCI-recognised master’s and registration on the Central Rehabilitation Register.',
  },
];

export function MythCards() {
  return (
    <div className="myths">
      {MYTHS.map((myth) => (
        <article key={myth.claim} className="myth">
          <p className="myth__claim">
            <span className="myth__icon" aria-hidden="true">
              <Close />
            </span>
            <span>“{myth.claim}”</span>
          </p>
          <p className="myth__truth">
            <span className="myth__icon" aria-hidden="true">
              <Check />
            </span>
            <span>{myth.truth}</span>
          </p>
        </article>
      ))}
    </div>
  );
}
