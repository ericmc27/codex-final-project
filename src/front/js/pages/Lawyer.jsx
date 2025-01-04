import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import rigo from "../../../../public/camera.png"


const Lawyer = () => {
const {store, actions} = useContext(Context)
const [file, setFile] = React.useState(null)

  const handleChange = (e)=>{
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const form = new FormData(e.target)
    await actions.storeProfilePicture(form)
  }

  return (
    <> 
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} id='photo' type='file'  accept='image/*' name='file' style={{display:"none"}} required/>
      <label style={{"cursor": "pointer"}} htmlFor='photo'> <img width={"100px"} height={"100px"} src={rigo}/></label>
      <button type='submit'>submit photo</button>
    </form>
      

      {/* <div style={{height: "400px", width: "200px", left:"85%", top:"25%"}} className='d-flex flex-column position-absolute border'>
        <div>
          Incoming clients
        </div>
        <div className=''>Profile</div>
        <div className=''>Progress</div>
      </div> */}

      <img src={`${store.profilePicture ? store.profilePicture : ""}`} />

      {/* {clients.map((client, index) => (
        <div className='border border-dark rounded m-auto mb-4' style={{ width: "350px", height: "100px" }} key={index}>
          <span className='h4 bg-danger d-flex'>{client.name}</span>
        </div>
      ))} */}
    </>
  )
}

export const Profile = ()=>{
  const state = useLocation().state || false

  return(
     state?.id ? (
     <div className='container-fluid'>
      {state.name}
      </div>) 
     : (<Navigate  to={"/client"} from={"/profile"}/>)
  )
}

export default Lawyer