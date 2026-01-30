'use client';

import { useState } from 'react';
import { Settings2, Plus, Pen } from "lucide-react";
import { Button } from "../ui/button";
import Image from 'next/image';
import menuData from '../../app/data/menu.json';
import DishForm from '../DishForm';
import DishSuccessModal from '../DishSuccessModal';

export default function MenuView() {
    const [activeCategory, setActiveCategory] = useState('Hot Dishes');
    const [isDishFormOpen, setIsDishFormOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];

    const filteredItems = menuData.filter((item) => item.category === activeCategory);

    return (
        <div className="flex-1 flex flex-col h-full p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
            </div>

            <div className="flex-1 bg-[#1F1D2B] rounded-lg flex flex-col min-h-0 shadow-lg">

                <div className="p-6 pb-0">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-semibold text-white">Products Management</h2>
                        <Button
                            variant="outline"
                            className="cursor-pointer border-[#393C49] text-white hover:bg-white bg-transparent h-12 px-4"
                        >
                            <Settings2 className="mr-2 h-4 w-4" /> Manage Categories
                        </Button>
                    </div>

                    <div className="flex gap-8 border-b border-[#393C49] mb-8 overflow-x-auto custom-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`cursor-pointer pb-3 text-sm font-semibold transition-all relative whitespace-nowrap ${activeCategory === cat
                                    ? "text-[#FFCA40] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#FFCA40]"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 pt-0 custom-scrollbar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">

                        <div onClick={() => setIsDishFormOpen(true)} className="flex flex-col items-center justify-center h-[280px] border-2 border-dashed border-[#FFCA40] rounded-lg cursor-pointer hover:bg-[#FFCA40]/5 transition-colors group">
                            <Plus className="w-10 h-10 mb-4 text-[#FFCA40]" />
                            <span className="font-semibold text-lg text-[#FFCA40]">Add new dish</span>
                        </div>

                        {filteredItems.map((item) => (
                            <div key={item.id} className="bg-[#1F1D2B] border border-[#393C49] rounded-lg flex flex-col items-center h-[280px] hover:bg-[#252836] transition-colors">

                                <div className="relative w-28 h-28 mt-6 mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>

                                <h3 className="text-white font-medium text-center mb-2 px-2 line-clamp-1 w-full">
                                    {item.name}
                                </h3>
                                <div className="text-gray-400 text-sm mb-auto flex gap-2">
                                    <span>Rp. {item.price.toLocaleString('id-ID')}</span>
                                    <span>•</span>
                                    <span>{item.available} Bowls</span>
                                </div>

                                <Button className="w-full bg-[#FFCA40]/20 text-[#FFCA40] hover:bg-[#FFCA40] hover:text-white mt-4 h-12 font-semibold rounded-none rounded-b-lg cursor-pointer">
                                    <Pen className="w-4 h-4 mr-2" /> Edit dish
                                </Button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <DishForm
                isOpen={isDishFormOpen}
                onClose={() => setIsDishFormOpen(false)}
                onSuccess={() => { setShowModal(true) }}
            />

            <DishSuccessModal isOpen={showModal} onClose={() => { setShowModal(false); setIsDishFormOpen(false); }} />
        </div>
    )
}