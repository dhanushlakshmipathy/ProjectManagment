import React, { useState, useMemo } from "react";

/**
 * Profile.jsx
 * Project management themed profile page with:
 * - User summary (avatar, name, role, contact)
 * - Key stats (projects, tasks, completed, teams)
 * - Active projects list
 * - Assigned tasks with status controls
 * - Recent activity feed
 * - Editable profile modal
 *
 * Self-contained (no external libs). Replace mock data with real API calls.
 */

const styles = {
    page: {
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        padding: 24,
        background: "#f5f7fb",
        minHeight: "100vh",
        color: "#0f1724",
    },
    container: {
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        gap: 20,
        alignItems: "start",
    },
    card: {
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 6px 18px rgba(18,38,63,0.06)",
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: "50%",
        background: "linear-gradient(135deg,#4f46e5,#06b6d4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 32,
        marginRight: 12,
        flexShrink: 0,
    },
    headerRow: { display: "flex", alignItems: "center" },
    nameBlock: { display: "flex", flexDirection: "column" },
    smallMuted: { color: "#64748b", fontSize: 13 },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 12,
        marginTop: 12,
    },
    stat: {
        background: "#f8fafc",
        borderRadius: 8,
        padding: 10,
        textAlign: "center",
    },
    list: { marginTop: 12, display: "grid", gap: 8 },
    projectItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        background: "#fff",
        border: "1px solid #eef2ff",
    },
    tag: {
        padding: "4px 8px",
        borderRadius: 999,
        fontSize: 12,
        color: "#fff",
    },
    btn: {
        padding: "8px 12px",
        borderRadius: 8,
        background: "#111827",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
    linkBtn: {
        background: "transparent",
        border: "none",
        color: "#2563eb",
        cursor: "pointer",
        padding: 0,
        fontSize: 14,
    },
    modalBackdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
    },
    modal: {
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        width: 560,
        boxShadow: "0 20px 40px rgba(2,6,23,0.25)",
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #e6eef7",
        marginTop: 6,
        marginBottom: 12,
    },
    smallMutedBlock: {
        color: "#6b7280",
        fontSize: 13,
    },
};

function Avatar({ name, bg }) {
    const initials = name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    return (
        <div style={{ ...styles.avatar, background: bg || styles.avatar.background }}>
            {initials}
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div style={styles.stat}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{value}</div>
            <div style={styles.smallMuted}>{label}</div>
        </div>
    );
}

function ProjectItem({ p, onOpen }) {
    const color = p.color || "#06b6d4";
    return (
        <div style={styles.projectItem}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 10, height: 40, background: color, borderRadius: 6 }} />
                <div>
                    <div style={{ fontWeight: 700 }}>{p.name}</div>
                    <div style={styles.smallMuted}>{p.description}</div>
                </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ ...styles.tag, background: p.status === "Active" ? "#10b981" : "#64748b" }}>
                    {p.status}
                </div>
                <button style={styles.linkBtn} onClick={() => onOpen(p)}>
                    Open
                </button>
            </div>
        </div>
    );
}

function TaskRow({ t, onToggle }) {
    return (
        <div style={{ ...styles.projectItem, background: "#f8fafc" }}>
            <div>
                <div style={{ fontWeight: 700, textDecoration: t.done ? "line-through" : "none" }}>{t.title}</div>
                <div style={styles.smallMuted}>{t.project}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={styles.smallMutedBlock}>{t.due}</div>
                <button
                    style={{
                        ...styles.btn,
                        padding: "6px 10px",
                        background: t.done ? "#10b981" : "#374151",
                    }}
                    onClick={() => onToggle(t.id)}
                >
                    {t.done ? "Done" : "Mark"}
                </button>
            </div>
        </div>
    );
}

export default function Profile() {
    // mock user & data; replace with real API hooks (useEffect/fetch)
    const [user, setUser] = useState({
        name: "Asha Patel",
        role: "Product Manager",
        email: "asha.patel@acme.com",
        location: "Bengaluru, India",
        bio: "Building impactful products and coordinating cross-functional teams.",
        initialsBg: "linear-gradient(135deg,#7c3aed,#06b6d4)",
    });

    const [projects] = useState([
        { id: 1, name: "Client Portal Redesign", description: "Redesigning customer dashboard", status: "Active", color: "#7c3aed" },
        { id: 2, name: "Mobile Sprint Q4", description: "Mobile app performance initiative", status: "Active", color: "#ef4444" },
        { id: 3, name: "Hiring Plan", description: "Expand engineering team", status: "Planning", color: "#f59e0b" },
    ]);

    const [tasks, setTasks] = useState([
        { id: 101, title: "Sprint planning", project: "Client Portal Redesign", due: "2025-11-05", done: false },
        { id: 102, title: "Stakeholder sync", project: "Mobile Sprint Q4", due: "2025-11-02", done: true },
        { id: 103, title: "Design review", project: "Client Portal Redesign", due: "2025-11-08", done: false },
    ]);

    const [activity] = useState([
        { id: 1, text: "Completed wireframes for onboarding flow", time: "2h ago" },
        { id: 2, text: "Assigned task to Rahul for API integration", time: "1d ago" },
        { id: 3, text: "Marked mobile sprint as Active", time: "3d ago" },
    ]);

    const [isEditOpen, setEditOpen] = useState(false);

    const stats = useMemo(() => {
        const totalProjects = projects.length;
        const totalTasks = tasks.length;
        const completed = tasks.filter((t) => t.done).length;
        const teams = 3; // placeholder
        return { totalProjects, totalTasks, completed, teams };
    }, [projects, tasks]);

    function toggleTask(id) {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }

    function openProject(p) {
        // stub: navigate to project detail in real app
        alert(`Open project: ${p.name}`);
    }

    function saveProfile(form) {
        setUser((u) => ({ ...u, ...form }));
        setEditOpen(false);
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Left column */}
                <div style={{ display: "grid", gap: 20 }}>
                    <div style={{ ...styles.card }}>
                        <div style={styles.headerRow}>
                            <Avatar name={user.name} bg={user.initialsBg} />
                            <div style={styles.nameBlock}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ fontSize: 20, fontWeight: 800 }}>{user.name}</div>
                                    <div style={{ ...styles.smallMuted, fontSize: 13 }}>{user.role}</div>
                                </div>
                                <div style={styles.smallMuted}>{user.email}</div>
                                <div style={styles.smallMuted}>{user.location}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <div style={styles.smallMuted}>{user.bio}</div>
                        </div>

                        <div style={styles.statsGrid}>
                            <StatCard label="Projects" value={stats.totalProjects} />
                            <StatCard label="Tasks" value={stats.totalTasks} />
                            <StatCard label="Completed" value={stats.completed} />
                            <StatCard label="Teams" value={stats.teams} />
                        </div>

                        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <button style={styles.btn} onClick={() => setEditOpen(true)}>
                                Edit Profile
                            </button>
                            <button
                                style={{
                                    ...styles.btn,
                                    background: "#ffffff",
                                    color: "#111827",
                                    border: "1px solid #e6eef7",
                                }}
                                onClick={() => alert("Open settings")}
                            >
                                Settings
                            </button>
                        </div>
                    </div>

                    <div style={{ ...styles.card }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontWeight: 700 }}>Active Projects</div>
                            <button style={styles.linkBtn} onClick={() => alert("View all projects")}>
                                View all
                            </button>
                        </div>
                        <div style={styles.list}>
                            {projects.map((p) => (
                                <ProjectItem key={p.id} p={p} onOpen={openProject} />
                            ))}
                        </div>
                    </div>

                    <div style={{ ...styles.card }}>
                        <div style={{ fontWeight: 700 }}>Contact & Links</div>
                        <div style={{ marginTop: 8 }}>
                            <div style={styles.smallMuted}>Email</div>
                            <div style={{ fontWeight: 600 }}>{user.email}</div>
                            <div style={styles.smallMuted}>Location</div>
                            <div style={{ fontWeight: 600 }}>{user.location}</div>
                            <div style={styles.smallMuted}>Slack</div>
                            <div style={{ fontWeight: 600 }}>#product</div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div style={{ display: "grid", gap: 20 }}>
                    <div style={{ ...styles.card }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 18 }}>Assigned Tasks</div>
                                <div style={styles.smallMuted}>Your current action items</div>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button style={{ ...styles.btn, background: "#06b6d4" }} onClick={() => alert("Create task")}>
                                    + New Task
                                </button>
                                <button
                                    style={{ ...styles.btn, background: "#eef2ff", color: "#3730a3" }}
                                    onClick={() => {
                                        // quick demo: mark all done
                                        setTasks((prev) => prev.map((t) => ({ ...t, done: true })));
                                    }}
                                >
                                    Mark all done
                                </button>
                            </div>
                        </div>

                        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                            {tasks.map((t) => (
                                <TaskRow key={t.id} t={t} onToggle={toggleTask} />
                            ))}
                            {tasks.length === 0 && <div style={styles.smallMuted}>No tasks assigned.</div>}
                        </div>
                    </div>

                    <div style={{ ...styles.card }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 18 }}>Recent Activity</div>
                                <div style={styles.smallMuted}>Project and team updates</div>
                            </div>
                            <div style={styles.smallMutedBlock}>Last 7 days</div>
                        </div>

                        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                            {activity.map((a) => (
                                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div>{a.text}</div>
                                        <div style={styles.smallMuted}>{a.time}</div>
                                    </div>
                                    <div style={styles.smallMutedBlock}>Project</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ ...styles.card }}>
                        <div style={{ fontWeight: 800 }}>Performance</div>
                        <div style={styles.smallMuted}>Task throughput this month</div>

                        {/* Simple inline bar chart placeholder */}
                        <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "end" }}>
                            {[2, 5, 4, 7, 3, 6, 8].map((v, i) => (
                                <div key={i} style={{ width: 26, height: v * 10, background: "#6366f1", borderRadius: 6 }} />
                            ))}
                        </div>

                        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                            <div style={styles.smallMuted}>Completed</div>
                            <div style={{ fontWeight: 700 }}>{stats.completed}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setEditOpen(false)}
                    onSave={(form) => saveProfile(form)}
                />
            )}
        </div>
    );
}

/* Simple controlled modal for editing profile */
function EditProfileModal({ user, onClose, onSave }) {
    const [form, setForm] = useState({
        name: user.name,
        role: user.role,
        email: user.email,
        location: user.location,
        bio: user.bio,
    });

    return (
        <div style={styles.modalBackdrop} role="dialog" aria-modal="true">
            <div style={styles.modal}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 800 }}>Edit Profile</div>
                    <div style={styles.smallMuted}>{user.email}</div>
                </div>

                <div style={{ marginTop: 12 }}>
                    <label style={styles.smallMuted}>Full name</label>
                    <input
                        style={styles.input}
                        value={form.name}
                        onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    />
                    <label style={styles.smallMuted}>Role</label>
                    <input
                        style={styles.input}
                        value={form.role}
                        onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
                    />
                    <label style={styles.smallMuted}>Email</label>
                    <input
                        style={styles.input}
                        value={form.email}
                        onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    />
                    <label style={styles.smallMuted}>Location</label>
                    <input
                        style={styles.input}
                        value={form.location}
                        onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
                    />
                    <label style={styles.smallMuted}>Bio</label>
                    <textarea
                        rows={3}
                        style={{ ...styles.input, resize: "vertical" }}
                        value={form.bio}
                        onChange={(e) => setForm((s) => ({ ...s, bio: e.target.value }))}
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                    <button
                        style={{
                            ...styles.btn,
                            background: "#eef2ff",
                            color: "#3730a3",
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        style={styles.btn}
                        onClick={() => {
                            onSave(form);
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}