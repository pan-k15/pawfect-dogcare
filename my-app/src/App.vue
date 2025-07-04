<template>
  <div>
  <header>
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          🐾 DogCare
        </div>

        <button class="nav-toggle" @click="toggleMenu">
          ☰
        </button>

        <div class="nav-links" :class="{ 'open': isOpen }">
          <router-link to="/">Home</router-link>
          <router-link to="/dog-run">Dog Run</router-link>
          <router-link to="/cafe">Cafe</router-link>
          <router-link to="/wash-dry">Wash & Dry</router-link>
          <router-link to="/grooming-bath">Grooming & Bath</router-link>
          <router-link to="/snack">Snack</router-link>
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </nav>
  </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>

main {
  padding: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>