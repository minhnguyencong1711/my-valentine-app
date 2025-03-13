import { useState } from "react"
import ValentinePage from "@/components/valentine-page"
import SuccessPage from "@/components/success-page"

export default function Home() {
    const [accepted, setAccepted] = useState(false)

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#FFD1E4] to-[#FFAB91] flex items-center justify-center !important">
        {!accepted ? <ValentinePage onAccept={() => setAccepted(true)} /> : <SuccessPage />}
        </main>
    )
}