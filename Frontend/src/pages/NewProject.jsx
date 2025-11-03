import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages.css";

export default function NewProject() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("planning");
    const [assigneeInput, setAssigneeInput] = useState("");
    const [assignees, setAssignees] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function addAssigneeFromInput() {
        const val = assigneeInput.trim();
        if (val && !assignees.includes(val)) setAssignees((s) => [...s, val]);
        setAssigneeInput("");
    }
    function removeAssignee(name) { setAssignees((s) => s.filter((a) => a !== name)); }
    function handleFiles(e) { setFiles(Array.from(e.target.files)); }
    function validate() {
        if (!title.trim()) { setError("Title is required."); return false; }
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) { setError("End date cannot be before start date."); return false; }
        return true;
    }
    async function handleSubmit(e) {
        e.preventDefault(); setError(""); if (!validate()) return;
        setLoading(true);
        try { /* placeholder: no backend */ navigate("/"); } catch (err) { setError(err.message || "An error occurred."); } finally { setLoading(false); }
    }

    return (
        <main className="page-root">
            <div className="card" role="region" aria-label="Create project">
                <header className="header">
                    <div>
                        <h2 className="title">Create New Project</h2>
                        <p className="subtitle">Add project details below.</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <label>Title *</label>
                        <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" required />
                    </div>

                    <div className="row">
                        <label>Description</label>
                        <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ flex: 1 }}>
                            <label>Start</label>
                            <input className="form-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>End</label>
                            <input className="form-input" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                        <div style={{ flex: 1 }}>
                            <label>Priority</label>
                            <select className="form-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Status</label>
                            <select className="form-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="planning">Planning</option>
                                <option value="active">Active</option>
                                <option value="on-hold">On Hold</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <label>Assignees</label>
                        <div style={{ display: "flex", gap: 8 }}>
                            <input className="form-input" value={assigneeInput} onChange={(e) => setAssigneeInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addAssigneeFromInput(); } }} placeholder="Type name and press Enter" />
                            <button type="button" className="btn-ghost btn" onClick={addAssigneeFromInput} style={{ padding: "8px 12px" }}>Add</button>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                            {assignees.map((a) => (
                                <div key={a} className="chip">
                                    <div style={{ marginRight: 8 }}>{a}</div>
                                    <button type="button" onClick={() => removeAssignee(a)} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: "pointer" }}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="row">
                        <label>Attachments</label>
                        <input className="form-input" type="file" multiple onChange={handleFiles} />
                        {files.length > 0 && <div style={{ marginTop: 6 }}>{files.map((f) => <div key={f.name} style={{ fontSize: 13 }}>{f.name} ({Math.round(f.size / 1024)} KB)</div>)}</div>}
                    </div>

                    {error && <div className="error">{error}</div>}

                    <div className="actions">
                        <div style={{ flex: 1 }} />
                        <button type="button" onClick={() => navigate("/")} className="btn btn-ghost" style={{ marginRight: 8 }}>Cancel</button>
                        <button type="submit" disabled={loading} className="btn">{loading ? "Creating..." : "Create Project"}</button>
                    </div>
                </form>
            </div>
        </main>
    );
}