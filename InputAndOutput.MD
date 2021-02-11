# Step Functions Input and Ouput full example

## Having this Raw Input

```json
{
    "first": "1",
    "second": "2",
    "third": {
        "four": "4",
        "fifth": "5"
    }
}
```
 ## Having this task output

 ```json
{
    "ExecutedVersion": "$LATEST",
    "Payload": {
      "that": "is true",
      "this": false
    },
    "SdkHttpMetadata": {
      "AllHttpHeaders": {
        "X-Amz-Executed-Version": ...,
        ...
      },
      "HttpHeaders": {
        "Connection": "keep-alive",
        ...
      },
      "HttpStatusCode": 200
    },
    "SdkResponseMetadata": {
      "RequestId": "x"
    },
    "StatusCode": 200
  }
  ```
## And this State definition

```asl
{
    "Type": "Task",
    "Resource": "arn:aws:states:::lambda:invoke",
    "InputPath": "$.third", // Extract from Raw input and create InputPath
    "Parameters": { // Extract from Input Path
        "FunctionName": "arn:aws:lambda:us-east-1:123456789012:function:sendHttpRequest:$LATEST",
        "Payload": {
            "parameter1": "fixed",
            "parameter2.$": "$.four",
            "parameter3.$": {
                "stateName": "$$.State.Name"
                // "invalid.$": "$.first" 
            }
        }
    },
    "ResultSelector": { // Select only a part of the task output
        "Payload.$": "$.Payload",
        "StatusCode.$": "$.StatusCode"
    },
    "ResultPath": "$.TaskOutput", // Insert the ResultSelecto into rawInput
    "Next": "Create the Branch"
}
```

## Effective State input

```json
{
"parameter1": "fixed",
"parameter2": "four",
"parameter3": {
    "stateName": "<theRealStateName>"
}
```

## Input for the next State
```json
{
    "first": "1",
    "second": "2",
    "third": {
        "four": "4",
        "fifth": "5"
    },
    "TaskOutput": {
        "Payload": {
            "that": "is true",
            "this": false,
            "result": {
                "Action": "Do the code",
                "code": "This is the code"
            }
        },
        "StatusCode": 200
    }
}
```

![Step Functions I&O](./input-output-processing.png)
