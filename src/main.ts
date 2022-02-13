import { App, Stack, StackProps } from 'aws-cdk-lib';
import *  as ec2 from 'aws-cdk-lib/aws-ec2';
import *  as ecs from 'aws-cdk-lib/aws-ecs';
import *  as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

export class CdkEcs2048FargateDemo extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new CdkEcs2048FargateDemo(app, 'cdk-ecs-2048-on-fargate', { env: devEnv });

app.synth();