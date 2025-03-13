import React, { useEffect, useRef, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import ChocolateWithImage from "./ChocolateWithImage";
import myImage from "../assets/myImage.jpg";

const Chocolate = ({ index, totalChocolates, isFormed }) => {
    const getHeartPosition = (i, total) => {
        const getHeartX = (t) => 16 * Math.pow(Math.sin(t), 3)
        const getHeartY = (t) => 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    
        const angle = (2 * Math.PI * i) / total
        const x = getHeartX(angle) * 2 + 50
        const y = -getHeartY(angle) * 3 + 50
    
        return { x, y }
    }
    
    const heartPos = getHeartPosition(index, totalChocolates)
    const randomRotation = Math.random() * 20 - 10
    const randomX = Math.random() * 100
    const randomY = Math.random() * 100
    
    return (
        <div
        className="chocolate-piece"
        style={{
            position: "absolute",
            width: "40px",
            height: "15px",
            transformOrigin: "center",
            transition: "all 2s ease-in-out",
            left: isFormed ? `${heartPos.x}%` : `${randomX}%`,
            top: isFormed ? `${heartPos.y}%` : `${randomY}%`,
            transform: `rotate(${randomRotation}deg)`,
        }}
        >
        <div className="chocolate-bar">
            <div className="chocolate-shine"></div>
        </div>
        </div>
    )
    }

export default function SuccessPage() {
    const [displayText, setDisplayText] = useState("");
    const fullText = "Love you so muchhhh!! This is your chocolate haha :333 -->";
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    const transitionTime = 1000;
    const [isHeartFormed, setIsHeartFormed] = useState(true)
    const indexRef = useRef(0);
    const modeRef = useRef("typing");
    const lastUpdateTimeRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIsHeartFormed((prev) => !prev)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    // Tạo các thanh socola
    const totalChocolates = 24
    const chocolates = Array.from({ length: totalChocolates }, (_, i) => (
        <Chocolate key={i} index={i} totalChocolates={totalChocolates} isFormed={isHeartFormed} />
    ))

    const animate = useCallback((currentTime) => {
        const delta = currentTime - lastUpdateTimeRef.current;

        if (
        modeRef.current === "typing" &&
        delta > typingSpeed &&
        indexRef.current < fullText.length
        ) {
        setDisplayText(fullText.slice(0, ++indexRef.current));
        lastUpdateTimeRef.current = currentTime;
        } else if (
        modeRef.current === "typing" &&
        indexRef.current === fullText.length
        ) {
        modeRef.current = "pausing";
        lastUpdateTimeRef.current = currentTime;
        } else if (modeRef.current === "pausing" && delta > pauseTime) {
        modeRef.current = "deleting";
        lastUpdateTimeRef.current = currentTime;
        } else if (
        modeRef.current === "deleting" &&
        delta > deletingSpeed &&
        indexRef.current > 0
        ) {
        setDisplayText(fullText.slice(0, --indexRef.current));
        lastUpdateTimeRef.current = currentTime;
        } else if (modeRef.current === "deleting" && indexRef.current === 0) {
        modeRef.current = "typing";
        lastUpdateTimeRef.current = currentTime + transitionTime;
        }

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        lastUpdateTimeRef.current = performance.now();
        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [animate]);

    return (
        <div
        className="relative min-h-screen w-full bg-gradient-to-br from-[#FFD1E4] to-[#FFAB91]"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
        >
            <div className="chocolate-container">{chocolates}</div>

        {/* Nội dung chính */}
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", zIndex: 10 }}>
            <div
            className="relative flex flex-col items-center justify-center p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-xl w-[90vw] max-w-md"
            style={{ minHeight: "300px" }}
            >
            <h1
                className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse mb-4"
                style={{ textAlign: "center" }}
            >
                <span className="animate-pulse">❤️</span>
                <span>{displayText}</span>
                <span className="animate-pulse">❤️</span>
            </h1>
            <div className="mt-8 flex justify-center gap-4">
                <Heart className="text-red-500 animate-bounce" size={30} fill="currentColor" />
                <Heart className="text-pink-500 animate-bounce delay-100" size={40} fill="currentColor" />
                <Heart className="text-red-500 animate-bounce delay-200" size={30} fill="currentColor" />
            </div>
            </div>

            {/* Thanh socola chứa hình ảnh */}
            <div className="chocolate-image-column" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ChocolateWithImage imageSrc={myImage} />
            <ChocolateWithImage imageSrc={myImage} />
            <ChocolateWithImage imageSrc={myImage} />
            </div>
        </div>
        </div>
    );
}
