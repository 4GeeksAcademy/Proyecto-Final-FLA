import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/['"]/g, "").replace(/\/$/, "");

        try {
            const response = await fetch(`${backendUrl}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                navigate('/');
            } else {
                setError(data.error || 'Error al iniciar sesión');
            }
        } catch {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Iniciar Sesión</button>
            </form>
            <p className="mt-4 text-sm">
                ¿Olvidaste tu contraseña? <Link to="/forgot-password" className="text-blue-600 hover:underline">Recupérala aquí</Link>
            </p>
            <p className="text-sm mt-2">
                ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;
