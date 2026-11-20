import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FAQS, GLOSSARY, PATHS, PROFILE, SECTIONS, SOURCES } from './data/content';
import { useSectionHash, useStored, useTheme, scrollToTop } from './lib/hooks';
import { ArrowLeft, ArrowRight, Check, Close, Compass, Menu, Moon, Note, Pin, Print, Search, Sun } from './components/Icons';
import { Eyebrow, Pill, ProgressRing } from './components/ui';
import Start from './sections/Start';
import Psychology from './sections/Psychology';
import Paths from './sections/Paths';
import Admissions from './sections/Admissions';
import Roadmap from './sections/Roadmap';
import Teaching from './sections/Teaching';
import Money from './sections/Money';
import Doubts from './sections/Doubts';
import Sources from './sections/Sources';

const IDS = SECTIONS.map((s) => s.id);

const RENDERERS: Record<string, (props: { go: (id: string) => void; checked: string[]; onToggle: (id: string) => void }) => JSX.Element> = {
  start: (p) => <Start checked={p.checked} onToggle={p.onToggle} go={p.go} />,
  psychology: () => <Psychology />,
  paths: (p) => <Paths go={p.go} />,
  admissions: (p) => <Admissions go={p.go} />,
  roadmap: (p) => <Roadmap go={p.go} />,
  teaching: (p) => <Teaching go={p.go} />,
  money: (p) => <Money go={p.go} />,
  doubts: (p) => <Doubts go={p.go} />,
  sources: () => <Sources />,
};

type Result = { type: string; title: string; body: string; target: string };

function trapTab(e: React.KeyboardEvent<HTMLElement>) {
  if (e.key !== 'Tab') return;
  const nodes = e.currentTarget.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
  );
  if (nodes.length === 0) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function buildIndex(): Result[] {
  const results: Result[] = [];
  SECTIONS.forEach((s) => results.push({ type: 'Section', title: s.title, body: s.label, target: s.id }));
  PATHS.forEach((p) => results.push({ type: 'Branch', title: p.name, body: p.short, target: 'paths' }));
  FAQS.forEach((f) => results.push({ type: 'Question', title: f.q, body: f.a, target: 'doubts' }));
  GLOSSARY.forEach((g) => results.push({ type: 'Word', title: g.term, body: g.def, target: 'sources' }));
  SOURCES.forEach((s) => results.push({ type: 'Source', title: s.name, body: `${s.org}. ${s.settles}`, target: 'sources' }));
  return results;
}

const SEARCH_INDEX = buildIndex();

export default function App() {
  const { theme, toggle } = useTheme();
  const [active, goRaw] = useSectionHash(IDS, 'start');
  const [done, setDone] = useStored<string[]>('done', []);
  const [pinned, setPinned] = useStored<string[]>('pinned', []);
  const [notes, setNotes] = useStored<string>('notes', '');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const activeIndex = IDS.indexOf(active);
  const current = SECTIONS[activeIndex];
  const progress = (done.length / SECTIONS.length) * 100;

  const go = useCallback(
    (id: string) => {
      goRaw(id);
      setMenuOpen(false);
      setSearchOpen(false);
      setNotesOpen(false);
      scrollToTop();
    },
    [goRaw],
  );

  const next = activeIndex < SECTIONS.length - 1 ? SECTIONS[activeIndex + 1] : null;
  const prev = activeIndex > 0 ? SECTIONS[activeIndex - 1] : null;

  const toggleDone = useCallback(
    (id: string) => {
      setDone((prevDone) => (prevDone.includes(id) ? prevDone.filter((x) => x !== id) : [...prevDone, id]));
    },
    [setDone],
  );

  const togglePin = (id: string) => {
    setPinned((prevPinned) => (prevPinned.includes(id) ? prevPinned.filter((x) => x !== id) : [...prevPinned, id]));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotesOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const locked = menuOpen || searchOpen || notesOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen, notesOpen]);

  const renderer = RENDERERS[active] ?? RENDERERS.start;

  const readShortAnswer = () => {
    const target = document.getElementById('short-answer');
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap site-header__inner">
          <div className="site-header__left">
            <button
              type="button"
              className="icon-btn site-header__menu"
              aria-label="Open contents"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Menu />
            </button>
            <a
              className="brand"
              href="#start"
              onClick={(e) => {
                e.preventDefault();
                go('start');
              }}
            >
              <span className="brand__mark" aria-hidden="true">
                <Compass />
              </span>
              <span className="brand__text">
                <span className="brand__name">Future Plan</span>
                <span className="brand__sub">A psychology career, mapped</span>
              </span>
            </a>
          </div>

          <div className="site-header__right">
            <button type="button" className="icon-btn icon-btn--wide" onClick={() => setSearchOpen(true)} aria-label="Search the guide">
              <Search />
              <span className="icon-btn__label">Search</span>
              <kbd className="kbd">Ctrl K</kbd>
            </button>
            <button
              type="button"
              className={`icon-btn ${notes ? 'has-dot' : ''}`}
              onClick={() => setNotesOpen(true)}
              aria-label="Open your notes"
              title="Your notes"
            >
              <Note />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
        <div className="site-header__progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="layout wrap">
        <aside className="sidebar" aria-label="Contents">
          <div className="profile">
            <div className="profile__top">
              <span className="profile__avatar" aria-hidden="true">
                {PROFILE.age}
              </span>
              <div>
                <p className="profile__name">This plan is for you</p>
                <p className="profile__meta">
                  {PROFILE.age} · {PROFILE.place} · {PROFILE.stream}
                </p>
              </div>
            </div>
            <p className="profile__line">Class of {PROFILE.intake}. Expected above 85%. Psychology is the goal.</p>
          </div>

          <div className="sidebar__progress">
            <ProgressRing value={progress} />
            <div>
              <p className="sidebar__progress-title">
                {done.length} of {SECTIONS.length} read
              </p>
              <p className="sidebar__progress-sub">Checked {PROFILE.checked}</p>
            </div>
          </div>

          <nav className="side-nav" aria-label="Sections">
            {SECTIONS.map((s) => {
              const isActive = s.id === active;
              const isDone = done.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`side-nav__item ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => go(s.id)}
                >
                  <span className="side-nav__num" aria-hidden="true">
                    {isDone && !isActive ? <Check /> : s.num}
                  </span>
                  <span className="side-nav__label">{s.label}</span>
                  {pinned.includes(s.id) && <Pin className="side-nav__pin" filled />}
                </button>
              );
            })}
          </nav>

          {pinned.length > 0 && (
            <div className="sidebar__pinned">
              <p className="sidebar__label">Pinned</p>
              {SECTIONS.filter((s) => pinned.includes(s.id)).map((s) => (
                <button key={s.id} type="button" className="sidebar__pin-link" onClick={() => go(s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div className="sidebar__foot">
            <p>Made for one person. Every number traced to an official document.</p>
            <button type="button" className="link-btn" onClick={() => go('sources')}>
              See the sources
            </button>
          </div>
        </aside>

        <main id="main" className="main">
          <div className="main__inner">
            {active === 'start' ? (
              <header className="hero">
                <div className="hero__copy">
                  <div className="hero__eyebrow">
                    <Pill tone="accent">Personal guide</Pill>
                    <span>Delhi · Humanities · {PROFILE.intake} intake</span>
                  </div>
                  <h1 className="hero__title">
                    One student. One clear route from Class 12 to a career in psychology.
                  </h1>
                  <p className="hero__lede">
                    You are 17, in Delhi, studying Humanities, and you want to understand people for a living. This
                    holds one recommended route, the honest catch on every alternative, and the next three moves.
                    Checked against official documents in {PROFILE.checked}.
                  </p>
                  <div className="hero__actions">
                    <button type="button" className="btn btn--solid" onClick={readShortAnswer}>
                      Read the short answer
                      <ArrowRight />
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => go('roadmap')}>
                      See the roadmap
                    </button>
                  </div>
                  <dl className="hero__facts">
                    <div>
                      <dt>Degree</dt>
                      <dd>4 years, honours with research</dd>
                    </div>
                    <div>
                      <dt>Then</dt>
                      <dd>2-year master’s</dd>
                    </div>
                    <div>
                      <dt>Licence</dt>
                      <dd>RCI, only for clinical work</dd>
                    </div>
                  </dl>
                </div>

                <div className="hero__route" aria-label="Route at a glance">
                  <p className="hero__route-label">Your route at a glance</p>
                  <ol>
                    <li>
                      <span className="hero__route-year">2027</span>
                      <span>CUET and the BA begins</span>
                    </li>
                    <li>
                      <span className="hero__route-year">2031</span>
                      <span>Master’s begins</span>
                    </li>
                    <li>
                      <span className="hero__route-year">2033</span>
                      <span>Licence, or a funded PhD</span>
                    </li>
                    <li>
                      <span className="hero__route-year">2036</span>
                      <span>Practice, research, or a school office</span>
                    </li>
                  </ol>
                  <p className="hero__route-note">Not late. Not early. Just a sequence.</p>
                </div>
              </header>
            ) : null}

            {active !== 'start' && (
              <header className="doc-head">
                <div className="doc-head__top">
                  <Eyebrow>
                    Section {current.num} · {current.label}
                  </Eyebrow>
                  <div className="doc-head__tools">
                    <button
                      type="button"
                      className={`tool-btn ${pinned.includes(current.id) ? 'is-on' : ''}`}
                      onClick={() => togglePin(current.id)}
                      aria-pressed={pinned.includes(current.id)}
                    >
                      <Pin filled={pinned.includes(current.id)} />
                      <span>{pinned.includes(current.id) ? 'Pinned' : 'Pin'}</span>
                    </button>
                    <button type="button" className="tool-btn" onClick={() => window.print()}>
                      <Print />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
                <h1 className="doc-head__title">{current.title}</h1>
                <p className="doc-head__lede">{current.lede}</p>
              </header>
            )}

            <article className="doc-body" id={active === 'start' ? 'short-answer' : undefined}>
              {active === 'start' && (
                <div className="doc-tools">
                  <button
                    type="button"
                    className={`tool-btn ${pinned.includes(current.id) ? 'is-on' : ''}`}
                    onClick={() => togglePin(current.id)}
                    aria-pressed={pinned.includes(current.id)}
                  >
                    <Pin filled={pinned.includes(current.id)} />
                    <span>{pinned.includes(current.id) ? 'Pinned' : 'Pin'}</span>
                  </button>
                  <button type="button" className="tool-btn" onClick={() => window.print()}>
                    <Print />
                    <span>Print</span>
                  </button>
                </div>
              )}

              {renderer({ go, checked: done, onToggle: toggleDone })}
            </article>

            <footer className="doc-foot">
              <div className="doc-foot__status">
                <button
                  type="button"
                  className={`read-toggle ${done.includes(current.id) ? 'is-done' : ''}`}
                  onClick={() => toggleDone(current.id)}
                  aria-pressed={done.includes(current.id)}
                >
                  <span className="read-toggle__box" aria-hidden="true">
                    {done.includes(current.id) && <Check />}
                  </span>
                  {done.includes(current.id) ? 'Read' : 'Mark as read'}
                </button>
                <span className="doc-foot__hint">Saved on this device</span>
              </div>

              <div className="doc-foot__nav">
                {prev ? (
                  <button type="button" className="nav-card nav-card--prev" onClick={() => go(prev.id)}>
                    <span className="nav-card__dir">
                      <ArrowLeft /> Previous
                    </span>
                    <span className="nav-card__title">{prev.label}</span>
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button type="button" className="nav-card nav-card--next" onClick={() => go(next.id)}>
                    <span className="nav-card__dir">
                      Next <ArrowRight />
                    </span>
                    <span className="nav-card__title">{next.label}</span>
                  </button>
                ) : (
                  <button type="button" className="nav-card nav-card--next" onClick={() => go('start')}>
                    <span className="nav-card__dir">
                      Back to the start <ArrowRight />
                    </span>
                    <span className="nav-card__title">The short answer</span>
                  </button>
                )}
              </div>
            </footer>

            <footer className="site-foot">
              <div>
                <p className="site-foot__brand">Future Plan</p>
                <p className="site-foot__note">
                  A personal guide, checked {PROFILE.checked}. Not legal or admissions advice. Confirm anything that
                  decides money or a year of your life.
                </p>
              </div>
              <div className="site-foot__actions">
                <button type="button" className="link-btn" onClick={() => go('sources')}>
                  Sources
                </button>
                <button type="button" className="link-btn" onClick={() => window.print()}>
                  Print this section
                </button>
                <button type="button" className="link-btn" onClick={() => scrollToTop()}>
                  Back to top
                </button>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {menuOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Contents" onKeyDown={trapTab}>
          <div className="drawer drawer--left">
            <div className="drawer__head">
              <div>
                <p className="drawer__eyebrow">Contents</p>
                <p className="drawer__title">Nine short sections</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close contents" autoFocus>
                <Close />
              </button>
            </div>
            <nav className="drawer__nav" aria-label="All sections">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`drawer__item ${s.id === active ? 'is-active' : ''}`}
                  onClick={() => go(s.id)}
                >
                  <span className="drawer__num">{done.includes(s.id) ? <Check /> : s.num}</span>
                  <span className="drawer__item-text">
                    <span className="drawer__item-label">{s.label}</span>
                    <span className="drawer__item-title">{s.title}</span>
                  </span>
                </button>
              ))}
            </nav>
            <div className="drawer__foot">
              <ProgressRing value={progress} size={44} />
              <p>
                {done.length} of {SECTIONS.length} read
              </p>
            </div>
          </div>
          <button type="button" className="overlay__scrim" aria-label="Close contents" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onPick={go} />}

      {notesOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Your notes" onKeyDown={trapTab}>
          <div className="drawer drawer--right">
            <div className="drawer__head">
              <div>
                <p className="drawer__eyebrow">Your notes</p>
                <p className="drawer__title">One page, just for you</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setNotesOpen(false)} aria-label="Close notes" autoFocus>
                <Close />
              </button>
            </div>
            <textarea
              className="notes-area"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Questions to ask, deadlines, names of people to call, anything you do not want to lose."
            />
            <div className="notes-foot">
              <p className="notes-foot__hint">Saved automatically in this browser. Nothing is uploaded.</p>
              <div className="notes-foot__actions">
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => {
                    const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'future-plan-notes.txt';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download
                </button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setNotes('')}>
                  Clear
                </button>
              </div>
            </div>
          </div>
          <button type="button" className="overlay__scrim" aria-label="Close notes" onClick={() => setNotesOpen(false)} />
        </div>
      )}

      <nav className="bottombar" aria-label="Quick navigation">
        <button type="button" className="bottombar__btn" onClick={() => setMenuOpen(true)} aria-label="Open contents">
          <Menu />
          <span>Contents</span>
        </button>
        <div className="bottombar__progress">
          <span>{Math.round(progress)}%</span>
          <span className="bottombar__track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </span>
        </div>
        {next ? (
          <button type="button" className="bottombar__next" onClick={() => go(next.id)}>
            Next
            <ArrowRight />
          </button>
        ) : (
          <button type="button" className="bottombar__next" onClick={() => go('start')}>
            Start
            <ArrowRight />
          </button>
        )}
      </nav>
    </div>
  );
}

function SearchModal({ onClose, onPick }: { onClose: () => void; onPick: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return SECTIONS.map((s) => ({ type: 'Section', title: s.title, body: s.label, target: s.id }));
    }
    const scored = SEARCH_INDEX.map((item) => {
      const title = item.title.toLowerCase();
      const body = item.body.toLowerCase();
      let score = 0;
      if (title.startsWith(q)) score += 5;
      if (title.includes(q)) score += 3;
      if (body.includes(q)) score += 1;
      return { item, score };
    })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14)
      .map((x) => x.item);
    return scored;
  }, [query]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  const pick = (r: Result) => {
    onPick(r.target);
  };

  return (
    <div className="overlay overlay--center" role="dialog" aria-modal="true" aria-label="Search" onKeyDown={trapTab}>
      <button type="button" className="overlay__scrim overlay__scrim--first" aria-label="Close search" onClick={onClose} />
      <div className="search-modal">
        <div className="search-modal__head">
          <Search className="search-modal__icon" />
          <label className="sr-only" htmlFor="global-search">
            Search the whole guide
          </label>
          <input
            id="global-search"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, branches, questions, sources"
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setCursor((c) => Math.min(results.length - 1, c + 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              }
              if (e.key === 'Enter' && results[cursor]) {
                e.preventDefault();
                pick(results[cursor]);
              }
            }}
          />
          <button type="button" className="icon-btn icon-btn--small" onClick={onClose} aria-label="Close search">
            <Close />
          </button>
        </div>

        <div className="search-modal__body">
          {results.length === 0 ? (
            <p className="search-modal__empty">
              Nothing yet. Try a shorter word, or one that appears in the official documents, such as licence, CUET, or
              fee.
            </p>
          ) : (
            <ul className="search-results">
              {results.map((r, i) => (
                <li key={`${r.type}-${r.title}-${i}`}>
                  <button
                    type="button"
                    className={`search-result ${i === cursor ? 'is-cursor' : ''}`}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => pick(r)}
                  >
                    <span className="search-result__type">{r.type}</span>
                    <span className="search-result__title">{r.title}</span>
                    <span className="search-result__body">{r.body}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-modal__foot">
          <span>
            <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> to move
          </span>
          <span>
            <kbd className="kbd">Enter</kbd> to open
          </span>
          <span>
            <kbd className="kbd">Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
