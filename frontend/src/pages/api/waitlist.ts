import { supabase } from "@/utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email is required" });
  }

  const trimmedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email: trimmedEmail }]);

    if (error) {
      if (error.code === "23505") {
        // Unique violation
        return res
          .status(200)
          .json({ message: "You are already on the waitlist." });
      }
      throw error;
    }

    return res.status(200).json({
      message: "Thanks for joining! We'll notify you when Journl hits mainnet.",
    });
  } catch (error) {
    console.error("Error inserting email:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
