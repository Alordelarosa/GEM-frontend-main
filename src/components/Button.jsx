import React from "react";

function Button({ text, onClick, className = "", type = "default" }) {
    // Determina el color de fondo basado en el tipo
    const buttonClass = type === "confirm"
        ? "bg-green-700 hover:bg-green-500"
        : type === "cancel"
        ? "bg-sky-900 hover:bg-sky-700"
        : "bg-blue-700 hover:bg-blue-500";

    return (
        <button
            className={`text-white px-4 py-2 rounded-md transition ${buttonClass} ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;