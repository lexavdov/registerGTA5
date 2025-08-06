import { createSignal, Show } from 'solid-js'
import { RulesSection } from '../../types'
import './RulesModal.css'

interface Props {
  show: boolean
  type: 'rules' | 'privacy'
  onClose: () => void
}

function RulesModal(props: Props) {
  const [activeSection, setActiveSection] = createSignal(0)

  const rulesData: RulesSection[] = [
    {
      title: "Общие правила",
      content: [
        "Запрещено использование читов, багов и эксплойтов",
        "Уважительное отношение к другим игрокам обязательно",
        "Запрещен спам в чате и голосовом канале",
        "Мультиаккаунтинг строго запрещен",
        "Торговля игровыми ценностями за реальные деньги запрещена"
      ]
    },
    {
      title: "Правила РП",
      content: [
        "Обязательная отыгровка персонажа в рамках реализма",
        "Запрещено нарушение РП без веских причин",
        "Обязательно знание базовых команд и механик",
        "Запрещено использование OOC информации в IC",
        "Смерть персонажа должна отыгрываться соответственно"
      ]
    },
    {
      title: "Наказания",
      content: [
        "Предупреждение - за мелкие нарушения",
        "Мут - за нарушения в чате",
        "Кик - за средние нарушения",
        "Бан - за серьезные нарушения",
        "Перманентный бан - за критические нарушения"
      ]
    }
  ]

  const privacyData: RulesSection[] = [
    {
      title: "Сбор данных",
      content: [
        "Мы собираем только необходимую информацию для работы сервера",
        "IP-адреса сохраняются для безопасности",
        "Игровая статистика используется для улучшения сервера",
        "Персональные данные не передаются третьим лицам",
        "Все данные хранятся в зашифрованном виде"
      ]
    },
    {
      title: "Использование данных",
      content: [
        "Данные используются только для игрового процесса",
        "Статистика помогает улучшать сервер",
        "Логи чата сохраняются для модерации",
        "Финансовые операции отслеживаются для безопасности",
        "Данные не используются в коммерческих целях"
      ]
    },
    {
      title: "Ваши права",
      content: [
        "Вы можете запросить удаление своих данных",
        "Доступ к собранной информации по запросу",
        "Право на исправление неточных данных",
        "Возможность отозвать согласие на обработку",
        "Жалобы на обработку данных рассматриваются в течение 30 дней"
      ]
    }
  ]

  const currentData = () => props.type === 'rules' ? rulesData : privacyData
  const title = () => props.type === 'rules' ? 'Правила сервера' : 'Политика конфиденциальности'

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose()
    }
  }

  return (
    <Show when={props.show}>
      <div class="modal-backdrop" onClick={handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <h2>{title()}</h2>
            <button class="close-button" onClick={props.onClose}>×</button>
          </div>

          <div class="modal-body">
            <div class="sections-nav">
              {currentData().map((section, index) => (
                <button
                  class={`section-button ${activeSection() === index ? 'active' : ''}`}
                  onClick={() => setActiveSection(index)}
                >
                  {section.title}
                </button>
              ))}
            </div>

            <div class="section-content">
              <h3>{currentData()[activeSection()].title}</h3>
              <ul>
                {currentData()[activeSection()].content.map(item => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div class="modal-footer">
            <button class="accept-button" onClick={props.onClose}>
              Понятно
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}

export default RulesModal