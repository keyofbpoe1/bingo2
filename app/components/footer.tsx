'use client';

import React from "react";
import Share from "./share";

export default function Footer({ className }: { className?: string }) {
  const [showShareModal, setShowShareModal] = React.useState(false);

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
    <div className="flex justify-center">
      <p>&copy; {new Date().getFullYear()} Fallacy Bingo</p>
      <span className="mx-2">|</span>
      <button
        className="text-white"
        onClick={handleShareClick}
      >
        Share
      </button>
    </div>
    {showShareModal && <Share onClose={() => setShowShareModal(false)} />}
  </footer>
  );
} 
