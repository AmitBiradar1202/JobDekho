import React from 'react'
import { Link } from 'react-router-dom'

const Errors = () => {
  return (
    <>
        <section className='page notfound'>
          <div className="content">
            <img src="/notfound.png" alt="notfound" />
            <Link to={'/'}>RETURN TO HOME PAGE</Link>
          </div>
        </section>
    </>
  )
}

export default Errors

//if you thinking how it is givin us this errrors page
// because <Route path="*" element{<Errors/>} />