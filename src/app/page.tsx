"use client";
import { pies } from "@/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const [item, setItem] = useState(0);
  const arcRef = useRef<HTMLDivElement | null>(null);
  const [arcRadius, setArcRadius] = useState(0);

  useLayoutEffect(() => {
    if (arcRef.current) {
      const arcClientRect = arcRef.current.getBoundingClientRect();
      setArcRadius(arcClientRect.width / 2);
    }
  }, [arcRef]);

  return (
    <main className="text-white h-screen w-screen bg-[#ff6a00]">
      {/*  Description */}
      <section id="description" className="pt-8 max-w-2xl mx-auto text-center">
        <h1 className="mb-5 text-2xl font-bold tracking-widest  ">
          {pies[item].name}
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
          neque ipsam aperiam, rem corporis officiis quam, iusto unde, voluptate
          ipsum consequatur tenetur at eum facere. Incidunt eaque dignissimos
          voluptatum tenetur ducimus! Modi impedit quae hic doloribus, libero
          harum corrupti, earum ipsam dolore perferendis ipsum, quas
          accusantium. Molestiae exercitationem mollitia corporis?
        </p>
      </section>
      {/* Carousel */}
      <section
        id="carousel"
        className="fixed top-full h-fit w-[90vw] left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="sr-only">List of pies</h2>
        <div className="controls absolute bottom-1/2 w-full flex justify-between -translate-y-1/2">
          <button className="bg-white p-6 border-[1px] bg-opacity-20 hover:bg-opacity-40 focus-visible:bg-opacity-50 outline-none active:bg-opacity-60 rounded-full transition-all">
            <ChevronLeftIcon width={24} />
          </button>
          <button className="bg-white p-6 border-[1px] bg-opacity-20 hover:bg-opacity-40 focus-visible:bg-opacity-50 outline-none active:bg-opacity-60 rounded-full transition-all">
            <ChevronRightIcon width={24} />
          </button>
        </div>
        {/* Arc container */}
        <div
          ref={arcRef}
          className="border-2 rounded-full w-3/4 mx-auto aspect-square p-12 relative before:content-[''] before:bg-white before:absolute before:top-0 before:left-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:rounded-full before:shadow-lg before:shadow-orange-400"
        >
          <div className="border-[1px] border-orange-100 rounded-full w-full h-full">
            <div className="relative w-full aspect-square">
              <Image src={"/pumpkin.png"} alt={pies[item].name} fill />
            </div>
          </div>
        </div>
        <ul className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 -rotate-[75deg]">
          {pies.map((pie, i) => {
            const angle = (i / pies.length) * 150; // Distribute text evenly around the circle

            console.log(pie, i, angle);

            return (
              <li
                key={i}
                style={{
                  transform: `rotate(${angle}deg) translateY(-${arcRadius}px)`
                }}
              >
                <button className="text-gray-100 text-opacity-50">
                  {pie.name}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
