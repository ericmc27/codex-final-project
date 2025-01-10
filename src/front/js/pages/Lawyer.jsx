import React, { useContext } from 'react'
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
}

const Lawyer = () => {
  const navigate = useNavigate()
  const links = [{ to: '/profile', text: 'Profile' }]

  return (
    <>
      <ul className='w-50 m-auto text-center'>
        {
          links.map((link, index) => {
            return <li className='list-unstyled h3' key={index}><Link className='text-decoration-none' to={link.to}>{link.text}</Link></li>
          })
        }
      </ul>

      <div className='m-auto' style={{ border: "1px solid black", width: "750px" }}>
        kksks
      </div>
    </>
  )
}

const casesSolved = [{ case: 'case 1' }, { case: 'case 2' }, { case: 'case 3' }, { case: 'case 1' }, { case: 'case 2' }, { case: 'case 3' }]

export const Profile = () => {
  const { actions } = useContext(Context)
  const state = useLocation().state
  const params = new URLSearchParams(location.search)
  const lawyerId = params.get('id')
  const lawyer = JSON.parse(localStorage.getItem("lawyers"))?.find(obj => String(obj.id) === lawyerId)
  const [name, setName] = React.useState(localStorage.getItem("Name"))
  const [specialty, setSpecialty] = React.useState(localStorage.getItem("Specialty"))
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

  const handleKeyDown = (e)=>{
    if(e.key === "Enter"){
      console.log(e.target.value)
    }
  }

  return (
    <div className='d-flex'>
      <div style={{ backgroundColor: '#DCDCDC', height: "600px", width: "300px" }} className='d-flex flex-column align-items-center ms-5 mt-3 rounded'>
        <input onChange={handlePhotoChange} type='file' name='file' accept='image/*' className='d-none' id='profile-picture' />
        <label className='mt-4' style={{ cursor: "pointer" }} htmlFor='profile-picture'>
          <img className='border rounded-circle' style={{ height: "200px", width: "200px" }} src={state?.photo || lawyer?.photo || photo || `/profile-picture-placeholder.jpg`}></img>
        </label>

        <h2 className='text-capitalize'>{name}</h2>
        <h4>{specialty} Lawyer</h4>

        <div style={{ height: "200px", width: "200px" }} className='bg-primary mt-5 rounded'>
          <label className='label-case mt-2 ms-3' onClick={() => (setDisplay("casesSolved"))}><img width={"40px"} src='/cases-solved.png' /> CASES SOLVED</label>
          <label className='label-case mt-3 ms-3' onClick={() => (setDisplay("submitCase"))}><img width={"45px"} src='/legal-document.png' />SUBMIT A CASE</label>
          <label className='label-case mt-3 ms-3' onClick={() => (setDisplay("contactMe"))}><img width={"45px"} src='/contact-me.png' /> CONTACT ME</label>
        </div>
      </div>

      {
        display === "casesSolved" ?
          <div style={{ marginLeft: "200px" }} className='rounded mt-3 d-flex flex-column gap-3'>
            {
              casesSolved.map((cases) => {
                return (
                  <div style={{ height: "500px", width: "500px" }} className='bg-warning rounded'>{cases.case}</div>
                )
              })
            }
          </div>
          : display === "submitCase" ?
            <div style={{ height: "500px", width: "600px" }} className='m-auto border rounded'>
              <textarea className='overflow-hidden' style={{ height: "350px", width: "500px" }}></textarea>
            </div>

         :
      <div>
        <div style={{height: "485px", width: "500px", margin: "60px 0px 0px 300px"}} className='flex border'>
              <input type="text" onKeyDown={handleKeyDown} style={{width:"500px", outline: "none"}}/>
        </div>
      </div>}
    </div>
  )
}

export default Lawyer