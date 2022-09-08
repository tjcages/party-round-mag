import Image from "next/image";

const DefaultIcon = (props) => {
  const src = props.icon.src;
  const href = props.icon.href;

  const smallSize = 20;
  const midSize = 28;
  const largeSize = 48;
  const size = props.small ? smallSize : props.mid ? midSize : largeSize

  if (href) {
    return (
      <svg
        className="icon"
        width={size}
        height={size}
      >
        <use href={href} />
      </svg>
    );
  }
  return (
    <Image
      src={src}
      alt="default icon"
      className="icon"
      width={size}
      height={size}
    />
  );
};

export default DefaultIcon;
