const Button = (props) => {
  return (
    <button
      className={`button ${props.active && "active"} ${props.disabled && "disabled"}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className={`bevel ${props.large && "large"}`}>
        {props.text}
      </div>
    </button>
  );
};

export default Button;
