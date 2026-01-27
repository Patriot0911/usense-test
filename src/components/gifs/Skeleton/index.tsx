const Skeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-48 rounded bg-gray-300 animate-pulse"
        />
      ))}
    </div>
  );
}

export default Skeleton;
