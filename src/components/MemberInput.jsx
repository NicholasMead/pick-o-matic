import React from 'react';

import './MemberInput.css';

export const MemberInput = (props) => {
    
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
        if(value != props.value)
            setValue(props.value);
    }, [props.value]);

    const onValueChange = (e) => {
        const newValue = e.target.value.substr(0, 16);
        setValue(newValue);
        
        if(props.onChange)
            props.onChange(newValue);
    }

    return (
        <div class="member-tag" >
          <input 
            onChange={onValueChange}
            value={value}
            placeholder="Add a New Name"
            >
          </input>
        </div>
    )
}