#!/usr/bin/env node
import { process } from "process";
import { execSync } from "child_process";

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/33b3ziz/create-mintops-app.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Creating a new Mintops app in ${repoName}...`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log("Installing dependencies...");
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log("Done!, Follow the following commands to start");
console.log(`cd ${repoName}`);
console.log("npm run dev");
