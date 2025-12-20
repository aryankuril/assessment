"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const images = [
  {
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/anton-ploom.jpg",
    caption: "Clean view",
  },
  {
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/annija-kopstsale.jpg",
    caption: "Studio Shot",
  },
  {
    src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/daria-elmakova.jpg",
    caption: "Creative Light",
  },
]

export default function HoverCard() {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mobileStep2Done, setMobileStep2Done] = useState(false)

  /* ----------------------------------
     Detect Mobile
  ---------------------------------- */
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  /* ----------------------------------
     Initial Card Setup
  ---------------------------------- */
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.set(card, {
        x: 0,
        y: -i * 50,
        z: -i * 70,
        scale: 1 - i * 0.02,
        rotateY: 0,
        transformOrigin: "center center",
      })

      const label = card.querySelector(".card-label")
      if (label) gsap.set(label, { opacity: 0, y: 0 })
    })
  }, [])

  /* ----------------------------------
     STEP 2 – Mobile Auto Trigger (1s)
  ---------------------------------- */
  useEffect(() => {
    if (!isMobile || mobileStep2Done) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            onOuterEnter()
            setMobileStep2Done(true)
          }, 1000)
        }
      },
      { threshold: 0.4 }
    )

    if (outerRef.current) observer.observe(outerRef.current)
    return () => observer.disconnect()
  }, [isMobile, mobileStep2Done])

  /* ----------------------------------
     STEP 2 – Desktop Hover
  ---------------------------------- */
const onOuterEnter = () => {
  cardsRef.current.forEach((card, i) => {
   if (isMobile) {
  const total = cardsRef.current.length
  const centerIndex = (total - 1) / 2

  gsap.to(card, {
    x: (i - centerIndex) * 75 - 5, // keep same positioning
    y: i * 8,

    // 👇 THIS IS THE REAL FIX (tilt)
    rotateY: -50,                  // tilt cards towards LEFT
    rotateZ: (i - centerIndex) * 10, // slight fan angle

    scale: 1,
    transformPerspective: 1000,    // important for real 3D feel
    boxShadow: "0px 25px 60px rgba(0,0,0,0.3)",
    duration: 0.8,
    ease: "power3.out",
  })
}
else {
      // 🖥 DESKTOP (unchanged)
      gsap.to(card, {
        x: i * 180,
        y: 0,
        z: 0,
        rotateY: -40,
        boxShadow: "0px 40px 80px rgba(0,0,0,0.45)",
        duration: 0.9,
        ease: "power3.out",
      })
    }
  })
}



  const onOuterLeave = () => {
    if (isMobile) return

    cardsRef.current.forEach((card, i) => {
      gsap.to(card, {
        x: 0,
        y: -i * 50,
        z: -i * 70,
        scale: 1 - i * 0.02,
        rotateY: 0,
        boxShadow: "0px 25px 60px rgba(0,0,0,0.25)",
        duration: 0.9,
        ease: "power3.out",
      })

      const label = card.querySelector(".card-label")
      if (label) gsap.set(label, { opacity: 0, y: 0 })
    })
  }

  /* ----------------------------------
     STEP 3 – Card Interaction
  ---------------------------------- */
const activateCard = (i: number) => {
  cardsRef.current.forEach((card, idx) => {
    const label = card.querySelector(".card-label")

    if (idx === i) {
      gsap.to(card, {
        y: isMobile ? -100 : -30,
        // scale: isMobile ? 1.15 : 1, // 👈 stronger mobile scale
        zIndex: 50,
        duration: 0.35,
        ease: "power3.out",
      })

      if (label) {
        gsap.to(label, {
          y: -10,
          opacity: 1,
          duration: 0.3,
        })
      }
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        zIndex: 10,
        duration: 0.35,
        ease: "power3.out",
      })

      if (label) {
        gsap.to(label, {
          y: 0,
          opacity: 0,
          duration: 0.25,
        })
      }
    }
  })
}


  return (
    <section id="task2" className="min-h-screen w-full flex flex-col items-center justify-center bg-white ">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center pb-30">
        Task 2
      </h1>

      {/* OUTER CONTAINER */}
      <div
        ref={outerRef}
        onMouseEnter={!isMobile ? onOuterEnter : undefined}
        onMouseLeave={!isMobile ? onOuterLeave : undefined}
        className="relative w-full max-w-[420px] md:max-w-[800px] h-[200px] md:h-[300px] flex items-center justify-center"
      >
        {/* CARD STACK */}
        <div className="relative w-[280px] sm:w-[320px] h-full preserve-3d">
          {images.map((img, i) => (
            <div
              key={i}
             ref={(el) => {
  if (!el) return
  cardsRef.current[i] = el
}}

              onMouseEnter={!isMobile ? () => activateCard(i) : undefined}
              onMouseLeave={!isMobile ? () => activateCard(-1) : undefined}
              onClick={isMobile ? () => activateCard(i) : undefined}
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl cursor-pointer preserve-3d"
              style={{ zIndex: images.length - i }}
            >
              <img
                src={img.src}
                alt={img.caption}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="card-label absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-1 rounded-full opacity-0">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
