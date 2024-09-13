<script lang="ts">
  import type {
    Submission,
    CourseSubmissions,
    Course,
    Lesson,
    CourseInfo,
    Response,
    Attempt,
    Choice,
    Module,
  } from "$lib/types";
  import SegmentedButton, { Segment } from "@smui/segmented-button";
  import UsersHeader from "$lib/components/UsersHeader.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { fetchWithAuth } from "$lib/api";
  import { onMount } from "svelte";
  import {
    currentLessonNumber,
  } from "$lib/stores";
  import { get } from "svelte/store";
  import { Icon } from "@smui/icon-button";
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import Select, { Option } from "@smui/select";
  import { getVideoPath } from "$lib/util";
  import { page } from "$app/stores";

  let modules: Module[] = [];

  let info: CourseInfo = {
    date_last_modified: null,
    short_description: "",
    github_url: "",
    id: 0,
    lessons_list: "",
    n_lessons: 0,
    number_of_users: 8,
    owner: 0,
    short_name: "",
    enrolled: false,
    full_name: "",
    requirements: "",
    workload: "",
    small_image: "",
    full_description: "",
  };
  let completedLessons: Boolean[] = [];
  let uncompletedLessons: Boolean[] = [];
  let attempts: Submission[] = [];
  let courseProgress: string = "";
  let id = $page.url.pathname.split("/").at(-1);
  let last3Attempts: Attempt[] = [];
  onMount(async () => {
    const course = (await fetchWithAuth(
      `/get-course?course_id=${id}`,
    )) as Course;
    const submissions = (await fetchWithAuth(
      `/submissions-list?course_id=${id}`,
    )) as CourseSubmissions;
    info = course.info;
    modules = course.modules;
    attempts = submissions.data;
    last3Attempts = attempts.slice(-3).reverse();

    completedLessons = getAllLessonsCompletedFromModules(course.modules);
    uncompletedLessons = completedLessons.filter((el) => el == false);
    courseProgress =
      Math.round(
        ((info.n_lessons - uncompletedLessons.length) * 100) / info.n_lessons,
      ) + "%";
  });

  const choices: Choice[] = [
    {
      name: "Code",
      icon: "code_array",
    },
    {
      name: "Video",
      icon: "movie",
    },
    {
      name: "Log",
      icon: "receipt",
    },
  ];
  async function hydrateAttempt(option: Choice, index: number) {
    // attempt.currentOption = option
    last3Attempts[index].selectedOption = option;

    if (option.name === "Code" && last3Attempts[index].code === undefined) {
      const code = (await fetchWithAuth(
        "/get-code?submission_id=" + last3Attempts[index].id,
      )) as Response;
      last3Attempts[index].code = code.data;
    }
    if (option.name === "Video" && last3Attempts[index].video === undefined) {
      const video = (await fetchWithAuth(
        "/get-video?submission_id=" + last3Attempts[index].id,
      )) as Response;
      last3Attempts[index].video = video.data;
    }
    if (option.name === "Log" && last3Attempts[index].log === undefined) {
      const log = (await fetchWithAuth(
        "/get-log?submission_id=" + last3Attempts[index].id,
      )) as Response;
      last3Attempts[index].log = log.data;
    }
  }

  function getAllLessonsCompletedFromModules(modules: Module[]) {
    let completedLessons: boolean[] = [];
    for (let i = 0; i < modules.length; i++) {
      completedLessons = completedLessons.concat(
        modules[i].lessons.map((el: { completed: boolean }) => el.completed),
      );
    }
    return completedLessons;
  }
</script>

<section class="wrapper">
  <UsersHeader />

  <LayoutGrid>
    <Cell spanDevices={{ desktop: 12 }}>
      <h2>Course info</h2>
    </Cell>
    <Cell span={4}>
      <h2>{info.short_name}</h2>
      <img
        class="pic"
        src={info.small_image}
        width="100%"
        alt="course_pic"
      />
      <p>
        {info.short_description}
      </p>
    </Cell>
    <Cell span={8}>
      <h2 style="margin-left: 1.5rem;">
        Progress
        <progress
          value={info.n_lessons - uncompletedLessons.length}
          max={info.n_lessons}
        />
        {courseProgress}
      </h2>
      <LayoutGrid style="padding-top: 0;">
        <Cell span={12}>
          <Accordion class="accordion">
            {#each modules as module, i}
              <Panel class="panel">
                <Header class="header">{i + 1 + ". " + module.name}</Header>
                <Content class="content">
                  {#each module.lessons as lesson, j}
                    <Option
                      style={completedLessons[lesson.serial_n]
                        ? "border-left: 3px solid var(--success-color)"
                        : "border-left: 3px solid var(--primary-color)"}
                      value={lesson.name}
                      on:click={() => {
                        currentLessonNumber.set(lesson.serial_n);
                        location.href = `/user/courses/${info.id}/dashboard`;
                      }}
                    >
                      {i + 1 + "." + (j + 1) + ". " + lesson.name}
                    </Option>
                  {/each}
                </Content>
              </Panel>
            {/each}
          </Accordion>
        </Cell>
        <Cell span={12}>
          <h4>
            Last 3 attempts({attempts.length} in total)
          </h4>
          {#each last3Attempts as attempt, index}
            <div class="attempt">
              <b>{attempt.task}</b>
              <time
                >{new Date(attempt.date_last_modified).toLocaleString(
                  "fi-FI",
                )}</time
              >
              <mark class={attempt.last_message}>{attempt.last_message}</mark>
              <em>{attempt.status}</em>
              <div>
                <SegmentedButton
                  segments={choices}
                  let:segment
                  singleSelect
                  style="display: flex"
                  bind:selected={attempt.selectedOption}
                  key={(segment) => segment.name}
                >
                  <Segment
                    {segment}
                    touch
                    title={segment.name}
                    on:click={hydrateAttempt(segment, index)}
                  >
                    <Icon class="material-icons" on>{segment.icon}</Icon>
                  </Segment>
                </SegmentedButton>
                {#if attempt.selectedOption?.name === "Code"}
                  <pre>{attempt.code}</pre>
                {/if}
                {#if attempt.selectedOption?.name === "Video"}
                  <!-- svelte-ignore a11y-media-has-caption -->
                  <video controls id="vid-{attempt.id}" width="320">
                    <source src={getVideoPath(attempt.id)} type="video/mp4" />
                    Video could not be played in your browser
                  </video>
                {/if}
                {#if attempt.selectedOption?.name === "Log"}
                  <pre>{attempt.log}</pre>
                {/if}
              </div>
            </div>
          {/each}
        </Cell>
      </LayoutGrid>
    </Cell>
  </LayoutGrid>
</section>

<style>
  :root {
    --success-color: green;
    --primary-color: #e25d39;
    --secondary-color: #5e5d76;
  }
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
  .attempt {
    border: 1px solid darkgray;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  mark.success {
    background: green;
  }
  mark.error {
    background: red;
  }
</style>
