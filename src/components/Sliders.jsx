import React from "react";
import "../styles/sliders.css"; 
const easingFunctions = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const easingFunctionNames = Object.keys(easingFunctions);
const gradientTypes = ["linear", "radial", "conic"];

export default function Sliders({
  angle,
  setAngle,
  easing,
  setEasing,
  gradientType,
  setGradientType,
}) {
  const handleAngleChange = (e) => {
    setAngle(e.target.value);
  };

  const handleEasingChange = (e) => {
    setEasing(easingFunctionNames[e.target.value]);
  };

  const handleGradientTypeChange = (e) => {
    setGradientType(gradientTypes[e.target.value]);
  };

  return (
    <>
      <div className="slider-container">
        <label htmlFor="angle">Angle Degrees</label>
        <input
          type="range"
          name="angle"
          id="angle"
          min="0"
          max="360"
          value={angle}
          onChange={handleAngleChange}
          list="angle-ticks"
        />
        <span>{angle}°</span>
      </div>

      <div className="slider-container">
        <label htmlFor="easing">Easing Function</label>
        <input
          type="range"
          name="easing"
          id="easing"
          min="0"
          max={easingFunctionNames.length - 1}
          value={easingFunctionNames.indexOf(easing)}
          onChange={handleEasingChange}
          list="easing-ticks"
        />
        <span>{easing}</span>
      </div>

      <div className="slider-container">
        <label htmlFor="gradientType">Gradient Type</label>
        <input
          type="range"
          name="gradientType"
          id="gradientType"
          min="0"
          max={gradientTypes.length - 1}
          value={gradientTypes.indexOf(gradientType)}
          onChange={handleGradientTypeChange}
          list="gradientType-ticks"
        />
        <span>{gradientType}</span>
      </div>
    </>
  );
}

