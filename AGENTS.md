# Mourey Tools - Agent Guidelines

## Build Commands
- `npm run build` - Generate tools index page
- `npm run generate:index` - Update homepage with tools list
- `node scripts/test-system.js` - Run system tests (9 tests total)

## Code Style Guidelines

### HTML/CSS
- Use semantic HTML5 elements
- Include global CSS: `<link rel="stylesheet" href="../global.css">` (adjust path depth)
- Use OpenCode-inspired design system from `global.css`
- Breadcrumb navigation: `<a href="/">Accueil</a>` (absolute path to root)
- Mobile-first responsive design with CSS Grid/Flexbox

### JavaScript
- ES6+ syntax, no frameworks required
- Client-side only processing (no backend)
- Use async/await for API calls
- Handle errors with try/catch and user-friendly messages
- No external dependencies in package.json

### File Structure
- Tools in `tools/{tool-name}/` folders
- Each tool needs `index.html` at folder root
- Use `tools/template/` as starting point
- Run `npm run generate:index` after adding new tools

### Naming Conventions
- Tool folders: kebab-case (`password-generator`)
- CSS classes: kebab-case following global.css patterns
- File names: lowercase with hyphens
- French language for UI text

### Security
- Never store API keys in code
- Use HTTPS for all external requests
- Client-side processing only
- No user data persistence