'use client';

import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
    isOpen: boolean;
    orderNumber: string;
    onClose: () => void;
}

export default function SuccessModal({ isOpen, orderNumber, onClose }: SuccessModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative rounded-lg bg-[#1F1D2B] border border-[#393C49] p-8 text-center sm:max-w-md">
                <div className="mb-6 flex justify-center">
                    <CheckCircle className="text-[#FFCA40]" size={64} />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-white">Order Successful!</h2>
                <p className="mb-4 text-sm text-gray-400">
                    Your order has been confirmed and will be prepared shortly.
                </p>

                <div className="mb-6 rounded-lg bg-[#2D303E] p-4">
                    <p className="text-xs text-gray-400">Order Number</p>
                    <p className="text-2xl font-bold text-white">#{orderNumber}</p>
                </div>

                <p className="mb-6 text-sm text-gray-400">
                    Thank you for your order! Our team will notify you when your meal is ready.
                </p>

                <button
                    onClick={onClose}
                    className="cursor-pointer w-full rounded-lg bg-[#FFCA40] px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
