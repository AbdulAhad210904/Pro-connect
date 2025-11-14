import React from "react";

export default function SectionTitle({ regular, highlighted }) {
  return (
    <h2 className="text-4xl md:text-5xl font-semibold text-center">
      <span className="text-neutral-800">{regular}</span>{" "}
      <span className="text-sky-500">{highlighted}</span>
    </h2>
  );
}

