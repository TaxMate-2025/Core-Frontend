"use client"

import Image from "next/image"
import { MainNavbar } from "@/components/MainNavbar"
import Footer from "@/components/Footer"
import layout_grid from '../../public/layout_grid.svg'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col hero_gradient">
            <MainNavbar />
            <div>
                <Image
                    src={layout_grid}
                    alt="background_layout_grid"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
            </div>
            <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 relative z-10">{children}</main>
            <Footer />
        </div>
    )
}
