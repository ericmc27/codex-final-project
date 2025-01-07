import React, { useContext } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { BounceLoader } from "react-spinners"
import { Context } from '../store/appContext'

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

const clients = [
  {
    name: 'Eric',
    status: 'Pending',
    time: '10:00 AM',
    type: 'Initial Consultation'
  },
  {
    name: 'Rebekah',
    status: 'Confirmed',
    time: '1:00 PM',
    type: 'Follow-up'
  },
  {
    name: 'Jose',
    status: 'In Progress',
    time: '3:00 PM',
    type: 'Document Review'
  }
];

const Lawyer = () => {
  const navigate = useNavigate()
  const links = [{ to: '/lawyer', text: 'Dashboard' }, { to: '/profile', text: 'Profile' }, { to: '/lawyer', text: 'Incoming' }]

  return (
    <>
      <div className='w-50 m-auto text-center'>
        {
          links.map((link, index) => {
            return <li className='list-unstyled h3' key={index}><Link className='text-decoration-none' to={link.to}>{link.text}</Link></li>
          })
        }
      </div>

      {/* <div className='m-auto' style={{border: "1px solid black", width: "750px"}}>
        kksks
      </div> */}

      <div className="container py-4">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col">
            <h2 className="mb-3">Dashboard</h2>
            <div className="d-flex gap-3">
              <div className="card flex-grow-1">
                <div className="card-body text-center">
                  <h5 className="card-title">Today's Appointments</h5>
                  <h3 className="mb-0">{clients.length}</h3>
                </div>
              </div>
              <div className="card flex-grow-1">
                <div className="card-body text-center">
                  <h5 className="card-title">Incoming</h5>
                  <h3 className="mb-0">0</h3>
                </div>
              </div>
              <div className="card flex-grow-1">
                <div className="card-body text-center">
                  <h5 className="card-title">Active Cases</h5>
                  <h3 className="mb-0">{clients.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header bg-light">
                <h4 className="mb-0">Incoming Appointments</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Time</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client, index) => (
                        <tr key={index}>
                          <td>{client.name}</td>
                          <td>{client.time}</td>
                          <td>{client.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
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