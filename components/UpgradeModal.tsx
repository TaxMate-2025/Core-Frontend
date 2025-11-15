import { X, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    calculatorType: "advanced" | "business" | null;
    getToken: () => string | null;
}

export function UpgradeModal({ isOpen, onClose, calculatorType, getToken }: UpgradeModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const calculatorNames = {
        advanced: "Advanced Calculator",
        business: "Business Calculator",
    };

    const handleUpgrade = async () => {
        try {
            setIsLoading(true);

            const token = getToken();
            if (!token) {
                toast.error("Authentication required. Please log in.");
                return;
            }

            const response = await fetch(
                "https://core-backend-kdkn.onrender.com/payments/upgrade-to-premium",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to initiate upgrade");
            }

            const data = await response.json();

            // If the response contains a payment URL, redirect to it
            if (data.paymentUrl || data.authorizationUrl || data.data?.authorizationUrl) {
                const paymentUrl = data.paymentUrl || data.authorizationUrl || data.data?.authorizationUrl;
                window.location.href = paymentUrl;
            } else {
                toast.success("Upgrade initiated successfully!");
                onClose();
            }
        } catch (error) {
            console.error("Upgrade error:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to upgrade. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Lock Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-[#1E3A8A]" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-[#1E3A8A] text-center mb-3">
                        Upgrade Required
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-center mb-6">
                        The <span className="font-semibold text-[#1E3A8A]">{calculatorType && calculatorNames[calculatorType]}</span> is only available for Premium users.
                    </p>

                    {/* Features */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700">
                                Access advanced tax calculations with multiple income sources
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700">
                                Business tax calculator for SMEs and companies
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700">
                                Detailed breakdowns, tax-saving tips, and more
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleUpgrade}
                            disabled={isLoading}
                            className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white py-6 text-base font-medium cursor-pointer"
                        >
                            {isLoading ? "Processing..." : "Upgrade Now"}
                        </Button>
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}