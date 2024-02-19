// Get the form element and add a submit event listener
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

// Function to handle the form submission
function submitForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  
  // Get the input element and its value
  const input = document.querySelector('input[type="text"]');
  const inputValue = input.value;
  
  // Create a new farmer listing element and add it to the farmers section
  const farmersSection = document.querySelector('.farmers');
  const newFarmer = document.createElement('li');
  newFarmer.innerHTML = `
    <h4>${inputValue}</h4>
    <p>Location: India</p>
    <p>Contact: farmer@example.com</p>
    <button>Buy from this farmer</button>
  `;
  farmersSection.appendChild(newFarmer);
  
  // Reset the input field
  input.value = '';
}

// Add event listeners to the buy buttons for each farmer listing
const buyButtons = document.querySelectorAll('.farmers li button');
buyButtons.forEach(button => {
  button.addEventListener('click', buyFromFarmer);
});

// Function to handle clicking the "Buy from this farmer" button
function buyFromFarmer(event) {
  // Get the parent li element and its child elements
  const li = event.target.closest('li');
  const farmerName = li.querySelector('h4').textContent;
  const farmerContact = li.querySelector('p:last-of-type').textContent.split(':')[1].trim();
  
  // Display an alert with the farmer's name and contact information
  alert(`You have purchased from ${farmerName} at ${farmerContact}!`);
}
