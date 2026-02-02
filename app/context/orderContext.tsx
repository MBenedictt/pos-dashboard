'use client'

import { createContext, useContext, useState } from 'react'

export interface OrderItem {
    id: number
    customer: string
    avatar: string
    menu: string
    totalPayment: string
    status: 'Completed' | 'Preparing' | 'Pending'
}

interface OrderContextType {
    orders: OrderItem[]
    addOrder: (order: OrderItem) => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<OrderItem[]>([])

    const addOrder = (order: OrderItem) => {
        setOrders(prev => [order, ...prev]) // ⬅️ masuk paling atas
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => {
    const ctx = useContext(OrderContext)
    if (!ctx) throw new Error('useOrder must be used inside OrderProvider')
    return ctx
}