const dsn = process.env.SENTRY_DSN;

const appTask = import(/* webpackChunkName: "app" */ "./app");
const sentryTask = import(/* webpackChunkName: "sentry" */ "@sentry/browser");

const errorHandler = async err => {
  const { init, captureException } = await sentryTask;
  init({ dsn });
  captureException(err);

  throw err;
};

(async () => {
  try {
    const app = await appTask;
    await app.default(errorHandler);
  } catch (err) {
    errorHandler(err);
  }
})();
