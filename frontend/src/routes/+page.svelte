<script lang="ts">
  import * as io from "socket.io-client";

  const baseurl = "http://localhost";
  let socket = io.connect(baseurl + ":3001", {
    transports: ['websocket'],
    timeout: 300,
  });

  socket.on('connect', async() => {
    console.log("Client connected to webserver.");
  });
</script>

<head>
  <title>NestJS - Home</title>
</head>

<page>

</page>

<style>

</style>