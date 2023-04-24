export default function useErrorMessage(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return '此電子信箱已被註冊';
    case 'auth/invalid-email':
      return '無效的電子信箱';
    case 'auth/user-not-found':
      return '此電子信箱尚未註冊';
    case 'auth/wrong-password':
      return '密碼錯誤';
    case 'auth/missing-password':
      return '密碼不可為空';
    case 'auth/weak-password':
      return '密碼強度不足，請設定六字元以上的英數字';
    default:
      return error.message;
  }
}
