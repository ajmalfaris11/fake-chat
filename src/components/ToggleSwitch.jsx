import React, { useState } from 'react';
import '../styles/ToggleSwitch.css';


function ToggleSwitch() {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(prev => !prev);
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