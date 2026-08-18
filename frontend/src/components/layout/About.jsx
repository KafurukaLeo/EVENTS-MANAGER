// frontend/src/pages/About.jsx
import { useEffect, useRef, useState } from 'react'
import { 
  FaRocket, 
  FaUsers, 
  FaShieldAlt, 
  FaHeadset,
  FaCalendarCheck,
  FaChartLine,
  FaMobileAlt,
  FaGlobe,
  FaQuoteLeft,
  FaHeart,
  FaStar,
  FaTrophy,
  FaLightbulb,
  FaLinkedinIn
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

// Animates a stat's leading number while leaving any trailing unit (+, %, /7...) untouched.
// Respects prefers-reduced-motion and only runs once the stat scrolls into view.
const useCountUp = (target, shouldRun) => {
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!shouldRun || hasRun.current) return
    hasRun.current = true

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || target === null) {
      setValue(target ?? 0)
      return
    }

    const duration = 900
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [shouldRun, target])

  return value
}

const StatCard = ({ stat, isVisible }) => {
  const match = stat.number.match(/(\d+)/)
  const numericTarget = match ? parseInt(match[1], 10) : null
  const animated = useCountUp(numericTarget, isVisible)
  const display = numericTarget !== null
    ? stat.number.replace(/\d+/, animated)
    : stat.number

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-3">
        <stat.icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-gray-900 tabular-nums">{display}</div>
      <div className="text-sm text-gray-600">{stat.label}</div>
    </div>
  )
}

const About = () => {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: '50K+', label: 'Active Users', icon: FaUsers },
    { number: '100K+', label: 'Events Created', icon: FaCalendarCheck },
    { number: '95%', label: 'Satisfaction Rate', icon: FaStar },
    { number: '24/7', label: 'Support Available', icon: FaHeadset },
  ]

  const features = [
    {
      icon: FaRocket,
      title: 'Easy Event Creation',
      description: 'Create and manage events in minutes with our intuitive interface. No technical skills required.'
    },
    {
      icon: FaUsers,
      title: 'Attendee Management',
      description: 'Track registrations, manage check-ins, and engage with attendees seamlessly.'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Payments',
      description: 'Process payments securely with our integrated payment system. PCI compliant and encrypted.'
    },
    {
      icon: FaChartLine,
      title: 'Analytics & Insights',
      description: 'Get real-time analytics and insights about your events and attendees.'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile Friendly',
      description: 'Access your events on the go with our fully responsive design and mobile app.'
    },
    {
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Reach audiences worldwide with multilingual support and timezone management.'
    }
  ]

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-founder',
      bio: 'Former event planner with 15+ years of experience in the industry.',
      initials: 'SJ',
      linkedin: '#'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-founder',
      bio: 'Tech enthusiast with a passion for building scalable event solutions.',
      initials: 'MC',
      linkedin: '#'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist focused on creating exceptional user experiences.',
      initials: 'ER',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Full-stack developer with expertise in React and cloud architecture.',
      initials: 'DK',
      linkedin: '#'
    }
  ]

  const values = [
    {
      icon: FaHeart,
      title: 'Customer First',
      description: 'We prioritize our users and strive to exceed their expectations.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the best event management solutions.'
    },
    {
      icon: FaTrophy,
      title: 'Excellence',
      description: 'We deliver excellence in everything we do, from design to support.'
    }
  ]

  // A real sequence, so numbered markers earn their place here.
  const milestones = [
    { year: '2019', title: 'EventManager founded', description: 'Started in a two-person office with a single goal: make ticketing less painful.' },
    { year: '2021', title: '10,000th event created', description: 'Crossed our first major usage milestone and opened a support team to match.' },
    { year: '2023', title: 'Launched mobile apps', description: 'Brought check-in, analytics, and messaging to organizers on the go.' },
    { year: '2025', title: '50,000+ active organizers', description: 'Now powering events in over 40 countries, from meetups to festivals.' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-[#1e3a8a] px-4 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#3b82f6] font-['IBM_Plex_Mono',monospace]">
            <FaRocket className="h-3.5 w-3.5" aria-hidden="true" />
            <span>About EventManager</span>
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-white font-['Space_Grotesk',sans-serif]">
            Revolutionizing Event Management
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-blue-100">
            We're on a mission to make event management simple, efficient, and enjoyable for everyone.
          </p>
        </div>

        {/* Perforated edge, ticket-style, matching the Contact page */}
        <svg
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-6 w-full text-gray-50"
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20 C 0 20 8 0 16 0 C 24 0 24 20 32 20 C 40 20 40 0 48 0 C 56 0 56 20 64 20 C 72 20 72 0 80 0 C 88 0 88 20 96 20 C 104 20 104 0 112 0 C 120 0 120 20 128 20 C 136 20 136 0 144 0 C 152 0 152 20 160 20 C 168 20 168 0 176 0 C 184 0 184 20 192 20 C 200 20 200 0 208 0 C 216 0 216 20 224 20 C 232 20 232 0 240 0 C 248 0 248 20 256 20 C 264 20 264 0 272 0 C 280 0 280 20 288 20 C 296 20 296 0 304 0 C 312 0 312 20 320 20 C 328 20 328 0 336 0 C 344 0 344 20 352 20 C 360 20 360 0 368 0 C 376 0 376 20 384 20 C 392 20 392 0 400 0 L400 20 Z"
            fill="currentColor"
          />
        </svg>
      </header>

      {/* Stats Section */}
      <section aria-label="Company statistics" ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isVisible={statsVisible} />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section aria-labelledby="mission-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="mission-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To empower event organizers with cutting-edge technology that simplifies the entire event lifecycle - from planning and promotion to execution and analysis.
            </p>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg">
                    <value.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <blockquote className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <FaQuoteLeft className="h-10 w-10 text-blue-300 mb-4" aria-hidden="true" />
              <p className="text-xl font-medium leading-relaxed">
                "We believe that great events have the power to bring people together, inspire change, and create lasting memories."
              </p>
              <footer className="mt-6 pt-6 border-t border-blue-400/30">
                <p className="font-semibold not-italic">Sarah Johnson</p>
                <p className="text-sm text-blue-200">CEO & Co-founder</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section aria-labelledby="milestones-heading" className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="milestones-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A few milestones along the way to 50,000 organizers.
            </p>
          </div>
          <ol className="relative border-l-2 border-blue-100 ml-3 space-y-10">
            {milestones.map((milestone, index) => (
              <li key={index} className="ml-8 relative">
                <span className="absolute -left-[calc(2rem+9px)] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold ring-4 ring-white">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-blue-600">{milestone.year}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-0.5">{milestone.title}</h3>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">{milestone.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Features Section */}
      <section aria-labelledby="features-heading" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose EventManager?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and grow your events in one powerful platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section 
      <section aria-labelledby="team-heading" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="team-heading" className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate professionals dedicated to making event management better.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                <a
                  href={member.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <FaLinkedinIn className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
        */}
    </div>
  )
}

export default About