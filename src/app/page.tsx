"use client";
import { pies } from "@/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [item, setItem] = useState(0);
  return (
    <main className="text-white flex h-screen w-screen flex-col items-between justify-between p-24 fixed bg-[#ff6a00]">
      {/*  Description */}

      <section id="description" className="max-w-2xl mx-auto text-center">
        <h1 className="my-5 text-2xl font-bold tracking-widest  ">
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
      <section id="carousel">
        <button className=" absolute bottom-[5rem] h-10 grid place-items-center w-10 bg-[#ffffff52] rounded-full">
          <ChevronLeftIcon width={24} />
        </button>
        <button className="h-10 absolute bottom-[5rem] right-24 grid place-items-center w-10 bg-[#ffffff52] rounded-full">
          <ChevronRightIcon width={24} />
        </button>
        {/* Controls */}
        <div className="relative h-[100vh] w-full flex justify-center">
          <ul className="flex space-x-8">
            {pies.map((pie, i) => {
              return (
                <li
                  key={i}
                  className="top-0 transition-transform origin-bottom"
                >
                  <button className="">{pie.name}</button>
                </li>
              );
            })}
          </ul>

          <div className="absolute -bottom-1/2 border-2 h-[60vw] w-[60vw] flex justify-center rounded-full -translate-y-[50%] before:content-[''] before:absolute before:top-0 before:left-[50%] before:w-4 before:h-4 before:bg-white before:rounded-full before:-translate-y-2">
            <div className="border h-[50vw] w-[50vw]  rounded-full my-16">
              <div className="relative w-full h-[inherit]">
                <Image src={"/pumpkin.png"} alt={pies[item].name} fill />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
