import { createSignal, Show } from 'solid-js'
import './NicknameModal.css'

interface Props {
  show: boolean
  onSubmit: (nickname: string) => void
  onCancel: () => void
}

function NicknameModal(props: Props) {
  const [nickname, setNickname] = createSignal('')
  const [error, setError] = createSignal('')

  const validateNickname = (value: string): boolean => {
    // Проверка формата Имя_Фамилия
    const regex = /^[A-Za-zА-Яа-я]+_[A-Za-zА-Яа-я]+$/
    return regex.test(value) && value.length >= 3 && value.length <= 24
  }

  const handleSubmit = () => {
    const trimmedNickname = nickname().trim()
    
    if (!trimmedNickname) {
      setError('Введите никнейм')
      return
    }
    
    if (!validateNickname(trimmedNickname)) {
      setError('Формат: Имя_Фамилия (только буквы)')
      return
    }
    
    setError('')
    props.onSubmit(trimmedNickname)
    setNickname('')
  }

  const handleCancel = () => {
    setNickname('')
    setError('')
    props.onCancel()
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  return (
    <Show when={props.show}>
      <div class="modal-backdrop" onClick={handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Последний этап</h2>
          </div>
          
          <div class="modal-body">
            <p class="modal-message">
              Введите никнейм персонажа
            </p>
            <div class="nickname-input-container">
              <input
                type="text"
                class="nickname-input"
                placeholder="Имя_Фамилия"
                value={nickname()}
                onInput={(e) => setNickname(e.currentTarget.value)}
                onKeyPress={handleKeyPress}
                maxLength={24}
                autofocus
              />
              {error() && (
                <div class="nickname-error">
                  {error()}
                </div>
              )}
            </div>
            <p class="nickname-hint">
              Пример: Ivan_Petrov
            </p>
          </div>
          
          <div class="modal-footer">
            <button class="modal-button confirm" onClick={handleSubmit}>
              ОК
            </button>
            <button class="modal-button cancel" onClick={handleCancel}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}

export default NicknameModal