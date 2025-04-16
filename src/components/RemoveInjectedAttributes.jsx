'use client';
import { useEffect } from 'react';

export default function RemoveInjectedAttributes({ children }) {
  useEffect(() => {
    // Remove attributes injected by browser extensions like Grammarly.
    document.body.removeAttribute('data-new-gr-c-s-check-loaded');
    document.body.removeAttribute('data-gr-ext-installed');
  }, []);

  return children;
}
