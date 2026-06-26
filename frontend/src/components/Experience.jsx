import { useState, useEffect } from "react";
import { fetchExperience } from "../services/api"
import { 
  TYPE_META,  
} from "../constants";
 
function Badge({ type }) {
  const meta = TYPE_META[type] || { label: type, bg: "#f3f4f6", color: "#374151" };
  return (
    <span style={{
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      padding: "2px 8px",
      borderRadius: "999px",
      background: meta.bg,
      color: meta.color,
    }}>
      {meta.label}
    </span>
  );
}
 
function CompanyAvatar({ company }) {
  return (
    <div style={{
      width: 44,
      height: 44,
      borderRadius: 10,
      // background: "blue",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontFamily: "'Berkeley Mono', 'Fira Code', monospace",
      fontWeight: 700,
      fontSize: "0.85rem",
      color: "#fff",
      letterSpacing: "-0.02em",
    }}>
      {company.logo}
    </div>
  );
}
 
function SkillPill({ label }) {
  return (
    <span style={{
      fontSize: "0.72rem",
      fontWeight: 500,
      padding: "3px 9px",
      borderRadius: 6,
      border: "1px solid #e5e7eb",
      background: "#f9fafb",
      color: "#374151",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}
 
function ExperienceCard({ experience, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
 
  // experience may embed company / skill objects directly, or just IDs
  const company = experience.company ?? null;
  const companyId = experience.company_id;
  const companyName = company?.name ?? companyId;
  return (
    <div style={{
      borderRadius: 14,
      border: "1px solid #e5e7eb",
      background: "#fff",
      overflow: "hidden",
      transition: "box-shadow 0.15s",
      boxShadow: open ? "0 4px 24px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "18px 20px",
          cursor: "pointer",
          display: "grid",
          gridTemplateColumns: "44px 1fr auto",
          gap: "14px",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <CompanyAvatar company={company} />
 
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "0.97rem",
              color: "#111827",
              lineHeight: 1.3,
            }}>
              {experience.title}
            </span>
            <Badge type={experience.type} />
          </div>
          <div style={{
            marginTop: 2,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.82rem",
            color: "#6b7280",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}>
            <span>{companyName}</span>
            {experience.date_range && (
              <>
                <span style={{ color: "#d1d5db" }}>·</span>
                <span>{experience.date_range.start} – {experience.date_range.end}</span>
              </>
            )}
          </div>
        </div>
 
        {/* Chevron */}
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#9ca3af" }}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
 
      {/* Expandable body */}
      {open && (
        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f3f4f6" }}>
          {/* Bullets */}
          {experience.bullets.length > 0 && (
            <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {experience.bullets.map(b => (
                <li key={b.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{
                    marginTop: "0.45em",
                    width: 5, height: 5, borderRadius: "50%",
                    background: "gray",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.875rem",
                    color: "#374151",
                    lineHeight: 1.6,
                  }}>
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
 
          {/* Skills */}
          {experience.skill_ids.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {/* {experience.skill_ids.map(sid => (
                <SkillPill key={sid} label={SKILLS[sid] || sid} />
              ))} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
 
// ─── Main export ──────────────────────────────────────────────────────────────
 
export default function Experience() {
    const [experience, setExperience] = useState([]);
    const [status, setStatus] = useState("loading"); // "loading" | "ok" | "error"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      useEffect(() => {
        const loadData = async () => {
          try {
            const data = await fetchExperience(); 
            setExperience(data); 
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        loadData(); 
      }, []); // Empty dependency means it runs once on mount 

    if (loading) return <p style={styles.status}>Loading experience…</p>;
    if (error)   return <p style={styles.status}>Error: {error}</p>;
    if (!experience.length) return <p style={styles.status}>No experience found.</p>;

    return (
    <div style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      maxWidth: 660,
      margin: "40px auto",
      padding: "0 16px",
    }}>
      <h2 style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        letterSpacing: "-0.01em",
        color: "#111827",
        marginBottom: 16,
      }}>
        Experience
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {experience.map((exp, i) => (
          <ExperienceCard key={exp.id} experience={exp} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  status: {
    padding: '20px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#4a5568', // Neutral dark gray for general text
    backgroundColor: '#f7fafc', // Light gray background card
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    maxWidth: '400px',
    margin: '20px auto',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  }
};
 