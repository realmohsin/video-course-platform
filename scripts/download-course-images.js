const fs = require("fs");
const path = require("path");
const https = require("https");

// Each course gets a unique, verified Unsplash photo ID.
const IMAGE_BY_TITLE = {
  "JavaScript Fundamentals": "photo-1461749280684-dccba630e2f6",
  "Data Structures & Algorithms": "photo-1516116216624-53e697fedbea",
  "Building APIs with Node.js": "photo-1558494949-ef010cbdcc31",
  "Python for Beginners": "photo-1526379095098-d400fd0bf935",
  "React from Scratch": "photo-1633356122544-f134324a6cee",
  "SQL & Databases": "photo-1544383835-bda2bc66a55d",
  "Intro to Machine Learning": "photo-1677442136019-21780ecad995",
  "Music Theory 101": "photo-1511671782779-c97d3d27a1d4",
  "Guitar for Beginners": "photo-1510915361894-db8b60106cb1",
  "Piano Essentials": "photo-1504384308090-c894fdcc538d",
  "Music Production with DAWs": "photo-1551650975-87deedd944c3",
  "Singing Fundamentals": "photo-1516280440614-37939bbacd81",
  "Songwriting Workshop": "photo-1556761175-b413da4baf72",
  "Strength Training Basics": "photo-1534438327276-14e5300c3a48",
  "Mobility & Flexibility": "photo-1544367567-0f2fcb009e0b",
  "HIIT for Fat Loss": "photo-1517836357463-d25dfeac3438",
  "Yoga for Beginners": "photo-1506126613408-eca07ce68773",
  "Nutrition for Athletes": "photo-1498837167922-ddd27525d352",
  "Photography Masterclass": "photo-1516035069371-29a1b244cc32",
  "Portrait Photography": "photo-1544005313-94ddf0286df2",
  "Landscape Photography": "photo-1506905925346-21bda4d32df4",
  "Street Photography": "photo-1477959858617-67f85cf4f1df",
  "Photo Editing with Photoshop": "photo-1611224923853-80b023f02d71",
  "Smartphone Photography": "photo-1606983340126-99ab4feaa64a",
  "Accounting Fundamentals": "photo-1554224155-6726b3ff858f",
  "Bookkeeping for Small Business": "photo-1454165804606-c3d57bc86b40",
  "Financial Statement Analysis": "photo-1551288049-bebda4e38f71",
  "Payroll Essentials": "photo-1560472354-b33ff0c44a43",
  "QuickBooks Fundamentals": "photo-1460925895917-afdab827c52f",
  "Intro to Electrical Engineering": "photo-1518770660439-4636190af475",
  "Mechanical Engineering Basics": "photo-1581091226825-a6a2a5aee158",
  "Intro to Civil Engineering": "photo-1541888946425-d81bb19240f5",
  "CAD with AutoCAD": "photo-1581092918056-0c4c3acd3789",
  "Control Systems Basics": "photo-1555066931-4365d14bab8c",
  "Renewable Energy Systems": "photo-1498050108023-c5249f4df085",
  "Filmmaking 101": "photo-1485846234645-a62644f84728",
  "Cinematic Video Editing": "photo-1574717024653-61fd2cf4d44d",
  "Documentary Filmmaking": "photo-1492691527719-9d1e07e534b4",
  "Drone Videography": "photo-1526304640581-d334cdbbf45e",
  "Color Grading in DaVinci": "photo-1553877522-43269d4ea984",
};

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function download(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          download(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function main() {
  const outDir = path.join(__dirname, "..", "public", "course-images");
  fs.mkdirSync(outDir, { recursive: true });

  const photoIds = Object.values(IMAGE_BY_TITLE);
  const uniqueIds = new Set(photoIds);
  if (uniqueIds.size !== photoIds.length) {
    const seen = new Set();
    const dupes = [];
    for (const [title, id] of Object.entries(IMAGE_BY_TITLE)) {
      if (seen.has(id)) dupes.push(title);
      seen.add(id);
    }
    throw new Error(`Duplicate photo IDs for: ${dupes.join(", ")}`);
  }

  let ok = 0;
  let failed = 0;

  for (const [title, photoId] of Object.entries(IMAGE_BY_TITLE)) {
    const filename = `${slugify(title)}.jpg`;
    const outPath = path.join(outDir, filename);
    const url = `https://images.unsplash.com/${photoId}?w=640&h=360&fit=crop&auto=format&q=80`;

    try {
      const buffer = await download(url);
      fs.writeFileSync(outPath, buffer);
      console.log("Saved", filename);
      ok++;
    } catch (error) {
      console.log("Failed", title, error.message);
      failed++;
    }
  }

  console.log(`Done: ${ok} saved, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
