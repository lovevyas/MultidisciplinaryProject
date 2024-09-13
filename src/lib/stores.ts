import { persisted } from 'svelte-local-storage-store'
import type { LessonData, Output } from './types'

export const defaultSettings = {
  domain: '',
  title: '',
  userID: 0,
  deviceID: 0,
  courseID: 0,
  username: ''
}
export const defaultLesson: LessonData = {
  module: '',
  task: '',
  index: 0,
  next: '',
  previous: ''
}
export const defaultOutput: Output = {
  type: 'success',
  result: '',
  height: 1
}

export const defaultCode: string = 'Use ↓ Upload in order to send code to the robot \n or use Stop ↓ in order ro interrupt your program'

export const settings = persisted('settings', defaultSettings)
export const lesson = persisted('lesson', defaultLesson)
export const output = persisted('output', defaultOutput)
export const codeStorage = persisted('code', defaultCode)
export const authToken = persisted('Authorization', '')
export const stream = persisted('stream', '')
export const isVideoGet = persisted('video', false)
export const currentLessonNumber = persisted('number', 0)
export const lastAttemptSuccess = persisted('success', true)
