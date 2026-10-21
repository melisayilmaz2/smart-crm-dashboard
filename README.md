# Orbit CRM — Sales Pipeline Dashboard

A responsive, local-first CRM dashboard built with vanilla JavaScript, HTML and CSS. Designed as a portfolio demonstration of sales operations, customer relationship management and frontend implementation.

## Features
- Interactive sales pipeline (New → Contacted → Qualified → Proposal → Won/Lost)
- Add, edit and delete opportunities with input validation
- Search leads and filter by sales stage
- Sales KPIs: open pipeline value, opportunities, closed revenue and win rate
- LocalStorage persistence, no account or server required
- Responsive desktop and mobile layouts; safe HTML escaping for user-entered text

## Run locally
Open `index.html` in any modern browser. No installation or API keys required.

## Demo
Use **Add lead** to create a lead, **Edit** to move it through the pipeline, and **Reset demo** to restore eight fictional examples. Data is stored locally in your browser; no sensitive patient or client data is included.

## Architecture
`index.html` — UI semantic structure and form dialog  
`styles.css` — responsive layout and design tokens  
`app.js` — view rendering, calculations and browser persistence

## Future improvements
Role-based login, backend data persistence, drag-and-drop pipeline, reminders, automated email notifications and test coverage.

## License
MIT
