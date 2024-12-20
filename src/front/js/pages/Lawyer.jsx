import React, { useEffect } from 'react'

const incoming = [{name: 'Lebron'}, {name: 'Julio'}, {name: 'Roberto'}]
const clients = [{ name: 'Eric' }, { name: 'Diego' }, { name: 'Juan' }]

const Lawyer = () => {
  // const ul =
  // const handleClick = ()=>{

  // }

  return (
    <>
      <div className='d-flex'>
        <div className='border m-auto my-4' style={{backgroundColor: "#f8ad09", padding: "12px"}}>
          Incoming clients
        </div>
        <div className='m-auto'>placeholder 2</div>
        <div className='m-auto'>placeholder 3</div>
      </div>

      {clients.map((client, index) => (
        <div className='border border-dark rounded m-auto mb-4' style={{ width: "350px", height: "100px" }} key={index}>
          <span className='h4 bg-danger d-flex'>{client.name}</span>
        </div>
      ))}
    </>
  )
}

export default Lawyer