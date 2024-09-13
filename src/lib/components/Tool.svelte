<script>
  import { Cell, InnerGrid } from "@smui/layout-grid";
</script>

<section class="tool">
  <h2>Our tool allows you to organize robotics and ICT lessons with physical robots:</h2>
  <InnerGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
      <ul>
        <li>No need to purchase additional hardware</li>
        <li>Suitable for limited space</li>
        <li>Accommodates a tight budget</li>
        <li>Provides 24/7 access to the platform</li>
        <li>Offers lesson plans and autotests tailored to your curriculum</li>
        <li>Utilizes physical robots in a real environment, not a simulation</li>
      </ul>
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }} />
  </InnerGrid>
</section>

<style>
  .tool {
    display: flex;
    flex-direction: column;
    clip-path: inset(0 -100vmax);
    padding-bottom: 2rem;
  }
</style>
