const fs = require("node:fs");
const path = require("node:path");

const baseDir = "components/";

const readFolders = (dir, baseDirOverride) => {
  try {
    return fs.readdirSync(`${baseDirOverride ?? baseDir}${dir}`);
  } catch (e) {
    return [];
  }
};

const readComponents = (relativePath) => {
  let reactFiles = [];

  const folderPath = !relativePath.startsWith(baseDir)
    ? path.join(baseDir, relativePath)
    : relativePath;

  try {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        reactFiles = reactFiles.concat(readComponents(filePath));
      } else if (path.extname(file) === ".tsx") {
        reactFiles.push(path.basename(file).replace(".tsx", ""));
      }
    });
  } catch (error) {
    console.error("Error while searching for .tsx files:", error);
  }

  return reactFiles;
};

const providers = readComponents("providers");
const features = readComponents("features");
const entities = readFolders("entities")
  .map((entity) => [entity, ...readFolders(`entities/${entity}/ui`)])
  .flat();
const sharedAPIs = readFolders("shared/api")
  .filter((f) => !f.endsWith(".ts") && f !== "lib")
  .map((f) => `${f}-api`);
const sharedUI = readComponents("ui");
const sharedLibs = readFolders("shared/lib").map((f) => `${f}-lib`);

const workflows = readFolders(".github/workflows", "").map(
  (f) => `${f.replace(".yaml", "")}-workflow`
);

module.exports = {
  types: [
    { value: "feat", name: "feat: A new feature" },
    { value: "fix", name: "fix: A bug fix" },
    { value: "docs", name: "docs: Documentation only changes" },
    {
      value: "style",
      name: "style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
    },
    {
      value: "refactor",
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "build",
      name: "build: Changes that affect the build system or external dependencies",
    },
    {
      value: "ci",
      name: "ci: Changes to our CI configuration files and scripts",
    },
    { value: "perf", name: "perf: A code change that improves performance" },
    {
      value: "test",
      name: "test: Adding missing tests or correcting existing tests",
    },
    {
      value: "chore",
      name: "chore: Build or documentation generation, another infrastructure change or something else that does not affect the source code",
    },
    { value: "revert", name: "revert: Revert to a commit" },
  ],

  scopes: [
    "app",
    "providers",
    "styles",

    "---",
    "pages",

    "---",

    "providers",
    ...providers,

    "---",
    "features",
    ...features,

    "---",
    "entities",
    ...entities,

    "---",
    "shared",
    "---",

    "api",
    ...sharedAPIs,
    "---",

    "config",
    "types",

    "---",
    "lib",
    ...sharedLibs,

    "---",
    "ui",
    ...sharedUI,
  ],
  scopeOverrides: {
    build: ["vite", "deps", "deps-dev", ".npmrc", "tsconfig", "tailwind"],
    chore: ["eslint", "repo", "cz", "package.json", "generate-react-cli"],
    ci: ["dependabot", ...workflows],
  },

  usePreparedCommit: true,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: "TICKET-",
  ticketNumberRegExp: "\\d{1,5}",

  messages: {
    type: "Select the type of change that you're committing:",
    scope: "\nDenote the SCOPE of this change (optional):",

    customScope: "Denote the SCOPE of this change:",
    subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: "List any BREAKING CHANGES (optional):\n",
    footer:
      "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above?",
  },

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],

  subjectLimit: 100,
};
