// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'
// import { LoaderCircle } from 'lucide-react'

// export default function GoogleCallbackPage() {
//     const router = useRouter()
//     // const { handleGoogleAuthSuccess, state } = useAuth()
//     const [isProcessing, setIsProcessing] = useState(true)

//     useEffect(() => {
//         const processGoogleAuth = async () => {
//             try {
//                 const urlParams = new URLSearchParams(window.location.search)
//                 const token = urlParams.get('token')
//                 const userParam = urlParams.get('user')
//                 const error = urlParams.get('error')

//                 if (error) {
//                     throw new Error(error)
//                 }

//                 if (!token || !userParam) {
//                     throw new Error('Missing authentication data in callback URL')
//                 }

//                 const user = JSON.parse(decodeURIComponent(userParam))

//                 console.log('Google auth callback received:', { token, user })

//                 await handleGoogleAuthSuccess({
//                     user,
//                     token
//                 })

//                 console.log('Google authentication processed successfully')

//             } catch (error: any) {
//                 console.error('Google authentication error:', error)
//                 toast.error('Authentication failed', {
//                     description: error.message || 'Google authentication was unsuccessful'
//                 })

//                 setTimeout(() => {
//                     router.push('/sign-up')
//                 }, 2000)
//             } finally {
//                 setIsProcessing(false)
//             }
//         }

//         processGoogleAuth()
//     }, [handleGoogleAuthSuccess, router])

//     // Handle successful authentication
//     useEffect(() => {
//         if (state.success && state.user && !isProcessing) {
//             toast.success('Google sign in successful', {
//                 description: `Welcome, ${state.user.name}!`
//             })

//             setTimeout(() => {
//                 router.push('/home')
//             }, 1000)
//         }

//         if (state.error && !isProcessing) {
//             toast.error('Authentication failed', {
//                 description: state.error
//             })

//             setTimeout(() => {
//                 router.push('/sign-up')
//             }, 2000)
//         }
//     }, [state.success, state.user, state.error, isProcessing, router])

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50">
//             <div className="text-center">
//                 <LoaderCircle className="w-8 h-8 animate-spin mx-auto mb-4" />
//                 <p className="text-gray-600">
//                     {isProcessing ? 'Processing Google authentication...' : 'Redirecting...'}
//                 </p>
//             </div>
//         </div>
//     )
// }