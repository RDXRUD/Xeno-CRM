import React from 'react';

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:5001/auth/google';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login to Campaign Management System</h1>
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Login with Google
            </button>
        </div>
    );
};

export default LoginPage;