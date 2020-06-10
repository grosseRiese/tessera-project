const loginButton = document.querySelector('#btnLogin');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');
const errorMessage = document.querySelector('#errorMsg');


const saveToken = (token)=> {
    sessionStorage.setItem('auth', token);
}

const getToken =() => {
    return sessionStorage.getItem('auth');
}

const login = async (username, password)=> {
    const url = 'http://localhost:7000/api/v1/auth/login';

    const account = {
        username: username,
        password: password
    }

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return await data;
}

const loggedin = async ()=>{
        const token = getToken();
        const url = 'http://localhost:7000/api/v1/auth/isLoggedin';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': 'Bearer ' + token //( the space after Bearer is important )
            }
        });
        const data = await response.json();
        return await data;
}
/*********
const buttonElem = document.querySelector('#logout');
function logout() {
    sessionStorage.removeItem('auth');
    location.href = '/';
}
buttonElem.addEventListener('click', () => {
    logout();
});**************/
loginButton.addEventListener('click', async () => {
        const username = inputUser.value;
        const password = inputPass.value;    

    let loggedin = await login(username, password);

    if (!loggedin.success) {
            errorMessage.classList.toggle('hide'); 
            errorMessage.innerHTML = `Username or password is incorrect!`;
      
    }else if (loggedin.success && loggedin.role === 'admin') {
            saveToken(loggedin.token);
            setTimeout(()=>{
                location.href = 'http://localhost:7000/admin.html';
            },100);
    }
    else if (loggedin.success && loggedin.role === 'staff'){
        saveToken(loggedin.token);
        setTimeout(()=>{
            location.href = 'http://localhost:7000/verify.html';
        },100);
    }
});
loggedin();

