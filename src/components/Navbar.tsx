import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section, navItems } from "@/data/content";

interface NavbarProps {
  active: Section;
  onNavigate: (s: Section) => void;
}

export default function Navbar({ active, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40">
      <div className="glass border-b border-white/5 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9b5de5] to-[#4cc9f0] flex items-center justify-center">
              <Icon name="GraduationCap" size={16} className="text-white" />
            </div>
            <span className="font-heading font-black text-lg hidden sm:block">
              Edu<span className="text-gradient-purple">AI</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  active === item.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden glass w-9 h-9 rounded-xl flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-b border-white/5 px-6 py-3 animate-fade-in">
          <div className="flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  active === item.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
