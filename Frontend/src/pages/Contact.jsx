import React, { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState({ sent: false, error: "" });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setStatus({ sent: false, error: "Please fill all fields." });
            return;
        }
        setStatus({ sent: true, error: "" });
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus({ sent: false, error: "" }), 4000);
    }

    return (
        <main className="contact-root">
            <style>{`
                :root {
                    --bg: #071026;
                    --card: rgba(255,255,255,0.03);
                    --muted: #94a3b8;
                    --text: #e6eef8;
                    --accent: linear-gradient(90deg,#2563eb,#7c3aed);
                    --success: #10b981;
                    --danger: #ef4444;
                }

                .contact-root {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                    background: radial-gradient(1200px 400px at 10% 10%, rgba(59,130,246,0.07), transparent),
                                            radial-gradient(800px 300px at 90% 90%, rgba(124,58,237,0.05), transparent),
                                            var(--bg);
                    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
                    color: var(--text);
                }

                .card {
                    width: 100%;
                    max-width: 780px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 16px;
                    padding: 28px;
                    box-shadow: 0 10px 30px rgba(2,6,23,0.7);
                    backdrop-filter: blur(6px);
                }

                .header {
                    margin-bottom: 18px;
                }

                .title {
                    margin: 0;
                    font-size: 20px;
                    letter-spacing: -0.2px;
                }

                .subtitle {
                    margin: 6px 0 0;
                    color: var(--muted);
                    font-size: 13px;
                }

                form {
                    display: grid;
                    gap: 14px;
                }

                .row {
                    display: grid;
                    gap: 8px;
                }

                label {
                    font-size: 13px;
                    color: var(--muted);
                    display: block;
                }

                input[type="text"],
                input[type="email"],
                textarea {
                    width: 100%;
                    padding: 12px 14px;
                    border-radius: 12px;
                    background: var(--card);
                    border: 1px solid rgba(255,255,255,0.04);
                    color: var(--text);
                    font-size: 14px;
                    outline: none;
                    transition: box-shadow .18s ease, border-color .12s ease, transform .08s ease;
                    box-shadow: inset 0 -1px 0 rgba(0,0,0,0.2);
                }

                input:focus,
                textarea:focus {
                    border-color: rgba(96,165,250,0.9);
                    box-shadow: 0 6px 20px rgba(2,6,23,0.6), 0 0 0 6px rgba(37,99,235,0.06);
                    transform: translateY(-1px);
                }

                textarea {
                    min-height: 140px;
                    resize: vertical;
                }

                .actions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    align-items: center;
                    margin-top: 6px;
                }

                .btn {
                    background: var(--accent);
                    color: white;
                    padding: 10px 16px;
                    border-radius: 12px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    box-shadow: 0 6px 18px rgba(37,99,235,0.18);
                    transition: transform .12s ease, box-shadow .12s ease;
                }

                .btn:active { transform: translateY(1px) scale(.998); }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    box-shadow: none;
                }

                .meta {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    justify-content: flex-end;
                }

                .notice {
                    color: var(--success);
                    font-size: 13px;
                }

                .error {
                    color: var(--danger);
                    font-size: 13px;
                }

                @media (max-width: 560px) {
                    .card { padding: 20px; border-radius: 12px; }
                    .title { font-size: 18px; }
                }
            `}</style>

            <div className="card" role="region" aria-label="Contact form">
                <header className="header">
                    <h2 className="title">Contact</h2>
                    <p className="subtitle">Questions, feedback or partnership inquiries — send a message.</p>
                </header>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="you@domain.com"
                        />
                    </div>

                    <div className="row">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                        />
                    </div>

                    <div className="actions">
                        <div className="meta" style={{ flex: 1 }}>
                            {status.sent && <div className="notice">Message saved locally — no backend connected.</div>}
                            {status.error && <div className="error">{status.error}</div>}
                        </div>

                        <button type="submit" className="btn">Send message</button>
                    </div>
                </form>
            </div>
        </main>
    );
}