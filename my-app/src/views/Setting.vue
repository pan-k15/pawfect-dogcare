<template>
    <div class="page-container">
      <h1 class="page-title">⚙️ Settings</h1>
  
      <!-- Member Info Form -->
      <form @submit.prevent="updateMember" class="setting-form">
        <h2>👤 Member Info</h2>
  
        <label>
          First Name:
          <input v-model="member.fname" type="text" required />
        </label>
  
        <label>
          Last Name:
          <input v-model="member.lname" type="text" required />
        </label>
  
        <label>
          Gender:
          <select v-model="member.gender" required>
            <option disabled value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>
  
        <label>
          Date of Birth:
          <input v-model="formattedDOB" type="date" required />
        </label>
  
        <label>
          Membership Level:
          <input type="text" :value="member.membershipLevel" readonly />
        </label>
  
        <button type="submit" class="cta-button">Update Info</button>
        <p v-if="infoMsg" class="success-msg">{{ infoMsg }}</p>
      </form>
  
      <!-- Change Password Form -->
      <form @submit.prevent="changePassword" class="setting-form">
        <h2>🔒 Change Password</h2>
  
        <label>
          Current Password:
          <input v-model="passwordForm.current" type="password" required />
        </label>
  
        <label>
          New Password:
          <input v-model="passwordForm.new" type="password" required />
        </label>
  
        <button type="submit" class="cta-button">Change Password</button>
        <p v-if="pwdMsg" class="success-msg">{{ pwdMsg }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import { jwtDecode } from 'jwt-decode'
  
  export default {
    name: 'Setting',
    data() {
      return {
        member: {
          fname: '',
          lname: '',
          gender: '',
          dateOfBirth: '',
          membershipLevel: '',
        },
        passwordForm: {
          current: '',
          new: '',
        },
        infoMsg: '',
        pwdMsg: '',
      }
    },
    computed: {
      formattedDOB: {
        get() {
          return this.member.dateOfBirth ? this.member.dateOfBirth.slice(0, 10) : ''
        },
        set(value) {
          this.member.dateOfBirth = value
        },
      },
    },
    async mounted() {
      await this.fetchMember()
    },
    methods: {
      async fetchMember() {
        try {
          const token = localStorage.getItem('token')
          const decoded = jwtDecode(token)
          const userId = decoded.id
  
          const res = await fetch(`http://localhost:5000/api/members/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          const data = await res.json()
          this.member = data
        } catch (err) {
          console.error('Failed to fetch member info:', err)
        }
      },
  
      async updateMember() {
        this.infoMsg = ''
        try {
          const token = localStorage.getItem('token')
          const decoded = jwtDecode(token)
          const userId = decoded.id
  
          // Prepare only allowed fields
          const body = {
            fname: this.member.fname,
            lname: this.member.lname,
            gender: this.member.gender,
            dateOfBirth: this.member.dateOfBirth,
          }
  
          const res = await fetch(`http://localhost:5000/api/members/user/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          })
  
          if (!res.ok) throw new Error('Failed to update info')
          this.infoMsg = 'Profile updated successfully!'
        } catch (err) {
          console.error(err)
          this.infoMsg = 'Error updating profile'
        }
      },
  
      async changePassword() {
        this.pwdMsg = ''
        try {
          const token = localStorage.getItem('token')
          const res = await fetch(`http://localhost:5000/api/users/change-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(this.passwordForm),
          })
  
          const data = await res.json()
          if (!res.ok) throw new Error(data.error || 'Error changing password')
  
          this.pwdMsg = 'Password changed successfully!'
          this.passwordForm = { current: '', new: '' }
        } catch (err) {
          this.pwdMsg = 'Failed to change password.'
          console.error(err)
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .page-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
        color: #1230AE;

  }
  
  .page-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
        color: #1230AE;

  }
  
  .setting-form {
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  }
  
  label {
    display: block;
    margin-bottom: 1rem;
    color: #1230AE;
  }
  
  input,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  .cta-button {
    background-color: #4e71ff;
    color: white;
    padding: 0.6rem 1rem;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }
  
  .success-msg {
    color: green;
    margin-top: 1rem;
  }
  </style>
  