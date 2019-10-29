export function validInsertForm() {
  return {
    role: [{ required: true, message: '請輸入權限角色!', trigger: 'blur' }],
    def: [{ required: true, message: '請輸入權限敘述!', trigger: 'blur' }]
  }
}
