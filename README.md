Tested with,
- Windows 11
- node v24.12.0

```
set NODE_OPTIONS=--openssl-legacy-provider
set WEBPACK_MODE=non-development
npm run orval-openai
npm run webpack-public-dev
```

```
$env:NODE_OPTIONS = "--openssl-legacy-provider"
$env:GGML_CUDA_GRAPH_OPT=1
```