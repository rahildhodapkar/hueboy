import { useEffect } from "react";
import "../styles/loader.css";

export default function Loader() {
  useEffect(() => {
    const loader = document.querySelector(".loader-container");

    const handleLoad = () => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

