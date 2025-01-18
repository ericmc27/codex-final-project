import React from "react";

export const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log("Password reset email sent to:", email);

        // Sendgrip here  

        onClose(); 
    };

    if (!isOpen) return null; 

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-content p-5">
                    <h2>Forgot your password?</h2>
                    <p>We’ll email you a link to reset your password.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="input-field"
                                placeholder="Email"
                            />
                        </div>
                        <div className="modal-actions">
                            <button type="submit" className="btn btn-primary">
                                Send me a password reset link
                            </button>
                            <button type="button" onClick={onClose} className="btn btn-secondary">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal-container {
        background: #fff;
        padding: 40px; 
        border-radius: 15px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        text-align: center;
    }
    .modal-content h2 {
        font-size: 1.8rem;
        margin-bottom: 15px;
        font-weight: bold;
    }
    .modal-content p {
        font-size: 1.1rem; 
        margin-bottom: 30px;
        color: #666;
    }
    .form-group {
        margin-bottom: 20px;
    }
    .input-field {
        width: 100%;
        padding: 15px;
        border: none;
        border-radius: 25px;
        font-size: 1rem; 
        outline: none;
        background-color: #f5f5f5;
    }
    .input-field::placeholder {
        color: #aaa;
    }
    .modal-actions {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .btn {
        padding: 15px; 
        border-radius: 30px;
        font-size: 1rem; 
        cursor: pointer;
    }
    .btn-primary {
        background-color: #000;
        color: #fff;
    }
    .btn-secondary {
        background-color: #f1f1f1;
        color: #000;
    }
    .btn-secondary:hover {
        background-color: #e2e2e2;
    }
`}</style>
        </div>
    );
};