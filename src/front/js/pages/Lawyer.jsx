import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { BounceLoader } from "react-spinners"
import { Context } from '../store/appContext'
import '../../styles/lawyer.css';

export const ProtectedLawyer = ({ children }) => {
  const { actions } = React.useContext(Context)
  const [token, setToken] = React.useState(undefined)

  React.useEffect(() => {
    const verify = async () => {
      const token = await actions.verifyJwt()
      setToken(token)
    }
    verify()
  }, [])

  return (
    <>
      {token !== undefined ?
        children :
        <BounceLoader />
      }
    </>
  )
};

// const clients = [
//   {
//     name: 'Eric',
//     status: 'Pending',
//     time: '10:00 AM',
//     type: 'Initial Consultation'
//   },
//   {
//     name: 'Rebekah',
//     status: 'Confirmed',
//     time: '1:00 PM',
//     type: 'Follow-up'
//   },
//   {
//     name: 'Jose',
//     status: 'In Progress',
//     time: '3:00 PM',
//     type: 'Document Review'
//   }
// ];

const Lawyer = () => {
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
            <li><a href='/profile'>Profile</a></li>
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
          <ul className="list-unstyled">
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
    </div>
  );
}

export const Profile = () => {
  const { actions } = useContext(Context)
  const state = useLocation().state
  const params = new URLSearchParams(location.search)
  const lawyerId = params.get('id')
  const lawyer = JSON.parse(localStorage.getItem("lawyers"))?.find(obj => String(obj.id) === lawyerId)
  const [photo, setPhoto] = React.useState(() => {
    const storedPhoto = localStorage.getItem("Profile Picture")
    return storedPhoto === "null" ? null : storedPhoto
  })


  const handlePhotoChange = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    await actions.storeProfilePicture(formData)
  }


  return (
    <div>
      <input onChange={handlePhotoChange} type='file' name='file' accept='image/*' className='d-none' id='profile-picture' />

      <label style={{ cursor: "pointer", margin: "15px 0px 0px 90px" }} htmlFor='profile-picture'>
        <img className='border' style={{ height: "200px", width: "200px" }} src={state?.photo || lawyer?.photo || photo || `/profile-picture-placeholder.jpg`}></img>
      </label>

    </div>
  )
}

export default Lawyer