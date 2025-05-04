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

  (async() => {
    console.log(await NetworkUtils.getServerKey());

    console.log(await NetworkUtils.JWT.get());
    console.log(await NetworkUtils.JWT.update("7ed43f8a9ac6cbd0225e72f541b0dd33859da0ceaa4a0162374157dc87c7208b",
      "7ed43f8a9ac6cbd0225e72f541b0dd33859da0ceaa4a0162374157dc87c7208b"));
    console.log(await NetworkUtils.JWT.get());
    console.log(await NetworkUtils.JWT.validate());
  })();
</script>

<head>
  <title>NestJS - Home</title>
</head>

<page>

</page>

<style>

</style>