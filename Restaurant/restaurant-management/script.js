document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const order = document.getElementById('order').value;
  
    fetch('/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, order })
    })
    .then(response => response.json())
    .then(data => {
      const orderList = document.getElementById('order-list');
      const orderItem = document.createElement('div');
      orderItem.textContent = `Customer: ${data.name}, Order: ${data.order}`;
      orderList.appendChild(orderItem);
    })
    .catch(error => console.error('Error:', error));
  });
  