import MostOrdered from "@/components/MostOrdered";
import MostTypeOrder from "@/components/MostTypeOrder";
import OrderReport from "@/components/OrderReport";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowUp, BookmarkMinus, CircleDollarSign, Users } from "lucide-react";

export default function DashboardView({ formattedDate }: { formattedDate: string }) {
    return (
        <div className="flex-1 flex overflow-y-auto p-6 space-x-6 max-lg:space-x-0 max-lg:space-y-6 max-lg:flex-col">
            <div className="w-8/12 h-full flex flex-col max-lg:w-full">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <h4 className="text-[#ABBBC2] mt-1">{formattedDate}</h4>

                <Separator className="my-4 bg-[#393C49]" />

                <div className="grid grid-cols-3 gap-4 mt-4 max-lg:grid-cols-1">
                    <div className="p-4 bg-[#1F1D2B] rounded-lg">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-[#252836] flex items-center justify-center">
                                <CircleDollarSign className="w-6 h-6 text-[#9288E0]" />
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                                <p className="text-sm text-[#50D1AA]">+32.40%</p>
                                <div className="w-6 h-6 rounded-full bg-[#88E091]/24 flex items-center justify-center">
                                    <ArrowUp className="w-4 h-4 text-[#50D1AA]" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mt-2">Rp.151.248.138</h2>
                        <h4 className="text-sm text-[#ABBBC2]">Total Revenue</h4>
                    </div>
                    <div className="p-4 bg-[#1F1D2B] rounded-lg">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-[#252836] flex items-center justify-center">
                                <BookmarkMinus className="w-6 h-6 text-[#FFB572]" />
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                                <p className="text-sm text-[#FF7CA3]">-12.40%</p>
                                <div className="w-6 h-6 rounded-full bg-[#FF6471]/24 flex items-center justify-center">
                                    <ArrowDown className="w-4 h-4 text-[#FF7CA3]" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mt-2">23,456</h2>
                        <h4 className="text-sm text-[#ABBBC2]">Total Dish Ordered</h4>
                    </div>
                    <div className="p-4 bg-[#1F1D2B] rounded-lg">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-[#252836] flex items-center justify-center">
                                <Users className="w-6 h-6 text-[#65B0F6]" />
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                                <p className="text-sm text-[#50D1AA]">+2.40%</p>
                                <div className="w-6 h-6 rounded-full bg-[#88E091]/24 flex items-center justify-center">
                                    <ArrowUp className="w-4 h-4 text-[#50D1AA]" />
                                </div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mt-2">1,234</h2>
                        <h4 className="text-sm text-[#ABBBC2]">Total Customer</h4>
                    </div>
                </div>

                <OrderReport />
            </div>
            <div className="w-4/12 max-lg:w-full h-full relative flex flex-col">
                <MostOrdered />
                <MostTypeOrder />
            </div>
        </div>
    );
}