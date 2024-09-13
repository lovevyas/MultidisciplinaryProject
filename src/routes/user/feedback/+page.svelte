<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import CharacterCounter from "@smui/textfield/character-counter";
  import Textfield from "@smui/textfield";
  import HelperText from "@smui/textfield/helper-text";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import Button, { Label } from "@smui/button";
  import type { Feedback } from "$lib/types";
  import UsersHeader from "$lib/components/UsersHeader.svelte";
  import { page } from "$app/stores";
  import { sendFeedback } from "$lib/api";

  const courseID = $page.url.pathname.split("/")[3];
  let feedbackForm: Feedback = {
    heading: "",
    text: "",
    email: "",
  };

  function getUserFeedback(event: any) {
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
</script>

<section class="wrapper">
  <UsersHeader />

  <LayoutGrid>
    <Cell spanDevices={{ desktop: 12 }}>
      <h2>Contact help desk</h2>
    </Cell>
    <Cell span={12}>
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
          style="min-width: 100%; word-break: break-all; white-space: pre-wrap;"
          input$maxlength={255}
          input$rows={4}
          input$cols={128}
          input$resizable={true}
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
    </Cell>
  </LayoutGrid>
  <Footer />
</section>

<style>
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
</style>
