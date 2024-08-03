import Color from "color";
import { useContext, useEffect } from "react";
import interpolate from "../scripts/interpolate";
import "../styles/visualizer.css";
import { ColorContext } from "./ColorContext";

const easingFunctions = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => t * (2 - t),
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

function hexToRgb(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));
}

function rgbToLch([r, g, b]) {
  const color = Color.rgb(r, g, b);
  const [L, C, H] = color.lch().array();
  return [L, C, H];
}

export default function Visualizer({
  easing = "linear",
  angle = "90",
  gradientType = "linear",
  setCssCode,
}) {
  const { colors } = useContext(ColorContext);
  const easingFunction = easingFunctions[easing];

  const colorsRGB = colors.map((color) => hexToRgb(color.color));

  const colorsLCH = colorsRGB.map(rgbToLch);

  const interpolatedColorsLCH = [];
  const steps = 4;
  for (let i = 0; i < colorsLCH.length - 1; i++) {
    const start = colorsLCH[i];
    const end = colorsLCH[i + 1];
    for (let j = 0; j <= steps; j++) {
      const t = j / steps;
      interpolatedColorsLCH.push(interpolate(start, end, t, easingFunction));
    }
  }
  if (interpolatedColorsLCH.length === 0 && colorsLCH.length === 1) {
    interpolatedColorsLCH.push(colorsLCH[0]);
  }

  const cssColors = interpolatedColorsLCH.map((color) => {
    const [L, C, H] = color;
    return `lch(${L}% ${C} ${H % 360})`;
  });

  useEffect(() => {
    const vis = document.querySelector(".visualizer");
    let gradient;
    let formattedGradient;
    if (interpolatedColorsLCH.length === 1) {
      const [L, C, H] = interpolatedColorsLCH[0];
      const singleColor = `lch(${L}% ${C} ${H % 360})`;
      vis.style.background = singleColor;
      setCssCode(`background: ${singleColor};`);
      return;
    }

    switch (gradientType) {
      case "linear":
        gradient = `linear-gradient(${angle}deg, ${cssColors.join(", ")})`;
        formattedGradient = `linear-gradient(\n  ${angle}deg,\n  ${cssColors.join(",\n  ")}\n)`;
        break;
      case "radial":
        gradient = `radial-gradient(circle, ${cssColors.join(", ")})`;
        formattedGradient = `radial-gradient(\n  circle,\n  ${cssColors.join(",\n  ")}\n)`;
        break;
      case "conic":
        gradient = `conic-gradient(from ${angle}deg, ${cssColors.join(", ")})`;
        formattedGradient = `conic-gradient(\n  from ${angle}deg,\n  ${cssColors.join(",\n  ")}\n)`;
        break;
      case "repeating-linear":
        gradient = `repeating-linear-gradient(${angle}deg, ${cssColors.join(", ")})`;
        formattedGradient = `repeating-linear-gradient(\n  ${angle}deg,\n  ${cssColors.join(",\n  ")}\n)`;
        break;
      case "repeating-radial":
        gradient = `repeating-radial-gradient(circle, ${cssColors.join(", ")})`;
        formattedGradient = `repeating-radial-gradient(\n  circle,\n  ${cssColors.join(",\n  ")}\n)`;
        break;
      case "layered":
        gradient = `linear-gradient(${angle}deg, ${cssColors.join(", ")}), radial-gradient(circle, ${cssColors.join(", ")})`;
        formattedGradient = `linear-gradient(\n  ${angle}deg,\n  ${cssColors.join(",\n  ")}\n),\nradial-gradient(\n  circle,\n  ${cssColors.join(",\n  ")}\n)`;
        break;
      default:
        gradient = `linear-gradient(${angle}deg, ${cssColors.join(", ")})`;
        formattedGradient = `linear-gradient(\n  ${angle}deg,\n  ${cssColors.join(",\n  ")}\n)`;
    }
    vis.style.background = gradient;
    setCssCode(`background: ${formattedGradient};`);
  }, [colors, angle, easing, gradientType]);

  return <div className="visualizer"></div>;
}
