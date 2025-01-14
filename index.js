#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const readline = require("readline");
const { execSync } = require("child_process");

// Function to prompt for input
function promptForProjectName() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the project name: ", (projectName) => {
      rl.close();
      resolve(projectName);
    });
  });
}

// Main function to create the project
async function createProject() {
  // If no project name is provided as an argument, prompt the user for one
  let projectName = process.argv[2];

  if (!projectName) {
    projectName = await promptForProjectName();
  }

  // Exit if no project name is provided
  if (!projectName) {
    console.error("Error: You must specify a project name.");
    process.exit(1);
  }

  // Define the template directory path
  const templateDir = path.join(__dirname, "template");
  const targetDir = path.join(process.cwd(), projectName);

  // Check if the project directory already exists
  if (fs.existsSync(targetDir)) {
    console.error(`Error: The directory "${projectName}" already exists.`);
    process.exit(1);
  }

  // Function to copy the template files and folders recursively
  function copyTemplate(src, dest) {
    const files = fs.readdirSync(src);

    files.forEach((file) => {
      const currentPath = path.join(src, file);
      const newPath = path.join(dest, file);

      if (fs.lstatSync(currentPath).isDirectory()) {
        // If it's a directory, create it in the target location
        fs.mkdirSync(newPath);
        // Recursively copy the contents of this directory
        copyTemplate(currentPath, newPath);
      } else {
        // If it's a file, copy it to the target location
        fs.copyFileSync(currentPath, newPath);
      }
    });
  }

  // Function to initialize npm in the new directory
  function initializeNpm() {
    try {
      console.log("Initializing npm...");
      execSync("npm init -y", { cwd: targetDir, stdio: "inherit" });

      // Install dependencies
      console.log("Installing dependencies...");
      execSync("npm install", { cwd: targetDir, stdio: "inherit" });
    } catch (err) {
      console.error(`Error: Failed to initialize npm: ${err.message}`);
      process.exit(1);
    }
  }

  // Function to create the new project
  try {
    // Create the new directory
    fs.mkdirSync(targetDir);

    // Copy the template directory contents to the new project folder
    copyTemplate(templateDir, targetDir);

    console.log(`Successfully created ${projectName} at ${targetDir}`);
    initializeNpm();
  } catch (err) {
    console.error(`Error: Failed to create project: ${err.message}`);
    process.exit(1);
  }
}

// Run the project creation
createProject();
