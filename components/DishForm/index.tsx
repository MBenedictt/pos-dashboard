/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface AddDishModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function AddDishModal({ isOpen, onClose, onSuccess }: AddDishModalProps) {
    const [activeTab, setActiveTab] = useState('Hot Dishes');
    const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        itemDescription: ''
    });

    return (
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className={`absolute top-0 right-0 h-full w-full lg:w-[450px] bg-[#1F1D2B] shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                <div className="flex-none p-6 pb-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Add New Dish</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${activeTab === cat
                                    ? 'bg-[#FFCA40] text-white border-[#FFCA40]'
                                    : 'bg-transparent text-[#FFCA40] border-[#393C49] hover:bg-[#393C49]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 custom-scrollbar space-y-6">

                    <div className="w-full h-40 border-2 border-dashed border-[#FFCA40] rounded-lg bg-[#1F1D2B] flex flex-col items-center justify-center cursor-pointer hover:bg-[#252836] transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-[#FFCA40]/20 flex items-center justify-center mb-2 group-hover:bg-[#FFCA40]/30">
                            <Plus className="w-6 h-6 text-[#FFCA40]" />
                        </div>
                        <span className="text-[#FFCA40] font-medium text-sm">Add Picture</span>
                    </div>

                    <div className="space-y-4 pb-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Product Name</label>
                            <Input
                                placeholder="Spicy seasoned seafood noodles"
                                className="mt-1 bg-[#2D303E] border-[#393C49] text-white h-12 placeholder:text-gray-500 focus-visible:ring-[#FFCA40]"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Price</label>
                            <Input
                                placeholder="Rp. 0"
                                className="mt-1 bg-[#2D303E] border-[#393C49] text-white h-12 placeholder:text-gray-500 focus-visible:ring-[#FFCA40]"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Stock</label>
                            <Input
                                placeholder="0"
                                className="mt-1 bg-[#2D303E] border-[#393C49] text-white h-12 placeholder:text-gray-500 focus-visible:ring-[#FFCA40]"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">Item</label>
                            <Input
                                placeholder="Description or item details..."
                                className="mt-1 bg-[#2D303E] border-[#393C49] text-white h-12 placeholder:text-gray-500 focus-visible:ring-[#FFCA40]"
                                value={formData.itemDescription}
                                onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-none p-6 pt-4 border-t border-[#393C49] flex gap-4">
                    <Button
                        className="cursor-pointer flex-1 h-12 bg-[#FFCA40] hover:bg-[#FFCA40]/90 text-white font-semibold shadow-lg shadow-[#FFCA40]/20"
                        onClick={onSuccess}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}