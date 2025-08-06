import { CharacterData } from '../../types'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

const maleHairNames = [
  'Лысый', 'Ёжик', 'Ирокез', 'Зачёс назад', 'Поднятый спереди', 'Залысины и длинный затылок',
  'Выбритые виски и ирокез', 'Хвост', 'Косички', 'Зачёс назад кудрявый', 'Зачёс назад',
  'Шипы', 'Короткое каре', 'Длинные растрёпанные', 'Дреды', 'Длинные прямые',
  'Длинные кудрявые', 'Длинные прямые растрёпанные', 'Пробор сбоку короткий', 'Зачёс назад короткий',
  'Пробор сбоку длинный', 'Пробор с выбритым виском', 'Маллет', 'Ночное видение',
  'Косички', 'Косички звёздочкой', 'Косички зигзагом', 'Косички крупные змейкой',
  'Косички мелкие змейкой', 'Косички боковой завиток', 'Плоский верх', 'Корона спереди длинный затылок',
  'Выбритые виски зачёс назад', 'Пробор сбоку выбритые виски', 'Ирокез', 'Длинные растрёпанные сзади'
]

const femaleHairNames = [
  'Лысая', 'Короткое каре', 'Каре', 'Хвостики', 'Хвост', 'Плетёный ирокез',
  'Косы', 'Каре', 'Ирокез', 'Французский твист', 'Длинное каре', 'Свободный хвост',
  'Пикси', 'Пробор сбоку выбритая чёлка', 'Пучок сверху', 'Волнистые длинные',
  'Растрёпанные с банданой', 'Растрёпанный пучок с чёлкой', 'Каре с пёрышками', 'Тугой пучок с чёлкой',
  'Кудрявое афро', 'Растрёпанные волнистые с чёлкой', 'Тугой пучок сверху плетёный', 'Маллет',
  'Ночное видение', 'Плетёные косички', 'Косички с пробором по центру', 'Косички ромбом',
  'Хвостики с чёлкой', 'Косички звёздочкой', 'Вертикальные выбритые косички', 'Свободный хвост',
  'Короткий маллет', 'Выбритые виски зачёс назад', 'Пробор сбоку выбритая чёлка', 'Ирокез',
  'Хвостики с банданой'
]

const hairColors = [
  'Чёрный', 'Тёмно-серый', 'Серый', 'Самый тёмный коричневый', 'Тёмно-коричневый',
  'Коричневый', 'Светло-коричневый', 'Светлее коричневый', 'Самый светлый коричневый',
  'Выцветший коричневый', 'Выцветший блонд', 'Самый светлый блонд', 'Светлее блонд',
  'Светлый блонд', 'Белый блонд', 'Сероватый коричневый', 'Красноватый коричневый',
  'Красно-коричневый', 'Тёмно-красный', 'Красный', 'Очень красный', 'Яркий красный',
  'Оранжево-красный', 'Выцветший красный', 'Выцветший оранжевый', 'Серый',
  'Светло-серый', 'Светлее серый', 'Самый светлый серый', 'Тёмно-фиолетовый',
  'Фиолетовый', 'Светло-фиолетовый', 'Фиалковый', 'Яркий фиалковый', 'Конфетно-розовый',
  'Светло-розовый', 'Голубой', 'Синий', 'Тёмно-синий', 'Зелёный', 'Изумрудный',
  'Нефтяной', 'Блестящий зелёный', 'Яркий зелёный', 'Зелёный', 'Отбеленный блонд',
  'Золотой блонд', 'Оранжевый блонд', 'Оранжевый', 'Яркий оранжевый', 'Блестящий оранжевый',
  'Тёмно-оранжевый', 'Красный', 'Тёмно-красный', 'Очень тёмно-красный', 'Чёрный'
]

const facialHairNames = [
  'Щетина', 'Бальбо', 'Круглая борода', 'Козлиная бородка', 'Подбородок',
  'Пушок на подбородке', 'Тонкий ремешок', 'Неряшливая', 'Мушкетёр', 'Усы',
  'Подстриженная борода', 'Щетинистая борода', 'Тонкая круглая борода', 'Подкова',
  'Карандаш и бакенбарды', 'Ремешок', 'Бальбо и бакенбарды', 'Бараньи отбивные',
  'Неряшливая борода', 'Кудрявая', 'Кудрявая и борода', 'Руль', 'Фаустик',
  'Отто и заплатка', 'Отто и борода', 'Лёгкий Франц', 'Хэмпстед', 'Амброз',
  'Линкольн занавес', 'Чисто выбритый'
]

function HairTab(props: Props) {
  const updateValue = (field: keyof CharacterData, value: number, min: number, max: number) => {
    const clampedValue = Math.max(min, Math.min(max, value))
    props.updateData({ [field]: clampedValue })
  }

  const updateFloatValue = (field: keyof CharacterData, value: number, min: number, max: number) => {
    const clampedValue = Math.max(min, Math.min(max, value))
    const roundedValue = Math.round(clampedValue * 100) / 100
    props.updateData({ [field]: roundedValue })
  }

  const updateColorOverlay = (id: number, field: string, value: number) => {
    const newOverlays = props.data.colorOverlays.map(overlay => 
      overlay.id === id ? { ...overlay, [field]: value } : overlay
    )
    props.updateData({ colorOverlays: newOverlays })
  }

  const updateHair = (value: number) => {
    const maxHair = props.data.gender === 0 ? 76 : 73
    const clampedValue = Math.max(0, Math.min(maxHair, value))
    props.updateData({ 
      hair: clampedValue,
      hairOverlay: clampedValue
    })
  }

  const chestHairOverlay = props.data.colorOverlays.find(o => o.id === 10)
  const hairNames = props.data.gender === 0 ? femaleHairNames : maleHairNames
  const maxHair = props.data.gender === 0 ? 76 : 73

  return (
    <div class="hair-controls">
      {/* Прическа */}
      <div class="section-container">
        <h3 class="section-title">Прическа</h3>
        <div class="section-content">
          {/* Вариант прически */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Стиль прически:
              <div class="slider-control-description">Выберите стиль прически</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateHair(props.data.hair - 1)}
                disabled={props.data.hair <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {hairNames[props.data.hair] || `Стиль #${props.data.hair}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateHair(props.data.hair + 1)}
                disabled={props.data.hair >= maxHair}
              >
                →
              </button>
            </div>
          </div>

          {/* Основной цвет */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Основной цвет:
              <div class="slider-control-description">Основной цвет волос</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('hairColor1', props.data.hairColor1 - 1, 0, 63)}
                disabled={props.data.hairColor1 <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {hairColors[props.data.hairColor1] || `Цвет #${props.data.hairColor1}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('hairColor1', props.data.hairColor1 + 1, 0, 63)}
                disabled={props.data.hairColor1 >= 63}
              >
                →
              </button>
            </div>
          </div>

          {/* Дополнительный цвет */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Дополнительный цвет:
              <div class="slider-control-description">Цвет мелирования/акцентов</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('hairColor2', props.data.hairColor2 - 1, 0, 63)}
                disabled={props.data.hairColor2 <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {hairColors[props.data.hairColor2] || `Цвет #${props.data.hairColor2}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('hairColor2', props.data.hairColor2 + 1, 0, 63)}
                disabled={props.data.hairColor2 >= 63}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Борода и усы */}
      <div class="section-container">
        <h3 class="section-title">Борода и усы</h3>
        <div class="section-content">
          {/* Вариант бороды */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Стиль бороды:
              <div class="slider-control-description">Выберите стиль бороды/усов</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('facialHair', props.data.facialHair - 1, 0, 28)}
                disabled={props.data.facialHair <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {facialHairNames[props.data.facialHair] || `Стиль #${props.data.facialHair}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('facialHair', props.data.facialHair + 1, 0, 28)}
                disabled={props.data.facialHair >= 28}
              >
                →
              </button>
            </div>
          </div>

          {/* Цвет бороды */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Цвет бороды:
              <div class="slider-control-description">Цвет растительности на лице</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('facialHairColor1', props.data.facialHairColor1 - 1, 0, 63)}
                disabled={props.data.facialHairColor1 <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {hairColors[props.data.facialHairColor1] || `Цвет #${props.data.facialHairColor1}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('facialHairColor1', props.data.facialHairColor1 + 1, 0, 63)}
                disabled={props.data.facialHairColor1 >= 63}
              >
                →
              </button>
            </div>
          </div>

          {/* Прозрачность бороды */}
          <div class="slider-control">
            <div class="slider-control-header">
              <div class="slider-control-label">Густота бороды:</div>
              <div class="slider-control-value">{Math.round(props.data.facialHairOpacity * 100)}%</div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={props.data.facialHairOpacity}
              class="character-slider"
              onInput={(e) => updateFloatValue('facialHairOpacity', Math.round(parseFloat(e.currentTarget.value) * 10) / 10, 0, 1)}
            />
            <div class="slider-control-description">
              Влево - менее заметная, Вправо - более густая
            </div>
          </div>
        </div>
      </div>

      {/* Волосы на груди */}
      {chestHairOverlay && props.data.gender === 1 && (
        <div class="section-container">
          <h3 class="section-title">Волосы на груди</h3>
          <div class="section-content">
            {/* Вариант */}
            <div class="arrow-control">
              <div class="arrow-control-label">
                Стиль:
                <div class="slider-control-description">Форма волос на груди</div>
              </div>
              <div class="arrow-control-buttons">
                <button
                  class="arrow-button"
                  onClick={() => updateColorOverlay(10, 'value', chestHairOverlay.value - 1)}
                  disabled={chestHairOverlay.value <= 0}
                >
                  ←
                </button>
                <div class="arrow-control-value">
                  Стиль #{chestHairOverlay.value}
                </div>
                <button
                  class="arrow-button"
                  onClick={() => updateColorOverlay(10, 'value', chestHairOverlay.value + 1)}
                  disabled={chestHairOverlay.value >= 16}
                >
                  →
                </button>
              </div>
            </div>

            {/* Цвет */}
            <div class="arrow-control">
              <div class="arrow-control-label">
                Цвет:
                <div class="slider-control-description">Цвет волос на груди</div>
              </div>
              <div class="arrow-control-buttons">
                <button
                  class="arrow-button"
                  onClick={() => updateColorOverlay(10, 'color1', chestHairOverlay.color1 - 1)}
                  disabled={chestHairOverlay.color1 <= 0}
                >
                  ←
                </button>
                <div class="arrow-control-value">
                  {hairColors[chestHairOverlay.color1] || `Цвет #${chestHairOverlay.color1}`}
                </div>
                <button
                  class="arrow-button"
                  onClick={() => updateColorOverlay(10, 'color1', chestHairOverlay.color1 + 1)}
                  disabled={chestHairOverlay.color1 >= 63}
                >
                  →
                </button>
              </div>
            </div>

            {/* Прозрачность */}
            <div class="slider-control">
              <div class="slider-control-header">
                <div class="slider-control-label">Густота:</div>
                <div class="slider-control-value">{Math.round(chestHairOverlay.opacity * 100)}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={chestHairOverlay.opacity}
                class="character-slider"
                onInput={(e) => updateColorOverlay(10, 'opacity', Math.round(parseFloat(e.currentTarget.value) * 10) / 10)}
              />
              <div class="slider-control-description">
                Влево - менее заметные, Вправо - более густые
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HairTab