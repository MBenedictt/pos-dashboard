'use client';

import { useState } from 'react';
import Image from 'next/image';
import menuData from '../../app/data/menu.json';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

interface MenuSectionProps {
    onAddItem: (item: { id: string; name: string; price: number; image: string }) => void;
}

export default function OrderMenu({ onAddItem }: MenuSectionProps) {
    const [activeCategory, setActiveCategory] = useState('Hot Dishes');

    const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];
    const filteredItems = menuData.filter((item) => item.category === activeCategory);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-none">
                <div className="mb-6 mt-6 flex gap-8 overflow-x-auto custom-scrollbar max-lg:flex-wrap max-lg:gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`pb-2 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${activeCategory === category
                                ? 'text-[#FFCA40] border-b-2 border-[#FFCA40]'
                                : 'text-gray-100 hover:text-[#FFCA40]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:gap-4 max-md:items-start">
                    <h3 className="text-xl font-semibold text-white">Choose Dishes</h3>
                    <Button variant="outline" className="bg-[#1F1D2B] p-4 border border-[#393C49] text-white cursor-pointer">
                        <ChevronDown className="mr-2 h-4 w-4" />Dine In
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pt-12 pb-18 pr-4">

                <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-6 gap-y-12">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onAddItem(item)}
                            className="bg-[#1F1D2B] rounded-2xl p-6 relative mt-4 cursor-pointer hover:bg-slate-600 transition-all duration-300 group"
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-[#1F1D2B] shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="mt-20 text-center flex flex-col items-center">
                                <h4 className="text-lg font-medium text-gray-100 line-clamp-2 leading-snug mb-2">
                                    {item.name}
                                </h4>
                                <span className="text-base text-gray-100 font-medium mb-1">
                                    Rp. {item.price.toLocaleString('id-ID')}
                                </span>
                                <p className="text-sm text-gray-400">
                                    {item.available} Bowls available
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}