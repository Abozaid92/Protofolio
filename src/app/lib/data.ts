export interface ProjectImage {
  src: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export interface ProjectSection {
  title: string;
  content: string;
}

export interface DeepDiveBlock {
  title: string;
  description: string;
}

export interface TechnicalCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  philosophy: string;
  category: string;
  role: string;
  duration?: string;
  github: string;
  live: string;
  techStack: string[];
  heroImage?: ProjectImage;
  images: ProjectImage[];

  overview: string;
  problemStatement: string;
  architectureOverview: string;
  systemDesign: string;
  dataFlow: string;

  challengesSolved: string;
  edgeCasesHandled: string;
  tradeOffs: string;
  failureScenarios: string;

  performanceStrategy: string;
  renderingStrategy: string;
  cachingStrategy: string;

  securityStrategy: string;
  authFlow: string;

  memoryAndStateManagement: string;
  stateIsolation: string;

  uxStrategy: string;
  interactionDesign: string;
  visualHierarchy: string;

  scalabilityNotes: string;
  extensibility: string;

  seoAccessibilityNotes: string;
  codeQualityNotes: string;

  features: string[];
  outcomes: string[];
  lessonsLearned: string[];
  deepDive: DeepDiveBlock[];
  sections: ProjectSection[];
}

export const projects: TechnicalCaseStudy[] = [
  {
    id: "zfashion_ecommerce",
    title: "ZFashion_Ecommerce",
    subtitle: "Commerce System — Not Just a Storefront",
    tagline: "Speed sells. Trust converts. Structure scales.",
    description:
      "ZFashion is a premium ecommerce system built to behave like a real product platform, not a decorative landing page. The purpose of the project is to demonstrate how architecture, interaction design, authentication, caching, and responsive presentation can work together to support commerce without friction.",
    philosophy:
      "A commerce interface is a negotiation with attention. If the system wastes the user's time, it loses the sale before the sale even begins.",
    category: "Ecommerce",
    role: "Full Stack Developer",
    duration: "Production-minded portfolio build",
    github: "https://github.com/Abozaid92/Z_Fashion",
    live: "https://z-fashion-ecru.vercel.app/en",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "NextAuth",
      "Node.js",
      "Express",
      "Socket.IO",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Firebase",
    ],
    heroImage: {
      src: "https://i.postimg.cc/xCjWx6Q1/1.png",
      alt: "ZFashion premium ecommerce hero screen",
      label: "Hero / entry point",
      aspectRatio: "16:9",
      priority: true,
    },
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/1.png",
        alt: "ZFashion homepage and storefront entry",
        label: "Homepage",
        aspectRatio: "16:9",
        priority: true,
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/2.png",
        alt: "ZFashion catalog browsing view",
        label: "Catalog",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/3.png",
        alt: "ZFashion product details screen",
        label: "Product details",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/4.png",
        alt: "ZFashion cart and commerce flow screen",
        label: "Cart flow",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/5.png",
        alt: "ZFashion checkout or account section",
        label: "Checkout",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/6.png",
        alt: "ZFashion order management or dashboard view",
        label: "Orders",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/7.png",
        alt: "ZFashion interaction-focused screen",
        label: "Interaction layer",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/8.png",
        alt: "ZFashion category presentation screen",
        label: "Category view",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/9.png",
        alt: "ZFashion refined showcase screen",
        label: "Refined UI",
        aspectRatio: "16:9",
      },
    ],
    overview:
      "ZFashion is framed as a commerce engine with a premium face. The front end is only one layer of the story; underneath it sits a carefully separated architecture designed to keep identity, cart state, product data, and real-time signals from colliding.",
    problemStatement:
      "Ecommerce platforms often fail in quiet but expensive ways. The UI feels polished, but the cart desynchronizes, auth becomes brittle, product reads slow down, or real-time updates arrive too late. This project is built around preventing those failures before they become user-visible.",
    architectureOverview:
      "The architecture uses Next.js and TypeScript for the application layer, Express for backend services, Prisma as the ORM boundary, PostgreSQL as durable storage, Redis as a fast state and cache layer, Socket.IO for live updates, NextAuth for identity, and Firebase for supportive external workflows.",
    systemDesign:
      "The system is layered intentionally. UI components are not allowed to own business truth. Business truth lives on the server, access is controlled by session boundaries, and transient speed-sensitive state is handled through cache or live channels when necessary.",
    dataFlow:
      "A product interaction begins in the interface, moves through validation, hits the API, gets checked against business rules, persists in PostgreSQL when needed, refreshes hot data in Redis, and optionally propagates live updates through Socket.IO so the visible state remains honest.",
    challengesSolved:
      "The main challenge was creating a premium storefront without building a fragile demo. The project needed to support authenticated flows, fast product browsing, cart updates, and a visually rich interface without sacrificing system clarity.",
    edgeCasesHandled:
      "The design accounts for cart duplication, stale user sessions, partial network failure, product refresh mismatches, auth expiration, and delayed realtime notifications. The codebase mindset is to treat those as expected conditions, not rare accidents.",
    tradeOffs:
      "Redis improves responsiveness but introduces cache invalidation pressure. Socket.IO improves immediacy but adds connection management. The stack accepts those costs because the payoff is a storefront that feels alive instead of sluggish.",
    failureScenarios:
      "If cache is unavailable, the system should fall back to the database. If a socket disconnects, the UI should degrade gracefully. If auth expires, protected flows should fail closed rather than expose unstable user state.",
    performanceStrategy:
      "The performance strategy is to avoid waste at every layer: split routes when possible, keep components focused, fetch only what is needed, cache aggressively on hot paths, and avoid allowing the browser to become a replay machine for server logic.",
    renderingStrategy:
      "Rendering is treated as a product decision. Above-the-fold commerce content should appear quickly, while secondary interactions can be deferred or hydrated as needed. The goal is to make the page feel ready before the user starts waiting.",
    cachingStrategy:
      "Redis is used as the acceleration layer for ephemeral or frequently read data such as session-related state, popular product references, or repeated commerce lookups. That reduces redundant pressure on the primary database.",
    securityStrategy:
      "All sensitive mutations are validated server-side. Client state is treated as advisory, not authoritative. Authenticated sessions are guarded through NextAuth, and the backend is responsible for permission checks, data validation, and controlled access.",
    authFlow:
      "A user signs in through NextAuth, receives a trusted session, and then hits protected routes or API endpoints only after the session boundary is verified. This keeps the identity model centralized instead of leaking auth logic across the UI.",
    memoryAndStateManagement:
      "The app separates persistent business state from transient UI memory. The cart, session, and product relationships are treated differently from hover states, modal visibility, and local interaction flags. That distinction reduces accidental coupling and makes bugs easier to isolate.",
    stateIsolation:
      "Cart updates should not rewrite unrelated UI state. Product filters should not mutate session context. Checkout flow should not depend on random component memory. This isolation is what keeps a commerce platform maintainable once features multiply.",
    uxStrategy:
      "The user experience is built around momentum. Browse, compare, inspect, decide, and act. The interface avoids forcing users to think about the machine. It should feel precise, elegant, and calm even while doing technically demanding work in the background.",
    interactionDesign:
      "Micro-feedback matters here. Hover states, cart confirmations, transition timing, and load feedback all exist to remove uncertainty. Commerce is emotional, and uncertainty kills conversion faster than a missing feature.",
    visualHierarchy:
      "The layout gives products the loudest voice, navigation the cleanest support, and secondary information the quietest presence. That hierarchy is intentional because a storefront should not fight with its own inventory.",
    scalabilityNotes:
      "The architecture is ready for growth into wishlists, recommendation systems, multi-vendor logic, promotion engines, order tracking, analytics dashboards, and support modules without requiring a full rewrite of the underlying structure.",
    extensibility:
      "Because the system is modular, new commerce services can be introduced through isolated boundaries instead of tangled conditionals. That makes future feature work safer and cheaper.",
    seoAccessibilityNotes:
      "A commerce platform benefits from semantic structure, meaningful headings, descriptive alt text, and predictable navigation. Accessibility and SEO are not cosmetic extras here; they are discoverability and usability infrastructure.",
    codeQualityNotes:
      "TypeScript protects contracts, Prisma protects schema thinking, and the layered architecture reduces the chance that one feature silently corrupts another. The code quality story is not about cleverness; it is about discipline.",
    features: [
      "Premium fashion storefront with conversion-focused structure",
      "Authentication-aware UX powered by NextAuth",
      "Live interaction support through Socket.IO",
      "Persistent relational data managed with Prisma and PostgreSQL",
      "Fast transient state handling with Redis",
      "Backend service layer using Express and Node.js",
      "Supportive Firebase workflow integration",
      "Type-safe frontend implementation using TypeScript",
      "Responsive Tailwind-based interface system",
      "Structured product discovery and cart behavior",
      "Checkout-ready flow design with strong hierarchy",
      "Production-minded separation of concerns",
    ],
    outcomes: [
      "A premium commerce experience that looks polished and behaves like a real product system.",
      "A portfolio entry that signals architecture awareness, not just UI skill.",
      "A stack that demonstrates serious thinking around performance and trust.",
    ],
    lessonsLearned: [
      "Performance is an architectural outcome, not a visual trick.",
      "User trust disappears fast when state becomes inconsistent.",
      "A good ecommerce app is a system of confirmations, not just pages.",
      "Cache is useful only when you understand what should not be cached.",
    ],
    deepDive: [
      {
        title: "State Consistency",
        description:
          "The cart, auth session, and product data must never drift out of alignment. That is why the state model needs clear ownership boundaries.",
      },
      {
        title: "Real-Time Responsibility",
        description:
          "Realtime features are used only where they add visible value. They should inform the experience, not make the application dependent on noisy live updates.",
      },
      {
        title: "Conversion Psychology",
        description:
          "The UI is intentionally calm, because calm interfaces lower decision friction. In ecommerce, confidence is a feature.",
      },
    ],
    sections: [
      {
        title: "Engineering Lens",
        content:
          "The project is structured to show that you understand commerce as a technical system. The important thing is not the visual gloss. The important thing is that the application can survive real usage, not just screenshots.",
      },
      {
        title: "Why Recruiters Notice It",
        content:
          "Recruiters notice when a project speaks the language of architecture: validation, persistence, caching, realtime updates, state boundaries, and defensive behavior under failure.",
      },
      {
        title: "What This Signals",
        content:
          "It signals that the developer can think beyond components and begin thinking in systems. That is a major jump in perceived seniority.",
      },
    ],
  },

  {
    id: "ink_flow",
    title: "Ink Flow",
    subtitle:
      "Creative Platform for Writing, Organization, and Focused Content Workflows",
    tagline: "The interface should disappear. The work should remain.",
    description:
      "Ink Flow is a clean creative platform designed around content creation, structured organization, and calm interaction. It is built to support serious writing workflows without burying the user under unnecessary UI noise.",
    philosophy:
      "A creative tool fails when it tries too hard to look smart. The right tool stays quiet and gets out of the way.",
    category: "Creative Platform",
    role: "Full Stack Developer",
    github: "https://github.com/Abozaid92/inkflow",
    live: "https://inkflow-ten.vercel.app/",
    techStack: [
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Next.js",
      "JWT",
      "Tailwind",
    ],
    heroImage: {
      src: "https://i.postimg.cc/T3WcJHqb/1-ink.png",
      alt: "Ink Flow creative platform hero",
      label: "Dashboard entry",
      aspectRatio: "16:9",
      priority: true,
    },
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/1-ink.png",
        alt: "Ink Flow dashboard screen",
        label: "Dashboard",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/2-ink.png",
        alt: "Ink Flow workspace view",
        label: "Workspace",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/3-ink.png",
        alt: "Ink Flow content management screen",
        label: "Content management",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/4-ink.png",
        alt: "Ink Flow workflow screen",
        label: "Workflow",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/5-ink.png",
        alt: "Ink Flow final screen",
        label: "Final view",
        aspectRatio: "16:9",
      },
    ],
    overview:
      "Ink Flow is a focused content platform where the central engineering question is how to keep the experience clean while the system still manages persistent content, user identity, and structured retrieval.",
    problemStatement:
      "Content tools often become cluttered once persistence, permissions, and organization are added. The challenge was to preserve calmness while still supporting serious data handling behind the scenes.",
    architectureOverview:
      "Next.js forms the application shell, TypeScript preserves contract clarity, Prisma and PostgreSQL manage durable content storage, and JWT provides a straightforward access model for protected user actions.",
    systemDesign:
      "The platform is designed around a simple principle: the user should think about writing, not infrastructure. Content operations are supported by a predictable backend while the interface stays lightweight and controlled.",
    dataFlow:
      "User creates or edits content → client validates and submits → API authenticates via JWT → backend writes through Prisma → PostgreSQL persists the state → UI reflects the updated content without introducing confusion.",
    challengesSolved:
      "The hardest part was resisting feature creep. Creative tools can spiral into noisy dashboards. This system is purposely shaped to keep the work center stage and the tooling quiet.",
    edgeCasesHandled:
      "Draft recovery, unauthorized edits, accidental deletion, empty states, repeated submissions, and stale data refreshes are all conditions that need to be handled without disrupting the flow.",
    tradeOffs:
      "A minimal interface reduces cognitive overhead, but it also demands stronger content structure underneath. Simplicity here is not cheap; it is paid for by disciplined backend modeling.",
    failureScenarios:
      "If a content save fails, the interface should preserve the user's mental continuity instead of wiping progress. If auth fails, protected actions must stop cleanly and explain nothing more than necessary.",
    performanceStrategy:
      "The platform aims to feel light by keeping its UI lean and its data access direct. There is no benefit in making a writing tool behave like a heavyweight enterprise dashboard.",
    renderingStrategy:
      "Only the necessary surfaces should render aggressively. Content workspace elements can hydrate as needed while the interface avoids wasting cycles on decorative state churn.",
    cachingStrategy:
      "Caching should be conservative here. Content correctness matters more than speculative speed. Any cached data should improve responsiveness without risking stale writes or inconsistent documents.",
    securityStrategy:
      "JWT protects access to sensitive operations, and the backend must confirm ownership before allowing content manipulation. The trust boundary belongs on the server, not in the browser.",
    authFlow:
      "User identity is established through JWT, requests are checked before protected operations, and content ownership rules are enforced before the database accepts mutations.",
    memoryAndStateManagement:
      "Content state should remain durable and recoverable. Transient editor state and long-lived content objects must not be mixed casually, because once they are tangled, bugs become memory leaks in human form.",
    stateIsolation:
      "The workspace, the editor, and the content records should each own only the state that belongs to them. This prevents accidental cascading updates and keeps feature growth manageable.",
    uxStrategy:
      "The UX is intentionally restrained. A creative tool should encourage focus, not performance anxiety. Typography, spacing, and flow matter more than decorative motion.",
    interactionDesign:
      "Interactions should feel discreet and reliable. Save confirmation, navigation, empty states, and content feedback all need to behave like a calm assistant, not a noisy alarm system.",
    visualHierarchy:
      "The hierarchy favors the current task first, supporting actions second, and decorative concern last. That hierarchy is what keeps the writer inside the work.",
    scalabilityNotes:
      "The structure can grow into folders, tags, drafts, collaboration, comments, version history, and publishing workflows. The foundation is clean enough to accept that growth.",
    extensibility:
      "Because the data model is explicit, future features can attach without rewriting the entire platform logic. That makes Ink Flow a good base for a serious content product.",
    seoAccessibilityNotes:
      "Clear headings, structured content regions, and readable action labels improve both accessibility and future public-facing discoverability.",
    codeQualityNotes:
      "TypeScript and Prisma together reduce the chance of unstable content contracts. That matters more in content systems than people usually admit.",
    features: [
      "Writing-focused creative workspace",
      "JWT-protected user flows",
      "Persistent content storage",
      "Type-safe code structure",
      "Organized content retrieval",
      "Minimal and calm UI",
      "Modern Next.js application layer",
      "Responsive Tailwind styling",
    ],
    outcomes: [
      "A calm creative platform with strong structural discipline.",
      "A portfolio piece that shows content engineering awareness.",
      "A clean balance of UX simplicity and data seriousness.",
    ],
    lessonsLearned: [
      "A minimal UI still needs a serious architecture.",
      "If content matters, recovery paths matter too.",
      "Good writing tools are judged by friction, not features.",
      "The cleanest interface is often the hardest one to engineer correctly.",
    ],
    deepDive: [
      {
        title: "Creative Focus",
        description:
          "The product keeps the user's attention on the content by stripping away unnecessary interface noise.",
      },
      {
        title: "Durable Content",
        description:
          "The backend architecture treats user-created content as a serious entity that must remain stable and retrievable.",
      },
      {
        title: "Behavioral Calm",
        description:
          "Every UI decision aims to reduce panic, confusion, and mental switching costs.",
      },
    ],
    sections: [
      {
        title: "Engineering Lens",
        content:
          "This is a clean example of disciplined simplicity. The challenge was not to add more. The challenge was to remove everything that did not serve the work.",
      },
      {
        title: "Why It Matters",
        content:
          "A recruiter reading this sees someone who understands that product quality is not just visual polish. It is also the ability to protect a workflow from becoming cluttered and unstable.",
      },
    ],
  },

  {
    id: "al_minshawi",
    title: "Al-Minshawi",
    subtitle:
      "Coffee Landing Page Built for Atmosphere, Identity, and First Impression",
    tagline: "Brand emotion needs structure or it collapses into decoration.",
    description:
      "Al-Minshawi is a coffee landing page designed to communicate warmth, quality, and brand identity through a clean and focused experience. It is a frontend-led project where visual hierarchy and presentation discipline carry the entire message.",
    philosophy:
      "A landing page should not beg for attention. It should earn it within seconds.",
    category: "Landing Page",
    role: "Frontend Developer",
    github: "https://github.com/Abozaid92/AL-minshawi-Coffe-Land-Page",
    live: "https://al-minshawi-coffe-land-page.vercel.app/",
    techStack: ["React", "Vite", "Node.js", "Tailwind", "Express"],
    heroImage: {
      src: "https://i.postimg.cc/L5fBtxP4/cof-1.webp",
      alt: "Al-Minshawi coffee hero section",
      label: "Hero section",
      aspectRatio: "16:9",
      priority: true,
    },
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/cof-1.webp",
        alt: "Al-Minshawi coffee hero banner",
        label: "Hero",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/cof-2.png",
        alt: "Al-Minshawi coffee section",
        label: "Brand section",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/cof-3.png",
        alt: "Al-Minshawi coffee wide screen layout",
        label: "Wide showcase",
        aspectRatio: "16:9",
      },
    ],
    overview:
      "This landing page is built around immediate emotional communication. It has one job: create a premium coffee impression and make the brand feel intentional rather than generic.",
    problemStatement:
      "Coffee brands lose impact when their landing pages are visually flat, overloaded, or poorly structured. The challenge here was to create a page that feels premium without becoming slow or noisy.",
    architectureOverview:
      "React and Vite give the project a fast, lightweight frontend base. Tailwind handles the visual system, while Express can support future integrations or content delivery needs without forcing heavy coupling.",
    systemDesign:
      "The page is organized as a narrative flow: brand intro, visual promise, product or atmosphere presentation, and a clear push toward action. The system is simple because the intent is simple.",
    dataFlow:
      "Visitor enters the page → sees the hero → reads the brand message → scans supporting sections → reaches the call to action with minimal resistance.",
    challengesSolved:
      "The major challenge was balancing aesthetics with speed. A cafe website can easily become overdesigned. This one keeps the motion of the page controlled and the content readable.",
    edgeCasesHandled:
      "Responsive breakpoints, image presentation consistency, empty text areas, and alignment drift across devices all matter in a page where layout is the entire product.",
    tradeOffs:
      "Visual richness often competes with performance. The implementation accepts a clean and disciplined composition instead of piling on effects that would make the page feel heavy.",
    failureScenarios:
      "If images fail or load slowly, the structure should still communicate the brand. The page must not depend on a single visual to make sense.",
    performanceStrategy:
      "The page keeps its footprint small. Vite helps with fast dev/build behavior, and the composition avoids unnecessary runtime complexity.",
    renderingStrategy:
      "Render the core message immediately. Secondary visual ornaments should never block understanding of the brand or the main value proposition.",
    cachingStrategy:
      "Caching is not the main story here. The priority is predictable delivery and simple rendering rather than speculative state caching.",
    securityStrategy:
      "Security is light because the project is informational, but all future integrations should be handled carefully and not trusted blindly.",
    authFlow:
      "No complex auth is required for the current landing page. That simplicity is intentional and correct for the product type.",
    memoryAndStateManagement:
      "Minimal state is ideal. The page should not behave like an application that needs to remember everything. It should stay focused on presentation.",
    stateIsolation:
      "Any interactive elements should be isolated so they never interfere with the visual narrative or scroll flow.",
    uxStrategy:
      "The UX depends on atmosphere, pacing, and clarity. The visitor should be guided through the brand story as though the page itself understands hospitality.",
    interactionDesign:
      "Buttons, transitions, and section rhythm all exist to guide attention without stealing it. The interface must feel warm but controlled.",
    visualHierarchy:
      "The hierarchy places brand identity first, supporting imagery second, and textual reinforcement third. That order matches the purpose of the page.",
    scalabilityNotes:
      "The design can grow into a menu, branch information, seasonal promotions, e-commerce ordering, and reservation flows if needed.",
    extensibility:
      "The structure is open enough to allow future marketing modules while preserving the current visual language.",
    seoAccessibilityNotes:
      "Clear heading structure, meaningful text, and descriptive image handling improve both accessibility and brand discoverability.",
    codeQualityNotes:
      "The code quality story here is about keeping the frontend readable, component boundaries clean, and styling understandable for future maintenance.",
    features: [
      "Brand-first hero presentation",
      "Responsive landing page flow",
      "Fast Vite-driven frontend setup",
      "Tailwind-based styling system",
      "Simple and clear section hierarchy",
      "Expandable backend-ready structure",
    ],
    outcomes: [
      "A warm and premium coffee presence.",
      "A page that communicates identity quickly.",
      "A solid example of frontend restraint done correctly.",
    ],
    lessonsLearned: [
      "A landing page is a persuasion system.",
      "Visual hierarchy is architecture in disguise.",
      "A simple stack can still produce a premium result.",
      "A page should feel intentional from the first second.",
    ],
    deepDive: [
      {
        title: "Brand Atmosphere",
        description:
          "The page must make the brand feel warm and believable before the user ever reads a long paragraph.",
      },
      {
        title: "Presentation Discipline",
        description:
          "The layout should be composed with enough precision that every element feels placed, not thrown in.",
      },
    ],
    sections: [
      {
        title: "Engineering Lens",
        content:
          "This project proves that good frontend work is not about piling on effects. It is about making a message land with precision and speed.",
      },
    ],
  },

  {
    id: "al_amaad_hospital",
    title: "Al-Amad Hospital",
    subtitle: "Healthcare Landing Page Designed for Trust and Calm Navigation",
    tagline: "In healthcare, clarity is not decoration. It is reassurance.",
    description:
      "Al-Amad Hospital is a landing page centered on healthcare communication. Its structure is designed to feel safe, readable, and professional, with content hierarchy built to reduce uncertainty and guide visitors clearly.",
    philosophy:
      "A hospital interface should not try to impress first. It should try to calm first.",
    category: "Healthcare Landing Page",
    role: "Frontend Developer",
    github: "https://github.com/Abozaid92/Hospital-Al-Amaad",
    live: "https://hospital-al-amaad.vercel.app/",
    techStack: ["React", "Vite", "Node.js", "Tailwind", "Express"],
    heroImage: {
      src: "https://i.postimg.cc/02g5NV2Y/hos-1.png",
      alt: "Al-Amad hospital hero screen",
      label: "Hero section",
      aspectRatio: "4:3",
      priority: true,
    },
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/hos-1.png",
        alt: "Al-Amad hospital homepage",
        label: "Homepage",
        aspectRatio: "4:3",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/hos-2.png",
        alt: "Al-Amad hospital service section",
        label: "Service section",
        aspectRatio: "16:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/hos-3.png",
        alt: "Al-Amad hospital supporting section",
        label: "Trust section",
        aspectRatio: "16:9",
      },
    ],
    overview:
      "This healthcare page is built as a trust surface. The user should feel guided, not overloaded. Every section exists to communicate professionalism, accessibility, and a sense of operational order.",
    problemStatement:
      "Healthcare pages fail when they are vague, noisy, or emotionally careless. Visitors need to find services, understand the institution, and identify contact paths without decoding a complicated interface.",
    architectureOverview:
      "React and Vite support a clean and fast frontend base. Tailwind manages responsive visual structure, and Express leaves room for future backend growth without forcing complexity into the current landing page.",
    systemDesign:
      "The page is organized around confidence: clear hero message, visible service structure, supporting trust content, and a calm call to action. The design assumes the visitor may already be anxious, so it avoids adding pressure.",
    dataFlow:
      "User opens the site → immediately sees the hospital identity → scans services and trust indicators → identifies the action path with minimal effort.",
    challengesSolved:
      "The challenge was translating healthcare seriousness into layout discipline. If the page feels chaotic, it undermines trust. If it feels sterile and lifeless, it loses human connection. The balance matters.",
    edgeCasesHandled:
      "Responsive behavior, text wrapping, image scaling, service block consistency, and CTA visibility all need to survive multiple screen sizes without losing the calm tone.",
    tradeOffs:
      "The page favors clarity over visual density. That means fewer decorative elements, but a stronger communication outcome.",
    failureScenarios:
      "If one section fails to load, the visitor should still understand the institution and how to proceed. A healthcare page must degrade safely and never feel broken in the face of incomplete content.",
    performanceStrategy:
      "The experience remains lightweight and quick, because hospital visitors should not wait for a theatrical page to finish loading before finding essential information.",
    renderingStrategy:
      "Core trust content must appear immediately. Secondary sections can follow, but not at the expense of the first impression.",
    cachingStrategy:
      "Caching is secondary here. The main objective is stable presentation and reliable readability.",
    securityStrategy:
      "The current landing page is informational, but future patient-facing flows would need strong privacy protection, validation, and secure boundaries.",
    authFlow:
      "No authentication flow is required for the current marketing surface. That keeps the page focused on communication rather than account complexity.",
    memoryAndStateManagement:
      "Minimal state is the right state for this class of project. The page should not behave like an application that must remember much.",
    stateIsolation:
      "If interactive components are added later, they should remain isolated from the content structure so the page never becomes brittle.",
    uxStrategy:
      "The UX is built to lower emotional friction. The visitor should feel a sense of order, competence, and ease as they move through the page.",
    interactionDesign:
      "Button placement, section spacing, and transition cadence should feel steady and controlled rather than attention-hungry.",
    visualHierarchy:
      "The hierarchy gives the hospital identity immediate presence, service information next, and supporting trust evidence after that. That order fits the user’s mental model.",
    scalabilityNotes:
      "The system can expand into doctor profiles, appointments, emergency sections, insurance details, multilingual support, and service subpages.",
    extensibility:
      "Because the foundation is simple and clean, new healthcare modules can be added without rewriting the core visual language.",
    seoAccessibilityNotes:
      "Healthcare content should be easy to read, easy to scan, and easy to interpret by assistive technologies. Semantic structure and clear labels are essential.",
    codeQualityNotes:
      "The code should remain simple enough that future maintainers can extend it without introducing visual or behavioral inconsistency.",
    features: [
      "Trust-focused healthcare landing page",
      "Calm and readable hierarchy",
      "Responsive Tailwind composition",
      "Fast Vite-based frontend",
      "Expandable backend-ready structure",
      "Service-oriented presentation",
    ],
    outcomes: [
      "A calm and professional healthcare presence.",
      "A landing page that reduces uncertainty instead of adding it.",
      "A strong example of design serving trust.",
    ],
    lessonsLearned: [
      "Trust is a UX outcome.",
      "Clarity matters more when the user is under pressure.",
      "Healthcare pages need restraint, not spectacle.",
      "A simple page can still be technically deliberate.",
    ],
    deepDive: [
      {
        title: "Trust Language",
        description:
          "The layout and copy should both communicate competence without shouting.",
      },
      {
        title: "Emotional Stability",
        description:
          "The visual rhythm should help visitors feel oriented rather than rushed.",
      },
    ],
    sections: [
      {
        title: "Engineering Lens",
        content:
          "This project works because it understands the category. Healthcare is not a place for visual chaos. It is a place for calm structure and reliable communication.",
      },
    ],
  },

  {
    id: "islamic_quran_website",
    title: "Islamic Quran Website",
    subtitle:
      "Quran and Islamic Platform Focused on Clarity, Structure, and Respect",
    tagline:
      "Content should be easy to reach when the user comes in with intention.",
    description:
      "The Islamic Quran Website is a content-focused platform designed to present Quranic and Islamic material in a clean, respectful, and structured interface. The emphasis is on readability, stable navigation, and a calm browsing experience.",
    philosophy:
      "When the content matters deeply, the interface must become humble.",
    category: "Content Platform",
    role: "Frontend Developer",
    github: "https://github.com/Abozaid92/islamic-",
    live: "https://islamic-alpha.vercel.app/",
    techStack: ["Node.js", "HTML", "CSS", "JavaScript", "Bootstrap"],
    heroImage: {
      src: "https://i.postimg.cc/gJyBdcMq/islamic-1.webp",
      alt: "Islamic Quran website home screen",
      label: "Home / entry point",
      aspectRatio: "16:10",
      priority: true,
    },
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/islamic-1.webp",
        alt: "Islamic Quran website homepage",
        label: "Home",
        aspectRatio: "16:10",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/islamic-2.png",
        alt: "Islamic content section",
        label: "Content section",
        aspectRatio: "21:9",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/islamic-3.png",
        alt: "Islamic website secondary screen",
        label: "Secondary view",
        aspectRatio: "21:9",
      },
    ],
    overview:
      "This platform is designed as a respectful content system. The goal is not visual excess. The goal is to make Quranic and Islamic content easy to access, easy to read, and easy to trust.",
    problemStatement:
      "Content-heavy religious sites can become cluttered or hard to navigate. The challenge here was to preserve calmness and structure while still allowing the content to remain prominent and accessible.",
    architectureOverview:
      "The stack uses HTML, CSS, JavaScript, Bootstrap, and Node.js. This choice favors stability, accessibility, and maintainability over unnecessary framework complexity.",
    systemDesign:
      "The site is organized around reading flow. The user should enter, orient, and access content with minimal friction. The interface is there to support understanding, not distract from it.",
    dataFlow:
      "Visitor enters the home page → content categories or featured areas become visible → the user navigates to the intended section → text or related material is displayed in a readable format.",
    challengesSolved:
      "The challenge was creating a reliable, readable interface with a modest stack and limited complexity. That required careful spacing, alignment, and control over information density.",
    edgeCasesHandled:
      "Long text sections, small screens, content overflow, and layout consistency across breakpoints all have to be respected so the page remains usable rather than ornamental.",
    tradeOffs:
      "A classic stack keeps the site easy to maintain and less fragile, but it requires thoughtful layout work to avoid feeling plain or dated.",
    failureScenarios:
      "If a section fails or content is incomplete, the page should still feel coherent and not break the reading experience.",
    performanceStrategy:
      "A lightweight stack is well suited to a content platform. The page should load quickly and remain responsive because the content itself is the main value.",
    renderingStrategy:
      "The most important content should be visible immediately. Secondary or less critical sections should not interfere with the page’s readability.",
    cachingStrategy:
      "Caching can help later if the platform expands, but the current system should remain simple and deterministic.",
    securityStrategy:
      "The current site is informational, but any future user-generated input or editable content would need input validation and server-side protection.",
    authFlow:
      "No complex authentication is required for the current information-centric structure. That simplicity supports the use case.",
    memoryAndStateManagement:
      "The site should keep state minimal. Readers do not need the site to remember much; they need it to stay stable and predictable.",
    stateIsolation:
      "If dynamic components are added, they should remain isolated so they do not disrupt the content hierarchy or reading flow.",
    uxStrategy:
      "The UX should feel calm, respectful, and readable. The interface must not compete with the content for attention.",
    interactionDesign:
      "Navigation should be obvious, transitions should be gentle, and the content presentation should never feel rushed or overcrowded.",
    visualHierarchy:
      "The hierarchy puts content first, navigation second, and decorative elements last. That matches the intent of the platform.",
    scalabilityNotes:
      "The structure can grow into surahs, tafsir, audio recitation, bookmarks, search, user favorites, and multi-language support.",
    extensibility:
      "Because the foundation is simple, future growth can happen without making the site feel heavier or harder to use.",
    seoAccessibilityNotes:
      "This type of platform benefits from semantic structure, readable typography, and clear navigation that helps both users and search engines understand the content organization.",
    codeQualityNotes:
      "The code quality advantage here is stability. A simple stack can be a strength when it is disciplined and easy to extend.",
    features: [
      "Content-first Quran and Islamic platform",
      "Readable and structured layout",
      "Bootstrap-assisted responsiveness",
      "Classic and stable frontend stack",
      "Fast navigation for text-heavy content",
      "Expandable to audio and search features",
    ],
    outcomes: [
      "A respectful and readable content experience.",
      "A stable platform that puts meaning before decoration.",
      "A strong example of using a simple stack correctly.",
    ],
    lessonsLearned: [
      "A content platform lives or dies by readability.",
      "Restraint is a real design skill.",
      "The best interface is sometimes the one that gets out of the way.",
      "Simple technology can still create serious user value.",
    ],
    deepDive: [
      {
        title: "Respectful Structure",
        description:
          "The layout is designed to honor the content by keeping it visible and easy to approach.",
      },
      {
        title: "Reading Experience",
        description:
          "The page should support long-form reading without fatigue or visual interruption.",
      },
    ],
    sections: [
      {
        title: "Engineering Lens",
        content:
          "This project shows that discipline matters more than complexity. A clear, stable, respectful content structure can be more impressive than a noisy modern stack if the goal is user clarity.",
      },
    ],
  },
];

export default projects;

export function getAllProjectIds(): string[] {
  return projects.map((p) => p.id);
}

export function getProjectById(id: string): TechnicalCaseStudy | undefined {
  return projects.find((p) => p.id === id);
}

export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
