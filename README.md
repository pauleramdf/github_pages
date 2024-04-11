## Getting Started

This is a Vue.js project that uses TypeScript and npm for package management.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Vue.js

### Installing

1. Clone the repository
```bash
git clone https://github.com/pauleramdani/github_pages.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Deployment

This project uses GitHub Actions for Continuous Deployment. The workflow is defined in the `.github/workflows/deploy.yml` file.

**Deploying to GitHub Pages**: The workflow installs the project dependencies using `npm i`, builds the project for production using `npm run build-prod`, and then deploys the built files to the `gh-pages` branch. This is done by initializing a new Git repository in the `dist` directory (where the built files are located), committing all the files, and then force pushing to the `gh-pages` branch of the repository.

The workflow is triggered on every push or pull request to the `main` branch. It sets up the environment, installs the project dependencies, builds the project for production, and deploys the built files to the `gh-pages` branch.

The `gh-pages` branch is then used by GitHub Pages to serve the static site.


## Built With

- [Vue.js](https://vuejs.org/) - The web framework used
- [npm](https://www.npmjs.com/) - Dependency Management
- [TypeScript](https://www.typescriptlang.org/) - Used for static typing


## Authors

- **Paulo Fernandes** - *Initial work* - [pauleramdf](https://github.com/pauleramdf)


## Accessing the project

https://pauleramdf.github.io/github_pages/#/