<template>
  <q-card flat bordered class="login-card q-pa-md q-mx-sm">
    <q-card-section>
      <q-form @submit="submit">
        <q-input
          v-model="userFrom.username"
          label="Username"
          dense
          lazy-rules
          :rules="[(val) => !!val || 'Username is required']"
        />
        <q-input
          v-model="userFrom.password"
          label="Password"
          lazy-rules
          dense
          autocomplete="on"
          color="primary"
          :rules="[(val) => !!val || 'Password is required']"
          type="password"
        />
        <div class="flex row justify-between items-center q-mt-md">
          <div class="text-caption">v{{ version }}</div>
          <q-btn
            type="submit"
            color="primary"
            label="Login"
            :loading="isLoading"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { version } from '../../../package.json'

import useLoginQuery, { User } from '@/queries/useLoginQuery'

const { mutate, isLoading } = useLoginQuery()

const initialValues = {
  username: '',
  password: '',
}
const userFrom = ref<User>(initialValues)

function submit() {
  mutate(userFrom.value)
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
}

:deep(.q-field--dark) {
  input,
  select {
    color: #fff;
    -webkit-text-fill-color: white;
    -webkit-background-clip: text !important;
    background-clip: text !important;
  }
}
</style>
