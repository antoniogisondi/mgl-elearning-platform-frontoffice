import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';


function LoginPage() {
    const {login} = useAuth()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Errore durante il login');
        }
    };
    return (
        <div>
            <div className="col-md-6">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='form-control'>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                    <button type="submit">Accedi</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
