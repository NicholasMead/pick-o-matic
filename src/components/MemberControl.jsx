import './MemberControl.css';

export const MemberControl = (props) => {
    const className = [
        "member-control",
        "align-middle",
        props.noSelect ? "no-select" : null
    ].filter(Boolean).join(" ")

    return (
        <div {...{...props, className}}>
            {props.children}           
        </div>
    )
}