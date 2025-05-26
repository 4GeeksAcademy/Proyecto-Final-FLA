import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/['"]/g, "").replace(/\/$/, "");

        try {
            const response = await fetch(`${backendUrl}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Instrucciones enviadas al correo');
            } else {
                setError(data.error || 'Error al enviar solicitud');
            }
        } catch {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Tu email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {message && <p className="text-green-600 mb-2">{message}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
