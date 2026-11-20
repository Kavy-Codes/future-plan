import { useState } from 'react';
import { GLOSSARY, SOURCES } from '../data/content';
import { Callout, Eyebrow, Pill } from '../components/ui';
import { External } from '../components/Icons';

export default function Sources() {
  const [tab, setTab] = useState<'sources' | 'words'>('sources');

  return (
    <div className="stack-lg">
      <div className="tabs" role="tablist" aria-label="Sources and glossary">
        <button
          type="button"
          role="tab"
          id="tab-sources"
          aria-selected={tab === 'sources'}
          aria-controls="panel-sources"
          className={`tabs__btn ${tab === 'sources' ? 'is-on' : ''}`}
          onClick={() => setTab('sources')}
        >
          Official sources
        </button>
        <button
          type="button"
          role="tab"
          id="tab-words"
          aria-selected={tab === 'words'}
          aria-controls="panel-words"
          className={`tabs__btn ${tab === 'words' ? 'is-on' : ''}`}
          onClick={() => setTab('words')}
        >
          Words explained
        </button>
      </div>

      {tab === 'sources' && (
        <div id="panel-sources" role="tabpanel" aria-labelledby="tab-sources" className="stack">
          <p className="body body--lede">
            These are the primary documents behind the numbers. Where a document has a date, the date is shown, because
            a rule from 2025 can be replaced by a notice in 2026.
          </p>
          <ul className="source-list">
            {SOURCES.map((s) => (
              <li key={s.name} className="source-item">
                <div className="source-item__main">
                  <div className="source-item__meta">
                    <span className="source-item__org">{s.org}</span>
                    <span className="source-item__date">{s.date}</span>
                  </div>
                  <h3 className="source-item__name">{s.name}</h3>
                  <p className="source-item__settles">{s.settles}</p>
                </div>
                <a className="source-item__link" href={s.url} target="_blank" rel="noreferrer">
                  Open
                  <External />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <Callout tone="note" title="How to check any claim on this site">
            <ol className="ordered-list">
              <li>Open the primary document, not a news summary of it.</li>
              <li>Find the date. Rules change, and older PDFs stay online.</li>
              <li>Search inside the PDF for the exact words, such as “regular mode” or “four years”.</li>
              <li>When it matters, email the admissions office. They answer, and their answer is the one that counts.</li>
            </ol>
          </Callout>

          <p className="disclaimer">
            This is a personal guide, not legal or admissions advice. Every effort has been made to use current official
            documents, checked in {new Date().getFullYear()}. Universities and regulators revise rules without much
            warning. Confirm anything that decides money or a year of your life.
          </p>
        </div>
      )}

      {tab === 'words' && (
        <div id="panel-words" role="tabpanel" aria-labelledby="tab-words" className="stack">
          <p className="body body--lede">
            The acronyms that appear in every prospectus, in one place, in plain words.
          </p>
          <dl className="glossary">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="glossary__item">
                <dt>{g.term}</dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
          <div className="note-strip">
            <Pill tone="accent">Reminder</Pill>
            <p>
              A licence is not a degree, and a degree is not a licence. The RCI register is the line that matters for
              clinical practice.
            </p>
          </div>
        </div>
      )}

      <div className="end-card">
        <Eyebrow>The end of the guide</Eyebrow>
        <h3 className="h3">One last thing.</h3>
        <p>
          You do not need to be certain. You need one good next step, taken this month. Read the short answer again,
          tick one box, and close the tab. That is enough for now.
        </p>
      </div>
    </div>
  );
}
