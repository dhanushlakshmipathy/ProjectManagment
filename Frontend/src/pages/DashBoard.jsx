import React, { useState } from "react";
import "../pages.css";

const STATUSES = ["Planning", "In Progress", "Blocked", "Completed"];

const initialProjects = [
    {
        id: 1,
        name: "Website Redesign",
        status: "In Progress",
        teammates: [
            { id: "t1", name: "Alice Johnson", role: "PM" },
            { id: "t2", name: "Mark Lee", role: "Frontend" },
        ],
    },
    {
        id: 2,
        name: "Mobile App v2",
        status: "Planning",
        teammates: [
            { id: "t3", name: "Priya Singh", role: "Backend" },
            { id: "t4", name: "Daniel Kim", role: "Designer" },
        ],
    },
];

export default function DashBoard() {
    const [projects, setProjects] = useState(initialProjects);
    const [editing, setEditing] = useState(null);
    const [query, setQuery] = useState("");

    function avatarColor(seed) {
        // reproducible pastel color based on name
        let h = 0;
        for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
        return `hsl(${h}, 60%, 75%)`;
    }

    function initials(name) {
        if (!name) return "";
        const parts = name.trim().split(/\s+/);
        return (parts[0][0] || "") + (parts[1] ? parts[1][0] : "");
    }

    function openEdit(project) {
        setEditing({
            ...project,
            teammatesText: project.teammates.map((t) => `${t.name} (${t.role})`).join(", "),
        });
    }

    function closeEdit() {
        setEditing(null);
    }

    function saveEdit() {
        if (!editing) return;
        const parsedTeammates = editing.teammatesText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
            .map((entry, idx) => {
                const m = entry.match(/^(.*)\s*\((.*)\)\s*$/);
                return {
                    id: `t${Date.now()}${idx}`,
                    name: m ? m[1].trim() : entry,
                    role: m ? m[2].trim() : "Contributor",
                };
            });

        setProjects((prev) =>
            prev.map((p) =>
                p.id === editing.id
                    ? {
                            ...p,
                            name: editing.name,
                            status: editing.status,
                            teammates: parsedTeammates,
                        }
                    : p
            )
        );
        closeEdit();
    }

    function removeProject(id) {
        if (!window.confirm("Remove project?")) return;
        setProjects((prev) => prev.filter((p) => p.id !== id));
    }

    const visible = projects.filter(
        (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.teammates.some((t) => t.name.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <main className="page-root">
            <div className="card" role="region" aria-label="Dashboard">
                <header className="header">
                    <div>
                        <h1 className="title">Projects Dashboard</h1>
                        <p className="subtitle">Team contacts styled cards — quick overview & actions</p>
                    </div>

                    <div className="controls">
                        <input className="form-input search" placeholder="Search project or teammate..." value={query} onChange={(e) => setQuery(e.target.value)} />
                        <button className="btn-add" onClick={() => setProjects((prev) => [...prev, { id: Date.now(), name: "New Project", status: "Planning", teammates: [] }])}>+ New</button>
                    </div>
                </header>

                <div className="cards-grid">
                    {visible.length === 0 && <div style={{ padding: 16, color: "var(--muted)" }}>No projects found.</div>}

                    {visible.map((p) => (
                        <article key={p.id} className="project-card">
                            <div className="project-left">
                                <div className="avatar" style={{ background: avatarColor(p.name) }} aria-hidden>
                                    {initials(p.name)}
                                </div>

                                <div className="project-info">
                                    <div className="project-name">{p.name}</div>
                                    <div className="project-meta">ID: <span style={{ color: "#6b6b6b" }}>{p.id}</span></div>

                                    <div className="chips-row">
                                        {p.teammates.length === 0 ? (
                                            <span style={{ color: "var(--muted)" }}>No teammates</span>
                                        ) : (
                                            p.teammates.slice(0, 4).map((t) => (
                                                <div key={t.id} className="chip">
                                                    <div className="chip-initials">{initials(t.name)}</div>
                                                    <div style={{ marginLeft: 8 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                                                        <div style={{ fontSize: 12, color: "#9aa4b8" }}>{t.role}</div>
                                                    </div>
                                                </div>
                                            ))
                                        )}

                                        {p.teammates.length > 4 && <div className="more-badge">+{p.teammates.length - 4}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="card-right">
                                <StatusPill status={p.status} />

                                <div style={{ display: "flex", gap: 8 }}>
                                    <button className="btn btn-ghost" onClick={() => openEdit(p)}>Edit</button>
                                    <button className="btn btn-ghost" onClick={() => removeProject(p.id)} style={{ background: "transparent", color: "var(--danger)" }}>Remove</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {editing && (
                    <div className="modal-overlay" onClick={closeEdit}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: avatarColor(editing.name) }}>
                                        <div style={{ fontWeight: 800 }}>{initials(editing.name)}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 700 }}>{editing.name}</div>
                                        <div style={{ fontSize: 13, color: "var(--muted)" }}>Edit project details</div>
                                    </div>
                                </div>
                                <StatusPill status={editing.status} />
                            </div>

                            <div style={{ marginTop: 14 }}>
                                <label> Name </label>
                                <input className="form-input" value={editing.name} onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))} />

                                <label style={{ marginTop: 12 }}> Status </label>
                                <select className="form-input" value={editing.status} onChange={(e) => setEditing((s) => ({ ...s, status: e.target.value }))}>
                                    {STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
                                </select>

                                <label style={{ marginTop: 12 }}> Teammates (comma separated — "Name (Role)") </label>
                                <input className="form-input" value={editing.teammatesText} onChange={(e) => setEditing((s) => ({ ...s, teammatesText: e.target.value }))} />
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
                                <button className="btn btn-ghost" onClick={closeEdit}>Cancel</button>
                                <button className="btn" onClick={saveEdit} style={{ marginLeft: 8 }}>Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

function StatusPill({ status }) {
    const color = status === "Completed" ? "#28a745" : status === "In Progress" ? "#0b84ff" : status === "Blocked" ? "#ff5c5c" : "#8a8a8a";
    return (
        <div className="status-pill" style={{ background: `${color}20`, color }}>
            <span style={{ width: 10, height: 10, borderRadius: 10, background: color }} />
            <span>{status}</span>
        </div>
    );
}