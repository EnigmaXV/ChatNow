import React from "react";
import { useThemeStore } from "../store/useThemeStore";
const ThemeController = () => {
  const { setTheme, currentTheme } = useThemeStore();
  console.log("Current theme:", currentTheme);
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-sm m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
      >
        {["black", "night", "cyberpunk", "lofi", "halloween", "synthwave"].map(
          (theme) => (
            <li key={theme}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label={theme}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ThemeController;
