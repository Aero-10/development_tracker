import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Subjects", path: "/subjects" },
  { label: "Placement", path: "/placement" },
  { label: "Tasks", path: "/tasks" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#0F172A] border-r border-white/10 px-6 py-8">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white mb-10">
        Dev<span className="text-primary">Track</span>
      </h1>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-medium transition
               ${
                 isActive
                   ? "bg-primary/20 text-primary"
                   : "text-gray-400 hover:bg-white/5 hover:text-white"
               }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
