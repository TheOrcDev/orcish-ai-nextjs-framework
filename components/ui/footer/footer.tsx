import React from "react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="
        bottom-5 left-5 flex w-max items-center border-l-2 border-green-800
        bg-green-200 pl-2 text-xs dark:bg-green-950 md:fixed md:text-sm
        "
    >
      <p>Made with axe © {year}</p>
    </footer>
  );
}
