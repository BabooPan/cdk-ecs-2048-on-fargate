import * as assertions from 'aws-cdk-lib/assertions';
import { App, Stack } from 'aws-cdk-lib/core';
import { CdkEcs2048FargateDemo } from '../src/main';

test('test create ECS cluster', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');

  new CdkEcs2048FargateDemo(stack, 'ecs-cluster');
  assertions.Template.fromStack(stack).findResources('AWS::ECS::Cluster');
});

test('test create ECS service', () => {
  const app = new App();
  const stack = new Stack(app, 'test-stack');

  new CdkEcs2048FargateDemo(stack, 'ecs-service');
  assertions.Template.fromStack(stack).findResources('AWS::ECS::Service');
});
