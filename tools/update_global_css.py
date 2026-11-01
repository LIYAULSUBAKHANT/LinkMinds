with open('src/styles/global.css', 'r', encoding='utf-8') as f:
    css = f.read()

additional_css = """
/* Responsive Layout Grid & Alignment Fixes */
.login-container {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}

@media (min-width: 900px) {
  .login-container {
    grid-template-columns: 440px 1fr !important;
  }
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  width: 100%;
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1.2fr 0.8fr !important;
    align-items: center;
  }
}

.desktop-nav {
  display: none;
}

.mobile-menu-btn {
  display: flex;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex !important;
  }
  .mobile-menu-btn {
    display: none !important;
  }
}

/* Page fitting & layout containment */
html, body {
  max-width: 100vw;
  overflow-x: hidden;
}

main#main-content {
  box-sizing: border-box;
  max-width: 100%;
}

.gov-table-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Form input vertical alignment */
input, select, textarea {
  vertical-align: middle;
}

/* Image containment */
img {
  max-width: 100%;
  height: auto;
}
"""

if '.login-container' not in css:
    css += additional_css

with open('src/styles/global.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Updated global.css with layout and alignment classes')
