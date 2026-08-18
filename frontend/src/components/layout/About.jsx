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
      <header className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaRocket className="h-4 w-4 text-blue-200" aria-hidden="true" />
            <span className="text-blue-100 text-sm font-medium">About EventManager</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Revolutionizing Event Management
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're on a mission to make event management simple, efficient, and enjoyable for everyone.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
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

      {/* Team Section */}
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

      {/* CTA Section */}
      <section aria-labelledby="cta-heading" className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of event organizers who trust EventManager.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth?mode=signup"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              Start Free Trial
              <FaRocket className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About