# Electron 3 Socket Bug Reproducer

This is a reproducer for [ELECTRON-14915](https://github.com/electron/electron/issues/14915).

The call to [`net.Socket.setTimeout(0)`](https://nodejs.org/api/net.html#net_socket_settimeout_timeout_callback) does not clear the socket timeout as expected in the Electron 3 renderer.

It works as expected in the main process.

The issue seems to be with line 418 of Node's [net.js](https://github.com/nodejs/node/blob/8c70b2084ce5f76ea1e3b3c4ccdeee4483fe338b/lib/net.js#L418), which has no effect in the renderer.

## To Run

1. Clone the repo
2. Run:

```bash
npm install
npm start
```

## Output

In the terminal you will see:

```bash 
Creating socket server...
Socket server started
Socket client #1 connected
Main socket connected. Clearing timeout...
Socket client #2 connected
```

In the electron renderer console you will see:

```bash
Renderer socket connected. Clearing timeout...
Renderer timed out - this should never be called
```