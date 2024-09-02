import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email: username,
                password: password,
            });

            login(response.data.token);
            navigate('/');
        } catch (err) {
            console.log(err);
            setError('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-bold mb-8 text-white">Login Page</h1>
            <form
                className="bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full text-center mx-auto"
                style={{ minHeight: '400px' }} // Set a fixed minimum height
                onSubmit={handleLogin}
            >
                <div className="mb-4 relative">
                    <label className="block text-lg font-semibold text-teal-700 mb-4" htmlFor="username">
                        Username
                        <span className="ml-2 text-gray-400 cursor-pointer relative group">
                            (?)
                            <div className="hidden group-hover:block absolute bg-gray-800 text-white text-sm rounded-lg p-2 -top-12 -right-12 shadow-lg w-48">
                                Use <strong>eve.holt@reqres.in</strong> as the username and <strong>cityslicka</strong> as the password.
                            </div>
                        </span>
                    </label>
                    <input
                        className={`w-full px-4 py-2 rounded-lg bg-white/30 placeholder-teal-500 focus:outline-none transition ${error ? 'border-2 border-red-500 text-red-700' : 'text-teal-800 focus:ring-4 focus:ring-teal-400 focus:bg-white/40'
                            }`}
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-teal-700 mb-4" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`w-full px-4 py-2 rounded-lg bg-white/30 placeholder-teal-500 focus:outline-none transition ${error ? 'border-2 border-red-500 text-red-700' : 'text-teal-800 focus:ring-4 focus:ring-teal-400 focus:bg-white/40'
                            }`}
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>
                <div className="flex justify-center">
                    <button
                        className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-400 focus:outline-none transition transform hover:scale-105 shadow-md"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
