import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';


function LoginPage() {
    const {login} = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Errore durante il login');
        }
    };
    return (
        <div>
            <div className="col-md-6">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className='form-control'>
                    <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Accedi</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
