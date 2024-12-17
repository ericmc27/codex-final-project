import React, { useEffect } from 'react'

const clients = [{ name: 'Eric' }, { name: 'Diego' }, { name: 'Juan' }]

const Lawyer = () => {
  // const ul =
  // const handleClick = ()=>{

  // }

  return (
    <>
      <div className='d-flex'>
        <div className='border m-auto' style={{ backgroundColor: "#f8ad09" }}>
          Incoming clients
        </div>
        <div className='m-auto'>placeholder 1</div>
        <div className='m-auto'>placeholder 2</div>
      </div>

      {clients.map((client, index) => (
        <div className='border border-dark rounded m-auto' style={{ width: "150px", height: "100px" }} key={index}>{client.name}</div>
      ))}
    </>
  )
}

export default Lawyer