'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Clone, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type Scene = {
  id: string;
  title: string;
  eyebrow?: string;
  detail?: string;
  background: string;
  accent: string;
  bottle: string;
};

const scenes: Scene[] = [
  { id: 'sport', title: 'THE SPORT', eyebrow: 'FOR THE SPORT IN YOU  ·  STAY CHARGED  ·  BE READY TO PLAY', detail: 'A brightening burst of Niacinamide, Alpha Arbutin & Panthenol, touched by the lingering scent of icy mint & citrus.', background: 'radial-gradient(ellipse at 50% 37%, #f8d9d6 0%, #edb0b1 42%, #b66d76 100%)', accent: '#f7b7b5', bottle: '#d89086' },
  { id: 'sport', title: 'EVERY SHOWER', eyebrow: 'SHAPES A NEW YOU.', detail: 'A brightening burst of Niacinamide, Alpha Arbutin & Panthenol, touched by the lingering scent of icy mint & citrus.', background: 'radial-gradient(ellipse at 50% 43%, #d8e0df 0%, #839392 60%, #333d3d 100%)', accent: '#e6eeeb', bottle: '#d8bba6' },
  { id: 'sage', title: 'THE SAGE', eyebrow: 'FOR THE SAGE IN YOU  ·  CALM THE CHAOS  ·  LEAD WITH WISDOM', detail: 'A purifying ritual of Blue Clay & Green Tea, leaving skin clear & balanced with the warm scent of Earthy Oud.', background: 'radial-gradient(ellipse at 50% 38%, #b9c8a9 0%, #80977b 55%, #455b4a 100%)', accent: '#d0ddbd', bottle: '#7f9d77' },
  { id: 'rebel', title: 'THE REBEL', eyebrow: 'FOR THE REBEL IN YOU  ·  RISE UNBOTHERED  ·  EMERGE UNAPOLOGETIC', detail: 'Clarifying actives and gritty exfoliants with Salicylic Acid, wrapped in the smoky scent of Spicy Leather.', background: 'radial-gradient(ellipse at 50% 36%, #ffca79 0%, #dc7743 52%, #713a35 100%)', accent: '#ffbd72', bottle: '#b85736' },
  { id: 'lover', title: 'THE LOVER', eyebrow: 'FOR THE LOVER IN YOU  ·  COMMAND DESIRE  ·  EMERGE IRRESISTIBLE', detail: 'A golden elixir of nourishment and radiance, wrapped in warm Santal, leaving skin soft and luminous.', background: 'radial-gradient(ellipse at 50% 38%, #f5d1cb 0%, #d8979b 54%, #825d68 100%)', accent: '#f5c2bd', bottle: '#d49a99' },
  { id: 'dreamer', title: 'THE DREAMER', eyebrow: 'FOR THE DREAMER IN YOU  ·  WANDER FREELY  ·  WONDER OFTEN', detail: 'A tender infusion of deep hydration and nourishment, wrapped in the signature scent of Bergamot.', background: 'radial-gradient(ellipse at 50% 37%, #f2eee3 0%, #c6d1cf 57%, #667a7c 100%)', accent: '#fff7e8', bottle: '#d9d9c8' },
  { id: 'chooser', title: 'WHO DO YOU WANT TO BE TODAY?', background: 'radial-gradient(ellipse at 50% 40%, #9baeb0 0%, #62777c 58%, #2c3c41 100%)', accent: '#d8e0df', bottle: '#d8ded5' },
];

const cardProducts = [
  { name: 'THE DREAMER', line: 'Hydrating Foam Body Wash', note: 'Mysterious Bergamot · Deep Hydration', price: '₹499', color: '#d9d9c8' },
  { name: 'THE LOVER', line: 'Glow Body Wash', note: 'Sensual Santal · Brightening', price: '₹399', color: '#d49a99' },
  { name: 'THE REBEL', line: 'Exfoliating Body Wash', note: 'Spicy Leather · 2% Salicylic Acid', price: '₹359', color: '#b85736' },
  { name: 'THE SAGE', line: 'Deep Cleansing Body Wash', note: 'Earthy Oud · Blue Clay', price: '₹329', color: '#7f9d77' },
  { name: 'THE SPORT', line: 'Detanning Body Wash', note: 'Sporty Mint · 5% Niacinamide', price: '₹269', color: '#d89086' },
];

const sceneStops = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9];
const blendWidth = 0.025;

function sceneOpacity(index: number, progress: number) {
  if (index > 0) {
    const start = sceneStops[index] - blendWidth / 2;
    const end = sceneStops[index] + blendWidth / 2;
    if (progress < start) return 0;
    if (progress < end) return (progress - start) / blendWidth;
  }
  if (index < scenes.length - 1) {
    const start = sceneStops[index + 1] - blendWidth / 2;
    const end = sceneStops[index + 1] + blendWidth / 2;
    if (progress > end) return 0;
    if (progress > start) return 1 - (progress - start) / blendWidth;
  }
  return 1;
}

function Bottle({ progress, transitionProgress, direction }: { progress: number; transitionProgress: number; direction: 1 | -1 }) {
  const group = useRef<THREE.Group>(null);
  const targetColorRef = useRef(new THREE.Color());
  const { scene } = useGLTF('/models/bottle.glb');
  const colorPalette = useMemo(() => scenes.map((scene) => new THREE.Color(scene.bottle)), []);
  const bottle = useMemo(() => {
    const copy = scene.clone(true);
    const materials: THREE.Material[] = [];
    copy.traverse((node) => {
      if (!(node instanceof THREE.Mesh)) return;
      const cloned = Array.isArray(node.material) ? node.material.map((m) => m.clone()) : node.material.clone();
      node.material = cloned;
      (Array.isArray(cloned) ? cloned : [cloned]).forEach((material) => materials.push(material));
    });
    return { copy, materials };
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    let colorIndex = 0;
    for (let index = 1; index < sceneStops.length; index += 1) {
      if (progress < sceneStops[index]) break;
      colorIndex = index;
    }
    const fromIndex = Math.max(0, Math.min(colorPalette.length - 1, colorIndex));
    const toIndex = Math.min(colorPalette.length - 1, fromIndex + 1);
    const colorStart = sceneStops[fromIndex];
    const colorEnd = sceneStops[toIndex];
    const colorMix = colorEnd > colorStart ? THREE.MathUtils.clamp((progress - colorStart) / (colorEnd - colorStart), 0, 1) : 0;
    const targetColor = targetColorRef.current.copy(colorPalette[fromIndex]).lerp(colorPalette[toIndex], colorMix);
    const colorEase = 1 - Math.exp(-delta * 8);
    bottle.materials.forEach((material) => {
      if ('color' in material && material.color instanceof THREE.Color) material.color.lerp(targetColor, colorEase);
    });
    group.current.rotation.y = transitionProgress * direction * Math.PI * 2;
    group.current.rotation.x = Math.sin(Math.PI * transitionProgress) * 0.035;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(state.clock.elapsedTime * 0.8) * 0.055, 4, delta);
    group.current.scale.setScalar(1 + Math.sin(Math.PI * transitionProgress) * 0.08);
  });

  useEffect(() => () => bottle.materials.forEach((material) => material.dispose()), [bottle]);

  return (
    <group ref={group}>
      <Bounds fit clip observe margin={1.75}>
        <Clone object={bottle.copy} scale={1.7} />
      </Bounds>
    </group>
  );
}

function CodeBackdrop({ scene, progress }: { scene: Scene; progress: number }) {
  const rain = scene.id === 'intro' || scene.id === 'chooser';
  const bath = scene.id === 'sport' || scene.id === 'lover';
  return <div className="absolute inset-0 overflow-hidden" style={{ background: scene.background }}>
    <div className="absolute inset-x-0 top-0 h-[72%] opacity-35" style={{ background: `radial-gradient(ellipse at 50% 18%, ${scene.accent}, transparent 63%)` }} />
    <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: 'linear-gradient(0deg, rgba(23,23,23,.38), transparent)' }} />
    {bath && <>
      <div className="absolute -left-[12%] top-[22%] h-[55%] w-[48%] rounded-[48%] border-[clamp(20px,5vw,76px)] border-white/15 bg-white/10 blur-[1px]" />
      <div className="absolute -right-[9%] top-[30%] h-[48%] w-[42%] rounded-[48%] bg-black/10 blur-xl" />
      <div className="absolute bottom-[14%] left-0 right-0 h-[13%] border-t border-white/20 bg-white/10" />
    </>}
    {scene.id === 'sage' && <>
      <div className="absolute left-[8%] top-[11%] h-[62%] w-[19%] rounded-t-full border border-white/20 bg-black/10" />
      <div className="absolute right-[9%] top-[20%] h-[54%] w-[26%] rounded-t-full border border-white/20 bg-black/10" />
      <div className="absolute bottom-[19%] inset-x-0 h-px bg-white/25" />
    </>}
    {scene.id === 'rebel' && <>
      <div className="absolute right-[8%] top-[12%] h-[42%] w-[32%] rounded-full bg-[#ffd88a]/40 blur-sm" />
      <div className="absolute inset-x-0 bottom-[12%] h-[18%] skew-y-[-4deg] bg-[#572f30]/25" />
    </>}
    {scene.id === 'dreamer' && <>
      <div className="absolute left-[7%] top-[8%] h-[70%] w-[25%] rounded-t-full border-[clamp(8px,1.7vw,24px)] border-white/30 bg-[#506266]/15" />
      <div className="absolute right-[7%] top-[15%] h-[60%] w-[24%] rounded-t-full border-[clamp(8px,1.7vw,24px)] border-white/25 bg-white/10" />
    </>}
    {rain && <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(104deg, transparent 0 19px, rgba(245,250,250,.45) 20px, transparent 21px 47px)', transform: `translateY(${(progress * 110) % 47}px)` }} />}
    <div className="absolute bottom-[9%] left-1/2 h-[5%] w-[32%] -translate-x-1/2 rounded-[50%] bg-black/30 blur-xl" />
  </div>;
}

export default function Task2BottleAnimation() {
  const trackRef = useRef<HTMLElement>(null);
  const lastProgress = useRef(0);
  const backgroundSceneRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(1);
  const [backgroundScene, setBackgroundScene] = useState(0);
  const [previousBackground, setPreviousBackground] = useState<number | null>(null);
  const [backgroundTransitionProgress, setBackgroundTransitionProgress] = useState(1);

  useEffect(() => {
    const globalHeader = document.querySelector<HTMLElement>('body > header');
    const previousDisplay = globalHeader?.style.display;
    if (globalHeader) globalHeader.style.display = 'none';
    let frame = 0;
    let backgroundFrame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const distance = track.offsetHeight - window.innerHeight;
        const nextProgress = distance > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / distance)) : 0;
        if (Math.abs(nextProgress - lastProgress.current) > 0.00001) {
          const direction = nextProgress > lastProgress.current ? 1 : -1;
          setScrollDirection(direction);
          const nextBackgroundScene = sceneStops.reduce((active, stop, index) => nextProgress >= stop ? index : active, 0);
          if (nextBackgroundScene !== backgroundSceneRef.current) {
            setPreviousBackground(backgroundSceneRef.current);
            backgroundSceneRef.current = nextBackgroundScene;
            setBackgroundScene(nextBackgroundScene);
            cancelAnimationFrame(backgroundFrame);
            setBackgroundTransitionProgress(0);
            const startedAt = performance.now();
            const advanceTransition = (time: number) => {
              const linearProgress = THREE.MathUtils.clamp((time - startedAt) / 520, 0, 1);
              setBackgroundTransitionProgress(1 - Math.pow(1 - linearProgress, 3));
              if (linearProgress < 1) backgroundFrame = requestAnimationFrame(advanceTransition);
            };
            backgroundFrame = requestAnimationFrame(advanceTransition);
          }
          lastProgress.current = nextProgress;
        }
        setProgress(nextProgress);
      });
    };
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(backgroundFrame);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      if (globalHeader) globalHeader.style.display = previousDisplay ?? '';
    };
  }, []);

  const skipToChooser = () => {
    const track = trackRef.current;
    if (!track) return;
    window.scrollTo({ top: track.offsetTop + track.offsetHeight - window.innerHeight, behavior: 'smooth' });
  };
  const chooserOpacity = sceneOpacity(scenes.length - 1, progress);
  const bottleOpacity = Math.max(0, 1 - sceneOpacity(scenes.length - 1, progress));

  return <main className="min-h-screen bg-black text-white">
    <section ref={trackRef} className="relative h-[700vh]" aria-label="Flux Theory scroll experience">
      <div className="sticky top-0 h-[100svh] min-h-[540px] overflow-hidden bg-[#101013]">
        {scenes.map((scene, index) => {
          const isCurrent = index === backgroundScene;
          const isPrevious = index === previousBackground;
          const restingTransform = 'translate3d(0, 0, 0) scale(1)';
          const enteringTransform = scrollDirection > 0 ? 'translate3d(100%, 0, 0) scale(1.045)' : 'translate3d(-100%, 0, 0) scale(1.045)';
          const transitionOffset = (1 - backgroundTransitionProgress) * (scrollDirection > 0 ? 100 : -100);
          const transitionScale = 1 + (1 - backgroundTransitionProgress) * 0.045;
          const transform = isCurrent ? `translate3d(${transitionOffset}%, 0, 0) scale(${transitionScale})` : isPrevious ? restingTransform : enteringTransform;
          return <div key={scene.id} className="absolute inset-0" style={{ opacity: isCurrent || isPrevious ? 1 : 0, transform, transformOrigin: 'center', zIndex: isCurrent ? 12 : isPrevious ? 11 : 0, transition: 'none' }} aria-hidden="true"><CodeBackdrop scene={scene} progress={progress} /></div>;
        })}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/10 via-transparent via-[60%] to-black/70" />
        <div className="absolute inset-0 z-[25] transition-opacity duration-200" style={{ opacity: bottleOpacity }}>
          <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.65]} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={1.45} />
            <directionalLight position={[4, 5, 5]} intensity={2.4} />
            <directionalLight position={[-4, 1, -3]} intensity={1.1} color="#ffe5d0" />
            <Suspense fallback={null}>
              <Bottle progress={progress} transitionProgress={backgroundTransitionProgress} direction={scrollDirection} />
            </Suspense>
          </Canvas>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[36%] bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-5 pt-5 sm:hidden">
          <div className="flex h-9 w-9 items-center justify-center border-2 border-white text-[10px] font-black tracking-tight">FT</div>
          <div className="flex gap-2 rounded-sm bg-black/25 px-3 py-2 text-[9px] tracking-[0.16em] text-white/90 backdrop-blur-sm"><span>SHOP</span><span>⌑</span><span>☰</span></div>
        </div>

        {scenes.slice(0, -1).map((scene, index) => {
          const opacity = sceneOpacity(index, progress);
          if (scene.id === 'intro') return <div key={scene.id} className="pointer-events-none absolute inset-x-6 bottom-[17%] z-30 sm:bottom-[18%] sm:left-[2.2vw] sm:right-auto" style={{ opacity, transition: 'opacity 120ms linear' }}><p className="max-w-4xl font-black leading-[0.9] tracking-[-0.04em] text-white [font-family:Impact,'Arial_Narrow',sans-serif] text-[clamp(2.5rem,7.5vw,7.8rem)]">EVERY SHOWER<br />SHAPES A NEW YOU.</p><p className="mt-3 text-[9px] tracking-[0.2em] text-white/75 sm:text-xs">FEEL THE LATHER · EMBRACE YOUR FLUX</p></div>;
          return <div key={scene.id} className="pointer-events-none absolute inset-x-6 bottom-[9%] z-30 flex flex-col gap-3 sm:inset-x-[2.2vw] sm:bottom-[7%] sm:flex-row sm:items-end sm:justify-between sm:gap-8" style={{ opacity, transition: 'opacity 120ms linear' }}><div className="max-w-[70vw] sm:max-w-[58vw]"><p className="font-black leading-[0.88] tracking-[-0.045em] text-white [font-family:Impact,'Arial_Narrow',sans-serif] text-[clamp(2.6rem,7vw,7.4rem)]">{scene.title}</p><p className="mt-2 text-[8px] font-semibold tracking-[0.11em] text-white/90 sm:mt-3 sm:text-[clamp(0.55rem,0.85vw,0.9rem)] sm:tracking-[0.08em]">{scene.eyebrow}</p></div><p className="max-w-[82vw] text-[10px] leading-[1.45] text-white/95 sm:max-w-[23vw] sm:text-[clamp(0.65rem,1vw,1rem)] sm:leading-[1.55]">{scene.detail}</p></div>;
        })}

        {/* <button onClick={skipToChooser} className="absolute bottom-[2.6%] left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-white/15 px-5 py-2.5 text-[9px] font-semibold tracking-wide text-white backdrop-blur-md transition hover:bg-white/25 sm:bottom-[2.8%] sm:px-6 sm:py-3 sm:text-[10px]">SKIP TO BUY PRODUCTS</button> */}
        {/* <div className="pointer-events-none absolute left-1/2 top-[76%] z-30 hidden -translate-x-1/2 sm:block" style={{ opacity: Math.max(0, 1 - progress * 1.6) }}><span className="flex h-10 w-4 items-start justify-center rounded-full border border-white/35 p-1"><span className="h-2 w-1 rounded-full bg-white/80 animate-bounce" /></span></div> */}

        <div className="absolute inset-x-4 top-[28%] z-40 mx-auto max-w-[1500px]" style={{ opacity: chooserOpacity, pointerEvents: chooserOpacity > 0.5 ? 'auto' : 'none', transition: 'opacity 120ms linear' }}>
          <h2 className="mb-3 text-center text-[clamp(1.3rem,3.5vw,3.4rem)] font-black uppercase leading-none tracking-tight text-white sm:mb-6 [font-family:Impact,'Arial_Narrow',sans-serif]">WHO DO YOU WANT TO BE TODAY?</h2>
          <div className="flex snap-x gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0">
            {cardProducts.map((product) => <article key={product.name} className="flex w-[72vw] shrink-0 snap-center flex-col bg-[#8299a2]/90 p-3 text-white shadow-xl backdrop-blur-sm sm:w-auto sm:p-[clamp(0.7rem,1.2vw,1.2rem)]">
              <h3 className="text-center text-[11px] font-black tracking-wide sm:text-[clamp(0.75rem,1.1vw,1.1rem)]">{product.name}</h3>
              <div className="my-2 flex h-[22vw] items-center justify-center sm:h-[clamp(6rem,13vw,13rem)]"><div className="relative h-[88%] w-[24%] min-w-12 rounded-[24%_24%_12%_12%] border border-white/40 shadow-[inset_8px_0_12px_rgba(255,255,255,.24),inset_-9px_0_14px_rgba(0,0,0,.24),0_12px_20px_rgba(0,0,0,.2)]" style={{ background: `linear-gradient(90deg,${product.color},#f5e8d4 44%,${product.color} 72%,#634c47)` }}><div className="absolute -top-[14%] left-[28%] h-[16%] w-[44%] rounded-t-sm bg-[#302c2b]" /><div className="absolute left-[12%] right-[12%] top-[37%] flex h-[34%] flex-col items-center justify-center bg-[#eee6d6] px-0.5 text-center text-[clamp(5px,0.8vw,9px)] font-black leading-tight text-[#302c2b]">FLUX<br /><span className="text-[.75em] font-normal tracking-widest">THEORY</span></div></div></div>
              <p className="line-clamp-2 text-[10px] font-bold leading-tight sm:text-[clamp(0.65rem,0.9vw,0.9rem)]">{product.line}</p><p className="mt-1 line-clamp-2 text-[8px] leading-tight text-white/80 sm:text-[clamp(0.5rem,0.7vw,0.72rem)]">{product.note}</p><div className="mt-auto flex items-end justify-between gap-2 pt-2"><span className="text-[9px] font-semibold sm:text-xs">MRP {product.price}</span><button className="bg-white px-2 py-1.5 text-[8px] font-black text-black sm:px-3 sm:text-[9px]">ADD YOUR VERSION</button></div>
            </article>)}
          </div>
        </div>
      </div>
    </section>
  </main>;
}

useGLTF.preload('/models/bottle.glb');
