'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type MarkKind = 'cursor' | 'heart' | 'chart' | 'spark' | 'bolt';

const marks: { kind: MarkKind; color: string; shape: string; label: string }[] = [
  { kind: 'cursor', color: '#ee2782', shape: 'rounded', label: 'Cursor' },
  { kind: 'heart', color: '#bcff39', shape: 'rounded', label: 'Heart' },
  { kind: 'chart', color: '#1749f5', shape: 'circle', label: 'Growth chart' },
  { kind: 'spark', color: '#e25a13', shape: 'rounded', label: 'Brand spark' },
  { kind: 'bolt', color: '#ed202b', shape: 'circle', label: 'Lightning bolt' },
];

function MarkIcon({ kind, className = '' }: { kind: MarkKind; className?: string }) {
  if (kind === 'cursor') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="M22 11 77 55 53 59 68 84 55 91 40 65 25 83Z" fill="#13002d" stroke="#13002d" strokeLinejoin="round" strokeWidth="5" /></svg>;
  if (kind === 'heart') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 83 16 51C-5 26 20 5 39 21l11 11 11-11c19-16 44 5 23 30Z" fill="#13002d" /></svg>;
  if (kind === 'chart') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><rect x="18" y="54" width="18" height="34" rx="6" fill="#13002d"/><rect x="43" y="34" width="18" height="54" rx="6" fill="#13002d"/><rect x="68" y="15" width="18" height="73" rx="6" fill="#13002d"/></svg>;
  if (kind === 'spark') return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="m9 27 24 4 17-20 17 20 24-4-8 26 8 23-27-2-14 17-15-17-27 2 8-23Z" fill="#13002d" /></svg>;
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="m59 5-38 52h25l-6 38 40-57H54Z" fill="#13002d" /></svg>;
}

function BrandMark({ kind, compact = false }: { kind: MarkKind; compact?: boolean }) {
  const mark = marks.find((item) => item.kind === kind)!;
  return <span
    className={`task3-mark ${mark.shape === 'circle' ? 'is-circle' : 'is-rounded'} ${compact ? 'is-compact' : ''}`}
    data-kind={kind}
    style={{ backgroundColor: mark.color, opacity: compact ? 0 : 1 }}
    role="img"
    aria-label={mark.label}
  ><MarkIcon kind={kind} /></span>;
}

export default function Task3CrencyAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const contextNoteRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const markRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || !statementRef.current) return;
    const section = sectionRef.current;
    const statement = statementRef.current;
    const ctx = gsap.context(() => {
      const floatingMarks = markRefs.current.filter((element): element is HTMLDivElement => Boolean(element));
      const leftPhrases = statement.querySelectorAll('.task3-phrase-left');
      const rightPhrases = statement.querySelectorAll('.task3-phrase-right');
      const inlineMarks = statement.querySelectorAll('.task3-mark');
      const stageBounds = section.getBoundingClientRect();
      const parkedMarks = floatingMarks.map((mark) => {
        const inlineMark = statement.querySelector<HTMLElement>(`.task3-mark[data-kind="${mark.dataset.kind}"]`);
        const inlineBounds = inlineMark?.getBoundingClientRect();
        const markWidth = mark.offsetWidth;
        const markHeight = mark.offsetHeight;
        return {
          x: inlineBounds && markWidth ? inlineBounds.left + inlineBounds.width / 2 - stageBounds.left - mark.offsetLeft - markWidth / 2 : 0,
          y: inlineBounds && markHeight ? inlineBounds.top + inlineBounds.height / 2 - stageBounds.top - mark.offsetTop - markHeight / 2 : 0,
          scale: inlineBounds && markWidth ? inlineBounds.width / markWidth : 0.34,
        };
      });

      gsap.set(headlineRef.current, { transformOrigin: '50% 45%' });
      gsap.set(contextNoteRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(statementRef.current, { autoAlpha: 0, y: 36, scale: 0.96, transformOrigin: '50% 50%' });
      gsap.set(leftPhrases, { autoAlpha: 0, x: () => -window.innerWidth * 0.14 });
      gsap.set(rightPhrases, { autoAlpha: 0, x: () => window.innerWidth * 0.14 });
      gsap.set(inlineMarks, { opacity: 0 });
      gsap.set(floatingMarks, { autoAlpha: 0, y: 110, scale: 0.58, rotation: -14, transformOrigin: '50% 50%' });
      gsap.set(pointerRef.current, { autoAlpha: 0, x: 80, y: 90, rotation: -10 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 4.2, 2400)}`,
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(floatingMarks, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        stagger: { each: 0.035, from: 'center' },
        ease: 'power3.out',
        duration: 0.18,
      }, 0.05);
      timeline.to(floatingMarks, {
        x: (index) => ((38 + index * 6) - (20 + index * 12.5)) * window.innerWidth / 100,
        y: () => -window.innerHeight * 0.23,
        scale: 0.44,
        rotation: 0,
        ease: 'power3.inOut',
        stagger: 0.025,
        duration: 0.22,
      }, 0.23);
      timeline.to(floatingMarks, {
        x: (index) => parkedMarks[index].x,
        y: (index) => parkedMarks[index].y,
        scale: (index) => parkedMarks[index].scale,
        rotation: 0,
        ease: 'power3.inOut',
        stagger: 0.018,
        duration: 0.22,
      }, 0.48);
      timeline.to(eyebrowRef.current, { autoAlpha: 0, y: -12, ease: 'power2.out', duration: 0.15 }, 0.64);
      timeline.to(headlineRef.current, { yPercent: -20, scale: 0.86, autoAlpha: 0, ease: 'power2.inOut', duration: 0.22 }, 0.64);
      timeline.to(contextNoteRef.current, { autoAlpha: 0, y: -18, ease: 'power2.out', duration: 0.18 }, 0.64);
      timeline.to(statementRef.current, { autoAlpha: 1, y: 0, scale: 1, ease: 'power3.out', duration: 0.24 }, 0.7);
      leftPhrases.forEach((phrase, index) => {
        timeline.to(phrase, { autoAlpha: 1, x: 0, ease: 'power3.out', duration: 0.24 }, 0.72 + index * 0.105);
      });
      rightPhrases.forEach((phrase, index) => {
        const row = [0, 1, 3][index];
        timeline.to(phrase, { autoAlpha: 1, x: 0, ease: 'power3.out', duration: 0.24 }, 0.72 + row * 0.105);
      });
      timeline.to(pointerRef.current, { autoAlpha: 1, x: 0, y: 0, rotation: 0, ease: 'power3.out', duration: 0.2 }, 0.7);
      timeline.to(pointerRef.current, { x: () => window.innerWidth * 0.11, y: () => -window.innerHeight * 0.12, ease: 'sine.inOut', duration: 0.32 }, 0.9);
      timeline.to(statementRef.current, { scale: 1.025, ease: 'sine.inOut', duration: 0.3 }, 0.93);
    }, section);

    return () => ctx.revert();
  }, []);

  return <section ref={sectionRef} className="task3-stage">
    <div className="task3-top-wave" aria-hidden="true"><svg viewBox="0 0 1440 280" preserveAspectRatio="none"><path d="M0 0h1440v148c-173-4-335 30-493 70-103 27-178 58-270 57-164-2-283-91-421-115C164 146 73 145 0 161Z" fill="currentColor" /></svg></div>
    {/* <p ref={eyebrowRef} className="task3-eyebrow">ABOUT US</p> */}

    <div ref={headlineRef} className="task3-headline" aria-label="We craft brands and digital products that scale">
      {/* <p>WE CRAFT <span className="task3-custom-e">BR</span>ANDS AND DIGITAL</p>
      <p className="task3-headline-second">PRODUCTS THAT <span className="task3-scale">SCALE</span></p> */}
     </div>

      {/* <div ref={contextNoteRef} className="task3-context-note">
        <strong>Clean in form. Sharp in function.</strong>
        <span>Across our client projects: retention up 42%, bounce down 67%, and launches shipped 4× faster.</span>
      </div> */}

      <div ref={statementRef} className="task3-statement" aria-label="We build brands people love and websites that win clients. Clean in form. Sharp in function.">
      <div className="task3-statement-line"><span className="task3-phrase-left">We Build brands</span><BrandMark kind="spark" compact /><span className="task3-phrase-right">people love</span></div>
      <div className="task3-statement-line"><span className="task3-phrase-left">and websites</span><BrandMark kind="heart" compact /><span className="task3-phrase-right">that win clients.</span></div>
      <div className="task3-statement-line"><span className="task3-phrase-left">Clean in form.</span><BrandMark kind="bolt" compact /></div>
      <div className="task3-statement-line"><span className="task3-phrase-left">Sharp in</span><BrandMark kind="cursor" compact /><BrandMark kind="chart" compact /><span className="task3-phrase-right">function.</span></div>
    </div>

    <div className="task3-floating-field" aria-hidden="true">
      {marks.map((mark, index) => <div
        key={mark.kind}
        ref={(element) => { markRefs.current[index] = element; }}
        className={`task3-floating-mark ${mark.shape === 'circle' ? 'is-circle' : 'is-rounded'}`}
        data-kind={mark.kind}
        style={{ left: `${20 + index * 12.5}%`, top: '71%', backgroundColor: mark.color }}
      ><MarkIcon kind={mark.kind} /></div>)}
    </div>

    {/* <div ref={pointerRef} className="task3-you-pointer" aria-hidden="true">
      <svg viewBox="0 0 48 54"><path d="M3 2 43 30 25 33 35 48 27 53 17 36 7 48Z" fill="#bcff39" stroke="#13002d" strokeWidth="2.5" strokeLinejoin="round" /></svg>
      <span>You</span>
    </div> */}

    <div className="task3-dock" aria-label="Site navigation preview">
      <span className="task3-dock-option"><i />Open: <b>Menu</b></span>
      <span className="task3-dock-cta">get my website</span>
      <span className="task3-dock-option"><i />View: <b>Cases</b></span>
    </div>

    <style jsx global>{`
      .task3-stage{--ink:#13002d;--paper:#d5c2f2;position:relative;isolation:isolate;width:100%;height:100svh;min-height:620px;overflow:hidden;background:var(--paper);color:var(--ink);margin-top:-94px;padding-top:94px;font-family:Arial,Helvetica,sans-serif}
      .task3-top-wave{position:absolute;z-index:-1;inset:0 0 auto;height:31%;color:var(--ink);pointer-events:none}.task3-top-wave svg{display:block;width:100%;height:100%}
      .task3-eyebrow{position:absolute;left:2.5vw;top:15.5%;margin:0;font-size:clamp(9px,.68vw,13px);font-weight:700;letter-spacing:.06em;text-transform:uppercase}
      .task3-headline{position:absolute;left:2.4vw;right:2.4vw;top:27%;font-family:Impact,'Arial Narrow',sans-serif;font-size:clamp(48px,8.25vw,158px);font-weight:900;line-height:.88;letter-spacing:-.028em;text-transform:uppercase;will-change:transform,opacity}
      .task3-headline p{margin:0;white-space:nowrap}.task3-headline-second{text-align:right}.task3-custom-e{letter-spacing:-.095em}.task3-scale{font-family:Arial,Helvetica,sans-serif;font-weight:400;letter-spacing:-.09em;font-style:italic}
      .task3-context-note{position:absolute;left:33.4%;top:65%;display:flex;width:min(28vw,440px);flex-direction:column;gap:12px;font-size:clamp(13px,1.02vw,20px);line-height:1.35;will-change:transform,opacity}.task3-context-note strong{font-size:1.05em}.task3-context-note span{color:rgba(19,0,45,.62)}
      .task3-statement{position:absolute;left:50%;top:34%;width:min(90vw,1180px);transform:translateX(-50%);font-size:clamp(27px,4.45vw,76px);font-weight:750;line-height:1.04;letter-spacing:-.055em;text-align:center;will-change:transform,opacity}
      .task3-statement-line{display:flex;min-height:1.04em;align-items:center;justify-content:center;gap:.13em;white-space:nowrap}.task3-phrase-left,.task3-phrase-right{display:inline-block;will-change:transform,opacity}.task3-mark{display:inline-flex;flex:none;width:1em;height:1em;align-items:center;justify-content:center;border:2px solid var(--ink);box-shadow:0 1px 0 var(--ink);vertical-align:middle}.task3-mark.is-rounded{border-radius:.14em}.task3-mark.is-circle{border-radius:50%}.task3-mark svg{width:74%;height:74%}.task3-mark.is-compact{width:.83em;height:.83em;border-width:1.5px}.task3-mark.is-compact svg{width:72%;height:72%}
      .task3-floating-field{position:absolute;inset:0;pointer-events:none}.task3-floating-mark{position:absolute;width:clamp(92px,11.2vw,218px);aspect-ratio:1;display:flex;align-items:center;justify-content:center;border:3px solid var(--ink);box-shadow:0 3px 0 var(--ink);will-change:transform,opacity}.task3-floating-mark.is-rounded{border-radius:9%}.task3-floating-mark.is-circle{border-radius:50%}.task3-floating-mark svg{width:76%;height:76%}
      .task3-you-pointer{position:absolute;z-index:3;left:44%;top:43%;display:flex;flex-direction:column;align-items:center;will-change:transform,opacity}.task3-you-pointer svg{width:clamp(22px,2.2vw,40px);height:auto}.task3-you-pointer span{margin-top:-3px;border:2px solid var(--ink);border-radius:999px;background:#bcff39;padding:3px 12px;font-size:clamp(11px,.9vw,17px);font-weight:800;line-height:1.1}
      .task3-dock{position:absolute;z-index:5;left:50%;bottom:3.2%;transform:translateX(-50%);display:flex;align-items:center;gap:clamp(12px,1.7vw,28px);padding:clamp(8px,.9vw,15px) clamp(14px,1.65vw,27px);border:1px solid rgba(255,255,255,.17);border-radius:999px;background:rgba(55,43,72,.53);box-shadow:0 6px 32px rgba(26,8,45,.17);backdrop-filter:blur(12px);color:rgba(255,255,255,.78);font-size:clamp(10px,.9vw,16px);white-space:nowrap}.task3-dock-option{display:flex;align-items:center;gap:7px}.task3-dock-option i{width:8px;height:8px;border-radius:50%;background:#bcff39}.task3-dock-option b{color:#fff}.task3-dock-cta{border-radius:999px;background:#e8d8fb;color:#13002d;padding:clamp(8px,.85vw,14px) clamp(15px,1.65vw,27px);font-size:clamp(9px,.78vw,14px);font-weight:800}
      @media(max-width:700px){.task3-stage{min-height:560px;margin-top:-74px;padding-top:74px}.task3-top-wave{height:29%}.task3-eyebrow{left:6vw;top:18%}.task3-headline{left:5vw;right:5vw;top:31%;font-size:clamp(37px,9.7vw,70px);line-height:.94;letter-spacing:-.025em}.task3-headline p{white-space:normal}.task3-headline-second{padding-left:13vw}.task3-context-note{left:9%;top:67%;width:67%;gap:7px;font-size:11px}.task3-statement{top:35%;width:95vw;font-size:clamp(21px,5.6vw,37px);line-height:1.18;letter-spacing:-.045em}.task3-statement-line{min-height:1.18em;gap:.1em}.task3-floating-mark{width:clamp(45px,12vw,78px);border-width:2px}.task3-dock{bottom:2%;gap:8px;padding:8px 10px;font-size:9px}.task3-dock-option{gap:4px}.task3-dock-option i{width:6px;height:6px}.task3-dock-cta{padding:8px 10px;font-size:8px}.task3-you-pointer{left:46%;top:46%}}
      @media(prefers-reduced-motion:reduce){.task3-stage{scroll-behavior:auto}}
    `}</style>
  </section>;
}
