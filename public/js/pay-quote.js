const id = document.getElementById('quoteNumber').getAttribute('data-quote-number')
console.log(id)
document.getElementById('pay-online-btn').addEventListener('click', () => {
    const output = document.querySelectorAll('.quote-class')[0]
    const outputremove = output.querySelector('div')
    outputremove.remove()
    fetch('/quote/payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([id.replace(/\s+/g, '')])
    }).then(response => response.text())
        .then(data => {
            output.innerHTML = data;
            output.classList.remove('p-3')
            document.getElementById('payment__button').addEventListener('click', async (e) => {
                e.preventDefault()
                var name = document.getElementById('name').value
                var email = document.getElementById('email').value
                var phone = document.getElementById('phone').value
                const errorElement = document.querySelector(`.payment__title + .alert`);
                const errorDiv = document.createElement('div');
                const error = document.createElement('p');
                errorDiv.classList.add('alert', 'alert-danger');
                error.style.marginBottom = '0';
                errorDiv.appendChild(error)
                if (name === '' || email === '' || phone === '') {
                    if (errorElement) {
                        errorElement.textContent = 'Моля попълнете полетата';
                    } else {
                        error.textContent = 'Моля попълнете полетата';
                        document.getElementsByClassName('payment__title')[0].after(errorDiv);
                    }
                    return;
                }

                if (errorElement) {
                    errorElement.remove();
                }

                const bodyToSend = { name, email, phone, id: id.replace(/\s+/g, '') }
                console.log(bodyToSend)
                try {
                    const response = await fetch('/quote/pay', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyToSend)
                    });
                    const responseData = await response.json();
                    window.location.href = `/quote/thank-you`;
                } catch (error) {
                    console.error(error);
                }
            })
        })
        .catch(error => console.error(error));
})