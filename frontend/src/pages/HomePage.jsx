/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function HomePage() {
  return (
    <div>
        <Header/>
        <div>
            <Link to={'/preview-card'} 
            className='border border-red-500'>
                Click me to go to Preview Card Page
            </Link>
        </div>
    </div>
  )
}

export default HomePage