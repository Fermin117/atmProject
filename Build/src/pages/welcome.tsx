import React from 'react';
import '../styles/welcome.css';
import GradientButtonRight from '../components/GradientButtonRight.tsx';

const Welcome: React.FC = () => {
    return (
        <div className='center-container'>
            <div className="welcome-message">
                <h2>Welcome to the ATM</h2>
                <p>Please enter your PIN</p>
            </div>
            <GradientButtonRight text="Enter PIN" arrowColor={'Green'} position={{ position: 'absolute', bottom: '35px', right: '5px' }}  />
        </div>
    );
};

export default Welcome;