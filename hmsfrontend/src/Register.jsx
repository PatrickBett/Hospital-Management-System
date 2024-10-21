import React from 'react'

function Register() {
  return (
    <form className='container py-5 px-5 border my-5' id='form'>
      <div className='text-center pb-5'>
        <h1 className='align-text-center'>Sign Up</h1>
      </div>
      <div className="form-group fs-5">
        <label >Username: </label>
        <input type='text' className='form-control'></input>
      </div>
      <div className="form-group fs-5">
        <label >Firstame: </label>
        <input type='text' className='form-control'></input>
      </div>
      <div className="form-group fs-5">
        <label >Lastname: </label>
        <input type='text' className='form-control'></input>
      </div>
      <div className="form-group fs-5">
        <label >Email: </label>
        <input type='email' className='form-control'></input>
      </div>
      <div className="form-group fs-5">
        <label >Password: </label>
        <input type='password' className='form-control'></input>
      </div>

      <div className="text-center mt-4">
        <button type='submit' className='btn btn-success fs-5 px-5 py-3'>Register</button>
      </div>
      
    </form>
  )
}

export default Register