// generate-hash.ts
import * as bcrypt from 'bcrypt';

async function generateHash() {
  const hash = await bcrypt.hash('yourpassword', 10); // replace 'yourpassword' with your real password
  console.log(hash);
}

generateHash();
