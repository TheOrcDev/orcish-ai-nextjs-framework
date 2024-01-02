const fs = require("fs");

const baseDir = "resources/src";
const readFolders = (dir) => {
  try {
    return fs.readdirSync(`${baseDir}/${dir}`);
  } catch (e) {
    return [];
  }
};

const readNestedFolders = (dir) =>
  readFolders(dir)
    .filter((page) => !page.endsWith(".ts"))
    .map((page) =>
      readFolders(`${dir}/${page}`).map((sub) => [
        page,
        ...readFolders(`${dir}/${page}/${sub}`),
      ])
    )
    .flat(2)
    .filter((file) => file.endsWith(".tsx"))
    .map((p) => p.replace(".tsx", ""));

const pages = readNestedFolders("ui");
const ui = readNestedFolders("ui");

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
    ...pages,

    "---",
    "ui",
    ...ui,
  ],
  scopeOverrides: {
    build: ["vite", "deps", "deps-dev", ".npmrc", "tsconfig", "tailwind"],
    chore: ["eslint", "repo", "cz", "package.json", "generate-react-cli"],
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
