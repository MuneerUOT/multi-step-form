import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { setTheme, theme } = useTheme();
  return (
    <React.Fragment>
      <Outlet />
      <div className="right-5 bottom-5 fixed">
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          size="icon"
          className="bg-foreground rounded-full text-background"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </React.Fragment>
  );
}
