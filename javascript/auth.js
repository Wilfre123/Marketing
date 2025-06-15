
  // register side
  const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(userForm);
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('http://localhost:3001/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const rawText = await response.text();
    console.log('Raw response:', rawText);

    try {
      const result = JSON.parse(rawText);

      if (response.ok) {
        alert('User created successfully!');
        userForm.reset();
      } else {
        alert('Error: ' + (result.message || 'Unknown error'));
      }
    } catch (e) {
      alert('Invalid JSON from server:\n' + rawText);
    }

  } catch (err) {
    alert('Fetch error: ' + err.message);
  }
});


//Login side
 const form = document.getElementById('loginForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const email = formData.get('email'); 
      const password = formData.get('password');

      try {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), 
        });

        const data = await response.json();
        if (response.ok) {
          message.textContent = data.message;
          message.style.color = 'green';
        } else {
          message.textContent = data.message;
          message.style.color = 'red';
        }
      } catch (error) {
        message.textContent = 'Network error';
        message.style.color = 'red';
      }
    });
  

  



     
