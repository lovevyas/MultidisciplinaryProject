<script lang="ts">
  import Button, { Group, Label } from "@smui/button";
  import Fab, { Icon } from "@smui/fab";
  import MenuSurface from "@smui/menu-surface";
  import { Content } from "@smui-extra/accordion";
  import Fullscreen from "$lib/components/Fullscreen.svelte";
  import { lesson, currentLessonNumber } from "$lib/stores";
  import { onMount, tick } from "svelte";
  import { get } from "svelte/store";
  import MarkdownIt from "markdown-it";
  import matter from "gray-matter";
  import Select, { Option } from "@smui/select";
  import type { Course, LessonData, Lesson, Module } from "$lib/types";
  import { fetchFromGithub } from "$lib/api";
  import { slide } from "svelte/transition";

  export let completedLessons: Boolean[];
  export let modules: Module[] = [
    {
      name: "",
      description: "",
      valid: false,
      sn: 0,
      serial_n: 0,
      lessons: [],
    },
  ];

  let selectedItem: number = 0;

  let menu: MenuSurface;
  
  let current = {
    index: 0,
    name: "",
    url: "",
  };

  let lessonsList: {
    name: string;
    url: string;
  }[] = [];
  let markdown: string;
  let htmlContent: string;
  const md = new MarkdownIt();

  async function selectLesson(event: CustomEvent) {
    const lessonIndex = lessonsList.findIndex(
      (lesson) =>
        lesson.name === (<HTMLLIElement>event.target).innerText.substring(5),
    );
    currentLessonNumber.set(lessonIndex);
  }

  currentLessonNumber.subscribe(async () => {
    await tick();
    fetchHtml();
  });

  async function getLesson() {
    const markDown = fetch(current.url, {
      method: "get",
      headers: {
        Accept: "application/vnd.github.raw+md",
      },
    }).then((response) => {
      return response.text();
    });
    const text = await markDown.then((result: string) => {
      return result;
    });

    const { content, data } = matter(text);

    htmlContent = md.render(content);

    lesson.set(data as LessonData);
  }
  async function fetchHtml() {
    lessonsList = getAllLessonsFromModules(modules);
    const startIndex = get(currentLessonNumber);
    current = {
      index: startIndex,
      ...lessonsList[startIndex],
    };
    await getLesson();
  }

  function getAllLessonsFromModules(modules: Module[]) {
    let lessonsList: Lesson[] = [];
    for (let i = 0; i < modules.length; i++) {
      lessonsList = lessonsList.concat(modules[i].lessons);
    }
    return lessonsList;
  }

  onMount(async () => {
    if (
      localStorage.getItem("Authorization") === null ||
      localStorage.getItem("Authorization") === undefined
    ) {
      window.location.href = "/login";
    } else {
      try {
        await fetchHtml();
      } catch (error) {
        console.error("error", error);
      }
    }
  });
</script>

<Fullscreen let:onToggle let:onExit let:isFull>
  <article class="markdown">
    <Group
      style="background: rgba(255,255,255,0.1); display: flex; justify-content: center; align-items: center; height: 10%;"
    >
      <Button
        on:click={() => currentLessonNumber.set(current.index - 1)}
        disabled={current.index === 0}
        color="secondary"
      >
        <Icon class="material-icons">arrow_backward</Icon>
      </Button>

      <div style="text-align: center; max-width: 70%;">
        <Button
          variant="outlined"
          color="secondary"
          style="border: none;"
          on:click={menu.setOpen(true)}
        >
          <!-- menu.setOpen(true) -->
          <Label
            >{(modules.find((module) => module.lessons.some((el) => el.name.includes(current.name)) == true))?.serial_n + 1 + ". " + (modules.find(
              (module) =>
                module.lessons.some((el) => el.name.includes(current.name)) ==
                true
            ))?.name +
              " / " +
              current.name}</Label
          >
        </Button>
        <MenuSurface
          style="width: 100%"
          bind:this={menu}
          anchorCorner="BOTTOM_LEFT"
        >
          <div>
            {#each modules as module, i}
              <Option
                style="padding: 1rem"
                on:click={() => {
                  i === selectedItem ? (selectedItem = -1) : (selectedItem = i);
                }}
              >
                {i + 1 + ". " + module.name}
              </Option>

              {#if selectedItem === i}
                <div transition:slide>
                  {#each module.lessons as lesson, lessonIndex}
                    <Option
                      on:click={selectLesson}
                      style={completedLessons[
                        lessonsList.findIndex((el) => el.name === lesson.name)
                      ]
                        ? "border-left: 3px solid var(--success-color);"
                        : "border-left: 3px solid var(--primary-color);"}
                    >
                      {i + 1 + "." + (lessonIndex + 1) + ". " + lesson.name}
                    </Option>
                  {/each}
                </div>
              {/if}
            {/each}
          </div>
        </MenuSurface>
      </div>

      <Button
        on:click={() => currentLessonNumber.set(current.index + 1)}
        disabled={current.index === lessonsList.length - 1}
        color="secondary"
      >
        <Icon class="material-icons">arrow_forward</Icon>
      </Button>
    </Group>
    <div class="fullscreen-button">
      <Fab
        style="--mdc-theme-secondary: transparent;"
        on:click={() => onToggle()}
      >
        <Icon class="material-icons">
          {isFull ? "fullscreen_exit" : "fullscreen"}
        </Icon>
      </Fab>
    </div>
    <Content style="height: 90%; max-width:100%;">
      <div id="assignment">
        {@html htmlContent}
      </div>
    </Content>
  </article>
</Fullscreen>

<style scoped>
  article {
    width: 100%;
  }
  .fullscreen-button {
    position: absolute;
    top: 5rem;
    right: 2rem;
  }
  #assignment {
    height: 100%;
    overflow-y: scroll;
    padding: 0 0.5rem;
  }
  .markdown {
    position: relative;
    height: 92dvh;
  }
  .markdown #assignment {
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
</style>
