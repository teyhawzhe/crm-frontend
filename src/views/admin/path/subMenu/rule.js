export function insertValid() {
  return {
    parent: [{ required: true, message: '請選擇主目錄', trigger: 'change' }],
    title: [{ required: true, message: '請輸入主目錄', trigger: 'blur' }],
    path: [{ required: true, message: '請輸入主路徑', trigger: 'blur' }],
    icon: [{ required: true, message: '請選擇圖標', trigger: 'blur' }]
  }
}
