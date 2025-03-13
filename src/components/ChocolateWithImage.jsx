// ChocolateWithImage.jsx
import React from "react";

const ChocolateWithImage = ({ imageSrc }) => {
    return (
        <div
        className="chocolate-wrapper"
        style={{
            width: "200px",
            height: "80px",
            backgroundColor: "#8B4513",
            borderRadius: "15px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        <div
            style={{
            position: "absolute",
            top: "-10px",
            left: "10px",
            width: "90%",
            height: "10px",
            backgroundColor: "#5C3317",
            borderRadius: "5px",
            }}
        ></div>

        <img
            src={imageSrc}
            alt="Chocolate Decoration"
            style={{
            width: "90%",
            height: "70%",
            objectFit: "cover",
            borderRadius: "10px",
            }}
        />
        </div>
    );
};

export default ChocolateWithImage;
