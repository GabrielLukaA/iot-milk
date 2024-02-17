"use client";

import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col w-scereen h-screen justify-center items-center">
      <h1 className="font-bold text-[36px]">{count}</h1>
      <div className="flex gap-6">
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="b-2 border-emerald-800 rounded-lg w-[200px]"
        >
          Increment
        </button>
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="b-2 border-emerald-800 rounded-lg w-[200px]"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
