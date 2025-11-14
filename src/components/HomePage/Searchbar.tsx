"use client";
import * as React from "react";
import { SearchBarProps } from "../Registration2/types";

interface Props extends SearchBarProps {
  isLoggedIn: boolean; // Add a prop for the login status
}

export const SearchBar: React.FC<Props> = ({
  placeholder,
  isLoggedIn,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      window.location.href = "/auth/login"; // Redirect to login if not logged in
      return;
    }

    const query = searchQuery.toLowerCase();

    // Redirect logic based on search query
    switch (query) {
      case "community":
        window.location.href = "/community";
        break;
      case "profile":
        window.location.href = "/profile";
        break;
      case "settings":
        window.location.href = "/profile/settings";
        break;
      case "feedback":
        window.location.href = "/feedback";
        break;
      case "dashboard":
        window.location.href = "/dashboard/craftsman";
        break;
      default:
        // Redirect to /projects with the search query as a parameter
        window.location.href = `/projects?search=${encodeURIComponent(
          searchQuery
        )}`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap mt-11 max-w-full w-[532px] max-md:mt-10"
    >
      <div className="flex flex-auto gap-10 items-start py-5 pr-2.5 pl-7 bg-white rounded-l-xl max-md:pl-5 max-md:max-w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 text-base font-light text-black text-opacity-60 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label={placeholder}
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/09717da70990c5dee9eb713ffd55175c90efbaacbe1fb412248ae6f2a21e3ab1?placeholderIfAbsent=true&apiKey=3571c69db7f0406cb802591ff07de113"
          alt=""
          className="object-contain shrink-0 w-6 aspect-square"
        />
      </div>
      <button
        type="submit"
        className="flex shrink-0 h-16 bg-sky-500 rounded-r-xl w-[74px] items-center justify-center"
        aria-label="Search"
      >
        <img src="/icons/search-white.png" alt="Search" className="h-6 w-6" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};
