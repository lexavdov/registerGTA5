import { createSignal, onMount, onCleanup } from 'solid-js'
import { useLanguage } from '../../contexts/LanguageContext'
import './ActivityCheck.css'

interface Props {
  onActivityConfirmed: () => void
}

function ActivityCheck(props: Props) {
  const [isVisible, setIsVisible] = createSignal(true)
  const [isSliding, setIsSliding] = createSignal(false)
  const { t } = useLanguage()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleContinue()
    }
  }

  const handleContinue = () => {
    setIsSliding(true)
    setTimeout(() => {
      setIsVisible(false)
      props.onActivityConfirmed()
    }, 800)
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeyPress)
  })

  onCleanup(() => {
    document.removeEventListener('keydown', handleKeyPress)
  })

  if (!isVisible()) return null

  return (
    <div class={`activity-check ${isSliding() ? 'slide-out' : ''}`} onClick={handleContinue}>
      <div class="activity-content">
        <div class="activity-text">
          {t('activity.title')}
        </div>
        <div class="activity-instruction">
          {t('activity.instruction')}
        </div>
        <img 
          src="/src/assets/enter.svg" 
          alt="Enter" 
          class="enter-icon"
        />
      </div>
    </div>
  )
}

export default ActivityCheck