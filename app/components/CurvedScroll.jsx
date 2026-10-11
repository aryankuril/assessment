"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Model = dynamic(() => import("./Model"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  {
    number: "01",
    title: "Web Development & UI UX",
    image: "/images/3.avif",
    link: "/services/website-development",
  },
  {
    number: "02",
    title: "Design & Branding",
    image: "/images/8.avif",
    link: "/services/design-branding",
  },
  {
    number: "03",
    title: "SEO",
    image: "/images/6.avif",
    link: "/services/seo-services",
  },
  {
    number: "04",
    title: "GEO",
    image: "/images/7.avif",
    link: "/services/geo-services",
  },
  {
    number: "05",
    title: "Performance Marketing",
    image: "/images/3.avif",
    link: "/services/performance-marketing",
  },
  {
    number: "06",
    title: "Social Media Management",
    image: "/images/5.png",
    link: "/services/social-media-marketing",
  },
];

const CurvedScroll = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray(".curved-scroll-box");

      boxes.forEach((box, index) => {
        const isLeft = index % 2 === 0;

        ScrollTrigger.create({
          trigger: box,
          start: "top bottom",
          end: "bottom top",

          onUpdate: (self) => {
            const isMobile = window.innerWidth < 768;

            const radius = isMobile
              ? window.innerWidth * 0.03
              : window.innerWidth * 0.2;

            const progress = self.progress;
            const theta = progress * Math.PI;
            const xOffset = Math.sin(theta) * radius;

            const finalX = isLeft ? -xOffset : xOffset;

            gsap.set(box, {
              x: finalX,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="second-section"
      className="container relative w-full overflow-clip py-10 sm:py-15 lg:py-0 "
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <Model />
        </div>
      </div>

<div className="relative z-10 hidden h-screen w-full items-center justify-center md:flex">

<div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-1/2
    z-10
    -translate-x-1/2
    -translate-y-1/2
    whitespace-nowrap
    text-center
    text-[18vw]
   
    font-normal
    leading-[0.8]
    tracking-[-0.02em]
    text-black
    md:text-[16vw]
    lg:text-[15vw]
  "
    style={{
    fontFamily: "var(--font-regular-miso)",
  }}

>
  Our Services
</div>

</div>

<h2 className="black-text text-center text-3xl font-bold tracking-tight sm:text-4xl md:hidden  ">
 Our Services
</h2>


      <div className="h-[100px] w-full "></div>

      <div className="relative z-10 flex w-full flex-col items-center gap-[10vh] md:gap-[10vh] lg:mb-0 mb-20 ">
        {cardsData.map((card, index) => {
          const isLeft = index % 2 === 0;

          return (
           <Link
  key={card.number}
  href={card.link}
  className={`curved-scroll-box relative block h-[72vw] w-[58vw] transform-gpu rounded-[24px] shadow-xl backface-hidden md:h-[22vw] md:w-[22vw] ${
    isLeft
      ? "ml-[4vw] self-start md:ml-0 md:mr-[25vw] md:self-auto"
      : "mr-[4vw] self-end md:mr-0 md:ml-[25vw] md:self-auto"
  }`}
>
  <div className="relative h-full w-full overflow-hidden rounded-[24px] md:rounded-[2vw]">
    <Image
      src={card.image}
      alt={card.title}
      fill
      sizes="(max-width: 767px) 58vw, 22vw"
      className="object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
  </div>

  {/* TITLE BELOW IMAGE */}
  <div className="pt-3 md:pt-2">
   <h5 className="inline-block rounded-full bg-black px-4 py-1 text-sm font-medium text-white md:px-5 md:py-1.5 md:text-base">
  {card.title}
</h5>
  </div>
</Link>
          );
        })}
      </div>

      <div className="h-[50px] w-full"></div>
    </section>
  );
};

export default CurvedScroll;