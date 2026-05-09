# AI@UW Website

The official website for **AI@UW**, the premier student-led artificial intelligence collective at the University of Wisconsin–Madison.

## Overview

AI@UW is an interdisciplinary community of over 2,000 students and faculty dedicated to exploring both applied and theoretical artificial intelligence. This repository contains the source code for our web presence, featuring information about our projects, research, seminars, and ways to get involved.

## Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Components:** [Material UI (MUI)](https://mui.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Styling:** Vanilla CSS with a focus on modern, "atmospheric" design.

### Backend (Minimal)
- **Runtime:** Node.js
- **Framework:** Express
- **Email:** Nodemailer (Skeleton for potential contact form integration)

## Features

- **Home:** High-level overview of the collective's offerings.
- **About:** The manifesto, history (est. 2017), and mission of AI@UW.
- **Involvement:** Details on projects, research, study groups, and mentorship.
- **Seminars:** Archive and schedule of talks from academic and industry leaders.
- **Leadership:** Profiles of the student board and mentors.
- **Contact:** Integration with Discord, Newsletter, and Google Forms for community engagement.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AI-UW/club_website.git
   cd club_website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server:
```bash
npm run dev
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` directory.

## Project Structure

```text
├── backend/            # Express backend (Nodemailer setup)
├── public/             # Static assets (fonts, images, logos)
├── src/
│   ├── components/     # React components
│   │   ├── display/    # Reusable display components
│   │   ├── typographic/# Typography wrappers
│   │   └── ...         # Page components (Home, About, etc.)
│   ├── App.jsx         # Main application component & routing
│   ├── main.jsx        # Entry point
│   └── ...
├── vite.config.js      # Vite configuration
└── ...
```

## Contributing

We welcome contributions from the community! If you're interested in improving the website, please join our [Discord](https://discord.gg/TTSykcZAg4) and reach out to the webmasters.

## License

This project is private and intended for the use of AI@UW.
