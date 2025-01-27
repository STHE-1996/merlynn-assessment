import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="gap-2"
    >
      {theme === "light" ? (
        <>
          <span>🌙</span> Dark Mode
        </>
      ) : (
        <>
          <span>☀️</span> Light Mode
        </>
      )}
    </Button>
  );
};
