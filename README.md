# Electron 3 Socket Bug Reproducer

The call to [`net.Socket.setTimeout(0)`](https://nodejs.org/api/net.html#net_socket_settimeout_timeout_callback) does not clear the socket timeout as expected in the Electron 3 renderer.

It works as expected in the main process.
