"use client";

interface FilterPanelProps {
  genre: string;
  onGenreChange: (genre: string) => void;
  minPrice: string;
  maxPrice: string;
  onPriceChange: (min: string, max: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterPanel({
  genre,
  onGenreChange,
  minPrice,
  maxPrice,
  onPriceChange,
  sortBy,
  onSortChange
}: FilterPanelProps) {
  const genres = ["All", "Electronic", "Hip-Hop", "Pop", "Rock", "Jazz", "Classical", "Ambient"];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-zinc-300 mb-3">Genre</h3>
        <div className="space-y-2">
          {genres.map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="genre"
                checked={genre === g}
                onChange={() => onGenreChange(g)}
                className="w-4 h-4 text-[#00CED1] focus:ring-[#00CED1]"
              />
              <span className="text-zinc-400 hover:text-white">{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-zinc-300 mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onPriceChange(e.target.value, maxPrice)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:border-[#00CED1] focus:outline-none"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white text-sm focus:border-[#00CED1] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-zinc-300 mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:border-[#00CED1] focus:outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
}
