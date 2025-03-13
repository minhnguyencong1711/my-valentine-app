"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/valentine.css"

// Component cho thanh socola
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

export default function ValentinePage() {
const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
const [yesButtonSize, setYesButtonSize] = useState(1)
const [noCount, setNoCount] = useState(0)
const [isFirstMove, setIsFirstMove] = useState(true)
const [isHeartFormed, setIsHeartFormed] = useState(true)
const containerRef = useRef(null)
const yesButtonRef = useRef(null)
const navigate = useNavigate()

// Toggle trạng thái trái tim
useEffect(() => {
    const interval = setInterval(() => {
    setIsHeartFormed((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
}, [])

const moveNoButton = () => {
    if (!containerRef.current || !yesButtonRef.current) return

    if (isFirstMove) {
    setIsFirstMove(false)
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const yesButtonRect = yesButtonRef.current.getBoundingClientRect()
    const noButtonWidth = 100 // Ước tính chiều rộng nút No
    const noButtonHeight = 40 // Ước tính chiều cao nút No

    let newX, newY
    let attempts = 0
    const maxAttempts = 50

    // Tìm vị trí mới cho nút No, tránh overlap với nút Yes
    do {
    newX = Math.random() * (containerRect.width - noButtonWidth) - containerRect.width / 3
    newY = Math.random() * (containerRect.height - noButtonHeight) - containerRect.height / 3
    attempts++

    // Kiểm tra khoảng cách với nút Yes
    const distance = Math.sqrt(
        Math.pow(newX - (yesButtonRect.left - containerRect.left), 2) +
        Math.pow(newY - (yesButtonRect.top - containerRect.top), 2),
    )

    if (distance > 200) {
        // Khoảng cách tối thiểu giữa hai nút
        break
    }
    } while (attempts < maxAttempts)

    setNoButtonPosition({ x: newX, y: newY })
    setNoCount((prev) => prev + 1)
    setYesButtonSize((prev) => Math.min(prev + 0.3, 5))
}

useEffect(() => {
    if (noCount >= 5) {
    setYesButtonSize(5)
    }
}, [noCount])

const handleYesClick = () => {
    navigate("/SuccessPage")
}

// Tạo các thanh socola
const totalChocolates = 24
const chocolates = Array.from({ length: totalChocolates }, (_, i) => (
    <Chocolate key={i} index={i} totalChocolates={totalChocolates} isFormed={isHeartFormed} />
))

return (
    <div className="valentine-container">
    {/* Chocolate heart container */}
    <div className="chocolate-container">{chocolates}</div>

    <div ref={containerRef} className="valentine-card">
        <div className="heart-corner top-left"></div>
        <div className="heart-corner top-right"></div>

        <h1 className="valentine-title">
        Will you be my valentine,
        <br />
        my lovely bbi?
        </h1>

        <div className="button-container">
        <button
            ref={yesButtonRef}
            onClick={handleYesClick}
            className="yes-button"
            style={{
            transform: `scale(${yesButtonSize})`,
            }}
        >
            Yes
        </button>

        <button
            onClick={moveNoButton}
            className="no-button"
            style={{
            transform: isFirstMove ? "none" : `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            position: isFirstMove ? "relative" : "absolute",
            opacity: noCount >= 5 ? 0.5 : 1,
            }}
        >
            No
        </button>
        </div>

        <div className="heart-footer">
        <div className="heart-icon"></div>
        <div className="heart-icon filled"></div>
        <div className="heart-icon"></div>
        </div>
    </div>
    </div>
)
}

