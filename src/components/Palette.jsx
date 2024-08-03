import { useContext } from "react";
import "../styles/palette.css";
import Color from "./Color";
import { ColorContext } from "./ColorContext";

export default function Palette() {
  const { colors, handleAddColor, handleRemoveColor, handleChangeColor } =
    useContext(ColorContext);

  const colorComponents = colors.map(({ id, color }) => (
    <li key={id}>
      <Color defaultValue={color} id={id} onChange={handleChangeColor} />
      <button onClick={() => handleRemoveColor(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </li>
  ));

  return (
    <ul className="palette">
      {colorComponents}
      <li>
        <button id="add-color" onClick={handleAddColor}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </li>
    </ul>
  );
}
