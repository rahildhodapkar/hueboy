import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const initialColors = [
    { id: uuidv4(), color: "#b603fc" },
    { id: uuidv4(), color: "#e88054" },
  ];
  const [colors, setColors] = useState(initialColors);

  const handleAddColor = () => {
    const randomId = uuidv4();

    // taken from https://stackoverflow.com/a/5092872
    const randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    //

    setColors([...colors, { id: randomId, color: randomColor }]);
  };

  const handleRemoveColor = (id) => {
    const newColors = colors.filter((obj) => obj.id !== id);
    setColors(newColors);
  };

  const handleChangeColor = (id, newColor) => {
    const newColors = colors.map((color) =>
      color.id === id ? { ...color, color: newColor } : color
    );
    setColors(newColors);
  };

  return (
    <ColorContext.Provider
      value={{ colors, handleAddColor, handleRemoveColor, handleChangeColor }}
    >
      {children}
    </ColorContext.Provider>
  );
};
