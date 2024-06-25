import React from 'react'

const MovieListItem = ({imgSrc, imgAlt, title, rating, description}) => {
  return (
    <div className="card">
        <img className="cardImage" src={imgSrc} alt={imgAlt} />

        <div className="card-info">
            <h3>{title}</h3>
            <span className="green">{rating}</span>
        </div>

        <div className="card-overview">
            <h3>Overview</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default MovieListItem
