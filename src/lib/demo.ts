/**
 * Demo Mode Configuration
 * When enabled, the admin panel becomes read-only for public demonstrations
 */

export const isDemoMode = () => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
};

export const DEMO_MESSAGE = "⚠️ Demo Mode: Editing is not allowed. This is a read-only demonstration.";
export const DEMO_DELETE_MESSAGE = "⚠️ Demo Mode: Deletion is not allowed. This is a read-only demonstration.";
export const DEMO_CREATE_MESSAGE = "⚠️ Demo Mode: Creating new records is not allowed. This is a read-only demonstration.";
export const DEMO_EXPORT_MESSAGE = "⚠️ Demo Mode: Export is disabled in the demo version.";

