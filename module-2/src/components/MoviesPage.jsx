import React from 'react'

const MoviesPage = () => {
  return (
    <form className="formContainer" id="registraionForm">
      <nav>
        <ul>
          <li className="back">
            <a href="index.html">👈🏽 go back</a>
          </li>
        </ul>
      </nav>
      <hr></hr>
      <h2 className='heading'>Sign Up</h2>

      <div className="steps-container">
        <hr></hr>
        <hr className='active'></hr>
        <div className="steps">
          <i className="fa-solid fa-user"></i>
        </div>
      </div>

      <div className='input-slide-container'>
        <scroller>
          <div className="input-slide" id="slide1">
            <h3>User Name</h3>
            <p><i>Username is your online identity</i></p>
            <ul className="rules">
              <li>" Your username should only conain letters, 
                numbers, underscores, or hyphens. "
              </li>
              <li>
                "No spaces or special characters allowed."
              </li>
              <li>
                " Your username should not be offensice or contain 
                profanity. "
              </li>
            </ul>
            <input type="text" placeholder="Type your username here"
              name="username" className="username"></input>
          </div>

        </scroller>
      </div>

      <div className='success-message' id="success-message">Form submitted successfully!</div>
    
      <button className='GoBack' onClick="GoBack()"></button>

    </form>
  )
}

export default MoviesPage
