'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
    { name: 'Dine In', value: 200, fill: '#FFCF00' },
    { name: 'To Go', value: 122, fill: '#FFA900' },
    { name: 'Delivery', value: 264, fill: '#DF8109' }
];

export default function MostTypeOrder() {
    return (
        <div className="w-full bg-[#1F1D2B] p-6 rounded-lg flex flex-col h-full">
            <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
                <h1 className="text-xl font-semibold">Most Type of Order</h1>
                <Button variant="outline" className="bg-transparent border border-[#393C49] text-white cursor-pointer">
                    <ChevronDown className="mr-2 h-4 w-4" />Today
                </Button>
            </div>

            <Separator className="mt-5 mb-2 bg-[#393C49]" />

            <div className="flex flex-row max-xl:flex-col items-center justify-center flex-1 gap-6">

                <div className="relative w-[180px] h-[180px] min-w-[180px] min-h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="40%"
                            outerRadius="100%"
                            data={data}
                            barSize={12}
                            startAngle={90}
                            endAngle={480}
                        >
                            <RadialBar
                                background={{ fill: '#252836' }}
                                dataKey="value"
                                cornerRadius={10}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-white">586</span>
                        <span className="text-xs text-gray-400">Total</span>
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                            <div
                                className="w-3 h-3 rounded-full mt-1.5"
                                style={{ backgroundColor: item.fill }}
                            />
                            <div>
                                <p className="text-sm font-medium text-white">{item.name}</p>
                                <p className="text-xs text-gray-400">{item.value} customers</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}