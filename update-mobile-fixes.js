/**
 * Script to update all unit HTML files with mobile sidebar fixes
 * 
 * Usage: node update-mobile-fixes.js
 */

const fs = require('fs');
const path = require('path');

// Get list of all unit HTML files
const unitFiles = [];
for (let i = 1; i <= 10; i++) {
  unitFiles.push(`unit${i}.html`);
}

// Read the template file (unit1.html) which has been fixed
console.log('Reading template file (unit1.html)...');
const templateFilePath = path.join(__dirname, 'unit1.html');
const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

// Extract the head section with Font Awesome
const headRegex = /<head>[\s\S]*?<\/head>/;
const headMatch = templateContent.match(headRegex);
const headSection = headMatch ? headMatch[0] : '';

// Extract the sidebar toggle button and overlay HTML
const sidebarToggleRegex = /<!-- Sidebar Toggle Button -->[\s\S]*?<div class="container-fluid">/;
const sidebarToggleMatch = templateContent.match(sidebarToggleRegex);
const sidebarToggleSection = sidebarToggleMatch ? sidebarToggleMatch[0] : '';

// Extract the JavaScript functions for mobile behavior
const jsRegex = /<script>[\s\S]*?<\/script>/g;
const jsMatches = [...templateContent.matchAll(jsRegex)];
const mainJsSection = jsMatches.length >= 1 ? jsMatches[0][0] : '';

// Process each unit file
console.log('Updating unit files...');
unitFiles.forEach(unitFile => {
  if (unitFile === 'unit1.html') {
    console.log(`Skipping ${unitFile} (template file)`);
    return;
  }
  
  const filePath = path.join(__dirname, unitFile);
  if (!fs.existsSync(filePath)) {
    console.log(`File ${unitFile} not found, skipping`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Update the head section to include Font Awesome if needed
  if (!content.includes('font-awesome')) {
    content = content.replace(/<head>[\s\S]*?<\/head>/, headSection);
  }
  
  // Update the sidebar toggle button and overlay
  content = content.replace(/<!-- Sidebar Toggle Button -->[\s\S]*?<div class="container-fluid">/, sidebarToggleSection);
  
  // Add unitList ID to the navigation if missing
  if (!content.includes('id="unitList"')) {
    content = content.replace(/<ul class="nav flex-column">/, '<ul class="nav flex-column" id="unitList">');
  }
  
  // Update the JavaScript functions
  const jsCount = (content.match(/<script>/g) || []).length;
  
  if (jsCount >= 1) {
    // Replace the main JavaScript section
    content = content.replace(/<script>[\s\S]*?<\/script>/, mainJsSection);
  }
  
  // Write back the updated content
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${unitFile}`);
});

console.log('All unit files have been updated with mobile sidebar fixes.'); 