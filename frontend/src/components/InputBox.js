import React from 'react';
import './InputBox.css'; // Create this CSS file for styling

const InputBox = (props) => {


    const handleInputChange = (evt) => {
        props.func(evt.target.value);
    }
    return (
        <textarea
            className="input"
            placeholder="Type here..."
            onChange={handleInputChange}
        />
    );
};

export default InputBox;