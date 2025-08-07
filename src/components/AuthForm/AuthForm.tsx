import { createSignal, onMount } from 'solid-js'
import { useLanguage } from '../../contexts/LanguageContext'
import { AuthData } from '../../types'
import RulesModal from '../RulesModal/RulesModal'
import './AuthForm.css'

type FormMode = 'login' | 'register'

interface Props {
  onAuthSuccess: (data: AuthData) => void
  onRegister: (data: AuthData & { email: string; referral?: string }) => void
}

function AuthForm(props: Props) {
  const [mode, setMode] = createSignal<FormMode>('login')
  const { t } = useLanguage()
  const [login, setLogin] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [confirmPassword, setConfirmPassword] = createSignal('')
  const [referral, setReferral] = createSignal('')
  const [rememberPassword, setRememberPassword] = createSignal(false)
  const [acceptTerms, setAcceptTerms] = createSignal(false)
  const [acceptPrivacy, setAcceptPrivacy] = createSignal(false)
  const [errors, setErrors] = createSignal<Record<string, string>>({})
  const [isLoading, setIsLoading] = createSignal(false)
  const [showRulesModal, setShowRulesModal] = createSignal(false)
  const [showPrivacyModal, setShowPrivacyModal] = createSignal(false)

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // Загрузка сохраненного логина
  onMount(() => {
    const savedLogin = localStorage.getItem('altv_saved_login')
    if (savedLogin) {
      setLogin(savedLogin)
    }
  })

  const clearForm = () => {
    setLogin('')
    setPassword('')
    setEmail('')
    setConfirmPassword('')
    setReferral('')
    setRememberPassword(false)
    setAcceptTerms(false)
    setAcceptPrivacy(false)
    setErrors({})
  }

  const handleModeSwitch = (newMode: FormMode) => {
    clearForm()
    setMode(newMode)
    // Восстанавливаем сохраненный логин при переключении
    const savedLogin = localStorage.getItem('altv_saved_login')
    if (savedLogin) {
      setLogin(savedLogin)
    }
  }

  const saveLoginToStorage = (loginValue: string) => {
    localStorage.setItem('altv_saved_login', loginValue)
  }

  const handleLoginSubmit = async (e: Event) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!login().trim()) newErrors.login = ' '
    if (!password().trim()) newErrors.password = ' '
    else if (password().length < 6) newErrors.password = 'Минимум 6 символов'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    // Сохраняем логин при успешной попытке входа
    saveLoginToStorage(login())

    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000))

    props.onAuthSuccess({
      login: login(),
      password: password(),
      rememberPassword: rememberPassword()
    })

    setIsLoading(false)
  }

  const handleRegisterSubmit = async (e: Event) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!login().trim()) newErrors.login = 'Логин обязателен'
    if (!email().trim()) newErrors.email = 'Email обязателен'
    else if (!validateEmail(email())) newErrors.email = 'Некорректный email'
    if (!password().trim()) newErrors.password = 'Пароль обязателен'
    else if (password().length < 6) newErrors.password = 'Минимум 6 символов'
    if (!confirmPassword().trim()) newErrors.confirmPassword = 'Подтвердите пароль'
    else if (password() !== confirmPassword()) newErrors.confirmPassword = 'Пароли не совпадают'
    if (!acceptTerms()) newErrors.acceptTerms = 'Примите правила'
    if (!acceptPrivacy()) newErrors.acceptPrivacy = 'Примите политику'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    // Сохраняем логин при регистрации
    saveLoginToStorage(login())

    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1500))

    props.onRegister({
      login: login(),
      password: password(),
      email: email(),
      referral: referral(),
      rememberPassword: false
    })

    setIsLoading(false)
  }

  return (
    <>
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-header">
            <h1>{mode() === 'login' ? t('auth.login.title') : t('auth.register.title')}</h1>
            <p>{mode() === 'login' ? t('auth.login.subtitle') : t('auth.register.subtitle')}</p>
          </div>

          {mode() === 'login' ? (
            <form onSubmit={handleLoginSubmit} class="auth-form">
              <div class="form-group">
                <input
                  type="text"
                  value={login()}
                  onInput={(e) => setLogin(e.currentTarget.value)}
                  class={`form-input ${errors().login ? 'error' : ''}`}
                  placeholder={t('auth.login.placeholder')}
                  disabled={isLoading()}
                />
                {errors().login && <span class="error-message">{errors().login}</span>}
              </div>

              <div class="form-group">
                <input
                  type="password"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  class={`form-input ${errors().password ? 'error' : ''}`}
                  placeholder={t('auth.password.placeholder')}
                  disabled={isLoading()}
                />
                {errors().password && <span class="error-message">{errors().password}</span>}
              </div>

              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberPassword()}
                    onChange={(e) => setRememberPassword(e.currentTarget.checked)}
                    disabled={isLoading()}
                  />
                  <span class="checkmark"></span>
                  {t('auth.rememberPassword')}
                </label>
              </div>

              <button type="submit" class="auth-button" disabled={isLoading()}>
                {isLoading() ? t('auth.login.loading') : t('auth.login.button')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} class="auth-form">
              <div class="form-group">
                <input
                  type="text"
                  value={login()}
                  onInput={(e) => setLogin(e.currentTarget.value)}
                  class={`form-input ${errors().login ? 'error' : ''}`}
                  placeholder="Логин"
                  disabled={isLoading()}
                />
                {errors().login && <span class="error-message">{errors().login}</span>}
              </div>

              <div class="form-group">
                <input
                  type="email"
                  value={email()}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  class={`form-input ${errors().email ? 'error' : ''}`}
                  placeholder={t('auth.email.placeholder')}
                  disabled={isLoading()}
                />
                {errors().email && <span class="error-message">{errors().email}</span>}
              </div>

              <div class="form-group">
                <input
                  type="password"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  class={`form-input ${errors().password ? 'error' : ''}`}
                  placeholder={t('auth.password.placeholder')}
                  disabled={isLoading()}
                />
                {errors().password && <span class="error-message">{errors().password}</span>}
              </div>

              <div class="form-group">
                <input
                  type="password"
                  value={confirmPassword()}
                  onInput={(e) => setConfirmPassword(e.currentTarget.value)}
                  class={`form-input ${errors().confirmPassword ? 'error' : ''}`}
                  placeholder={t('auth.confirmPassword.placeholder')}
                  disabled={isLoading()}
                />
                {errors().confirmPassword && <span class="error-message">{errors().confirmPassword}</span>}
              </div>

              <div class="form-group">
                <input
                  type="text"
                  value={referral()}
                  onInput={(e) => setReferral(e.currentTarget.value)}
                  class="form-input"
                  placeholder={t('auth.referral.placeholder')}
                  disabled={isLoading()}
                />
              </div>

              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptTerms()}
                    onChange={(e) => setAcceptTerms(e.currentTarget.checked)}
                    disabled={isLoading()}
                  />
                  <span class="checkmark"></span>
                  {t('auth.acceptTerms')} <button type="button" class="link-button" onClick={() => setShowRulesModal(true)}>{t('auth.rules')}</button>
                </label>
                {errors().acceptTerms && <span class="error-message">{errors().acceptTerms}</span>}
              </div>

              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptPrivacy()}
                    onChange={(e) => setAcceptPrivacy(e.currentTarget.checked)}
                    disabled={isLoading()}
                  />
                  <span class="checkmark"></span>
                  {t('auth.acceptPrivacy')} <button type="button" class="link-button" onClick={() => setShowPrivacyModal(true)}>{t('auth.privacy')}</button>
                </label>
                {errors().acceptPrivacy && <span class="error-message">{errors().acceptPrivacy}</span>}
              </div>

              <button type="submit" class="auth-button" disabled={isLoading()}>
                {isLoading() ? t('auth.register.loading') : t('auth.register.button')}
              </button>
            </form>
          )}

          <div class="auth-footer">
            <p>
              {mode() === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
              <button 
                type="button" 
                class="switch-button" 
                onClick={() => handleModeSwitch(mode() === 'login' ? 'register' : 'login')}
                disabled={isLoading()}
              >
                {mode() === 'login' ? t('auth.switchToRegister') : t('auth.switchToLogin')}
              </button>
            </p>
          </div>
        </div>

        <div class="rules-info">
          <div class="rules-cell" onClick={() => setShowRulesModal(true)}>
            <div class="rules-icon">📋</div>
            <span>{t('auth.rules')}</span>
          </div>
          <div class="rules-cell" onClick={() => setShowPrivacyModal(true)}>
            <div class="rules-icon">🔒</div>
            <span>{t('auth.privacy')}</span>
          </div>
        </div>

        {mode() === 'register' && (
          <div class="warning-info">
            <div class="warning-cell">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <h4>{t('auth.warning.title')}</h4>
                <p>{t('auth.warning.text')}</p>
                <p><strong>{t('auth.warning.rule')}</strong></p>
              </div>
            </div>
          </div>
        )}
      </div>

      <RulesModal 
        show={showRulesModal()} 
        type="rules"
        onClose={() => setShowRulesModal(false)} 
      />
      <RulesModal 
        show={showPrivacyModal()} 
        type="privacy"
        onClose={() => setShowPrivacyModal(false)} 
      />
    </>
  )
}

export default AuthForm