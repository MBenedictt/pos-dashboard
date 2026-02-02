/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreditCard, Wallet, Banknote, Plus, CheckCircle2, ArrowLeft, Trash2, X } from "lucide-react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useOrder } from "@/app/context/orderContext";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    notes: string;
    image: string;
}

interface PaymentConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    cart: OrderItem[];
    subtotal: number;
    orderNumber: string;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onSuccess: () => void;
}

export default function PaymentConfirmation({ isOpen, onClose, cart, subtotal, orderNumber, onUpdateQuantity, onSuccess }: PaymentConfirmationProps) {
    const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Paypal' | 'Cash'>('Card');
    const { addOrder } = useOrder();
    const [customerName, setCustomerName] = useState('')
    const [orderType, setOrderType] = useState('Dine In')
    const [tableNo, setTableNo] = useState('')

    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className={`absolute top-0 right-0 h-full w-full lg:w-[850px] bg-[#1F1D2B] shadow-2xl transform transition-transform duration-300 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="w-full lg:w-[45%] flex flex-col border-b md:border-b-0 md:border-r border-[#393C49] p-6 shrink-0">
                    <div className="flex-none mb-6">
                        <Button variant="ghost" className="p-0 -ml-3 hover:bg-transparent text-gray-400 mb-4 hover:text-white cursor-pointer" onClick={onClose}>
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Confirmation</h2>
                                <p className="text-gray-400 text-sm mt-1">Orders #{orderNumber}</p>
                            </div>
                            <Button size="icon" className="bg-[#FFCA40] hover:bg-[#FFCA40]/90 text-white rounded-lg h-10 w-10 cursor-pointer">
                                <Plus className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 md:overflow-y-auto max-h-60 md:max-h-none overflow-y-auto pr-2 custom-scrollbar space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="border-b border-[#393C49] pb-4 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-3 overflow-hidden">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-white truncate w-24 sm:w-32">{item.name}</p>
                                            <p className="text-xs text-gray-400">Rp. {item.price.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-2 sm:gap-4">
                                        <div className="bg-[#2D303E] border border-[#393C49] text-white px-2 sm:px-3 py-1 rounded-lg text-sm font-medium">
                                            {item.quantity}
                                        </div>
                                        <p className="text-sm font-semibold text-white">
                                            Rp. {(item.price * item.quantity).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-[#2D303E] rounded text-xs text-gray-400 py-2 px-3 truncate">
                                        {item.notes || "No notes"}
                                    </div>
                                    <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(item.id, 0)} className="h-8 w-8 cursor-pointer border-[#FFCA40] bg-transparent text-red-300 hover:bg-red-500/10 hover:text-red-500">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-none pt-4 border-t border-[#393C49] mt-2">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Discount</span>
                            <span className="text-white">Rp 0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Sub total</span>
                            <span className="text-xl font-bold text-white">Rp. {subtotal.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:flex-1 flex flex-col bg-[#1F1D2B] p-6">
                    <div className="flex-none mb-8 border-b border-[#393C49] pb-4">
                        <h2 className="text-2xl font-bold text-white">Payment</h2>
                        <p className="text-gray-400 text-sm mt-1">3 payment method available</p>
                    </div>

                    <div className="flex-none mb-6">
                        <h3 className="text-white font-semibold mb-4">Payment Method</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'Card', icon: CreditCard, label: 'Credit Card' },
                                { id: 'Paypal', icon: Wallet, label: 'Paypal' },
                                { id: 'Cash', icon: Banknote, label: 'Cash' }
                            ].map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id as any)}
                                    className={`cursor-pointer relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === method.id
                                        ? 'bg-[#252836] border-white text-white'
                                        : 'bg-[#1F1D2B] border-[#393C49] text-gray-400 hover:bg-[#252836]'
                                        }`}
                                >
                                    {paymentMethod === method.id && (
                                        <div className="absolute top-2 right-2 text-[#FFCA40]">
                                            <CheckCircle2 className="w-4 h-4 fill-[#FFCA40] text-[#252836]" />
                                        </div>
                                    )}
                                    <method.icon className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-medium">{method.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 md:overflow-y-auto custom-scrollbar pr-2 space-y-4 mb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Cardholder Name</label>
                            <Input placeholder="Test Programmer" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="bg-[#2D303E] border-[#393C49] text-white h-12 mt-1" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Card Number</label>
                            <Input placeholder="2564 1421 0897 1244" className="bg-[#2D303E] border-[#393C49] text-white h-12 mt-1" />
                        </div>
                        <div className="flex gap-4">
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium text-white">Expiration Date</label>
                                <Input placeholder="02/2022" className="bg-[#2D303E] border-[#393C49] text-white h-12 mt-1" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium text-white">CVV</label>
                                <Input type="password" placeholder="•••" className="bg-[#2D303E] border-[#393C49] text-white h-12 mt-1" />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-2">
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium text-white">Order Type</label>
                                <select value={orderType} onChange={(e) => setOrderType(e.target.value)} className="w-full bg-[#1F1D2B] cursor-pointer border border-[#393C49] text-white h-12 rounded-md px-3 appearance-none mt-1">
                                    <option>Dine In</option>
                                    <option>To Go</option>
                                    <option>Delivery</option>
                                </select>
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="text-sm font-medium text-white">Table no.</label>
                                <Input placeholder="140" value={tableNo} onChange={(e) => setTableNo(e.target.value)} className="bg-[#1F1D2B] mt-1 border-[#393C49] text-white h-12" />
                            </div>
                        </div>
                    </div>

                    <div className="flex-none flex gap-4 pt-4 border-t border-[#393C49]">
                        <Button
                            variant="outline"
                            className="flex-1 h-12 border-[#FFCA40] text-[#FFCA40] bg-transparent hover:bg-[#FFCA40]/10 hover:text-white transition-colors cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                const mainMenu =
                                    cart.length === 0
                                        ? 'Unknown Menu'
                                        : cart.length === 1
                                            ? cart[0].name
                                            : `${cart[0].name} and ${cart.length - 1} more`

                                addOrder({
                                    id: Date.now(),
                                    customer: customerName || 'Guest',
                                    avatar: '🧑',
                                    menu: mainMenu,
                                    totalPayment: `Rp. ${subtotal.toLocaleString('id-ID')}`,
                                    status: "Pending"
                                })

                                onSuccess()
                            }}
                            className="flex-1 h-12 bg-[#FFCA40] hover:bg-[#FFCA40]/90 text-white font-semibold shadow-lg shadow-[#FFCA40]/20 cursor-pointer"
                        >
                            Confirm Payment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}