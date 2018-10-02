# Electron 3 Socket Bug Reproducer

The call to [`net.Socket.setTimeout(0)`](https://nodejs.org/api/net.html#net_socket_settimeout_timeout_callback) does not clear the socket timeout as expected in the Electron 3 renderer.

It works as expected in the main process.

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