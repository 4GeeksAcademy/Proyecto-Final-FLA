// src/front/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validación en el cliente
        if (!name || !lastName || !postalCode || !email || !password || !confirmPassword) {
            setError('Todos los campos son requeridos');
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
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

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/['"]/g, "").replace(/\/$/, "");
            const response = await fetch(`${backendUrl}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    last_name: lastName,
                    postal_code: postalCode,
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso');
                navigate('/login');
            } else {
                setError(data.error || 'Error al registrar');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Registro</h2>
            <div>
                <label className="block mb-2">Nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <label className="block mb-2">Apellido:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <label className="block mb-2">Código Postal:</label>
                <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <label className="block mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <label className="block mb-2">Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <label className="block mb-2">Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    onClick={handleSubmit}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Registrar
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;