import { createSignal, onMount } from 'solid-js'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import AuthForm from './components/AuthForm/AuthForm'
import CharacterMenu from './components/CharacterMenu/CharacterMenu'
import CharacterEditor from './components/CharacterEditor/CharacterEditor'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import { AuthData, Character } from './types'
import './App.css'

type AppState = 'auth' | 'character-menu' | 'character-editor'

function App() {
  const [isLoading, setIsLoading] = createSignal(true)
  const [currentState, setCurrentState] = createSignal<AppState>('auth')
  const [characters, setCharacters] = createSignal<Character[]>([])
  const [maxCharacters, setMaxCharacters] = createSignal(3)

  // Обработчик завершения загрузки
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Обработчик успешной авторизации
  const handleAuthSuccess = (authData: AuthData) => {
    console.log('Auth success:', authData)
    // @ts-ignore - Alt:V API
    if (typeof alt !== 'undefined') {
      alt.emit('auth.login', authData.login, authData.password)
    }
    setCurrentState('character-menu')
  }

  // Обработчик регистрации
  const handleRegister = (authData: AuthData & { email: string; referral?: string }) => {
    console.log('Register:', authData)
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
    <div class="app">
      {isLoading() ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
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
  )
}

export default App