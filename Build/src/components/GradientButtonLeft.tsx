import React from 'react';
import '../styles/GradientButton.css';

interface GradientButtonProps {
    text: string;
    arrowColor: string;
    position: React.CSSProperties;
}

const GradientButtonRight: React.FC<GradientButtonProps> = ({ text, arrowColor, position }) => {
    return (
        <div className="gradient-button-container-left" style={position}>
            <div className="left-arrow" style={{borderTopColor: arrowColor}}></div>
            <label className="gradient-button-left">
                {text}
            </label>
        </div>
    );
};

export default GradientButtonRight;