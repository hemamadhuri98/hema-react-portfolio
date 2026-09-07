import React, { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight, Bot, Check, ChevronRight, Code2, Download, ExternalLink, Github,
  GraduationCap, Heart, Linkedin, Mail, MapPin, Menu, Moon, Send, Sparkles, Star,
  Sun, X, GitFork, CalendarDays, Activity, Layers3
} from 'lucide-react';
import { assistantKnowledge, certifications, experience, profile, projectHighlights, skills, stats } from './data';
import { getEvents, getReadmeImages, getRepos, githubEventLabel, type GithubEvent, type GithubRepo } from './github';

type Theme = 'dark' | 'light';
type ChatMessage = { role: 'user' | 'assistant'; text: string };

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value));
}

function answerQuestion(question: string, repos: GithubRepo[]) {
  const q = question.toLowerCase();
  const match = assistantKnowledge.find(item => item.keywords.some(k => q.includes(k)));
  if (match) return match.answer;
  if (q.includes('project')) return `Hema's highlighted work includes the Volumetric Incentive Program, IBM Portlet → FOSS migration, an IoT Leaflet mapping application, and enterprise dashboards/dynamic forms. Her live GitHub section currently exposes ${repos.length} public non-fork repositories.`;
  if (q.includes('hire') || q.includes('why')) return 'Hema combines enterprise React delivery with modernization experience: legacy migration, reusable UI architecture, complex workflows, role-based behaviour, performance optimization and stakeholder collaboration.';
  if (q.includes('contact')) return 'The quickest options are email at hemamadhurijanapamula@gmail.com or LinkedIn via the contact section.';
  return 'I can tell you about Hema’s React skills, TCS experience, legacy modernization, Leaflet/IoT work, Capgemini NLP/search work, certifications, GitHub repositories, or how to contact her.';
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('hema-theme') as Theme) || 'dark');
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [repoLoading, setRepoLoading] = useState(true);
  const [githubError, setGithubError] = useState('');
  const [screenshots, setScreenshots] = useState<Record<number, string[]>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(typeof projectHighlights)[number] | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Hi! I’m Ask Hema 👋 Ask me about Hema’s React experience, projects, GitHub, skills or hiring fit.' }
  ]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('hema-theme', theme);
  }, [theme]);

  useEffect(() => {
    let alive = true;
    Promise.all([getRepos(), getEvents()])
      .then(([repoData, eventData]) => {
        if (!alive) return;
        setRepos(repoData);
        setEvents(eventData);
        setGithubError('');
        setRepoLoading(false);
        repoData.slice(0, 6).forEach(async repo => {
          const images = await getReadmeImages(repo);
          if (alive && images.length) setScreenshots(prev => ({ ...prev, [repo.id]: images }));
        });
      })
      .catch(() => {
        if (!alive) return;
        setGithubError('GitHub data could not be loaded right now. The portfolio still works with the curated project section.');
        setRepoLoading(false);
      });
    return () => { alive = false; };
  }, []);

  const languageSummary = useMemo(() => {
    const counts = repos.reduce<Record<string, number>>((acc, repo) => {
      if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [repos]);

  const sendChat = (text = chatInput) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages(prev => [...prev, { role: 'user', text: clean }, { role: 'assistant', text: answerQuestion(clean, repos) }]);
    setChatInput('');
  };

  const nav = ['About', 'Experience', 'Projects', 'GitHub', 'Contact'];

  return (
    <div className="app-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)}><span>HM</span><strong>Hema.</strong></a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          </div>
          <div className="nav-actions">
            <button className="icon-button" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <a className="nav-cta" href={profile.linkedin} target="_blank" rel="noreferrer">Let’s connect <ArrowUpRight size={15}/></a>
            <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} className="eyebrow"><span className="status-dot"/> Available for frontend opportunities</motion.div>
            <motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.1}}>I build <em>React experiences</em> that make complex products feel simple.</motion.h1>
            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.18}}>{profile.tagline}</motion.p>
            <div className="hero-buttons">
              <a className="primary-button" href="#projects">Explore work <ArrowUpRight size={18}/></a>
              <a className="secondary-button" href={profile.resume} target="_blank" rel="noreferrer"><Download size={17}/> Resume</a>
            </div>
            <div className="social-row">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a>
              <a href={`mailto:${profile.email}`}><Mail size={17}/> Email</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="orb orb-a"/><div className="orb orb-b"/>
            <motion.div className="code-card" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{delay:.25}}>
              <div className="window-dots"><i/><i/><i/></div>
              <div className="code-line dim">const <b>developer</b> = &#123;</div>
              <div className="code-line"> name: <span>"Hema Madhuri"</span>,</div>
              <div className="code-line"> stack: [<span>"React"</span>, <span>"TS"</span>],</div>
              <div className="code-line"> focus: <span>"Enterprise UX"</span>,</div>
              <div className="code-line"> mindset: <span>"Build • Learn • Ship"</span></div>
              <div className="code-line dim">&#125;;</div>
              <div className="mini-terminal"><span>✓</span> portfolio.build() <small>ready</small></div>
            </motion.div>
          </div>
        </section>

        <section className="stats-strip container">
          {stats.map(([value,label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </section>

        <section className="section container" id="about">
          <SectionHeading kicker="01 / About" title="A frontend engineer who enjoys untangling complexity." />
          <div className="about-grid">
            <div className="about-copy">
              <p>I am a React-focused frontend developer with enterprise delivery experience across automotive and aerospace environments. My work combines modernization, reusable UI architecture, state management and practical product thinking.</p>
              <p>I have worked on legacy migrations, complex workflow applications, dynamic forms, role-based interfaces, dashboards, IoT mapping and search-oriented experiences.</p>
              <div className="pill-row"><span>React 18</span><span>TypeScript</span><span>Redux Toolkit</span><span>Enterprise UX</span></div>
            </div>
            <div className="principles">
              {['Component thinking over duplication', 'Performance without sacrificing clarity', 'UI behaviour grounded in business rules', 'Clean handoffs with stakeholders'].map((x,i) => <div className="principle" key={x}><span>0{i+1}</span><p>{x}</p><Check size={17}/></div>)}
            </div>
          </div>
        </section>

        <section className="section container" id="experience">
          <SectionHeading kicker="02 / EXPERIENCE" title="Enterprise experience, real business problems." />
          <div className="timeline">
            {experience.map((item, index) => <motion.article className="timeline-item" key={item.company} initial={{opacity:0,x:-15}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.2}} transition={{delay:index*.06}}>
              <div className="timeline-marker">{index + 1}</div>
              <div className="timeline-content">
                <div className="timeline-top">
                  <div><h3>{item.company}</h3><p>{item.role}</p></div><span>{item.period}</span>
                </div>
                <div className="experience-details">
                  {item.projects.map(project => <div className="sub-project" key={project.name}>
                    <h4>{project.name} <small>{project.period}</small></h4>
                    <ul>{project.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>)}
                </div>
              </div>
            </motion.article>)}
          </div>
        </section>
        <section className="section container" id="projects">
          <SectionHeading kicker="03 / Selected Work" title="Projects that show how I think, not just what I code." />
          <div className="project-grid">
            {projectHighlights.map((project,index) => <motion.article className="project-card" key={project.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}}>
              <div className="project-number">0{index+1}</div><div className="project-icon"><Layers3 size={21}/></div><span className="project-company">{project.company}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(t=><span key={t}>{t}</span>)}</div><button className="case-study-link" onClick={() => setSelectedProject(project)}>View case study <ArrowUpRight size={16}/></button>
            </motion.article>)}
          </div>
        </section>

        <section className="section container" id="github">
          <SectionHeading kicker="04 / GitHub" title="My public code, loaded live from GitHub." action={<a className="text-link" href={profile.github} target="_blank" rel="noreferrer">Open profile <ArrowUpRight size={16}/></a>} />
          {githubError && <div className="notice">{githubError}</div>}
          <div className="github-overview">
            <div className="github-card hero-github"><div className="github-icon"><Github size={26}/></div><div><span>Public repositories</span><strong>{repoLoading ? '…' : repos.length}</strong></div><a href={profile.github} target="_blank" rel="noreferrer"><ExternalLink size={16}/></a></div>
            <div className="github-card"><div className="github-icon"><Star size={23}/></div><div><span>Total stars</span><strong>{repos.reduce((n,r)=>n+r.stargazers_count,0)}</strong></div></div>
            <div className="github-card"><div className="github-icon"><GitFork size={23}/></div><div><span>Total forks</span><strong>{repos.reduce((n,r)=>n+r.forks_count,0)}</strong></div></div>
            <div className="github-card"><div className="github-icon"><Code2 size={23}/></div><div><span>Top languages</span><strong>{languageSummary[0]?.[0] || 'React'}</strong></div></div>
          </div>

          <div className="repo-grid">
            {repoLoading ? [...Array(6)].map((_,i)=><div className="skeleton repo-card" key={i}/>) : repos.slice(0,9).map(repo => <article className="repo-card" key={repo.id}>
              <div className="repo-head"><Github size={18}/><a href={repo.html_url} target="_blank" rel="noreferrer"><ExternalLink size={15}/></a></div>
              <h3>{repo.name}</h3><p>{repo.description || 'Public GitHub repository by Hema Madhuri Janapamula.'}</p>
              <div className="repo-meta"><span>{repo.language || 'Code'}</span><span><Star size={14}/>{repo.stargazers_count}</span><span><GitFork size={14}/>{repo.forks_count}</span></div>
              <small>Updated {formatDate(repo.updated_at)}</small>
            </article>)}
          </div>

          <div className="screenshot-section">
            <div className="subheading"><div><span>README project visuals</span><h3>Real screenshots from public repositories</h3></div><p>The site reads README image links from GitHub at runtime, so screenshots stay tied to the source repositories.</p></div>
            <div className="screenshot-grid">
              {Object.entries(screenshots).flatMap(([id, imgs]) => imgs.slice(0,2).map((src,i)=><a className="screenshot-card" href={src} target="_blank" rel="noreferrer" key={`${id}-${i}`}><img src={src} alt="Project screenshot from GitHub README" loading="lazy"/><span><Github size={14}/> GitHub README image <ExternalLink size={14}/></span></a>))}
              {!Object.keys(screenshots).length && !repoLoading && <div className="empty-state"><Activity size={22}/><p>No README screenshots were detected in the first public repositories. Add images to a project README and they will appear here automatically.</p></div>}
            </div>
          </div>

          <div className="activity-section">
            <div className="subheading"><div><span>Live activity</span><h3>Recent GitHub events</h3></div><p>Public GitHub events are fetched live when the portfolio loads.</p></div>
            <div className="activity-list">
              {events.slice(0,8).map(event => <div className="activity-item" key={event.id}><div className="activity-dot"><Activity size={14}/></div><div><strong>{githubEventLabel(event)}</strong><span><CalendarDays size={13}/> {formatDate(event.created_at)}</span></div></div>)}
              {!events.length && !repoLoading && <div className="empty-state"><Activity size={22}/><p>No recent public events are available right now.</p></div>}
            </div>
          </div>
        </section>

        <section className="section container" id="education">
          <SectionHeading kicker="05 / Education & Skills" title="A toolkit that spans UI engineering and data-aware products." />
          <div className="education-grid">
            <div className="education-card"><GraduationCap size={24}/><span>Education</span><h3>B.Tech · Electronics & Communication Engineering</h3><p>Vishnu Institute of Technology · 2015 — 2019</p><strong>ECE · 78.9%</strong></div>
            <div className="education-card"><Sparkles size={24}/><span>Certifications</span><div className="cert-list">{certifications.map(c=><div key={c}><Check size={14}/>{c}</div>)}</div></div>
            <div className="education-card skills-card"><Code2 size={24}/><span>Core toolkit</span><div className="skill-cloud">{skills.map(s=><span key={s}>{s}</span>)}</div></div>
          </div>
        </section>

        <section className="contact-section container" id="contact">
          <div className="contact-card"><div><span className="eyebrow">06 / Contact</span><h2>Have a frontend challenge worth solving?</h2><p>Let’s talk about React, modernization, enterprise UX or the next product you’re building.</p></div><div className="contact-actions"><a className="primary-button" href={`mailto:${profile.email}`}>Email Hema <Mail size={17}/></a><a className="secondary-button" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Linkedin size={17}/></a></div></div>
        </section>
      </main>

      <footer className="footer container"><span>© {new Date().getFullYear()} Hema Madhuri Janapamula</span><span>Built with React · TypeScript · Framer Motion</span><a href="#top">Back to top ↑</a></footer>

      <button className="ask-fab" onClick={() => setChatOpen(true)}><Bot size={20}/><span>Ask Hema</span><Sparkles size={14}/></button>
      <AnimatePresence>{selectedProject && <motion.div className="case-study-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelectedProject(null)}><motion.div className="case-study-modal" initial={{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.98}} onClick={e => e.stopPropagation()}><div className="case-study-head"><div><span>{selectedProject.company}</span><h3>{selectedProject.title}</h3></div><button onClick={() => setSelectedProject(null)} aria-label="Close case study"><X size={18}/></button></div><p>{selectedProject.description}</p><div className="case-study-section"><span>Technology</span><div className="tag-list">{selectedProject.tags.map(t=><span key={t}>{t}</span>)}</div></div><div className="case-study-section"><span>What I worked on</span><p>{selectedProject.title === 'Volumetric Incentive Program' ? 'Modernized legacy workflow screens in React 18, with Redux-driven state, role-aware UI behaviour, rendering optimization and French localization.' : selectedProject.title === 'IBM Portlet → FOSS Migration' ? 'Modernized 14 legacy IBM Portal MVC/Portlet applications, migrating frontend functionality from JavaScript/jQuery to React 18 and coordinating requirements through JIRA.' : selectedProject.title === 'IoT Floorplan & Device Tracking' ? 'Built an interactive Leaflet experience for IoT/RFID device tracking, floorplan mapping, configuration, CRUD workflows, alerts and real-time status.' : 'Built reusable React, Redux and Material UI modules, dynamic forms with validation and RBAC, plus Highcharts dashboards and automated tests.'}</p></div></motion.div></motion.div>}</AnimatePresence>
      <AnimatePresence>{chatOpen && <motion.div className="chat-panel" initial={{opacity:0,y:25,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:25,scale:.97}}>
        <div className="chat-head"><div><span><Bot size={16}/> Portfolio AI</span><strong>Ask Hema</strong></div><button onClick={()=>setChatOpen(false)}><X size={18}/></button></div>
        <div className="quick-prompts">{['What is Hema’s React experience?','Tell me about the IoT project','Why should I hire Hema?'].map(q=><button key={q} onClick={()=>sendChat(q)}>{q}</button>)}</div>
        <div className="chat-body">{messages.map((m,i)=><div className={`message ${m.role}`} key={i}><span>{m.role === 'assistant' ? <Bot size={14}/> : 'You'}</span><p>{m.text}</p></div>)}</div>
        <div className="chat-input"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')sendChat()}} placeholder="Ask about skills, projects..."/><button onClick={()=>sendChat()} aria-label="Send"><Send size={17}/></button></div>
        <small className="chat-note">Grounded in Hema’s portfolio data + live GitHub repositories.</small>
      </motion.div>}</AnimatePresence>
    </div>
  );
}

function SectionHeading({ kicker, title, action }: { kicker: string; title: string; action?: ReactNode }) {
  return <div className="section-heading"><div><span className='section-kicker'>{kicker}</span><h2>{title}</h2></div>{action}</div>;
}

export default App;
