<script>
  import { Cell, InnerGrid } from "@smui/layout-grid";
</script>

<section class="tool">
  <h2>Pricing</h2>
  <InnerGrid>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }}>
      <ul>
        <li>Free trial at your school</li>
        <li>5 EUR per student per month (yearly payment)</li>
        <li>6 EUR per student per month (monthly payments)</li>
      </ul>
      *5 students minimum per school
    </Cell>
    <Cell spanDevices={{ desktop: 6, tablet: 12, phone: 12 }} />
  </InnerGrid>
</section>

<style>
  .tool {
    display: flex;
    flex-direction: column;
    background-color: var(--mdc-on-surface);
    box-shadow: 0 0 0 100vmax var(--mdc-on-surface);
    clip-path: inset(0 -100vmax);
    padding-bottom: 2rem;
  }
</style>
