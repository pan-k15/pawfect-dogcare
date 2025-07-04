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
    handleRegister() {
      this.error = ''
      this.success = ''

      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match.'
        return
      }
      // Basic username & email validation
      if (this.form.username.length < 3) {
        this.error = 'Username must be at least 3 characters.'
        return
      }
      if (!this.form.email.includes('@')) {
        this.error = 'Invalid email address.'
        return
      }

      // Mock registration success (replace with API call)
      this.success = `User "${this.form.username}" registered successfully!`
      this.form = { username: '', email: '', password: '', confirmPassword: '' }
    },
  },
}
</script>
