"use client";

import { useEffect } from "react";
import { startKeepAlive } from "@/lib/keep-alive";

export default function KeepAliveWrapper() {
  useEffect(() => {
    startKeepAlive();
  }, []);

  return null;
}
