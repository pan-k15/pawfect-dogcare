<template>
  <div class="auth-container">
    <h1 class="page-title">📝 Register</h1>
    <form @submit.prevent="handleRegister" class="auth-form">
      <label>
        Username:
        <input v-model="form.username" type="text" required />
      </label>
      <label>
        Email:
        <input v-model="form.email" type="email" required />
      </label>
      <label>
        Password:
        <input v-model="form.password" type="password" required minlength="6" />
      </label>
      <label>
        Confirm Password:
        <input v-model="form.confirmPassword" type="password" required minlength="6" />
      </label>
      <button type="submit" class="cta-button">Register</button>
    </form>
    <p v-if="error" class="error-msg">{{ error }}</p>
    <p v-if="success" class="success-msg">{{ success }}</p>
    <router-link to="/login" class="service-link">Already have an account? Login</router-link>
  </div>
</template>

<script>
import API from '../api' // make sure this points to your Axios config

export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      error: '',
      success: '',
    }
  },
  methods: {
    async handleRegister() {
      this.error = ''
      this.success = ''

      const { username, email, password, confirmPassword } = this.form

      if (password !== confirmPassword) {
        this.error = 'Passwords do not match.'
        return
      }

      try {
        const res = await API.post('/auth/register', {
          username, // ✅ use "username" instead of "name"
          email,
          password,
        })

        this.success = `🎉 Registered as ${res.data.username}`
        this.form = { username: '', email: '', password: '', confirmPassword: '' }

        setTimeout(() => this.$router.push('/login'), 1500)
      } catch (err) {
        this.error = err.response?.data?.error || 'Registration failed.'
      }
    },
  },
}
</script>
