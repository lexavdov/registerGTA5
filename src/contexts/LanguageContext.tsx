import { createContext, useContext, createSignal, JSX } from 'solid-js'

export type Language = 'ru' | 'en' | 'ae'

interface LanguageContextType {
  language: () => Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>()

const translations = {
  ru: {
    // Loading Screen
    'loading.title': 'PROJECT ROLE PLAY',
    'loading.disclaimer': 'Мы не связана и не поддерживается Take-Two, Rockstar North. Rockstar или любым другим правообладателем. Все используемые торговые знаки принадлежат их соответствующим владельцам и не связаны и не одобряют Take-Two, Rockstar North Rockstar.',
    'loading.initializing': 'Инициализация...',
    'loading.resources': 'Загрузка ресурсов...',
    'loading.server': 'Подключение к серверу...',
    'loading.connection': 'Проверка соединения...',
    'loading.interface': 'Загрузка интерфейса...',
    'loading.finalizing': 'Финализация...',
    'loading.ready': 'Готово!',
    
    // Activity Check
    'activity.title': 'ЧТОБЫ ПРОДОЛЖИТЬ, НАЖМИТЕ',
    'activity.instruction': '',
    
    // Language Selector
    'language.tooltip': 'Выберите язык',
    
    // Auth Form
    'auth.login.title': 'Вход в игру',
    'auth.login.subtitle': 'Введите данные для входа',
    'auth.register.title': 'Регистрация',
    'auth.register.subtitle': 'Создайте новый аккаунт',
    'auth.login.placeholder': 'Логин или Email',
    'auth.password.placeholder': 'Пароль',
    'auth.password.tooShort': 'Минимум 6 символов',
    'auth.password.required': 'Пароль обязателен',
    'auth.email.placeholder': 'Email',
    'auth.email.required': 'Email обязателен',
    'auth.email.invalid': 'Некорректный email',
    'auth.confirmPassword.placeholder': 'Повторите пароль',
    'auth.confirmPassword.required': 'Подтвердите пароль',
    'auth.confirmPassword.mismatch': 'Пароли не совпадают',
    'auth.referral.placeholder': 'Реферальный код (необязательно)',
    'auth.rememberPassword': 'Сохранить пароль',
    'auth.acceptTerms': 'Принимаю правила сервера',
    'auth.acceptTerms.required': 'Примите правила',
    'auth.acceptPrivacy': 'Принимаю политику конфиденциальности',
    'auth.acceptPrivacy.required': 'Примите политику',
    'auth.login.required': 'Логин обязателен',
    'auth.rules': '',
    'auth.privacy': '',
    'auth.login.button': 'Войти',
    'auth.register.button': 'Зарегистрироваться',
    'auth.login.loading': 'Вход...',
    'auth.register.loading': 'Регистрация...',
    'auth.noAccount': 'Нет аккаунта?',
    'auth.hasAccount': 'Есть аккаунт?',
    'auth.switchToRegister': 'Зарегистрироваться',
    'auth.switchToLogin': 'Войти',
    'auth.warning.title': 'Внимание!',
    'auth.warning.text': 'Будьте внимательны при заполнении данных. Мультиаккаунты запрещены!',
    'auth.warning.rule': '1 Аккаунт GTA 5 = 1 аккаунт на сервере',
    
    // Character Menu
    'character.title': 'Выбор персонажа',
    'character.subtitle': 'Выберите персонажа для входа в игру',
    'character.logout': 'Выйти',
    'character.create': 'Создать персонажа',
    'character.createNew': 'Новый персонаж',
    'character.play': 'Играть',
    'character.level': 'LVL',
    'character.money': 'Деньги:',
    'character.playtime': 'Игровое время:',
    'character.lastPlayed': 'Последний вход:',
    
    // Character Editor
    'editor.title': 'Создание персонажа',
    'editor.subtitle': 'Настройте внешность вашего персонажа',
    'editor.back': 'Назад',
    'editor.create': '✨ Создать персонажа',
    'editor.random': '🎲 Случайно',
    'editor.reset': '🔄 Сбросить',
    
    // Tabs
    'tab.character': 'Персонаж',
    'tab.face': 'Лицо и Шея',
    'tab.body': 'Тело и кожа',
    'tab.hair': 'Растительность',
    'tab.eyebrows': 'Брови',
    'tab.makeup': 'Макияж',
    'tab.clothing': 'Одежда',
    
    // Modals
    'modal.confirmation.title': 'Подтверждение создания',
    'modal.confirmation.message': 'Вы точно уверены?',
    'modal.confirmation.warning': 'Больше нельзя будет изменить',
    'modal.confirmation.yes': 'Да',
    'modal.confirmation.no': 'Нет',
    'modal.nickname.title': 'Последний этап',
    'modal.nickname.message': 'Введите никнейм персонажа',
    'modal.nickname.placeholder': 'Имя_Фамилия',
    'modal.nickname.hint': 'Пример: Ivan_Petrov',
    'modal.nickname.ok': 'ОК',
    'modal.nickname.cancel': 'Отмена',
    
    // Rules Modal
    'rules.title': 'Правила сервера',
    'privacy.title': 'Политика конфиденциальности',
    'rules.understand': 'Понятно',
  },
  
  en: {
    // Loading Screen
    'loading.title': 'PROJECT ROLE PLAY',
    'loading.disclaimer': 'We are not affiliated with or endorsed by Take-Two, Rockstar North, Rockstar or any other rights holder. All trademarks used belong to their respective owners and are not affiliated with or endorsed by Take-Two, Rockstar North, Rockstar.',
    'loading.initializing': 'Initializing...',
    'loading.resources': 'Loading resources...',
    'loading.server': 'Connecting to server...',
    'loading.connection': 'Checking connection...',
    'loading.interface': 'Loading interface...',
    'loading.finalizing': 'Finalizing...',
    'loading.ready': 'Ready!',
    
    // Activity Check
    'activity.title': 'To continue, press',
    'activity.instruction': 'ENTER or click mouse',
    
    // Language Selector
    'language.tooltip': 'Select language',
    
    // Auth Form
    'auth.login.title': 'Login',
    'auth.login.subtitle': 'Enter your credentials',
    'auth.register.title': 'Registration',
    'auth.register.subtitle': 'Create new account',
    'auth.login.placeholder': 'Login or Email',
    'auth.password.placeholder': 'Password',
    'auth.password.tooShort': 'Minimum 6 characters',
    'auth.password.required': 'Password required',
    'auth.email.placeholder': 'Email',
    'auth.email.required': 'Email required',
    'auth.email.invalid': 'Invalid email',
    'auth.confirmPassword.placeholder': 'Confirm Password',
    'auth.confirmPassword.required': 'Confirm password',
    'auth.confirmPassword.mismatch': 'Passwords do not match',
    'auth.referral.placeholder': 'Referral code (optional)',
    'auth.rememberPassword': 'Remember password',
    'auth.acceptTerms': 'I accept',
    'auth.acceptTerms.required': 'Accept terms',
    'auth.acceptPrivacy': 'I accept',
    'auth.acceptPrivacy.required': 'Accept privacy policy',
    'auth.login.required': 'Login required',
    'auth.rules': 'server rules',
    'auth.privacy': 'privacy policy',
    'auth.login.button': 'Login',
    'auth.register.button': 'Register',
    'auth.login.loading': 'Logging in...',
    'auth.register.loading': 'Registering...',
    'auth.noAccount': 'No account?',
    'auth.hasAccount': 'Have account?',
    'auth.switchToRegister': 'Register',
    'auth.switchToLogin': 'Login',
    'auth.warning.title': 'Warning!',
    'auth.warning.text': 'Be careful when filling out data. Multi-accounts are prohibited!',
    'auth.warning.rule': '1 GTA 5 Account = 1 server account',
    
    // Character Menu
    'character.title': 'Character Selection',
    'character.subtitle': 'Choose character to enter the game',
    'character.logout': 'Logout',
    'character.create': 'Create Character',
    'character.createNew': 'New Character',
    'character.play': 'Play',
    'character.level': 'LVL',
    'character.money': 'Money:',
    'character.playtime': 'Playtime:',
    'character.lastPlayed': 'Last played:',
    
    // Character Editor
    'editor.title': 'Character Creation',
    'editor.subtitle': 'Customize your character appearance',
    'editor.back': 'Back',
    'editor.create': '✨ Create Character',
    'editor.random': '🎲 Random',
    'editor.reset': '🔄 Reset',
    
    // Tabs
    'tab.character': 'Character',
    'tab.face': 'Face & Neck',
    'tab.body': 'Body & Skin',
    'tab.hair': 'Hair',
    'tab.eyebrows': 'Eyebrows',
    'tab.makeup': 'Makeup',
    'tab.clothing': 'Clothing',
    
    // Modals
    'modal.confirmation.title': 'Creation Confirmation',
    'modal.confirmation.message': 'Are you sure?',
    'modal.confirmation.warning': 'Cannot be changed later',
    'modal.confirmation.yes': 'Yes',
    'modal.confirmation.no': 'No',
    'modal.nickname.title': 'Final Step',
    'modal.nickname.message': 'Enter character nickname',
    'modal.nickname.placeholder': 'Name_Surname',
    'modal.nickname.hint': 'Example: John_Smith',
    'modal.nickname.ok': 'OK',
    'modal.nickname.cancel': 'Cancel',
    
    // Rules Modal
    'rules.title': 'Server Rules',
    'privacy.title': 'Privacy Policy',
    'rules.understand': 'Understand',
  },
  
  ae: {
    // Loading Screen
    'loading.title': 'PROJECT ROLE PLAY',
    'loading.disclaimer': 'نحن غير مرتبطين أو مؤيدين من قبل Take-Two أو Rockstar North أو Rockstar أو أي صاحب حقوق آخر. جميع العلامات التجارية المستخدمة تنتمي إلى أصحابها المعنيين وغير مرتبطة أو مؤيدة من قبل Take-Two أو Rockstar North أو Rockstar.',
    'loading.initializing': 'جاري التهيئة...',
    'loading.resources': 'جاري تحميل الموارد...',
    'loading.server': 'جاري الاتصال بالخادم...',
    'loading.connection': 'جاري فحص الاتصال...',
    'loading.interface': 'جاري تحميل الواجهة...',
    'loading.finalizing': 'جاري الإنهاء...',
    'loading.ready': 'جاهز!',
    
    // Activity Check
    'activity.title': 'للمتابعة، اضغط',
    'activity.instruction': 'ENTER أو انقر بالماوس',
    
    // Language Selector
    'language.tooltip': 'اختر اللغة',
    
    // Auth Form
    'auth.login.title': 'تسجيل الدخول',
    'auth.login.subtitle': 'أدخل بيانات الدخول',
    'auth.register.title': 'التسجيل',
    'auth.register.subtitle': 'إنشاء حساب جديد',
    'auth.login.placeholder': 'اسم المستخدم أو البريد الإلكتروني',
    'auth.password.placeholder': 'كلمة المرور',
    'auth.password.tooShort': 'الحد الأدنى 6 أحرف',
    'auth.password.required': 'كلمة المرور مطلوبة',
    'auth.email.placeholder': 'البريد الإلكتروني',
    'auth.email.required': 'البريد الإلكتروني مطلوب',
    'auth.email.invalid': 'بريد إلكتروني غير صحيح',
    'auth.confirmPassword.placeholder': 'تأكيد كلمة المرور',
    'auth.confirmPassword.required': 'تأكيد كلمة المرور',
    'auth.confirmPassword.mismatch': 'كلمات المرور غير متطابقة',
    'auth.referral.placeholder': 'رمز الإحالة (اختياري)',
    'auth.rememberPassword': 'حفظ كلمة المرور',
    'auth.acceptTerms': 'أوافق على',
    'auth.acceptTerms.required': 'اقبل القوانين',
    'auth.acceptPrivacy': 'أوافق على',
    'auth.acceptPrivacy.required': 'اقبل سياسة الخصوصية',
    'auth.login.required': 'اسم المستخدم مطلوب',
    'auth.rules': 'قوانين الخادم',
    'auth.privacy': 'سياسة الخصوصية',
    'auth.login.button': 'دخول',
    'auth.register.button': 'تسجيل',
    'auth.login.loading': 'جاري الدخول...',
    'auth.register.loading': 'جاري التسجيل...',
    'auth.noAccount': 'لا يوجد حساب؟',
    'auth.hasAccount': 'يوجد حساب؟',
    'auth.switchToRegister': 'تسجيل',
    'auth.switchToLogin': 'دخول',
    'auth.warning.title': 'تحذير!',
    'auth.warning.text': 'كن حذراً عند ملء البيانات. الحسابات المتعددة محظورة!',
    'auth.warning.rule': '1 حساب GTA 5 = 1 حساب خادم',
    
    // Character Menu
    'character.title': 'اختيار الشخصية',
    'character.subtitle': 'اختر شخصية لدخول اللعبة',
    'character.logout': 'خروج',
    'character.create': 'إنشاء شخصية',
    'character.createNew': 'شخصية جديدة',
    'character.play': 'لعب',
    'character.level': 'المستوى',
    'character.money': 'المال:',
    'character.playtime': 'وقت اللعب:',
    'character.lastPlayed': 'آخر دخول:',
    
    // Character Editor
    'editor.title': 'إنشاء الشخصية',
    'editor.subtitle': 'خصص مظهر شخصيتك',
    'editor.back': 'رجوع',
    'editor.create': '✨ إنشاء الشخصية',
    'editor.random': '🎲 عشوائي',
    'editor.reset': '🔄 إعادة تعيين',
    
    // Tabs
    'tab.character': 'الشخصية',
    'tab.face': 'الوجه والرقبة',
    'tab.body': 'الجسم والبشرة',
    'tab.hair': 'الشعر',
    'tab.eyebrows': 'الحواجب',
    'tab.makeup': 'المكياج',
    'tab.clothing': 'الملابس',
    
    // Modals
    'modal.confirmation.title': 'تأكيد الإنشاء',
    'modal.confirmation.message': 'هل أنت متأكد؟',
    'modal.confirmation.warning': 'لا يمكن تغييرها لاحقاً',
    'modal.confirmation.yes': 'نعم',
    'modal.confirmation.no': 'لا',
    'modal.nickname.title': 'الخطوة الأخيرة',
    'modal.nickname.message': 'أدخل اسم الشخصية',
    'modal.nickname.placeholder': 'الاسم_اللقب',
    'modal.nickname.hint': 'مثال: Ahmed_Ali',
    'modal.nickname.ok': 'موافق',
    'modal.nickname.cancel': 'إلغاء',
    
    // Rules Modal
    'rules.title': 'قوانين الخادم',
    'privacy.title': 'سياسة الخصوصية',
    'rules.understand': 'فهمت',
  }
}

export function LanguageProvider(props: { children: JSX.Element }) {
  const savedLanguage = localStorage.getItem('altv_language') as Language || 'ru'
  const [language, setLanguage] = createSignal<Language>(savedLanguage)

  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('altv_language', lang)
  }

  const t = (key: string): string => {
    return translations[language()][key] || key
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: updateLanguage,
      t
    }}>
      {props.children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}