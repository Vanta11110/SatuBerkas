// Buat file baru, misalnya Options.js
import React from "react";

const RTOptions = () => {
  const rtOptions = Array.from({ length: 59 }, (_, index) => ({
    value: (index + 1).toString().padStart(2, "0"),
    label: `RT ${index + 1}`,
  }));

  return rtOptions;
};

export default RTOptions;
