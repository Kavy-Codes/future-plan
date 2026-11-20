import { CHECKLIST, IGNORE, MOVES, ROUTE } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { ArrowRight, Check } from '../components/Icons';

type Props = {
  checked: string[];
  onToggle: (id: string) => void;
  go: (id: string) => void;
};

export default function Start({ checked, onToggle, go }: Props) {
  const doneCount = CHECKLIST.filter((item) => checked.includes(item.id)).length;

  return (
    <div className="stack-lg">
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

      <section aria-labelledby="route-heading" className="block">
        <Eyebrow>The route in one line</Eyebrow>
        <h3 id="route-heading" className="h3">
          Four years. Two years. Then a licence, or a doctorate.
        </h3>
        <ol className="route" aria-label="Recommended route from 2027 to 2036">
          {ROUTE.map((stop, i) => (
            <li key={stop.year} className="route__stop">
              <div className="route__marker" aria-hidden="true">
                <span className="route__dot" />
                {i < ROUTE.length - 1 && <span className="route__line" />}
              </div>
              <div className="route__content">
                <span className="route__year">{stop.year}</span>
                <span className="route__title">{stop.title}</span>
                <span className="route__body">{stop.body}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Callout tone="warn" title="Four things worth ignoring">
        <ul className="clean-list">
          {IGNORE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Callout>

      <section aria-labelledby="month-heading" className="block">
        <div className="block__head">
          <div>
            <Eyebrow>This month</Eyebrow>
            <h3 id="month-heading" className="h3">
              Five small things. None of them take an evening.
            </h3>
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

      <div className="next-inline">
        <p>
          The rest of this guide explains the reasoning behind each of those three moves. Start with what psychology
          actually is, or jump straight to the entrance exams.
        </p>
        <div className="button-row">
          <button type="button" className="btn btn--solid" onClick={() => go('psychology')}>
            What psychology is
            <ArrowRight />
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => go('admissions')}>
            Jump to getting in
          </button>
        </div>
      </div>
    </div>
  );
}
