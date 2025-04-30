<script>
  import Nav from './Nav.svelte';
</script>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="nestjs app with svelte templates" />
    <script src="https://kit.fontawesome.com/8ab3690583.js" crossorigin="anonymous"></script>
    %head%
  </head>
  <body>
    <header>
      <Nav />
    </header>
    <main>
      <slot />
    </main>
  </body>
</html>

<style>
  :global(:root) {
    --bgColour: #111;
    --fgColour: #222;
    --txtColour: #eee;
    --hlColour: #7777ff;
  }

  :global(body) {
    margin: 0;
    min-width: 100vw;
    min-height: 100vh;
    background-color: var(--bgColour);
    color: var(--txtColour);
  }

  :global(i) {
    padding-left: 5px;
    padding-right: 5px;
  }

  main {
    padding: 10px;
  }
</style>