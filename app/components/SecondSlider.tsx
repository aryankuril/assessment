'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
{ src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/anton-ploom.jpg", caption: "Anton" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/annija-kopstsale.jpg", caption: "Annija" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/daria-elmakova.jpg", caption: "Daria" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/margaret-rodchenkova.jpg", caption: "Margaret" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/marta-ozolina.jpg", caption: "Marta" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/victoria-ananyan.jpg", caption: "Victoria" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ekaterina-gusarova.jpg", caption: "Ekaterina" },
  
]

export default function Scroll3DRotation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (!ringRef.current || !containerRef.current) return

  const panels = gsap.utils.toArray<HTMLDivElement>('.panel')

  const mm = gsap.matchMedia()

  mm.add(
    {
      isMobile: '(max-width: 640px)',
      isDesktop: '(min-width: 641px)',
    },
    (context) => {
      const { isMobile } = context.conditions as {
        isMobile: boolean
        isDesktop: boolean
      }

      const total = panels.length
      const angle = 360 / total

      // 🔥 DIFFERENT VALUES
      const radius = isMobile ? 170 : 320
      const scaleX = isMobile ? 1.37 : 1.19

      panels.forEach((panel, i) => {
        gsap.set(panel, {
          rotateY: i * angle,
          translateZ: radius,
          transformOrigin: `50% 50% ${-radius}px`,
          scaleX,
           backfaceVisibility: 'visible',
        })
      })

      gsap.to(ringRef.current, {
        rotateY: -360,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2500',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      return () => ScrollTrigger.killAll()
    }
  )

  return () => mm.revert()
}, [])



useEffect(() => {
  const ring = ringRef.current
  if (!ring) return

  let isDragging = false
  let startX = 0
  let startY = 0
  let baseRotateY = 0
  let baseRotateX = 0

  const onPointerDown = (e: PointerEvent) => {
    isDragging = true
    startX = e.clientX
    startY = e.clientY

    baseRotateY = gsap.getProperty(ring, 'rotateY') as number
    baseRotateX = gsap.getProperty(ring, 'rotateX') as number

    ring.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return

    gsap.set(ring, {
      rotateY: baseRotateY + (e.clientX - startX) * 0.3,
      rotateX: baseRotateX - (e.clientY - startY) * 0.25,
    })
  }

  const resetTilt = () => {
    if (!isDragging) return
    isDragging = false

    gsap.to(ring, {
      rotateX: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  ring.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', resetTilt)
  window.addEventListener('pointercancel', resetTilt)

  return () => {
    ring.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', resetTilt)
    window.removeEventListener('pointercancel', resetTilt)
  }
}, [])



  return (
    <section
  ref={containerRef}
  className="relative h-screen w-full bg-white overflow-hidden flex items-center justify-center"
>
  {/* 🔥 Heading */}

        
  <h1 className="
    absolute
    top-20
    left-1/2
    -translate-x-1/2
    text-black
     text-2xl        /* mobile */
  sm:text-3xl     /* small screens */
  md:text-4xl     /* tablets */
  lg:text-5xl     /* desktop */
    font-bold
    z-20

  ">
    Task1
  </h1>
        
      <div className="relative w-[120px] h-[180px] sm:w-[260px] sm:h-[280px] perspective-[1500px]">
        <motion.div
          ref={ringRef}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            touchAction: 'none',
          }}
        >
          {images.map((img, i) => (
            <div className="panel absolute inset-0  flex flex-col">
  <img
    src={img.src}
    alt=""
    className="h-full w-full object-cover"
    draggable={false}
  />

  {/* 🔥 Caption below card */}
  <div className="bg-transparent text-black text-xs  text-center ">
    {img.caption}
  </div>
</div>

          ))}
        </motion.div>
      </div>
    </section>
  )
}
