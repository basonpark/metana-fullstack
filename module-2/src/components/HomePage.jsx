import React from 'react'
import Header from './Header'
import Carosel from './Carosel'
import MovieList from './MovieList'
import Footer from './Footer'

const HomePage = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Carosel />
        <MovieList />
      </div>
      <Footer />
    </>
  )
}

export default HomePage
