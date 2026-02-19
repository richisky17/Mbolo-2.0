"use client";

import { useEffect } from "react";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const DemoBanner = () => {
  useEffect(() => {
    if (IS_DEMO) {
      document.body.setAttribute('data-demo', 'true');
    } else {
      document.body.removeAttribute('data-demo');
    }
    
    return () => {
      document.body.removeAttribute('data-demo');
    };
  }, []);

  if (!IS_DEMO) return null;

  return (
    <div className="demo-mode-banner">
      <strong>⚠️ READ-ONLY DEMO MODE</strong> • This is a demonstration version. All editing, creation, and deletion features are disabled.
    </div>
  );
};

