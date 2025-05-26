import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/['"]/g, "").replace(/\/$/, "");

        try {
            const res = await fetch(`${backendUrl}/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Contraseña actualizada');
                navigate('/login');
            } else {
                setError(data.error || 'Error al actualizar contraseña');
            }
        } catch {
            setError('Error de conexión');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Nueva Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Nueva contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
                <input type="password" placeholder="Confirmar contraseña" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Actualizar Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;
