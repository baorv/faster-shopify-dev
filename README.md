# faster-shopify-dev

> HTTP proxy to forward http to https for improving the development time for Shopify developers

## Why should use this tool?

When you develop a Shopify app, Shopify suggests to use ngrok, but it so slow, because ngrok needs to use your internet connection. 
So this tool will help you to run your app in locally for developing faster.

## Installation

* Run bellow command to install this package

```bash
npm install -g faster-shopify-dev or yarn global add faster-shopify-dev
```

## Usage

* Run the bellow command to reverse a port to another with https

```bash
fashopify <shopify app port> <target port>
```

```bash
fashopify 8081 9000
```

* Try our app in your browser

```text
https://localhost:<target port>
```

```text
https://localhost:9000
```

## Issue

If you have any issue or question, please [create new issue](https://github.com/baorv/faster-shopify-dev/issues/new)

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contributors

## Todo
