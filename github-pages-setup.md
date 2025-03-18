# GitHub Pages Setup Guide

Follow these steps to enable GitHub Pages for your AP Computer Science A Interactive Cheatsheet:

1. Go to your GitHub repository at https://github.com/itshasanaslan/AP-CS-A-CheatSheet

2. Click on the **Settings** tab in the top navigation menu

3. In the left sidebar, scroll down to the **Pages** section under "Code and automation"

4. Under "Build and deployment":
   - For "Source", select **Deploy from a branch**
   - For "Branch", select **master** from the dropdown
   - Keep the folder as **/ (root)**
   - Click **Save**

5. Wait a few minutes for GitHub to build and deploy your site

6. Once deployed, your site will be available at:
   https://itshasanaslan.github.io/AP-CS-A-CheatSheet/

## Notes

- The `.nojekyll` file has been added to bypass Jekyll processing, which is not needed for this HTML/CSS/JavaScript site
- The `dynamic-paths.js` script handles URL path differences between local development and GitHub Pages deployment
- The repository includes a `404.html` page for any broken links

## Troubleshooting

If your site doesn't appear after a few minutes:

1. Check if there are any build errors in the Actions tab of your repository
2. Verify that the `.nojekyll` file is present in the root of the repository
3. Make sure all file paths in your HTML files are relative (avoid absolute paths)

## After Deployment

Once your site is live, update the README.md with the correct link to your GitHub Pages site. 