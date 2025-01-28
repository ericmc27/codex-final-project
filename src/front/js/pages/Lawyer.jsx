import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { BounceLoader } from "react-spinners"
import { Context } from '../store/appContext'
import '../../styles/lawyer.css'
import { socket } from '..'





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
  const [openCases, setOpenCases] = useState([])
  const [incomingCases, setIncomingCases] = useState([])
  const { actions } = useContext(Context)
  const [stats, setStats] = useState({ openCases: 0, incomingCases: 0 });
  const [currentCase, setCurrentCase] = useState("openCases")
  const [clientsList, setClientsList] = useState({})
  const [currentClient, setCurrentClient] = useState("")
  const [lawyerMessage, setLawyerMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)


  const acceptCase = async (caseNumber, clientEmail) => {
    await actions.acceptCase(caseNumber, clientEmail)
  }

  const rejectCase = async (caseNumber, clientEmail) => {
    await actions.rejectCase(caseNumber, clientEmail)
  }

  const handleClistListClick = (client) => {
    setCurrentClient(client)
    setShowMessage(prev => !prev)
  }

  const handleMessage = (e) => {
    setLawyerMessage(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      socket.emit('messageToClient', currentClient, lawyerMessage)
      const messageBox = document.getElementById('messageBox')
      const messagesDiv = document.getElementById('messageBox')
      const messageDiv = document.createElement('div')
      messageDiv.style.cssText = 'background-color: lightgreen; height: auto; width:fit-content; padding: 10px; margin-top: 13px; margin-left: 13px'
      messageDiv.className = 'border rounded'
      messageDiv.innerText = lawyerMessage
      messagesDiv.append(messageDiv)
      messageBox.scrollTop = messageBox.scrollHeight
      setLawyerMessage("")
    }
  }

  useEffect(() => {
    const fetchOpenCases = async () => {
      const data = await actions.getOpenCases()
      setStats(prev => ({ ...prev, openCases: data.length }))
      setOpenCases(data)
    }

    fetchOpenCases()

    const fetchIncomingCases = async () => {
      const data = await actions.getIncomingCases()
      setStats(prev => ({ ...prev, incomingCases: data.length }))
      setIncomingCases(data)
    }

    fetchIncomingCases()

    socket.on('newOpenCase', async () => {
      fetchOpenCases()
      fetchIncomingCases()
    })

    socket.on('newIncomingCase', async () => {
      fetchIncomingCases()
    })

    socket.on('newRejectedCase', async () => {
      fetchOpenCases()
      fetchIncomingCases()
    })

    socket.on('clientMessage', (message, client) => {
      const messageBox = document.getElementById('messageBox')
      const childDiv = document.createElement('div')
      childDiv.style.cssText = 'background-color: #7ae1fa; height: auto; width: fit-content; padding: 10px; margin-top: 13px; margin-left: auto; margin-right: 10px'
      childDiv.className = 'border rounded'
      childDiv.innerHTML = message
      setClientsList(prev => ({ ...prev, [client]: message }))
      messageBox.appendChild(childDiv)
      messageBox.scrollTop = messageBox.scrollHeight
    })

  }, [])


  return (
    <div style={{ width: "950px" }} className="dashboard m-auto">
      <header className="dashboard-header bg-dark">
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
          <div className="stats">
            <div onClick={() => (setCurrentCase("openCases"))} role='button' className="stat-card" style={{ backgroundColor: `${currentCase === "openCases" ? "darkorange" : ""}` }}>
              <h3>Open Cases</h3>
              <p>{stats.openCases}</p>
            </div>
            <div onClick={() => (setCurrentCase("incomingCases"))} role='button' className="stat-card" style={{ backgroundColor: `${currentCase === "incomingCases" ? "darkorange" : ""}` }}>
              <h3>Incoming Cases</h3>
              <p>{stats.incomingCases}</p>
            </div>
            <div onClick={() => (setCurrentCase("messages"))} role='button' className="stat-card" style={{ backgroundColor: `${currentCase === "messages" ? "darkorange" : ""}` }}>
              <h3>MESSAGES</h3>
              <p>{stats.messages}</p>
            </div>
          </div>
        </section>

        <section id="cases">
          <ul className="list-unstyled">
            {
              currentCase === "openCases" ?
                openCases?.map((caseObj) => {
                  return (
                    <>
                      <h2>Cases</h2>
                      <li className='case-item'>
                        <div className='d-flex justify-content-between'>
                          <div><span className='fw-bold'>Title: </span>{caseObj.title}</div>
                          <div><span className='fw-bold'>Case Number: </span>{caseObj.case_number}</div>
                        </div>
                        <div><span className='fw-bold'>Client Name: </span>{caseObj.client.name}</div>
                        <div style={{ height: "150px", backgroundColor: "whitesmoke" }} className='border border-1'>{caseObj.body}</div>
                        <button onClick={() => (rejectCase(caseObj.case_number, caseObj.client.email))} className='btn btn-danger'>Decline</button>
                      </li>
                    </>

                  )
                })
                :
                currentCase === "incomingCases" ?
                  incomingCases?.map((caseObj) => {
                    return (
                      <>
                        <h2>Cases</h2>
                        <li className='case-item'>
                          <div className='d-flex justify-content-between'>
                            <div><span className='fw-bold'>Title: </span>{caseObj.title}</div>
                            <div><span className='fw-bold'>Case Number: </span>{caseObj.case_number}</div>
                          </div>
                          <div><span className='fw-bold'>Client Name: </span>{caseObj.client.name}</div>
                          <div style={{ height: "150px", backgroundColor: "whitesmoke" }} className='border border-1'>{caseObj.body}</div>
                          <div className='d-flex justify-content-end mt-3 gap-3'>
                            <button onClick={() => (acceptCase(caseObj.case_number, caseObj.client.email))} className='btn btn-success'>Accept</button>
                            <button onClick={() => (rejectCase(caseObj.case_number, caseObj.client.email))} className='btn btn-danger'>Decline</button>
                          </div>
                        </li>
                      </>

                    )
                  })
                  :
                  <div className='d-flex' style={{ height: "400px", width: "915px", backgroundColor: 'white', margin: "20px 50px 0px 0px" }}>
                    <div className='border d-flex justify-content-center' style={{ height: "350px", width: "160px", marginTop: "20px", marginLeft: "25px", backgroundColor: "whitesmoke" }}>
                      {
                        Object.keys(clientsList).map(client => {
                          return <div onClick={() => (handleClistListClick(client))}>{client}</div>
                        }
                        )}
                    </div>


                    {
                      showMessage &&
                      <>
                        <div id='messageBox' style={{ height: "350px", width: "680px", overflowY: "auto", marginTop: "20px", marginLeft: "15px" }} className='d-flex flex-column border'>
                          <div style={{ backgroundColor: '#7ae1fa', height: 'auto', width: 'fit-content', padding: '10px', marginTop: '13px', marginLeft: 'auto', marginRight: '10px', borderRadius: '0.25rem' }}>{clientsList[currentClient]}</div>
                          <input onChange={handleMessage} onKeyDown={handleKeyDown} value={lawyerMessage} style={{ height: "40px", width: "683px", left: "500px", top: "695px" }} className='rounded position-absolute' type='text' />
                        </div>
                      </>
                    }

                  </div>
            }
          </ul>
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
  const [message, setMessage] = React.useState({ title: "", body: "" })
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

  const handleMessage = (e) => {
    const { id, value } = e.target
    setMessage(prev => ({ ...prev, [id]: value }))
  }

  const caseSubmitted = async () => {
    const title = document.getElementById("title")
    const body = document.getElementById("body")

    await actions.submitCase(message, lawyer)
    title.value = ""
    body.value = ""
  }

  React.useEffect(() => {
    const casesSolved = async () => {
      if (lawyerId !== null) {
        var data = await actions.closedCases(lawyerId)
      } else {
        var data = await actions.closedCases(localStorage.getItem('id'))
      }
      setCasesSolved(data)
    }

    casesSolved()

    socket.on('lawyerPictureUpdate', () => {
      const storedPhoto = localStorage.getItem("Profile Picture")
      if (storedPhoto === "null") {
        return nulll
      } else {
        setPhoto(storedPhoto)
      }
    })
  }, [])

  return (
    <div className='d-flex'>
      <div style={{ border: "2px solid #3E362E", height: "600px", width: "300px", backgroundColor: "#3E362E" }} className='d-flex flex-column align-items-center ms-5 mt-3 rounded'>
        <input onChange={handlePhotoChange} type='file' name='file' accept='image/*' className='d-none' id='profile-picture' />
        <label className='mt-4' style={{ cursor: "pointer" }} htmlFor='profile-picture'>
          <img className='border rounded-circle' style={{ height: "200px", width: "200px" }} src={state?.photo || lawyer?.photo || photo ? `${process.env.BACKEND_URL}/assets/${state?.photo || lawyer?.photo || photo}` : `/profile-picture-placeholder.jpg`}></img>
        </label>

        <h2 className='text-capitalize'>{name}</h2>
        <h4 style={{ color: "#FAFBFC" }} >{specialty} Lawyer</h4>

        <div style={{ height: "130px", width: "200px", backgroundColor: "#EBE9E1", color: "#3E362E" }} className='fw-bold mt-5 rounded'>
          <label className='label-case mt-2 ms-3' onClick={() => (setDisplay("casesSolved"))}><img width={"40px"} src='/cases-solved.png' /> CASES SOLVED</label>
          <label className='label-case mt-3 ms-3' onClick={() => (setDisplay("submitCase"))}><img width={"45px"} src='/legal-document.png' />SUBMIT A CASE</label>
        </div>
        <div style={{ height: "10px", width: "200px", backgroundColor: "#EBE9E1", color: "#3E362E" }} className='fw-bold mt-5 rounded'></div>
        <div style={{ height: "10px", width: "100px", backgroundColor: "#EBE9E1", color: "#3E362E" }} className='fw-bold mt-4 rounded'></div>
      </div>

      {
        display === "casesSolved" ?
          <div style={{ marginLeft: "200px" }} className='rounded mt-3 d-flex flex-column gap-3'>
            {
              casesSolved.map((cases, index) => {
                return (
                  <div key={index} style={{ height: "80px", width: "400px", backgroundColor: "#3E362E" }} className='rounded text-white text-center pt-4'><b>{cases.title}</b></div>
                )
              })
            }
          </div>
          : display === "submitCase" ?
            <div style={{ height: "545px", width: "570px", backgroundColor: "#3E362E" }} className='d-flex flex-column justify-content-center align-items-center m-auto rounded border'>
              <label htmlFor='title' className='text-white mb-3' style={{ marginTop: "40px" }}>TITLE</label>
              <input type='text' id='title' className="mb-4" value={message.title} onChange={handleMessage} />
              <label className='text-white mb-3'>CASE BRIEF DESCRIPTION</label>
              <textarea id='body' className='overflow-hidden' style={{ height: "350px", width: "500px" }} value={message.body} onChange={handleMessage}></textarea>
              <button type='button' className='btn btn-primary mt-3' style={{ marginBottom: "25px" }} onClick={caseSubmitted}>Send case</button>
            </div>

            :
            <div>
              <div style={{ height: "485px", width: "500px", margin: "60px 0px 0px 300px" }} className='d-flex flex-column border rounded'>
                <div style={{ height: "22px", width: "24px" }} className='rounded-circle border ms-auto me-4 mt-4'></div>
                <input className='mt-auto' type="text" style={{ width: "500px" }} />
              </div>
            </div>}
    </div>
  )
}

export default Lawyer