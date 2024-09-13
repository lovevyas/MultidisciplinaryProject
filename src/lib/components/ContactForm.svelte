<script lang="ts">
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import Card, { PrimaryAction } from "@smui/card";
  import { Label } from "@smui/fab";
  import { Cell, InnerGrid } from "@smui/layout-grid";
  import HelperText from "@smui/textfield/helper-text";

  let name = "";
  let email = "";
  let phoneNumber = "";
  let message = "";
</script>

<section class="contactForm">
  <h2>Schedule a call for an online tour</h2>

  <InnerGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
      <h4>
        If you have any remaining questions, we would be delighted to offer you a consultation and provide an online tour of our platform. We will address all your inquiries and assist you in determining the suitability of our solution for your tasks and projects.
      </h4>
      <div class="contact">
        You can contact us via Email, LinkedIn, WhatsApp or Contact form on the
        right:
        <p>
          <a href="mailto:info@ondroid.org">Email Us</a>
          <a href="https://www.linkedin.com/company/ondroid/" target="_blank"
            >LinkedIn</a
          >
          <a href="https://wa.me/tel:+358414931823">WhatsApp</a>
        </p>
      </div>
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
      <Card>
        <form method="POST">
          <Textfield
            type="text"
            label="Name"
            input$name="name"
            style="min-width: 100%;"
            bind:value={name}
          />

          <Textfield
            type="email"
            label="Email"
            input$name="email"
            style="min-width: 100%;"
            bind:value={email}
          />
          <Textfield
            type="tel"
            label="Phone Number"
            input$name="phone"
            style="min-width: 100%;"
            bind:value={phoneNumber}
          />
          <Textfield
            textarea
            bind:value={message}
            label="Message"
            type="text"
            input$name="message"
            style="min-width: 100%;"
          >
            <HelperText slot="helper">Give us more info</HelperText>
          </Textfield>

          <div class="contact">
            <Button touch type="submit">
              <Label>Send request</Label>
            </Button>
          </div>
        </form>
      </Card>
    </Cell>
  </InnerGrid>
</section>

<style>
  .contactForm {
    display: flex;
    flex-direction: column;
    background-color: var(--mdc-on-surface);
    box-shadow: 0 0 0 100vmax var(--mdc-on-surface);
    clip-path: inset(0 -100vmax);
    padding-bottom: 2rem;
  }
  .contact {
    margin-top: 2rem;
  }
</style>
