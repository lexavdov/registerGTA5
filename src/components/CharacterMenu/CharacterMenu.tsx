import { For } from 'solid-js'
import { Character } from '../../types'
import CharacterCard from '../CharacterCard/CharacterCard'
import './CharacterMenu.css'

interface Props {
  characters: Character[]
  maxCharacters: number
  onCharacterSelect: (character: Character) => void
  onCreateCharacter: () => void
  onLogout: () => void
}

function CharacterMenu(props: Props) {
  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}ч ${mins}м`
  }

  return (
    <div class="character-container">
      <div class="character-header">
        <div class="header-content">
          <h1>Выбор персонажа</h1>
          <p>Выберите персонажа для входа в игру</p>
        </div>
        <button class="logout-button" onClick={props.onLogout}>
          Выйти
        </button>
      </div>

      <div class="character-content">
        <div class="character-grid">
          <For each={props.characters}>
            {(character) => (
              <CharacterCard
                character={character}
                onSelect={() => props.onCharacterSelect(character)}
                formatPlaytime={formatPlaytime}
              />
            )}
          </For>
        </div>
      </div>

      <div class="create-character-button" onClick={props.onCreateCharacter}>
        <div class="create-icon">+</div>
        <h3>Создать персонажа</h3>
        <p>Новый персонаж</p>
      </div>
    </div>
  )
}

export default CharacterMenu