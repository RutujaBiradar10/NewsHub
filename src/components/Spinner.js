import React from "react";
import spinnerGif from "./spinner.gif";

export default function Spinner() {
  return (
    <div className="text-center">
      <img src={spinnerGif} alt="loading..." />
    </div>
  );
}