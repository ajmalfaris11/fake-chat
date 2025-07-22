import React, { useState } from 'react';
import '../styles/ToggleSwitch.css';


function ToggleSwitch({ onToggle }) {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        const newState = !isOn;
        setIsOn(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    return (
        <div className="toggle-container">
            <div className={`switch ${isOn ? 'on' : ''}`} onClick={toggle}>                
                <div className="circle" />
            </div>
        </div>
    );
}

export default ToggleSwitch;