/* eslint no-console: off  */
import { promisify } from "util";
import chalk from "chalk";
import webpack from "webpack";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages";
import printBuildError from "react-dev-utils/printBuildError";

const compile = promisify(webpack);

process.env.NODE_ENV = "production";

(async () => {
  try {
    const { default: config } = await import("../webpack.config");
    const stats = await compile(config);
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const [error] = messages.errors;

    if (error) {
      throw error;
    }

    console.log(chalk.green("Compiled successfully.\n"));
  } catch (err) {
    console.log(chalk.red("Failed to compile.\n"));
    printBuildError(err);
  }
})();
