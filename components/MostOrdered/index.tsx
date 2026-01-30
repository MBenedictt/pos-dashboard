'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DishItem {
    id: number
    name: string
    count: number
    image: string
}

export default function MostOrdered() {
    const dishes: DishItem[] = [
        {
            id: 1,
            name: 'Fat Beef Patty Burger',
            count: 200,
            image: 'https://foodish-api.com/images/burger/burger9.jpg',
        },
        {
            id: 2,
            name: 'Hongkong Fried Rice',
            count: 120,
            image: 'https://foodish-api.com/images/rice/rice5.jpg',
        },
        {
            id: 3,
            name: 'Choco Cake with Berries',
            count: 80,
            image: 'https://foodish-api.com/images/dessert/dessert5.jpg',
        },
        {
            id: 4,
            name: 'Chicken Biryani Platter',
            count: 48,
            image: 'https://foodish-api.com/images/biryani/biryani50.jpg',
        },
        {
            id: 5,
            name: 'Tomato Pasta',
            count: 42,
            image: 'https://foodish-api.com/images/pasta/pasta1.jpg',
        },
        {
            id: 8,
            name: 'Margerita Pizza',
            count: 38,
            image: 'https://foodish-api.com/images/pizza/pizza20.jpg',
        }
    ];

    const [isExpanded, setIsExpanded] = useState(false);

    const visibleDishes = isExpanded ? dishes : dishes.slice(0, 2);

    return (
        <div
            className={`
                w-full bg-[#1F1D2B] p-6 rounded-lg flex flex-col 
                transition-all duration-300 ease-in-out
                ${isExpanded
                    ? "absolute inset-0 z-20 h-full"
                    : "relative h-auto mb-6"
                }
                `}
        >
            <div className="flex-none">
                <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4">
                    <h1 className="text-2xl font-semibold">Most Ordered</h1>
                    <Button variant="outline" className="bg-transparent border border-[#393C49] text-white cursor-pointer">
                        <ChevronDown className="mr-2 h-4 w-4" />Today
                    </Button>
                </div>
                <Separator className="mt-5 mb-2 bg-[#393C49]" />
            </div>

            <div className={`space-y-2 overflow-y-auto custom-scrollbar ${isExpanded ? "flex-1 min-h-0 pr-2" : ""}`}>
                {visibleDishes.map((dish) => (
                    <div key={dish.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#252836] cursor-pointer transition-colors">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1 text-gray-100">{dish.name}</p>
                            <p className="text-sm text-gray-400">{dish.count} dishes ordered</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-4 flex-none">
                <Button
                    variant="outline"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full bg-transparent hover:bg-[#EA7C69]/10 text-[#EA7C69] hover:text-[#EA7C69] cursor-pointer border border-[#EA7C69] py-6"
                >
                    {isExpanded ? "Hide" : "View All"}
                </Button>
            </div>
        </div>
    );
}