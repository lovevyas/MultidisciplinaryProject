<script lang="ts">
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { page } from "$app/stores";
  const menu = [
    { name: "Courses", path: "/" },
    { name: "For teachers", path: "/for-teachers" },
    { name: "Hello, world!", path: "/hello" },
    { name: "Login/Sign up", path: "/login" },
    //{ name: "confirm-mail", path: "/confirm-mail" },
  ];
</script>

<header>
  <LayoutGrid>
    <Cell spanDevices={{ desktop: 4, tablet: 11, phone: 11 }}>
      <div class="container">
        <img class="pic" src="/images/logo.svg" alt="logo" />
      </div>
    </Cell>
    <Cell align="middle" spanDevices={{ desktop: 8, tablet: 11, phone: 11 }}>
      <nav class="menu">
        {#each menu as item}
          <Button
            href={item.path}
            color="secondary"
            variant={$page.route.id === item.path ? "raised" : "outlined"}
          >
            <Label>{item.name}</Label>
          </Button>
        {/each}
      </nav>
    </Cell>
  </LayoutGrid>
</header>

<style>
  .container {
    width: 100%; /* Adjust the width as needed */
    text-align: left; /* Align content to the left within the container */
  }

  .pic {
    width: 70%; /* Set the image's width to 70% of its container */
    height: auto; /* Maintain the aspect ratio */
    display: block; /* Ensures the image is displayed as a block-level element */
  }
  .menu {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>
