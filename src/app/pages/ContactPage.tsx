import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const OFFICES = [
  {
    city: "Rotterdam",
    address: "Lloyd Multiplier\nLloydstraat 5\n3024 EA Rotterdam\nThe Netherlands",
    phone: "+31 10 404 6777",
    email: "rotterdam@powerhouse-company.com",
    isPrimary: true,
  },
  {
    city: "Munich",
    address: "Maxvorstadt\nTheresienstraße 48\n80333 Munich\nGermany",
    phone: "+49 89 202 34120",
    email: "munich@powerhouse-company.com",
    isPrimary: false,
  },
  {
    city: "Oslo",
    address: "Tjuvholmen Allé 1\n0252 Oslo\nNorway",
    phone: "+47 21 60 03 00",
    email: "oslo@powerhouse-company.com",
    isPrimary: false,
  },
  {
    city: "Beijing",
    address: "Chaoyang District\nDongsanhuan Beilu 19\nBeijing, 100026\nChina",
    phone: "+86 10 8589 8900",
    email: "beijing@powerhouse-company.com",
    isPrimary: false,
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)"}`,
    color: "#fff",
    fontSize: "15px",
    padding: "12px 0",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    transition: "border-color 0.25s ease",
  });

  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 pt-28 pb-16 border-b border-white/8">
        <motion.p
          className="text-white/30 uppercase tracking-[0.22em] mb-5"
          style={{ fontSize: "9px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          className="text-white"
          style={{ fontSize: "clamp(36px, 5.5vw, 84px)", fontWeight: 300, lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Contact
        </motion.h1>
      </div>

      <div className="px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

          {/* ── Contact form ──────────────────────────────────────────────── */}
          <FadeIn>
            <p className="text-white/30 uppercase tracking-[0.22em] mb-10" style={{ fontSize: "9px" }}>
              Send a Message
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="py-12"
              >
                <p className="text-white mb-3" style={{ fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 300 }}>
                  Thank you.
                </p>
                <p className="text-white/50" style={{ fontSize: "14px", lineHeight: 1.7 }}>
                  Your message has been received. We aim to respond within 48 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/30 uppercase tracking-[0.15em] mb-3" style={{ fontSize: "9px" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      style={{ ...inputStyle("name") }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/30 uppercase tracking-[0.15em] mb-3" style={{ fontSize: "9px" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      style={{ ...inputStyle("email") }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/30 uppercase tracking-[0.15em] mb-3" style={{ fontSize: "9px" }}>
                    Subject
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle("subject"),
                      appearance: "none",
                      cursor: "pointer",
                      color: formState.subject ? "#fff" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    <option value="" style={{ background: "#111" }}>Select a topic</option>
                    <option value="project" style={{ background: "#111" }}>New Project Inquiry</option>
                    <option value="press" style={{ background: "#111" }}>Press & Media</option>
                    <option value="careers" style={{ background: "#111" }}>Careers</option>
                    <option value="collaboration" style={{ background: "#111" }}>Collaboration</option>
                    <option value="other" style={{ background: "#111" }}>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/30 uppercase tracking-[0.15em] mb-3" style={{ fontSize: "9px" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us about your project or inquiry..."
                    style={{
                      ...inputStyle("message"),
                      resize: "none",
                      borderBottom: "none",
                      border: `1px solid ${focused === "message" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"}`,
                      padding: "14px",
                      transition: "border-color 0.25s ease",
                      borderRadius: 2,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-3 text-white uppercase tracking-[0.15em] group cursor-pointer border-none bg-transparent p-0 hover:gap-5 transition-all duration-300"
                  style={{ fontSize: "11px" }}
                >
                  <span>Send Message</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </FadeIn>

          {/* ── Offices ───────────────────────────────────────────────────── */}
          <div className="space-y-0">
            <FadeIn delay={0.1}>
              <p className="text-white/30 uppercase tracking-[0.22em] mb-10" style={{ fontSize: "9px" }}>
                Our Offices
              </p>
            </FadeIn>
            <div className="divide-y divide-white/8">
              {OFFICES.map((office, i) => (
                <FadeIn key={office.city} delay={0.12 + i * 0.07}>
                  <div className="py-8">
                    <div className="flex items-center gap-3 mb-5">
                      <p className="text-white" style={{ fontSize: "16px", fontWeight: 400 }}>
                        {office.city}
                      </p>
                      {office.isPrimary && (
                        <span
                          className="bg-white/10 text-white/40 uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                          style={{ fontSize: "7px" }}
                        >
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 mb-4 whitespace-pre-line" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                      {office.address}
                    </p>
                    <div className="space-y-1">
                      <a
                        href={`tel:${office.phone}`}
                        className="block text-white/30 hover:text-white/60 transition-colors no-underline"
                        style={{ fontSize: "12px" }}
                      >
                        {office.phone}
                      </a>
                      <a
                        href={`mailto:${office.email}`}
                        className="block text-white/30 hover:text-white/60 transition-colors no-underline"
                        style={{ fontSize: "12px" }}
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Social */}
            <FadeIn delay={0.4}>
              <div className="pt-10">
                <p className="text-white/20 uppercase tracking-[0.22em] mb-4" style={{ fontSize: "9px" }}>
                  Follow Along
                </p>
                <div className="flex gap-6">
                  {["Instagram", "LinkedIn", "Dezeen"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-white/30 hover:text-white/70 transition-colors no-underline uppercase tracking-[0.1em]"
                      style={{ fontSize: "10px" }}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
