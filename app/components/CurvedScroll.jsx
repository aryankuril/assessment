"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
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
      {/* Background 3D model - unchanged */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <Model />
        </div>
      </div>

     {/* =========================
    FIRST SERVICES SCREEN
    ========================= */}
{/* =========================
    DESKTOP SERVICES SCREEN
    ========================= */}
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


      {/* Existing spacing before cards */}
      <div className="h-[100px] w-full "></div>

      {/* =========================
          SERVICE CARDS
          ========================= */}
      <div className="relative z-10 flex w-full flex-col items-center gap-[10vh] md:gap-[10vh] lg:mb-0 mb-20 ">
        {cardsData.map((card, index) => {
          const isLeft = index % 2 === 0;

          return (
           <Link
  key={index}
  href={card.link}
  className={`curved-scroll-box relative block h-[72vw] w-[58vw] transform-gpu rounded-[24px] shadow-xl backface-hidden md:h-[22vw] md:w-[22vw] ${
    isLeft
      ? "ml-[4vw] self-start md:ml-0 md:mr-[25vw] md:self-auto"
      : "mr-[4vw] self-end md:mr-0 md:ml-[25vw] md:self-auto"
  }`}
>
  <div className="relative h-full w-full overflow-hidden rounded-[24px] md:rounded-[2vw]">
    <img
      src={card.image}
      alt={card.title}
      className="h-full w-full object-cover"
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









































































































// "use client";

// import React, { useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import dynamic from "next/dynamic";
// import Link from "next/link";

// const Model = dynamic(() => import("./Model"), { ssr: false });

// gsap.registerPlugin(ScrollTrigger);

// const cardsData = [
//   {
//     number: "01",
//     title: "Web Development & UI UX",
//     image: "/images/webdev/SuperSoxnew.jpg",
//     link: "/services/website-development",
//   },
//   {
//     number: "02",
//     title: "Design & Branding",
//     image: "/images/branding-cs/barnd3.jpg",
//     link: "/services/design-branding",
//   },
//   {
//     number: "03",
//     title: "SEO",
//     image: "/images/seo-cs/manbaaa.png",
//     link: "/services/seo-services",
//   },
//   {
//     number: "04",
//     title: "GEO",
//     image: "/images/geo-cs/geo-1.jpg",
//     link: "/services/geo-services",
//   },
//   {
//     number: "05",
//     title: "Performance Marketing",
//     image: "/images/pm/Chatterboxnew2.jpg",
//     link: "/services/performance-marketing",
//   },
//   {
//     number: "06",
//     title: "Social Media Management",
//     image: "/images/sm/Manba.jpg",
//     link: "/services/social-media-marketing",
//   },
// ];

// const CurvedScroll = () => {
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const boxes = gsap.utils.toArray(".curved-scroll-box");

//       boxes.forEach((box, index) => {
//         const isLeft = index % 2 === 0;

//         ScrollTrigger.create({
//           trigger: box,
//           start: "top bottom",
//           end: "bottom top",

//           onUpdate: (self) => {
//             const isMobile = window.innerWidth < 768;

//             const radius = isMobile
//               ? window.innerWidth * 0.03
//               : window.innerWidth * 0.2;

//             const progress = self.progress;
//             const theta = progress * Math.PI;
//             const xOffset = Math.sin(theta) * radius;

//             const finalX = isLeft ? -xOffset : xOffset;

//             gsap.set(box, {
//               x: finalX,
//             });
//           },
//         });
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       id="second-section"
//       className="container relative w-full overflow-clip py-10 sm:py-15 lg:py-0 "
//     >
//       {/* Background 3D model - unchanged */}
//       <div className="pointer-events-none absolute inset-0 z-0">
//         <div className="sticky top-0 flex h-screen w-full items-center justify-center">
//           <Model />
//         </div>
//       </div>

//      {/* =========================
//     FIRST SERVICES SCREEN
//     ========================= */}
// <div className="relative z-10 hidden h-screen w-full items-center justify-center md:flex">

//   {/* OUR - LEFT */}
//  {/* OUR - TOP LEFT */}
// <div
//   className="
//     pointer-events-none
//     absolute
//     left-[4vw]
//     top-[12vh]
//     z-10
//     text-[12vw]
//     font-medium
//     leading-none
//     tracking-[-0.06em]
//     text-black
//     sm:text-[11vw]
//     md:left-[5vw]
//     md:top-[8vh]
//     md:text-[9vw]
//     lg:text-[8vw]
//   "
// >
//   Our
// </div>

// {/* SERVICES - BOTTOM RIGHT */}
// <div
//   className="
//     pointer-events-none
//     absolute
//     right-[3vw]
//     bottom-[10vh]
//     z-10
//     text-[12vw]
//     font-medium
//     leading-none
//     tracking-[-0.06em]
//     text-black
//     sm:text-[11vw]
//     md:right-[4vw]
//     md:bottom-[8vh]
//     md:text-[9vw]
//     lg:text-[8vw]
//   "
// >
//   Services
// </div>

//   {/* CENTER CONTENT */}
//   <div className="flex flex-col items-center justify-center text-center">

//     {/* Top outlined pill */}
//     <div
//       className="
//         rounded-full
//         border
//         border-black
//         px-4
//         py-1
//         text-[13px]
//         font-medium
//         leading-none
//         tracking-tight
//         sm:px-5
//         sm:py-1.5
//         sm:text-base
//         md:px-6
//         md:py-1.5
//         md:text-lg
//       "
//     >
//       WE SOLVE FOR CLARITY NOT JUST LOOKS
//     </div>

//     {/* Bottom black pill */}
//     <div
//       className="
//         mt-2
//         rounded-full
//         bg-black
//         px-5
//         py-1.5
//         text-[13px]
//         font-medium
//         leading-none
//         tracking-tight
//         text-white
//         sm:px-6
//         sm:py-2
//         sm:text-base
//         md:px-7
//         md:py-2
//         md:text-lg
//       "
//     >
//       TURNING INSIGHT INTO INTENT
//     </div>

//   </div>
// </div>

// <h2 className="black-text text-center text-3xl font-bold tracking-tight sm:text-4xl md:hidden  ">
//  Our Services
// </h2>


//       {/* Existing spacing before cards */}
//       <div className="h-[100px] w-full "></div>

//       {/* =========================
//           SERVICE CARDS
//           ========================= */}
//       <div className="relative z-10 flex w-full flex-col items-center gap-[10vh] md:gap-[10vh] lg:mb-0 mb-20 ">
//         {cardsData.map((card, index) => {
//           const isLeft = index % 2 === 0;

//           return (
//            <Link
//   key={index}
//   href={card.link}
//   className={`curved-scroll-box relative block h-[72vw] w-[58vw] transform-gpu rounded-[24px] shadow-xl backface-hidden md:h-[22vw] md:w-[22vw] ${
//     isLeft
//       ? "ml-[4vw] self-start md:ml-0 md:mr-[25vw] md:self-auto"
//       : "mr-[4vw] self-end md:mr-0 md:ml-[25vw] md:self-auto"
//   }`}
// >
//   <div className="relative h-full w-full overflow-hidden rounded-[24px] md:rounded-[2vw]">
//     <img
//       src={card.image}
//       alt={card.title}
//       className="h-full w-full object-cover"
//     />

//     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
//   </div>

//   {/* TITLE BELOW IMAGE */}
//   <div className="pt-3 md:pt-2">
//    <h5 className="inline-block rounded-full bg-black px-4 py-1 text-sm font-medium text-white md:px-5 md:py-1.5 md:text-base">
//   {card.title}
// </h5>
//   </div>
// </Link>
//           );
//         })}
//       </div>

//       <div className="h-[50px] w-full"></div>
//     </section>
//   );
// };

// export default CurvedScroll;