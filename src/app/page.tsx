"use client";
import { pies } from "@/data";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

export default function Home() {
  const arcRef = useRef<HTMLDivElement | null>(null);
  const [item, setItem] = useState(0);
  const [arcRadius, setArcRadius] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);

  const pieAngles: [string, number][] = useMemo(() => {
    return pies.map((pie, i) => {
      const angle = (i / pies.length) * 160; // Distribute text evenly around the circle
      return [pie.name, angle];
    });
  }, []);

  const setRadius = useCallback(() => {
    if (arcRef.current) {
      const arcClientRect = arcRef.current.getBoundingClientRect();
      setArcRadius(arcClientRect.width / 2);
    }
  }, [arcRef]);

  const nextItem = () => setItem(item + 1);
  const prevItem = () => setItem(item - 1);

  const selectItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { item } = event.currentTarget.dataset;
    if (item) setItem(+item);
  };

  useEffect(() => {
    const [, angle] = pieAngles[item];
    setRotateAngle(angle);
  }, [item, pieAngles]);

  useEffect(() => {
    setRadius();
    window.addEventListener("resize", setRadius);

    return () => {
      window.removeEventListener("resize", setRadius);
    };
  }, [setRadius]);

  return (
    <main
      style={{ backgroundColor: pies[item].color }}
      className="transition-colors text-white h-screen w-screen"
    >
      {/*  Description */}
      <section id="description" className="pt-8 max-w-2xl mx-auto text-center">
        <h1 className="mb-5 text-2xl font-bold tracking-widest">
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
          <button
            disabled={item === 0}
            onClick={prevItem}
            aria-label="previous pie"
            className="bg-white disabled:opacity-25 disabled:cursor-not-allowed p-6 border-[1px] bg-opacity-20 hover:bg-opacity-40 focus-visible:bg-opacity-50 outline-none active:bg-opacity-60 rounded-full transition-all"
          >
            <ChevronLeftIcon width={24} />
          </button>
          <button
            disabled={item === pies.length - 1}
            onClick={nextItem}
            aria-label="next pie"
            className="bg-white disabled:opacity-25 disabled:cursor-not-allowed p-6 border-[1px] bg-opacity-20 hover:bg-opacity-40 focus-visible:bg-opacity-50 outline-none active:bg-opacity-60 rounded-full transition-all"
          >
            <ChevronRightIcon width={24} />
          </button>
        </div>
        {/* Arc container */}
        <div
          ref={arcRef}
          style={{
            transform: `rotate(${rotateAngle - 68}deg)`
          }}
          className="transition-transform border-2 rounded-full w-3/4 mx-auto aspect-square p-12 relative before:content-[''] before:bg-white before:absolute before:top-0 before:left-1/2 before:-translate-y-1/2 before:w-6 before:h-6 before:rounded-full before:drop-shadow-xl"
        >
          <div className="border-[1px] rounded-full w-full h-full">
            <div className="relative w-full aspect-square">
              <Image src={"/pumpkin.png"} alt={pies[item].name} fill />
            </div>
          </div>
        </div>
        <ul className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-4 z-10 -rotate-[68deg]">
          {pieAngles.map(([pie, angle], i) => (
            <li
              key={i}
              className="absolute"
              style={{
                transform: `rotate(${angle}deg) translateY(-${
                  arcRadius + 50
                }px)`
              }}
            >
              <button
                className={`text-gray-100 ${
                  item === i
                    ? "text-opacity-100 hover:text-opacity-100"
                    : "text-opacity-50 hover:text-opacity-70"
                }`}
                data-item={i}
                onClick={selectItem}
              >
                {pie}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
