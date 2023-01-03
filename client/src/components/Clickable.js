const Clickable = props => {
    const {
        children,
        onClick,
        ...rest
    } = props;

    const clickWithSound = (e) => {
        onClick && onClick(e);
    };

    return (
        <span {...rest}>
            {children}
        </span>
    );
};

export default Clickable;