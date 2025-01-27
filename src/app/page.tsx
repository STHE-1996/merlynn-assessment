"use client"; // Since you're using client-side features

import { ThemeProvider } from "../lib/theme-context"; // Import your ThemeProvider
import DrinkRecommended from "./drink-recommended/page";
import NavBar from "./navBar/page";
import Recommendation from "./recommendation/page";
import { useRouter } from "next/router";

export default function Home() {
  // const { pathname } = useRouter(); 
  return (
    <ThemeProvider> {/* Wrap your components with the ThemeProvider */}
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <header>
          <NavBar />
        </header>
        <main className="p-4">
          {/* Conditionally render based on the path */}
         
           <DrinkRecommended />
        </main>
      </div>
    </ThemeProvider>
  );
}
