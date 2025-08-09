import { createSignal, onMount } from 'solid-js'
import { createStore } from 'solid-js/store'
import { LanguageProvider } from './contexts/LanguageContext'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import ActivityCheck from './components/ActivityCheck/ActivityCheck'
import BackgroundMusic from './components/BackgroundMusic/BackgroundMusic'
import AuthForm from './components/AuthForm/AuthForm'
import CharacterMenu from './components/CharacterMenu/CharacterMenu'
import CharacterEditor from './components/CharacterEditor/CharacterEditor'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import { AuthData, Character } from './types'
import './App.css'

type AppState = 'loading' | 'activity-check' | 'auth' | 'character-menu' | 'character-editor'

function App() {
  const [currentState, setCurrentState] = createSignal<AppState>('loading')
  const [characters, setCharacters] = createSignal<Character[]>([])
  const [savedCharacterData, setSavedCharacterData] = createStore<any>({})
  const [isAuthenticated, setIsAuthenticated] = createSignal(false)
  const [maxCharacters, setMaxCharacters] = createSignal(3)
  const [showBackground, setShowBackground] = createSignal(false)
  const [playMusic, setPlayMusic] = createSignal(false)

  // Обработчик завершения загрузки
  const handleLoadingComplete = () => {
    setCurrentState('activity-check')
    setShowBackground(true)
  }

  // Обработчик подтверждения активности
  const handleActivityConfirmed = () => {
    setPlayMusic(true) // Запускаем музыку после взаимодействия пользователя
    
    // Проверяем сохраненную авторизацию
    const savedAuth = localStorage.getItem('altv_auth_data')
    const savedCharacter = localStorage.getItem('altv_character_data')
    
    if (savedAuth && savedCharacter) {
      const authData = JSON.parse(savedAuth)
      const characterData = JSON.parse(savedCharacter)
      
      setIsAuthenticated(true)
      setSavedCharacterData(characterData)
      setShowBackground(false)
      
      // Имитируем загрузку персонажей
      const mockCharacters = [
        {
          id: 1,
          name: characterData.nickname || 'Saved Character',
          level: 1,
          money: 5000,
          lastPlayed: 'Сейчас',
          playtime: 0
        }
      ]
      setCharacters(mockCharacters)
      setCurrentState('character-menu')
    } else {
      setCurrentState('auth')
    }
  }

  // Обработчик успешной авторизации
  const handleAuthSuccess = (authData: AuthData) => {
    console.log('Auth success:', authData)
    
    // Сохраняем данные авторизации
    localStorage.setItem('altv_auth_data', JSON.stringify(authData))
    setIsAuthenticated(true)
    
    setShowBackground(false) // Убираем фон после авторизации
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      alt.emit('auth.login', authData.login, authData.password)
    }
    setCurrentState('character-menu')
  }

  // Обработчик регистрации
  const handleRegister = (authData: AuthData & { email: string; referral?: string }) => {
    console.log('Register:', authData)
    
    // Сохраняем данные авторизации
    localStorage.setItem('altv_auth_data', JSON.stringify(authData))
    setIsAuthenticated(true)
    
    setShowBackground(false) // Убираем фон после регистрации
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      alt.emit('auth.register', authData.login, authData.password, authData.email, authData.referral || '')
    }
    setCurrentState('character-menu')
  }

  // Обработчик выбора персонажа
  const handleCharacterSelect = (character: Character) => {
    console.log('Character selected:', character)
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      alt.emit('character.select', character.id)
    }
  }

  // Обработчик создания персонажа
  const handleCreateCharacter = () => {
    console.log('Create character')
    setCurrentState('character-editor')
  }

  // Обработчик завершения создания персонажа
  const handleCharacterCreated = (characterData: any) => {
    console.log('Character created:', characterData)
    
    // Сохраняем данные персонажа
    localStorage.setItem('altv_character_data', JSON.stringify(characterData))
    setSavedCharacterData(characterData)
    
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      alt.emit('character.create', characterData)
    }
    setCurrentState('character-menu')
  }

  // Обработчик отмены создания персонажа
  const handleCancelCharacterCreation = () => {
    setCurrentState('character-menu')
  }

  // Обработчик выхода
  const handleLogout = () => {
    // Очищаем сохраненные данные
    localStorage.removeItem('altv_auth_data')
    localStorage.removeItem('altv_character_data')
    setIsAuthenticated(false)
    setSavedCharacterData({})
    
    setShowBackground(true) // Возвращаем фон при выходе
    setCurrentState('auth')
    setCharacters([])
  }

  // Слушатели событий от Alt:V клиента
  onMount(() => {
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      // Получение списка персонажей после авторизации
      alt.on('characters:load', (charactersData: Character[], maxChars: number) => {
        setCharacters(charactersData)
        setMaxCharacters(maxChars)
        setCurrentState('character-menu')
      })

      // Добавление нового персонажа после создания
      alt.on('character:add', (newCharacter: Character) => {
        setCharacters(prev => [...prev, newCharacter])
      })

      // Переход к созданию персонажа
      alt.on('character:create', () => {
        setCurrentState('character-editor')
      })

      // Успешный вход в игру
      alt.on('character:enter', () => {
        // Скрыть CEF и войти в игру
        console.log('Entering game...')
      })
    }
  })


  return (
    <LanguageProvider>
      <div class="app" style={{
        'background-image': showBackground() ? 'url(/fon.jpg)' : 'none',
        'background-size': 'cover',
        'background-position': 'center',
        'background-attachment': 'fixed'
      }}>
        <BackgroundMusic isPlaying={playMusic()} />
        
        {currentState() === 'loading' ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : currentState() === 'activity-check' ? (
          <ActivityCheck onActivityConfirmed={handleActivityConfirmed} />
        ) : (
          <>
            {currentState() !== 'character-editor' && <LanguageSelector />}
            
            {currentState() === 'auth' ? (
              <AuthForm 
                onAuthSuccess={handleAuthSuccess}
                onRegister={handleRegister}
              />
            ) : currentState() === 'character-menu' ? (
              <CharacterMenu
                characters={characters()}
                maxCharacters={maxCharacters()}
                onCharacterSelect={handleCharacterSelect}
                onCreateCharacter={handleCreateCharacter}
                onLogout={handleLogout}
              />
            ) : (
              <CharacterEditor
                onCharacterCreated={handleCharacterCreated}
                onCancel={handleCancelCharacterCreation}
              />
            )}
          </>
        )}
      </div>
    </LanguageProvider>
  )
}

export default App