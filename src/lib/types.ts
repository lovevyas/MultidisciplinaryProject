export type CourseInfo = {
  requirements: string;
  workload: string;
  small_image: string;
  full_description: string;
  full_name: string;
  short_description: string;
  short_name: string;
  enrolled: boolean;
  date_last_modified: string | null,
  github_url: Link,
  id: number,
  lessons_list: Link,
  n_lessons: number,
  number_of_users: 8,
  owner: number
}

export type Module = {
  description: string;
  valid: boolean;
  sn: number,
  serial_n: number,
  lessons: Lesson[],
  name: string
}

export interface LessonData {
  index: number
  module: string
  next: string
  previous: string
  task: string
}
export type Process = 'stopping' | 'starting' | 'compilation' | 'uploading' | 'verification' | 'resetting' | 'verification-finish'
export interface OutputMessage {
  process: Process;
  msg: string;
  task: string;
  type: string;
  time: string;
  user: number;
  video_url: string | undefined;
}
export type Result = 'error' | 'success' | 'compilation'
export interface Output {
  type: Result
  result: string,
  height: number
}
export type videoInfo = {
  course_id: number
  course: string
  date: string
  result: Result
  size: number
  submission_id: number
  task: string
}
export type Response = {
  data: any
}
export type Choice = {
  name: string,
  icon: string
}
export type Submission = {
  course: string,
  course_id: number,
  date_created: string,
  date_last_modified: string,
  id: number,
  last_message: string,
  status: string,
  task: string,
  verification_result: Result,
  video_exists: boolean,

}
export type Attempt = Submission & {
  code?: Response,
  video?: Response,
  log?: Response,
  selectedOption?: Choice,
}

export type Link = string

export type Lesson = {
  description: string;
  date: string,
  id: number,
  url: Link,
  name: string,
  serial_n: number
  completed: boolean,
  str_id: string,
  template: string,
}
export type Course = {
  "Authorization": string,
  "completed": Lesson[],
  "not_completed": Lesson[],
  "http_code": number,
  "info": CourseInfo,
  "response_code": string,
  "lessons": Lesson[],
  "modules": Module[],
}
export type CoursesRequest = {
  courses: CourseInfo[],
}
export type CourseSubmissions = {
  "Authorization": string,
  "completed": Lesson[],
  "http_code": number,
  "data": Submission[],
  "response_code": string
}
export type CourseCard = {
  image: string,
  title: string,
  description: string,
  domain: string,
  link: string,
}

export type UserInformation = {
  name: string,
  phone: string,
  school: string,
  email: string,
}

export type Feedback = {
  heading: string;
  text: string;
  email: string;
}