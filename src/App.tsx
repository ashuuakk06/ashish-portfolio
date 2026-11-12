import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Download, Code2, Database, Server, Terminal, MapPin, GraduationCap,
  Award, Check, MoveUpRight, BriefcaseBusiness, Phone
} from 'lucide-react'

const profile = {
  email: 'ashishpagariya0608@gmail.com',
  phone: '+917014133209',
  github: 'https://github.com/ashuuakk06',
  linkedin: 'https://linkedin.com/in/ashish-pagariya06',
  location: 'Greater Noida, Uttar Pradesh, India',
}

const skills = [
  { title: 'Languages', icon: Code2, items: ['Java', 'C++', 'JavaScript', 'TypeScript', 'Python'] },
  { title: 'Backend', icon: Server, items: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'JWT Authentication'] },
  { title: 'Frontend', icon: Terminal, items: ['React', 'HTML5', 'CSS3'] },
  { title: 'Databases', icon: Database, items: ['PostgreSQL', 'Redis'] },
  { title: 'Tools', icon: BriefcaseBusiness, items: ['Git', 'GitHub', 'Maven', 'Docker', 'Docker Compose'] },
]

const projects = [
  {
    number: '01', name: 'TrustForge', type: 'HACKATHON JUDGING PLATFORM', status: 'Hackathon build',
    description: 'A platform for running a hackathon from project submission to published results. Participants submit their work, organizers assign judges, and judges evaluate projects with a shared rubric.',
    points: ['Conflict-aware judge assignment with workload balancing.', 'Z-score normalization compares evaluations across judges.', 'JWT authentication, role-based access, and a SHA-256 hash-chained audit log.'],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'React', 'TypeScript'],
    github: 'https://github.com/ashuuakk06/trustforge', kind: 'trust',
  },
  {
    number: '02', name: 'QueueForge', type: 'DISTRIBUTED JOB EXECUTION ENGINE', status: 'Built',
    description: 'A backend job-processing system for submitting, scheduling, and executing tasks with separate worker processes.',
    points: ['PostgreSQL tracks jobs and execution history.', 'Redis coordinates work between the API and worker processes.', 'Supports job dependencies, retries, and failure recovery.'],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    github: 'https://github.com/ashuuakk06/QueueForge', kind: 'queue',
  },
  {
    number: '03', name: 'SpringSentry-AI', type: 'JAVA DEBUGGING ASSISTANT', status: 'Built',
    description: 'An AI-assisted debugging tool that accepts Java stack traces and returns explanations with suggested troubleshooting steps.',
    points: ['Connects to a backend AI API to analyze errors.', 'Uses JWT authentication and BCrypt password hashing.', 'Keeps per-user analysis history and includes a JUnit sample project.'],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'React', 'TypeScript', 'PostgreSQL'],
    github: 'https://github.com/ashuuakk06/SpringSentry-AI', kind: 'sentry',
  },
]

const achievements = [
  ['Dogfood 2026', 'Hackathon Raptors — built TrustForge for the hackathon.'],
  ['Zero Dependency · 72-hour hackathon', 'Built and submitted SafeShare; received a score of 4.43/5.'],
]
const certifications = [
  'IBM Java Developer Professional Certificate — Coursera, 2026',
  'Back-End APIs — IBM SkillsBuild, 2026',
  'Deloitte Data Analytics Job Simulation — Forage, 2026',
]

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
}
const stagger = { show: { transition: { staggerChildren: 0.11 } } }

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function SectionHeading({ number, label, title, note }: { number: string; label: string; title: string; note: string }) {
  return <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
    <div className="eyebrow"><span>{number}</span><i />{label}</div>
    <h2>{title}<span className="period">.</span></h2>
    <p>{note}</p>
  </motion.div>
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'trust') return <div className="project-visual trust-visual"><div className="mock-top"><span>trustforge / judging</span><span className="mock-live">● PROJECT</span></div><div className="mock-title">Hackathon judging</div><div className="workflow-list"><span><b>01</b> Project submissions</span><span><b>02</b> Judge assignment</span><span><b>03</b> Evaluations & results</span></div><div className="mock-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="mock-bottom"><span>Evaluation workflow</span><b>Shared rubric</b></div></div>
  if (kind === 'queue') return <div className="project-visual queue-visual"><div className="mock-top"><span>queueforge / workers</span><span className="mock-live">● JOB FLOW</span></div><div className="queue-flow"><div className="queue-node"><Database /><b>Jobs</b><small>PostgreSQL</small></div><ArrowRight /><div className="queue-node active-node"><Code2 /><b>Queue</b><small>Redis</small></div><ArrowRight /><div className="queue-node"><Server /><b>Worker</b><small>Execution</small></div></div><div className="worker-lines"><i /><i /><i /></div><div className="mock-bottom"><span>Task processing</span><b>Retries · Dependencies</b></div></div>
  return <div className="project-visual sentry-visual"><div className="mock-top"><span>springsentry / analyze</span><span className="mock-review">● JAVA</span></div><div className="schema-code"><div><em>01</em><span className="code-red">StackTrace</span> input</div><div><em>02</em><span className="code-red">AI analysis</span> response</div><div className="schema-warning"><span>✓</span><div><b>Explanation & next steps</b><small>Analysis history saved</small></div></div></div><div className="mock-bottom"><span>Debugging workflow</span><b>Java assistant</b></div></div>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 700], [0, 85])
  const links = ['About', 'Skills', 'Projects', 'Journey', 'Contact']

  useEffect(() => {
    const nodes = links.map(link => document.getElementById(link.toLowerCase())).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (current) setActive(current.target.id)
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.2, 0.5, 0.8] })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return <div className="site-shell">
    <ScrollProgress />
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="site-header wrap">
      <a className="wordmark" href="#home" aria-label="Ashish home"><span className="mark">A</span><span>ashish<span className="mark-dot">.</span></span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
        {links.map(link => <a key={link} className={active === link.toLowerCase() ? 'nav-active' : ''} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{link}</a>)}
        <a className="resume-link" href="/Ashish-Pagariya-Resume.pdf" download><Download size={15} /> Resume</a>
      </nav>
    </header>

    <main>
      <section className="hero wrap" id="home">
        <div className="hero-copy">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div className="availability" variants={reveal}><span /> OPEN TO INTERNSHIP OPPORTUNITIES</motion.div>
            <motion.p className="hello" variants={reveal}>Hey, I'm <strong>Ashish Pagariya.</strong></motion.p>
            <motion.h1 variants={reveal}>I build things<br /><span>for the web<span className="hero-asterisk">✳</span></span></motion.h1>
            <motion.p className="hero-description" variants={reveal}>I'm a BTech student focused on backend development and full-stack projects. I enjoy building useful software, from dependable APIs to thoughtful interfaces.</motion.p>
            <motion.div className="hero-actions" variants={reveal}>
              <a className="button button-dark" href="#projects">See what I've built <ArrowUpRight size={17} /></a>
              <a className="text-link" href={`mailto:${profile.email}`}>Get in touch <ArrowRight size={16} /></a>
            </motion.div>
            <motion.div className="hero-meta" variants={reveal}><span><MapPin size={14} /> {profile.location}</span><span className="meta-divider" /><span>BTech · Class of 2028</span></motion.div>
          </motion.div>
        </div>
        <motion.div className="hero-visual" style={{ y: heroY }} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} aria-label="Developer profile graphic">
          <div className="hero-visual-top"><span>ASHISH PAGARIYA / DEVELOPER</span><span>AP<span className="mark-dot">.</span></span></div>
          <div className="hero-visual-core"><span className="hero-visual-orbit orbit-one" /><span className="hero-visual-orbit orbit-two" /><span className="hero-visual-orbit orbit-three" /><b>AP<span>.</span></b><i className="visual-node node-java">Java</i><i className="visual-node node-api">APIs</i><i className="visual-node node-web">Web</i></div>
          <div className="hero-visual-caption"><span>BUILDING WITH</span><strong>Java · Spring Boot · React</strong></div>
          <div className="hero-visual-bottom"><span><i /> OPEN TO INTERNSHIP OPPORTUNITIES</span><span>2028</span></div>
        </motion.div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        <div className="hero-index">01 / 05</div>
      </section>

      <div className="ticker" aria-label="Technologies"><div className="ticker-track">{Array.from({ length: 2 }).flatMap((_, i) => ['JAVA', 'SPRING BOOT', 'REACT', 'POSTGRESQL', 'PYTHON', 'DOCKER'].map((item, j) => <span key={`${i}-${j}`}>{item}<i>✳</i></span>))}</div></div>

      <section className="wrap section about-section" id="about">
        <SectionHeading number="01" label="A LITTLE INTRODUCTION" title="Not just the code." note="A bit about what I do and what I'm working towards." />
        <div className="about-grid">
          <motion.div className="about-main" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="large-copy">I'm pursuing a <em>BTech</em> and building full-stack projects with a focus on backend systems.</p>
            <p>My projects bring together APIs, databases, and frontend interfaces. I enjoy working through the details that make software clear to use and reliable behind the scenes.</p>
            <p>Outside projects, I'm working on my problem-solving skills and building a stronger understanding of core computer science subjects.</p>
            <div className="education-line"><GraduationCap /><div><b>Education</b><span>BTech · 2024–2028</span></div></div>
          </motion.div>
          <motion.aside className="about-aside" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="aside-note">CURRENT FOCUS <span>↘</span></div><h3>Backend development</h3><p>Java · Spring Boot · PostgreSQL</p>
            <div className="aside-rule" /><div className="aside-note">ALSO EXPLORING</div><h3>Full-stack projects</h3><p>React · TypeScript · Docker</p>
            <div className="hand-note">Still learning.<br />Still building. <span>↗</span></div>
          </motion.aside>
        </div>
      </section>

      <section className="skills-band" id="skills"><div className="wrap section">
        <SectionHeading number="02" label="MY TOOLKIT" title="Tools I work with." note="A focused set of technologies I use to build backend and full-stack projects." />
        <motion.div className="skills-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          {skills.map(({ title, icon: Icon, items }, index) => <motion.article className="skill-card" variants={reveal} key={title}><div className="skill-card-head"><span>0{index + 1}</span><Icon size={20} /></div><h3>{title}</h3><div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div></motion.article>)}
        </motion.div>
        <div className="coursework"><span>CORE COURSEWORK</span><p>Data Structures & Algorithms <i /> Object-Oriented Programming <i /> Database Management Systems <i /> Operating Systems <i /> Computer Networks</p></div>
      </div></section>

      <section className="wrap section projects-section" id="projects">
        <SectionHeading number="03" label="SELECTED WORK" title="Things I've built." note="Projects in backend systems, hackathon tooling, and developer experience." />
        <div className="projects-list">{projects.map(project => <motion.article className={`project-row ${project.kind}`} key={project.number} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }}>
          <div className="project-visual-wrap"><ProjectVisual kind={project.kind} /><span className="visual-index">PROJECT / {project.number}</span></div>
          <div className="project-content"><div className="project-topline"><span>{project.type}</span><span className={project.status === 'In progress' ? 'project-status progress' : 'project-status'}><i />{project.status}</span></div>
            <h3>{project.name}<span>.</span></h3><p className="project-description">{project.description}</p>
            <ul className="project-points">{project.points.map(point => <li key={point}><Check size={15} />{point}</li>)}</ul>
            <div className="project-footer"><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>{project.github ? <a href={project.github} target="_blank" rel="noreferrer" className="project-link">GitHub <MoveUpRight size={16} /></a> : <span className="repo-unlisted">Repository link not listed</span>}</div>
          </div>
        </motion.article>)}</div>
      </section>

      <section className="journey-band" id="journey"><div className="wrap section">
        <SectionHeading number="04" label="THE JOURNEY SO FAR" title="Learning by doing." note="Education, hackathons, and certifications." />
        <div className="journey-grid">
          <div className="journey-column"><h3><GraduationCap /> Education</h3><div className="timeline-item"><span className="timeline-date">2024 — 2028</span><h4>BTech</h4></div></div>
          <div className="journey-column"><h3><Award /> Involvement & milestones</h3>{achievements.map(([title, detail]) => <div className="milestone" key={title}><span className="milestone-dot" /><div><h4>{title}</h4><p>{detail}</p></div></div>)}</div>
        </div>
        <div className="certifications"><h3><BriefcaseBusiness /> Certifications</h3><div className="cert-list">{certifications.map(cert => <div key={cert}><Check size={15} />{cert}</div>)}</div></div>
      </div></section>

      <section className="wrap section contact-section" id="contact">
        <motion.div className="contact-card" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div className="contact-top"><span>05 / SAY HELLO</span><span>OPEN TO INTERNSHIP OPPORTUNITIES</span></div>
          <h2>Have something<br />in mind<span>?</span></h2>
          <p>I'm looking for opportunities to learn, contribute, and work with people building useful software. Feel free to reach out.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <MoveUpRight /></a>
          <div className="contact-bottom"><span><MapPin size={14} /> {profile.location}</span><div><a href={`tel:${profile.phone}`}><Phone /> Phone</a><a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a><a href={`mailto:${profile.email}`}><Mail /> Email</a></div></div>
        </motion.div>
      </section>
    </main>

    <footer className="site-footer wrap"><a className="wordmark" href="#home"><span className="mark">A</span><span>ashish<span className="mark-dot">.</span></span></a><span>Made by Ashish Pagariya · © {new Date().getFullYear()}</span><a href="#home">Back to top ↑</a></footer>
  </div>
}
