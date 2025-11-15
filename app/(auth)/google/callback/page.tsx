'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import type { User } from '@/types/auth'

function GoogleCallbackContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isProcessing, setIsProcessing] = useState(true)

    useEffect(() => {
        const processGoogleAuth = async () => {
            try {
                const token = searchParams.get('token')
                const userParam = searchParams.get('user')
                const error = searchParams.get('error')

                if (error) {
                    throw new Error(error)
                }

                if (!token || !userParam) {
                    throw new Error('Missing authentication data in callback URL')
                }

                const user = JSON.parse(decodeURIComponent(userParam)) as User

                // Validate that user has required fields including Tier
                if (!user.id || !user.email) {
                    throw new Error('Invalid user data received from authentication')
                }

                // Ensure Tier is set (default to BASIC if missing, though backend should always provide it)
                if (!user.Tier) {
                    console.warn('User Tier not provided, defaulting to BASIC')
                    user.Tier = 'BASIC'
                }

                // Store token and user data in sessionStorage
                sessionStorage.setItem('authToken', token)
                sessionStorage.setItem('user', JSON.stringify(user))

                toast.success('Google sign in successful', {
                    description: `Welcome, ${user.firstName || user.email}!`
                })

                // Redirect to home after successful authentication
                setTimeout(() => {
                    router.push('/home')
                }, 1000)

            } catch (error: any) {
                console.error('Google authentication error:', error)
                toast.error('Authentication failed', {
                    description: error.message || 'Google authentication was unsuccessful'
                })

                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            } finally {
                setIsProcessing(false)
            }
        }

        processGoogleAuth()
    }, [searchParams, router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">
                    {isProcessing ? 'Processing Google authentication...' : 'Redirecting...'}
                </p>
            </div>
        </div>
    )
}

export default function GoogleCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            }
        >
            <GoogleCallbackContent />
        </Suspense>
    )
}