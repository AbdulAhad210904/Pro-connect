import Image from 'next/image';

export default function ProfessionalCard({ professional }) {
  return (
    <div className="flex flex-col px-4 pt-2.5 pb-6 w-full bg-white rounded-xl shadow-[4px_4px_4px_rgba(0,0,0,0.25)] max-md:mt-10">
      <div className="flex gap-5 justify-between items-start text-sm font-light text-black">
        <Image
          src="/icons/favourite-icon.svg"
          width={24}
          height={24}
          className="object-contain shrink-0 aspect-square"
          alt=""
        />
        <div className="flex flex-col items-center mt-4 max-w-full w-[127px]">
          <Image
            src={professional.image}
            width={127}
            height={127}
            className="object-cover rounded-full"
            alt={`Profile picture of ${professional.name}`}
          />
          <h2 className="mt-3 text-xl font-medium">{professional.name}</h2>
          <p className="mt-4 text-base">{professional.profession}</p>
          <p className="mt-4">Locatie: {professional.location}</p>
          <p className="self-stretch mt-1.5">Beoordelingen: {professional.rating}</p>
        </div>
        <div className={`flex shrink-0 mt-1.5 w-3.5 h-3.5 bg-${professional.status}-500 rounded-full`} />
      </div>
      <div className="flex gap-5 self-center mt-8 max-w-full text-xs text-white whitespace-nowrap w-[220px]">
        <button className="px-5 py-2.5 bg-sky-500 rounded-xl max-md:pl-5">
          Weergave
        </button>
        <button className="px-5 py-2.5 rounded-xl max-md:pl-5 bg-black bg-opacity-50">
          Contract
        </button>
      </div>
    </div>
  );
}
