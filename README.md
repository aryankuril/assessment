# Bombay Blokes — Interactive Showcase

A responsive Next.js experience that presents four independent, scroll-driven design studies. The project focuses on motion, product presentation, and responsive layouts rather than a production checkout flow.

## Requirements

- Node.js 20.9 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The navigation bar links to each task route. The showcase pages use local assets and do not need API credentials.

## Routes and experiences

| Route | Experience | Main implementation |
| --- | --- | --- |
| `/task1` | Curved service showcase. Service cards shift horizontally as they move through the viewport, with an animated 3D background element. | `CurvedScroll.jsx`, `Model.jsx` |
| `/task2` | Full-screen Flux Theory product story. Scroll changes the scene palette and copy while a GLB bottle rotates, scales, and changes color; the final scene presents product cards. | `Task2BottleAnimation.tsx`, `public/models/bottle.glb` |
| `/task3` | Pinned brand introduction. Colorful marks rise into view, gather, move into the headline, and accompany text that enters from both sides. | `Task3CrencyAnimation.tsx` |
| `/task4` | Three-column vertical campaign gallery. Scrolling moves the columns in alternating directions, then expands the center flavor card to a full-screen interactive selector. | `Task4SodaShowcase.tsx`, `Task4SodaShowcase.css` |

The root route (`/`) currently renders the Task 1 showcase.

## Project layout

```text
app/
  components/       Shared navigation, smooth scrolling, and task experiences
  task1/            Task 1 route
  task2/            Task 2 route
  task3/            Task 3 route
  task4/            Task 4 route
  layout.tsx        Root layout, metadata, navigation, and smooth scrolling
  globals.css       Global Tailwind setup and base styles
public/
  images/           Task 1 imagery and the site logo
  models/           GLB product model used by Task 2
  task4/            Local campaign artwork used by Task 4
```

## Stack

- Next.js App Router and React
- TypeScript, with a small JavaScript Three.js scene
- Tailwind CSS
- GSAP and ScrollTrigger for scroll-linked timelines and pinning
- React Three Fiber and Drei for the 3D scenes
- Lenis for smooth scrolling

## Useful commands

```bash
npm run dev       # Start the local development server
npm run lint      # Lint the project
npm run build     # Create a production build
npm run start     # Serve a production build
npm run check:model # Inspect the Task 2 GLB file signature and size
```

There is no automated test suite configured yet. Run lint and a production build before submitting changes for review.

## Implementation notes

- ScrollTrigger timelines are scoped to their component and reverted during cleanup so pinned sections are restored before React unmounts them.
- Keep animation setup and cleanup paired. When adding a ScrollTrigger, scope it to the owning component and return a cleanup that reverts its GSAP context.
- Task 2 loads its bottle from `/models/bottle.glb`; retain that path or update the preload and loader together when replacing the model.
- Task 4 artwork is stored locally in `public/task4`. Add new campaign art there and reference it with a root-relative URL.
- Keep decorative motion transform-based where possible, and preserve responsive rules and reduced-motion handling when extending the experiences.
