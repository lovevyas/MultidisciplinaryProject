<script>
  import { Cell, InnerGrid } from '@smui/layout-grid'
</script>

<section class="how">
  <h2>How it works</h2>
  <InnerGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
      <h3>1. Connect to the Robot</h3>
      <p>
        Use our platform to establish a remote connection to a physical robot. Students can control the robot, program it, and observe its actions in real-time.
      </p>
      <h3>2. Follow the Curriculum</h3>
      <p>
        Each course comes with a step-by-step curriculum and comprehensive lesson plans that students can easily follow. Lessons incorporate text, images, videos, and hands-on exercises.
      </p>
      <h3>3. Write Code or Use Visual Blocks</h3>
      <p>
        Students can complete assignments using code-based programming languages (e.g., C++ or Python) or a visual programming language based on Blockly.  
      </p>
      <h3>4. Auto-Verify Assignments Using Computer Vision</h3>
      <p>
        Students can observe how the robot performs in real-time, and assignments are automatically verified using computer vision.
      </p>
      <h3>5. Gamify education process</h3>
      <p>
        Completing the course is akin to navigating through a video game. We monitor student progress, offer rewards, and organize competitions with peers. Various hardware setups include sandboxes for students to experiment and unleash their creativity (e.g., drawing with a mobile robot).
      </p>
    </Cell>
    <Cell style="margin: auto;" class="hide-on-tablet" spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
        <img  src="https://placehold.co/500x500" alt="placehoder" />
      </Cell>
  </InnerGrid>
</section>

<style>
  .how {
    display: flex;
    flex-direction: column;
    background-color: var(--mdc-on-surface);
    box-shadow: 0 0 0 100vmax var(--mdc-on-surface);
    clip-path: inset(0 -100vmax);
    padding-bottom: 2rem;
  }
</style>
