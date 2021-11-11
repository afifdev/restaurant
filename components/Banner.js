export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-center md:text-left font-bold text-3xl md:text-7xl lg:text-8xl">
        The Ne🍒 Neighbour
        <br />
        On the block
      </p>
      <div className="grid grid-cols-2 grid-rows-2 gap-1 md:gap-4 rounded-[64px] overflow-hidden my-8 w-full md:w-96 md:h-96 flex-shrink-0">
        <div
          className="aspect-w-1 aspect-h-1 rounded-br-3xl"
          style={{
            backgroundImage: "url('/images/1.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="aspect-w-1 aspect-h-1 rounded-bl-3xl"
          style={{
            backgroundImage: "url('/images/2.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        ></div>
        <div
          className="aspect-w-1 aspect-h-1 rounded-tr-3xl"
          style={{
            backgroundImage: "url('/images/3.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        ></div>
        <div
          className="aspect-w-1 aspect-h-1 rounded-tl-3xl"
          style={{
            backgroundImage: "url('/images/4.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>
    </div>
  );
}
