import { useAuthActions } from "@/hooks/use-auth-actions";
import { LayoutDashboard, MessageCircle, User, LogOut, ClipboardCheckIcon } from "lucide-react";
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

  return (
    <header className="shadow-md border-b">
      <nav className="p-4 flex gap-4">
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
        <Button onClick={logout} className="ml-auto">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
