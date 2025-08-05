"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "light" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast border-2 rounded-md px-4 py-3
            group-[.toaster]:bg-[#F8F8FF]
            group-[.toaster]:text-[#3E3B39]
            group-[.toaster]:border-[#CAC9CD]
            group-[.toaster]:shadow-md
          `,
          description: "group-[.toast]:text-[#6D6A6A]",
          actionButton: `
            group-[.toast]:bg-[#3E3B39]
            group-[.toast]:text-[#F8F8FF]
            group-[.toast]:rounded-md
            group-[.toast]:px-3
            group-[.toast]:py-1
            group-[.toast]:hover:bg-[#2E2B29]
          `,
          cancelButton: `
            group-[.toast]:bg-[#CAC9CD]
            group-[.toast]:text-[#3E3B39]
            group-[.toast]:rounded-md
            group-[.toast]:px-3
            group-[.toast]:py-1
            group-[.toast]:hover:bg-[#B5B4B8]
          `,
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
