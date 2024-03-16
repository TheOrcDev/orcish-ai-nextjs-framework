import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="
        bottom-5 left-5 flex w-max items-center border-l-2 border-green-800
        bg-gray-200 pl-2 text-xs dark:bg-gray-800 md:fixed md:text-sm
        "
    >
      <h2>Made with axe © {year}</h2>
    </footer>
  );
}
