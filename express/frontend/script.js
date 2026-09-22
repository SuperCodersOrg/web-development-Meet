

  
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.classList.add('active-form');
      signupForm.classList.remove('active-form');
    });

    signupTab.addEventListener('click', () => {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupForm.classList.add('active-form');
      loginForm.classList.remove('active-form');
    });



     const login = document.getElementById('loginid');

     login.addEventListener('click',(e)=>{
      e.preventDefault();

 const em = document.getElementById('login-email');
  const pass = document.getElementById('login-password');
      const cred = {
        email : em.value,
        password:pass.value
      }
      fetch('http://localhost:3300/login',{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body : JSON.stringify(cred)
      })
      .then((res)=>res.json())
      .then((data)=>{
console.log(data);

      })
          .catch((err) => console.error("Error :", err));
     })