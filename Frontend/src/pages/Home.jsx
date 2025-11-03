import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../pages.css";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activity] = useState([
        { id: 1, text: "Alice moved 'Onboarding' to In Progress", time: "2h ago" },
        { id: 2, text: "Design assets uploaded for Marketing Website", time: "8h ago" },
        { id: 3, text: "Sprint planning scheduled for Mobile App", time: "1d ago" },
    ]);
    const [team] = useState([
        { id: "u1", name: "Alice Johnson", role: "PM" },
        { id: "u2", name: "Mark Lee", role: "Frontend" },
        { id: "u3", name: "Priya Singh", role: "Backend" },
        { id: "u4", name: "Daniel Kim", role: "Designer" },
    ]);

    useEffect(() => {
        // sample projects for now
        setProjects([
            {
                id: "1",
                name: "Marketing Website",
                status: "Active",
                updatedAt: "2025-10-26",
                progress: 62,
                owner: "Alice Johnson",
            },
            {
                id: "2",
                name: "Mobile App",
                status: "Planning",
                updatedAt: "2025-10-10",
                progress: 12,
                owner: "Priya Singh",
            },
            {
                id: "3",
                name: "API Revamp",
                status: "Completed",
                updatedAt: "2025-09-30",
                progress: 100,
                owner: "Mark Lee",
            },
        ]);
        setLoading(false);
    }, []);

    const stats = {
        total: projects.length,
        active: projects.filter((p) => p.status.toLowerCase() === "active").length,
        planning: projects.filter((p) => p.status.toLowerCase() === "planning").length,
        completed: projects.filter((p) => p.status.toLowerCase() === "completed").length,
    };

    function initials(name = "") {
        const parts = name.trim().split(/\s+/);
        return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
    }
    function avatarColor(seed = "") {
        let h = 0;
        for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
        return `hsl(${h}, 60%, 75%)`;
    }

    return (
        <main className="page-root">
            <div className="card" role="region" aria-label="Home overview">
                {/* Hero */}
                <header className="header" style={{ alignItems: "center" }}>
                    <div>
                        <h1 className="title">Welcome back — Project Manager</h1>
                        <p className="subtitle">Overview of your projects, team activity and quick actions.</p>
                    </div>

                    <div className="controls" style={{ gap: 12 }}>
                        <Link to="/projects" className="btn btn-ghost">View Projects</Link>
                        <Link to="/projects/new" className="btn">New Project</Link>
                    </div>
                </header>

                {/* Top stats */}
                <section style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <div style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", minWidth: 140, textAlign: "center" }}>
                            <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.total}</div>
                            <div style={{ fontSize: 13, color: "var(--muted)" }}>Projects</div>
                        </div>

                        <div style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", minWidth: 140, textAlign: "center" }}>
                            <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.active}</div>
                            <div style={{ fontSize: 13, color: "var(--muted)" }}>Active</div>
                        </div>

                        <div style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", minWidth: 140, textAlign: "center" }}>
                            <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.planning}</div>
                            <div style={{ fontSize: 13, color: "var(--muted)" }}>Planning</div>
                        </div>

                        <div style={{ padding: 12, borderRadius: 10, background: "rgba(255,255,255,0.02)", minWidth: 140, textAlign: "center" }}>
                            <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.completed}</div>
                            <div style={{ fontSize: 13, color: "var(--muted)" }}>Completed</div>
                        </div>

                        <div style={{ marginLeft: "auto", minWidth: 220 }}>
                            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>Quick actions</div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <Link to="/projects/new" className="btn btn-add">Create project</Link>
                                <button className="btn btn-ghost" onClick={() => alert("Import demo CSV (not implemented)")}>Import CSV</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content: featured projects + activity + team */}
                <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <div>
                                <div style={{ fontWeight: 800 }}>Top Projects</div>
                                <div style={{ color: "var(--muted)", fontSize: 13 }}>Projects that need attention</div>
                            </div>
                            <div style={{ color: "var(--muted)" }}>
                                <Link to="/projects" className="link-btn" style={{ color: "var(--muted)" }}>View all</Link>
                            </div>
                        </div>

                        <div className="cards-grid" style={{ marginBottom: 14 }}>
                            {loading ? (
                                <div>Loading…</div>
                            ) : projects.map((p) => (
                                <article key={p.id} className="project-card" style={{ minHeight: 120 }}>
                                    <div className="project-left">
                                        <div className="avatar" style={{ background: avatarColor(p.name) }}>{initials(p.name)}</div>

                                        <div className="project-info">
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                                                <div className="project-name">{p.name}</div>
                                                <div style={{ fontSize: 12, color: "#9aa4b8" }}>ID: {p.id}</div>
                                            </div>

                                            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                                                <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.owner}</div>
                                                <div style={{ marginLeft: "auto", fontSize: 12, color: "#9aa4b8" }}>{p.updatedAt}</div>
                                            </div>

                                            <div style={{ marginTop: 8 }}>
                                                <div style={{ height: 8, background: "rgba(255,255,255,0.03)", borderRadius: 999, overflow: "hidden" }}>
                                                    <div style={{ width: `${p.progress}%`, height: "100%", background: "linear-gradient(90deg,#2563eb,#7c3aed)" }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-right">
                                        <div className="status-pill" style={{ background: p.status === "Completed" ? "#10b98120" : p.status === "Active" ? "#0b84ff20" : "#8a8a8a20", color: p.status === "Completed" ? "#10b981" : p.status === "Active" ? "#0b84ff" : "#8a8a8a" }}>
                                            {p.status}
                                        </div>

                                        <div style={{ display: "flex", gap: 8 }}>
                                            <Link to={`/projects/${p.id}`} className="btn btn-ghost" style={{ height: 36, padding: "0 10px" }}>Open</Link>
                                            <Link to={`/projects/${p.id}/edit`} className="btn btn-ghost" style={{ height: 36, padding: "0 10px" }}>Edit</Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div style={{ marginTop: 8 }}>
                            <div style={{ fontWeight: 800, marginBottom: 8 }}>Recent activity</div>
                            <div style={{ display: "grid", gap: 8 }}>
                                {activity.map((a) => (
                                    <div key={a.id} style={{ padding: 10, borderRadius: 8, background: "rgba(255,255,255,0.02)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ color: "var(--muted)" }}>{a.text}</div>
                                        <div style={{ fontSize: 12, color: "#9aa4b8" }}>{a.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* right column */}
                    <aside>
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontWeight: 800 }}>Team</div>
                            <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 8 }}>Members assigned to your projects</div>
                            <div style={{ display: "grid", gap: 8 }}>
                                {team.map((m) => (
                                    <div key={m.id} className="chip" style={{ alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <div className="chip-initials" style={{ background: avatarColor(m.name), color: "#06202b" }}>{initials(m.name)}</div>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>{m.name}</div>
                                                <div style={{ fontSize: 12, color: "#9aa4b8" }}>{m.role}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <button className="btn btn-ghost" style={{ height: 34, padding: "0 10px" }} onClick={() => alert(`Message ${m.name}`)}>Msg</button>
                                            <button className="btn btn-ghost" style={{ height: 34, padding: "0 10px" }} onClick={() => alert(`View ${m.name}`)}>View</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div style={{ fontWeight: 800 }}>Shortcuts</div>
                            <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 8 }}>Common workflows</div>
                            <div style={{ display: "grid", gap: 8 }}>
                                <Link to="/projects/new" className="btn btn-ghost" style={{ textAlign: "left" }}>+ Create project</Link>
                                <Link to="/dashboard" className="btn btn-ghost" style={{ textAlign: "left" }}>Open dashboard</Link>
                                <button className="btn btn-ghost" onClick={() => alert("Export CSV (demo)")}>Export CSV</button>
                                <button className="btn btn-ghost" onClick={() => alert("Invite member (demo)")}>Invite member</button>
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    );
}