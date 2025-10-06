"use client";

import { useEffect } from "react";

export default function GovUkInit() {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const body = document.body;

    if (!body.classList.contains("js-enabled")) {
      body.classList.add("js-enabled");
    }

    if ("noModule" in HTMLScriptElement.prototype) {
      body.classList.add("govuk-frontend-supported");
    }

    const initGovUkFrontend = async () => {
      const { initAll } = await import("govuk-frontend");
      initAll();
    };

    void initGovUkFrontend();
  }, []);

  return null;
}
