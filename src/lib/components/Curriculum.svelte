<script>
  import Accordion, { Panel, Header, Content } from '@smui-extra/accordion'
  import { InnerGrid, Cell } from '@smui/layout-grid'
</script>

<section class="curriculum">
  <h2>Line-following robot controlled by an ESP32 boardt</h2>
  <InnerGrid>
    <Cell spanDevices={{ desktop: 3, tablet: 3, phone: 12 }}>
      <img class="pic" src="/images/linebot.jpg" alt="Linebot" style="margin-top: 1.5rem;"/>
    </Cell>
    <Cell spanDevices={{ desktop: 9, tablet: 9, phone: 12 }}>
      <h3>Description</h3>
      <p>
        You will learn to program a mobile platform, starting with just one line of code. 
        We use the microcontroller to control motors, LEDs, and read data from sensors. 
        Next, there's a racing track awaiting you. Begin with simple if statements to navigate along the line. 
        From there, move to more challenging assignments, improving your algorithm by developing the PID regulator. 
        The last part of the course is a digital city with different living and industrial areas. 
        You use a combination of a color sensor and a line-following sensor to navigate among the districts 
      </p>
    </Cell>
    <Cell spanDevices={{ desktop: 3, tablet: 3, phone: 12 }}>
      <h3>Acquired skills</h3>
      <Accordion>
        <Panel>
          <Header>Programming</Header>
          <Content>
            <ul>
              <li>C++ (Arduino wiring) basics</li>
              <li>Variables, functions, loops</li>
              <li>Visual blocks</li>
            </ul>
          </Content>
        </Panel>
        <Panel>
          <Header>Electronics</Header>
          <Content>
            <ul>
              <li>DC motors</li>
              <li>LEDs</li>
              <li>Line-following sensor</li>
              <li>Colour sensor</li>
            </ul>
          </Content>
        </Panel>
        <Panel>
          <Header>Robotics</Header>
          <Content>
            <ul>
              <li>Motion control</li>
              <li>Encoders library</li>
              <li>Reading and analyzing sensor data</li>
              <li>Line following algorithms</li>
              <li>PID regulator</li>
             
            </ul>
          </Content>
        </Panel>
      </Accordion>
    </Cell>
    <Cell spanDevices={{ desktop: 9, tablet: 9, phone: 12 }}>
      <h3>Curriculum</h3>
      <ol>
        <li>Introduction to the Robot</li>
        <li>Robot Motion Control</li>
        <li>Functions basics</li>
        <li>Functions advanced</li>
        <li>Encoders and Console Output</li>
        <li>Conditional Statements and Time-based Operations</li>
        <li>Real-time Robot Control</li>
        <li>LED Matrix</li>
        <li>Line Sensor</li>
        <li>Line following</li>
        <li>Proportional (P) Controller</li>
        <li>PID Controller</li>
        <li>Challenging Sections</li>
        <li>Smart City and Color Sensor</li>
      </ol>
    </Cell>
  </InnerGrid>
</section>

<style>
  .pic {
    width: 100%;
    margin: auto;
    display: flex;
  }
  /* .curriculum {
    display: flex;
    flex-direction: column;
    background-color: var(--mdc-on-surface);
    box-shadow: 0 0 0 100vmax var(--mdc-on-surface);
    clip-path: inset(0 -100vmax);
    padding: 2rem;
  } */
</style>
