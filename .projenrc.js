const { awscdk } = require('projen');

const PROJECT_NAME = 'cdk-ecs-2048-on-fargate';
const PROJECT_DESCRIPTION =
  'Container Application for Demo, deploy as ECS Cluster and Services.';

const project = new awscdk.AwsCdkTypeScriptApp({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  repository: 'https://github.com/baboopan/cdk-ecs-2048-on-fargate.git',
  authorName: 'Baboo Pan',
  authorEmail: 'lpig0818@gmail.com',
  keywords: ['aws', 'ecs', 'fargate', 'cdk'],
  defaultReleaseBranch: 'main',
  release: false,
  stability: 'experimental',
  autoDetectBin: false,
  dependabot: false,
  cdkVersion: '2.17.0',
  majorVersion: 2,
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
    },
  },
  autoApproveOptions: {
    // deepcode ignore HardcodedNonCryptoSecret: Allow to preform GitHub Actions
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['baboopan'],
  },
  gitignore: [
    '.vscode',
    '.vscode/settings.json',
    '.dccache',
    'cdk.out',
    'cdk.context.json',
    'yarn-error.log',
    'coverage',
    'venv',
  ],
});

project.synth();
