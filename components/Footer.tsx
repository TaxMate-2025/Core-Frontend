import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
    weight: "400",
    subsets: ['latin']
})

const Footer = () => {
    return (
        <footer className={`${montserrat.className} px-4 sm:px-6 lg:px-8 py-8 bg-white border-t border-gray-200`}>
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-black font-normal">Built for Nigerians. © 2025 TaxMate — All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer