"use client";

import { useEffect } from "react";

export default function RemoveClerkBanner() {
  useEffect(() => {
    // Function to remove Clerk banner - more targeted approach
    const removeBanner = () => {
      // Only target specific banner-related selectors
      const selectors = [
        '[data-clerk-powered-by]',
        '.cl-poweredBy',
        '.cl-poweredByClerk',
        '.cl-footerBadge',
        '.cl-badge',
        '.cl-devModeBadge',
        '[class*="poweredBy"]:not([class*="modal"]):not([class*="card"]):not([class*="form"]):not([class*="button"])',
        '[class*="PoweredBy"]:not([class*="modal"]):not([class*="card"]):not([class*="form"]):not([class*="button"])',
        '[class*="clerk-badge"]:not([class*="modal"]):not([class*="card"]):not([class*="form"]):not([class*="button"])',
        '[class*="cl-poweredBy"]:not([class*="modal"]):not([class*="card"]):not([class*="form"]):not([class*="button"])',
        '[class*="cl-footerBadge"]:not([class*="modal"]):not([class*="card"]):not([class*="form"]):not([class*="button"])',
      ];

      selectors.forEach((selector) => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            if (el instanceof HTMLElement) {
              // Only hide if it's positioned at bottom (typical banner position)
              const computedStyle = window.getComputedStyle(el);
              const position = computedStyle.position;
              const bottom = computedStyle.bottom;
              
              // Check if it's likely a banner (fixed/sticky at bottom) or has banner classes
              const isBanner = 
                (position === 'fixed' || position === 'sticky') ||
                el.classList.contains('cl-poweredBy') ||
                el.classList.contains('cl-footerBadge') ||
                el.classList.contains('cl-badge') ||
                el.hasAttribute('data-clerk-powered-by');
              
              if (isBanner) {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.height = '0';
                el.style.width = '0';
                el.style.overflow = 'hidden';
                el.style.pointerEvents = 'none';
              }
            }
          });
        } catch (e) {
          // Ignore selector errors
        }
      });

      // More targeted text-based removal - only check elements with specific banner classes
      // Only check divs that already have banner-related classes
      const bannerDivs = document.querySelectorAll('div[class*="poweredBy"], div[class*="PoweredBy"], div[class*="clerk-badge"], div[class*="cl-poweredBy"], div[class*="cl-footerBadge"]');
      bannerDivs.forEach((div) => {
        const computedStyle = window.getComputedStyle(div);
        const position = computedStyle.position;
        
        // Only target if it's positioned at bottom AND has banner text
        if (position === 'fixed' || position === 'sticky') {
          const text = div.textContent || '';
          // Be very specific - only remove if it's clearly the banner
          if (text.includes('Secured by Clerk') || text.includes('Development mode')) {
            // Double-check it's not inside a modal, form, or dialog
            if (!div.closest('[class*="modal"]') && 
                !div.closest('[class*="card"]') && 
                !div.closest('[class*="form"]') &&
                !div.closest('[role="dialog"]') &&
                !div.closest('[class*="cl-modal"]') &&
                !div.closest('[class*="cl-card"]')) {
              if (div instanceof HTMLElement) {
                div.style.display = 'none';
                div.style.visibility = 'hidden';
                div.style.opacity = '0';
                div.style.height = '0';
                div.style.width = '0';
                div.style.pointerEvents = 'none';
              }
            }
          }
        }
      });
    };

    // Run after a short delay to ensure DOM is ready
    const timeout = setTimeout(removeBanner, 100);
    const timeout2 = setTimeout(removeBanner, 500);
    const timeout3 = setTimeout(removeBanner, 1000);

    // Use MutationObserver but be more selective
    const observer = new MutationObserver((mutations) => {
      let shouldRun = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // Only trigger if it looks like a banner was added
            if (
              node.classList.contains('cl-poweredBy') ||
              node.classList.contains('cl-footerBadge') ||
              node.hasAttribute('data-clerk-powered-by') ||
              (node.textContent?.includes('Secured by Clerk') && 
               window.getComputedStyle(node).position === 'fixed')
            ) {
              shouldRun = true;
            }
          }
        });
      });
      if (shouldRun) {
        removeBanner();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      observer.disconnect();
    };
  }, []);

  return null;
}

