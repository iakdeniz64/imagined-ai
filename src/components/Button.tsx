import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Button.css'

export default function Button({
  destination,
  buttontext,
  size = "default",
  onClickFunction,
  type = "button",
  disabled = false,
}: {
  destination: string;
  buttontext: string;
  size?: "smaller" | "default" | "larger";
  onClickFunction?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: false | true;
}) {
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    if (size === "smaller") {
      setFontSize(0.875);
    } else if (size === "larger") {
      setFontSize(1.25);
    }
  }, [size]);

  const onClickButtonHandler = () => {
    if (onClickFunction) {
      onClickFunction();
    } else {
      navigate(destination);
    }
  };

  return (
    <button
      type={type}
      onClick={onClickButtonHandler}
      style={{ fontSize: `${fontSize}em` }}
      disabled={disabled}
      className={`m-2 border-none disabled:text-gray-500 ${
        size === "smaller"
          ? "text-sm"
          : size === "larger"
          ? "text-xl"
          : "text-base"
      } `
      }
    >
      {buttontext}
    </button>
  );
}