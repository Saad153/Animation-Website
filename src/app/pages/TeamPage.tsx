import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  location: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Nanne de Ru",
    role: "Founding Partner",
    bio: "Nanne co-founded Powerhouse Company in 2005. His work investigates the social and cultural dimensions of built form, with a particular focus on housing, collective living, and the future of the Dutch city.",
    photo: "https://images.unsplash.com/photo-1640531005390-38bd92755d6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhcmNoaXRlY3QlMjBwb3J0cmFpdCUyMG1hbiUyMHN1aXQlMjBzdHVkaW98ZW58MXx8fHwxNzc0OTk0NzI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Rotterdam",
  },
  {
    name: "Charles Bessard",
    role: "Founding Partner",
    bio: "Charles brings a rigorous formal intelligence to the practice. His research into structure, facade, and material expression has produced some of the studio's most iconic commercial and cultural projects.",
    photo: "https://images.unsplash.com/photo-1619441523947-6ecdc0918d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGVzaWduZXIlMjBjcmVhdGl2ZSUyMGRpcmVjdG9yJTIwcG9ydHJhaXQlMjBvZmZpY2V8ZW58MXx8fHwxNzc0OTk0NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Munich",
  },
  {
    name: "Stefan Prins",
    role: "Partner / Director",
    bio: "Stefan leads the Oslo studio. His background in landscape and infrastructure informs projects that blur the boundary between building and terrain, creating architecture that belongs to its geography.",
    photo: "https://images.unsplash.com/photo-1769069918451-0e8ee342a3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjBtYWxlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBhcmNoaXRlY3R1cmFsJTIwb2ZmaWNlfGVufDF8fHx8MTc3NDk5NDc0MXww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Oslo",
  },
  {
    name: "Johanna Klein",
    role: "Senior Architect",
    bio: "Johanna specializes in large-scale cultural buildings. Her designs for performing arts centers and museums have earned international recognition for their spatial generosity and material precision.",
    photo: "https://images.unsplash.com/photo-1758922584983-82ffd5720c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGFyY2hpdGVjdCUyMHBvcnRyYWl0JTIwbWluaW1hbCUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzc0OTk0NzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Rotterdam",
  },
  {
    name: "Paul Stavert",
    role: "Associate Director",
    bio: "Paul oversees construction documentation and technical delivery. His encyclopedic knowledge of building systems and his ability to translate complex geometries into executable drawings is unmatched.",
    photo: "https://images.unsplash.com/photo-1619799090425-0efe92bd62a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjB1cmJhbiUyMGRlc2lnbmVyJTIwYXJjaGl0ZWN0JTIwcG9ydHJhaXQlMjBzZXJpb3VzfGVufDF8fHx8MTc3NDk5NDc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Rotterdam",
  },
  {
    name: "Lars Eriksson",
    role: "Urban Designer",
    bio: "Lars leads the studio's urban research agenda, developing masterplans and design frameworks for cities across Scandinavia and Northern Europe. His work engages deeply with climate resilience and public space.",
    photo: "https://images.unsplash.com/photo-1758600433517-00f851e2a12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzQ5OTQ3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Oslo",
  },
];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group cursor-default"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
        <motion.img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Hover overlay with bio */}
        <motion.div
          className="absolute inset-0 bg-black/80 flex items-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white/80" style={{ fontSize: "13px", lineHeight: 1.65 }}>
            {member.bio}
          </p>
        </motion.div>
        {/* Location tag */}
        <div className="absolute top-4 left-4">
          <span
            className="bg-black/60 text-white/70 uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
            style={{ fontSize: "8px", backdropFilter: "blur(8px)" }}
          >
            {member.location}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white mb-1" style={{ fontSize: "15px" }}>{member.name}</p>
          <p className="text-white/35 uppercase tracking-[0.12em]" style={{ fontSize: "9px" }}>{member.role}</p>
        </div>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowUpRight size={14} className="text-white/40 mt-1" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function TeamPage() {
  return (
    <div className="bg-black min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 pt-28 pb-16 border-b border-white/8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.p
              className="text-white/30 uppercase tracking-[0.22em] mb-5"
              style={{ fontSize: "9px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The People
            </motion.p>
            <motion.h1
              className="text-white"
              style={{ fontSize: "clamp(36px, 5.5vw, 84px)", fontWeight: 300, lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Our Team
            </motion.h1>
          </div>
          <motion.p
            className="text-white/40 max-w-[360px]"
            style={{ fontSize: "13px", lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            A collective of architects, urban designers, and researchers working across four continents. Hover over each portrait to learn more.
          </motion.p>
        </div>
      </div>

      {/* ── Team grid ───────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {TEAM.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>

      {/* ── Offices note ────────────────────────────────────────────────────── */}
      <div className="px-8 md:px-16 lg:px-24 py-16 border-t border-white/8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-white/20 uppercase tracking-[0.22em]" style={{ fontSize: "9px" }}>
            Offices in Rotterdam, Munich, Oslo, Beijing
          </p>
          <motion.p
            className="text-white/40"
            style={{ fontSize: "13px" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Currently {TEAM.length} professionals — we're always looking for exceptional talent.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
