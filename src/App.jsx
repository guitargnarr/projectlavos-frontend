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
    <header className="bg-lavos-blue text-white py-20 px-6 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-8 left-8 w-24 h-24 bg-lavos-orange rounded-full opacity-10"></div>
      <div className="absolute bottom-8 right-8 w-40 h-40 bg-lavos-green rounded-full opacity-10"></div>

      {/* Main content - flex column for proper stacking */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">

        {/* PRIMARY FOCAL POINT: Name with full brutal treatment */}
        <div className="transform -rotate-2">
          <h1 className="text-5xl md:text-7xl font-black px-12 py-6 bg-white text-lavos-blue border-4 border-lavos-black shadow-brutal-lg">
            Matthew Scott
          </h1>
        </div>

        {/* SECONDARY: Clean tagline - let H1 shine */}
        <p className="text-2xl md:text-3xl font-bold mt-4 text-white border-b-4 border-lavos-orange pb-2">
          AI Consultant • Louisville, KY
        </p>

        {/* TERTIARY: Mission statement - subtle */}
        <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl text-center">
          Practical AI tools for real business problems
        </p>

        {/* CTAs: Moderate styling, don't compete with H1 */}
        <nav className="flex gap-6 items-center flex-wrap justify-center mt-8">
          <a
            href="https://jaspermatters.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-lavos-blue px-6 py-3 border-2 border-lavos-black shadow-brutal-sm font-bold text-base hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 no-underline"
          >
            Portfolio →
          </a>

          <span className="text-white/40 text-xl">•</span>

          <a
            href="https://github.com/guitargnarr"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-lavos-green text-white px-6 py-3 border-2 border-lavos-black shadow-brutal-sm font-bold text-base hover:-translate-y-1 hover:shadow-brutal transition-all duration-200 no-underline"
          >
            GitHub →
          </a>
        </nav>
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
    <section className="py-12 px-8 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard number={counts.demos} label="Live Demos" icon="⚡" bgColor="bg-lavos-blue" />
        <StatCard number={`<${counts.response}ms`} label="Response Time" icon="🚀" bgColor="bg-lavos-orange" />
        <StatCard number={counts.projects} label="GitHub Projects" icon="💼" bgColor="bg-lavos-green" />
        <StatCard number="Louisville" label="Local Focus" icon="📍" bgColor="bg-lavos-blue-light" />
      </div>
    </section>
  )
}

function StatCard({ number, label, icon, bgColor }) {
  return (
    <div className={`${bgColor} text-white p-6 border-3 border-lavos-black shadow-brutal-sm hover:-translate-y-1 hover:shadow-brutal transition-all duration-200`}>
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-3xl font-bold mb-2">{number}</div>
      <div className="text-sm font-semibold uppercase tracking-wide">{label}</div>
    </div>
  )
}

function Demos() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Clean section header - no brutal styling needed */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 border-b-4 border-lavos-orange inline-block pb-2">
            Try the Demos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6">
            Interactive demonstrations of AI capabilities for Louisville businesses
          </p>
        </div>

        <div className="space-y-8">
          <SentimentDemo />
          <LeadScoringDemo />
          <PhishingDemo />
          <PromptEngineeringDemo />
          <JobTrackerDemo />
        </div>
      </div>
    </section>
  )
}

function SentimentDemo() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadSampleReview = () => {
    setText("We had dinner at Jack Fry's last night and it was phenomenal! The bourbon-glazed pork chop was cooked to perfection, and the service was attentive without being overbearing. A true Louisville gem - highly recommend for special occasions!")
  }

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
    <div className="bg-white border-3 border-lavos-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-200 p-8 rounded-sm">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">🎯 Sentiment Analysis</h3>
      <p className="text-base font-medium text-gray-700 mb-1">Understand what your customers are really saying</p>
      <p className="text-sm text-gray-500 mb-6">Use case: Restaurant reviews, customer feedback, social media</p>

      <button
        onClick={loadSampleReview}
        className="mb-4 bg-lavos-green text-white px-4 py-2 border-2 border-lavos-black shadow-brutal-sm font-bold text-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200"
      >
        💡 Try Louisville Restaurant Review
      </button>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter customer review or feedback... (e.g., 'This restaurant has amazing service!')"
        rows="4"
        className="w-full p-4 border-2 border-gray-300 rounded-sm mb-4 font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
      />

      <button onClick={analyze} disabled={loading || !text.trim()} className="bg-lavos-blue text-white px-6 py-3 border-2 border-lavos-black shadow-brutal-sm font-bold hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm">
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
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
          <strong className="text-red-700 block mb-2">⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={analyze} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && !result.error && (
        <div className="mt-6 bg-lavos-green/10 border-l-4 border-lavos-green p-6 rounded-sm">
          <div className="flex items-baseline gap-2 mb-2">
            <strong className="text-lavos-green text-lg font-bold">Result:</strong>
            <span className="text-gray-900 font-bold text-xl">{result.sentiment.toUpperCase()}</span>
            <span className="text-gray-600 text-sm">({Math.round(result.confidence * 100)}% confidence)</span>
          </div>
          <p className="text-gray-700 leading-relaxed">{result.explanation}</p>
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

  const loadSampleData = () => {
    setLead({
      name: 'Sarah Johnson',
      email: 'sarah.j@techstartup.com',
      company: 'Louisville Tech Startup',
      budget: '25k',
      timeline: 'ASAP'
    })
  }

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
    <div className="bg-white border-3 border-lavos-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-200 p-8 rounded-sm">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">📊 Lead Scoring</h3>
      <p className="text-base font-medium text-gray-700 mb-1">Prioritize your best prospects automatically</p>
      <p className="text-sm text-gray-500 mb-6">Use case: Real estate, B2B sales, any sales operation</p>

      <button
        onClick={loadSampleData}
        className="mb-4 bg-lavos-green text-white px-4 py-2 border-2 border-lavos-black shadow-brutal-sm font-bold text-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200"
      >
        💡 Try Sample Lead
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Name *"
          value={lead.name}
          onChange={(e) => setLead({...lead, name: e.target.value})}
          className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-orange focus:ring-2 focus:ring-lavos-orange/20 transition-all"
        />
        <input
          type="email"
          placeholder="Email *"
          value={lead.email}
          onChange={(e) => setLead({...lead, email: e.target.value})}
          className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-orange focus:ring-2 focus:ring-lavos-orange/20 transition-all"
        />
        <input
          type="text"
          placeholder="Company"
          value={lead.company}
          onChange={(e) => setLead({...lead, company: e.target.value})}
          className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-orange focus:ring-2 focus:ring-lavos-orange/20 transition-all"
        />
        <input
          type="text"
          placeholder="Budget (e.g., 10k, 50k)"
          value={lead.budget}
          onChange={(e) => setLead({...lead, budget: e.target.value})}
          className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-orange focus:ring-2 focus:ring-lavos-orange/20 transition-all"
        />
        <input
          type="text"
          placeholder="Timeline (e.g., ASAP, this month)"
          value={lead.timeline}
          onChange={(e) => setLead({...lead, timeline: e.target.value})}
          className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-orange focus:ring-2 focus:ring-lavos-orange/20 transition-all md:col-span-2"
        />
      </div>

      <button
        onClick={scoreLead}
        disabled={loading || !lead.name || !lead.email}
        className="bg-lavos-orange text-white px-6 py-3 border-2 border-lavos-black shadow-brutal-sm font-bold hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm"
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
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
          <strong className="text-red-700 block mb-2">⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={scoreLead} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && !result.error && (
        <div className="mt-6 bg-lavos-orange/10 border-l-4 border-lavos-orange p-6 rounded-sm">
          <div className="flex items-baseline gap-2 mb-2">
            <strong className="text-lavos-orange text-lg font-bold">Priority: {result.priority}</strong>
            <span className="text-gray-600 text-sm">(Score: {result.score}/100)</span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">{result.reasoning}</p>
          <p className="text-gray-900 font-semibold"><strong>Next Action:</strong> {result.next_action}</p>
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

  const loadSamplePhishing = () => {
    setEmail({
      sender: 'urgent-security@verify-account-now.com',
      subject: 'URGENT: Verify your account within 24 hours',
      body: 'Dear valued customer,\n\nYour account has been temporarily suspended due to unusual activity. Click the link below immediately to verify your identity and restore access:\n\nhttps://verify-secure-login.com/confirm\n\nFailure to act within 24 hours will result in permanent account closure.\n\nBest regards,\nSecurity Team'
    })
  }

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
    <div className="bg-white border-3 border-lavos-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-200 p-8 rounded-sm">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">🛡️ Phishing Detection</h3>
      <p className="text-base font-medium text-gray-700 mb-1">Protect your team from email threats</p>
      <p className="text-sm text-gray-500 mb-6">Use case: Legal firms, financial services, any business with email risk</p>

      <button
        onClick={loadSamplePhishing}
        className="mb-4 bg-lavos-green text-white px-4 py-2 border-2 border-lavos-black shadow-brutal-sm font-bold text-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200"
      >
        💡 Try Phishing Example
      </button>

      <input
        type="email"
        placeholder="From: sender@example.com"
        value={email.sender}
        onChange={(e) => setEmail({...email, sender: e.target.value})}
        className="w-full p-3 border-2 border-gray-300 rounded-sm mb-4 font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
      />
      <input
        type="text"
        placeholder="Subject: (e.g., 'Urgent: Verify your account')"
        value={email.subject}
        onChange={(e) => setEmail({...email, subject: e.target.value})}
        className="w-full p-3 border-2 border-gray-300 rounded-sm mb-4 font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
      />
      <textarea
        value={email.body}
        onChange={(e) => setEmail({...email, body: e.target.value})}
        placeholder="Email body... (e.g., 'Dear customer, click here to verify your account immediately')"
        rows="4"
        className="w-full p-4 border-2 border-gray-300 rounded-sm mb-4 font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
      />

      <button
        onClick={checkPhishing}
        disabled={loading || !email.sender || !email.subject || !email.body}
        className="bg-lavos-blue text-white px-6 py-3 border-2 border-lavos-black shadow-brutal-sm font-bold hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm"
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
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
          <strong className="text-red-700 block mb-2">⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={checkPhishing} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && !result.error && (
        <div className={`mt-6 ${result.risk_level === 'HIGH' ? 'bg-red-50 border-l-4 border-red-500' : result.risk_level === 'MEDIUM' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-green-50 border-l-4 border-green-500'} p-6 rounded-sm`}>
          <div className="flex items-baseline gap-2 mb-3">
            <strong className={`text-lg font-bold ${result.risk_level === 'HIGH' ? 'text-red-700' : result.risk_level === 'MEDIUM' ? 'text-yellow-700' : 'text-green-700'}`}>
              Risk Level: {result.risk_level}
            </strong>
            <span className="text-gray-600 text-sm">({Math.round(result.confidence * 100)}% confidence)</span>
          </div>
          <ul className="list-disc list-inside space-y-1 mb-3 text-gray-700">
            {result.indicators.map((indicator, i) => (
              <li key={i}>{indicator}</li>
            ))}
          </ul>
          <p className="text-gray-900 font-semibold"><strong>Recommendation:</strong> {result.recommendation}</p>
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

  const loadSamplePrompt = () => {
    setFormData({
      ...formData,
      context: 'Write an email to a client explaining a project delay due to supply chain issues. Keep it professional and reassuring.'
    })
  }

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
    <div className="bg-white border-3 border-lavos-black shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-200 p-8 rounded-sm">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">🧠 Prompt Engineering Playground</h3>
      <p className="text-base font-medium text-gray-700 mb-1">Advanced LLM prompt techniques demonstrated</p>
      <p className="text-sm text-gray-500 mb-6">Use case: Content generation, email drafting, report summaries</p>

      <button
        onClick={loadSamplePrompt}
        className="mb-4 bg-lavos-green text-white px-4 py-2 border-2 border-lavos-black shadow-brutal-sm font-bold text-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200"
      >
        💡 Try Sample Context
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type:</label>
          <select
            value={formData.use_case}
            onChange={(e) => setFormData({...formData, use_case: e.target.value})}
            className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
          >
            <option value="email">Email</option>
            <option value="blog">Blog Post</option>
            <option value="summary">Summary</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tone:</label>
          <select
            value={formData.tone}
            onChange={(e) => setFormData({...formData, tone: e.target.value})}
            className="w-full p-3 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
          >
            <option value="professional">Professional</option>
            <option value="technical">Technical</option>
            <option value="casual">Casual</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Context (what to write about):</label>
        <textarea
          value={formData.context}
          onChange={(e) => setFormData({...formData, context: e.target.value})}
          placeholder="Example: Write an email to a client explaining a project delay due to supply chain issues. Keep it professional and reassuring."
          rows="3"
          className="w-full p-4 border-2 border-gray-300 rounded-sm font-sans text-gray-900 focus:outline-none focus:border-lavos-blue focus:ring-2 focus:ring-lavos-blue/20 transition-all"
        />
        <small className="text-gray-500 text-xs">{formData.context.length} / 2000 characters</small>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Prompt Engineering Technique:</label>
        <div className="space-y-2">
          {Object.keys(techniqueDescriptions).map((tech) => (
            <label key={tech} className="flex items-start gap-3 p-3 border-2 border-gray-200 rounded-sm hover:border-lavos-orange hover:bg-lavos-orange/5 transition-all cursor-pointer">
              <input
                type="radio"
                value={tech}
                checked={formData.technique === tech}
                onChange={(e) => setFormData({...formData, technique: e.target.value})}
                className="mt-1"
              />
              <span className="flex-1">
                <strong className="text-gray-900 block">{tech.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</strong>
                <small className="text-gray-600 text-sm">{techniqueDescriptions[tech]}</small>
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={generate}
        disabled={loading || !formData.context.trim() || formData.context.length < 10}
        className="bg-lavos-blue text-white px-6 py-3 border-2 border-lavos-black shadow-brutal-sm font-bold hover:-translate-y-0.5 hover:shadow-brutal transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal-sm"
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
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
          <strong className="text-red-700 block mb-2">⚠️ {error.message}</strong>
          {error.canRetry && (
            <button onClick={generate} className="mt-2 bg-red-600 text-white px-4 py-2 rounded-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50" disabled={loading}>
              Try Again
            </button>
          )}
        </div>
      )}

      {result && (
        <div className="mt-6 border-3 border-lavos-black bg-gray-50 rounded-sm overflow-hidden">
          <div className="flex border-b-3 border-lavos-black">
            <button
              className={`flex-1 px-4 py-3 font-bold text-sm transition-all ${activeTab === 'result' ? 'bg-lavos-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('result')}
            >
              📝 Generated Content
            </button>
            <button
              className={`flex-1 px-4 py-3 font-bold text-sm transition-all border-x-2 border-lavos-black ${activeTab === 'prompt' ? 'bg-lavos-orange text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('prompt')}
            >
              🔧 Prompt Used
            </button>
            <button
              className={`flex-1 px-4 py-3 font-bold text-sm transition-all ${activeTab === 'explanation' ? 'bg-lavos-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('explanation')}
            >
              💡 Technique Explained
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'result' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <strong className="text-gray-900 font-bold">Technique: {result.technique_name}</strong>
                  <button
                    onClick={() => copyToClipboard(result.generated_content)}
                    className="bg-lavos-blue text-white px-3 py-1 border-2 border-lavos-black shadow-brutal-sm text-sm font-bold hover:-translate-y-0.5 transition-all"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div className="bg-white p-4 border-2 border-gray-300 rounded-sm whitespace-pre-wrap text-gray-800 leading-relaxed">{result.generated_content}</div>
              </div>
            )}

            {activeTab === 'prompt' && (
              <div className="space-y-4">
                <div>
                  <strong className="block text-gray-900 font-bold mb-2">System Message (Role Definition):</strong>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-sm overflow-x-auto text-sm font-mono">{result.prompt_used.system}</pre>
                </div>
                <div>
                  <strong className="block text-gray-900 font-bold mb-2">User Message (Task Instructions):</strong>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-sm overflow-x-auto text-sm font-mono">{result.prompt_used.user}</pre>
                </div>
                <button
                  onClick={() => copyToClipboard(`System: ${result.prompt_used.system}\n\nUser: ${result.prompt_used.user}`)}
                  className="bg-lavos-orange text-white px-4 py-2 border-2 border-lavos-black shadow-brutal-sm font-bold hover:-translate-y-0.5 transition-all"
                >
                  {copied ? '✓ Copied!' : '📋 Copy Full Prompt'}
                </button>
              </div>
            )}

            {activeTab === 'explanation' && (
              <div className="space-y-3">
                {result.explanation.split('\n').map((line, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
                ))}
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
