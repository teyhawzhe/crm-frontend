export function save() {
  return {
    path: [{ required: true, message: '請選擇路徑!', trigger: 'change' }],
    role: [
      {
        type: 'array',
        required: true,
        minLength: 1,
        message: '請選擇至少一個的權限!',
        trigger: 'change'
      }
    ]
  }
}

export function insertFuncPermissionValid() {
  return {
    title: [{ required: true, message: '請選擇主標題', trigger: 'change' }],
    role: [{ required: true, message: '請選擇角色', trigger: 'blur' }]
  }
}
