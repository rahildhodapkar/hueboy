import { useEffect } from "react";
import "../styles/controls.css";

const easingFunctions = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

const easingFunctionNames = Object.keys(easingFunctions);
const gradientTypes = ["linear", "radial", "conic"];

export default function Controls({
  angle,
  setAngle,
  easing,
  setEasing,
  gradientType,
  setGradientType,
}) {
  useEffect(() => {
    const radioButtons = document.querySelectorAll(
      ".radio-container fieldset label"
    );

    const easingRadios = document.querySelectorAll(
      ".easing-container fieldset label"
    );
    const gradientRadios = document.querySelectorAll(
      ".gradient-container fieldset label"
    );

    function clearBackground(radioLabels) {
      radioLabels.forEach((label) => {
        label.style.backgroundColor = "";
      });
    }

    function setBackground(e, radioLabels) {
      clearBackground(radioLabels);
      e.target.style.backgroundColor = "#ef4444";
    }

    easingRadios.forEach((radio) => {
      radio.addEventListener("click", (e) => setBackground(e, easingRadios));
    });

    gradientRadios.forEach((radio) => {
      radio.addEventListener("click", (e) => setBackground(e, gradientRadios));
    });

    easingRadios[0].click();
    gradientRadios[0].click();

    return () => {
      radioButtons.forEach((radio) => {
        radio.removeEventListener("change", () => {});
      });
    };
  }, []);

  const handleAngleChange = (e) => {
    setAngle(e.target.value);
  };

  const handleEasingChange = (e) => {
    setEasing(e.target.value);
  };

  const handleGradientTypeChange = (e) => {
    setGradientType(e.target.value);
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

      <div className="radio-container easing-container">
        <label>Easing Function</label>
        <fieldset>
          {easingFunctionNames.map((name, index) => (
            <div key={index}>
              <input
                type="radio"
                name="easing"
                id={`easing-${name}`}
                value={name}
                checked={easing === name}
                onChange={handleEasingChange}
              />
              <label htmlFor={`easing-${name}`}>{name}</label>
            </div>
          ))}
        </fieldset>
      </div>

      <div className="radio-container gradient-container">
        <label>Gradient Type</label>
        <fieldset>
          {gradientTypes.map((type, index) => (
            <div key={index}>
              <input
                type="radio"
                name="gradientType"
                id={`gradientType-${type}`}
                value={type}
                checked={gradientType === type}
                onChange={handleGradientTypeChange}
              />
              <label htmlFor={`gradientType-${type}`}>{type}</label>
            </div>
          ))}
        </fieldset>
      </div>
    </>
  );
}
