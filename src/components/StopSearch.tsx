"use client";

import { useState, useRef, useEffect } from "react";

import { stops } from "@/data/stops";

interface StopSearchProps {
  placeholder?: string;
  onSelect: (stopId: string) => void;
  value?: string;
}

const allStops = Object.values(stops);

export function StopSearch({
  placeholder = "Search for a stop...",
  onSelect,
  value,
}: StopSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve the selected stop name for display
  const selectedStopName = value ? stops[value]?.name : undefined;

  // Filter stops based on query
  const filtered = query
    ? allStops.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : allStops;

  const suggestions = filtered.slice(0, 10);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target: Node | null = e.target instanceof Node ? e.target : null;
      if (containerRef.current && target && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(stopId: string) {
    setQuery("");
    setIsOpen(false);
    onSelect(stopId);
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={selectedStopName ?? placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
      />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          {suggestions.map((stop) => (
            <li key={stop.id}>
              <button
                type="button"
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                onClick={() => handleSelect(stop.id)}
              >
                {stop.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
