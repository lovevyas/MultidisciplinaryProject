<script lang="ts">
  import { stream, isVideoGet } from "$lib/stores";
  import { Player, Hls } from "@vime/svelte";
  import { tick } from "svelte";

  let player: InstanceType<typeof Player>;

  let path: any = "";
  let ifVideoIsReady = false;
  const hlsConfig = {};
  stream.subscribe((value: any) => {
    if (value.length > 0) {
      path = value;
    } else {
      path = "/interruption-tv.gif";
    }
  });
  isVideoGet.subscribe((value) => {
    ifVideoIsReady = value;
  });
  function handleImageError() {
    // Handle the image error here
    // console.error("Error loading image:");
    //path = "/interruption-tv.gif";
  }
  async function onReadyStream() {
    await tick();
    player.play();
  }
</script>

<Player
  on:vmCurrentSrcChange={onReadyStream}
  bind:this={player}
  autoplay
  class="video"
  controls
  theme="dark"
>
  {#if ifVideoIsReady}
    <video class="video" autoplay controls>
      <source src={path} type="video/mp4" />
      <track kind="captions" />
    </video>
  {:else}
    <Hls version="latest" config={hlsConfig}>
      <source
        data-src={path}
        type="application/x-mpegURL"
        on:load={onload}
        on:error={handleImageError}
      />
    </Hls>
  {/if}
</Player>

<style>
  .video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 0;
  }
</style>
