export default function HomeFoodCard({ imageUrl, name, rating }) {
  return (
    <div className="mb-4">
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={imageUrl}
          alt="image"
          className="max-w-full max-h-full object-cover rounded-3xl"
        />
      </div>
      <p className="text-lg sm:text-xl font-bold mt-4">{name}</p>
      <p className="text-xs sm:text-base text-yellow-700 font-semibold">
        Rated {rating}
      </p>
    </div>
  );
}
