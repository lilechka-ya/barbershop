document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('serviceSelect');
  const servicePrice = document.getElementById('servicePrice');

  window.updatePrice = function () {
    const price = serviceSelect.options[serviceSelect.selectedIndex].dataset.price || '0';
    servicePrice.textContent = price;
  };

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = serviceSelect.value;
    const master = document.getElementById('masterSelect').value;
    const name = document.getElementById('client-name').value.trim();
    const phone = document.getElementById('client-phone').value.trim();
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const price = servicePrice.textContent;

    if (service && master && name && phone && date && time) {
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push({ service, master, name, phone, date, time, price });
      localStorage.setItem('bookings', JSON.stringify(bookings));
      alert('Запись успешно сохранена!');
      bookingForm.reset();
      servicePrice.textContent = '0';
    }
  });
});