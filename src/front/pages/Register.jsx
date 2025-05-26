import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', lastName: '', postalCode: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        const { name, lastName, postalCode, email, password, confirmPassword } = formData;

        if (!name || !lastName || !postalCode || !email || !password || !confirmPassword) {
            setError('Todos los campos son requeridos');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Formato de email inválido');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/['"]/g, "").replace(/\/$/, "");

        try {
            const response = await fetch(`${backendUrl}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    last_name: lastName,
                    postal_code: postalCode,
                    email,
                    password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso');
                navigate('/login');
            } else {
                setError(data.error || 'Error al registrar');
            }
        } catch {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Registro</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Nombre" value={formData.name} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input name="lastName" type="text" placeholder="Apellido" value={formData.lastName} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input name="postalCode" type="text" placeholder="Código Postal" value={formData.postalCode} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                <input name="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Registrarse</button>
            </form>
            <p className="text-sm mt-2">
                ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
            </p>
        </div>
    );
};

export default Register;
