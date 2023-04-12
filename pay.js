  // get the payment radio buttons and the card details section
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const totalAmount = urlParams.get('total');

// Display the total amount on the page
const totalAmountElement = document.getElementById('total-amount');
totalAmountElement.textContent = `Total Amount: ${totalAmount}`;

function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 8000);
}

const submitOrder = (event) => {

    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const paymentOption = document.querySelector('input[name="payment"]:checked');
  
    // Validate form data
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
  
    if (!email.trim() ) {
      alert('Please enter a valid email address');
      return;
    }
  
    if (!phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
  
    if (!paymentOption) {
      alert('Please select a payment option');
      return;
    }
  
    if (paymentOption.value === 'online') {
      const cardName = document.getElementById('cname').value;
      const cardNumber = document.getElementById('cnum').value;
      const expMonth = document.getElementById('emon').value;
      const expYear = document.getElementById('eyear').value;
      const cvv = document.getElementById('cvv').value;
  
      if (!cardName.trim()) {
        alert('Please enter the name on your card');
        return;
      }
  
      if (!cardNumber.trim() || !cardNumber.match(/^\d{16}$/)) {
        alert('Please enter a valid 16-digit credit card number');
        return;
      }
  
      if (!expMonth.trim()) {
        alert('Please enter the expiration month on your card');
        return;
      }
  
      if (!expYear.trim() || !expYear.match(/^\d{4}$/)) {
        alert('Please enter a valid 4-digit expiration year on your card');
        return;
      }
  
      if (!cvv.trim() || !cvv.match(/^\d{3}$/)) {
        alert('Please enter a valid 3-digit CVV on your card');
        return;
      }
    }
  
    // Submit form data to Firebase Realtime Database
    const databaseURL = 'https://meal-89fd5-default-rtdb.asia-southeast1.firebasedatabase.app/users.json';
    const requestData = {
      name,
      email,
      phone,
      paymentOption: paymentOption.value
    };
  
    fetch(databaseURL, {
      method: 'POST',
      body: JSON.stringify(requestData)
    })
    .then(response => {
      if (response.ok) {
        //alert('Your order has been placed!');
        location.reload();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch(error => {
      console.error(error);
      alert('There was an error processing your order. Please try again later.');
    });
  };
  