import { CharacterData } from '../../types'
import './CharacterTab.css'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

const faceNames = [
  'Benjamin', 'Daniel', 'Joshua', 'Noah', 'Andrew', 'Joan', 'Alex', 'Isaac', 
  'Evan', 'Ethan', 'Vincent', 'Angel', 'Diego', 'Adrian', 'Gabriel', 'Michael',
  'Santiago', 'Kevin', 'Louis', 'Samuel', 'Anthony', 'Hannah', 'Audrey', 'Jasmine',
  'Giselle', 'Amelia', 'Isabella', 'Zoe', 'Ava', 'Camilla', 'Violet', 'Sophia',
  'Eveline', 'Nicole', 'Ashley', 'Grace', 'Brianna', 'Natalie', 'Olivia', 'Elizabeth',
  'Charlotte', 'Emma', 'Claude', 'Niko', 'John', 'Misty'
]

function CharacterTab(props: Props) {
  const updateValue = (field: keyof CharacterData, value: number, min: number, max: number) => {
    const clampedValue = Math.max(min, Math.min(max, value))
    props.updateData({ [field]: clampedValue })
  }

  const updateFloatValue = (field: keyof CharacterData, value: number, min: number, max: number) => {
    const clampedValue = Math.max(min, Math.min(max, value))
    const roundedValue = Math.round(clampedValue * 100) / 100
    props.updateData({ [field]: roundedValue })
  }

  return (
    <div class="character-section">
      {/* Пол */}
      <div class="section-container">
        <h3 class="section-title">Пол персонажа</h3>
        <div class="gender-buttons">
          <button
            class={`gender-button ${props.data.gender === 0 ? 'active' : 'inactive'}`}
            onClick={() => props.updateData({ gender: 0 })}
          >
            👩 Женский
          </button>
          <button
            class={`gender-button ${props.data.gender === 1 ? 'active' : 'inactive'}`}
            onClick={() => props.updateData({ gender: 1 })}
          >
            👨 Мужской
          </button>
        </div>
      </div>

      {/* Генетика */}
      <div class="section-container">
        <h3 class="section-title">Генетика и наследственность</h3>
        <div class="section-content">
          {/* Лицо матери */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Лицо матери:
              <div class="slider-control-description">Выберите черты лица от матери</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('faceMother', props.data.faceMother - 1, 0, 45)}
                disabled={props.data.faceMother <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {faceNames[props.data.faceMother] || `#${props.data.faceMother}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('faceMother', props.data.faceMother + 1, 0, 45)}
                disabled={props.data.faceMother >= 45}
              >
                →
              </button>
            </div>
          </div>

          {/* Лицо отца */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Лицо отца:
              <div class="slider-control-description">Выберите черты лица от отца</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('faceFather', props.data.faceFather - 1, 0, 45)}
                disabled={props.data.faceFather <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {faceNames[props.data.faceFather] || `#${props.data.faceFather}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('faceFather', props.data.faceFather + 1, 0, 45)}
                disabled={props.data.faceFather >= 45}
              >
                →
              </button>
            </div>
          </div>

          {/* Кожа матери */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Кожа матери:
              <div class="slider-control-description">Тон кожи от матери</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('skinMother', props.data.skinMother - 1, 0, 45)}
                disabled={props.data.skinMother <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {faceNames[props.data.skinMother] || `#${props.data.skinMother}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('skinMother', props.data.skinMother + 1, 0, 45)}
                disabled={props.data.skinMother >= 45}
              >
                →
              </button>
            </div>
          </div>

          {/* Кожа отца */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Кожа отца:
              <div class="slider-control-description">Тон кожи от отца</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('skinFather', props.data.skinFather - 1, 0, 45)}
                disabled={props.data.skinFather <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {faceNames[props.data.skinFather] || `#${props.data.skinFather}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('skinFather', props.data.skinFather + 1, 0, 45)}
                disabled={props.data.skinFather >= 45}
              >
                →
              </button>
            </div>
          </div>

          {/* Схожесть лица */}
          <div class="slider-control">
            <div class="slider-control-header">
              <div class="slider-control-label">Схожесть лица:</div>
              <div class="slider-control-value">{props.data.faceMix.toFixed(1)}</div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={props.data.faceMix}
              class="character-slider"
              onInput={(e) => updateFloatValue('faceMix', Math.round(parseFloat(e.currentTarget.value) * 10) / 10, 0, 1)}
            />
            <div class="slider-control-description">
              Влево - больше от матери, Вправо - больше от отца
            </div>
          </div>

          {/* Схожесть кожи */}
          <div class="slider-control">
            <div class="slider-control-header">
              <div class="slider-control-label">Схожесть кожи:</div>
              <div class="slider-control-value">{props.data.skinMix.toFixed(1)}</div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={props.data.skinMix}
              class="character-slider"
              onInput={(e) => updateFloatValue('skinMix', Math.round(parseFloat(e.currentTarget.value) * 10) / 10, 0, 1)}
            />
            <div class="slider-control-description">
              Влево - тон матери, Вправо - тон отца
            </div>
          </div>
        </div>
      </div>

      {/* Глаза */}
      <div class="section-container">
        <h3 class="section-title">Цвет глаз</h3>
        <div class="arrow-control">
          <div class="arrow-control-label">
            Цвет глаз:
            <div class="slider-control-description">Выберите цвет глаз персонажа</div>
          </div>
          <div class="arrow-control-buttons">
            <button
              class="arrow-button"
              onClick={() => updateValue('eyes', props.data.eyes - 1, 0, 31)}
              disabled={props.data.eyes <= 0}
            >
              ←
            </button>
            <div class="arrow-control-value">
              Цвет #{props.data.eyes}
            </div>
            <button
              class="arrow-button"
              onClick={() => updateValue('eyes', props.data.eyes + 1, 0, 31)}
              disabled={props.data.eyes >= 31}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterTab