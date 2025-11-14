/**
 * Combines multiple class names into a single string, filtering out any falsy values.
 * This is useful for conditionally applying classes in React components.
 *
 * @param {...string} classes - The class names to be combined.
 * @returns {string} A string of combined class names.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  /**
   * Formats a date string into a more readable format.
   * 
   * @param {string} dateString - The date string to format (e.g., "2023-04-15")
   * @returns {string} A formatted date string (e.g., "15 Apr 2023")
   */
  export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  /**
   * Truncates a string to a specified length and adds an ellipsis if truncated.
   * 
   * @param {string} str - The string to truncate
   * @param {number} length - The maximum length of the truncated string
   * @returns {string} The truncated string
   */
  export function truncateString(str, length) {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }
  
  /**
   * Generates a random color in hexadecimal format.
   * 
   * @returns {string} A random color in hex format (e.g., "#FF00FF")
   */
  export function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
  
  