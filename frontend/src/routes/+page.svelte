<script lang="ts">
  import DeviceUtils from "$lib/DeviceUtils";
  import NetworkUtils from "$lib/NetworkUtils";

  import * as io from "socket.io-client";
  let socket = io.connect(NetworkUtils.getWebSocketURL(), {
    transports: ['websocket'],
    timeout: 3000,
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