import Link from "next/link";

import { ThemeToggleButton } from "../ThemeToggleButton/page";
import { ThemeProvider } from "@/lib/theme-context";

const NavBar = () => {
  return (
    <ThemeProvider> {/* Wrap the nav with ThemeProvider */}
      <nav className="w-full bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <div className="text-lg font-bold">MyApp</div>
          <div className="flex items-center gap-4">
            <Link href="/drink-recommended" className="hover:underline">Drink Recommended</Link>
            <Link href="/batch-page" className="hover:underline">Batch Page</Link>
            <Link href="/recommendation" className="hover:underline">Recommendation</Link>
            <ThemeToggleButton />
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default NavBar;
