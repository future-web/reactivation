import React from "react";

export const HouseIcon = ({ className, ...etc }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    {...etc}
  >
    <path d="M21 13v10h-6v-6H9v6H3V13H0L12 1l12 12h-3z" />
  </svg>
);
