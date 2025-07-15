function MockupCard({
  title,
  mockupSrc,
  imageSrc,
}: {
  title: string;
  mockupSrc: string;
  imageSrc: string;
}) {
  const isMug = title.toLowerCase() === "mug";
  const isHoodie = title.toLowerCase() === "hoodie";

  // Define print area size per product
  const printSize = isMug
    ? "w-[40%] h-[40%]"
    : isHoodie
    ? "w-[50%] h-[60%]"
    : "w-[50%] h-[50%]"; // T-shirt default

  const aspect = isMug ? "aspect-square" : "aspect-[3/4]";

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-black font-semibold mb-2">{title}</h3>
      <div className={`relative w-full ${aspect} bg-gray-100 rounded overflow-hidden`}>
        {/* Mockup image */}
        <img
          src={mockupSrc}
          alt={`${title} Mockup`}
          className="absolute top-0 left-0 w-full h-full object-contain opacity-60"
        />

        {/* Print area */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className={`relative ${printSize}`}>
            <img
              src={imageSrc}
              alt={`Design on ${title}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}