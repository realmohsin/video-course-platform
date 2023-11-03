const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIcoModule = require("png-to-ico");
const pngToIco = pngToIcoModule.default || pngToIcoModule;

async function main() {
  const svgPath = path.join(__dirname, "..", "app", "icon.svg");
  const svg = fs.readFileSync(svgPath);

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(svg, { density: 384 }).resize(size, size).png().toBuffer()
    )
  );

  const ico = await pngToIco(pngBuffers);
  const outPath = path.join(__dirname, "..", "app", "favicon.ico");
  fs.writeFileSync(outPath, ico);
  console.log(`Wrote ${outPath} (${ico.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
