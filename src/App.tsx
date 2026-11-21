import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FAQS, GLOSSARY, PATHS, PROFILE, SECTIONS, SOURCES } from './data/content';
import { useSectionHash, useStored, useTheme, scrollToTop } from './lib/hooks';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Close,
  Compass,
  Info,
  Install,
  Menu,
  Moon,
  Note,
  Search,
  Sun,
} from './components/Icons';
import { useInstallPrompt } from './lib/pwa';
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

const RENDERERS: Record<string, () => JSX.Element> = {
  psychology: () => <Psychology />,
  paths: () => <Paths />,
  admissions: () => <Admissions />,
  roadmap: () => <Roadmap />,
  teaching: () => <Teaching />,
  money: () => <Money />,
  doubts: () => <Doubts />,
  sources: () => <Sources />,
};

const GROUPS = [
  { key: 'start' as const, label: 'Start here', note: '' },
  { key: 'core' as const, label: 'The core route', note: 'Read these four in order. About 30 minutes.' },
  { key: 'later' as const, label: 'When you need it', note: 'Look these up. Do not read them first.' },
  { key: 'proof' as const, label: 'Proof', note: 'Check a number or a rule.' },
];

type Result = { type: string; title: string; body: string; target: string };

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

export default function App() {
  const { theme, toggle } = useTheme();
  const [active, goRaw] = useSectionHash(IDS, 'start');
  const [storedDone, setDone] = useStored<string[]>('done', []);
  const [checked, setChecked] = useStored<string[]>('checked', []);
  const [notes, setNotes] = useStored<string>('notes', '');
  const done = useMemo(() => storedDone.filter((id) => IDS.includes(id)), [storedDone]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const { installable, ios, promptInstall } = useInstallPrompt();
  const previousSection = useRef(active);

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

  const startInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === 'unavailable') setInstallOpen(true);
  };

  const next = activeIndex < SECTIONS.length - 1 ? SECTIONS[activeIndex + 1] : null;
  const prev = activeIndex > 0 ? SECTIONS[activeIndex - 1] : null;
  const nextUp = SECTIONS.find((s) => !done.includes(s.id)) ?? SECTIONS[0];

  const toggleChecked = useCallback(
    (id: string) => {
      setChecked((prevChecked) =>
        prevChecked.includes(id) ? prevChecked.filter((x) => x !== id) : [...prevChecked, id],
      );
    },
    [setChecked],
  );

  useEffect(() => {
    if (storedDone.length !== done.length) setDone(done);
  }, [storedDone, done, setDone]);

  const finishAndNext = () => {
    if (!done.includes(current.id)) setDone([...done, current.id]);
    go(next ? next.id : 'start');
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
    const locked = menuOpen || searchOpen || notesOpen || installOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen, notesOpen, installOpen]);

  useEffect(() => {
    if (previousSection.current === active) return;
    previousSection.current = active;
    const heading = document.querySelector<HTMLElement>('.doc-head__title, .start-hero__title');
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
  }, [active]);

  const renderer = RENDERERS[active];
  const nextTime = next ? `${next.time} · ${next.gist}` : '';

  return (
    <div className="app">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('main');
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to content
      </a>

      <header className="site-header">
        <div className="wrap site-header__inner">
          <button
            type="button"
            className="nav-trigger"
            aria-label="Open contents"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
            <span>Contents</span>
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

          <div className="site-header__actions">
            <button type="button" className="icon-btn icon-btn--wide header-search" onClick={() => setSearchOpen(true)} aria-label="Search the guide">
              <Search />
              <span className="icon-btn__label">Search</span>
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
          <div className="sidebar__intro">
            <p className="sidebar__intro-title">A plan for one person</p>
            <p className="sidebar__intro-meta">
              {PROFILE.age} · {PROFILE.place} · {PROFILE.stream} · {PROFILE.intake}
            </p>
            <p className="sidebar__intro-note">Checked {PROFILE.checked}. Every number sourced.</p>
          </div>

          <div className="sidebar__progress">
            <div className="sidebar__bar" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <p>
              {done.length} of {SECTIONS.length} read
            </p>
          </div>

          <nav className="side-nav" aria-label="Sections">
            {GROUPS.map((group) => {
              const items = SECTIONS.filter((s) => s.priority === group.key);
              if (items.length === 0) return null;
              return (
                <div key={group.key} className="side-group">
                  <p className="side-group__label">{group.label}</p>
                  {items.map((s) => {
                    const isActive = s.id === active;
                    const isDone = done.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={`side-nav__item ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => go(s.id)}
                      >
                        <span className="side-nav__num" aria-hidden="true">
                          {isDone && !isActive ? <Check /> : s.num}
                        </span>
                        <span className="side-nav__label">{s.label}</span>
                        <span className="side-nav__time">{s.time}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          <div className="sidebar__tools">
            <button type="button" className="sidebar__tool" onClick={() => setSearchOpen(true)}>
              <Search /> Search
            </button>
            <button type="button" className="sidebar__tool" onClick={() => setNotesOpen(true)}>
              <Note /> Notes
              {notes ? <span className="dot" aria-label="Has notes" /> : null}
            </button>
            {installable && (
              <button type="button" className="sidebar__tool" onClick={startInstall}>
                <Install /> Install app
              </button>
            )}
          </div>

          <button type="button" className="link-btn sidebar__link" onClick={() => go('sources')}>
            How this was checked
          </button>
        </aside>

        <main id="main" className="main" tabIndex={-1}>
          <div className="main__inner">
            {active !== 'start' && (
              <header className="doc-head">
                <p className="doc-head__meta">
                  <span>
                    Section {current.num} of {SECTIONS.length.toString().padStart(2, '0')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{current.time} read</span>
                  {current.priority === 'later' && <span className="doc-head__tag">Optional</span>}
                </p>
                <h1 className="doc-head__title">{current.title}</h1>
                <p className="doc-head__lede">{current.lede}</p>
                {current.skipIf && (
                  <p className="doc-head__skip">
                    <Info />
                    <span>{current.skipIf}</span>
                  </p>
                )}
              </header>
            )}

            <article className="doc-body" id={active === 'start' ? 'short-answer' : undefined}>
              {active === 'start' ? (
                <Start checked={checked} onToggle={toggleChecked} go={go} />
              ) : (
                renderer?.()
              )}
            </article>

            <footer className="section-end">
              {next ? (
                <>
                  <p className="section-end__eyebrow">{done.includes(current.id) ? 'Read' : 'Finished this page?'}</p>
                  <h2 className="section-end__title">Next: {next.label}</h2>
                  <p className="section-end__text">{nextTime}</p>
                  <button type="button" className="btn btn--solid btn--wide" onClick={finishAndNext}>
                    {done.includes(current.id) ? 'Continue' : 'I’m done, continue'}
                    <ArrowRight />
                  </button>
                  <div className="section-end__foot">
                    {prev ? (
                      <button type="button" className="link-btn" onClick={() => go(prev.id)}>
                        <ArrowLeft /> {prev.label}
                      </button>
                    ) : (
                      <span />
                    )}
                    <button type="button" className="link-btn" onClick={() => setMenuOpen(true)}>
                      All sections
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="section-end__eyebrow">The end</p>
                  <h2 className="section-end__title">That is the whole plan.</h2>
                  <p className="section-end__text">
                    Come back to Doubts or Sources whenever you need them. Nothing here expires.
                  </p>
                  <button type="button" className="btn btn--solid btn--wide" onClick={finishAndNext}>
                    Back to the start
                    <ArrowRight />
                  </button>
                  <button type="button" className="link-btn" onClick={() => setMenuOpen(true)}>
                    All sections
                  </button>
                </>
              )}
            </footer>

            <footer className="site-foot">
              <p>
                <strong>Future Plan</strong> · Checked {PROFILE.checked}. A personal guide, not legal or admissions
                advice.
              </p>
              <div className="site-foot__actions">
                <button type="button" className="link-btn" onClick={() => go('sources')}>
                  Sources
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
                <p className="drawer__eyebrow">Future Plan</p>
                <p className="drawer__title">Contents</p>
              </div>
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close contents" autoFocus>
                <Close />
              </button>
            </div>

            <div className="drawer__scroll">
              {done.length > 0 && (
                <button type="button" className="pickup" onClick={() => go(nextUp.id)}>
                  <span className="pickup__label">Pick up where you left off</span>
                  <span className="pickup__title">{nextUp.label}</span>
                  <span className="pickup__meta">
                    {nextUp.num} · {nextUp.time} · {nextUp.gist}
                  </span>
                  <ArrowRight className="pickup__arrow" />
                </button>
              )}

              <div className="drawer__progress">
                <div className="drawer__bar" aria-hidden="true">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <p>
                  {done.length} of {SECTIONS.length} read
                </p>
              </div>

              <button type="button" className="drawer__search" onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}>
                <Search />
                <span>Search the guide</span>
              </button>

              {GROUPS.map((group) => {
                const items = SECTIONS.filter((s) => s.priority === group.key);
                if (items.length === 0) return null;
                return (
                  <section key={group.key} className="drawer__group">
                    <p className="drawer__group-label">{group.label}</p>
                    {group.note ? <p className="drawer__group-note">{group.note}</p> : null}
                    {items.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`drawer__item ${s.id === active ? 'is-active' : ''}`}
                        onClick={() => go(s.id)}
                      >
                        <span className="drawer__num" aria-hidden="true">
                          {done.includes(s.id) ? <Check /> : s.num}
                        </span>
                        <span className="drawer__item-text">
                          <span className="drawer__item-label">{s.label}</span>
                          <span className="drawer__item-gist">{s.gist}</span>
                        </span>
                        <span className="drawer__time">{s.time}</span>
                      </button>
                    ))}
                  </section>
                );
              })}

              <div className="drawer__tools">
                <button type="button" className="drawer__tool" onClick={() => {
                  setMenuOpen(false);
                  setNotesOpen(true);
                }}>
                  <Note />
                  <span>Your notes</span>
                  {notes ? <span className="dot" aria-label="Has notes" /> : null}
                </button>
                <button type="button" className="drawer__tool" onClick={toggle}>
                  {theme === 'dark' ? <Sun /> : <Moon />}
                  <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                </button>
                {installable && (
                  <button type="button" className="drawer__tool" onClick={startInstall}>
                    <Install />
                    <span>Install app</span>
                  </button>
                )}
              </div>

              <p className="drawer__foot">Checked {PROFILE.checked}. Not legal or admissions advice.</p>
            </div>
          </div>
          <button type="button" className="overlay__scrim" aria-label="Close contents" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onPick={go} />}

      {installOpen && (
        <div className="overlay overlay--center" role="dialog" aria-modal="true" aria-label="Install Future Plan" onKeyDown={trapTab}>
          <button type="button" className="overlay__scrim overlay__scrim--first" aria-label="Close install help" onClick={() => setInstallOpen(false)} />
          <div className="install-sheet">
            <div className="install-sheet__head">
              <span className="install-sheet__mark" aria-hidden="true">
                <Install />
              </span>
              <button type="button" className="icon-btn" onClick={() => setInstallOpen(false)} aria-label="Close install help" autoFocus>
                <Close />
              </button>
            </div>
            <p className="install-sheet__eyebrow">Install</p>
            <h2 className="install-sheet__title">Keep it on your home screen</h2>
            <p className="install-sheet__text">
              {ios
                ? 'On iPhone and iPad, install happens in Safari. Open this page there, then add it to your home screen.'
                : 'Your browser can keep this guide one tap away, and it will open without the address bar.'}
            </p>
            <ol className="install-steps">
              {(ios
                ? ['Tap the Share button in Safari.', 'Scroll down and choose Add to Home Screen.', 'Tap Add.']
                : ['Open your browser menu.', 'Choose Install app or Add to Home Screen.', 'Confirm the install.']
              ).map((step, i) => (
                <li key={step} className="install-step">
                  <span className="install-step__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="install-sheet__note">It opens full screen and works offline after the first visit.</p>
            <button type="button" className="btn btn--solid btn--wide" onClick={() => setInstallOpen(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

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
