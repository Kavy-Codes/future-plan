import { useRef, useState } from 'react';
import { EXTRA_PATHS, PATHS } from '../data/content';
import { Callout, Eyebrow, KeyValue, Pill } from '../components/ui';
import { ArrowRight } from '../components/Icons';

const licenseTone = (v: string) => (v === 'required' ? 'warn' : v === 'sometimes' ? 'accent' : 'good');

const licenseLabel = (v: string) =>
  v === 'required' ? 'Licence required' : v === 'sometimes' ? 'Licence for some roles' : 'No licence needed';

export default function Paths() {
  const [active, setActive] = useState(PATHS[0].id);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const current = PATHS.find((p) => p.id === active) ?? PATHS[0];
  const currentIndex = PATHS.findIndex((p) => p.id === active);

  const focusTab = (index: number) => {
    const next = (index + PATHS.length) % PATHS.length;
    setActive(PATHS[next].id);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="stack-lg">
      <p className="body body--lede">
        Eight branches, one degree to start. Pick a name to see the work, the qualification, and the catch. The badge
        tells you whether the role needs a licence.
      </p>

      <div className="path-explorer">
        <div className="path-tabs" role="tablist" aria-label="Branches of psychology" aria-orientation="vertical">
          {PATHS.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`path-tab-${p.id}`}
              aria-selected={active === p.id}
              aria-controls="path-panel"
              tabIndex={active === p.id ? 0 : -1}
              className={`path-tab ${active === p.id ? 'is-active' : ''}`}
              onClick={() => setActive(p.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                  e.preventDefault();
                  focusTab(currentIndex + 1);
                }
                if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  focusTab(currentIndex - 1);
                }
                if (e.key === 'Home') {
                  e.preventDefault();
                  focusTab(0);
                }
                if (e.key === 'End') {
                  e.preventDefault();
                  focusTab(PATHS.length - 1);
                }
              }}
            >
              <span className={`path-tab__dot path-tab__dot--${p.license}`} aria-hidden="true" />
              <span className="path-tab__name">{p.name}</span>
              <ArrowRight className="path-tab__arrow" />
            </button>
          ))}
        </div>

        <div
          className="path-panel"
          id="path-panel"
          role="tabpanel"
          aria-labelledby={`path-tab-${current.id}`}
          tabIndex={0}
        >
          <header className="path-panel__head">
            <div>
              <Eyebrow>Branch {String(currentIndex + 1).padStart(2, '0')} of 08</Eyebrow>
              <h3 className="h3">{current.name}</h3>
            </div>
            <Pill tone={licenseTone(current.license)}>{licenseLabel(current.license)}</Pill>
          </header>
          <p className="path-panel__short">{current.short}</p>

          <div className="path-panel__body">
            <KeyValue label="A normal day">{current.daily}</KeyValue>
            <KeyValue label="Where you work">{current.where}</KeyValue>
            <KeyValue label="The qualification">{current.degree}</KeyValue>
            <KeyValue label="Money">{current.money}</KeyValue>
          </div>

          <div className="path-panel__licence">
            <p className="path-panel__licence-label">Licence and regulation</p>
            <p>{current.licenseNote}</p>
          </div>

          <div className="path-panel__watch">
            <p className="path-panel__watch-label">The catch</p>
            <p>{current.watch}</p>
          </div>
        </div>
      </div>

      <section className="block" aria-labelledby="also-heading">
        <Eyebrow>Also exists</Eyebrow>
        <h3 id="also-heading" className="h3">
          Smaller fields you will hear about later
        </h3>
        <div className="mini-grid">
          {EXTRA_PATHS.map((p) => (
            <div key={p.name} className="mini-card">
              <p className="mini-card__title">{p.name}</p>
              <p className="mini-card__body">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Callout tone="note" title="You do not choose now">
        Every one of these starts with the same bachelor’s degree. The specialisation comes in the master’s, around age
        22. What matters at 17 is the degree, the grades, and the entrance exam.
      </Callout>

    </div>
  );
}
