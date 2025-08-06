import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend default Next.js + TypeScript config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override or disable rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn", // optional: show warning instead of error
      "react/no-unescaped-entities": "off", // for `'` or `’` issues
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
