import { Home, Store, ChartPie, Settings, LogOut } from 'lucide-react'

interface SidebarProps {
    activeNav: string
    setActiveNav: (nav: string) => void
}

export default function Sidebar({ activeNav, setActiveNav }: SidebarProps) {
    const navItems = [
        { id: 'order', icon: Home, label: 'Order' },
        { id: 'dashboard', icon: ChartPie, label: 'Dashboard' },
        { id: 'menu', icon: Settings, label: 'Menu' },
    ]

    return (
        <aside className="w-20 sticky top-0 left-0 h-screen flex flex-col items-center py-6 space-y-6 bg-[#1F1D2B] rounded-r-lg">
            <div className="w-12 h-12 rounded-lg bg-[#EB966A]/20 flex items-center justify-center">
                <Store className="w-8 h-8 text-[#FFB800]" />
            </div>

            <nav className="flex-1 flex flex-col space-y-4">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeNav === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all cursor-pointer ${isActive
                                ? 'bg-[#FFCA40] text-white'
                                : 'text-[#FFCA40] hover:bg-sidebar-accent/20'
                                }`}
                            title={item.label}
                        >
                            <Icon className="w-6 h-6" />
                        </button>
                    )
                })}
            </nav>

            <button className="w-12 h-12 rounded-lg text-[#FFCA40] hover:bg-destructive/20 hover:text-destructive flex items-center justify-center transition-all cursor-pointer">
                <LogOut className="w-6 h-6" />
            </button>
        </aside>
    )
}