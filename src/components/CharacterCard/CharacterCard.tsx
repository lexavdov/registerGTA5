import { Character } from '../../types'
import './CharacterCard.css'

interface Props {
  character: Character
  onSelect: () => void
  formatPlaytime: (minutes: number) => string
}

function CharacterCard(props: Props) {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('₽', '$')
  }

  const getLastPlayedColor = (lastPlayed: string) => {
    if (lastPlayed.includes('минут') || lastPlayed.includes('час')) {
      return '#4CAF50' // Зеленый для недавней активности
    } else if (lastPlayed.includes('день') || lastPlayed.includes('дня') || lastPlayed.includes('дней')) {
      return '#FFC107' // Желтый для средней активности
    } else {
      return '#f44336' // Красный для долгого отсутствия
    }
  }

  return (
    <div class="character-card" onClick={props.onSelect}>
      <div class="character-avatar">
        <div class="avatar-placeholder">
          <span class="avatar-initial">{props.character.name.charAt(0).toUpperCase()}</span>
        </div>
        <div class="character-level">
          <span>LVL {props.character.level}</span>
        </div>
      </div>

      <div class="character-info">
        <h3 class="character-name">{props.character.name}</h3>
        
        <div class="character-stats">
          <div class="stat-item">
            <span class="stat-label">Деньги:</span>
            <span class="stat-value money">{formatMoney(props.character.money)}</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">Игровое время:</span>
            <span class="stat-value">{props.formatPlaytime(props.character.playtime)}</span>
          </div>
          
          <div class="stat-item">
            <span class="stat-label">Последний вход:</span>
            <span 
              class="stat-value last-played" 
              style={{ color: getLastPlayedColor(props.character.lastPlayed) }}
            >
              {props.character.lastPlayed}
            </span>
          </div>
        </div>
      </div>

      <div class="character-actions">
        <button class="play-button">
          <span>Играть</span>
          <div class="play-icon">▶</div>
        </button>
      </div>
    </div>
  )
}

export default CharacterCard