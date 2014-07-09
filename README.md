# demo for a bug in bud-tls


## Usage
```bash
node index.js &
bud -c bud.json &
curl -k https://localhost:1443/demo.js
```

You'll see an SSL error.
