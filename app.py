#!/usr/bin/env python3

from aws_cdk import core

from ecs_2048_on_fargate.ecs_2048_on_fargate_stack import Ecs2048OnFargateStack


app = core.App()
#Ecs2048OnFargateStack(app, "ecs-2048-on-fargate")
Ecs2048OnFargateStack(
    app, 
    "ecs-2048-on-fargate", 
    env = {
            'account': '471856162574',
            'region': 'us-west-2'
        }
    )

app.synth()

