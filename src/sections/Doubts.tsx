import { useMemo, useState } from 'react';
import { FAQS } from '../data/content';
import { ArrowRight, ChevronDown, Close, Search } from '../components/Icons';
import { Eyebrow, Pill } from '../components/ui';

const GROUPS = ['All', ...Array.from(new Set(FAQS.map((f) => f.group)))];

export default function Doubts({ go }: { go: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const [open, setOpen] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const inGroup = group === 'All' || f.group === group;
      const inQuery = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return inGroup && inQuery;
    });
  }, [query, group]);

  const toggle = (q: string) => {
    setOpen((prev) => (prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q]));
  };

  const expandAll = () => setOpen(filtered.map((f) => f.q));
  const collapseAll = () => setOpen([]);

  return (
    <div className="stack-lg">
      <div className="faq-tools">
        <div className="search-field">
          <Search className="search-field__icon" />
          <label className="sr-only" htmlFor="faq-search">
            Search questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, for example: Maths, licence, D.El.Ed, fees"
          />
          {query && (
            <button type="button" className="search-field__clear" onClick={() => setQuery('')} aria-label="Clear search">
              <Close />
            </button>
          )}
        </div>

        <div className="faq-groups" role="group" aria-label="Filter by topic">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              className={`chip chip--sm ${group === g ? 'is-on' : ''}`}
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="faq-toolbar">
          <p className="faq-count">
            <Pill tone="quiet">{filtered.length}</Pill> {filtered.length === 1 ? 'answer' : 'answers'}
          </p>
          <div className="faq-actions">
            <button type="button" className="link-btn" onClick={expandAll}>
              Open all
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" className="link-btn" onClick={collapseAll}>
              Close all
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">
          <p className="empty__title">Nothing matches that yet.</p>
          <p className="empty__body">
            Try a shorter word. If the question is genuinely missing, the sources page has every official link, and the
            admissions offices answer email.
          </p>
          <button type="button" className="btn btn--ghost" onClick={() => { setQuery(''); setGroup('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="faq-list">
          {filtered.map((f, i) => {
            const isOpen = open.includes(f.q);
            return (
              <li key={f.q} className={`faq ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => toggle(f.q)}
                >
                  <span className="faq__q">{f.q}</span>
                  <ChevronDown className={`faq__chevron ${isOpen ? 'is-open' : ''}`} />
                </button>
                <div className="faq__panel" id={`faq-${i}`} hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="next-inline">
        <p>Every claim above points to a document. The last page lists them with dates.</p>
        <button type="button" className="btn btn--solid" onClick={() => go('sources')}>
          Sources and terms
          <ArrowRight />
        </button>
      </div>

      <div className="faq-footnote">
        <Eyebrow>One thing worth saying</Eyebrow>
        <p>
          You are allowed to not know yet. The plan on this site exists so that uncertainty does not cost you a year.
          You can change direction at 19, at 22, or at 25. What you cannot easily undo is a two-year detour that blocks
          the degree you actually want.
        </p>
      </div>
    </div>
  );
}
