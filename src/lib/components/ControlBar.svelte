<script lang="ts">
  import { Label } from "@smui/fab";
  import {
    codeStorage,
    currentLessonNumber,
  } from "$lib/stores";
  import { get } from "svelte/store";
  import { settings } from "$lib/stores";
  import Button, { Group } from "@smui/button";
  import { fetchWithAuth } from "$lib/api";
  import io from "socket.io-client";
  import type { OutputMessage, Process, Lesson } from "$lib/types";

  export let courseID: string;
  export let completedLessons: any[];
  export let lessonsList: Lesson[];

  let process: Process = "stopping";
  let isDisabled = false;

  let currentLesson = 0;
  currentLessonNumber.subscribe((num) => {
    currentLesson = num;
  });
  const storage = get(settings);
  const mainServerSocket = io(import.meta.env.VITE_BACKEND_URL);

  async function submit() {
    const currentLesson = get(currentLessonNumber);
    const formData = {
      course_id: Number(courseID),
      code: get(codeStorage),
      task: lessonsList[currentLesson].str_id,
      submission_type: "verify",
    };
    const submitCode = await fetchWithAuth("/submit", {
      method: "post",
      body: JSON.stringify(formData),
    });
    isDisabled = true;
  }
  async function interrupt() {
    const stop = await fetchWithAuth("/interrupt-last-submission", {
      method: "get",
    });
    isDisabled = false;
  }
  mainServerSocket.on("output", function (msg: OutputMessage) {
    if (storage.userID === msg.user) {
      process = msg.process;

      if (msg.type === "error") {
        isDisabled = false;
      }
      if (msg.process === "verification-finish") {
        isDisabled = false;
        if (msg.type !== "error") {
          completedLessons[currentLesson] = true;
        } else { 
          completedLessons[currentLesson] = false;
        }
      }
      if (msg.process === "uploading" || msg.process === "verification") {
        isDisabled = true;
      }
    }
  });
</script>

<div class="controls">
  <Group id="controls">
    <Button
      type="button"
      on:click={submit}
      variant="raised"
      disabled={isDisabled}
      style={completedLessons[currentLesson]
        ? "background-color: var(--success-color)"
        : ""}
    >
      <Label>
        {#if process == "uploading" || process == "verification"}
          <span class="loading">Verifying</span>
        {:else}
          Verify
        {/if}
      </Label>
    </Button>
    <Button
      type="button"
      on:click={interrupt}
      variant="outlined"
      style={completedLessons[currentLesson]
        ? "border-color: var(--success-color); color: var(--success-color); width: 20%"
        : "width: 20%"}
    >
      <Label>Stop</Label>
    </Button>
  </Group>
</div>

<style>
  .controls {
    position: absolute;
    z-index: 1;
    right: 17px;
    top: -50px;
    background-color: #282c3488;
    max-width: 50%;
    align-items: center;
  }
  .loading {
    margin-right: 1rem;
    position: relative;
  }

  .loading:after {
    position: absolute;
    overflow: hidden;
    display: inline-flex;
    font-size: 1rem;
    animation: ellipsis steps(4, end) 1000ms infinite;
    content: "⋯";
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }
</style>
