# Finale

The all-in-one solution for budgeting and tracking your financial accounts. Welcome to the show.

[X](https://x.com/finalehq) · [Website](https://finale.so) · [Issues](https://github.com/finaleso/finale/issues)

## Features

**Open-Source**: Finale is open source. You can view the source code on [Github](https://github.com/finaleso/finale).

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `website`: a [Next.js](https://nextjs.org/) app
- `packages`: shared packages in development (currently empty)

### Utilities

This Turborepo has some additional tools already set up for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Package Manager

This project uses npm as the package manager. However, it's important to note that Turborepo is package manager agnostic. You can use npm, yarn, or pnpm with Turborepo. The choice of npm in this project is based on the current setup, but you can easily switch to yarn or pnpm if preferred.

### Using npm

To install dependencies:

```
npm install
```

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Switching Package Managers

If you prefer to use yarn or pnpm, you can do so by following these steps:

1. Remove the `package-lock.json` file.
2. Update the `packageManager` field in the root `package.json` to your preferred package manager and version.
3. Use the appropriate commands for your chosen package manager (e.g., `yarn install` instead of `npm install`).

Remember to update any scripts or documentation to reflect the change in package manager.

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
