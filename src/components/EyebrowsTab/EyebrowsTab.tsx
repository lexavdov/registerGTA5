import { CharacterData } from '../../types'

interface Props {
  data: CharacterData
  updateData: (updates: Partial<CharacterData>) => void
}

const eyebrowNames = [
  'Сбалансированные', 'Модные', 'Клеопатра', 'Вопросительные', 'Женственные',
  'Соблазнительные', 'Сжатые', 'Чола', 'Триумф', 'Беззаботные', 'Изогнутые',
  'Грызун', 'Двойной трамвай', 'Тонкие', 'Карандашные', 'Мать-щипцы',
  'Прямые и узкие', 'Натуральные', 'Пушистые', 'Неухоженные', 'Гусеница',
  'Обычные', 'Средиземноморские', 'Ухоженные', 'Кустики', 'Пёрышки',
  'Колючие', 'Монобровь', 'Крылатые', 'Тройной трамвай', 'Арочный трамвай',
  'Вырезы', 'Исчезающие', 'Одиночный трамвай', 'Отсутствуют'
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

function EyebrowsTab(props: Props) {
  const updateValue = (field: keyof CharacterData, value: number, min: number, max: number) => {
    const clampedValue = Math.max(min, Math.min(max, value))
    props.updateData({ [field]: clampedValue })
  }

  return (
    <div class="eyebrows-controls">
      <div class="section-container">
        <h3 class="section-title">Форма и цвет бровей</h3>
        <div class="section-content">
          {/* Форма бровей */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Форма бровей:
              <div class="slider-control-description">Выберите форму и стиль бровей</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('eyebrows', props.data.eyebrows - 1, 0, 33)}
                disabled={props.data.eyebrows <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {eyebrowNames[props.data.eyebrows] || `Форма #${props.data.eyebrows}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('eyebrows', props.data.eyebrows + 1, 0, 33)}
                disabled={props.data.eyebrows >= 33}
              >
                →
              </button>
            </div>
          </div>

          {/* Цвет бровей */}
          <div class="arrow-control">
            <div class="arrow-control-label">
              Цвет бровей:
              <div class="slider-control-description">Цвет должен сочетаться с волосами</div>
            </div>
            <div class="arrow-control-buttons">
              <button
                class="arrow-button"
                onClick={() => updateValue('eyebrowsColor1', props.data.eyebrowsColor1 - 1, 0, 63)}
                disabled={props.data.eyebrowsColor1 <= 0}
              >
                ←
              </button>
              <div class="arrow-control-value">
                {hairColors[props.data.eyebrowsColor1] || `Цвет #${props.data.eyebrowsColor1}`}
              </div>
              <button
                class="arrow-button"
                onClick={() => updateValue('eyebrowsColor1', props.data.eyebrowsColor1 + 1, 0, 63)}
                disabled={props.data.eyebrowsColor1 >= 63}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EyebrowsTab