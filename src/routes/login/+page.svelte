<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import { goto } from "$app/navigation";
  import { settings } from "$lib/stores";
  let email = "";
  let username = "";
  let password = "";
  let signup = false;
  function responseToStr(response: any) {
    // add this function to convert sttring|null to string
    if (response == null) {
      return "";
    } else {
      return response;
    }
  }
  async function handleSubmit() {
    const path = signup ? "/signup" : "/login";
    const body = JSON.stringify(
      signup ? { email, username, password } : { username, password },
    );
    const request = fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then((response) => {
      const auth = responseToStr(response.headers.get("Authorization"));
      const refresh = responseToStr(response.headers.get("Refresh"));

      localStorage.setItem("Authorization", auth);
      localStorage.setItem("Refresh", refresh);
      

      return response.json();
    });
    const json = await request.then((data: any) => {
      return data;
    });
    if (json.http_code === 200) {
      settings.set({
        domain: "",
        title: "",
        courseID: 0,
        userID: json.data.user_id,
        deviceID: 0,
        username: json.data.username,
      });
      if (signup) {
        alert("Check your email box and confirm your registration");
        return false
      }
      else{
        goto("/user");
      }

      goto("/user");
    } else {
      alert(json.response_msg);
      console.error(json.data);
    }
    //console.log(json);
  }
</script>

<div class="wrapper">
  <Header />
  <section>
    {#if signup}
      <h2>Sign-up</h2>
    {:else}
      <h2>Login</h2>
    {/if}
    <form method="POST" on:submit|preventDefault={handleSubmit} class="p4">
      {#if signup}
        <Textfield
        required
        type="email"
        label="Email"
        input$name="email"
        style="min-width: 100%;"
        bind:value={email}
      />
      {/if}
        <Textfield
          required
          type="text"
          label="Username"
          input$name="username"
          style="min-width: 100%;"
          bind:value={username}
        />
        <Textfield
          required
          type="password"
          label="Password"
          input$name="password"
          style="min-width: 100%;"
          bind:value={password}
        />
      {#if signup}
        <Button touch type="submit">Sign-up</Button>
      {:else}
        <p>
          Have not account? <Button
            color="secondary"
            type="button"
            on:click={() => (signup = true)}>Sign-up</Button
          >
        </p>
        <Button touch type="submit">Login</Button>
      {/if}
    </form>
  </section>
</div>

<style>
  section {
    width: 300px;
    margin: auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  .wrapper {
    margin: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
  }
</style>