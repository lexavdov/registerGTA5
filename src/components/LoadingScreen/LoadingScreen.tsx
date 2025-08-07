import { createSignal, createEffect, onCleanup } from 'solid-js'
import { useLanguage } from '../../contexts/LanguageContext'
import './LoadingScreen.css'

interface Props {
  onLoadingComplete: () => void
}

function LoadingScreen(props: Props) {
  const [progress, setProgress] = createSignal(0)
  const [status, setStatus] = createSignal('')
  const [isVisible, setIsVisible] = createSignal(true)
  const [isFadingOut, setIsFadingOut] = createSignal(false)
  const { t } = useLanguage()

  const getLoadingSteps = () => [
    { progress: 15, status: t('loading.resources'), delay: 800 },
    { progress: 35, status: t('loading.server'), delay: 1200 },
    { progress: 55, status: t('loading.connection'), delay: 1000 },
    { progress: 75, status: t('loading.interface'), delay: 1200 },
    { progress: 90, status: t('loading.finalizing'), delay: 800 },
    { progress: 100, status: t('loading.ready'), delay: 500 }
  ]

  let currentStep = 0
  let timeoutId: number

  const runLoadingStep = () => {
    const steps = getLoadingSteps()
    if (currentStep < steps.length) {
      const step = steps[currentStep]
      setProgress(step.progress)
      setStatus(step.status)
      
      timeoutId = setTimeout(() => {
        currentStep++
        if (currentStep < steps.length) {
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
    setStatus(t('loading.initializing'))
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
          <div class="loading-logo">{t('loading.title')}</div>
        </div>
        
        <div class="loading-disclaimer">
          {t('loading.disclaimer')}
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