<script lang="ts">
  import Button, { Label } from "@smui/button";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import CourseInformation from "$lib/components/CourseInformation.svelte";
  import { onMount } from "svelte";
  import { simpleFetch } from "$lib/api";
  import type { Lesson, CourseInfo, Module } from "$lib/types";
  import { page } from "$app/stores";

  let courseID = $page.url.pathname.split("/").at(-1);

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
    full_description: "",
    small_image: "",
    workload: "",
    requirements: "",
  };

  let modules: Module[] = [];

  onMount(async () => {
    const course = (await simpleFetch(`/get-course?course_id=${courseID}`)) as {
      info: CourseInfo;
      modules: Module[];
    };
    info = course.info;
    modules = course.modules;
  });
</script>

<div class="wrapper">
  <Header />
  <LayoutGrid>
    <Cell span={12}>
      <h2>{info.full_name}</h2>
      <h3>About the course</h3>
      <h4>
        {info.full_description}
      </h4>
    </Cell>
    <Cell span={6}>
      <h2>Photo</h2>
      <img
        class="pic"
        src={info.small_image}
        alt={info.short_name}
      />
    </Cell>
    <Cell span={12}>
      <h2>Workload</h2>
      <h4>{info.workload}</h4>
    </Cell>

    <Cell span={12}>
      <h2>Initial requirements</h2>
      <h4>{info.requirements}</h4>
    </Cell>
    <Cell span={12}>
      <h2>Syllabus</h2>
    </Cell>
    <Cell span={12}>
      <CourseInformation {modules} />
    </Cell>
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
