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
import API from '../api' // 👈 Axios instance with baseURL

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
    async handleLogin() {
      this.error = ''

      try {
        const res = await API.post('/auth/login', {
          email: this.form.email,
          password: this.form.password,
        })

        // Save token in localStorage
        localStorage.setItem('token', res.data.token)

        // Optional: Save username if returned
        if (res.data.username) {
          localStorage.setItem('username', res.data.username)
        }

        this.$router.push('/') // redirect to homepage
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed.'
      }
    },
  },
}
</script>
