import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { FormRoutes, GeneralRoutes, UserRoutes } from './routes'
import UserLayout from './layouts/UserLayout'

export default function App() {
  const user = '/user/'
  const general = '/'
  return (
    <BrowserRouter>
    <Routes>
      {FormRoutes.map((item, index) => (
        <Route key={index} path={`${general}${item.path}`} element={<item.component />} />
      ))}
      {GeneralRoutes.map((item, index) => (
        <Route key={index} path={`${general}${item.path}`} element={<item.component />} />
      ))}
      {UserRoutes.map((item, index) => (
        <Route key={index} path={`${user}${item.path}`} element={<UserLayout> <item.component /> </UserLayout>} />
      ))}
    </Routes>
    </BrowserRouter>
  )
}
