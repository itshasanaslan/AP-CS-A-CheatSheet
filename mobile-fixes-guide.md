# Mobile Sidebar Fixes Guide

This guide explains how to update all your unit HTML files with the mobile sidebar fixes that have been implemented in `unit1.html`.

## Changes Made to unit1.html

1. **CSS Updates**:
   - Added proper z-index values
   - Improved sidebar behavior on mobile
   - Added an overlay for clicking outside the sidebar to close it
   - Enhanced the toggle button styling
   - Fixed iOS Safari position issues

2. **HTML Updates**:
   - Added Font Awesome for icons
   - Added a sidebar overlay element
   - Updated the toggle button to use a Font Awesome icon
   - Added `id="unitList"` to the navigation list

3. **JavaScript Updates**:
   - Improved the `toggleSidebar()` function to handle the overlay
   - Added a `closeSidebar()` function
   - Added proper event listeners instead of inline onclick attributes
   - Added window resize handling
   - Auto-closes sidebar when links are clicked on mobile

## How to Update Other Unit Files

### For Each Unit File (unit2.html through unit10.html):

1. **Add Font Awesome**:
   ```html
   <!-- In the head section, add Font Awesome if not present -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
   ```

2. **Update the sidebar toggle button and add overlay**:
   ```html
   <!-- Replace the existing toggle button -->
   <button class="btn btn-primary sidebar-toggle" id="sidebarToggle" aria-label="Toggle navigation">
     <i class="fas fa-bars"></i>
   </button>

   <!-- Add this after the toggle button -->
   <div class="sidebar-overlay" id="sidebarOverlay"></div>
   ```

3. **Add ID to the navigation list**:
   ```html
   <!-- Change this -->
   <ul class="nav flex-column">

   <!-- To this -->
   <ul class="nav flex-column" id="unitList">
   ```

4. **Replace the JavaScript functions**:
   ```javascript
   // Function to toggle the sidebar
   function toggleSidebar() {
     const sidebar = document.getElementById('sidebar');
     const toggleBtn = document.getElementById('sidebarToggle');
     const overlay = document.getElementById('sidebarOverlay');
     
     sidebar.classList.toggle('active');
     toggleBtn.classList.toggle('active');
     
     // Change icon based on state
     const icon = toggleBtn.querySelector('i');
     if (sidebar.classList.contains('active')) {
       icon.classList.remove('fa-bars');
       icon.classList.add('fa-times');
     } else {
       icon.classList.remove('fa-times');
       icon.classList.add('fa-bars');
     }
     
     // Toggle overlay on mobile
     if (window.innerWidth <= 768) {
       overlay.classList.toggle('active');
       
       // Prevent body scrolling when sidebar is open
       if (!sidebar.classList.contains('active')) {
         document.body.style.overflow = 'hidden';
       } else {
         document.body.style.overflow = '';
       }
     }
   }
   
   // Function to close sidebar
   function closeSidebar() {
     const sidebar = document.getElementById('sidebar');
     const toggleBtn = document.getElementById('sidebarToggle');
     const overlay = document.getElementById('sidebarOverlay');
     
     // Add active to sidebar to hide it (our CSS transitions sidebar out when active)
     sidebar.classList.add('active');
     toggleBtn.classList.remove('active');
     
     // Update icon
     const icon = toggleBtn.querySelector('i');
     icon.classList.remove('fa-times');
     icon.classList.add('fa-bars');
     
     overlay.classList.remove('active');
     document.body.style.overflow = '';
   }

   // Close sidebar when window is resized beyond mobile breakpoint
   window.addEventListener('resize', function() {
     if (window.innerWidth > 768) {
       const overlay = document.getElementById('sidebarOverlay');
       overlay.classList.remove('active');
       document.body.style.overflow = '';
     }
   });
   ```

5. **Update the DOMContentLoaded event handler**:
   ```javascript
   // Initialize progress
   document.addEventListener('DOMContentLoaded', function() {
     updateProgress();
     markUnitAsCompleted();
     
     // Add event listeners
     document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
     document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
     
     // Auto-close sidebar on link click for mobile
     if (window.innerWidth <= 768) {
       document.querySelectorAll('.sidebar .nav-link').forEach(link => {
         link.addEventListener('click', function() {
           closeSidebar();
         });
       });
     }
   });
   ```

## Updating styles.css

Make sure to update your `styles.css` file with the changes from `unit1.html`. The key changes are:

```css
body {
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.cheatsheet-banner {
  z-index: 1020;
}

.sidebar {
  z-index: 1010;
  overflow-y: auto; /* Allow scrolling within sidebar */
  -webkit-overflow-scrolling: touch; /* Better scrolling on iOS */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-toggle {
  z-index: 1030; /* Higher than other elements */
  border-radius: 50%;
  width: 45px;
  height: 45px;
  padding: 0;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Overlay to close sidebar when clicked outside on mobile */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1005;
  display: none;
}

.sidebar-overlay.active {
  display: block;
}

@media (max-width: 768px) {
  .sidebar {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Stronger shadow for visibility */
  }

  .main-content {
    padding-top: 20px; /* Add some space at the top */
  }

  .sidebar-toggle {
    transition: left 0.3s ease;
  }
  
  .sidebar-toggle.active {
    left: 260px; /* Move toggle button when sidebar is open */
  }
}

/* Make sure the toggle button is accessible on small screens */
@media (max-width: 350px) {
  .sidebar-toggle {
    top: 65px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 0.9rem;
  }
}

/* Fix for iOS Safari issues with position: fixed */
@supports (-webkit-overflow-scrolling: touch) {
  .sidebar {
    position: absolute;
  }

  .sidebar-toggle {
    position: absolute;
  }
  
  .cheatsheet-banner {
    position: absolute;
  }
}
```

## Testing

After updating your files, test on mobile devices and ensure:

1. The sidebar correctly slides in and out
2. Clicking outside the sidebar closes it
3. Scrolling works properly within the sidebar
4. The toggle button works correctly
5. The unit navigation links work properly 