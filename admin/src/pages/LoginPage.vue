<template>
  <q-layout view="lHh Lpr fff">
    <main-header empty-header />
    <q-page-container>
      <q-page class="window-width row justify-center items-center">
        <q-card class="login-card q-pa-md q-mx-sm">
          <q-card-section>
            <q-form @submit="submit">
              <q-input
                v-model="email"
                label="Email"
                dense
                lazy-rules
                :rules="[(val) => !!val || 'Email is required']"
              />
              <q-input
                v-model="password"
                label="Password"
                lazy-rules
                dense
                autocomplete="on"
                color="primary"
                :rules="[(val) => !!val || 'Password is required']"
                type="password"
              />
              <q-btn
                type="submit"
                color="primary"
                label="Login"
                class="q-mt-md"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import MainHeader from '@/components/MainHeader.vue'
import { cookieTokenKey, useLoginQuery } from '@/queries/useLoginQuery'
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar'
import useNotify from '@/composables/useNotify'
import queryClient from '@/config/query'

type Props = {
  logout?: string
}

const props = defineProps<Props>()

const { login } = useLoginQuery(redirectToDashboard)
const { push, currentRoute } = useRouter()
const { notifyWelcome } = useNotify()

const email = ref('')
const password = ref('')

Cookies.remove(cookieTokenKey)
queryClient.clear() // TODO flush all pinia storage

if (props.logout) {
  notifyWelcome("We'll meet again, dungeon master!")
}

function redirectToDashboard() {
  push({
    name: 'index',
    params: { cardSearch: currentRoute.value.params.cardSearch },
  })
}

function submit() {
  login({ username: email.value, password: password.value })
}
</script>

<style lang="scss" scoped>
.login-card {
  width: 400px;
}
</style>
