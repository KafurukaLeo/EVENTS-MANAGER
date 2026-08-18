// frontend/src/pages/Contact.jsx

import { useMemo, useState } from 'react'
import {
  FaChevronRight,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle
} from 'react-icons/fa'
import { MdOutlineEmail, MdOutlinePhone, MdOutlineLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'


const SUBJECT_OPTIONS = [
  'General question',
  'Billing & payments',
  'Technical support',
  'Partnership inquiry',
  'Press & media',
  'Something else'
]

const MESSAGE_LIMIT = 500

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // honeypot — real users never see or fill this field
    company: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState({})

  // A ticket number is purely decorative flavor for the layout, but it's
  // stable for the life of the component instead of re-rolling on every render.
  const ticketNumber = useMemo(() => {
    const rand = Math.floor(100000 + Math.random() * 900000)
    return `MSG-${rand}`
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!formData.subject) newErrors.subject = 'Choose a subject'
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length > MESSAGE_LIMIT) {
      newErrors.message = `Message is over the ${MESSAGE_LIMIT}-character limit`
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    // Silently drop likely bot submissions instead of telling them why.
    if (formData.company.trim()) {
      setIsSubmitted(true)
      return
    }

    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstField = Object.keys(validationErrors)[0]
      document.getElementById(firstField)?.focus()
      return
    }

    setIsSubmitting(true)
    try {
      // Replace with your real API call, e.g.
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '', company: '' })
      setTimeout(() => setIsSubmitted(false), 6000)
    } catch (error) {
      setSubmitError("Something went wrong on our end. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MdOutlineEmail,
      title: 'Email',
      details: ['support@eventmanager.com', 'info@eventmanager.com'],
      link: 'mailto:support@eventmanager.com'
    },
    {
      icon: MdOutlinePhone,
      title: 'Phone',
      details: ['+1 (234) 567-8900', '+1 (234) 567-8901'],
      link: 'tel:+12345678900'
    },
    {
      icon: MdOutlineLocationOn,
      title: 'Office',
      details: ['123 Event Street', 'City, State 12345'],
      link: 'https://maps.google.com'
    },
    {
      icon: FaClock,
      title: 'Hours',
      details: ['Mon – Fri, 9am – 6pm', 'Sat – Sun, closed']
    }
  ]

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' }
  ]

  const remaining = MESSAGE_LIMIT - formData.message.length

  return (
    <div className="min-h-screen bg-[#F0F4FF]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#1e3a8a] px-4 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#3b82f6] font-['IBM_Plex_Mono',monospace]">
            Admit one — say hello
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl font-['Space_Grotesk',sans-serif]">
            Let's talk about your next event
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Questions, feedback, or a partnership idea — write in and a real
            person on our team will reply within one business day.
          </p>
        </div>

        {/* Perforated edge, ticket-style, instead of a generic wave */}
        <svg
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-6 w-full text-[#F0F4FF]"
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20 C 0 20 8 0 16 0 C 24 0 24 20 32 20 C 40 20 40 0 48 0 C 56 0 56 20 64 20 C 72 20 72 0 80 0 C 88 0 88 20 96 20 C 104 20 104 0 112 0 C 120 0 120 20 128 20 C 136 20 136 0 144 0 C 152 0 152 20 160 20 C 168 20 168 0 176 0 C 184 0 184 20 192 20 C 200 20 200 0 208 0 C 216 0 216 20 224 20 C 232 20 232 0 240 0 C 248 0 248 20 256 20 C 264 20 264 0 272 0 C 280 0 280 20 288 20 C 296 20 296 0 304 0 C 312 0 312 20 320 20 C 328 20 328 0 336 0 C 344 0 344 20 352 20 C 360 20 360 0 368 0 C 376 0 376 20 384 20 C 392 20 392 0 400 0 L400 20 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Contact info cards */}
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => {
            const Wrapper = info.link ? 'a' : 'div'
            return (
              <Wrapper
                key={index}
                {...(info.link ? { href: info.link } : {})}
                className="group rounded-2xl border border-[#1e3a8a]/10 bg-white p-5 transition-colors hover:border-[#4f46e5]/40"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-white transition-colors group-hover:bg-[#4f46e5]">
                  <info.icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-[#1e3a8a]">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm text-[#1e3a8a]/60">
                    {detail}
                  </p>
                ))}
              </Wrapper>
            )
          })}
        </div>
      </div>

      {/* Form + sidebar */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Ticket-styled contact form — the signature element of this page */}
          <div className="lg:col-span-3">
            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(27,31,59,0.06),0_12px_32px_rgba(27,31,59,0.08)] sm:flex-row">
              {/* Stub */}
              <div className="flex shrink-0 flex-row justify-between bg-[#1e3a8a] p-5 text-white sm:w-40 sm:flex-col sm:justify-start sm:gap-6 sm:p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-['IBM_Plex_Mono',monospace]">
                    Ticket
                  </p>
                  <p className="mt-1 font-['IBM_Plex_Mono',monospace] text-sm text-[#3b82f6]">
                    {ticketNumber}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/50 font-['IBM_Plex_Mono',monospace]">
                    Reply time
                  </p>
                  <p className="mt-1 text-sm">~24 hours</p>
                </div>
              </div>

              {/* Perforation divider */}
              <div
                aria-hidden="true"
                className="relative hidden w-0 border-l-2 border-dashed border-[#1e3a8a]/15 sm:block"
              >
                <span className="absolute -left-[7px] -top-3 h-3 w-3 rounded-full bg-[#F0F4FF]" />
                <span className="absolute -left-[7px] -bottom-3 h-3 w-3 rounded-full bg-[#F0F4FF]" />
              </div>

              {/* Form body */}
              <div className="flex-1 p-6 sm:p-8">
                {isSubmitted ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
                  >
                    <FaCheckCircle className="h-10 w-10 text-[#1e3a8a]" />
                    <h4 className="mt-4 text-xl font-semibold text-[#1e3a8a] font-['Space_Grotesk',sans-serif]">
                      Message sent
                    </h4>
                    <p className="mt-1 max-w-xs text-sm text-[#1e3a8a]/60">
                      Thanks for writing in — we'll reply to your email within
                      one business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <h2 className="text-xl font-semibold text-[#1e3a8a] font-['Space_Grotesk',sans-serif]">
                      Send us a message
                    </h2>

                    {submitError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 rounded-lg bg-[#4f46e5]/10 p-3 text-sm text-[#B5323A]"
                      >
                        <FaExclamationCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Honeypot — visually and semantically hidden from real users */}
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-[#1e3a8a]">
                          Full name <span className="text-[#4f46e5]">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={`w-full rounded-lg border px-4 py-2.5 text-[#1e3a8a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 ${
                            errors.name ? 'border-[#4f46e5]' : 'border-[#1e3a8a]/15'
                          }`}
                          placeholder="Jordan Lee"
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-sm text-[#4f46e5]">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#1e3a8a]">
                          Email <span className="text-[#4f46e5]">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`w-full rounded-lg border px-4 py-2.5 text-[#1e3a8a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 ${
                            errors.email ? 'border-[#4f46e5]' : 'border-[#1e3a8a]/15'
                          }`}
                          placeholder="jordan@example.com"
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-[#4f46e5]">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="mb-1 block text-sm font-medium text-[#1e3a8a]">
                        Subject <span className="text-[#4f46e5]">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[#1e3a8a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 ${
                          errors.subject ? 'border-[#4f46e5]' : 'border-[#1e3a8a]/15'
                        }`}
                      >
                        <option value="" disabled>
                          Choose a topic
                        </option>
                        {SUBJECT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 text-sm text-[#4f46e5]">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="mb-1 flex items-baseline justify-between">
                        <label htmlFor="message" className="block text-sm font-medium text-[#1e3a8a]">
                          Message <span className="text-[#4f46e5]">*</span>
                        </label>
                        <span
                          className={`text-xs font-['IBM_Plex_Mono',monospace] ${
                            remaining < 0 ? 'text-[#4f46e5]' : 'text-[#1e3a8a]/40'
                          }`}
                        >
                          {remaining} left
                        </span>
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        maxLength={MESSAGE_LIMIT}
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full resize-none rounded-lg border px-4 py-2.5 text-[#1e3a8a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/50 ${
                          errors.message ? 'border-[#4f46e5]' : 'border-[#1e3a8a]/15'
                        }`}
                        placeholder="Tell us what's going on..."
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm text-[#4f46e5]">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4f46e5] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="h-4 w-4" />
                          <span>Send message</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#1e3a8a]/50">
                      By submitting, you agree to our{' '}
                      <Link to="/privacy" className="underline hover:text-[#1e3a8a]">
                        privacy policy
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: map, social, FAQ */}
          <div className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-[#1e3a8a]/10 bg-white">
              <div className="relative h-56">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7ae2b%3A0xcf1e1d5a3482f1b!2sEvent%20Management!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="EventManager office location"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#1e3a8a]">Find us here</h3>
                <p className="text-sm text-[#1e3a8a]/60">123 Event Street, City, State 12345</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1e3a8a]/10 bg-white p-6">
              <h3 className="font-semibold text-[#1e3a8a]">Connect with us</h3>
              <p className="mt-1 text-sm text-[#1e3a8a]/60">
                Follow along for product updates and upcoming events.
              </p>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF] text-[#1e3a8a] transition-colors hover:bg-[#1e3a8a] hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#1e3a8a] p-6 text-white">
              <h3 className="font-semibold">Frequently asked questions</h3>
              <p className="mt-1 text-sm text-white/60">
                Most questions about billing, tickets, and accounts are
                already answered.
              </p>
              <Link
                to="/faq"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#3b82f6] hover:text-white"
              >
                <span>Visit the FAQ</span>
                <FaChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact