const signupBtn = document.querySelector('.signup-btn')
const username = document.querySelector('.username-input')
const email = document.querySelector('email-input')
const password = document.querySelector('password-input')

signupBtn.addEventListener('click', createAccount)

async function createAccount() {
    if (username && email && password) {
        //change the path after
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}

createAccount()