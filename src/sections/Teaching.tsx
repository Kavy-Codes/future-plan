import { TEACHING_STATES } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { TeachingFork } from '../components/Visuals';
import { Check, Info } from '../components/Icons';

const DIPLOMAS = [
  {
    name: 'D.El.Ed',
    for: 'Classes 1 to 5, and up to class 8',
    length: '2 years, full time',
    ctet: 'Qualifies for CTET Paper I and primary posts',
  },
  {
    name: 'DPSE',
    for: 'Nursery and preschool, ages 3 to 6',
    length: '2 years',
    ctet: 'Does not qualify for CTET Paper I',
  },
  {
    name: 'B.El.Ed',
    for: 'Classes 1 to 8, integrated with a degree',
    length: '4 years, full time',
    ctet: 'Qualifies for elementary teaching posts',
  },
];

export default function Teaching() {
  return (
    <div className="stack-lg">
      <div className="two-col two-col--tight">
        <div className="mini-card mini-card--good">
          <p className="mini-card__head">
            <Check /> Teaching is a good job
          </p>
          <ul className="list list--small">
            <li>Stable, pensionable government posts</li>
            <li>Real social value, and long holidays</li>
            <li>Clear pay scales and unions</li>
            <li>A route that will still exist in 2040</li>
          </ul>
        </div>
        <div className="mini-card mini-card--warn">
          <p className="mini-card__head">
            <Info /> It is not a shortcut
          </p>
          <ul className="list list--small">
            <li>Two full-time years before you can apply</li>
            <li>A separate entrance exam and CTET</li>
            <li>Recruitment cycles that run over a year</li>
            <li>It does not stack with a regular psychology degree</li>
          </ul>
        </div>
      </div>

      <section className="block" aria-labelledby="fork-heading">
        <Eyebrow>The two timelines</Eyebrow>
        <h3 id="fork-heading" className="h3">
          Same starting line. Two years apart at the licence.
        </h3>
        <p className="body">
          This is the part the advice usually leaves out. Doing D.El.Ed first is not a shortcut. It moves psychology
          two years to the right.
        </p>
        <TeachingFork />
      </section>

      <section className="block" aria-labelledby="deled-heading">
        <Eyebrow>The diploma</Eyebrow>
        <h3 id="deled-heading" className="h3">
          What D.El.Ed is, and who it is for
        </h3>
        <div className="prose">
          <p>
            D.El.Ed is the two-year Diploma in Elementary Education. It trains primary school teachers, roughly classes
            one to eight, and it is the qualification behind most government primary teaching posts. It is a serious,
            practical course with long school placements, and it takes two full academic years.
          </p>
          <p>
            It is the right choice if you have decided that a classroom is where you want to spend your working life. It
            is the wrong choice if you are using it to keep psychology as a backup, because the two cannot run at the
            same time.
          </p>
        </div>
      </section>

      <section className="block" aria-labelledby="states-heading">
        <Eyebrow>State by state</Eyebrow>
        <h3 id="states-heading" className="h3">
          The rules are not the same across India
        </h3>
        <div className="table-wrap">
          <table className="table table--states">
            <caption className="sr-only">D.El.Ed eligibility by state</caption>
            <thead>
              <tr>
                <th scope="col">State</th>
                <th scope="col">After Class 12?</th>
                <th scope="col">Detail</th>
              </tr>
            </thead>
            <tbody>
              {TEACHING_STATES.map((s) => (
                <tr key={s.state}>
                  <th scope="row">{s.state}</th>
                  <td>
                    <Pill tone={s.afterTwelfth === 'Yes' ? 'good' : 'warn'}>{s.afterTwelfth}</Pill>
                  </td>
                  <td>
                    <span className="table__stack">{s.detail}</span>
                    <span className="table__stack table__stack--muted">{s.admission}</span>
                    <span className="table__stack table__stack--muted">{s.catch}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Callout tone="warn" title="Why it does not run alongside a BA">
        Since August 2025, the UGC does not recognise psychology programmes in distance or online mode. D.El.Ed is also
        full time, with roughly 200 working days a year and a supervised school placement. An evening college does not
        solve it, because the diploma still requires full-time attendance.
      </Callout>

      <section className="block" aria-labelledby="diplomas-heading">
        <Eyebrow>Do not mix these up</Eyebrow>
        <h3 id="diplomas-heading" className="h3">
          Three teaching qualifications, three different doors
        </h3>
        <div className="diploma-grid">
          {DIPLOMAS.map((d) => (
            <article key={d.name} className="diploma">
              <h4 className="diploma__name">{d.name}</h4>
              <dl className="diploma__dl">
                <div>
                  <dt>For</dt>
                  <dd>{d.for}</dd>
                </div>
                <div>
                  <dt>Length</dt>
                  <dd>{d.length}</dd>
                </div>
                <div>
                  <dt>CTET</dt>
                  <dd>{d.ctet}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="block" aria-labelledby="compare-heading">
        <Eyebrow>If you want to work with children</Eyebrow>
        <h3 id="compare-heading" className="h3">
          Primary teacher, or school counsellor
        </h3>
        <div className="compare">
          <div className="compare__col">
            <p className="compare__label">Primary teacher</p>
            <ul className="list list--small">
              <li>D.El.Ed after Class 12, or a degree first and then D.El.Ed or B.Ed.</li>
              <li>CTET and a state recruitment exam.</li>
              <li>You teach a syllabus to a class of 30 to 40.</li>
              <li>Pay level 6 for Delhi government primary posts, ₹35,400 to ₹1,12,400.</li>
              <li>The 2025 Delhi advertisement had 1,169 posts after revision, and a long selection cycle.</li>
            </ul>
          </div>
          <div className="compare__col compare__col--accent">
            <p className="compare__label">School counsellor</p>
            <ul className="list list--small">
              <li>Psychology BA, then a counselling or applied master’s.</li>
              <li>School interviews, and often a demo session.</li>
              <li>You work with individual students, parents, and teachers.</li>
              <li>Salaries track school pay, and senior counsellors do well.</li>
              <li>You keep the whole psychology career open, including clinical practice later.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="makes-sense-heading">
        <Eyebrow>The honest test</Eyebrow>
        <h3 id="makes-sense-heading" className="h3">
          When teaching is the right call
        </h3>
        <ul className="list list--checks">
          <li>You have spent time in a classroom and enjoyed the work itself, not just the holidays.</li>
          <li>You want a government post and are willing to prepare for CTET and a state exam.</li>
          <li>You are comfortable with two years of full-time study before you can apply.</li>
          <li>You are not relying on it to keep psychology as a backup.</li>
        </ul>
        <p className="footnote">
          If you choose teaching later, a bachelor’s degree first keeps every door open. After graduation you can take
          B.Ed for secondary classes or D.El.Ed for primary. That order is slower than D.El.Ed at 18, and it is far more
          flexible.
        </p>
      </section>

    </div>
  );
}
