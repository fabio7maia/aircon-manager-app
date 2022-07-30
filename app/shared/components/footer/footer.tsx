import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="p-4 footer footer-center bg-accent text-base-content text-xl">
      {children}
    </footer>
  );
};
