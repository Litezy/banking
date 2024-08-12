import Footer from 'components/general/Footer'
import Header from 'components/general/Header'
import React from 'react'

export default function GeneralLayout({children}) {
  return (
    <div className=''>
        <Header />
        {children}
        <Footer />
    </div>
  )
}
