/**
 * Structural UX polish verification — reads shipped CSS and asserts
 * the multi-surface polish pass is present (not a re-implementation).
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];

function load(rel) {
  const p = resolve(root, rel);
  if (!existsSync(p)) throw new Error(`Missing shipped file: ${rel}`);
  return readFileSync(p, "utf8");
}

function assert(name, cond, detail = "") {
  checks.push({ name, ok: Boolean(cond), detail });
  if (!cond) console.error(`FAIL: ${name}${detail ? " — " + detail : ""}`);
  else console.log(`OK:   ${name}`);
}

const app = load("src/App.css");
const footer = load("src/components/Footer.css");
const involvement = load("src/components/Involvement.css");
const projects = load("src/components/Projects.css");
const seminars = load("src/components/Seminars.css");
const nav = load("src/components/Nav.css");

// 1. Shared primary buttons: hover lift + active press + reduced motion
assert(
  "primary buttons hover lift",
  /\.atmos-btn-primary:hover[\s\S]*?transform:\s*translateY\(-1px\)/.test(app)
);
assert(
  "primary buttons active press",
  /\.atmos-btn-primary:active[\s\S]*?scale\(0\.98\)/.test(app)
);
assert(
  "primary buttons reduced-motion",
  /prefers-reduced-motion:\s*reduce[\s\S]*?\.atmos-btn-primary[\s\S]*?transform:\s*none/.test(app)
);

// 2. Footer nav pill hover
assert(
  "footer nav pill radius",
  /\.atmos-footer-nav-link[\s\S]*?border-radius:\s*999px/.test(footer)
);
assert(
  "footer nav hover tint",
  /\.atmos-footer-nav-link:hover[\s\S]*?background:\s*rgba\(197,\s*5,\s*12/.test(footer)
);

// 3. FAQ contact glass + hover
assert(
  "faq contact glass control",
  /\.faq-contact-card[\s\S]*?backdrop-filter:\s*var\(--atmos-glass-blur\)/.test(involvement)
);
assert(
  "faq contact hover lift",
  /\.faq-contact-card:hover[\s\S]*?translateY\(-2px\)/.test(involvement)
);

// 4. Project card lift + reduced motion
assert(
  "project card hover lift",
  /\.project-card:hover[\s\S]*?translateY\(-4px\)/.test(projects)
);
assert(
  "project card reduced-motion",
  /prefers-reduced-motion:\s*reduce[\s\S]*?\.project-card[\s\S]*?transform:\s*none/.test(projects)
);

// 5. Seminar card lift + reduced motion
assert(
  "seminar card hover lift",
  /\.atmos-sem-card:hover[\s\S]*?translateY\(-3px\)/.test(seminars)
);
assert(
  "seminar reduced-motion block",
  /prefers-reduced-motion:\s*reduce[\s\S]*?\.atmos-sem-card/.test(seminars)
);

// 6. Nav theme glass + CTA lift
assert(
  "theme toggle glass",
  /\.atmos-nav-theme-toggle[\s\S]*?backdrop-filter:\s*var\(--atmos-glass-blur\)/.test(nav)
);
assert(
  "nav CTA hover lift",
  /\.atmos-nav-cta:hover[\s\S]*?translateY\(-1px\)/.test(nav)
);
assert(
  "nav reduced-motion",
  /prefers-reduced-motion:\s*reduce[\s\S]*?\.atmos-nav-theme-toggle/.test(nav)
);

// No forbidden tooling in package.json for this pass
const pkg = JSON.parse(load("package.json"));
assert("no tailwind dependency", !pkg.dependencies?.tailwindcss && !pkg.devDependencies?.tailwindcss);

const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
if (failed.length) {
  process.exit(1);
}
