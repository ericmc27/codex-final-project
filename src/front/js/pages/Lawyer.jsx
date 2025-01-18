import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { BounceLoader } from "react-spinners"
import { Context } from '../store/appContext'
import '../../styles/lawyer.css'

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


const Lawyer = () => {
  const [cases, setCases] = useState([])
  const {actions} = useContext(Context)
  const [stats, setStats] = useState({ openCases: 0, incomingCases: 0, tasksDue: 0 });

  console.log("casesss", cases)
  useEffect(()=>{
    const fetchIncomingCases = async ()=>{
      const data = await actions.getIncomingCases()
      stats.incomingCases = data.length
      setCases(data)
    }
    fetchIncomingCases()
  }, [])

  return (
    <div style={{width:"950px"}} className="dashboard m-auto">
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
              <h3>Incoming Cases</h3>
              <p>{stats.incomingCases}</p>
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
              {
                cases.map((caseObj)=>{
                  return( 
                  <li className='case-item'>
                    <div className='d-flex justify-content-between'>
                      <div><span className='fw-bold'>Title: </span>{caseObj.title}</div>
                      <div><span className='fw-bold'>Case Number: </span>{caseObj.case_number}</div>
                    </div>
                    <div><span className='fw-bold'>Client Name: </span>{caseObj.client.name}</div>
                    <div style={{height: "150px", backgroundColor:"whitesmoke"}} className='border border-1'>{caseObj.body}</div>
                    <div className='d-flex justify-content-end mt-3 gap-3'>
                      <button className='btn btn-success'>Accept</button>
                      <button className='btn btn-danger'>Decline</button>
                    </div>
                  </li>
                  )
                })
              }
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
  const [name, setName] = React.useState(localStorage.getItem("Name"))
  const [casesSolved, setCasesSolved] = React.useState([])
  const [specialty, setSpecialty] = React.useState(localStorage.getItem("Specialty"))
  const [message, setMessage] = React.useState({title: "", body: ""})
  const [photo, setPhoto] = React.useState(() => {
    const storedPhoto = localStorage.getItem("Profile Picture")
    return storedPhoto === "null" ? null : storedPhoto
  })
  const [display, setDisplay] = React.useState("casesSolved")
 

  const handlePhotoChange = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    await actions.storeProfilePicture(formData)
  }

  // const handleKeyDown = async(e)=>{
  //   if(e.key === "Enter"){
  //     actions.sendMessage(e.target.value)
  //     e.target.value = ""
  //   }
  // }

  const handleMessage = (e)=>{
    const {id, value} = e.target
    setMessage(prev=>({...prev, [id]:value}))
  }

  const caseSubmitted = async ()=>{
    const title = document.getElementById("title")
    const body = document.getElementById("body")

    await actions.submitCase(message, lawyer)
    title.value = ""
    body.value = ""
  }

  React.useEffect(()=>{
    const casesSolved = async ()=>{
      const data = await actions.closedCases(lawyerId)
      setCasesSolved(data)
    }

    casesSolved()
  }, [])
  
  return (
    <div className='d-flex'>
      <div style={{border: "1px solid #3E362E", height: "600px", width: "300px" }} className='d-flex flex-column align-items-center ms-5 mt-3 rounded'>
        <input onChange={handlePhotoChange} type='file' name='file' accept='image/*' className='d-none' id='profile-picture' />
        <label className='mt-4' style={{ cursor: "pointer" }} htmlFor='profile-picture'>
          <img className='border rounded-circle' style={{ height: "200px", width: "200px" }} src={state?.photo || lawyer?.photo || photo || `/profile-picture-placeholder.jpg`}></img>
        </label>

        <h2 className='text-capitalize'>{name}</h2>
        <h4>{specialty} Lawyer</h4>

        <div style={{ height: "200px", width: "200px", backgroundColor: "#FF8C00", color:"#3E362E"}} className='fw-bold mt-5 rounded'>
          <label className='label-case mt-2 ms-3' onClick={() => (setDisplay("casesSolved"))}><img width={"40px"} src='/cases-solved.png' /> CASES SOLVED</label>
          <label className='label-case mt-3 ms-3' onClick={() => (setDisplay("submitCase"))}><img width={"45px"} src='/legal-document.png' />SUBMIT A CASE</label>
          {/* <label className='label-case mt-3 ms-3' onClick={() => (setDisplay("contactMe"))}><img width={"45px"} src='/contact-me.png' /> CONTACT ME</label> */}
        </div>
      </div>

      {
        display === "casesSolved" ?
          <div style={{ marginLeft: "200px" }} className='rounded mt-3 d-flex flex-column gap-3'>
            {
              casesSolved.map((cases, index) => {
                return (
                  <div key={index} style={{ height: "500px", width: "500px" }} className='bg-warning rounded'>{cases.title}</div>
                )
              })
            }
          </div>
          : display === "submitCase" ?
            <div style={{ height: "545px", width: "570px", backgroundColor: "#3E362E"}} className='d-flex flex-column justify-content-center align-items-center m-auto rounded border'>
              <label htmlFor='title' className='text-white mb-3' style={{marginTop: "40px"}}>TITLE</label>
              <input type='text' id='title' className="mb-4" value={message.title} onChange={handleMessage}/>
              <label className='text-white mb-3'>CASE BRIEF DESCRIPTION</label>
              <textarea id='body' className='overflow-hidden' style={{ height: "350px", width: "500px"}} value={message.body} onChange={handleMessage}></textarea>
              <button type='button' className='btn btn-primary mt-3' style={{marginBottom: "25px"}} onClick={caseSubmitted}>Send case</button>
            </div>

         :
      <div>
        <div style={{height: "485px", width: "500px", margin: "60px 0px 0px 300px"}} className='d-flex flex-column border rounded'>
              <div style={{height:"22px", width:"24px"}} className='rounded-circle border ms-auto me-4 mt-4'></div>
              <input className='mt-auto' type="text" onKeyDown={handleKeyDown} style={{width:"500px"}}/>
        </div>
      </div>}
    </div>
  )
}

export default Lawyer