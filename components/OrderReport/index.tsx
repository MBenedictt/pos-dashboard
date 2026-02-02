'use client'

import { useOrder } from "@/app/context/orderContext";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import staticOrders from '../../app/data/order.json'

// interface Order {
//     id: number
//     customer: string
//     avatar: string
//     menu: string
//     totalPayment: string
//     status: 'Completed' | 'Preparing' | 'Pending'
// }

export default function OrderReport() {
    const { orders: contextOrders } = useOrder()

    const combinedOrders = [
        ...contextOrders,
        ...staticOrders
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-500/20 text-green-300'
            case 'Preparing': return 'bg-blue-500/20 text-blue-300'
            case 'Pending': return 'bg-yellow-500/20 text-yellow-300'
            default: return 'bg-muted text-muted-foreground'
        }
    }

    const { orders } = useOrder();

    return (
        <div className="w-full bg-[#1F1D2B] mt-4 rounded-lg flex flex-col overflow-hidden h-[600px] xl:h-full">
            <div className="flex items-center justify-between p-6 flex-none max-sm:flex-col max-sm:items-start max-sm:gap-4">
                <h2 className="text-2xl font-semibold">Order Report</h2>
                <Button variant="outline" className="bg-transparent border border-[#393C49] cursor-pointer text-white hover:bg-white">
                    <Settings2 className="mr-2 h-4 w-4" />Filter Order
                </Button>
            </div>

            <div className="flex-1 w-full px-6 pb-6 min-h-0 overflow-x-auto custom-scrollbar">

                <table className="w-full min-w-[700px] text-left border-collapse flex flex-col h-full">

                    <thead className="flex-none text-gray-100 border-b border-[#393C49] table w-full table-fixed">
                        <tr>
                            <th className="py-4 text-sm font-semibold w-[25%]">Customer</th>
                            <th className="py-4 text-sm font-semibold w-[35%]">Menu</th>
                            <th className="py-4 text-sm font-semibold w-[20%]">Total Payment</th>
                            <th className="py-4 text-sm font-semibold w-[20%]">Status</th>
                        </tr>
                    </thead>

                    <tbody className="flex-1 overflow-y-auto block custom-scrollbar">
                        {combinedOrders.map(order => (
                            <tr key={order.id} className="border-b border-[#393C49] hover:bg-[#252836] transition-colors table w-full table-fixed">
                                <td className="py-4 w-[25%]">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-300/20 flex items-center justify-center text-lg">
                                            {order.avatar}
                                        </div>
                                        <span className="font-medium text-gray-300">{order.customer}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-sm text-gray-400 w-[35%]">
                                    <p className="truncate pr-4">{order.menu}</p>
                                </td>
                                <td className="py-4 font-medium text-gray-400 w-[20%]">
                                    {order.totalPayment}
                                </td>
                                <td className="py-4 w-[20%]">
                                    <div className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}