'use client';

const SearchInput = ({ value, onChange, }: { value: string; onChange: (v: string) => void; }) => {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search GIF..."
      className="w-full border rounded px-4 py-2 text-lg"
    />
  );
}

export default SearchInput;
