import React from 'react'
import { useAuth } from '../../authContext/authContext';
import './signature.css';
export default function Signature() {
    const { loginSuccess } = useAuth();
    return (
        <div>
            {loginSuccess && (
                <span className="signature">
                    Made with ☕️ and code
                    <br />
                    Furkan was here
                </span>
            )}
        </div>
    )
}
