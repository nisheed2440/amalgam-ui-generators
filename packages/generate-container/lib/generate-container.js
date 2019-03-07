const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const _ = require('lodash');
const cliProgressBar = require('cli-progress');

/**
 * pascal case the input string
 * @param {string} name Then name of the container to be pascalcased
 */
function pascalCase(name) {
  return _.upperFirst(_.camelCase(name));
}

/**
 * Function to replace container name in a single file
 * @param {string} file The file path to be updated
 * @param {string} containerNameKebabCase The container name in kebab case
 * @param {string} containerNamePascalCase The container name in pascal case
 */
function replaceContainerNameInFile(file, containerNameKebabCase, containerNamePascalCase) {
  const data = fs.readFileSync(file, 'utf8');
  let result = data.replace(/amalgam-test-container/g, containerNameKebabCase);
  result = result.replace(/AmalgamTestContainer/g, containerNamePascalCase);
  result = result.replace(/ContainerController/g, `${containerNamePascalCase}Controller`);
  return fs.writeFile(file, result, 'utf8');
}
/**
 * Function to replace container names in files
 * @param {string} destCopyPath The path to the newly created container
 * @param {string} containerNameKebabCase The container name in kebab case
 * @param {string} containerNamePascalCase The container name in pascal case
 */
function updateComponentNameInFiles(destCopyPath, containerNameKebabCase, containerNamePascalCase) {
  return new Promise((resolve, reject) => {
    // Get the file globs
    glob(`${destCopyPath}/**/*.*`, (err, files) => {
      if (err) {
        reject(err);
      }
      files.forEach(async file => {
        await replaceContainerNameInFile(
          file,
          containerNameKebabCase,
          containerNamePascalCase
        ).catch(replaceErr => {
          reject(replaceErr);
        });
      });
      resolve('Done!');
    });
  });
}

/**
 * Function to rename files as per container name
 * @param {string} destCopyPath The path to the newly created container
 * @param {string} containerNamePascalCase The container name in pascal case
 */
function renameContainerFiles(destCopyPath, containerNamePascalCase) {
  return new Promise((resolve, reject) => {
    // Get the file globs
    glob(`${destCopyPath}/**/AmalgamTestContainer.*`, (err, files) => {
      if (err) {
        reject(err);
      }
      files.forEach(async file => {
        const renamedFile = file.replace(/AmalgamTestContainer/, containerNamePascalCase);
        await fs.rename(file, renamedFile).catch(renameErr => {
          reject(renameErr);
        });
      });
      resolve('Done!');
    });
  });
}

/**
 * Function to generate the container
 * @param {object} argv The yargs cli input object
 */
async function generateContainer(argv) {
  const progressBar = new cliProgressBar.Bar({}, cliProgressBar.Presets.legacy);
  const containerNamePascalCase = pascalCase(argv.containerName);
  const containerNameKebabCase = _.kebabCase(argv.containerName);
  const destCopyPath = path.join(process.cwd(), argv.dest, containerNameKebabCase);
  progressBar.start(100, 0);

  await fs
    .copy(path.join(__dirname, 'template'), path.join(destCopyPath), {
      overwrite: false,
      errorOnExist: true,
    })
    .then(() => {
      progressBar.update(25);
    })
    .catch(err => {
      throw err;
    });

  await updateComponentNameInFiles(destCopyPath, containerNameKebabCase, containerNamePascalCase)
    .then(() => {
      progressBar.update(25);
    })
    .catch(err => {
      throw err;
    });

  await renameContainerFiles(destCopyPath, containerNamePascalCase)
    .then(() => {
      progressBar.update(25);
    })
    .catch(err => {
      throw err;
    });

  progressBar.update(25);
  progressBar.stop();
  return argv;
}
// Export the functions
module.exports = {
  pascalCase,
  replaceContainerNameInFile,
  updateComponentNameInFiles,
  renameContainerFiles,
  generateContainer,
};
