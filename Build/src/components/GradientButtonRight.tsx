import React from 'react';
import '../styles/GradientButton.css';

interface GradientButtonProps {
    text: string;
    arrowColor: string;
    position: React.CSSProperties;
}

const GradientButtonRight: React.FC<GradientButtonProps> = ({ text, arrowColor, position }) => {
    return (
        <div className="gradient-button-container-right" style={position}>
            <label className="gradient-button-right">
                {text}
            </label>
            <div className="right-arrow" style={{ borderTopColor: arrowColor }}></div>
        </div>
    );
};

export default GradientButtonRight;