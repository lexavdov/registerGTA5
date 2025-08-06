import { createSignal, createEffect, onCleanup } from 'solid-js'
import './LoadingScreen.css'

interface Props {
  onLoadingComplete: () => void
}

function LoadingScreen(props: Props) {
  const [progress, setProgress] = createSignal(0)
  const [status, setStatus] = createSignal('Инициализация...')
  const [isVisible, setIsVisible] = createSignal(true)
  const [isFadingOut, setIsFadingOut] = createSignal(false)

  const loadingSteps = [
    { progress: 15, status: 'Загрузка ресурсов...', delay: 800 },
    { progress: 35, status: 'Подключение к серверу...', delay: 1200 },
    { progress: 55, status: 'Проверка соединения...', delay: 1000 },
    { progress: 75, status: 'Загрузка интерфейса...', delay: 1200 },
    { progress: 90, status: 'Финализация...', delay: 800 },
    { progress: 100, status: 'Готово!', delay: 500 }
  ]

  let currentStep = 0
  let timeoutId: number

  const runLoadingStep = () => {
    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep]
      setProgress(step.progress)
      setStatus(step.status)
      
      timeoutId = setTimeout(() => {
        currentStep++
        if (currentStep < loadingSteps.length) {
          runLoadingStep()
        } else {
          // Завершение загрузки
          setTimeout(() => {
            setIsFadingOut(true)
            setTimeout(() => {
              setIsVisible(false)
              props.onLoadingComplete()
            }, 500) // Время анимации fade-out
          }, 300)
        }
      }, step.delay)
    }
  }

  createEffect(() => {
    // Начинаем загрузку через небольшую задержку
    timeoutId = setTimeout(() => {
      runLoadingStep()
    }, 500)
  })

  onCleanup(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })

  if (!isVisible()) return null

  return (
    <div class={`loading-screen ${isFadingOut() ? 'fade-out' : ''}`}>
      <div class="loading-content">
        <div>
          <div class="loading-logo">PROJECT ROLE PLAY</div>
        </div>
        
        <div class="loading-disclaimer">
          Мы не связана и не поддерживается Take-Two, Rockstar North. 
          Rockstar или любым другим правообладателем. Все используемые 
          торговые знаки принадлежат их соответствующим владельцам и не 
          связаны и не одобряют Take-Two, Rockstar North Rockstar.
        </div>
        
        <div class="loading-progress-container">
          <div class="loading-progress-bar">
            <div 
              class="loading-progress-fill" 
              style={{ width: `${progress()}%` }}
            ></div>
          </div>
          <div class="loading-progress-text">
            <span class="loading-status">{status()}</span>
            <span class="loading-percentage">{progress()}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen