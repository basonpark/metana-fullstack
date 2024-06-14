import React from 'react'
import MovieListItem from './MovieListItem'
import image1 from '../assets/images/image1.jpg'
import image2 from '../assets/images/image2.jpg'
import image3 from '../assets/images/image3.jpg'
import image4 from '../assets/images/image4.jpg'

const MovieList = () => {
  return (
    <div className="popular">
      <h2>Popular Movies</h2>
      <div className="grid">
        <MovieListItem 
          imgSrc={image1}
          imgAlt='Movie 4'
          title='Movie Title 4'
          rating='9.0'
          description='Brief description of Movie 4'
        />
        <MovieListItem 
          imgSrc={image2}
          imgAlt='Movie 5'
          title='Movie Title 5'
          rating='9.0'
          description='Brief description of Movie 5'
        />
        <MovieListItem 
          imgSrc={image3}
          imgAlt='Movie 6'
          title='Movie Title 6'
          rating='8.5'
          description='Brief description of Movie 6'
        />
        <MovieListItem 
          imgSrc={image4}
          imgAlt='Movie 7'
          title='Movie Title 7'
          rating='8.0'
          description='Brief description of Movie 7'
        />
        
      </div>
    </div>
  )
}

export default MovieList
