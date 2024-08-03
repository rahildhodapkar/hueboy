export default function interpolate(
  startColor,
  endColor,
  t,
  easingFunction = linear
) {
  const interpolate = (start, end, t) => start + (end - start) * t;
  const interpolateHue = (start, end, t) => {
    let d = end - start;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return start + d * t;
  };

  const [L1, C1, H1] = startColor;
  const [L2, C2, H2] = endColor;

  const L = interpolate(L1, L2, easingFunction(t));
  const C = interpolate(C1, C2, easingFunction(t));
  const H = interpolateHue(H1, H2, easingFunction(t)) % 360;

  return [L, C, H];
}
