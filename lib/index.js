// Re-export from exportjs.js
import ExportJS from './exportjs.js';

// Export the default object as a global variable for browser usage
if (typeof window !== 'undefined') {
  window.ExportJS = ExportJS;
}

// Export individual functions for ES6 module imports
export const toCSV = ExportJS.toCSV;
export const support = ExportJS.support;

// Export the default object for CommonJS and AMD
export default ExportJS;