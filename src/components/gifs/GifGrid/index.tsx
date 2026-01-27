import GifCard from '../GifCard';

export default function GifGrid({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {data.map(gif => (
        <GifCard key={gif.id} gif={gif} />
      ))}
    </div>
  );
}
