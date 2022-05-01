const chalk = require("chalk");
const inquirer = require("inquirer");
const Account = require("./account");
const Tariff = require("./tariff");
const account = new Account();
const tariff = new Tariff();

const welcomeMessage = `
  Welcome. What would you like to do? Please choose,

    Available options are:

    1. To view your balance.
    2. To add amount to your balance.
    3. To view your basic tariff package
    4. To add addon channel to your tariff package
    5. To remove the channel from your tariff plan
  `;

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "option",
        message: chalk.green(welcomeMessage),
        loop: true,
      },
    ])
    .then((answer) => {
      processRequest(parseInt(answer.option));
    })
    .catch((error) => {
      console.log(chalk.red("Something Went wrong..., please try again."));
    });
}

init();

function processRequest(option) {
  switch (option) {
    case 0:
      console.log(chalk.green("Good Bye..."));
      break;
    case 1:
      console.log(
        chalk.green("Your current Balance is : " + account.getAmount())
      );
      init();
      break;

    case 2:
      askForAmount();
      break;

    case 3:
      let output = "",
        packages = tariff.getPackages();

      for (var key in packages) {
        output += `${key}. ${packages[key]}\n`;
      }
      console.log(chalk.green("Available tariffs : \n" + output));
      askForPackageName();
      break;

    case 4:
      console.log(
        chalk.green(
          "Your current Package contains : " + account.getChannels().join(", ")
        )
      );
      init();
      break;

    case 5:
      askForChannelName();
      break;

    default:
      console.log(chalk.red("invalid option selected"));
      init();
      break;
  }
}

function askForAmount() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "amount",
        message: chalk.green("Please enter amount"),
      },
    ])
    .then((answer) => {
      if (answer && answer.amount && parseFloat(answer.amount) > 0) {
        account.addAmount(answer.amount);
        console.log(
          chalk.green(
            `Amount ${
              answer.amount
            } added successfully to your Account, Your current balance is : ${account.getAmount()}`
          )
        );
        init();
      } else {
        console.log(chalk.red("Invalid Amount..., please try again."));
        init();
      }
    })
    .catch((error) => {
      console.log(chalk.red("Something Went wrong..., please try again."));
      init();
    });
}

function askForChannelName() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "channel",
        message: chalk.green("Please enter channel name."),
      },
    ])
    .then((answer) => {
      const channel = answer.channel.trim();
      if (account.getChannels().includes(channel)) {
        account.removeChannel(channel);
        console.log(
          chalk.red(`Channel ${channel} removed from your tariff plan.`)
        );
        init();
      } else {
        console.log(
          chalk.red(`You don’t have ${channel} in your tariff plan.`)
        );
        init();
      }
    })
    .catch((error) => {
      console.log(chalk.red("Something Went wrong..., please try again."));
      init();
    });
}

function askForPackageName() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "package",
        message: chalk.green("Please enter tariff"),
      },
    ])
    .then((answer) => {
      if (
        answer &&
        answer.package &&
        ["a", "b", "c", "d"].includes(answer.package)
      ) {
        channels = tariff.getChannels(answer.package);
        let output = "";
        for (let index in channels) {
          output += `${index}. ${channels[index]}\n`;
        }

        console.log(chalk.green(`Select Channel to add : \n${output}`));
        addChannel(answer.package);
      } else {
        console.log(chalk.red("Invalid tariff..., please try again."));
        askForPackageName();
      }
    })
    .catch((error) => {
      console.log(chalk.red("Something Went wrong..., please try again."));
      askForPackageName();
    });
}

function addChannel(packageName) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "channel",
        message: chalk.green("Please Select a channel in your tariff plan"),
      },
    ])
    .then((answer) => {
      let result = account.addChannel(answer.channel, packageName, tariff);
      if (result) {
        console.log(chalk.red(result));
        addChannel();
      } else {
        console.log(chalk.green("Channel Addeed Successfully."));
        init();
      }
    })
    .catch((error) => {
      console.log(chalk.red("Something Went wrong..., please try again."));
    });
}
