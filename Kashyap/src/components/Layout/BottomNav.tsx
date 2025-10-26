import { Home, Calendar, MapPin, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { icon: Home, labelKey: "nav.home", path: "/home" },
  { icon: Calendar, labelKey: "nav.bookings", path: "/bookings" },
  { icon: MapPin, labelKey: "nav.track", path: "/track" },
  { icon: MessageCircle, labelKey: "nav.support", path: "/support" },
  { icon: User, labelKey: "nav.profile", path: "/profile" },
];

const BottomNav = () => {
  const { t } = useLanguage();
  
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-card border-t border-border elevated-shadow z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
