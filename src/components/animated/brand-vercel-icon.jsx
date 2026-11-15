import { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimate } from "motion/react";

const BrandVercelIcon = forwardRef(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      await animate(
        ".triangle",
        { rotateY: 180 },
        { duration: 0.6, ease: "easeInOut" },
      );
    };

    const stop = async () => {
      await animate(
        ".triangle",
        { rotateY: -180 },
        { duration: 0.6, ease: "easeInOut" },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className}`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <motion.path className="triangle" d="M3 19h18l-9 -15z" />
      </motion.svg>
    );
  },
);

BrandVercelIcon.displayName = "BrandVercelIcon";
export default BrandVercelIcon;
