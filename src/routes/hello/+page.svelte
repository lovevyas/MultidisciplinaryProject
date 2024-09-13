<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
</script>

<div class="wrapper">
  <Header />
  <LayoutGrid>
    <Cell span={12}>
      <h1>Hello, world!</h1>
      <p>
        This is a manifesto for the Ondroid project. Here, I will delve into the
        'whys' and 'hows' of its existence, exploring the technology and the
        people behind it.
      </p>
      <h2>What?</h2>
      <p>
        The project's primary goal is to create Massive Open Online Courses
        (MOOC) with remote access to physical hardware. The initial
        implementation focuses on robotics studies, but the concept can be
        extended to other hardware, such as 3D printers, FPGA boards, pendulums,
        etc.
      </p>
      <p>
        It functions similarly to any other online course web app, with one
        crucial difference:
      </p>
      <ul>
        <li>Connect to the platform and log in.</li>
        <li>Choose a course.</li>
        <li>Read the assignment.</li>
        <li>Complete the assignment by writing code or providing answers.</li>
        <li>
          Your answer is executed on physical hardware and automatically
          verified using computer vision.
        </li>
      </ul>
      <p>
        This approach enables us to provide access to remote hardware and
        automate the process as much as possible.
      </p>
    </Cell>
    <Cell span={12}>
      <img class="img-hello"
        src="/images/hello1.png"
        alt="Dashboard stream and code"
      />
    </Cell>

    <Cell span={12}>
      <h2>Online course: line-following robot</h2>
      <p>
        As a first implementation, we've developed an online course featuring
        the ESP32 line-following robot. You can explore it firsthand at
        <a href="https://ondroid.org/line-follower"
          >https://ondroid.org/line-follower</a
        >. If you're interested, feel free to sign up, and I'll assist you with
        onboarding.
      </p>
    </Cell>
    <Cell span={12}>
      <img class="img-hello"
        src="/images/hello2.jpg"
        alt="Robo the First"
      />
    </Cell>
    <Cell span={12}>
      <h2>Why bother?</h2>
      <p>
        Several challenges come with traditional hardware-based learning.
        Hardware is often expensive, requiring maintenance, teacher training,
        and additional costs for spare parts and storage. As more students opt
        for remote learning, many schools lack access to, or cannot afford,
        necessary hardware.
      </p>
      <p>
        Considering the increasing trend of remotely operated hardware,
        preparing for the future is crucial. Robots today operate in open space,
        deep waters or other harsh environments. Initiatives like the Astro Pi
        project, allowing kids to run programs on Raspberry Pi in space,
        exemplify this trend. It's wise to commence training now.
      </p>
      <h2>How?</h2>
      <p>We employ rather exciting technology to deliver our services:</p>
      <h3>Robot</h3>
      <p>
        Our primary tool is a robot programmed remotely using the ESP32
        controller. The controller supports OTA (over the air) code upload,
        eliminating the need for physical connections. We've crafted the robot
        ourselves using a laser cutter and a 3D printer, and the drawings and
        schematics will be freely available.
      </p>
    </Cell>
    <Cell span={12}>
      <img class="img-hello" src="/images/hello3.jpg" alt="Robo the Second" />
    </Cell>
    <Cell span={12}>
      <h3>Stage</h3>
      <p>
        We've designed and built a stage for the robot to navigate and perform
        various assignments, including line-following, motion control, and
        sensor reading.
      </p>
      <h3>Local Raspberry Pi Server</h3>
      <p>
        A Raspberry Pi board is used to stream MJPEG video to users, wirelessly
        upload code to the robot, and auto-verify assignments using Computer
        Vision. We employ a Flask server wrapped in a Docker container for the
        software.
      </p>
      <h3>Backend</h3>
      <p>
        The backend securely stores user and device data, ensuring secure
        authorization. Additionally, a separate server optimizes code
        compilation times for students.
      </p>
      <h3>Frontend</h3>
      <p>
        Our web application utilises the robust and user-friendly Svelte
        framework.
      </p>
      <h2>Who?</h2>
      <p>
        I've been working in education since 2014, starting with the Fab Lab
        project and subsequently conducting online and on-site robotics and
        digital fabrication classes for kids. At peak, over 500 kids visited us
        weekly.
      </p>
      <p>
        In 2022 we moved to Finland. Right now our headquarters are in Helsinki. <br
        />
        In 2023 we graduated from the Helsinki Education Hub Incubator.
      </p>
      <p>A shoutout to the team working on this project:</p>
      <ul>
        <li>
          Dmitrii Spivak (co-founder, CEO) <a
            href="https://www.linkedin.com/in/dmitrii-spivak-261a2940/"
            >Dmitrii's LinkedIn</a
          >
        </li>
        <li>Anastasiia Spivak (co-founder)</li>
        <li>
          Kirill Kazakov (co-founder, devops, architect) <a
            href="https://www.linkedin.com/in/kazakovk/">Kirill's LinkedIn</a
          >
        </li>
        <li>Aleksandr Nosov (backend, robotics)</li>
        <li>
          Gleb Svetchnikov (frontend) <a
            href="https://www.linkedin.com/in/glebsvechnikov/"
            >Gleb's LinkedIn</a
          >
        </li>
        <li>Timur Samudzinau (intern frontend)</li>
        <li>
          Julia Zditovetskaya (intern frontend) <a
            href="https://www.linkedin.com/in/yuliya-zditovetskaya-5b358196/"
            >Julia's LinkedIn</a
          >
        </li>
      </ul>
      <h2>Call to action</h2>
      <p>
        If you are an educator or industry specialist and you are interested in
        technology that we are developing do not hesitate to contact me directly
        through email:<a href="spivakdm@gmail.com ">spivakdm@gmail.com</a> or
        <a href="https://www.linkedin.com/in/dmitrii-spivak-261a2940/"
          >LinkedIn</a
        >
      </p>
      <p>Sincerely yours, <br /> Dmitrii Spivak, co-founder Ondroid</p>
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

  .img-hello {
    max-width: 100%;
    width: 1100px;
  }
</style>
