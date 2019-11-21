export function insertFormRules() {
  return {
    name: [
      { required: true, message: '請輸入姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '字元度在2到10之間', trigger: 'blur' }
    ],
    username: [
      { required: true, message: '請輸入帳號', trigger: 'blur' },
      { min: 5, max: 10, message: '字元度在5到10之間', trigger: 'blur' }
    ],
    roles: [
      {
        type: 'array',
        required: true,
        message: '請選擇至少一個權限',
        trigger: 'change'
      }
    ],
    image: [
      {
        required: true,
        message: '請上傳大頭貼',
        trigger: 'change'
      }
    ]
  }
}
