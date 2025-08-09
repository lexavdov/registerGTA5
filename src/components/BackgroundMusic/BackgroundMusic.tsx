import { createSignal, onMount, onCleanup, createEffect } from 'solid-js'

interface Props {
  isPlaying: boolean
}

function BackgroundMusic(props: Props) {
  const [audio, setAudio] = createSignal<HTMLAudioElement | null>(null)
  const [isReady, setIsReady] = createSignal(false)
  const [hasUserInteracted, setHasUserInteracted] = createSignal(false)

  onMount(() => {
    // Создаем аудио элемент
    const audioElement = new Audio('/background-music.mp3')
    audioElement.loop = true
    audioElement.volume = 0.3
    audioElement.preload = 'auto'

    // Обработчики событий
    const handleCanPlay = () => {
      setIsReady(true)
    }

    const handleError = (e: Event) => {
      console.warn('Ошибка загрузки фоновой музыки:', e)
    }

    const handleUserInteraction = () => {
      setHasUserInteracted(true)
      // Удаляем обработчики после первого взаимодействия
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }

    audioElement.addEventListener('canplay', handleCanPlay)
    audioElement.addEventListener('error', handleError)

    // Слушаем взаимодействие пользователя
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    setAudio(audioElement)

    // Очистка при размонтировании
    onCleanup(() => {
      audioElement.removeEventListener('canplay', handleCanPlay)
      audioElement.removeEventListener('error', handleError)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
      
      audioElement.pause()
      audioElement.src = ''
    })
  })

  // Реактивно управляем воспроизведением
  createEffect(() => {
    const audioElement = audio()
    if (!audioElement || !isReady()) return

    if (props.isPlaying && hasUserInteracted()) {
      // Пытаемся воспроизвести музыку
      const playPromise = audioElement.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Фоновая музыка запущена')
          })
          .catch((error) => {
            console.warn('Не удалось воспроизвести фоновую музыку:', error)
          })
      }
    } else {
      audioElement.pause()
    }
  })

  return null
}

export default BackgroundMusic