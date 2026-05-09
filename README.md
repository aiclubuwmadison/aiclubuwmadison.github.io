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

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aiclubuwmadison/aiclubuwmadison.github.io.git
   cd aiclubuwmadison.github.io
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the development server. Ensure you are working off the `dev` branch.
```bash
npm run dev
```

### Building for Production
Create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

## Deployment Workflow

The website's live code lives on the `master` branch, while all development takes place on the `dev` branch. Once your changes on `dev` are tested and ready, follow these steps to deploy:

1. Ensure your `dev` branch is pushed and up-to-date.
2. Generate the production build:
   ```bash
   npm run build
   ```
3. Copy the compiled assets to a temporary directory outside the repo:
   ```bash
   cp -r dist/ ../temp_build/
   ```
4. Switch to the `master` branch:
   ```bash
   git checkout master
   ```
5. Clear out the old files:
   ```bash
   rm -rf *
   ```
6. Copy the new files from your temporary build directory into the branch:
   ```bash
   cp -r ../temp_build/* .
   ```
7. Commit and push the new build to production:
   ```bash
   git add . 
   git commit -m "Deploy updated built files" 
   git push origin master
   ```
8. Remove the temporary directory (optional):
   ```bash
   rm -rf ../temp_build/
   ```
9. Switch back to the `dev` branch to resume development:
   ```bash
   git checkout dev
   ```

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