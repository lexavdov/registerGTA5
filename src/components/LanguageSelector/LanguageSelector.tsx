import { createSignal } from 'solid-js'
import './LanguageSelector.css'

function LanguageSelector() {
  const [showTooltip, setShowTooltip] = createSignal(false)

  const handleClick = () => {
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 3000)
  }

  return (
    <div class="language-selector">
      <button class="language-button" onClick={handleClick}>
        <span class="flag">🇷🇺</span>
        <span class="language-code">RU</span>
      </button>
      
      {showTooltip() && (
        <div class="language-tooltip">
          На данный момент доступен только Русский
        </div>
      )}
    </div>
  )
}

export default LanguageSelector