import { HomeIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Discover from "./pages/Discover.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Discover",
    to: "/discover",
    icon: null,
    page: <Discover />,
  },
];
