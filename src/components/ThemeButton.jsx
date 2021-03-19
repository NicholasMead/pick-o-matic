import './ThemeButton.css';

export const ThemeButton = props => {

    const className = [
        props.className,
        "member-tag",
        "theme-button"

    ].filter(Boolean).join(" ");

    return (
        <button {...{...props, className}}>
            {props.children}
        </button>
    )
}