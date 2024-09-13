<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import Curriculum from "$lib/components/Curriculum.svelte";
  import LayoutGrid, { Cell, InnerGrid } from "@smui/layout-grid";
  import How from "$lib/components/How.svelte";
  import Form from "$lib/components/Form.svelte";
  import Video from "$lib/components/Video.svelte";
  import ContactForm from "$lib/components/ContactForm.svelte";
  import Tool from "$lib/components/Tool.svelte";
  import Partners from "$lib/components/Partners.svelte";
  import Prices from "$lib/components/Prices.svelte";
</script>

<div class="wrapper">
  <Header />
  <LayoutGrid>
    <Cell span={12}>
      <h2>Robotics classes at your school with just a click</h2>
    </Cell>
    <Cell span={12}>
      <Form />
    </Cell>
    <Cell span={12}>
      <Tool />
    </Cell>
    <Cell span={12}>
      <How />
    </Cell>
    <Cell span={12}>
      <Video />
    </Cell>
    <Cell span={12}>
      <Curriculum />
    </Cell>
    <!-- <Cell span={12}>
      <ContactForm />
    </Cell> -->
    <Cell span={12}>
      <Partners />
    </Cell>
    <Cell span={12}>
      <Prices />
    </Cell>
  </LayoutGrid>
  <Footer />
</div>

<style>
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
</style>
