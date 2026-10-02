import fs from "node:fs";

export function episodeCoverReference(id: string) {
  return `../cover/episode${id}.jpg`;
}

export function isJpegImage(filePath: string) {
  const signature = Buffer.alloc(3);
  const file = fs.openSync(filePath, "r");
  try {
    fs.readSync(file, signature, 0, signature.length, 0);
  } finally {
    fs.closeSync(file);
  }
  return signature[0] === 0xff && signature[1] === 0xd8 && signature[2] === 0xff;
}
