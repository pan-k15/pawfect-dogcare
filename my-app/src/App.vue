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

          <div class="nav-links" :class="{ open: isOpen }">
            <router-link to="/">Home</router-link>
            <!-- <router-link to="/dog-run">Dog Run</router-link>
            <router-link to="/cafe">Cafe</router-link>
            <router-link to="/wash-dry">Wash & Dry</router-link>
            <router-link to="/grooming-bath">Grooming & Bath</router-link>
            <router-link to="/snack">Snack</router-link> -->

            <template v-if="!isLoggedIn">
              <router-link to="/login">Login</router-link>
              <router-link to="/register">Register</router-link>
            </template>

            <template v-else>

    <div class="dropdown" @mouseenter="show = true" @mouseleave="show = false">
      <!-- <button class="dropdown-button">-->Services ▾<!--</button> -->
      <div v-if="show" class="dropdown-menu">
        <router-link to="/dog-run" class="dropdown-item">Dog Run</router-link>
        <router-link to="/cafe" class="dropdown-item">Cafe</router-link>
        <router-link to="/wash-dry" class="dropdown-item">Wash & Dry</router-link>
        <router-link to="/grooming-bath" class="dropdown-item">Grooming & Bath</router-link>
        <router-link to="/snack" class="dropdown-item">Snack</router-link>
        <router-link to="/laundry" class="dropdown-item">Laundry</router-link>
      </div>
    </div>
              <router-link to="/setting">Setting</router-link>

              <!-- <router-link to="/bookings">My Bookings</router-link> -->
              <a href="#" @click.prevent="logout">Logout</a>
            </template>
          </div>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
       show: false,
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token')
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>

main {
  padding: 20px;
}
</style>


<!-- <template>
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
</script> -->