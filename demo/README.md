# CLI demo

To run the demo:

```sh
yarn ts-node-script --files demo/cli.ts
# loop for easier testing
yarn ts-node-script --files demo/cli.ts --loop
```

Sample output:

```
Enter your username: timhwang21
Enter password: hunter2
Enter service name: https://www.google.com
72ff57976236abd8
```

Note that this demo uses a hardcoded entropy, skipping the server step.
