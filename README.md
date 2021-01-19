# AWS Step functions

Gist [AWS Step Functions training · GitHub](https://gist.github.com/alexgt9/a6e2bd4926060b70dc5db85f0badcf2a)

## Problem - El laberinto - Uploading a file
We have a lot of “steps” that a use case must do to complete a job. Like uploading a file to Signaturit. These step are logics that sometimes are optional, sometimes only for some clients, and maybe these “steps” are re used in another use case.

## SFN What is that?
* Orquestrator
* State machine
* Choice
* Parallelisation

## SFN How to solve the problem?
## Practice

## Core use case, integration and example
* Explain waitForTaskToken https://gist.github.com/alexgt9/a6e2bd4926060b70dc5db85f0badcf2a
* Show PR with needed changes https://github.com/signaturit/core/pull/3447
* Show tested workflow https://eu-west-1.console.aws.amazon.com/states/home?region=eu-west-1#/statemachines/view/arn:aws:states:eu-west-1:125723169973:stateMachine:WaitForCallbackStateMachine-i6o7fJYp6XcB

# Guión
* Explicar el problema de coordinar actions, ejemplo Laberinto
* Luego ejemplo upload file mostrando el gráfico
* Presentar las Step Functions
* Explicar los states
* Mini explicación y muestra de ASL para un state
* Rehacer ejemplo con SFN
* Explicar más detalles de la sintaxis mostrando ejemplo core https://gist.github.com/alexgt9/a6e2bd4926060b70dc5db85f0badcf2a#file-xx-uploading-file-asl-json
* Explicar posibles integraciones con servicios
* Practice!
	* Explicar el ejercicio y el tema roles y lambdas
	* Hacer parejas, cada cual en una sala y la sala principal para dudas, o invitarme para echar un ojo
* A las 11:30 se acaba y se presenta alguna cosa interesante. Se comenta la parte del flujo de core
* Explicar core use case