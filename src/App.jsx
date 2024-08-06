import { useState } from "react";
import "./App.css";
import CodeBlock from "./components/CodeBlock";
import { ColorProvider } from "./components/ColorContext";
import "./components/Palette";
import Palette from "./components/Palette";
import Sliders from "./components/Sliders";
import Visualizer from "./components/Visualizer";

function App() {
  const [angle, setAngle] = useState(90);
  const [easing, setEasing] = useState("linear");
  const [gradientType, setGradientType] = useState("linear");
  const [cssCode, setCssCode] = useState("");

  return (
    <>
      <header>
        <h1>Hueboy</h1>
        <h2>Easily make beautiful linear, radial, and conic gradients</h2>
      </header>
      <main>
        <ColorProvider>
          <div id="one">
            <Visualizer
              angle={angle}
              easing={easing}
              gradientType={gradientType}
              setCssCode={setCssCode}
            />
          </div>
          <div id="two">
            <Palette />
            <Sliders
              angle={angle}
              setAngle={setAngle}
              easing={easing}
              setEasing={setEasing}
              gradientType={gradientType}
              setGradientType={setGradientType}
            />
            <CodeBlock code={cssCode} />
          </div>
        </ColorProvider>
      </main>
    </>
  );
}

export default App;
