import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to='/player'>player</Link>
      <Link to='/admin'>admin</Link>
    </div>
  )
}

export default Home
