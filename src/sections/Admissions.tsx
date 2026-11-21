import { useMemo, useState } from 'react';
import { ADMISSION_DOORS } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { Check, External, Alert } from '../components/Icons';
import { ScoreBars } from '../components/Visuals';

const SUBJECTS = [
  'English',
  'Hindi',
  'History',
  'Political Science',
  'Geography',
  'Sociology',
  'Economics',
  'Psychology',
  'Home Science',
  'Philosophy',
];

const LANGUAGES = ['English', 'Hindi'];

const CALENDAR = [
  { when: 'February to March', what: 'Jamia forms open and close. Do not wait for the last week.' },
  { when: 'April', what: 'Jamia entrance test. Usually late April, after the CUET preparation is already done.' },
  { when: 'May', what: 'CUET UG. Up to five papers, each 60 minutes, in computer-based mode.' },
  { when: 'June', what: 'CUET results. DU and AUD open their preference and registration portals.' },
  { when: 'July', what: 'DU seat allocation rounds, AUD registration, and document verification.' },
  { when: 'August', what: 'Classes begin. Fee payment and enrolment close the loop.' },
];

function CuetMapper() {
  const [selected, setSelected] = useState<string[]>(['English', 'History', 'Political Science', 'Geography']);

  const toggle = (subject: string) => {
    setSelected((prev) => {
      if (prev.includes(subject)) return prev.filter((s) => s !== subject);
      if (prev.length >= 5) return prev;
      return [...prev, subject];
    });
  };

  const status = useMemo(() => {
    const language = selected.some((s) => LANGUAGES.includes(s));
    const domains = selected.filter((s) => !LANGUAGES.includes(s));
    const hasPsychology = selected.includes('Psychology');
    const complete = language && domains.length >= 3;
    return { language, domains, hasPsychology, complete };
  }, [selected]);

  return (
    <div className="mapper">
      <div className="mapper__head">
        <div>
          <p className="mapper__title">Your CUET paper list</p>
          <p className="mapper__hint">Choose the papers you will actually write. They should mirror your Class 12 subjects.</p>
        </div>
        <Pill tone={status.complete ? 'good' : 'quiet'}>{selected.length} of 5 papers</Pill>
      </div>

      <div className="chips" role="group" aria-label="Select your CUET papers">
        {SUBJECTS.map((subject) => {
          const on = selected.includes(subject);
          const disabled = !on && selected.length >= 5;
          return (
            <button
              key={subject}
              type="button"
              className={`chip ${on ? 'is-on' : ''}`}
              aria-pressed={on}
              disabled={disabled}
              onClick={() => toggle(subject)}
            >
              {on && <Check className="chip__check" />}
              {subject}
            </button>
          );
        })}
      </div>

      <div className={`mapper__status ${status.complete ? 'is-good' : 'is-warn'}`} role="status">
        <span className="mapper__status-icon" aria-hidden="true">
          {status.complete ? <Check /> : <Alert />}
        </span>
        <div>
          <p className="mapper__status-title">
            {status.complete ? 'This combination works for a psychology degree' : 'Add the missing papers'}
          </p>
          <p className="mapper__status-text">
            {status.complete
              ? `You have ${status.language ? 'one language' : 'no language'} and ${status.domains.length} domain papers. Delhi University needs one language plus at least three domain subjects, each matching a subject on your Class 12 marksheet.`
              : 'You need at least one language, usually English, and at least three domain subjects.'}
          </p>
        </div>
      </div>

      {status.hasPsychology && (
        <Callout tone="warn" title="Only if Psychology is on your marksheet">
          Delhi University will not count a CUET Psychology paper if you did not study Psychology in Class 12. If you
          took it at school, keep it. If not, replace it before you submit the form.
        </Callout>
      )}

      <p className="mapper__footnote">
        Up to five papers in total. The 2026 format used 50 questions per paper, five marks for a correct answer, one
        mark deducted for a wrong one, and 60 minutes per paper.
      </p>
    </div>
  );
}

export default function Admissions() {
  return (
    <div className="stack-lg">
      <section className="block" aria-labelledby="doors-heading">
        <Eyebrow>Three doors</Eyebrow>
        <h3 id="doors-heading" className="h3">
          Pick the exam, then respect its one rule
        </h3>
        <div className="door-grid">
          {ADMISSION_DOORS.map((door, i) => (
            <article key={door.id} className="door">
              <div className="door__top">
                <div>
                  <span className="door__num">Door {i + 1}</span>
                  <h4 className="door__name">{door.name}</h4>
                </div>
                <Pill tone="accent">{door.exam}</Pill>
              </div>
              <p className="door__strength">{door.strength}</p>
              <div className="door__rule">
                <p className="door__rule-label">The rule that catches people</p>
                <p>{door.rule}</p>
              </div>
              <p className="door__note">{door.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="mapper-heading">
        <Eyebrow>Try it</Eyebrow>
        <h3 id="mapper-heading" className="h3">
          Build your CUET paper list
        </h3>
        <CuetMapper />
      </section>

      <section className="block" aria-labelledby="cutoffs-heading">
        <div className="block__head">
          <div>
            <Eyebrow>Reference, not a target</Eyebrow>
            <h3 id="cutoffs-heading" className="h3">
              What the top Delhi colleges asked for in 2025
            </h3>
          </div>
          <Pill tone="quiet">Out of 1,000</Pill>
        </div>
        <ScoreBars />
        <p className="footnote">
          First round, general category, July 2025. Scores move every year with the paper and the applicant pool. Use
          them to calibrate ambition, not to set a single target. A score above 900 is competitive at the top; above
          830 is competitive in several strong colleges.
        </p>
      </section>

      <section className="block" aria-labelledby="calendar-heading">
        <Eyebrow>Your admissions year</Eyebrow>
        <h3 id="calendar-heading" className="h3">
          The order things happen in 2027
        </h3>
        <ol className="calendar">
          {CALENDAR.map((item) => (
            <li key={item.when} className="calendar__row">
              <span className="calendar__when">{item.when}</span>
              <span className="calendar__what">{item.what}</span>
            </li>
          ))}
        </ol>
        <p className="footnote">
          These are the usual windows, based on the 2026-27 cycle. Dates shift each year. Check the official portals in
          January and again in April.
        </p>
      </section>

      <div className="source-links">
        <a className="source-link" href="https://admission.uod.ac.in/" target="_blank" rel="noreferrer">
          Delhi University admissions <External />
        </a>
        <a className="source-link" href="https://aud.delhi.gov.in/ug-admissions-2026" target="_blank" rel="noreferrer">
          AUD admissions <External />
        </a>
        <a className="source-link" href="https://admission.jmi.ac.in/" target="_blank" rel="noreferrer">
          Jamia admissions <External />
        </a>
      </div>

    </div>
  );
}
