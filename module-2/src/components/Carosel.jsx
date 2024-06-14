import React from 'react'
import CaroselItem from './CaroselItem'
import image4 from '../assets/images/image4.jpg'
import image5 from '../assets/images/image5.jpg'
import image6 from '../assets/images/image6.jpg'

const Carosel = () => {
  return (
    <div className="featured">
      <h2>Featured Movies</h2>
      <div className="slider">
        <div className="slider-inner">

          <CaroselItem 
            imgSrc={image4}
            imgAlt='Movie 1'
            title='Movie Title 1'
            rating='9.0'
            description='Brief description of Movie 1'
          />

          <CaroselItem 
            imgSrc={image5}
            imgAlt='Movie 2'
            title='Movie Title 2'
            rating='7.5'
            description='Brief description of Movie 2'
          />

          <CaroselItem 
            imgSrc={image6}
            imgAlt='Movie 3'
            title='Movie Title 3'
            rating='5.0'
            description='Brief description of Movie 3'
          />

        </div>
        <button className="prev">&lt;&lt;</button>
        <button className="next">&gt;&gt;</button>
      </div>
    </div>
  )
}

export default Carosel
