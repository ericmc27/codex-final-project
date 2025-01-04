import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { BounceLoader } from "react-spinners"
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'


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
  return (
    <>
      <h1>Laywer Home</h1>
    </>
  )
}

export const Profile = () => {
  const { actions } = useContext(Context)
  const [photo, setPhoto] = React.useState(null)


  const handlePhotoChange = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const photo = await actions.storeProfilePicture(formData)
    setPhoto(photo)
  }

  return (
      <div>
        <input onChange={handlePhotoChange} type='file' name='file' accept='image/*' className='d-none' id='profile-picture' />

        <label style={{ cursor: "pointer", margin: "15px 0px 0px 90px" }} htmlFor='profile-picture'>
          <img className='border' style={{ height: "200px", width: "200px" }} src={photo || `/profile-picture-placeholder.jpg`}></img>
        </label>

      </div>
  )
}

export default Lawyer