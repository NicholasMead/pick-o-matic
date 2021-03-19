import './MemberControl.css';

export const MemberControl = (props) => {
    const className = [
        "member-control",
        props.noSelect ? "no-select" : null
    ].filter(Boolean).join(" ")

    return (
        <div {...{...props, className}}>
            {props.children}           
        </div>
    )
}