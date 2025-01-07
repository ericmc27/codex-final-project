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
}

const Lawyer = () => {
  const navigate = useNavigate()
  const links = [{to: '/profile', text: 'Profile'}]

  return (
    <>
      <ul className='w-50 m-auto text-center'>
        {
          links.map((link, index)=>{
            return <li className='list-unstyled h3' key={index}><Link className='text-decoration-none' to={link.to}>{link.text}</Link></li>
          })
        }
      </ul>

      <div className='m-auto' style={{border: "1px solid black", width: "750px"}}>
        kksks
      </div>
    </>
  )
}

export const Profile = () => {
  const { actions } = useContext(Context)
  const state = useLocation().state
  const params = new URLSearchParams(location.search)
  const lawyerId = params.get('id')
  const lawyer = JSON.parse(localStorage.getItem("lawyers"))?.find(obj=>String(obj.id) === lawyerId)
  const [photo, setPhoto] = React.useState(()=>{
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