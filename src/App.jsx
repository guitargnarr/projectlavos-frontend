import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://projectlavos-backend.onrender.com'

function App() {
  return (
    <div className="app">
      <Hero />
      <StatsSection />
      <Demos />
      <PortfolioPreview />
      <About />
      <Footer />
    </div>
  )
}

function Hero() {
  return (
    <header className="hero">
      <h1>Matthew Scott</h1>
      <p className="tagline">AI Consultant • Louisville, KY</p>
      <p className="mission">Practical AI tools for real business problems</p>
      <div className="proof-links">
        <a href="https://jaspermatters.com" target="_blank" rel="noopener noreferrer">
          Portfolio: jaspermatters.com
        </a>
        <span className="separator">•</span>
        <a href="https://github.com/guitargnarr" target="_blank" rel="noopener noreferrer">
          GitHub: guitargnarr
        </a>
      </div>
    </header>
  )
}

function StatsSection() {
  const [counts, setCounts] = useState({
    demos: 0,
    response: 0,
    projects: 0
  })

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setCounts({
        demos: Math.round(4 * progress),
        response: Math.round(100 * progress),
        projects: Math.round(8 * progress)
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="stats-section">
      <div className="stats-grid">
        <StatCard number={counts.demos} label="Live Demos" icon="⚡" />
        <StatCard number={`<${counts.response}ms`} label="Response Time" icon="🚀" />
        <StatCard number={counts.projects} label="GitHub Projects" icon="💼" />
        <StatCard number="Louisville" label="Local Focus" icon="📍" />
      </div>
    </section>
  )
}

function StatCard({ number, label, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Demos() {
  return (
    <section className="demos">
      <h2>Try the Demos</h2>
      <p className="demos-intro">Interactive demonstrations of AI capabilities for Louisville businesses</p>

      <SentimentDemo />
      <LeadScoringDemo />
      <PhishingDemo />
      <PromptEngineeringDemo />
      <JobTrackerDemo />
    </section>
  )
}

function SentimentDemo() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async () => {
    if (!text.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/sentiment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError({
        message: 'Demo server is waking up (first use takes ~30 seconds). Please try again in a moment.',
        canRetry: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-card">
      <h3>🎯 Sentiment Analysis</h3>
      <p className="demo-description">Understand what your customers are really saying</p>
      <p className="use-case">Use case: Restaurant reviews, customer feedback, social media</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter customer review or feedback... (e.g., 'This restaurant has amazing service!')"
        rows="4"
        className="demo-input"
      />

      <button onClick={analyze} disabled={loading || !text.trim()} className="demo-button">
        {loading ? (
          <>
            <svg className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Analyzing...
          </>
        ) : 'Analyze Sentiment'}
      </button>

      {error && (
        <div className="result error">
          <strong>⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={analyze} className="retry-button" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && !result.error && (
        <div className={`result sentiment-${result.sentiment} fade-in`}>
          <strong>Result:</strong> {result.sentiment.toUpperCase()} ({Math.round(result.confidence * 100)}% confidence)
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  )
}

function LeadScoringDemo() {
  const [lead, setLead] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const scoreLead = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError({
        message: 'Demo server is waking up. Please try again in a moment.',
        canRetry: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-card">
      <h3>📊 Lead Scoring</h3>
      <p className="demo-description">Prioritize your best prospects automatically</p>
      <p className="use-case">Use case: Real estate, B2B sales, any sales operation</p>

      <div className="form-grid">
        <input
          type="text"
          placeholder="Name *"
          value={lead.name}
          onChange={(e) => setLead({...lead, name: e.target.value})}
          className="demo-input"
        />
        <input
          type="email"
          placeholder="Email *"
          value={lead.email}
          onChange={(e) => setLead({...lead, email: e.target.value})}
          className="demo-input"
        />
        <input
          type="text"
          placeholder="Company"
          value={lead.company}
          onChange={(e) => setLead({...lead, company: e.target.value})}
          className="demo-input"
        />
        <input
          type="text"
          placeholder="Budget (e.g., 10k, 50k)"
          value={lead.budget}
          onChange={(e) => setLead({...lead, budget: e.target.value})}
          className="demo-input"
        />
        <input
          type="text"
          placeholder="Timeline (e.g., ASAP, this month)"
          value={lead.timeline}
          onChange={(e) => setLead({...lead, timeline: e.target.value})}
          className="demo-input full-width"
        />
      </div>

      <button
        onClick={scoreLead}
        disabled={loading || !lead.name || !lead.email}
        className="demo-button"
      >
        {loading ? (
          <>
            <svg className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Scoring...
          </>
        ) : 'Score Lead'}
      </button>

      {error && (
        <div className="result error">
          <strong>⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={scoreLead} className="retry-button" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && !result.error && (
        <div className={`result priority-${result.priority.toLowerCase()} fade-in`}>
          <strong>Priority: {result.priority}</strong> (Score: {result.score}/100)
          <p>{result.reasoning}</p>
          <p className="next-action"><strong>Next Action:</strong> {result.next_action}</p>
        </div>
      )}
    </div>
  )
}

function PhishingDemo() {
  const [email, setEmail] = useState({
    sender: '',
    subject: '',
    body: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const checkPhishing = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/phishing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(email)
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError({
        message: 'Demo server is waking up. Please try again in a moment.',
        canRetry: true
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-card">
      <h3>🛡️ Phishing Detection</h3>
      <p className="demo-description">Protect your team from email threats</p>
      <p className="use-case">Use case: Legal firms, financial services, any business with email risk</p>

      <input
        type="email"
        placeholder="From: sender@example.com"
        value={email.sender}
        onChange={(e) => setEmail({...email, sender: e.target.value})}
        className="demo-input"
      />
      <input
        type="text"
        placeholder="Subject: (e.g., 'Urgent: Verify your account')"
        value={email.subject}
        onChange={(e) => setEmail({...email, subject: e.target.value})}
        className="demo-input"
      />
      <textarea
        value={email.body}
        onChange={(e) => setEmail({...email, body: e.target.value})}
        placeholder="Email body... (e.g., 'Dear customer, click here to verify your account immediately')"
        rows="4"
        className="demo-input"
      />

      <button
        onClick={checkPhishing}
        disabled={loading || !email.sender || !email.subject || !email.body}
        className="demo-button"
      >
        {loading ? (
          <>
            <svg className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Checking...
          </>
        ) : 'Check for Phishing'}
      </button>

      {error && (
        <div className="result error">
          <strong>⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={checkPhishing} className="retry-button" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && !result.error && (
        <div className={`result risk-${result.risk_level.toLowerCase()} fade-in`}>
          <strong>Risk Level: {result.risk_level}</strong> ({Math.round(result.confidence * 100)}% confidence)
          <ul className="indicators">
            {result.indicators.map((indicator, i) => (
              <li key={i}>{indicator}</li>
            ))}
          </ul>
          <p className="recommendation"><strong>Recommendation:</strong> {result.recommendation}</p>
        </div>
      )}
    </div>
  )
}

function PromptEngineeringDemo() {
  const [formData, setFormData] = useState({
    technique: 'zero-shot',
    use_case: 'email',
    context: '',
    tone: 'professional'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('result')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    if (!formData.context.trim() || formData.context.length < 10) {
      setError({ message: 'Please provide at least 10 characters of context' })
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)
    setActiveTab('result')

    try {
      const response = await fetch(`${API_URL}/api/prompt-engineering`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError({
        message: 'Demo server is waking up (~30 seconds first use). Please try again.',
        canRetry: true
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const techniqueDescriptions = {
    'zero-shot': 'Direct instruction without examples - fastest approach',
    'few-shot': 'Include examples to guide output format and style',
    'chain-of-thought': 'Request step-by-step reasoning for complex tasks',
    'role-based': 'Assign expert persona for specialized content',
    'structured': 'Specify exact output format with clear schema'
  }

  return (
    <div className="demo-card prompt-demo">
      <h3>🧠 Prompt Engineering Playground</h3>
      <p className="demo-description">Advanced LLM prompt techniques demonstrated</p>
      <p className="use-case">Use case: Content generation, email drafting, report summaries</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Content Type:</label>
          <select
            value={formData.use_case}
            onChange={(e) => setFormData({...formData, use_case: e.target.value})}
            className="demo-input"
          >
            <option value="email">Email</option>
            <option value="blog">Blog Post</option>
            <option value="summary">Summary</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tone:</label>
          <select
            value={formData.tone}
            onChange={(e) => setFormData({...formData, tone: e.target.value})}
            className="demo-input"
          >
            <option value="professional">Professional</option>
            <option value="technical">Technical</option>
            <option value="casual">Casual</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Context (what to write about):</label>
        <textarea
          value={formData.context}
          onChange={(e) => setFormData({...formData, context: e.target.value})}
          placeholder="Example: Write an email to a client explaining a project delay due to supply chain issues. Keep it professional and reassuring."
          rows="3"
          className="demo-input"
        />
        <small className="char-count">{formData.context.length} / 2000 characters</small>
      </div>

      <div className="form-group technique-selector">
        <label>Prompt Engineering Technique:</label>
        <div className="technique-options">
          {Object.keys(techniqueDescriptions).map((tech) => (
            <label key={tech} className="technique-radio">
              <input
                type="radio"
                value={tech}
                checked={formData.technique === tech}
                onChange={(e) => setFormData({...formData, technique: e.target.value})}
              />
              <span className="technique-label">
                <strong>{tech.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</strong>
                <small>{techniqueDescriptions[tech]}</small>
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        disabled={loading || !formData.context.trim() || formData.context.length < 10}
        className="demo-button"
      >
        {loading ? (
          <>
            <svg className="inline w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Generating...
          </>
        ) : 'Generate & Explain'}
      </button>

      {error && (
        <div className="result error">
          <strong>⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={generate} className="retry-button" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="prompt-results fade-in">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'result' ? 'active' : ''}`}
              onClick={() => setActiveTab('result')}
            >
              📝 Generated Content
            </button>
            <button
              className={`tab ${activeTab === 'prompt' ? 'active' : ''}`}
              onClick={() => setActiveTab('prompt')}
            >
              🔧 Prompt Used
            </button>
            <button
              className={`tab ${activeTab === 'explanation' ? 'active' : ''}`}
              onClick={() => setActiveTab('explanation')}
            >
              💡 Technique Explained
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'result' && (
              <div className="tab-panel">
                <div className="content-header">
                  <strong>Technique: {result.technique_name}</strong>
                  <button
                    onClick={() => copyToClipboard(result.generated_content)}
                    className="copy-button"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className="generated-content">{result.generated_content}</div>
              </div>
            )}

            {activeTab === 'prompt' && (
              <div className="tab-panel">
                <div className="prompt-section">
                  <strong>System Message (Role Definition):</strong>
                  <pre className="prompt-code">{result.prompt_used.system}</pre>
                </div>
                <div className="prompt-section">
                  <strong>User Message (Task Instructions):</strong>
                  <pre className="prompt-code">{result.prompt_used.user}</pre>
                </div>
                <button
                  onClick={() => copyToClipboard(`System: ${result.prompt_used.system}\n\nUser: ${result.prompt_used.user}`)}
                  className="copy-button"
                >
                  {copied ? '✓ Copied!' : '📋 Copy Full Prompt'}
                </button>
              </div>
            )}

            {activeTab === 'explanation' && (
              <div className="tab-panel">
                <div className="explanation-content">
                  {result.explanation.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function PortfolioPreview() {
  return (
    <section className="portfolio-preview">
      <h2>Proven Work</h2>
      <p className="section-intro">
        Technical projects demonstrating AI/ML engineering capabilities
      </p>

      <div className="portfolio-grid">
        <PortfolioCard
          title="JasperMatters"
          url="https://jaspermatters.com"
          description="Full-stack ML platform with TensorFlow neural networks, semantic job search, and career insights"
          tech={["TensorFlow", "React", "FastAPI"]}
          metrics={["4,800 LOC", "134 Features", "3 ML Models"]}
          badge="LIVE SITE"
        />

        <PortfolioCard
          title="PhishGuard ML"
          url="https://github.com/guitargnarr/phishguard-ml"
          description="Production phishing detection API with 7-model ensemble and 2,039 engineered features"
          tech={["7 Models", "2,039 Features", "38/38 Tests"]}
          metrics={["<20ms", "FastAPI", "Docker Ready"]}
          badge="OPEN SOURCE"
        />

        <PortfolioCard
          title="Mirador"
          url="https://github.com/guitargnarr/mirador"
          description="Privacy-first AI orchestration framework for HIPAA-compliant workflows with 64 specialized agents"
          tech={["25K LOC", "64 Agents", "Ollama"]}
          metrics={["100% Local", "HIPAA Ready", "pip install"]}
          badge="PACKAGED"
        />

        <PortfolioCard
          title="Prompt Engineering Showcase"
          url="https://github.com/guitargnarr/prompt-engineering-showcase"
          description="Advanced LLM prompt techniques with real production examples. Interactive playground demonstrates zero-shot, few-shot, chain-of-thought, role-based, and structured output prompting"
          tech={["Zero-Shot", "Few-Shot", "Chain-of-Thought"]}
          metrics={["5 Techniques", "Live Demo", "Real Examples"]}
          badge="INTERACTIVE"
        />
      </div>
    </section>
  )
}

function PortfolioCard({ title, url, description, tech, metrics, badge }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="portfolio-card">
      <div className="badge">{badge}</div>
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <div className="tech-tags">
        {tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
      </div>
      {metrics && (
        <div className="metrics">
          {metrics.map(m => <span key={m} className="metric">{m}</span>)}
        </div>
      )}
      <span className="view-link">View Project →</span>
    </a>
  )
}

function About() {
  return (
    <section className="about">
      <h2>About</h2>
      <div className="about-content">
        <p>
          I'm <strong>Matthew Scott</strong>, a Louisville-based AI consultant. I help local businesses
          and individuals understand and implement AI tools that solve real problems.
        </p>
        <p>
          With 10 years of healthcare IT experience and proven ML engineering capabilities, I focus on
          practical AI applications - no hype, no inflated promises. Just tools that work.
        </p>
        <div className="proof-section">
          <h3>Why Work With Me</h3>
          <ul>
            <li>10 years healthcare IT experience (compliance-aware, HIPAA-familiar)</li>
            <li>Production ML systems deployed (TensorFlow, not just API wrappers)</li>
            <li>Privacy-first architecture (local AI, data protection)</li>
            <li>Louisville-based (local service, understand the market)</li>
          </ul>
        </div>
        <div className="contact-section">
          <h3>Get in Touch</h3>
          <p>Email: <a href="mailto:matthewdscott7@gmail.com">matthewdscott7@gmail.com</a></p>
          <p className="cta-text">Free 1-hour AI assessment for Louisville businesses</p>
        </div>
      </div>
    </section>
  )
}

function JobTrackerDemo() {
  return (
    <div className="demo-card">
      <h3>📊 Job Application Tracker</h3>
      <p className="demo-description">Full-stack application management with analytics</p>
      <p className="use-case">Use case: Enterprise CRUD operations, data visualization, real-time analytics</p>

      <div className="result">
        <div style={{ marginBottom: '1rem' }}>
          <strong>✨ Features:</strong>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Full CRUD operations (Create, Read, Update, Delete)</li>
            <li>Advanced filtering, search, and sorting</li>
            <li>Interactive data visualization charts</li>
            <li>Responsive design with Neubrutalism aesthetic</li>
            <li>FastAPI backend + React frontend</li>
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', color: 'white' }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem' }}>🎯 Live Demo Available</strong>
          <p style={{ marginBottom: '1rem', opacity: 0.9 }}>Interactive demo showcasing full-stack development capabilities</p>
          <a
            href="https://jobtracker-frontend-psi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="demo-button"
            style={{ background: 'white', color: '#667eea', display: 'inline-block', padding: '0.75rem 1.5rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Launch Job Tracker →
          </a>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6c757d' }}>
          <strong>Tech Stack:</strong> React, FastAPI, Vite, Tailwind CSS v4, Framer Motion
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Matthew Scott</h4>
          <p>AI Consultant</p>
          <p>Louisville, Kentucky</p>
        </div>

        <div className="footer-section">
          <h4>Portfolio</h4>
          <a href="https://jaspermatters.com" target="_blank" rel="noopener noreferrer">JasperMatters</a>
          <a href="https://github.com/guitargnarr/phishguard-ml" target="_blank" rel="noopener noreferrer">PhishGuard ML</a>
          <a href="https://github.com/guitargnarr/mirador" target="_blank" rel="noopener noreferrer">Mirador</a>
          <a href="https://github.com/guitargnarr" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <a href="mailto:matthewdscott7@gmail.com">matthewdscott7@gmail.com</a>
          <p>Free 1-hour assessment</p>
          <p>Louisville, KY</p>
        </div>

        <div className="footer-section">
          <h4>Built With</h4>
          <p>React + Vite</p>
          <p>FastAPI + Python</p>
          <p>Vercel + Render</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Matthew Scott. All rights reserved.</p>
        <p>Project Lavos - Practical AI for Louisville businesses</p>
      </div>
    </footer>
  )
}

export default App
