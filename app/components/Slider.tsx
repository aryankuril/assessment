"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/anton-ploom.jpg", caption: "Anton Ploom" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/annija-kopstsale.jpg", caption: "Annija Kopshtale" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/daria-elmakova.jpg", caption: "Daria Elmakova" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/margaret-rodchenkova.jpg", caption: "Margaret Rodchenkova" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/marta-ozolina.jpg", caption: "Marta Ozolina" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/victoria-ananyan.jpg", caption: "Victoria Ananyan" },
  { src: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ekaterina-gusarova.jpg", caption: "Ekaterina Gusarova" },
];

export default function Slider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const isManual = useRef(false);
  const isAnimating = useRef(false);

  const [step, setStep] = useState(0);
  const total = images.length;
  const angle = 360 / total;

  const dragWrapperRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const rotationY = useRef(0);
  const rotationX = useRef(0);

  /* ---------- Sizes ---------- */
  const { width, height, z } = useMemo(() => {
    if (typeof window === "undefined") return { width: 300, height: 400, z: 310 };
    const vw = window.innerWidth;
    if (vw < 640) {
      const w = vw * 0.7;
      return { width: w, height: w * 1.33, z: w * 0.85 };
    }
    return { width: 300, height: 400, z: 360 };
  }, []);

  /* ---------- Rotate ---------- */
  const rotateTo = (index: number) => {
    gsap.to(ringRef.current, {
      rotateY: -index * angle,
      duration: 1,
      ease: "power3.inOut",
    });
  };

  /* ---------- SCROLL (FIXED) ---------- */
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollDistance = (total - 1) * 1000; // 🔥 EXACT steps

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: false,

      onUpdate(self) {
        if (isManual.current || isAnimating.current) return;

        const direction = self.direction;
        let nextStep = step;

        if (direction === 1 && step < total - 1) nextStep++;
        if (direction === -1 && step > 0) nextStep--;

        if (nextStep !== step) {
          isAnimating.current = true;
          setStep(nextStep);
          rotateTo(nextStep);

          // 🔥 HARD LOCK scroll to step
          const progress = nextStep / (total - 1);
          self.scroll(self.start + progress * (self.end - self.start));

          gsap.delayedCall(1, () => {
            isAnimating.current = false;
          });
        }
      },
    });

    return () => trigger.kill();
  }, [step, total]);

  /* ---------- Drag ---------- */
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const down = (e: PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      startY.current = e.clientY;
      rotationY.current = gsap.getProperty(ring, "rotateY") as number;
      rotationX.current = gsap.getProperty(ring, "rotateX") as number;
      ring.setPointerCapture(e.pointerId);
    };

    const move = (e: PointerEvent) => {
      if (!isDragging.current) return;
      gsap.set(ring, {
        rotateY: rotationY.current + (e.clientX - startX.current) * 0.35,
        rotateX: rotationX.current - (e.clientY - startY.current) * 0.35,
      });
    };

    const up = () => (isDragging.current = false);

    ring.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    return () => {
      ring.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  /* ---------- Buttons ---------- */
  const next = () => {
    isManual.current = true;
    setStep((p) => {
      const v = Math.min(p + 1, total - 1);
      rotateTo(v);
      return v;
    });
    setTimeout(() => (isManual.current = false), 1000);
  };

  const prev = () => {
    isManual.current = true;
    setStep((p) => {
      const v = Math.max(p - 1, 0);
      rotateTo(v);
      return v;
    });
    setTimeout(() => (isManual.current = false), 1000);
  };

  return (
    <section id="task1" ref={containerRef} className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="flex items-center"> 
        <h1 className="
  text-2xl        /* mobile */
  sm:text-3xl     /* small screens */
  md:text-4xl     /* tablets */
  lg:text-5xl     /* desktop */
  font-bold
  text-center
  py-10
">
  Task 1
</h1>

      </div>
      <div className="relative perspective-distant" style={{ width, height }}>
        <div ref={dragWrapperRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          <div
            ref={ringRef}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d", transform: `translateZ(-${z}px)` }}
          >
            {images.map((img, i) => (
              <figure
                key={i}
                className="absolute left-1/2 top-0 -translate-x-1/2 text-center"
                style={{
                  width,
                  height,
                  transform: `rotateY(${i * angle}deg) translateZ(${z}px)`,
                }}
              >
                <img src={img.src} className="w-full object-cover" style={{ height: height * 0.75 }} />
                <figcaption className="mt-2 text-sm">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-10">
        <button onClick={prev} className="text-4xl">‹</button>
        <button onClick={next} className="text-4xl">›</button>
      </div>
    </section>
  );
}
