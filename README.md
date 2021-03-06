# Reactivation

[![Greenkeeper badge](https://badges.greenkeeper.io/digital-engineers/reactivation.svg)](https://greenkeeper.io/)

A baseline for building react + redux web applications, with a simplistic webpack configuration that adds **[CSS Modules](https://github.com/css-modules/css-modules)**, automatic SVG sprites, an easy to configure mock rest api and image asset minification out of the box.

## Prerequisites

- Node.js (8.9.0+)

## Why

Why use this over the mighty `create-react-app` (CRA)? you may want to use either, but the aim of this baseline is to provide a simplistic, extensible base that has a more specialized purpose than CRA could ever provide.

Specifically we already:

- enable a modern web pipeline with css modules
- out of the box asset optimizers (such as automatic icon sprites and global image optimization)
- provide a mock rest api to enable easy parallel development of application and backend
- out of the box we have a react + redux setup with a sample set of actions, reducer, container and components
- provide samples of more modern browser features and design patterns
- focus on providing a reasonable webpack configuration that resides within each project (rather than ejecting an incomprehensible mess with CRA)
- keep base template as simple as making a copy (vs cli tools and eject/initialize patterns)
- project level snippets (currently only vscode) that reduce repetition and can be easily customized and extended

## Getting started

```sh
npx degit future-web/reactivation my-swanky-app
cd my-swanky-app
npm install
```

## Debugging

`npm start`

## Building an optimized, deployable release

`npm run build`

## Configuring the default rest api endpoint

By default during debugging the default rest endpoint is configured to the built in mock api, you can override this during debugging and building by specifying the `API_BASE_URL` environment variable.

## Adding new resource types to the mock api

The mock api resources reside within the `mockapi` directory, the powering technology is **[json server](https://github.com/typicode/json-server)** with a few extensions to enable absolute references to resources within json, by specifying the `baseUrl` pattern **[[1]](https://github.com/digital-engineers/reactivation/blob/master/mockapi/db.json#L5)**.
