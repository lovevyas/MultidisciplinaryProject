<script lang="ts">
  import Button, { Label } from '@smui/button'
  import LayoutGrid, { Cell } from '@smui/layout-grid'
  import { page } from '$app/stores'
  const menu = [
    { name: 'Profile', path: '/user' },
    { name: 'Courses', path: '/user/courses' },
    { name: 'Logout', path: '/' },
  ]
</script>

<header>
  <LayoutGrid>
    <Cell spanDevices={{ desktop: 4, tablet: 12, phone: 12 }}>
      <div class="container">
        <img class="pic" src="/images/logo.svg" alt="logo" />
      </div>
    </Cell>
    <Cell align="middle" spanDevices={{ desktop: 8, tablet: 12, phone: 12 }}>
      <nav class="menu">
        {#each menu as item}
          <Button
            href={item.path}
            color="secondary"
            variant={$page.route.id === item.path ? 'raised' : 'outlined'}
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
    width: 70%;
    height: auto;
    display: block;
  }
  .menu {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
</style>
