"use client";
import * as React from "react";
import { Button } from "../components/Registration2/Button";
import { SearchBar } from "../components/HomePage/Searchbar";
import Link from "next/link";
import Testimonials from "@/components/testimonials";
import { UserContext } from "@/app/layout";
import { useContext } from "react";

export default function HomePage() {
  const {
    isLoggedIn,
    firstName,
    profilePicture,
    userType,
    subscriptionExpired,
    subscriptionExist,
  } = useContext(UserContext);
  console.log(
    isLoggedIn,
    firstName,
    profilePicture,
    userType,
    subscriptionExpired,
    subscriptionExist
  );
  const handleSearch = (value: string) => {
    console.log("Search value:", value);
  };

  return (
    <main className="flex flex-col rounded-none">
      <header className="relative flex flex-col px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-24 sm:pb-32 lg:pb-36 w-full bg-[#1c97cc] overflow-hidden">
        {/* Absolute Circle */}
        <div className="hidden md:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1250px] max-h-[1250px] rounded-full bg-black/10 z-0" />

        <section className="relative z-10 self-center mt-3 mb-0 w-full max-w-[1173px]">
          <div className="flex flex-col lg:flex-row gap-5">
            <article className="flex flex-col w-full lg:w-[64%]">
              <div className="flex flex-col items-start self-stretch my-auto w-full text-white">
                <h1 className="self-stretch text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
                  Find the Best Professionals for All Your Tasks
                </h1>
                <SearchBar
                  placeholder="What do you need?"
                  onSearch={handleSearch}
                  isLoggedIn={isLoggedIn}
                />

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-8 lg:mt-11 w-full sm:w-auto">
                  {(!isLoggedIn || userType === undefined) && (
                    <>
                      <Link href="/postaproject">
                        <Button variant="primary" className="w-full sm:w-auto">
                          Post a Project
                        </Button>
                      </Link>
                      <Link href="/becomecontractor">
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto"
                        >
                          Become a Contractor
                        </Button>
                      </Link>
                    </>
                  )}

                  {isLoggedIn && userType === "individual" && (
                    <Link href="/postproject">
                      <Button variant="primary" className="w-full sm:w-auto">
                        Post a Project
                      </Button>
                    </Link>
                  )}

                  {isLoggedIn &&
                    subscriptionExist == true &&
                    userType === "craftsman" && (
                      <Link href="/projects">
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto"
                        >
                          See Projects
                        </Button>
                      </Link>
                    )}
                  {isLoggedIn &&
                    subscriptionExist == false &&
                    userType === "craftsman" && (
                      <>
                        <Link href="/projects">
                          <Button
                            variant="secondary"
                            className="w-full sm:w-auto"
                          >
                            See Projects
                          </Button>
                        </Link>

                        <Link href="/becomecontractor">
                          <Button
                            variant="secondary"
                            className="w-full sm:w-auto"
                          >
                            Become a Contractor
                          </Button>
                        </Link>
                      </>
                    )}
                </div>
              </div>
            </article>
            <aside className="hidden lg:flex flex-col ml-5 w-[36%]">
              <div className="relative flex flex-col grow justify-center px-8 py-20 aspect-[0.788]">
                <img
                  loading="lazy"
                  src="./worker.png"
                  alt=""
                  className="object-cover absolute inset-0 size-full z-10"
                />
                <div className="relative hidden lg:flex shrink-0 rounded-full aspect-square bg-black bg-opacity-10 h-[299px] z-0" />
              </div>
            </aside>
          </div>
        </section>
      </header>

      {/* Welcome Section */}
      <section className="relative h-auto sm:h-[380px] md:h-[500px] bg-white text-center py-12 sm:py-16">
        {/* Blue Decorative Borders */}
        <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 md:h-8 bg-[#27aae2] rounded-tl-[25px] sm:rounded-tl-[50px] rounded-tr-[25px] sm:rounded-tr-[50px]" />
        <div className="absolute bottom-0 left-0 h-[50%] sm:h-[60%] md:h-[70%] w-4 sm:w-8 md:w-16 bg-[#27aae2] rounded-tr-[25px] sm:rounded-tr-[50px] overflow-hidden">
          <div className="absolute top-[-50px] sm:top-[-75px] md:top-[-100px] left-0 w-4 sm:w-8 md:w-16 h-[100%] bg-black bg-opacity-10 rounded-tr-[76px] sm:rounded-tr-[153px] rounded-br-[275%] sm:rounded-br-[550%]"></div>
        </div>
        <div className="absolute bottom-0 right-0 h-[50%] sm:h-[60%] md:h-[70%] w-4 sm:w-8 md:w-16 bg-[#27aae2] rounded-tl-[25px] sm:rounded-tl-[50px]" />

        {/* Content */}
        <div className="relative max-w-[90%] sm:max-w-[85%] md:max-w-[79%] mx-auto px-4 top-[25px] sm:top-[40px] md:top-[80px]">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Welcome <span className="text-[#27aae2]">to ProConnect</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 md:mb-8">
            Your all-in-one solution for connecting talent and opportunities.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm md:text-lg font-extrabold">
            <span className="italic">
              <span className="text-[#27aae2]">&ldquo;</span>ProConnect is a
              comprehensive platform designed to meet all your professional
              needs in one place. Whether you&apos;re a company looking for top
              talent, an individual seeking your next big opportunity, or a
              professional looking for projects, ProConnect has everything you
              need.<span className="text-[#27aae2]">&rdquo;</span>
            </span>
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4">
            HOW IT <span className="text-[#27aae2]">WORKS</span>
          </h2>
          <p className="text-center text-gray-600 text-base sm:text-lg mb-8 sm:mb-16">
            Seize opportunities with simple steps
          </p>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="relative flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-12">
              {/* Connector images */}
              <img
                src="/connector-up.png"
                alt="Left Connector"
                className="hidden xl:block absolute top-[50%] left-[23.75%] transform -translate-y-1/2 z-10"
                style={{ width: "60px", height: "auto" }}
              />
              <img
                src="/connector-up.png"
                alt="Right Connector"
                className="hidden xl:block absolute top-[50%] right-[13%] transform -translate-y-1/2 z-10"
                style={{ width: "60px", height: "auto" }}
              />
              <img
                src="/connector-up.png"
                alt="Mid Connector"
                className="hidden xl:block absolute top-[50%] right-[42%] transform -translate-y-1/2 scale-y-[-1] z-10"
                style={{ width: "60px", height: "auto" }}
              />

              {/* Information Boxes */}
              {[
                {
                  number: 1,
                  title: "For Private Individuals",
                  description:
                    "Easily post your projects and find Craftsmen to complete them",
                  position: "up",
                },
                {
                  number: 2,
                  title: "For Craftsmen",
                  description:
                    "Browse and find projects that match your skills and interests",
                  position: "down",
                },
                {
                  number: 3,
                  title: "For companies",
                  description:
                    "Easily post vacancies and find the perfect candidates for your company",
                  position: "up",
                },
                {
                  number: 4,
                  title: "For job seekers",
                  description:
                    "Browse vacancies tailored to your skills and interests",
                  position: "down",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex-1 relative bg-[#FCFCFC] p-4 sm:p-6 rounded-lg min-w-[270px] w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-auto max-w-[600px] z-0 mb-12 sm:mb-16 ${
                    item.position === "down"
                      ? "xl:mt-16 xl:mb-0"
                      : "xl:mb-16 xl:mt-0"
                  }`}
                >
                  <span className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-[#27aae2] text-3xl sm:text-4xl font-bold">
                    {item.number}.
                  </span>
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <Link href={"/aboutus"}>
              <h2 className="flex justify-center mt-8 sm:mt-12 lg:mt-20 text-[#27aae2] font-extrabold text-lg sm:text-xl">
                View Details
              </h2>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#27aae2] py-16 sm:py-24 lg:py-32 xl:py-40 px-4 relative overflow-hidden">
        <div className="hidden xl:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1250px] max-h-[1250px] rounded-full bg-black/10 z-0" />
        <div className="hidden xl:flex absolute right-[-30%] bottom-[-155%] w-[80vw] h-[80vw] max-w-[1250px] max-h-[1250px] rounded-full bg-black/10 z-0" />

        <div className="relative z-10 mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 sm:mb-8 lg:mb-12">
            Become a member of ProConnect today.
          </h2>

          <Link href="/auth/login">
            <button className="bg-white text-[#27aae2] px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-100 transition-colors">
              Register now.
            </button>
          </Link>
        </div>
      </section>
      {/*Review Card Components */}
      <Testimonials></Testimonials>
    </main>
  );
}
