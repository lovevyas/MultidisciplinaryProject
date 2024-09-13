# Frontend application for autolab(ondroid)

Web app made with Svelte, SvelteKit and SMUI

## Install

```bash
npm i
```
Add .env file with following variables
```
VITE_BACKEND_URL=URL_TO_AUTH_SERVER
```

## Developing
Add to _hosts_  file on your local machine
```
127.0.0.1       local.ondroid.org
```

```bash
npm run dev
```

Staring point is /src/app.html
Rounding done with [Svelte Kit rounting](https://kit.svelte.dev/docs/routing) first page is /src/pages/+page.svelte

## Building app

```bash
npm run build
```
## Deploy 
Application getting deployed automatically via GitHub Pages, settings located in ./github/workflows/publish.yml

For demo purpose application can be deployed via Vercel service manually for private user path https://autolab-fe-gleb-svechnikov.vercel.app/

## API
This application works with 2 backends, *Auth server* and *Setup server*
Setup server is used to control robot and Auth server is used to authenticate users

#### Setup server REST endpoints

- GET /video_feed - _get MJPEG video_
- GET /read_feed - _get MJPEG video with OpenCV output_

#### Setup server Web socket endpoints
- open_serial - _open serial port_
- close_serial - _close serial port_
- serial_input - _send data to serial port_
- output - _recieve serial output_
- upload_code - send code output_

#### Auth server REST endpoints
- POST /auth/login - _login user_
- POST /auth/signup - _register user_
- GET /auth/logout - _logout user_
