"use client";

import { usePathname } from "next/navigation";
import SubNav from "@/components/SubNav";

export default function NavWrapper() {
  const pathname = usePathname();
  return <SubNav hideLinks={pathname !== "/"} />;
}
