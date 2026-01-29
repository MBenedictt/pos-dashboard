'use client';

import { CheckCircle } from 'lucide-react';

interface DishSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DishSuccessModal({ isOpen, onClose }: DishSuccessModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative rounded-lg bg-[#1F1D2B] border border-[#393C49] p-8 text-center sm:max-w-md">
                <div className="mb-6 flex justify-center">
                    <CheckCircle className="text-[#FFCA40]" size={64} />
                </div>

                <h2 className="mb-2 text-2xl font-bold text-white">Create Successful!</h2>
                <p className="mb-4 text-sm text-gray-400">
                    Your dish has been added to the menu.
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
