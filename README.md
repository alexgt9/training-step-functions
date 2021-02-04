# AWS Step functions

## SFN What is that?
* Orquestrator
* State machine
* Choice
* Parallelisation

# Before doing the exercise

I recommend to follow this [AWS example](https://aws.amazon.com/getting-started/hands-on/create-a-serverless-workflow-step-functions-lambda/) before trying to do the next problem 

# Practice: Approving task state machine

## The problem

Create an state machine and the needed lambdas to simulate this process:
- The code is created
- A branch is created
- Notify the reviewers (the message should contains the branch name)
- Create a manual lambda able to approve or reject at this point
- If reject, the state machine should finish in fail state
- If success, merge to master (based on the branch name)
- Create a release
- Notify Ops to deploy the release (the message should contains the release name created in the previous step)

```
* Actions can be simulated doing an http request to a site like https://webhook.site/
* For new data like code, branch and release, you can add it in the steps using statis data in the Payload
* The lambda should return at least the payload sent to them to be able to reuse the data in next steps
```

## Solution:

Just check this if you really don't want to challenge yourself or after you have done the practice

1. Create the lambdas based on the code in  [/lambdas](lambdas/) folder

```
The lambda approveStepWithToken.js needs access to act on stepFunctions, you can add the role AWSStepFunctionsFullAccess in this case
```

2. Create the State Machine using the definition of [SolveIssueStepFunction.json](SolveIssueStepFunction.json)
3. You can test it using the test events in [/test-events](test-events/) folder
	- Start the State Machine with [test-events/initialEventTest.json](test-events/initialEventTest.json), change the path to point to your webhook.site path
	- Check the calls you received, the last one should have the token needed to continue the `Notify Reviewers` state
	- Use this token to call the lambda [lambdas/approveStepWithToken.js](lambdas/approveStepWithToken.js) using the test event [test-events/approveTaskTest.json](test-events/approveTaskTest.json)
	- You can `approve` or `reject` in the previous event to decide the next branch in the state machine
	- That's all! The State Machine should have finished and you will be able to visualize the whole workflow in the AWS console