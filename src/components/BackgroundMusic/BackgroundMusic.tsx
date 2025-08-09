import { createSignal, onMount, onCleanup } from 'solid-js'

interface Props {
  isPlaying: boolean
}

function BackgroundMusic(props: Props) {
  const [audio, setAudio] = createSignal<HTMLAudioElement | null>(null)

  onMount(() => {
    // Создаем аудио элемент
    const audioElement = new Audio('public/background-music.mp3')
    audioElement.loop = true
    audioElement.volume = 0.3
    setAudio(audioElement)

    // Пытаемся воспроизвести музыку
    if (props.isPlaying) {
      audioElement.play().catch(console.error)
    }
  })

  onCleanup(() => {
    const audioElement = audio()
    if (audioElement) {
      audioElement.pause()
      audioElement.src = ''
    }
  })

  // Реагируем на изменение состояния воспроизведения
  const audioElement = audio()
  if (audioElement) {
    if (props.isPlaying) {
      audioElement.play().catch(console.error)
    } else {
      audioElement.pause()
    }
  }

  return null
}

export default BackgroundMusic