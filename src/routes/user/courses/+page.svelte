<script lang="ts">
  import { goto } from "$app/navigation";
  import UsersHeader from "$lib/components/UsersHeader.svelte";
  import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions,
    ActionButtons,
  } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { fetchWithAuth } from "$lib/api";
  import { onMount } from "svelte";
  import type { CoursesRequest, CourseInfo } from "$lib/types";
  const basePath = import.meta.env.VITE_BACKEND_URL;

  let courses: CourseInfo[] = [];
  async function enroll(course_id: number) {
    const body = {
      days: 10,
      course_id,
    };
    const response: any = await fetchWithAuth("/join-course", {
      method: "post",
      body: JSON.stringify(body),
    });
    if (response.response_msg == "User successfully enrolled to the course") {
      const id_course = courses.findIndex((course) => course.id == course_id);
      courses[id_course].enrolled = true;
    }
  }
  onMount(async () => {
    const coursesRequest = (await fetchWithAuth(
      "/get-courses",
    )) as CoursesRequest;
    courses = coursesRequest.courses;
    const request = fetch(`${basePath}/videos-list`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("Authorization") || "",
      },
    }).then((response) => {
      return response.json();
    });
  });
</script>

<div class="wrapper">
  <UsersHeader />
  <LayoutGrid>
    <Cell span={12}>
      <h3>Here is a list of courses available for you</h3>
    </Cell>
    {#each courses as course}
      <Cell span={4}>
        <Card>
          <PrimaryAction
            on:click={() => {
              goto(`/user/courses/${course.id}`);
            }}
          >
            <Media class="card-media-16x9" aspectRatio="16x9">
              <MediaContent class="card">
                <img
                  class="pic"
                  src={course.small_image}
                  alt={course.short_name}
                  width="100%"
                />
              </MediaContent>
            </Media>
            <Content>
              <h4 class="mdc-typography--headline6">
                {course.short_name}
              </h4>
              <p
                class="mdc-typography--subtitle2"
                style="margin: 0 0 10px; color: #888;"
              >
                {course.short_description}
              </p>
            </Content>
          </PrimaryAction>
          <Actions>
            <ActionButtons bind:value={courses}>
              <Button
                on:click={() => {
                  goto(`/user/courses/${course.id}`);
                }}
              >
                <Label>Details</Label>
              </Button>
              {#key courses}
                {#if course.enrolled === false}
                  <Button on:click={() => enroll(course.id)}>
                    <Label>Enroll</Label>
                  </Button>
                {/if}
                {#if course.enrolled === true}
                  <Button on:click={() => goto(`/user/courses/${course.id}/dashboard`)}>
                    <Label>Learn</Label>
                  </Button>
                {/if}
              {/key}
            </ActionButtons>
          </Actions>
        </Card>
      </Cell>
    {/each}
  </LayoutGrid>
</div>

<style>
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
</style>
