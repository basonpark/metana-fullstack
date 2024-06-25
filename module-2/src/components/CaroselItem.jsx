import React from 'react'

const CaroselItem = ({imgSrc, imgAlt, title, rating, description}) => {
  return (
    <div className="item">
      <img src={imgSrc} alt={imgAlt} />
      <div className="item-info">
        <h3>{title}</h3>
        <span className="green">{rating}</span>
      </div>
      <div className="item-overview">
        <h3>Overview</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default CaroselItem
