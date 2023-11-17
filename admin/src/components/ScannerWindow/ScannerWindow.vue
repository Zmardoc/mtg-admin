<template>
  <div class="scanner-window">
    <video ref="videoRef" autoplay class="video-scanner" />
    <canvas ref="canvasRef" class="hidden" />
    <q-btn
      @click="takePhoto"
      round
      color="primary"
      icon="camera"
      class="photo-btn"
    />
    <div>{{ scannedTexts.join(', ') }}</div>
  </div>
</template>

<script setup lang="ts">
import ocrPost from '@/api/ocrApi'
import { ref } from 'vue'

let videoStream: MediaStream | null = null

const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const scannedTexts = ref<string[]>([])

const constraints = {
  audio: false,
  video: true,
  advanced: [{ facingMode: 'environment' }],
}

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

function addToScannedTexts(text: string) {
  scannedTexts.value = [...new Set([...scannedTexts.value, text])]
}

function setupCanvas() {
  if (canvasRef.value && videoRef.value) {
    canvasRef.value.width = videoRef.value.videoWidth
    canvasRef.value.height = videoRef.value.videoWidth

    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      ctx.filter = 'grayscale(100%)'
      ctx.drawImage(
        videoRef.value,
        0,
        0,
        canvasRef.value.width,
        canvasRef.value.height
      )
    } else {
      console.error('Nelze získat kontext pro kreslení na plátno.')
    }
  }
}

async function takePhoto() {
  if (!videoStream || !videoRef.value || !canvasRef.value) {
    console.error('Video stream není dostupný.')
    return
  }

  const imageDataUrl = canvasRef.value.toDataURL('image/jpeg')

  const what = await ocrPost('https://api.ocr.space/parse/image', imageDataUrl)
  if (!what) {
    console.error('Nelze získat text z obrázku.')
    return
  }
  addToScannedTexts(what)
}

setupCanvas()
startCamera()
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
}
.video-scanner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-btn {
  z-index: 2002;
  position: fixed;
  bottom: 16px;
  margin: auto;
}
</style>
