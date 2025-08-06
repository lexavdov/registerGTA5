import { Show } from 'solid-js'
import './ConfirmationModal.css'

interface Props {
  show: boolean
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmationModal(props: Props) {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onCancel()
    }
  }

  return (
    <Show when={props.show}>
      <div class="modal-backdrop" onClick={handleBackdropClick}>
        <div class="modal-content">
          <div class="modal-header">
            <h2>Подтверждение создания</h2>
          </div>
          
          <div class="modal-body">
            <p class="modal-message">
              Вы точно уверены?
            </p>
            <p class="modal-warning">
              Больше нельзя будет изменить
            </p>
          </div>
          
          <div class="modal-footer">
            <button class="modal-button confirm" onClick={props.onConfirm}>
              Да
            </button>
            <button class="modal-button cancel" onClick={props.onCancel}>
              Нет
            </button>
          </div>
        </div>
      </div>
    </Show>
  )
}

export default ConfirmationModal