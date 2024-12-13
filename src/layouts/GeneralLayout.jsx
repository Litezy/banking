import Footer from 'components/general/Footer'
import Header from 'components/general/Header'
import React from 'react'

export default function GeneralLayout({children}) {
  return (
    <div className=''>
        <Header />
        {children}
        <Footer />
  <div id="google_translate_element" className="fixed bottom-2 left-2 bg-white py-1.5 px-3 rounded-lg z-50"></div>
    </div>
  )
}
