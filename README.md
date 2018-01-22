# Reactivation

A baseline for building react + redux web applications, with a simplistic webpack configuration that adds [CSS Modules](https://github.com/css-modules/css-modules), automatic SVG sprites, an easy to configure mock rest api and image asset minification out of the box.

## Getting started

```sh
npx degit digital-engineers/reactivation my-swanky-project
cd my-swanky-project
npm install
```

## Debugging

`npm start`

## Building an optimized, deployable release

`npm run build`

## Configuring the default rest api endpoint

By default during debugging the default rest endpoint is configured to the built in mock api, you can override this during debugging and building by specifying the `API_BASE_URI` environment variable.

## Adding new resource types to the mock api

The mock api resources reside within the `mockapi` directory, the powering technology is [json server](https://github.com/typicode/json-server) with a few extensions to enable absolute references to resources within json, by specifying the `baseUrl` pattern [[1]](https://github.com/digital-engineers/reactivation/blob/master/mockapi/db.json#L5).
