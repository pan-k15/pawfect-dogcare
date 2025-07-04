<template>
    <div class="auth-container">
      <h1 class="page-title">🔐 Login</h1>
      <form @submit.prevent="handleLogin" class="auth-form">
        <label>
          Email:
          <input v-model="form.email" type="email" required />
        </label>
        <label>
          Password:
          <input v-model="form.password" type="password" required />
        </label>
        <button type="submit" class="cta-button">Login</button>
      </form>
      <p v-if="error" class="error-msg">{{ error }}</p>
      <router-link to="/register" class="service-link">Don't have an account? Register</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        error: '',
      }
    },
    methods: {
      handleLogin() {
        this.error = ''
        // Mock login check
        if (this.form.email === 'test@example.com' && this.form.password === '123456') {
          alert('Login successful!')
          this.$router.push('/') // redirect home
        } else {
          this.error = 'Invalid email or password.'
        }
      },
    },
  }
  </script>
  