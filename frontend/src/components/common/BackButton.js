import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/BackButton.css';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate('/dashboard')} 
            className="back-to-dashboard"
        >
            <svg className="back-arrow" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Dashboard
        </button>
    );
};

export default BackButton; 