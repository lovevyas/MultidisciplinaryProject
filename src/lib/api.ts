import { goto } from '$app/navigation';
import type { UserInformation } from './types';

export async function fetchWithAuth<T>(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('Authorization');
  if (token) {
    const expirationDate = JSON.parse(window.atob(token.split(".")[1])).exp
    const currentDateInEpochTime = Math.floor(Date.now() / 1000)
    if ((expirationDate - currentDateInEpochTime) < 60) {
      await refreshFetch(options);
    }
    const newToken = localStorage.getItem('Authorization');
    const Authorization = "Bearer " + newToken || '';
    options.headers = {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: Authorization
    };

    try {
      const response = await simpleFetch(path, options);
      return response

    } catch (error) {
      throw error;
    }
  }
  else {
    window.location.replace('/login')
  }
}

export async function fetchFromGithub<T>(path: string): Promise<T> {
  const options = {
    method: 'get',
    headers: {
      'Accept': 'application/vnd.github.raw+json',
    },
  };

  try {
    const response = await fetch(path, options);
    return await response.json() as T;
  } catch (error) {
    throw error;
  }

}

export async function simpleFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };
  const basePath = import.meta.env.VITE_BACKEND_URL
  const url = `${basePath}${path}`
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      switch (response.status) {
        case 401:
          goto("/login");
          throw new Error('Unauthorized');
        default:
          throw new Error('Network response was not ok');
      }
    }
    return await response.json() as T;
  } catch (error) {
    throw error;
  }
}

async function refreshFetch<T>(options: RequestInit = {}): Promise<T> {
  const Refresh = "Bearer " + localStorage.getItem('Refresh') || '';
  options.method = "post";
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    Authorization: Refresh,
  };
  const basePath = import.meta.env.VITE_BACKEND_URL
  const url = `${basePath}/refresh`
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      switch (response.status) {
        case 401:
          goto("/login");
          throw new Error('Unauthorized');
        default:
          throw new Error('Network response was not ok');
      }
    } else {
      const auth = response.headers.get("Authorization") || '';
      const refresh = response.headers.get("Refresh") || '';

      localStorage.setItem("Authorization", auth);
      localStorage.setItem("Refresh", refresh);
    }
    return await response.json() as T;
  } catch (error) {
    throw error;
  }
}

export async function sendLeadHandling(userInformation: UserInformation) {
  try {
    const response: any = await simpleFetch("/lead-handling", {
      method: "POST",
      body: JSON.stringify(userInformation),
    });
    const data = response.response_msg;
    if (data === "The mail sent successfully") {
      alert("Thank you, We will send an instruction manual to your email!");
    } else {
      alert("Enrollment failed");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function sendFeedback(feedbackFormString: string, options: RequestInit = {}) {
  options.method = "post";
  options.body = feedbackFormString;
  try {
    const response: any = await simpleFetch("/send-bug-report", options);
    console.log(response)
  } catch (error) {
    console.error(error);
  }
}