import Link from 'next/link'
import { Button } from '../components/Registration2/Button';

export default function NotFound() {
  return (
    <header className="relative flex flex-col px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-24 sm:pb-32 lg:pb-36 w-full bg-[#1c97cc] overflow-hidden">
        {/* Absolute Circle */}
        <div className="hidden md:flex absolute left-0 top-[27%] -translate-y-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[1250px] max-h-[1250px] rounded-full bg-black/10 z-0" />

        <section className="relative z-10 self-center mt-3 mb-0 w-full max-w-[1173px]">
          <div className="flex flex-col lg:flex-row gap-5">
            <article className="flex flex-col w-full lg:w-[64%]">
              <div className="flex flex-col items-start self-stretch my-auto w-full text-white">
                <h1 className="self-stretch text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
                  404 Page Not Found
                </h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-8 lg:mt-11 w-full sm:w-auto">
                    <Link href="/">
                  <Button variant="primary" className="w-full sm:w-auto">Return to Home</Button>
                  </Link>
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
   
  )
}