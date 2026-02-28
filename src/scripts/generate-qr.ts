import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { stops } from "../data/stops";

const BASE_URL = "https://rutailo.com";
const OUTPUT_DIR = path.resolve(__dirname, "../../public/qr");

async function main() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const stopIds = Object.keys(stops);
  let count = 0;

  for (const stopId of stopIds) {
    const url = `${BASE_URL}/s/${stopId}`;
    const outputPath = path.join(OUTPUT_DIR, `${stopId}.png`);

    await QRCode.toFile(outputPath, url, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    count++;
    console.log(`Generated: ${outputPath}`);
  }

  console.log(`\nDone! Generated ${count} QR codes in ${OUTPUT_DIR}`);
}

main().catch((error) => {
  console.error("Error generating QR codes:", error);
  process.exit(1);
});
