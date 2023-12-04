export {};

const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

// Owner of the seeded courses. Uses your teacher id if configured so the
// courses also show up in the teacher dashboard; otherwise a fallback id.
const SEED_USER_ID = process.env.NEXT_PUBLIC_TEACHER_ID || "seed-teacher";

const MUX_SEED_PLAYBACK_ID = process.env.MUX_SEED_PLAYBACK_ID;
const MUX_SEED_ASSET_ID =
  process.env.MUX_SEED_ASSET_ID ||
  (MUX_SEED_PLAYBACK_ID ? `seed-${MUX_SEED_PLAYBACK_ID}` : null);

function muxVideoFields() {
  if (!MUX_SEED_PLAYBACK_ID) return {};

  return {
    videoUrl: `https://stream.mux.com/${MUX_SEED_PLAYBACK_ID}.m3u8`,
    muxData: {
      create: {
        assetId: MUX_SEED_ASSET_ID,
        playbackId: MUX_SEED_PLAYBACK_ID,
      },
    },
  };
}

const COURSES_BY_CATEGORY = {
  "Computer Science": [
    {
      title: "JavaScript Fundamentals",
      description: "Master the core language: variables, functions, closures, and async/await.",
      price: 49.99,
      chapters: ["Getting Started", "Variables & Types", "Functions & Scope", "Async JavaScript"],
    },
    {
      title: "Data Structures & Algorithms",
      description: "Arrays, linked lists, trees, graphs, and the big-O thinking behind them.",
      price: 79.99,
      chapters: ["Big-O Notation", "Arrays & Strings", "Trees & Graphs", "Dynamic Programming"],
    },
    {
      title: "Building APIs with Node.js",
      description: "Design and ship production-grade REST APIs with Express and Prisma.",
      price: 59.99,
      chapters: ["HTTP & REST Basics", "Routing & Middleware", "Database Layer", "Auth & Deployment"],
    },
    {
      title: "Python for Beginners",
      description: "Learn Python from zero: syntax, control flow, functions, and files.",
      price: 39.99,
      chapters: ["Setup & Syntax", "Control Flow", "Functions & Modules", "Working with Files"],
    },
    {
      title: "React from Scratch",
      description: "Build modern user interfaces with components, state, and hooks.",
      price: 69.99,
      chapters: ["JSX & Components", "State & Props", "Hooks", "Building an App"],
    },
    {
      title: "SQL & Databases",
      description: "Query and model data confidently with relational databases.",
      price: 49.99,
      chapters: ["Relational Basics", "SELECT Queries", "Joins", "Indexes & Performance"],
    },
    {
      title: "Intro to Machine Learning",
      description: "Core ML concepts and your first models, explained simply.",
      price: 89.99,
      chapters: ["What is ML", "Linear Regression", "Classification", "Model Evaluation"],
    },
  ],
  "Music": [
    {
      title: "Music Theory 101",
      description: "Scales, chords, intervals, and rhythm explained from the ground up.",
      price: 39.99,
      chapters: ["Notes & The Staff", "Scales & Keys", "Building Chords", "Rhythm & Time"],
    },
    {
      title: "Guitar for Beginners",
      description: "Your first chords, strumming patterns, and three full songs.",
      price: 29.99,
      chapters: ["Holding the Guitar", "Open Chords", "Strumming Patterns", "Your First Song"],
    },
    {
      title: "Piano Essentials",
      description: "Find your way around the keyboard and play your first pieces.",
      price: 44.99,
      chapters: ["Keyboard Layout", "Reading Sheet Music", "Playing Chords", "Your First Piece"],
    },
    {
      title: "Music Production with DAWs",
      description: "Record, arrange, and mix your own tracks in a DAW.",
      price: 64.99,
      chapters: ["Your DAW Setup", "Recording Audio", "MIDI & Instruments", "Mixing Basics"],
    },
    {
      title: "Singing Fundamentals",
      description: "Develop breath control, pitch, and confidence as a vocalist.",
      price: 34.99,
      chapters: ["Breathing", "Pitch & Tone", "Vocal Range", "Performing"],
    },
    {
      title: "Songwriting Workshop",
      description: "Turn ideas into finished songs with melody, lyrics, and structure.",
      price: 49.99,
      chapters: ["Finding Ideas", "Melody & Harmony", "Writing Lyrics", "Structuring a Song"],
    },
  ],
  "Fitness": [
    {
      title: "Strength Training Basics",
      description: "Build a safe, effective barbell routine with proper form.",
      price: 34.99,
      chapters: ["Warming Up", "The Squat", "The Deadlift", "Programming Your Week"],
    },
    {
      title: "Mobility & Flexibility",
      description: "Daily routines to move better, recover faster, and avoid injury.",
      price: 24.99,
      chapters: ["Why Mobility Matters", "Hip Openers", "Shoulder Health", "Full-Body Flow"],
    },
    {
      title: "HIIT for Fat Loss",
      description: "Short, intense workouts that burn fat and build conditioning.",
      price: 29.99,
      chapters: ["HIIT Principles", "Bodyweight Circuits", "Conditioning", "Recovery"],
    },
    {
      title: "Yoga for Beginners",
      description: "Build strength, flexibility, and calm with a simple yoga practice.",
      price: 24.99,
      chapters: ["Foundations", "Sun Salutations", "Balance Poses", "Relaxation"],
    },
    {
      title: "Nutrition for Athletes",
      description: "Fuel performance and recovery with smart, practical nutrition.",
      price: 39.99,
      chapters: ["Macronutrients", "Meal Timing", "Hydration", "Supplements"],
    },
  ],
  "Photography": [
    {
      title: "Photography Masterclass",
      description: "From auto to manual: exposure, composition, and editing.",
      price: 69.99,
      chapters: ["The Exposure Triangle", "Composition Rules", "Working with Light", "Editing in Lightroom"],
    },
    {
      title: "Portrait Photography",
      description: "Pose, light, and direct subjects for striking portraits.",
      price: 54.99,
      chapters: ["Gear for Portraits", "Posing Basics", "Lighting Setups", "Retouching"],
    },
    {
      title: "Landscape Photography",
      description: "Capture stunning scenery with planning, composition, and light.",
      price: 54.99,
      chapters: ["Planning a Shoot", "Composition", "Golden Hour", "Editing Landscapes"],
    },
    {
      title: "Street Photography",
      description: "Tell stories on the street with candid, decisive moments.",
      price: 44.99,
      chapters: ["Gear & Settings", "Capturing Moments", "Light & Shadow", "Storytelling"],
    },
    {
      title: "Photo Editing with Photoshop",
      description: "Master layers, masks, and retouching for polished images.",
      price: 59.99,
      chapters: ["Workspace Basics", "Layers & Masks", "Retouching", "Compositing"],
    },
    {
      title: "Smartphone Photography",
      description: "Shoot and edit great photos using just the phone in your pocket.",
      price: 19.99,
      chapters: ["Camera App Basics", "Composition Tips", "Editing on Mobile", "Sharing"],
    },
  ],
  "Accounting": [
    {
      title: "Accounting Fundamentals",
      description: "Debits, credits, and the financial statements every business needs.",
      price: 44.99,
      chapters: ["The Accounting Equation", "Journal Entries", "The Balance Sheet", "Income Statement"],
    },
    {
      title: "Bookkeeping for Small Business",
      description: "Keep clean books and stay tax-ready without an accounting degree.",
      price: 39.99,
      chapters: ["Setting Up Accounts", "Recording Transactions", "Reconciliation", "Tax Prep"],
    },
    {
      title: "Financial Statement Analysis",
      description: "Read and interpret statements to understand a business's health.",
      price: 54.99,
      chapters: ["Reading Statements", "Ratio Analysis", "Cash Flow", "Forecasting"],
    },
    {
      title: "Payroll Essentials",
      description: "Run payroll correctly: wages, deductions, taxes, and compliance.",
      price: 34.99,
      chapters: ["Payroll Basics", "Calculating Wages", "Deductions & Taxes", "Compliance"],
    },
    {
      title: "QuickBooks Fundamentals",
      description: "Manage invoicing, expenses, and reports in QuickBooks.",
      price: 49.99,
      chapters: ["Setup", "Invoicing", "Expenses", "Reports"],
    },
  ],
  "Engineering": [
    {
      title: "Intro to Electrical Engineering",
      description: "Circuits, Ohm's law, and the fundamentals of electronics.",
      price: 64.99,
      chapters: ["Voltage & Current", "Ohm's Law", "Series & Parallel", "Basic Circuits"],
    },
    {
      title: "Mechanical Engineering Basics",
      description: "Forces, materials, and how machines actually work.",
      price: 64.99,
      chapters: ["Statics & Forces", "Material Properties", "Simple Machines", "Thermodynamics Intro"],
    },
    {
      title: "Intro to Civil Engineering",
      description: "Understand structures, loads, and materials that shape the built world.",
      price: 64.99,
      chapters: ["Structures Overview", "Loads & Forces", "Materials", "Project Basics"],
    },
    {
      title: "CAD with AutoCAD",
      description: "Design precise 2D drawings and 3D models in AutoCAD.",
      price: 59.99,
      chapters: ["Interface", "2D Drawing", "Dimensions", "3D Modeling"],
    },
    {
      title: "Control Systems Basics",
      description: "Model and control dynamic systems with feedback and PID.",
      price: 69.99,
      chapters: ["System Modeling", "Feedback", "Stability", "PID Control"],
    },
    {
      title: "Renewable Energy Systems",
      description: "Explore solar, wind, storage, and how they connect to the grid.",
      price: 74.99,
      chapters: ["Solar Power", "Wind Energy", "Energy Storage", "Grid Integration"],
    },
  ],
  "Filming": [
    {
      title: "Filmmaking 101",
      description: "Plan, shoot, and edit your first short film end to end.",
      price: 74.99,
      chapters: ["Pre-Production", "Camera Movement", "Lighting a Scene", "Editing & Sound"],
    },
    {
      title: "Cinematic Video Editing",
      description: "Pacing, color, and sound design that make footage feel like cinema.",
      price: 59.99,
      chapters: ["Editing Workflow", "Cuts & Pacing", "Color Grading", "Sound Design"],
    },
    {
      title: "Documentary Filmmaking",
      description: "Tell true stories with research, interviews, and authentic editing.",
      price: 64.99,
      chapters: ["Research & Story", "Interviews", "B-Roll", "Editing for Truth"],
    },
    {
      title: "Drone Videography",
      description: "Capture cinematic aerial footage safely and skillfully.",
      price: 54.99,
      chapters: ["Drone Basics", "Flight Safety", "Cinematic Moves", "Aerial Editing"],
    },
    {
      title: "Color Grading in DaVinci",
      description: "Give your footage a cinematic look with professional grading.",
      price: 59.99,
      chapters: ["Resolve Basics", "Primary Grading", "Secondary Grading", "Looks & LUTs"],
    },
  ],
};

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function imageFor(title: string) {
  return `/course-images/${slugify(title)}.jpg?v=2`;
}

const INTRO_POOL = [
  "Welcome & Course Overview",
  "What You'll Learn",
  "Setting Up Your Environment",
  "Study Tips",
];

const PRACTICE_POOL = [
  "Hands-On Exercise",
  "Worked Example",
  "Practice Lab",
  "Common Mistakes to Avoid",
  "Tips & Best Practices",
  "Quick Quiz & Review",
  "Real-World Case Study",
];

const OUTRO_POOL = [
  "Putting It All Together",
  "Capstone Project",
  "Course Recap",
  "Where to Go From Here",
];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickSome<T>(pool: T[], count: number): T[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

// Build a realistic, varied curriculum (8-12 lessons) around a course's
// core topical chapters: intro lessons, the core topics (occasionally with a
// deeper follow-up), some practice/lab lessons, and a wrap-up.
function generateChapters(coreTopics: string[]) {
  const target = randInt(8, 12);
  const intro = pickSome(INTRO_POOL, randInt(1, 2));
  const outro = pickSome(OUTRO_POOL, randInt(1, 2));

  const core = [];
  for (const topic of coreTopics) {
    core.push(topic);
    if (Math.random() < 0.35) {
      const variants = [
        `${topic}: Going Deeper`,
        `${topic} in Practice`,
        `More on ${topic}`,
      ];
      core.push(variants[randInt(0, variants.length - 1)]);
    }
  }

  const practice = [];
  const practicePool = shuffle(PRACTICE_POOL);
  let needed = target - intro.length - core.length - outro.length;
  let poolIndex = 0;
  let bonus = 1;
  while (needed > 0) {
    if (poolIndex < practicePool.length) {
      practice.push(practicePool[poolIndex++]);
    } else {
      practice.push(`Bonus Lab ${bonus++}`);
    }
    needed--;
  }

  let chapters = [...intro, ...core, ...practice, ...outro];

  // If the core topics alone overshot the cap, trim the middle while keeping
  // the intro and wrap-up so it still reads like a real curriculum.
  if (chapters.length > 12) {
    const head = intro.length;
    const tail = outro.length;
    const middle = chapters.slice(head, chapters.length - tail).slice(0, 12 - head - tail);
    chapters = [...chapters.slice(0, head), ...middle, ...chapters.slice(chapters.length - tail)];
  }

  return chapters;
}

async function main() {
  try {
    // Make the script idempotent: remove previously seeded courses first.
    await database.course.deleteMany({ where: { userId: SEED_USER_ID } });

    const categories = await database.category.findMany();
    const categoryByName = new Map(
      categories.map((c: { name: string; id: string }) => [c.name, c.id])
    );

    let courseCount = 0;
    let chapterCount = 0;

    for (const [categoryName, courses] of Object.entries(COURSES_BY_CATEGORY)) {
      const categoryId = categoryByName.get(categoryName);
      if (!categoryId) {
        console.log(`Skipping "${categoryName}" - category not found (run scripts/seed.ts first)`);
        continue;
      }

      for (const course of courses) {
        const chapterTitles = generateChapters(course.chapters);

        await database.course.create({
          data: {
            userId: SEED_USER_ID,
            title: course.title,
            description: course.description,
            imageUrl: imageFor(course.title),
            price: course.price,
            isPublished: true,
            categoryId,
            chapters: {
              create: chapterTitles.map((chapterTitle, index) => ({
                title: chapterTitle,
                description: `${chapterTitle} - a focused lesson with clear explanations and practical examples.`,
                position: index + 1,
                isPublished: true,
                // Offer the first couple of lessons as a free preview.
                isFree: index < 2,
                ...muxVideoFields(),
              })),
            },
          },
        });
        courseCount += 1;
        chapterCount += chapterTitles.length;
      }
    }

    console.log(`Success: created ${courseCount} courses and ${chapterCount} chapters.`);
  } catch (error) {
    console.log("Error seeding courses", error);
  } finally {
    await database.$disconnect();
  }
}

main();
