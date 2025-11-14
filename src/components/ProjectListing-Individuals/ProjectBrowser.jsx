import Image from "next/image";
import { ProjectCard } from "./ProjectCard";

export function ProjectBrowser() {
  const projects = Array(4).fill(null);

  return (
    <main className="flex overflow-hidden flex-col items-center bg-white">
      <header className="relative flex flex-col items-center self-stretch pb-8 w-full text-white bg-[#27aae2] overflow-hidden max-md:max-w-full">
  {/* Background circles */}
  <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1250px] max-h-[1250px] rounded-full bg-black/10 z-0" />
  <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1250px] max-h-[1250px] rounded-full bg-black/10 z-0" />

  {/* Content */}
  <div className="relative z-10 w-full">
    <h2 className="mt-12 text-2xl font-semibold text-center max-md:mt-6 max-md:max-w-full">
      Blader door beschikbare projecten
    </h2>
    <p className="mt-4 text-base font-light text-center max-md:max-w-full">
      Vind de juiste projecten en begin vandaag nog met werken.
    </p>

    {/* Search bar */}
    <form className="flex justify-center mt-8 max-w-full w-[400px] mx-auto max-md:mt-6">
      <label htmlFor="searchProjects" className="sr-only">
        Zoek projecten
      </label>
      <input
        type="search"
        id="searchProjects"
        placeholder="Zoek projecten..."
        className="grow px-4 py-2 bg-white rounded-l-lg w-fit max-md:px-3 max-md:max-w-full text-sm font-light text-black text-opacity-60"
      />
      <button
        type="submit"
        className="flex shrink-0 h-10 bg-sky-500 rounded-r-lg w-[50px]"
        aria-label="Search"
      >
        <Image
          src="/icons/search-icon.svg"
          width={20}
          height={20}
          alt=""
          className="m-auto"
        />
      </button>
    </form>

    {/* Filters */}
    <div className="flex flex-wrap gap-3 justify-between mt-8 w-full text-sm font-light whitespace-nowrap max-w-[900px] mx-auto max-md:mt-6 max-md:max-w-full">
      {["Categorie", "Plaats", "Budget", "Nieuw"].map((label) => (
        <button
          key={label}
          className="flex gap-2 py-1 px-3 rounded-md border border-white border-solid"
        >
          <span>{label}</span>
          <Image
            src="/icons/dropdown-icon.svg"
            width={20}
            height={20}
            alt=""
          />
        </button>
      ))}
      <button className="flex gap-2 py-1 px-3 rounded-md border border-white border-solid">
        <span>dd/mm/jjjj</span>
        <Image
          src="/icons/calendar-icon.svg"
          width={20}
          height={20}
          alt=""
        />
      </button>
    </div>
  </div>
</header>


      <button className="px-6 py-2 mt-16 max-w-full text-base text-center text-white bg-sky-500 rounded-lg w-[200px] max-md:px-4 max-md:mt-8">
        Post your project
      </button>
      <section className="mt-32 mb-10 w-full max-w-[1261px] max-md:mt-10 max-md:mb-6 max-md:max-w-full">
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
          {projects.map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
