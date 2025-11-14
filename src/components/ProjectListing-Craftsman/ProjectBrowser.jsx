"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "./ProjectCard";
import { fetchCraftsmanViewProjects } from "@/store/posted-projects/projectThunk";
import { Loader, LayoutGrid, List, Search } from "lucide-react";

export function ProjectBrowser() {
  const dispatch = useDispatch();
  const { craftsmanProjects, loading, error } = useSelector((state) => state.projects);
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    budget: "",
    date: "",
    search: searchParams.get("search") || "", // Prepopulate with the query param
  });

  useEffect(() => {
    dispatch(fetchCraftsmanViewProjects(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange("search", filters.search);
  };

  const filteredProjects = useMemo(() => {
    return craftsmanProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.category || project.category.toLowerCase() === filters.category.toLowerCase();

      const matchesLocation =
        !filters.location ||
        project.location.country.toLowerCase() === filters.location.toLowerCase();

      const matchesBudget =
        !filters.budget ||
        (() => {
          const [min, max] = filters.budget.split("-").map(Number);
          if (max) {
            return project.budget.min >= min && project.budget.min <= max;
          } else {
            return project.budget.min >= min;
          }
        })();

      const matchesDate =
        !filters.date || new Date(project.deadline) >= new Date(filters.date);

      return matchesSearch && matchesCategory && matchesLocation && matchesBudget && matchesDate;
    });
  }, [craftsmanProjects, filters]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-sky-100 to-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ontdek de Beste Projecten in{" "}
            <span className="text-[#27aae2]">België</span> &{" "}
            <span className="text-[#27aae2]">Nederland</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Vind de perfecte projecten die aansluiten bij jouw expertise en ambities. Maak deel uit van de toekomst van de bouw in de Benelux.
          </p>
        </div>
      </div>

      {/* Search Bar and Filters Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto mb-8">
          {/* Search Bar */}
          <div className="mb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Zoek projecten op titel, locatie of vaardigheden..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </form>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-between items-center w-full text-sm font-light">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
            >
              <option value="">Alle Projecten</option>
              <option value="electrical">Elektrisch</option>
              <option value="plumbing">Sanitair</option>
              <option value="construction">Bouw</option>
              <option value="painting">Schilderen</option>
              <option value="gardening">Tuinieren</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
            >
              <option value="">Locatie</option>
              <option value="Belgium">België</option>
              <option value="Netherlands">Nederland</option>
            </select>

            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange("budget", e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
            >
              <option value="">Budget</option>
              <option value="0-1000">€0 - €1.000</option>
              <option value="1000-5000">€1.000 - €5.000</option>
              <option value="5000+">€5.000+</option>
            </select>

            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#27aae2] focus:border-transparent"
            />

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#27aae2] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#27aae2] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin" size={48} color="#27aae2" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredProjects.length === 0 ? (
              <div className="col-span-full text-center text-lg font-medium text-gray-500 py-12">
                Geen projecten gevonden.
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} viewMode={viewMode} />
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}
