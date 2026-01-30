import { SearchIcon } from "lucide-react";
import OrderMenu from "../OrderMenu";
import { useState } from 'react';
import { Input } from "../ui/input";
import OrderSummary from "../OrderSummary";
import PaymentConfirmation from "../PaymentConfirmation";
import SuccessModal from "../SuccessModal";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    notes: string;
    image: string;
}

export default function OrderView({ formattedDate }: { formattedDate: string }) {
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [showPayment, setShowPayment] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [orderNumber] = useState('34582');

    const addToCart = (item: { id: string; name: string; price: number; image: string }) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1, notes: '' }]);
        }
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            setCart(cart.filter((item) => item.id !== id));
        } else {
            setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
        }
    };

    const updateNotes = (id: string, notes: string) => {
        setCart(cart.map((item) => (item.id === id ? { ...item, notes } : item)));
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const calculatedSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <div className="flex-1 flex overflow-y-auto">
            <div className="w-8/12 h-full flex flex-col p-6 overflow-hidden">
                <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Made Resto</h1>
                        <h4 className="text-[#ABBBC2] mt-1">{formattedDate}</h4>
                    </div>
                    <div className="relative w-1/2 max-w-sm max-sm:w-full">
                        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-100" />

                        <Input className="pl-10 py-6" placeholder="Search for food, coffee, etc.." type="search" />
                    </div>
                </div>

                <OrderMenu onAddItem={addToCart} />
            </div>
            <div className="w-4/12 h-full bg-[#1F1D2B] rounded-l-lg p-6">
                <OrderSummary
                    cart={cart}
                    orderNumber={orderNumber}
                    onUpdateQuantity={updateQuantity}
                    onUpdateNotes={updateNotes}
                    subtotal={subtotal}
                    onPayment={() => setShowPayment(true)}
                />
            </div>

            <PaymentConfirmation
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                cart={cart}
                subtotal={calculatedSubtotal}
                orderNumber={orderNumber}
                onUpdateQuantity={updateQuantity}
                onSuccess={() => { setShowModal(true); setShowPayment(false); }}
            />

            <SuccessModal isOpen={showModal} onClose={() => { setShowModal(false); setCart([]); }} orderNumber={orderNumber} />
        </div>
    )
}