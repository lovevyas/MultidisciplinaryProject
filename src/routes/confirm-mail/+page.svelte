<script lang="ts">
  //import Header from "$lib/components/Header.svelte";
  //import Footer from "$lib/components/Footer.svelte";
  import Button from "@smui/button";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  // export let url: string;
  const token = $page.url.searchParams.get("token");
  let resp = "";
  async function login() {
        // Do some login stuff
        goto('/login');
    }
  onMount(() => {
    fetch(`https://api.ondroid.org/confirm-mail/${token}`, {
      method: "GET",
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (
          data.response_code === "SUCCESS" &&
          data.response_msg === "Your email address confirmed successfully!"
        ) {
          // Successfully confirmed mail
          console.log("Email confirmed successfully!");
          console.log(data.response_msg);
          resp = data.response_msg;
          // Redirect to the login page
          //goto("/login");
        } else if (
          data.response_code === "SUCCESS" &&
          data.response_msg ===
            "Confirmation email was re-sent to your email address"
        ) {
          console.log(data.response_msg);
          resp = data.response_msg;
        } else if (data.response_code === "BAD_REQUEST") {
          // Handle bad request scenarios
          if (data.response_msg === "The user has already confirmed email") {
            // User has already confirmed email
            console.warn("User has already confirmed email");
            resp = data.response_msg;
            // You can redirect to login or handle as needed
          } else if (data.response_msg === "Incorrect token") {
            // Incorrect token
            console.error("Incorrect token");
            resp = data.response_msg;
          } else if (data.response_msg === "This email is not registered") {
            // Incorrect token
            console.error("This email is not registered");
            resp = data.response_msg;
            // Handle error or display a message to the user
          } else {
            // Other bad request scenarios
            console.error("Bad request:", data.response_msg);
            resp = "Bad request";
            // Handle error or display a message to the user
          }
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error("Error confirming email:", error);
        resp = "Incorrect token";
        // Handle error or display a message to the user
      });
  });
</script>

<div class="confirm">
  <div class="response_msg">{resp}</div>
  <p>
    <Button
      style="font-size: 20px;"
      color="secondary"
      type="button"
      on:click={() => (login())}>Go to login page</Button
    >
  </p>
</div>

<style>
  .confirm{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
    font-size: 25px;
  }
  .response_msg{
    font-size: 20px;
  }
</style>