// src/app/api/encrypt/route.ts
import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const HASH_SALT_KEY = process.env.NEXT_PUBLIC_HASH_SALT_KEY;

if (!HASH_SALT_KEY) {
  throw new Error("HASH_SALT_KEY is not defined in environment variables");
}
const deriveKey = (key: string): string => {
  return CryptoJS.SHA256(key).toString(CryptoJS.enc.Hex).slice(0, 32);
};
const key =
  HASH_SALT_KEY.length === 32 ? HASH_SALT_KEY : deriveKey(HASH_SALT_KEY);

export async function POST(req: NextRequest) {
  const { title, message } = await req.json();

  if (!title || !message) {
    return NextResponse.json(
      { error: "Title and message are required" },
      { status: 400 }
    );
  }

  const titleBytes = new TextEncoder().encode(title);
  const messageBytes = new TextEncoder().encode(message);

  if (titleBytes.length > 55) {
    return NextResponse.json(
      { error: "Title exceeds 55 bytes" },
      { status: 400 }
    );
  }
  if (messageBytes.length > 610) {
    return NextResponse.json(
      { error: "Message exceeds 840 bytes" },
      { status: 400 }
    );
  }

  const encryptedTitle = CryptoJS.AES.encrypt(title, key, {
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  }).toString(); // keep the full string
  const encryptedMessage = CryptoJS.AES.encrypt(message, key, {
    mode: CryptoJS.mode.CTR,
    padding: CryptoJS.pad.NoPadding,
  }).toString();

  return NextResponse.json(
    { encryptedTitle, encryptedMessage },
    { status: 200 }
  );
}
