import { useState, useEffect } from "react";

const useAudio = (url) => {
    const [audio] = useState(() => new Audio(url));
    const [isPlaying, setIsPlaying] = useState(
        localStorage.getItem("isPlaying") === "true"
    );

    const toggle = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        audio.loop = true;
        localStorage.setItem("isPlaying", isPlaying);
        
        if (isPlaying) {
            audio.play().catch(err => console.error("Play error:", err));
        } else {
            audio.pause();
        }

        return () => audio.pause();
    }, [isPlaying, audio]);

    return [isPlaying, toggle];
};

export default useAudio;