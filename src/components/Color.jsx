import { useRef, useState, useEffect } from 'react';

export default function Color({ defaultValue = "#000000", id, onChange }) {
  const colorInputRef = useRef(null);
  const [color, setColor] = useState(defaultValue);
  const [buttonPos, setButtonPos] = useState({ top: 0, left: 0 });

  const handleButtonClick = () => {
    colorInputRef.current.click();
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    onChange(id, newColor);
  };

  useEffect(() => {
    if (colorInputRef.current) {
      colorInputRef.current.style.position = 'absolute';
      colorInputRef.current.style.top = `${buttonPos.top}px`;
      colorInputRef.current.style.left = `${buttonPos.left}px`;
    }
  }, [buttonPos]);

  const updateButtonPos = (event) => {
    const rect = event.target.getBoundingClientRect();
    setButtonPos({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
  };

  return (
    <>
      <label htmlFor={id}></label>
      <input
        className="color-picker"
        type="color"
        id={id}
        ref={colorInputRef}
        defaultValue={defaultValue}
        onChange={handleColorChange}
      />
      <div
        className="color-picker-button"
        style={{ backgroundColor: color }}
        onClick={(event) => {
          updateButtonPos(event);
          handleButtonClick();
        }}
      />
    </>
  );
}

