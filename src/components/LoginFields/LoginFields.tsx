import './LoginFileds.css'
import { useState } from 'react'
import { AuthForm } from './type'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginFields() {
    const [form, setForm] = useState<AuthForm>({
        username: '',
        password: ''
    })
    const [validationLogin, setValidationLogin] = useState('');
    const [validationPassword, setValidationPassword] = useState('');

    const navigate = useNavigate();

    function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = element.target
        
        setForm(PrevForm => ({
            ...PrevForm,
            [name]: value
        }))

        if (name == 'username') {
            const isValid = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value);
            if (isValid) {
                setValidationLogin('');
              } else {
                setValidationLogin('Not valid login');
            }
        }

        if (name == 'password') {
            const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
            if (isValid) {
                setValidationPassword('');
              } else {
                setValidationPassword('Not valid password');
        }}
    }

    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
          });
        if (response.ok) {
            let result = await response.json();
            localStorage.setItem('token', result.access)
            return navigate("/cloud");
        }
        else {
            alert("Не верные данные для аторизации");
        }}
    
  return (
    <>
        <div className='login_panel'>
            <div>
                <h1 className='title'>Cloud</h1>
            </div>
            <form className='auth' onSubmit={handleSubmit}>
                <div className='login_block'>
                <label htmlFor='login'>Login</label>
                <input type="login" id='username' className='login' name='username' value={form.username} onChange={handleInputChange}/>
                {validationLogin && <p className="error_login">{validationLogin}</p>}
                </div>
                <div className='password_block'>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' className='password' name='password' value={form.password} onChange={handleInputChange}/>
                {validationPassword && <p className="error_login">{validationPassword}</p>}
                </div>
                {/* <Link to={'cloud/'}> */}
                <button type='submit' className='auth_button'>Log in</button>
                {/* </Link> */}
                <Link to={'registration/'}><button className='register_button'>Sign Up</button></Link>
            </form>
        </div>
    </>
  )
}