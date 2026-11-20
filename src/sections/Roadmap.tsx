import { useState } from 'react';
import { TIMELINE } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { ArrowRight, ChevronDown } from '../components/Icons';

const MASTERS = [
  {
    name: 'RCI clinical',
    degree: 'M.A. Clinical Psychology, now also called M.Clin.Psy',
    entry: 'Four-year psychology degree at 55% or more. Three-year graduates need a bridge year or the first year of a master’s.',
    result: 'Eligible for RCI registration and clinical practice after the two-year programme.',
    tone: 'accent' as const,
  },
  {
    name: 'Counselling or applied',
    degree: 'M.A. or M.Sc. in counselling or applied psychology',
    entry: 'A psychology bachelor’s, usually with a written entrance test and interview. Regular mode only.',
    result: 'School counselling, wellness work, community programmes, and a strong base for a PhD.',
    tone: 'neutral' as const,
  },
  {
    name: 'Organisational',
    degree: 'M.A. or M.Sc. in organisational psychology, or an MBA in HR',
    entry: 'A psychology or related bachelor’s. Some programmes prefer work experience, most do not require it.',
    result: 'Corporate HR, people analytics, consulting, and the strongest starting salaries in the field.',
    tone: 'neutral' as const,
  },
];

export default function Roadmap({ go }: { go: (id: string) => void }) {
  const [open, setOpen] = useState(TIMELINE[0].age);

  return (
    <div className="stack-lg">
      <Callout tone="note" title="Read this as a sequence, not a deadline">
        You are not behind, and you are not early. The only years that are genuinely hard to recover are the fourth
        undergraduate year and the entrance exam cycle before it.
      </Callout>

      <ol className="timeline" aria-label="Year by year roadmap from 17 to 30">
        {TIMELINE.map((stop) => {
          const isOpen = open === stop.age;
          return (
            <li key={stop.age} className={`timeline__row ${isOpen ? 'is-open' : ''}`}>
              <div className="timeline__rail" aria-hidden="true">
                <span className="timeline__dot" />
                <span className="timeline__line" />
              </div>
              <div className="timeline__body">
                <button
                  type="button"
                  className="timeline__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`timeline-panel-${stop.age}`}
                  onClick={() => setOpen(isOpen ? '' : stop.age)}
                >
                  <span className="timeline__meta">
                    <span className="timeline__age">Age {stop.age}</span>
                    <span className="timeline__year">{stop.year}</span>
                  </span>
                  <span className="timeline__title">{stop.title}</span>
                  <ChevronDown className={`timeline__chevron ${isOpen ? 'is-open' : ''}`} />
                </button>
                <div id={`timeline-panel-${stop.age}`} className="timeline__panel" hidden={!isOpen}>
                  <p className="timeline__action">{stop.action}</p>
                  <p className="timeline__warning">
                    <span className="timeline__warning-label">Watch out</span>
                    {stop.warning}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="block" aria-labelledby="masters-heading">
        <Eyebrow>At 22</Eyebrow>
        <h3 id="masters-heading" className="h3">
          Three master’s routes, one choice
        </h3>
        <div className="masters">
          {MASTERS.map((m) => (
            <article key={m.name} className={`master master--${m.tone}`}>
              <div className="master__top">
                <h4 className="master__name">{m.name}</h4>
                {m.tone === 'accent' && <Pill tone="accent">Licence route</Pill>}
              </div>
              <p className="master__degree">{m.degree}</p>
              <dl className="master__dl">
                <div>
                  <dt>Entry</dt>
                  <dd>{m.entry}</dd>
                </div>
                <div>
                  <dt>Then</dt>
                  <dd>{m.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="phd-heading">
        <Eyebrow>If you want to teach or research</Eyebrow>
        <h3 id="phd-heading" className="h3">
          The PhD route, in plain numbers
        </h3>
        <div className="stat-row">
          <div className="stat">
            <span className="stat__value">7.5</span>
            <span className="stat__label">CGPA for direct PhD entry after a four-year bachelor’s with research</span>
          </div>
          <div className="stat">
            <span className="stat__value">75%</span>
            <span className="stat__label">Aggregate in a four-year degree to use UGC NET for PhD admission</span>
          </div>
          <div className="stat">
            <span className="stat__value">₹37k</span>
            <span className="stat__label">Monthly JRF stipend for the first two years, then ₹42,000</span>
          </div>
        </div>
        <div className="prose">
          <p>
            A four-year honours degree with research and a 7.5 CGPA lets you apply directly to a PhD under the UGC’s
            2022 regulations. With 75% in that degree, you can also write UGC NET for PhD admission. Neither route makes
            you an Assistant Professor on its own. Teaching posts still need a master’s at 55% or more, plus NET or a
            PhD.
          </p>
          <p>
            The JRF is the top NET result. It pays ₹37,000 a month for two years, then ₹42,000 for the rest, with a
            yearly contingency grant and house rent where it applies. It also prohibits outside paid work, which is
            worth knowing before you plan a side income.
          </p>
        </div>
      </section>

      <div className="next-inline">
        <p>The one alternative that needs its own honest page is teaching.</p>
        <button type="button" className="btn btn--solid" onClick={() => go('teaching')}>
          The teaching question
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}
