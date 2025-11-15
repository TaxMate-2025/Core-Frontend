'use client'

import Link from 'next/link'
import { Home, ArrowLeft, } from 'lucide-react'
import { Logo } from '@/components/Logo'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen hero_gradient flex flex-col items-center justify-center p-4">
            {/* Logo at top */}
            <div className="absolute top-8 left-8">
                <Logo />
            </div>

            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 Text */}
                <div className="relative mb-8">
                    <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-transparent bg-[#1E3A8A] from-[#1E3A8A] to-[#10B981] bg-clip-text animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-bold text-[#E8EAF6] -z-10 transform translate-x-2 translate-y-2">
                        404
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3A8A]">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
                        The page you're looking for seems to have vanished into the digital void.
                        Don't worry, we'll help you find your way back!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        <Home size={20} />
                        Back to Home
                    </button>
                </div>

                {/* Popular Links */}
                <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border-2 border-[#E8EAF6] mb-8">
                    <h3 className="text-xl font-semibold text-[#1E3A8A] mb-6">
                        Looking for something specific?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-[#E8EAF6] rounded-lg transition-colors cursor-pointer group"
                        >
                            <Home className="text-[#1E3A8A] group-hover:scale-110 transition-transform" size={20} />
                            <span className="font-medium text-gray-700">Homepage</span>
                        </Link>

                        <Link
                            href="/sign-in"
                            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-[#E8EAF6] rounded-lg transition-colors cursor-pointer group"
                        >
                            <ArrowLeft className="text-[#1E3A8A] group-hover:scale-110 transition-transform" size={20} />
                            <span className="font-medium text-gray-700">Sign In</span>
                        </Link>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="relative">
                    <div className="absolute -top-20 -left-10 w-20 h-20 bg-[#1E3A8A] opacity-10 rounded-full animate-bounce"></div>
                    <div className="absolute -top-32 -right-16 w-16 h-16 bg-[#10B981] opacity-20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-10 left-1/4 w-12 h-12 bg-[#1E3A8A] opacity-15 rounded-full animate-bounce delay-1000"></div>
                </div>

                {/* Footer Text */}
                <div className="text-center">
                    <p className="text-gray-500">
                        Need help? Contact our support team at{' '}
                        <a
                            href="mailto:info@taxmate.com"
                            className="text-[#1E3A8A] hover:underline font-medium"
                        >
                            support@taxmate.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
