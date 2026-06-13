import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000";
console.log(API_URL)

function ProjectCard({ title, description, tech_stack, github_url }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.desc}>{description}</p>
      <div style={styles.stack}>
        {tech_stack.map((t) => (
          <span key={t} style={styles.badge}>{t}</span>
        ))}
      </div>
      {github_url && (
        <a href={github_url} target="_blank" rel="noreferrer" style={styles.link}>
          View on GitHub →
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/api/projects`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
    return () => controller.abort(); // cleanup on unmount
  }, []);

  if (loading) return <p style={styles.status}>Loading projects…</p>;
  if (error)   return <p style={styles.status}>Error: {error}</p>;
  if (!projects.length) return <p style={styles.status}>No projects found.</p>;

  return (
    <section style={styles.grid}>
      {projects.map((p) => (
        <ProjectCard key={p.id} {...p} />
      ))}
    </section>
  );
}

// ── minimal inline styles — swap for Tailwind / CSS modules as needed ──
const styles = {
  grid:  { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", padding: "2rem" },
  card:  { border: "1px solid #e2e8f0", borderRadius: "10px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" },
  title: { margin: 0, fontSize: "1.2rem" },
  desc:  { margin: 0, color: "#555", fontSize: "0.95rem" },
  stack: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
  badge: { background: "#f0f4ff", color: "#3b5bdb", padding: "2px 10px", borderRadius: "999px", fontSize: "0.8rem" },
  link:  { marginTop: "auto", color: "#3b5bdb", textDecoration: "none", fontWeight: 600 },
  status:{ textAlign: "center", padding: "2rem", color: "#888" },
};