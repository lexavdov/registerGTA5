import { createSignal, For } from 'solid-js'
import { useLanguage, Language } from '../../contexts/LanguageContext'
import './LanguageSelector.css'

function LanguageSelector() {
  const [showDropdown, setShowDropdown] = createSignal(false)
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺', icon: '/src/assets/Ru.svg' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸', icon: '/src/assets/En.svg' },
    { code: 'ae' as Language, name: 'العربية', flag: '🇦🇪', icon: '/src/assets/Ae.svg' }
  ]

  const currentLanguage = () => languages.find(lang => lang.code === language())

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setShowDropdown(false)
  }

  return (
    <div class="language-selector">
      <button 
        class="language-button" 
        onClick={() => setShowDropdown(!showDropdown())}
      >
        <img 
          src={currentLanguage()?.icon} 
          alt={currentLanguage()?.name}
          class="language-icon"
        />
        <span class="language-code">{currentLanguage()?.code.toUpperCase()}</span>
      </button>
      
      {showDropdown() && (
        <div class="language-dropdown">
          <For each={languages}>
            {(lang) => (
              <button
                class={`language-option ${language() === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <img 
                  src={lang.icon} 
                  alt={lang.name}
                  class="language-option-icon"
                />
                <span class="language-option-name">{lang.name}</span>
              </button>
            )}
          </For>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector