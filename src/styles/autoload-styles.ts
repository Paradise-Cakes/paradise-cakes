// Auto-import all non-module SCSS files under /src
import.meta.glob(
    ['/src/**/*.scss', '!/src/**/*.module.scss', '!/src/**/_*.scss'],
    { eager: true }
  );
  
  // Notes:
  // - excludes *.module.scss (so CSS Modules still work if you use them elsewhere)
  // - excludes partials starting with _*.scss (optional; remove if you want them too)
  