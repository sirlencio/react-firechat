import { useState } from "react";
import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  LayoutDashboard,
  MessageCircle,
  User,
  LogOut,
  ClipboardCheckIcon,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Task", href: "/admin/task", icon: ClipboardCheckIcon },
];

const Navbar = () => {
  const { logout } = useAuthActions();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileNav = () => setMobileOpen(!mobileOpen);

  return (
    <header className="relative z-50 shadow-md sm:border-b">
      <nav className="p-4 flex items-center justify-between">
        {/* Botón hamburguesa móvil */}
        <div className="sm:hidden">
          <Button onClick={toggleMobileNav}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Menú escritorio */}
        <div className="items-center flex-1 flex">
          <div className="hidden sm:flex gap-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "text-gray-700 hover:text-blue-800 flex items-center gap-2",
                    isActive ? "text-blue-800 font-semibold" : "text-gray-700"
                  )
                }
                end
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
          </div>
          <Button onClick={logout} className="ml-auto">
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </nav>

      {/* Drawer móvil */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <Button onClick={toggleMobileNav}>
            <X />
          </Button>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "text-gray-700 hover:text-blue-800 flex items-center gap-2 p-2 rounded",
                  isActive ? "text-blue-800 font-semibold" : ""
                )
              }
              end
              onClick={() => setMobileOpen(false)} // cerrar al seleccionar
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Overlay oscuro cuando el menú está abierto */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
