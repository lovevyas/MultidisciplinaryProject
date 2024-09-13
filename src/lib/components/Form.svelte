<script lang="ts">
  import Button from "@smui/button";
  import Card, { PrimaryAction } from "@smui/card";
  import { Label } from "@smui/fab";
  import { sendLeadHandling } from "$lib/api";
  import { Cell, InnerGrid } from "@smui/layout-grid";
  import Textfield from "@smui/textfield";
  import type { UserInformation } from "$lib/types";

  let userInformation: UserInformation = {
    name: "",
    phone: "",
    school: "",
    email: "",
  };

  function getUserInfo(event: any) {
    const formData = new FormData(event.target);
    formData.forEach((val, key) => {
      userInformation[key] = val;
    });
    sendLeadHandling(userInformation);
  }
</script>

<section>
  <h2>Sign-up for a free pilot in your school</h2>
  <InnerGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
      <Card style="padding: 1em">
        <form on:submit|preventDefault={getUserInfo} class="p4">
          <Textfield
            type="text"
            label="Name"
            input$name="name"
            style="min-width: 100%;"
            bind:value={userInformation.name}
          />
          <Textfield
            type="text"
            label="School"
            input$name="school"
            style="min-width: 100%;"
            bind:value={userInformation.school}
          />

          <Textfield
            type="email"
            label="Email Address"
            input$name="email"
            style="min-width: 100%;"
            bind:value={userInformation.email}
          />
          <Textfield
            type="tel"
            label="Phone"
            input$name="phone"
            style="min-width: 100%;"
            bind:value={userInformation.phone}
          />
          <div class="enroll">
            <Button touch type="submit">
              <Label>Sign-up</Label>
            </Button>
          </div>
        </form>
      </Card>
    </Cell>
    <Cell
      style="margin: auto;"
      class="hide-on-mobile"
      spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}
    >
      <img src="https://placehold.co/600x300" alt="placehoder" />
    </Cell>
  </InnerGrid>
</section>

<style>
  .enroll {
    margin-top: 2rem;
  }
</style>
