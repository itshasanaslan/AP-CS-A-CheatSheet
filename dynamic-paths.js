/**
 * Dynamic paths handler for AP Computer Science A Cheatsheet
 * This script adjusts paths based on the GitHub Pages deployment environment
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the base URL for the site (helps with GitHub Pages deployment)
  const getBaseUrl = () => {
    // Get the current URL path
    const currentPath = window.location.pathname;
    // If we're on GitHub Pages, the path may include the repository name
    // This regex extracts the repository name if present
    const repoMatch = currentPath.match(/\/([^\/]+)\/(?:index\.html|unit\d+\.html|$)/);
    
    if (repoMatch && repoMatch[1] !== '') {
      // We're on GitHub Pages with a repository name in the URL
      return '/' + repoMatch[1] + '/';
    } else {
      // We're either on localhost or GitHub Pages with a custom domain
      return '/';
    }
  };

  const baseUrl = getBaseUrl();
  
  // Update links in the sidebar to use the correct base URL
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    // Only update relative links (not full URLs)
    if (href && !href.startsWith('http') && !href.startsWith(baseUrl)) {
      link.setAttribute('href', baseUrl + href.replace(/^\//, ''));
    }
  });
  
  // Update navigation buttons (previous/next)
  document.querySelectorAll('.main-content a.btn').forEach(button => {
    const href = button.getAttribute('href');
    // Only update relative links (not full URLs)
    if (href && !href.startsWith('http') && !href.startsWith(baseUrl)) {
      button.setAttribute('href', baseUrl + href.replace(/^\//, ''));
    }
  });
  
  // Update the home button on the 404 page if it exists
  const homeButton = document.querySelector('.home-button');
  if (homeButton) {
    const href = homeButton.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith(baseUrl)) {
      homeButton.setAttribute('href', baseUrl + href.replace(/^\//, ''));
    }
  }
  
  console.log('Dynamic paths updated with base URL: ' + baseUrl);
}); 