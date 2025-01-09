import React, { useState, useEffect } from 'react';
import '../../styles/lawyer.css';

const LawyerDashboard = () => {
    const [cases, setCases] = useState([
        { title: "Case 1: Contract Dispute", status: "Open", client: "John Doe" },
        { title: "Case 2: Family Law", status: "Pending", client: "Jane Smith" },
    ]);
    const [stats, setStats] = useState({ openCases: 0, upcomingMeetings: 0, tasksDue: 0 });

    useEffect(() => {
        // Fetch stats from the API
        fetch('/api/stats')
            .then(response => response.json())
            .then(data => setStats(data))
            .catch(error => console.error('Error fetching stats:', error));

        // Fetch cases from the API
        fetch('/api/cases')
            .then(response => response.json())
            .then(data => setCases(prevCases => [...prevCases, ...data]))
            .catch(error => console.error('Error fetching cases:', error));
    }, []);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Lawyer Dashboard</h1>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#cases">Cases</a></li>
                        <li><a href="#calendar">Calendar</a></li>
                        <li><a href="#profile">Profile</a></li>
                        <li><a href="#logout">Logout</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section className="overview">
                    <h2>Overview</h2>
                    <div className="stats">
                        <div className="stat-card">
                            <h3>Open Cases</h3>
                            <p>{stats.openCases}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Upcoming Meetings</h3>
                            <p>{stats.upcomingMeetings}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Tasks Due</h3>
                            <p>{stats.tasksDue}</p>
                        </div>
                    </div>
                </section>

                <section id="cases">
                    <h2>Cases</h2>
                    <ul>
                        {cases.map((c, index) => (
                            <li key={index} className="case-item">
                                <strong>{c.title}</strong> - Status: {c.status}, Client: {c.client}
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="calendar">
                    <h2>Calendar</h2>
                    <div className="calendar-widget">
                        <p>Calendar functionality coming soon!</p>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 Codex</p>
            </footer>
        </div>
    );
};

export default LawyerDashboard;
