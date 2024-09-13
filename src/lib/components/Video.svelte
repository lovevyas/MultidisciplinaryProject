<section class="video-explainer">
    <h2>Demo</h2>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video controls class="demo" preload="metadata">
        <source src="/videos/demo.webm" type="video/webm" />
        <source src="/videos/demo.mp4" type="video/mp4" />
        Video could not be played in your browser
    </video>
</section>
<style>
    .video-explainer{
      max-width: 720px;
      margin: auto;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .video-explainer video {
      width: 100%;
    }
   
    video.demo {
      display: flex;
      margin: auto;
    }
  </style>