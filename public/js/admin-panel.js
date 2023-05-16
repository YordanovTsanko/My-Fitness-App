const dashboardLink = document.getElementById('dashboard-link');
const inProcessLink = document.getElementById('in-process-link');
const ordersLink = document.getElementById('orders-link');
const usersLink = document.getElementById('users-link');
const customQuoteLink = document.getElementById('custom-quote-link');
const settingsPanelLink = document.getElementById('settings-panel-link');
const logsLink = document.getElementById('logs-link');
const pSectionTitle = document.getElementById('panel-section-title');
const displayContent = document.getElementById('display-content-admin-panel');


///////////////////////////////DASHBOARD//////////////////////////////////////////////////////////////
dashboardLink.addEventListener('click', () => {
  pSectionTitle.textContent = 'Dashboard';
  fetch('/sections/admin-panel/dashboard')
    .then(response => response.text())
    .then(html => displayContent.innerHTML = html)
    .catch(error => console.error(error));
});
///////////////////////////////IN-PROCESS////////////////////////////////////////////////////////////
inProcessLink.addEventListener('click', () => {
  pSectionTitle.textContent = 'In Process';
  fetch('/sections/admin-panel/in-process')
    .then(response => response.text())
    .then(html => displayContent.innerHTML = html)
    .catch(error => console.error(error));
});
///////////////////////////////ALL-QUOTES////////////////////////////////////////////////////////////
// define a function to add event listeners to order elements
const addOrderEventListeners = async () => {
  const orders = document.querySelectorAll('.order-selector');
  const allOrdersResponse = await fetch('/sections/admin-panel/all-bookings');
  const allOrdersHTML = await allOrdersResponse.text();
  const orderPromises = Array.from(orders).map(async (order) => {
    order.addEventListener('click', async (event) => {
      const id = event.currentTarget.dataset.id;
      const orderResponse = await fetch(`/sections/admin-panel/all-bookings/${id}`);
      const orderHTML = await orderResponse.text();
      displayContent.innerHTML = orderHTML;
      //back button handler
      const backToOrdersButton = document.getElementById('back-to-orders');
      backToOrdersButton.addEventListener('click', async () => {
        displayContent.innerHTML = allOrdersHTML; // go back to the initial content
        pSectionTitle.textContent = 'All Orders';
        await addOrderEventListeners()
      });
      //edit button hander
      const editBookingBtn = document.getElementById('edit-booking');
      editBookingBtn.addEventListener('click', async () => {
        console.log(await this.innerText)
        this.innerText = 'Submit';
      })
      //delete button handler
      const deleteBookingBtn = document.getElementById('delete-booking');
      deleteBookingBtn.addEventListener('click', async () => {
        const id = deleteBookingBtn.dataset.id;
        const password = prompt('Please enter the confirmation password:');
        if (password === 'admin') {
          const confirmDelete = confirm('Are you sure you want to delete this booking?');
          if (confirmDelete) {
            try {
              const response = await fetch(`/sections/admin-panel/all-bookings/${id}`, {
                method: 'DELETE'
              });
              const allOrdersResponse = await fetch('/sections/admin-panel/all-bookings');
              const allOrdersHTML = await allOrdersResponse.text();
              displayContent.innerHTML = allOrdersHTML;
              await addOrderEventListeners()
            } catch (error) {
              console.error(error);
              alert('Error deleting booking.');
            }
          }
        } else {
          alert('Incorrect password. Booking was not deleted.');
        }
      });
    });
  });
  await Promise.all(orderPromises);
};

ordersLink.addEventListener('click', async () => {
  pSectionTitle.textContent = 'All Orders';
  try {
    const allOrdersResponse = await fetch('/sections/admin-panel/all-bookings');
    const allOrdersHTML = await allOrdersResponse.text();
    displayContent.innerHTML = allOrdersHTML;
    await addOrderEventListeners(); // add event listeners to order elements
  } catch (error) {
    console.error(error);
  }
});
///////////////////////////////ALL-USERS////////////////////////////////////////////////////////////
usersLink.addEventListener('click', async () => {
  pSectionTitle.textContent = 'All Users';
  try {
    const response = await fetch('/sections/admin-panel/users');
    const html = await response.text();
    displayContent.innerHTML = html;
    initUsersPage();
  } catch (error) {
    console.error(error);
  }
});

function initUsersPage() {
  function handleFilterClick(event) {
    const filterEls = document.querySelectorAll('.filter-js');
    filterEls.forEach((el) => {
      el.classList.remove('active-user-filter');
    });
    event.target.classList.add('active-user-filter');
  }

  const filterEls = document.querySelectorAll('.filter-js');
  filterEls.forEach((el) => {
    el.addEventListener('click', handleFilterClick);
  });
}

///////////////////////////////CUSTOM QUOTE/////////////////////////////////////////////////////////
customQuoteLink.addEventListener('click', async () => {
  pSectionTitle.textContent = 'Custom Quote';
  try {
    const response = await fetch('/sections/admin-panel/custom-quote');
    const html = await response.text();
    displayContent.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
});

///////////////////////////////SETTINGS/////////////////////////////////////////////////////////////
settingsPanelLink.addEventListener('click', async () => {
  pSectionTitle.textContent = 'Settings';
  try {
    const response = await fetch('/sections/admin-panel/settings-panel');
    const html = await response.text();
    displayContent.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
});

///////////////////////////////LOGS//////////////////////////////////////////////////////////////
logsLink.addEventListener('click', async () => {
  pSectionTitle.textContent = 'Logs';
  try {
    const response = await fetch('/sections/admin-panel/logs');
    const html = await response.text();
    displayContent.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
});
