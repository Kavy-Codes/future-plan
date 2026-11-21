import { CHECKLIST, CORE_ORDER, MOVES, READ_LATER, SECTIONS } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { ArrowRight, Check } from '../components/Icons';
import { MythCards, RouteMap } from '../components/Visuals';

type Props = {
  checked: string[];
  onToggle: (id: string) => void;
  go: (id: string) => void;
};

const LATER_WHEN: Record<string, string> = {
  teaching: 'Before you consider D.El.Ed or JBT',
  money: 'Before you take a term-time job',
  doubts: 'When a question comes up',
  sources: 'When you want to check a number',
};

function scrollToPlan() {
  const target = document.getElementById('reading-plan');
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export default function Start({ checked, onToggle, go }: Props) {
  const doneCount = CHECKLIST.filter((item) => checked.includes(item.id)).length;
  const core = CORE_ORDER.map((id) => SECTIONS.find((s) => s.id === id)!).filter(Boolean);
  const later = READ_LATER.map((id) => SECTIONS.find((s) => s.id === id)!).filter(Boolean);

  return (
    <div className="stack-lg">
      <header className="start-hero">
        <Eyebrow>For you · 17 · Delhi · Humanities</Eyebrow>
        <h1 className="start-hero__title">Psychology, without the guesswork.</h1>
        <p className="start-hero__lede">
          One route from Class 12 to a real career. What to read, what to skip, and what to do this month. No jargon,
          and every number traced to an official document.
        </p>
        <ul className="start-hero__facts">
          <li>
            <strong>9</strong>
            <span>short reads</span>
          </li>
          <li>
            <strong>30 min</strong>
            <span>for the core route</span>
          </li>
          <li>
            <strong>Nov 2026</strong>
            <span>last checked</span>
          </li>
        </ul>
        <button type="button" className="btn btn--solid btn--wide" onClick={scrollToPlan}>
          See your reading plan
          <ArrowRight />
        </button>
        <p className="start-hero__note">You do not need to read all of it today.</p>
      </header>

      <section aria-labelledby="how-heading" className="block">
        <Eyebrow>How this works</Eyebrow>
        <h2 id="how-heading" className="h3">
          Three rules, and then you can start
        </h2>
        <ol className="howto">
          <li className="howto__item">
            <span className="howto__num" aria-hidden="true">
              1
            </span>
            <div>
              <p className="howto__title">Read the four core pages, in order.</p>
              <p className="howto__text">Psychology, which path, getting in, and the roadmap. About 30 minutes with this page.</p>
            </div>
          </li>
          <li className="howto__item">
            <span className="howto__num" aria-hidden="true">
              2
            </span>
            <div>
              <p className="howto__title">Keep the rest for when you need them.</p>
              <p className="howto__text">Teaching, money, doubts, and sources are lookup pages. They are not homework.</p>
            </div>
          </li>
          <li className="howto__item">
            <span className="howto__num" aria-hidden="true">
              3
            </span>
            <div>
              <p className="howto__title">Use the one continue button.</p>
              <p className="howto__text">At the end of each page, tap it once. It marks the page done and opens the next one.</p>
            </div>
          </li>
        </ol>
      </section>

      <section id="reading-plan" aria-labelledby="plan-heading" className="block">
        <Eyebrow>Your reading order</Eyebrow>
        <h2 id="plan-heading" className="h3">
          Four pages, in this order
        </h2>
        <ol className="read-plan">
          {core.map((s) => {
            const done = checked.includes(s.id);
            return (
              <li key={s.id}>
                <button type="button" className={`read-plan__item ${done ? 'is-done' : ''}`} onClick={() => go(s.id)}>
                  <span className="read-plan__num" aria-hidden="true">
                    {done ? <Check /> : s.num}
                  </span>
                  <span className="read-plan__text">
                    <span className="read-plan__label">{s.label}</span>
                    <span className="read-plan__gist">{s.gist}</span>
                  </span>
                  <span className="read-plan__time">{s.time}</span>
                  <ArrowRight className="read-plan__arrow" />
                </button>
              </li>
            );
          })}
        </ol>

        <div className="later">
          <p className="later__title">Keep for later</p>
          <ul className="later__list">
            {later.map((s) => (
              <li key={s.id}>
                <button type="button" className="later__item" onClick={() => go(s.id)}>
                  <span className="later__label">{s.label}</span>
                  <span className="later__when">{LATER_WHEN[s.id]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="moves-heading" className="block">
        <Eyebrow>If you remember nothing else</Eyebrow>
        <h2 id="moves-heading" className="h3">
          Three moves that change the outcome
        </h2>
        <div className="moves">
          {MOVES.map((move) => (
            <article key={move.n} className="move">
              <span className="move__num" aria-hidden="true">
                {move.n}
              </span>
              <h3 className="move__title">{move.title}</h3>
              <p className="move__body">{move.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="route-heading" className="block">
        <Eyebrow>The route at a glance</Eyebrow>
        <h2 id="route-heading" className="h3">
          Four years. Two years. Then a licence, or a doctorate.
        </h2>
        <RouteMap />
      </section>

      <section aria-labelledby="myths-heading" className="block">
        <Eyebrow>Reality check</Eyebrow>
        <h2 id="myths-heading" className="h3">
          Four things that sound true
        </h2>
        <p className="body body--lede">
          Most bad advice is not a lie. It is a half-truth that was true a few years ago. These four come up again and
          again.
        </p>
        <MythCards />
      </section>

      <div className="trust">
        <span className="trust__badge">
          <Check /> Checked
        </span>
        <p className="trust__text">
          <strong>Every number has a paper behind it.</strong> Government notices, university bulletins, and
          prospectuses, all dated. If a coaching centre tells you otherwise, trust the document.
        </p>
        <button type="button" className="link-btn" onClick={() => go('sources')}>
          Open the sources
          <ArrowRight />
        </button>
      </div>

      <section aria-labelledby="month-heading" className="block">
        <div className="block__head">
          <div>
            <Eyebrow>This month</Eyebrow>
            <h2 id="month-heading" className="h3">
              Five small things. None of them take an evening.
            </h2>
          </div>
          <Pill tone={doneCount === CHECKLIST.length ? 'good' : 'quiet'}>
            {doneCount} of {CHECKLIST.length}
          </Pill>
        </div>

        <ul className="checklist">
          {CHECKLIST.map((item) => {
            const done = checked.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`checklist__item ${done ? 'is-done' : ''}`}
                  onClick={() => onToggle(item.id)}
                  aria-pressed={done}
                >
                  <span className="checklist__box" aria-hidden="true">
                    {done && <Check />}
                  </span>
                  <span className="checklist__text">{item.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <Callout tone="note" title="No rush, and no penalty">
        This plan is a map, not a deadline. Read one page, close it, come back next week. The only thing worth doing
        early is the CUET subject list, because it decides what you can apply for.
      </Callout>
    </div>
  );
}
