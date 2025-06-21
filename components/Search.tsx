'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchButton = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex items-center gap-2 border border-white/30 rounded-full px-3 py-1">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent outline-none text-white placeholder-white/50 text-sm w-full"
      />
      <button onClick={handleSearch} className="group hover:text-orange-400 transition">
        <Search className="w-5 h-5 text-white group-hover:text-orange-400" />
      </button>
    </div>
  );
};

export default SearchButton;
