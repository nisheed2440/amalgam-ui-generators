const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

const {
  pascalCase,
  generateContainer,
  replaceContainerNameInFile,
  updateComponentNameInFiles,
} = require('../lib/generate-container');

describe('@amalgam-ui/generate-container', () => {
  const containerName = 'test-container';
  const kebabCaseContainerName = _.kebabCase(containerName);
  const pascalCaseContainerName = pascalCase(containerName);
  const containerPath = path.join(process.cwd(), 'packages', kebabCaseContainerName);
  beforeAll(() => {
    fs.removeSync(containerPath);
  });
  afterAll(() => {
    fs.removeSync(containerPath);
  });
  describe('pascalCase', () => {
    it('should pascal case input strings', () => {
      expect(pascalCase('Hello World')).toBe('HelloWorld');
      expect(pascalCase('hello-world')).toBe('HelloWorld');
      expect(pascalCase('hello_world')).toBe('HelloWorld');
      expect(pascalCase('helloWorld')).toBe('HelloWorld');
    });
  });
  describe('Replace container names', () => {
    let fakeFile;
    let fakeInput;
    let fsReadSpy;
    let fsWriteSpy;
    beforeEach(() => {
      fakeFile = 'path/to/testfile';
      fakeInput = 'amalgam-test-container AmalgamTestContainer ContainerController';
      fsReadSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        return fakeInput;
      });
      fsWriteSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => {
        return Promise.resolve('Done');
      });
    });
    afterEach(() => {
      fsReadSpy.mockRestore();
      fsWriteSpy.mockRestore();
    });
    describe('replaceContainerNameInFile', () => {
      it('should replace container name in given file', () => {
        const expectedOutput = `${kebabCaseContainerName} ${pascalCaseContainerName} ${pascalCaseContainerName}Controller`;
        return replaceContainerNameInFile(
          fakeFile,
          kebabCaseContainerName,
          pascalCaseContainerName
        ).then(() => {
          expect(fsReadSpy).toHaveBeenCalledWith(fakeFile, 'utf8');
          expect(fsWriteSpy).toHaveBeenCalledWith(fakeFile, expectedOutput, 'utf8');
        });
      });
    });
    describe('updateComponentNameInFiles', () => {
      it('should replace container name in given file globs', () => {
        return updateComponentNameInFiles(
          fakeFile,
          kebabCaseContainerName,
          pascalCaseContainerName
        ).then(data => {
          expect(data).toBe('Done!');
        });
      });
    });
  });
  describe('Errors', () => {
    let fsWriteSpy;
    beforeEach(() => {
      fsWriteSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => {
        return Promise.reject(new Error('Test Error!'));
      });
    });
    afterEach(() => {
      fsWriteSpy.mockRestore();
    });
    it('should throw error while writing the file', () => {
      return updateComponentNameInFiles(
        path.join(__dirname, '*'),
        kebabCaseContainerName,
        pascalCaseContainerName
      ).then(() => {
        expect(fsWriteSpy).toHaveBeenCalled();
      });
    });
  });
  describe('generateContainer', () => {
    describe('Create new container', () => {
      it('should create new container', () => {
        return generateContainer({ containerName, dest: 'packages', namespace: '@test' }).then(
          () => {
            expect(fs.pathExistsSync(path.join(containerPath, 'package.json'))).toBeTruthy();
            expect(fs.pathExistsSync(path.join(containerPath, '.storybook'))).toBeTruthy();
            expect(fs.pathExistsSync(path.join(containerPath, 'config'))).toBeTruthy();
            expect(fs.pathExistsSync(path.join(containerPath, 'src'))).toBeTruthy();
            expect(
              fs.pathExistsSync(path.join(containerPath, `src/${pascalCaseContainerName}.tsx`))
            ).toBeTruthy();
            expect(
              fs.pathExistsSync(
                path.join(containerPath, `src/${pascalCaseContainerName}.controller.tsx`)
              )
            ).toBeTruthy();
            expect(
              fs.pathExistsSync(
                path.join(containerPath, `src/${pascalCaseContainerName}.controller.tsx`)
              )
            ).toBeTruthy();
            expect(
              fs.pathExistsSync(
                path.join(
                  containerPath,
                  `src/__tests__/${pascalCaseContainerName}.controller.spec.ts`
                )
              )
            ).toBeTruthy();
          }
        );
      });
    });
  });
});
