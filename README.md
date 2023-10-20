# Interactive Data Visualization Project

This project consists of an interactive data visualization using D3.js and React. The visualization shows circular elements with sections and points, where users can interact by selecting different sections and points.

example online: https://punteriacero.github.io/torta/

## More information about [radar-render](/radar-render/README.md)

## Updating and Publishing Package to npm

This guide will walk you through the process of updating and publishing your package to the npm registry using Rollup.

### Step 1: Update Package Version

**Option 1**

1. Open your package.json file of your package (radar-render)
2. Locate the version field.
3. Update the version number according to semantic versioning.
   - For example, you can use patch, minor, or major version bumps.
4. Save the package.json file.

**Option 2**

1. Open your terminal and go to the package location and follow these commands.

```sh
cd radar-compoment
npm version <update_type>
```

> Note: Replace <update_type> with one of the following options:
>
> - patch: for small, backwards-compatible bug fixes.
> - minor: for adding new features in a backwards-compatible manner.
> - major: for making incompatible API changes.

### Step 2: Build the Package

1. Open your terminal or command prompt.
2. Run the build command:

```sh
npm run build
```

> Note: This will bundle your code according to the configuration in `rollup.config.js.`

### Step 3: Publish to npm

1. Log in to your npm account (if not already logged in):

```sh
npm login
```

Follow the prompts to log in.

2. Publish your package:

```sh
npm publish
```

This will upload your package to the npm registry.

### Step 4: Version Control
1. Commit the changes to your version control system (e.g., Git):

```sh
git add .
git commit -m "chore(release): bump version to X.Y.Z"
git push
```
