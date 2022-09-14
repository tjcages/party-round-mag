import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { isTablet } from "../utils/agents";

const DefaultIcon = (props) => {
  const src = props.icon.src;
  const href = props.icon.href;
  const [mobile, setMobile] = useState(false);

  const smallSize = 20;
  const midSize = 28;
  const largeSize = mobile ? 40 : 48;
  const size = props.small ? smallSize : props.mid ? midSize : largeSize

  useEffect(() => {
    const isMobile = isTablet();
    setMobile(isMobile);
  }, [])

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
