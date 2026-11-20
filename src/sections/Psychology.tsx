import { Callout, Eyebrow, Pill } from '../components/ui';
import { Check, Info } from '../components/Icons';

const WEEK = [
  'Lectures on development, cognition, social behaviour, and abnormal psychology.',
  'Laboratory practicals where you run memory, attention, and reaction-time experiments.',
  'Statistics and software sessions, usually SPSS or R, working from real data.',
  'Readings, a group presentation, and a short field visit or observation report.',
];

const ROLES = [
  {
    role: 'Psychiatrist',
    training: 'MBBS, then MD in psychiatry',
    can: 'Diagnose, treat, and prescribe medicine.',
    note: 'A medical doctor first.',
  },
  {
    role: 'Clinical psychologist',
    training: 'Four-year psychology degree, then an RCI clinical master’s',
    can: 'Assess, diagnose, and do therapy. Cannot prescribe.',
    note: 'Registered on the RCI Central Rehabilitation Register.',
  },
  {
    role: 'Counselling psychologist',
    training: 'Psychology degree, then a regular-mode counselling master’s',
    can: 'Talk therapy for stress, grief, and life decisions. Refers serious cases on.',
    note: 'No RCI clinical licence.',
  },
  {
    role: '“Therapist”',
    training: 'Varies widely. Ask exactly what qualification.',
    can: 'Depends entirely on the training behind the title.',
    note: 'Not a protected title in the way clinical psychologist is.',
  },
];

export default function Psychology() {
  return (
    <div className="stack-lg">
      <div className="two-col">
        <section className="block" aria-labelledby="is-heading">
          <Eyebrow>What it is</Eyebrow>
          <h3 id="is-heading" className="h3">
            A science of behaviour and mind
          </h3>
          <ul className="list">
            <li>How attention, memory, language, and decision-making work.</li>
            <li>How emotional and moral capacities change from infancy to old age.</li>
            <li>What mental health conditions are, and what helps.</li>
            <li>How groups, culture, and institutions shape what people do.</li>
          </ul>
        </section>

        <section className="block" aria-labelledby="not-heading">
          <Eyebrow>What it is not</Eyebrow>
          <h3 id="not-heading" className="h3">
            Not mind reading, and not only therapy
          </h3>
          <ul className="list list--muted">
            <li>It is not a shortcut to reading people’s thoughts.</li>
            <li>It is not a course in being kind. It is a course in evidence.</li>
            <li>Most graduates never become therapists.</li>
            <li>It does not make you a doctor, and it does not let you prescribe medicine.</li>
          </ul>
        </section>
      </div>

      <section className="block" aria-labelledby="week-heading">
        <Eyebrow>An ordinary week</Eyebrow>
        <h3 id="week-heading" className="h3">
          What the four years actually look like
        </h3>
        <ul className="numbered-list">
          {WEEK.map((item, i) => (
            <li key={item}>
              <span className="numbered-list__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="block" aria-labelledby="roles-heading">
        <Eyebrow>Who does what</Eyebrow>
        <h3 id="roles-heading" className="h3">
          Psychiatrist, clinical psychologist, counsellor
        </h3>
        <p className="body">
          These titles are not interchangeable. The difference is training, and one legal line: only a medical doctor
          can prescribe psychiatric medicine in India.
        </p>
        <div className="table-wrap">
          <table className="table">
            <caption className="sr-only">Comparison of mental health roles in India</caption>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Training</th>
                <th scope="col">What they can do</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((r) => (
                <tr key={r.role}>
                  <th scope="row">
                    <span className="table__row-title">{r.role}</span>
                    <span className="table__row-note">{r.note}</span>
                  </th>
                  <td>{r.training}</td>
                  <td>{r.can}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="block" aria-labelledby="ba-heading">
        <Eyebrow>After the BA</Eyebrow>
        <h3 id="ba-heading" className="h3">
          What a bachelor’s degree alone lets you do
        </h3>
        <div className="two-col two-col--tight">
          <div className="mini-card mini-card--good">
            <p className="mini-card__head">
              <Check /> Yes
            </p>
            <ul className="list list--small">
              <li>Human resources and recruitment</li>
              <li>Research assistant roles</li>
              <li>Content and communications</li>
              <li>NGO programme support</li>
              <li>Market and user research</li>
              <li>School support work under supervision</li>
            </ul>
          </div>
          <div className="mini-card mini-card--warn">
            <p className="mini-card__head">
              <Info /> Not yet
            </p>
            <ul className="list list--small">
              <li>Diagnosing mental health conditions</li>
              <li>Independent psychotherapy</li>
              <li>Calling yourself a clinical psychologist</li>
              <li>Prescribing medicine, at any stage</li>
              <li>Issuing disability certificates</li>
            </ul>
          </div>
        </div>
      </section>

      <Callout tone="note" title="About the statistics">
        Yes, there is statistics. It is not the same as Class 12 Maths, and it is not a wall. You will learn averages,
        spread, correlation, and a few tests, then let software do the arithmetic. The skill is knowing which test
        answers which question. That is learnable, and it is one of the most useful things in the degree.
      </Callout>

      <div className="note-strip">
        <Pill tone="accent">Useful to know</Pill>
        <p>
          The degree is a foundation, not a licence. The licence comes later, from a recognised master’s and, for
          clinical work, the RCI register.
        </p>
      </div>
    </div>
  );
}
