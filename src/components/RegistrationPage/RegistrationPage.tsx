import { useState } from "react"
import { RegistrationForm } from "./type"
import {useNavigate} from 'react-router-dom'
import './RegistrationPage.css'
import { backendUrl } from "../../url"

export default function RegistrationPage() {

    const [form, setForm] = useState<RegistrationForm>({
        email: '',
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const [validationEmail, setValidationEmail] = useState('');
    const [validationLogin, setValidationLogin] = useState('');
    const [validationPassword, setValidationPassword] = useState('');

    

    function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = element.target

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))

        if (name == 'email') {
            const isValid = /^[\w\.-]+@[\w\.-]+\.\w+$/.test(value);
            if (isValid) {
                setValidationEmail('');
            } else {
                setValidationEmail('Not valid email')
            }
        }

        if (name == 'username') {
            const isValid = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value);
            if (isValid) {
                setValidationLogin('');
              } else {
                setValidationLogin('Not valid login');
            }
        }

        if (name == 'password') {
            const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{6,}$/.test(value);
            if (isValid) {
                setValidationPassword('');
              } else {
                setValidationPassword('Not valid password');
        }        
    }}

    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        let response = await fetch(`${backendUrl}api/v1/user/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
          });
        if (response.ok) {
            let result = await response.json();
            localStorage.setItem('token', result.access)
            return navigate("/");
        }
        else {
            alert("Не корректные данные для регистрации");
        }}

  return (
    <>
        <div className='registration_panel'>
            <h1 className='title'>REGISTRATION</h1>
            <form className='registration' onSubmit={handleSubmit}>
                <div className='email_block'>
                <label htmlFor='email'>Email:</label>
                <input type="email" id='email' className='email' name='email' value={form.email} onChange={handleInputChange}/>
                {validationEmail && <p className="error_login">{validationEmail}</p>}
                </div>
                <div className='login_block'>
                <label htmlFor='login'>Login:</label>
                <input type="login" id='username' className='login' name='username' value={form.username} onChange={handleInputChange}/>
                {validationLogin && <p className="error_login">{validationLogin}</p>}
                </div>
                <div className='password_block'>
                <label htmlFor='password'>Password:</label>
                <input type="password" id='password' className='password' name='password' value={form.password} onChange={handleInputChange}/>
                {validationPassword && <p className="error_login">{validationPassword}</p>}
                </div>
                <button type='submit' className='submit_button'>Submit</button>
            </form>
        </div>
    </>
  )
}