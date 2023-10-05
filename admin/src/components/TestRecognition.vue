<template>
  <div>
    <video ref="videoRef" autoplay></video>
    <div ref="ocrRef"></div>
    <canvas ref="canvasRef" style="display: none"></canvas>
    {{ resultText }}
  </div>
</template>

<script setup lang="ts">
import Tesseract from 'tesseract.js'
import { ref } from 'vue'
//trening https://www.youtube.com/watch?v=KE4xEzFGSU8&ab_channel=GabrielGarcia
const FRAMES_X = 50 // calculate every x frames

const WIDTH = 640
const HEIGHT = 480

const ticks = ref(0)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const ocrRef = ref<HTMLDivElement | null>(null)

const resultText = ref<string[]>([])

function tick() {
  ticks.value++
  window.requestAnimationFrame(tick)
  if (ticks.value % FRAMES_X !== 0) return
  console.log('tick')
  videoRef.value && ctx.value?.drawImage(videoRef.value, 0, 0, WIDTH, HEIGHT)
  if (canvasRef.value) {
    Tesseract.recognize(canvasRef.value.toDataURL(), 'eng').then((result) => {
      //, 'eng'
      console.log('result', result)
      resultText.value = [...result.data.text]
    })
  }
}

function handleSuccess(stream: MediaStream) {
  if (videoRef.value && canvasRef.value) {
    ctx.value = canvasRef.value?.getContext('2d')
    canvasRef.value.width = WIDTH
    canvasRef.value.height = HEIGHT
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.stream = stream // make stream available to browser console
    videoRef.value.srcObject = stream
    window.requestAnimationFrame(tick)
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Tesseract = Tesseract.createWorker('eng')
/*{
  langPath: 'https://cdn.rawgit.com/naptha/tessdata/gh-pages/3.02/',
  corePath: 'https://cdn.rawgit.com/naptha/tesseract.js-core/0.1.0/index.js',
}*/
const handleError = (error: string) => {
  console.log('navigator.getUserMedia error: ', error)
}

const constraints = {
  audio: false,
  video: true,
  advanced: [
    {
      facingMode: 'environment',
    },
  ],
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError)
</script>
