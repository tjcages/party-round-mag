const Button = (props) => {
  return (
    <button
      className={`button ${props.active && "active"}`}
      onClick={props.onClick}
    >
      <div className={`bevel ${props.large && "large"}`}>
        {props.text}
      </div>
    </button>
  );
};

export default Button;
