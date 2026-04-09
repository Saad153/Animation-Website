import { motion } from "motion/react";
import ceoPhoto from "@/assets/0e039392175619cb699c6ed4430d4bd2a6c13da8.png";
import paPhoto  from "@/assets/32ecbdbe0bf26392c3dd4e4ad738c939b1ab29b0.png";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const SANS  = "'DM Sans', 'Inter', sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";

// ─── All 30 team members ──────────────────────────────────────────────────────
interface Member {
  sr: number;
  name: string;
  designation: string;
  education: string;
  hasPhoto?: boolean; // only CEO and PA will have real photos later
}

const TEAM: Member[] = [
  { sr: 1,  name: "Afzaal A. Sheikh",   designation: "CEO",                   education: "B.E. (Civil)",              hasPhoto: true  },
  { sr: 2,  name: "Fara Zia Qadir",     designation: "Principal Architect",   education: "B. Arch. & MURP",           hasPhoto: true  },
  // { sr: 3,  name: "Kashif Jamal",       designation: "Chief Engineer",        education: "B.E. (Civil)",              hasPhoto: false },
  { sr: 3,  name: "M. Farhan Karamat",  designation: "Architect/Project Manager",       education: "B. Arch.",                  hasPhoto: false },
  { sr: 4,  name: "Saadat Israr",       designation: "Construction Manager",  education: "B. Tech. (Civil) & MBA",    hasPhoto: false },
  { sr: 5,  name: "Rameez Ahmed",       designation: "Construction Manager",  education: "B. Tech. (Civil)",          hasPhoto: false },
  { sr: 6,  name: "Azeem Siddiqui",     designation: "Site Supervisor",       education: "MBA (HR)",                  hasPhoto: false },
  { sr: 7,  name: "Saira Mirani",       designation: "HR Manager",            education: "MBA (HR)",                  hasPhoto: false },
  { sr: 8,  name: "Syed Zahid Hussain", designation: "Admin Manager",         education: "B.A. & DAE (Electronics)",  hasPhoto: false },
  { sr: 9, name: "Sameer Khalid",      designation: "Senior Architect",      education: "B. Arch.",                  hasPhoto: false },
  { sr: 10, name: "Mikael A. Bhurgri",  designation: "Senior Architect",      education: "B. Arch.",                  hasPhoto: false },
  { sr: 11, name: "Hamza Shahab",       designation: "Project Architect",     education: "B. Arch.",                  hasPhoto: false },
  { sr: 12, name: "Aziz-Ur-Rehman",    designation: "Junior Architect",     education: "B. Arch.",                  hasPhoto: false },
  { sr: 13, name: "Aneel Kumar",        designation: "Junior Architect",     education: "B. Arch.",                  hasPhoto: false },
  { sr: 14, name: "Syeda Haram Rizwan", designation: "Architect",             education: "B. Arch.",                  hasPhoto: false },
  { sr: 15, name: "Alisha Nadeem",      designation: "Interior Architect",             education: "B. Arch.",                  hasPhoto: false },
  { sr: 16, name: "Aaminah Mansoor",    designation: "Interior Architect",             education: "B. Arch.",                  hasPhoto: false },
  { sr: 17, name: "Marzia Jan",         designation: "Interior Architect",             education: "B. Arch.",                  hasPhoto: false },
  { sr: 18, name: "Aliza Salman",       designation: "Interior Architect",             education: "B. Arch.",                  hasPhoto: false },
  { sr: 19, name: "Sahar Khan",         designation: "Interior Architect",             education: "B. Arch.",                  hasPhoto: false },
  { sr: 20, name: "Adil Mehmood",       designation: "Quantity Surveyor",     education: "D.A.E. (Civil)",            hasPhoto: false },
  { sr: 21, name: "Wajid Alam",         designation: "Senior Draftsman",      education: "B. Tech. (Civil)",          hasPhoto: false },
  { sr: 22, name: "Haris Moin",         designation: "Senior Draftsman",      education: "D.A.E. (Civil)",            hasPhoto: false },
  { sr: 23, name: "Hasan Malik",        designation: "Draftsman",             education: "D.A.E. (Civil)",            hasPhoto: false },
  { sr: 24, name: "Obaid Raju",         designation: "Draftsman",             education: "D.A.E. (Civil) & B.Com.",   hasPhoto: false },
  { sr: 25, name: "Sheriyar Ali",       designation: "Draftsman",             education: "D.A.E. (Civil)",            hasPhoto: false },
  { sr: 26, name: "Ali Abbas",          designation: "Draftsman",             education: "D.A.E. (Civil)",            hasPhoto: false },
  { sr: 27, name: "Amir-Ul-Haq",        designation: "Senior Accountant",     education: "B. Com.",                   hasPhoto: false },
  { sr: 28, name: "Shahmeer Imran",     designation: "Assistant Accountant",  education: "I. Com.",                   hasPhoto: false },
  { sr: 29, name: "Nadia Rahim",        designation: "Sales Director",        education: "—",                         hasPhoto: false },
  { sr: 30, name: "Rizwan",             designation: "Quantity Surveyor",     education: "—",                         hasPhoto: false },
];

// ─── Department groupings ─────────────────────────────────────────────────────
const DEPARTMENTS = [
  {
    label: "Engineering & Construction",
    code: "01",
    members: TEAM.filter((m) => [3,4,5,6].includes(m.sr)),
  },
  {
    label: "Administration & HR",
    code: "02",
    members: TEAM.filter((m) => [7,8].includes(m.sr)),
  },
  {
    label: "Architecture",
    code: "03",
    members: TEAM.filter((m) => [9,10,11,12,13,14,15,16,17,18,19].includes(m.sr)),
  },
  {
    label: "Technical & Surveying",
    code: "04",
    members: TEAM.filter((m) => [21,22,23,24,25,26].includes(m.sr)),
  },
  {
    label: "Finance & Sales",
    code: "05",
    members: TEAM.filter((m) => [27,28,29,30].includes(m.sr)),
  },
];

// ─── Initials helper ──────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ─── Photo map for leadership ─────────────────────────────────────────────────
const LEADER_PHOTOS: Record<number, string> = {
  1: ceoPhoto,
  2: paPhoto,
};

// ─── Leadership Card ──────────────────────────────────────────────────────────
function LeadershipCard({ member, index }: { member: Member; index: number }) {
  const photo = LEADER_PHOTOS[member.sr];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "linear-gradient(135deg, #141414 0%, #1c1c1c 100%)",
        border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Photo area */}
      <div
        style={{
          aspectRatio: "4/5",
          position: "relative",
          overflow: "hidden",
          background: "#111",
        }}
      >
        {photo ? (
          <motion.img
            src={photo}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <>
            {/* Fallback grid lines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 96, height: 96,
                  borderRadius: "50%",
                  border: "0.5px solid rgba(255,255,255,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.04)",
                  marginBottom: 20,
                }}
              >
                <span style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: "rgba(255,255,255,0.35)" }}>
                  {getInitials(member.name)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Subtle gradient overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Sr number badge */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            fontFamily: SANS,
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.55)",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: 20,
            border: "0.5px solid rgba(255,255,255,0.12)",
          }}
        >
          {String(member.sr).padStart(2, "0")}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "28px 28px 32px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <p
            style={{
              fontFamily: SANS,
              fontSize: 9,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            {member.designation}
          </p>
          <h3
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 6px",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {member.name}
          </h3>
        </div>
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontFamily: SANS, fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
            {member.education}
          </span>
          <span style={{ fontFamily: SANS, fontSize: 8, letterSpacing: "0.18em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>
            Karachi
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Department Section ───────────────────────────────────────────────────────
function DepartmentSection({
  label,
  code,
  members,
  startIndex,
}: {
  label: string;
  code: string;
  members: Member[];
  startIndex: number;
}) {
  return (
    <div>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          marginBottom: 0,
          paddingBottom: 20,
          borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontSize: 8,
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            minWidth: 28,
          }}
        >
          {code}
        </span>
        <span
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(14px, 1.4vw, 18px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: SANS,
            fontSize: 9,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.1em",
            marginLeft: "auto",
          }}
        >
          {members.length} {members.length === 1 ? "member" : "members"}
        </span>
      </motion.div>

      {/* Member rows */}
      {members.map((member, i) => (
        <MemberRow key={member.sr} member={member} index={startIndex + i} rowIndex={i} totalRows={members.length} />
      ))}
    </div>
  );
}

// ─── Member Row ───────────────────────────────────────────────────────────────
function MemberRow({
  member,
  index,
  rowIndex,
  totalRows,
}: {
  member: Member;
  index: number;
  rowIndex: number;
  totalRows: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: rowIndex * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr auto auto",
        alignItems: "center",
        gap: "0 clamp(16px, 3vw, 48px)",
        padding: "18px 0",
        borderBottom: rowIndex < totalRows - 1 ? "0.5px solid rgba(255,255,255,0.05)" : "none",
        transition: "background-color 0.25s ease",
        borderRadius: 2,
        paddingLeft: 12,
        paddingRight: 12,
        marginLeft: -12,
        marginRight: -12,
        cursor: "default",
      }}
    >
      {/* Sr. no */}
      <span
        style={{
          fontFamily: SANS,
          fontSize: 9,
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.12em",
        }}
      >
        {String(member.sr).padStart(2, "0")}
      </span>

      {/* Name */}
      <span
        style={{
          fontFamily: SANS,
          fontSize: "clamp(13px, 1.2vw, 15px)",
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.01em",
          fontWeight: 400,
        }}
      >
        {member.name}
      </span>

      {/* Designation */}
      <span
        style={{
          fontFamily: SANS,
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.06em",
          textAlign: "right",
          minWidth: "clamp(100px, 14vw, 180px)",
        }}
      >
        {member.designation}
      </span>

      {/* Education */}
      <span
        style={{
          fontFamily: SANS,
          fontSize: 10,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.05em",
          textAlign: "right",
          minWidth: "clamp(80px, 12vw, 160px)",
        }}
      >
        {member.education}
      </span>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function TeamPage() {
  // Count all departments' running row index for stagger
  let runningIndex = 2; // leadership = 2 already

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0a", fontFamily: SANS, color: "#fff" }}
    >
      {/* ── Hero header ──────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "clamp(100px,14vw,160px) clamp(24px,7vw,96px) clamp(60px,8vw,100px)",
          borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background large number */}
        <div
          style={{
            position: "absolute",
            right: "clamp(24px,6vw,80px)",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: SERIF,
            fontSize: "clamp(120px, 20vw, 280px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          30
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: SANS,
            fontSize: 9,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase",
            margin: "0 0 clamp(20px,3vw,32px)",
          }}
        >
          Our People
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: SERIF,
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: 0,
          }}
        >
          The Team
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "clamp(28px,4vw,48px)",
            display: "flex",
            alignItems: "flex-end",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: SANS,
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "44ch",
            }}
          >
            A multidisciplinary studio of 30 professionals spanning architecture,
            engineering, construction management, and technical disciplines —
            headquartered in Karachi since 1993.
          </p>
          <div style={{ display: "flex", gap: 32, flexShrink: 0 }}>
            {[
              { v: "30", l: "Professionals" },
              { v: "4",  l: "Offices" },
              { v: "30+",l: "Years" },
            ].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: SERIF, fontSize: "clamp(28px,3vw,40px)", fontWeight: 400, color: "#fff", margin: "0 0 4px", lineHeight: 1 }}>
                  {s.v}
                </p>
                <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", margin: 0 }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div style={{ padding: "0 clamp(24px,7vw,96px)" }}>

        {/* ── Leadership ────────────────────────────────────────────────────── */}
        <div style={{ paddingTop: "clamp(56px,8vw,100px)", paddingBottom: "clamp(56px,8vw,100px)", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: "clamp(36px,5vw,56px)" }}
          >
            <span style={{ fontFamily: SANS, fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
              00
            </span>
            <span style={{ fontFamily: SERIF, fontSize: "clamp(14px, 1.4vw, 18px)", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>
              Leadership
            </span>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(16px,2.5vw,28px)",
              maxWidth: 680,
            }}
          >
            {TEAM.filter((m) => m.hasPhoto).map((member, i) => (
              <LeadershipCard key={member.sr} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* ── Department Roster ─────────────────────────────────────────────── */}
        <div style={{ paddingTop: "clamp(56px,8vw,100px)", paddingBottom: "clamp(80px,10vw,140px)" }}>

          {/* Column headers */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr auto auto",
              gap: "0 clamp(16px, 3vw, 48px)",
              padding: "0 12px 16px",
              marginBottom: 8,
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ fontFamily: SANS, fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>#</span>
            <span style={{ fontFamily: SANS, fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>Name</span>
            <span style={{ fontFamily: SANS, fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", textAlign: "right", minWidth: "clamp(100px, 14vw, 180px)" }}>Designation</span>
            <span style={{ fontFamily: SANS, fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", textAlign: "right", minWidth: "clamp(80px, 12vw, 160px)" }}>Education</span>
          </motion.div>

          {/* Department sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,6vw,72px)", marginTop: "clamp(32px,5vw,56px)" }}>
            {DEPARTMENTS.map((dept) => {
              const sectionStart = runningIndex;
              runningIndex += dept.members.length;
              return (
                <DepartmentSection
                  key={dept.code}
                  label={dept.label}
                  code={dept.code}
                  members={dept.members}
                  startIndex={sectionStart}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer note ───────────────────────────────────────────────────────── */}
      <div
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          padding: "clamp(28px,4vw,48px) clamp(24px,7vw,96px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p style={{ fontFamily: SANS, fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase", margin: 0 }}>
          Gravity Studio — Karachi
        </p>
        <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>
          30 professionals across Architecture, Engineering, Construction &amp; Management
        </p>
      </div>
    </div>
  );
}