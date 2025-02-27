const generateRandomCode = ({ prefix = '', length = 10, type = 'mix1' }) => {
  const charSets = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    mix1: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    mix2: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  };
  const timestamp = Date.now(); // Get the current timestamp

  if (!charSets[type]) {
    throw new Error('Invalid type specified');
  }
  // loại mix sẽ sử dụng để tạo codecode
  const characters = charSets[type];

  // hàm tạo codecode
  const generateCode = () => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return prefix + result + timestamp;
  };
  // tạo codecode
  let code = generateCode();

  return code;
};

export { generateRandomCode };
