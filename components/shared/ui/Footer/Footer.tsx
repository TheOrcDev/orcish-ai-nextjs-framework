import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="
        md:fixed flex items-center bottom-5 bg-gray-200 pl-2 dark:border-green-200
        left-5 text-xs md:text-sm border-l-2 border-green-800 w-max
        "
    >
      <h2>Made with axe © {year}</h2>
    </footer>
  );
}
