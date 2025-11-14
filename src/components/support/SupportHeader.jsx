import * as React from "react";

export function SupportHeader() {
  return (
    <div className="bg-sky-600 w-full relative py-11">
      {/* Left Image */}
      <div className="absolute left-0 top-0 flex justify-center h-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b4ee23ec3407ad7e3a0e5e650d592b7b231913922668e309a7b9a0d9fb4538e?placeholderIfAbsent=true&apiKey=5a20dcb57e214d5bafe09a743a89d3f0"
          alt="Support Illustration Left"
          className="h-full max-w-[300px] object-contain"
        />
      </div>

      {/* Right Image */}
      <div className="absolute right-0 top-0 flex justify-center h-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/49867cb11c4f7b696975022d11ea550fe569c5f63c25920dfb1d94bbf25c1633?placeholderIfAbsent=true&apiKey=5a20dcb57e214d5bafe09a743a89d3f0"
          alt="Support Illustration Right"
          className="h-full max-w-[250px] object-contain"
        />
      </div>

      {/* Center Content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-12 text-center text-white">
        <div className="w-full md:w-2/4">
          <h1 className="text-4xl md:text-6xl font-semibold mb-4">Steun</h1>
          <p className="text-lg md:text-2xl font-light">
            Wij zijn er om u te helpen met al uw vragen en zorgen. Hieronder
            vindt u verschillende manieren om ondersteuning te krijgen.
          </p>
        </div>
      </div>
    </div>
  );
}
