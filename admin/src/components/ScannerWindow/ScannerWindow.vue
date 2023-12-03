<template>
  <div class="scanner-window">
    <video ref="videoRef" autoplay class="video-scanner" />
    <canvas ref="canvasRef" class="hidden" />
    <q-btn
      @click="takePhoto"
      round
      :disable="isLoading"
      :loading="isLoading"
      size="xl"
      color="primary"
      icon="camera"
      class="photo-btn"
    />
    <div class="scanned-text text-white">
      {{ scanned }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import beep from '@/assets/audio/beep.mp3'
import useOcrQuery from '@/queries/useOcrQuery'
import useScannerStore from '@/stores/scannerStore'

let videoStream: MediaStream | null = null
const beepAudio = new Audio(beep)

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const isMobile = /(android|iphone|ipad)/i.test(navigator.userAgent) // opravit nefunguje desktop

const { mutateAsync, isLoading } = useOcrQuery()
const scannerStore = useScannerStore()

const constraints = {
  audio: false,
  video: isMobile ? { facingMode: { exact: 'environment' } } : true,
}

const scanned = computed(() => {
  return scannerStore.scannedCards.map((card) => card.frontFace.name).join(', ')
})

function startCamera() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if (videoRef.value) {
        videoRef.value.srcObject = stream
        videoStream = stream
      }
    })
    .catch((error) => {
      console.error('Nelze získat přístup k videu z kamery:', error)
    })
}

function setupCanvas() {
  if (canvasRef.value && videoRef.value) {
    canvasRef.value.width = videoRef.value.videoWidth
    canvasRef.value.height = videoRef.value.videoHeight

    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      ctx.filter = 'grayscale(100%)'
      return ctx
    }

    console.error('Nelze získat kontext pro kreslení na plátno.')
    return null
  }
}

async function takePhoto() {
  if (!videoStream || !videoRef.value || !canvasRef.value) {
    console.error('Video stream není dostupný.')
    return
  }
  try {
    const ctx = setupCanvas()
    if (!ctx) return

    ctx.drawImage(
      videoRef.value,
      0,
      0,
      canvasRef.value.width,
      canvasRef.value.height
    )

    const imageBase64 = canvasRef.value.toDataURL('image/jpeg')

    const scannedCard = await mutateAsync(imageBase64)
    beepAudio.play()
    if (!scannedCard) {
      console.error('Cant get card from image.')
      return
    }

    scannerStore.addToScannedCards(scannedCard)
  } catch (error) {
    alert(error)
  }
}
startCamera()

onUnmounted(() => {
  if (videoStream) {
    videoStream.getTracks().forEach((track) => track.stop())
  }
})
</script>

<style lang="scss" scoped>
.scanner-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2001;
  background-color: black;
}
.video-scanner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-btn {
  z-index: 2002;
  position: fixed;
  bottom: 32px;
  margin: auto;
}

.scanned-text {
  z-index: 2005;
  position: fixed;
  top: 8px;
  left: 8px;
}
</style>
