import blessed from "blessed";
import chalk from "chalk";
import formatWebpackMessages from "react-dev-utils/formatWebpackMessages.js";

export default class DashboardPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const { host, port } = this.options;
    const displayHost = host === "0.0.0.0" ? "localhost" : host;

    const screen = blessed.screen({
      smartCSR: true,
      dockBorders: true
    });

    screen.key(["escape", "q", "C-c"], () => process.exit(0));

    const addressBox = blessed.box({
      width: "100%",
      height: 3,
      content: chalk.cyan.bold(` http://${displayHost}:${port}`),
      border: {
        type: "line"
      }
    });

    const spamBox = blessed.box({
      parent: screen,
      top: 2,
      width: "100%",
      height: "100%-3",
      scrollable: true,
      alwaysScroll: true,
      keys: true,
      scrollbar: {
        ch: " ",
        inverse: true
      },
      border: {
        type: "line"
      },
      padding: {
        top: 1,
        right: 2,
        bottom: 1,
        left: 2
      }
    });

    spamBox.setContent(chalk.gray("Compiling..."));
    screen.append(addressBox);
    screen.append(spamBox);
    screen.render();

    compiler.hooks.invalid.tap('dashboard', () => {
      spamBox.setContent(chalk.gray("Compiling..."));
      screen.render();
    });

    compiler.hooks.done.tap('dashboard', stats => {
      const { errors } = formatWebpackMessages(stats.toJson({}, true));

      if (errors.length) {
        spamBox.setContent(
          `${chalk.red("Compilation failed.")}\n\n${errors.join("\n")}`
        );
      } else {
        spamBox.setContent(
          `${chalk.green("Compiled.")}\n\n${stats.toString({
            chunks: false,
            colors: true
          })}`
        );
      }

      screen.render();
    });
  }
}
