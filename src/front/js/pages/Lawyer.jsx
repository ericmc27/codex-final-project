import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const incoming = [{name: 'Lebron'}, {name: 'Julio'}, {name: 'Roberto'}]
const clients = [{ name: 'Eric' }, { name: 'Diego' }, { name: 'Juan' }]

const Lawyer = () => {

  return (
    <> 
      <input type='file'  accept='image/*' placeholder='s'/>
      <div style={{height: "400px", width: "200px", left:"85%", top:"25%"}} className='d-flex flex-column position-absolute border'>
        <div>
          Incoming clients
        </div>
        <div className=''>Profile</div>
        <div className=''>Progress</div>
      </div>

      <div className='rounded'>s</div>

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