<template>
  <div id="dashboard">
    <h2>Dashboard</h2>
    <div class="dashboard-content">Welcome to dashboard</div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  props: {}
};
</script>

<style>
#dashboard {
  color: black;
  transition: all 0.5s ease;
}
#dashboard h2 {
  text-transform: uppercase;
}
</style>

