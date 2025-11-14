"use client";

import { useState } from "react";
import Image from "next/image";
import { professionals } from "./Professionals";
import FilterOption from "./FilterOption";
import ProfessionalCard from "./ProfessionalCard";

export default function SearchPage() {
  const [filters, setFilters] = useState({
    category: "",
    budget: "",
    experience: "",
    ratings: "",
    availability: "",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filterOptions = {
    category: ["Carpenter", "Electrician", "Plumber", "Painter"],
    budget: ["Low", "Medium", "High"],
    experience: ["1-2 Years", "3-5 Years", "5+ Years"],
    ratings: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    availability: ["Available Now", "Within a Week"],
  };

  return (
    <main className="flex overflow-hidden flex-col pb-32 bg-white max-md:pb-24">
      <header className="px-8 pt-10 pb-6 bg-[#27aae2] max-md:px-4 max-md:pb-4">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-3xl font-bold text-white text-center">
            Zoek een professional
          </h1>
          <form className="flex items-center mt-5 w-full max-w-lg text-lg font-light text-black text-opacity-60">
            <input
              type="text"
              className="grow px-5 h-12 bg-white rounded-l-lg w-full"
              placeholder="Schilders in België"
              aria-label="Search professionals"
            />
            <button
              type="submit"
              className="flex items-center justify-center h-12 px-5 bg-sky-500 rounded-r-lg"
              aria-label="Search"
            >
              <Image
                src="/icons/search-icon.svg"
                width={24}
                height={24}
                alt="Search icon"
              />
            </button>
          </form>
        </div>
      </header>
      <section className="flex flex-col px-14 mt-6 w-full max-md:px-5 max-md:max-w-full">
      <nav className="flex gap-3 justify-between items-start w-full text-lg text-black whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
  {Object.entries(filterOptions).map(([key, options]) => (
    <FilterOption
      key={key}
      label={key.charAt(0).toUpperCase() + key.slice(1)}
      options={options}
      value={filters[key]}
      onChange={(value) => handleFilterChange(key, value)}
    />
  ))}
</nav>


        <div className="self-center mt-16 w-full max-w-[1304px] max-md:mt-10 max-md:max-w-full">
          <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1">
            {professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
