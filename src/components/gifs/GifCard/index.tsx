import Image from 'next/image';

const GifCard = ({ gif }: { gif: any }) => {
  return (
    <div className="rounded overflow-hidden shadow hover:scale-105 transition">
      <Image
        src={gif.images.fixed_width.url}
        alt={gif.title}
        width={200}
        height={200}
        loading="lazy"
      />
    </div>
  );
}

export default GifCard;
