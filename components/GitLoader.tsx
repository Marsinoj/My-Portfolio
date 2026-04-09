"use client";
import { useEffect, useState } from "react";

const commands = [
  "loading mariel@portfolio...",
  "done.",
];

export default function GitLoader({ onFinish }: { onFinish: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [commandIndex, setCommandIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (commandIndex >= commands.length) {
      setTimeout(() => {
        onFinish();
      }, 800);
      return;
    }

    const typingSpeed = 35;

    const timer = setTimeout(() => {
      const currentCommand = commands[commandIndex];

      if (charIndex < currentCommand.length) {
        setCurrentText(currentCommand.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else {
        setLines((prev) => [...prev, currentCommand]);
        setCurrentText("");
        setCharIndex(0);
        setCommandIndex(commandIndex + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, commandIndex, onFinish]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-green-400 font-mono">
      <div className="w-[520px] bg-[#0d1117] p-6 rounded-lg shadow-xl">

        {/* terminal header */}
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"/>
          <div className="w-3 h-3 rounded-full bg-yellow-500"/>
          <div className="w-3 h-3 rounded-full bg-green-500"/>
        </div>

        {/* typed lines */}
        {lines.map((line, i) => (
          <p key={i}>&gt; {line}</p>
        ))}

        {/* current typing */}
        {commandIndex < commands.length && (
          <p>
            &gt; {currentText}
            <span className="animate-pulse">█</span>
          </p>
        )}

      </div>
    </div>
  );
}