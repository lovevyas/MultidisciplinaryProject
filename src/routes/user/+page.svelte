<script lang="ts">
  import { goto } from '$app/navigation'
  import UsersHeader from '$lib/components/UsersHeader.svelte'
  import Card, {
    Content,
    PrimaryAction,
    Media,
    MediaContent,
    Actions,
    ActionButtons,
  } from '@smui/card'
  import Button, { Label } from '@smui/button'
  import LayoutGrid, { Cell } from '@smui/layout-grid'
  import { fetchWithAuth } from '$lib/api'
  import { settings } from '$lib/stores'
  import { get } from 'svelte/store'
  import { onMount } from 'svelte'
  import type { CoursesRequest, videoInfo } from '$lib/types'
  const storage = get(settings)
  // const courses = get(coursesList)
  const layout = { desktop: 6, tablet: 6, phone: 12 }
  const basePath = import.meta.env.VITE_BACKEND_URL

  let courses = []
  async function enroll(course_id: number) {
    const body = {
      days: 10,
      course_id,
    }
    const response = await fetchWithAuth('/join-course', {
      method: 'post',
      body: JSON.stringify(body),
    })
  }

  onMount(async () => {
    const coursesRequest = (await fetchWithAuth(
      '/get-courses',
    )) as CoursesRequest
    courses = coursesRequest.courses
  })
</script>

<div class="wrapper">
  <UsersHeader />
  <LayoutGrid>
    <Cell span={12}>
      <h2>Hello, {storage.username}</h2>
      <p>This is your profile of Ondroid - online robotics learning platform</p>
      <p>
        Ondroid allows it's user to access, control and watch real robots in
        realtime
      </p>
      <p>You can:</p>
      <ul>
        <li><a href="/user/courses">Go to courses page</a></li>
        <li><a >Change you password</a></li>
        <li><a >Recieve cetificate</a></li>
        <li><a href="/user/feedback">Contact help desk</a></li>
      </ul>
    </Cell>
  </LayoutGrid>
</div>

<style>
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
</style>
