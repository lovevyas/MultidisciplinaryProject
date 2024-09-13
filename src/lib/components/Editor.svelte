<script lang="ts">
  import Fab, { Icon } from "@smui/fab";
  import Fullscreen from "$lib/components/Fullscreen.svelte";
  import { codeStorage, currentLessonNumber } from "$lib/stores";
  import { get } from "svelte/store";
  // import { onMount } from 'svelte'
  import CodeMirror from "svelte-codemirror-editor";
  import { cpp } from "@codemirror/lang-cpp";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { fetchWithAuth } from "$lib/api";
  import { onMount } from "svelte";
  import type { Module } from "$lib/types";
  import { page } from "$app/stores";

  let courseID = $page.url.pathname.split("/")[3];
  let modules: Module[] = [];
  let code: any = "";

  onMount(async () => {
    const course = (await fetchWithAuth(
      `/get-course?course_id=${courseID}`,
    )) as {
      modules: Module[];
    };
    modules = course.modules;
    code =
      modules
        .find((module) =>
          module.lessons.some((el) => el.serial_n == get(currentLessonNumber)),
        )
        ?.lessons.find((lesson) => lesson.serial_n == get(currentLessonNumber))
        ?.template.trim() === ""
        ? "//Write your code here"
        : modules
            .find((module) =>
              module.lessons.some(
                (el) => el.serial_n == get(currentLessonNumber),
              ),
            )
            ?.lessons.find(
              (lesson) => lesson.serial_n == get(currentLessonNumber),
            )?.template;
    codeStorage.set(code);
  });

  currentLessonNumber.subscribe(() => {
    code =
      modules
        .find((module) =>
          module.lessons.some((el) => el.serial_n == get(currentLessonNumber)),
        )
        ?.lessons.find((lesson) => lesson.serial_n == get(currentLessonNumber))
        ?.template.trim() === ""
        ? "//Write your code here"
        : modules
            .find((module) =>
              module.lessons.some(
                (el) => el.serial_n == get(currentLessonNumber),
              ),
            )
            ?.lessons.find(
              (lesson) => lesson.serial_n == get(currentLessonNumber),
            )?.template;
    codeStorage.set(code);
  });

  let props: CodeMirror["$$prop_def"] = {
    basic: true,
    useTab: true,
    editable: true,
    lineWrapping: false,
    readonly: false,
    tabSize: 4,
    placeholder: null,
    lang: cpp(),
    theme: oneDark,
  };

  function handleCodeMirrorChange(instance: any) {
    codeStorage.set(instance);
  }

  // $: {
  //   if (testAssignment === true && outputType === 'success') {
  //     setTimeout(() => {
  //       testAssignment = false
  //       outputResult = ''
  //       success = true
  //     }, 10000)
  //   }
  // }
</script>

<Fullscreen let:onToggle let:onExit let:isFull>
  <div class="relative" id="editor">
    <div class="fullscreen-button">
      <Fab
        style="--mdc-theme-secondary: transparent;"
        on:click={() => onToggle()}
      >
        <Icon class="material-icons">
          {isFull ? "fullscreen_exit" : "fullscreen"}
        </Icon>
      </Fab>
    </div>
    <CodeMirror
      on:change={() => handleCodeMirrorChange(code)}
      bind:value={code}
      lang={cpp()}
      {...props}
      class="editor-area"
      styles={{
        "&": {
          width: "100%",
          overflow: "auto",
        },
      }}
    />
  </div>
</Fullscreen>

<style scoped>
  .relative {
    height: 100%;
  }
  .fullscreen-button {
    position: fixed;
    top: 4rem;
    right: 1.5rem;
    z-index: 1;
  }
</style>
