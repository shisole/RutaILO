/**
 * Generate simple placeholder PWA icons using raw PNG encoding.
 * Creates solid blue squares with no external dependencies.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

function createPNG(size, bgColor) {
  // Create raw pixel data (RGBA)
  const width = size;
  const height = size;

  // Each row has a filter byte (0) + width * 4 bytes (RGBA)
  const rawData = Buffer.alloc(height * (1 + width * 4));

  const [r, g, b] = bgColor;

  // Draw a solid colored square with a lighter "R" letter in the center
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // filter: none

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Check if this pixel is part of the letter "R"
      const isLetter = isPartOfR(x, y, width, height);

      if (isLetter) {
        rawData[pixelOffset] = 255;     // R
        rawData[pixelOffset + 1] = 255; // G
        rawData[pixelOffset + 2] = 255; // B
        rawData[pixelOffset + 3] = 255; // A
      } else {
        rawData[pixelOffset] = r;       // R
        rawData[pixelOffset + 1] = g;   // G
        rawData[pixelOffset + 2] = b;   // B
        rawData[pixelOffset + 3] = 255; // A
      }
    }
  }

  // Compress the raw data
  const compressed = zlib.deflateSync(rawData);

  // Build PNG file
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk("IHDR", ihdrData);

  // IDAT chunk
  const idat = createChunk("IDAT", compressed);

  // IEND chunk
  const iend = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type, "ascii");
  const crcData = Buffer.concat([typeBuffer, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buf) {
  // CRC32 lookup table
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      if (c & 1) {
        c = 0xEDB88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[i] = c;
  }

  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function isPartOfR(x, y, width, height) {
  // Define the "R" letter region relative to the icon size
  const margin = Math.floor(width * 0.25);
  const letterWidth = width - margin * 2;
  const letterHeight = height - margin * 2;

  // Normalize coordinates to letter space
  const lx = x - margin;
  const ly = y - margin;

  if (lx < 0 || lx >= letterWidth || ly < 0 || ly >= letterHeight) {
    return false;
  }

  const strokeWidth = Math.max(Math.floor(letterWidth * 0.16), 2);
  const halfHeight = Math.floor(letterHeight / 2);

  // Left vertical stroke
  if (lx < strokeWidth) {
    return true;
  }

  // Top horizontal stroke
  if (ly < strokeWidth && lx < letterWidth * 0.7) {
    return true;
  }

  // Middle horizontal stroke
  if (ly >= halfHeight - Math.floor(strokeWidth / 2) && ly < halfHeight + Math.ceil(strokeWidth / 2) && lx < letterWidth * 0.7) {
    return true;
  }

  // Right vertical stroke of the bump (top half)
  if (lx >= letterWidth * 0.7 - strokeWidth && lx < letterWidth * 0.7 && ly >= strokeWidth && ly < halfHeight) {
    return true;
  }

  // Diagonal leg (bottom half)
  const diagStartX = strokeWidth;
  const diagStartY = halfHeight;
  const diagEndX = letterWidth * 0.75;
  const diagEndY = letterHeight;

  if (ly >= halfHeight) {
    const progress = (ly - diagStartY) / (diagEndY - diagStartY);
    const expectedX = diagStartX + progress * (diagEndX - diagStartX);
    if (lx >= expectedX - strokeWidth / 2 && lx <= expectedX + strokeWidth / 2) {
      return true;
    }
  }

  return false;
}

// Generate icons
const blueColor = [37, 99, 235]; // #2563EB

const icon192 = createPNG(192, blueColor);
writeFileSync(join(publicDir, "icon-192.png"), icon192);
console.log("Created icon-192.png (" + icon192.length + " bytes)");

const icon512 = createPNG(512, blueColor);
writeFileSync(join(publicDir, "icon-512.png"), icon512);
console.log("Created icon-512.png (" + icon512.length + " bytes)");
