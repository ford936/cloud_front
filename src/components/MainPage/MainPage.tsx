import './MainPage.css'
import LoginFields from '../LoginFields/LoginFields'
import { Routes, Route } from 'react-router-dom'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import CloudPage from '../CloudPage/CloudPage'


export default function MainPage() {
  return (
    <div className='main'>
      <Routes>
        <Route path='' element={<LoginFields/>}/>
        <Route path='registration/' element={<RegistrationPage/>}/>
        <Route path='cloud/' element={<CloudPage/>}/>
      </Routes>
    </div>
  )
}