export function insertValid() {
  return {
    title: [{ required: true, message: '請輸入主標題', trigger: 'blur' }],
    path: [{ required: true, message: '請輸入主路徑', trigger: 'blur' }],
    icon: [{ required: true, message: '請選擇圖標', trigger: 'blur' }]
  }
}
