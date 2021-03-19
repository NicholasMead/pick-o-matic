import React from 'react';
import './MemberTag.css'

export const MemberTag = (props) => {

    const className = [
        "member-tag",
        props.highlighted ? "highlighted" : false,
        props.selected ? "selected" : false,
    ].filter(Boolean).join(" ")

    return (
        <div {...{...props, className}}>
            <span>
                {props.name} 
            </span>
            <span class="score">
                <span class="icon">
                    {
                        props.score > 0 ? "🍪" :
                        props.score < 0 ? "💩" : "" 
                    }
                </span>
                <span class="value">
                    {
                        props.score > 1  ? `x${props.score}` : 
                        props.score < -1 ? `x${0 - props.score}` : ""
                    }
                </span>
            </span>
        </div>
    )
}