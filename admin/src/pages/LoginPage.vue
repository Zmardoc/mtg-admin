<template>
  <q-layout view="lHh Lpr fff">
    <main-header empty-header />
    <q-page-container>
      <q-page class="window-width row justify-center items-center">
        <q-card flat bordered class="login-card q-pa-md q-mx-sm">
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
              <div class="flex row reverse">
                <q-btn
                  type="submit"
                  color="primary"
                  label="Login"
                  class="q-mt-md"
                  :loading="isLoading"
                />
              </div>
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
import useLoginQuery from '@/queries/useLoginQuery'
import { Cookies } from 'quasar'
import useNotify from '@/composables/useNotify'
import queryClient from '@/config/query'
import useApplicationStore from '@/stores/applicationStore'
import { COOKIE_TOKEN_KEY } from '@/config/cookieTokenKey'

type Props = {
  logout?: string
}

const props = defineProps<Props>()

const { mutate, isLoading } = useLoginQuery()
const { notifyWelcome } = useNotify()
const { setDrawer } = useApplicationStore()

const email = ref('')
const password = ref('')

setDrawer(false)
Cookies.remove(COOKIE_TOKEN_KEY)
queryClient.clear() // TODO flush all pinia storage

if (props.logout) {
  notifyWelcome("We'll meet again, dungeon master!")
}

function submit() {
  mutate({ username: email.value, password: password.value })
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
