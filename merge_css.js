const fs = require('fs');

let boot = fs.readFileSync('original_bootstrap.css', 'utf8');
let verif = fs.readFileSync('original_verification.css', 'utf8');
let pscroll = fs.existsSync('original_041.css') ? fs.readFileSync('original_041.css', 'utf8') : '';

// 1. Remove @font-face rules referencing non-existent local ../media/ files
boot = boot.replace(/@font-face\s*\{[^}]*url\([^}]*media[^}]*\)[^}]*\}/gi, '');
verif = verif.replace(/@font-face\s*\{[^}]*url\([^}]*media[^}]*\)[^}]*\}/gi, '');

// 2. Replace any remaining url(../media/...) references with none
boot = boot.replace(/url\(\.\.\/media\/[^)]+\)/gi, 'none');
verif = verif.replace(/url\(\.\.\/media\/[^)]+\)/gi, 'none');

// 3. Google Cairo Font Import
const fontImport = `@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap");\n\n`;

// 4. Exact overrides to ensure 100% Arabic typography, RTL alignment, and crisp icons matching live Ajeer
const overrides = `
/* Global typography & RTL layout matching live Ajeer */
html, body, .qiwa-ajeer-app, .verification-document, .verification-header, .verification-table, .mainFooter, .mainHeader, th, td, h1, strong, p, a, div, span, input, button, select, textarea {
  font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  direction: rtl;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f7f8f7;
  color: #071017;
  text-align: right;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Verification document styling matching target exactly */
.verification-document {
  margin: 0 auto;
  border: 1px solid #cfd3d8;
  background-color: #fbfcfb;
}

/* SVG icons styling for Twitter, Telegram, Phone */
.footer-x-icon {
  width: 1.4rem;
  height: 1.45rem;
}

.footer-send-icon {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231f2548'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  vertical-align: middle;
}

.footer-phone-icon {
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231f2548'%3E%3Cpath d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  vertical-align: middle;
}
`;

const combined = fontImport + boot + '\n\n' + pscroll + '\n\n' + verif + '\n\n' + overrides;
fs.writeFileSync('app/globals.css', combined);
console.log('Successfully wrote combined CSS to app/globals.css. Total size:', combined.length);
