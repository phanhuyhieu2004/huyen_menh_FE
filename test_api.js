const axios = require('axios');

async function test() {
  try {
    // We need to login first
    const loginRes = await axios.post('http://localhost:8080/api/auth/login', {
      email: 'admin@huyenmenh.com', // Assuming admin exists, or we skip auth logic if we know the token? Can't.
      password: 'admin' // Need a valid password. Let's try password123? We can query DB for the count!
    });
  } catch (err) {
    console.error(err);
  }
}
test();
