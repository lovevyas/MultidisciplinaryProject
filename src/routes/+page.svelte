<script lang="ts">
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Card, { Content, Media, MediaContent, Actions } from "@smui/card";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Button, { Label } from "@smui/button";
  import { onMount } from "svelte";
  import { simpleFetch } from "$lib/api";
  import type { CourseInfo } from "$lib/types";

  const link = "/course-info";
  let cards: CourseInfo[] = [];

  onMount(async () => {
    const courses = (await simpleFetch("/get-courses")) as {
      courses: CourseInfo[];
    };
    cards = courses.courses;
  });
</script>

<div class="wrapper">
  <Header />
  <LayoutGrid>
    <Cell span={12}>
      <h2 class="roboto-mono">Online courses</h2>
      <p class="roboto-mono">
        Sign up for one of the courses to access the hardware.
      </p>
    </Cell>
    {#each cards as card}
      <Cell>
        <Card>
          <Media class="card-media-16x9" aspectRatio="16x9">
            <MediaContent class="card">
              <img class="pic" src={card.small_image} alt={card.full_name} width="100%" />
            </MediaContent>
            <Content>
              <h2 class="roboto-mono">{card.full_name}</h2>
              <p class="roboto-mono">{card.short_description}</p>
            </Content>
          </Media>
          <Actions fullBleed>
            <Button href={link + `/${card.id}`} color="secondary">
              <Label>More info</Label>
              <i class="material-icons" aria-hidden="true">arrow_forward</i>
            </Button>
          </Actions>
        </Card>
      </Cell>
    {/each}
  </LayoutGrid>

  <Footer />
</div>

<style>
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
</style>
