import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { Context } from '../store/appContext'

const incoming = [{name: 'Lebron'}, {name: 'Julio'}, {name: 'Roberto'}]
const clients = [{ name: 'Eric' }, { name: 'Diego' }, { name: 'Juan' }]

const Lawyer = () => {
const {store} = useContext(Context)

  return (
    <> 
    <form>
      <input id='photo' type='file'  accept='image/*' style={{display:"none"}}/>
      <label><a href="https://www.flaticon.com/free-icons/camera" title="camera icons">Camera icons created by Freepik - Flaticon</a></label>
    </form>
      

      <div style={{height: "400px", width: "200px", left:"85%", top:"25%"}} className='d-flex flex-column position-absolute border'>
        <div>
          Incoming clients
        </div>
        <div className=''>Profile</div>
        <div className=''>Progress</div>
      </div>

      <div className='rounded'>s</div>

      <img src={`${store.profilePicture ? store.profilePicture : ""}`} />

      {clients.map((client, index) => (
        <div className='border border-dark rounded m-auto mb-4' style={{ width: "350px", height: "100px" }} key={index}>
          <span className='h4 bg-danger d-flex'>{client.name}</span>
        </div>
      ))}
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