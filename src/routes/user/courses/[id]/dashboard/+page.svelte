<script lang="ts">
  import { HSplitPane, VSplitPane } from "svelte-split-pane";
  import { Panel, Content } from "@smui-extra/accordion";
  import MenuSurface from "@smui/menu-surface";
  import Textfield from "@smui/textfield";
  import CharacterCounter from "@smui/textfield/character-counter";
  import HelperText from "@smui/textfield/helper-text";
  import Stream from "$lib/components/Stream.svelte";
  import {
    settings,
    stream,
    isVideoGet,
    currentLessonNumber,
    lastAttemptSuccess,
  } from "$lib/stores";
  import { get } from "svelte/store";
  import { Icon } from "@smui/icon-button";
  import Assignment from "$lib/components/Assignment.svelte";
  import Editor from "$lib/components/Editor.svelte";
  import Output from "$lib/components/Output.svelte";
  import ControlBar from "$lib/components/ControlBar.svelte";
  import Button, { Label } from "@smui/button";
  import { onDestroy, onMount } from "svelte";
  import { page } from "$app/stores";
  import type {
    CourseInfo,
    Lesson,
    Module,
    OutputMessage,
    Process,
    Feedback,
  } from "$lib/types";
  import { fetchWithAuth, sendFeedback } from "$lib/api";
  import io from "socket.io-client";

  let feedbackForm: Feedback = {
    heading: "",
    text: "",
    email: "",
  };
  let menu: MenuSurface;

  let process: Process = "stopping";
  const mainServerSocket = io(import.meta.env.VITE_BACKEND_URL);

  let modules: Module[];
  let completedLessons: Boolean[] = [];
  let lessonsList: Lesson[];
  let lastAttempt: Boolean;
  let currentLesson = 0;
  currentLessonNumber.subscribe((num: number) => {
    currentLesson = num;
  });

  let isVideoDone = false;
  let isVideoRead = false;

  const storage = get(settings);
  const user = storage.username || "unknown";
  function exit() {
    window.location.href = "/user";
  }
  const courseID = $page.url.pathname.split("/")[3];
  let courseName: string;
  onMount(async () => {
    const course = (await fetchWithAuth(
      `/get-course?course_id=${courseID}`,
    )) as {
      info: CourseInfo;
      modules: Module[];
    }; // TODO: remove redundant wrapper in backend response
    completedLessons = getIsLessonsCompleted(course.modules);
    lessonsList = getLessonsList(course.modules);
    modules = course.modules;
    courseName = course.info.short_name;
  });

  async function getUserFeedback(event: any) {
    const formData = new FormData(event.target);
    formData.forEach((val, key) => {
      feedbackForm[key as keyof typeof feedbackForm] = val as string;
    });
    const feedback = sendFeedback(
      JSON.stringify({
        ...feedbackForm,
        course_id: courseID,
      }),
    );
  }

  function getIsLessonsCompleted(modules: Module[]) {
    let completedLessons: boolean[] = [];
    for (let i = 0; i < modules.length; i++) {
      completedLessons = completedLessons.concat(
        modules[i].lessons.map((el: { completed: boolean }) => el.completed),
      );
    }
    return completedLessons;
  }

  function getLessonsList(modules: Module[]) {
    let lessonsList: Lesson[] = [];
    for (let i = 0; i < modules.length; i++) {
      lessonsList = lessonsList.concat(modules[i].lessons);
    }
    return lessonsList;
  }

  onDestroy(() => {
    stream.set("");
    lastAttemptSuccess.set(true);
    isVideoGet.set(false);
  });
  stream.subscribe((value: string) => {
    if (value.length > 0) {
      isVideoRead = true;
    } else {
      isVideoRead = false;
    }
  });
  isVideoGet.subscribe((value: boolean) => {
    isVideoDone = value;
  });
  lastAttemptSuccess.subscribe((value: boolean) => {
    lastAttempt = value;
  });

  mainServerSocket.on("output", function (msg: OutputMessage) {
    if (storage.userID === msg.user) {
      process = msg.process;
      if (msg.process === "verification-finish") {
        if (msg.type !== "error") {
          completedLessons[currentLesson] = true;
        } else {
          completedLessons[currentLesson] = false;
        }
      }
    }
  });
</script>

<header>
  <h4>{courseName}</h4>
  <div>
    <Button on:click={() => menu.setOpen(true)}>
      <Label>Feedback form</Label>
    </Button>
    <MenuSurface
      style="width: 150%"
      bind:this={menu}
      anchorCorner="BOTTOM_LEFT"
    >
      <form on:submit|preventDefault={getUserFeedback} class="p4">
        <Textfield
          type="feedback"
          label="Feedback title"
          input$name="heading"
          input$maxlength={255}
          style="min-width: 100%; margin-bottom: 0.5rem"
          bind:value={feedbackForm.heading}
        />
        <Textfield
          type="feedback"
          input$name="text"
          label="Describe your issue here or share your thoughts"
          textarea
          style="min-width: 100%;"
          input$maxlength={255}
          bind:value={feedbackForm.text}
        >
          <CharacterCounter slot="helper">0 / 255</CharacterCounter>
        </Textfield>
        <Textfield
          type="email"
          input$name="email"
          label="If you want to hear back from us, enter your email"
          style="min-width: 100%;"
          input$maxlength={255}
          bind:value={feedbackForm.email}
        />
        <div class="enroll">
          <Button variant="outlined" touch type="submit">
            <Label>Send feedback</Label>
          </Button>
        </div>
      </form>
    </MenuSurface>
    <Button type="button" on:click={() => exit()}>
      <Icon class="material-icons">person</Icon>
      <Label>{user}</Label>
    </Button>
  </div>
</header>
<main class="wrapper main-panel">
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <HSplitPane minLeftPaneSize="30dvw" minRightPaneSize="30dvw">
    <left class="left-panel-resize" slot="left">
      {#if modules}
        <Assignment {completedLessons} {modules} />
      {/if}
    </left>
    <right class="right-panel-resize" slot="right">
      <VSplitPane
        minTopPaneSize="20dvh"
        minDownPaneSize="40dvh"
        downPanelSize="50dvh"
      >
        <top slot="top" class="top-panel-resize">
          <Editor />
        </top>
        <down slot="down" class="down-panel-resize">
          <Output />
          <Panel
            color={(!completedLessons[currentLesson] && isVideoDone) ||
            (completedLessons[currentLesson] && !lastAttempt && isVideoDone)
              ? "primary"
              : "secondary"}
            style={completedLessons[currentLesson] && lastAttempt
              ? "background-color: var(--success-color); min-width: 40%; max-height: 100%;"
              : "min-width: 40%; max-height: 100%;"}
          >
            <h3 style="margin: 0; padding-bottom: 10px">
              {!isVideoDone ? "Video stream" : "Video recording"}
            </h3>
            <Content style="width: 100%; height: 95%; position: relative">
              <Stream />
            </Content>
          </Panel>
          <ControlBar {courseID} {completedLessons} {lessonsList} />
        </down>
      </VSplitPane>
    </right>
  </HSplitPane>
</main>

<style scoped>
  :root {
    --success-color: green;
    --primary-color: #e25d39;
    --secondary-color: #5e5d76;
  }
  .main-panel {
    display: flex;
    height: 92dvh;
  }

  .left-panel-resize {
    display: flex;
    overflow: auto;
    height: 100%;
    overflow-x: auto;
  }
  .right-panel-resize {
    overflow: hidden;
    background: rgb(40, 44, 52);
    resize: none;

    overflow: none;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
  }
  .top-panel-resize {
    display: flex;
    overflow: auto;
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
  }
  .down-panel-resize {
    position: relative;
    display: flex;
    height: 100%;
    background-color: rgb(40, 44, 52);
    flex-direction: row;
    justify-content: space-between;
  }

  header {
    display: flex;
    align-items: center;
    background-color: rgb(93, 93, 120);
    padding: 0 1rem;
    justify-content: space-between;
    height: 8dvh;
  }
  header h4 {
    margin: 0;
  }

  .p4 {
    padding: 0.5rem;
  }
</style>
