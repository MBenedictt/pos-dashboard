/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    notes: string;
    image: string;
}

interface OrderSummaryProps {
    cart: OrderItem[];
    orderNumber: string;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onUpdateNotes: (id: string, notes: string) => void;
    subtotal: number;
    onPayment: () => void;
}

export default function OrderSummary({
    cart,
    orderNumber,
    onUpdateQuantity,
    onUpdateNotes,
    subtotal,
    onPayment
}: OrderSummaryProps) {
    const [orderType, setOrderType] = useState<'Dine In' | 'Take It' | 'Delivery'>('Dine In');

    return (
        <div className="flex flex-col h-full text-white">

            <div className="flex-none">
                <h2 className="text-xl font-semibold mb-6">Orders #{orderNumber}</h2>

                <div className="flex gap-3 mb-6 max-lg:flex-wrap">
                    {['Dine In', 'Take It', 'Delivery'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setOrderType(type as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors border cursor-pointer ${orderType === type
                                ? 'bg-[#FFCA40] text-white border-[#FFCA40]'
                                : 'bg-transparent text-[#FFCA40] border-[#393C49] hover:bg-[#393C49]'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center text-base font-semibold border-b border-[#393C49] pb-4 mb-4">
                    <span className="w-1/2">Item</span>
                    <span className="w-1/6 text-center">Qty</span>
                    <span className="w-1/3 text-right">Price</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <p>No items added yet</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="group">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3 w-1/2 overflow-hidden">
                                    <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-100 truncate pr-2">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Rp. {item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-1/6 flex justify-center">
                                    <div className="flex items-center gap-2 bg-[#2D303E] rounded-lg px-2 py-1">
                                        <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                                        <div className="flex flex-col gap-0.5">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                className="hover:text-[#FFCA40] transition-colors"
                                            >
                                                <ChevronUp className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                className="hover:text-[#FFCA40] transition-colors"
                                            >
                                                <ChevronDown className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/3 text-right font-medium text-gray-100 max-lg:text-sm">
                                    Rp. {(item.price * item.quantity).toLocaleString('id-ID')}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <Input
                                    placeholder="Order Note..."
                                    value={item.notes}
                                    onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                                    className="flex-1 bg-[#2D303E] border-[#393C49] text-gray-300 placeholder:text-gray-500 focus-visible:ring-[#FFCA40] h-10"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => onUpdateQuantity(item.id, 0)}
                                    className="h-10 w-10 border-[#FFCA40] text-red-300 cursor-pointer bg-transparent hover:bg-red-500/10 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex-none pt-4 border-t border-[#393C49] mt-2">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400">Discount</span>
                    <span className="font-medium">Rp 0</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400">Sub total</span>
                    <span className="text-xl font-bold text-white">
                        Rp. {subtotal.toLocaleString('id-ID')}
                    </span>
                </div>
                <Button
                    onClick={onPayment}
                    className="w-full bg-[#FFCA40] cursor-pointer hover:bg-[#FFCA40]/90 text-white font-semibold h-12 rounded-lg shadow-lg shadow-[#FFCA40]/20"
                    disabled={cart.length === 0}
                >
                    Continue to Payment
                </Button>
            </div>
        </div>
    );
}