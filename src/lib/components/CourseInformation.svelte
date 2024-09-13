<script lang="ts">
  import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
  import type { Module } from "$lib/types";

  export let modules: Module[];
</script>

<div class="accordion-container">
  <Accordion class="accordion">
    {#each modules as module}
      <Panel class="panel">
        <Header class="header">{module.name}</Header>
        <Content class="content">
          <p>{module.description}</p>
          <ul>
            {#each module.lessons as lesson}
              <li>
                "{lesson.name}" - {lesson.description}
              </li>
            {/each}
          </ul>
        </Content>
      </Panel>
    {/each}
  </Accordion>
</div>
