// src/app/api/decrypt/route.ts
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
  try {
    const { encryptedTitle, encryptedMessage } = await req.json();

    if (!encryptedTitle || !encryptedMessage) {
      return NextResponse.json(
        { error: "Encrypted title and message are required" },
        { status: 400 }
      );
    }

    // Decrypt the Base64-encoded ciphertext
    const decryptedTitle = CryptoJS.AES.decrypt(encryptedTitle, key, {
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    }).toString(CryptoJS.enc.Utf8);

    const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key, {
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding,
    }).toString(CryptoJS.enc.Utf8);

    // Validate decryption success
    if (!decryptedTitle || !decryptedMessage) {
      return NextResponse.json({ error: "Decryption failed" }, { status: 400 });
    }

    return NextResponse.json(
      { decryptedTitle, decryptedMessage },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Decryption error:", error);
    return NextResponse.json({ error: "Decryption failed" }, { status: 500 });
  }
}
