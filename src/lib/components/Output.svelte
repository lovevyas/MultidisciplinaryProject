<script lang="ts">
  import Fab, { Icon } from "@smui/fab";
  import Fullscreen from "$lib/components/Fullscreen.svelte";
  import {
    settings,
    stream,
    isVideoGet,
    lastAttemptSuccess,
  } from "$lib/stores";
  import io from "socket.io-client";
  import { get } from "svelte/store";
  import type { OutputMessage } from "$lib/types";
    import { tick } from "svelte";
  const storage = get(settings);
  const mainServerSocket = io(import.meta.env.VITE_BACKEND_URL);
  const metaUrl = import.meta.env.VITE_BACKEND_URL;
  let results: any = [];
  let element: HTMLOutputElement;

  $: if(results) {
    scrollToBottom(element);
  }
  const scrollToBottom = async (node: HTMLOutputElement) => {
    await tick();
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }; 

  async function setNewVideoUrl(url: string) {
    const request = fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Authorization") || "",
      },
    }).then((response) => {
      return response.blob();
    });

    await request.then((videoFile) => {
      if (!(videoFile instanceof Blob)) {
        throw new Error("`videoFile` must be a Blob or File object.");
      }
      const newObjectUrl = URL.createObjectURL(videoFile);
      stream.set(newObjectUrl);
      isVideoGet.set(true);
    });
  }

  mainServerSocket.on("output", function (msg: OutputMessage) {
    console.log(msg);

    if (storage.userID === msg.user) {
      results = results.concat(msg);

      if (msg.process === "starting") {
        stream.set(""); // clear player before start new stream
        results = [results.pop()];
      }
      if (msg.process === "connecting-video" && msg.video_url) {
        isVideoGet.set(false);
        stream.set(msg.video_url);
      }
      if (msg.process === "verification-finish") {
        console.log("DONE");
        if (msg.type === "error") {
          lastAttemptSuccess.set(false);
        } else {
          lastAttemptSuccess.set(true);
        }
      }
      if (msg.process === "download-video" && msg.video_url) {
        console.log("video is ready for downloading");
        setNewVideoUrl(metaUrl + msg.video_url);
      }
    }
  });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<Fullscreen let:onToggle let:onExit let:isFull>
  <section class="wrapper">
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
    <output bind:this={element} class="preformatted">
      {#each results as result (result.time)}
        <span
          class="{result.type === 'error' ? 'error' : ''} {result.type ===
            'success' && result.command === 'verification_end'
            ? 'success'
            : ''}"
        >
          {Intl.DateTimeFormat("en", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
            timeZone: timezone,
            // month: "short",
            // day: "numeric",
          }).format(new Date(result.time))} [{result.process}] - {result.msg}
        </span>
      {/each}
    </output>
  </section>
</Fullscreen>

<style scoped>
  .fullscreen-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  .wrapper {
    padding: 1rem 0rem 1rem 1rem;
    position: relative;
    overflow: auto;
  }
  .preformatted {
    font-family: monospace;
    white-space: break-spaces;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>
