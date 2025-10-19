document.addEventListener('DOMContentLoaded', () => {
  const reviewsList = document.getElementById('reviews-list');
  const reviewForm = document.getElementById('review-form');

  // Статические отзывы с уникальными аватарками
  const staticReviews = [
    { name: "Иван Петров", text: "Очень понравилось обслуживание, мастера знают свое дело!", avatar: "./img/men_one.jpg" },
    { name: "Сергей Иванов", text: "Крутая атмосфера, рекомендую всем друзьям!", avatar: "./img/men_two.jpg" },
    { name: "Дмитрий Сидоров", text: "Хожу сюда постоянно, всегда ухожу довольным!", avatar: "./img/men_three.jpg" }
  ];

  function loadReviews() {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const allReviews = [...staticReviews, ...storedReviews]; // Комбинируем статические и динамические отзывы
    console.log('Все отзывы:', allReviews); // Отладочный вывод
    reviewsList.innerHTML = ''; // Очищаем список
    if (allReviews.length === 0) {
      reviewsList.innerHTML = '<p>Нет отзывов.</p>';
    } else {
      allReviews.forEach((review, index) => {
        const avatarSrc = review.avatar || "./img/default-avatar.png"; // Используем уникальный аватар или дефолтный
        const reviewElem = document.createElement('div');
        reviewElem.classList.add('review', 'd-flex', 'mb-3');
        // Добавляем кнопку "Удалить" только для динамических отзывов (индекс >= staticReviews.length)
        const deleteButton = index >= staticReviews.length ? `
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Удалить</button>
        ` : '';
        reviewElem.innerHTML = `
          <img src="${avatarSrc}" class="rounded-circle me-3" alt="Аватар ${review.name}" style="width: 80px; height: 80px;">
          <div class="flex-grow-1">
            <h5>${review.name}</h5>
            <p>${review.text}</p>
          </div>
          ${deleteButton}
        `;
        reviewsList.appendChild(reviewElem);
      });
    }
  }

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('review-name').value.trim();
    const text = document.getElementById('review-text').value.trim();
    if (name && text) {
      const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
      reviews.push({ name, text, avatar: "./img/default-avatar.png" }); // Динамические отзывы используют дефолтный аватар
      localStorage.setItem('reviews', JSON.stringify(reviews));
      reviewForm.reset();
      loadReviews();
      alert('Отзыв успешно добавлен!');
    }
  });

  reviewsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      let allReviews = [...staticReviews, ...JSON.parse(localStorage.getItem('reviews')) || []];
      if (index >= staticReviews.length && index < allReviews.length) {
        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        storedReviews.splice(index - staticReviews.length, 1); // Удаляем только из localStorage
        localStorage.setItem('reviews', JSON.stringify(storedReviews));
        loadReviews();
        alert('Отзыв успешно удален!');
      }
    }
  });

  loadReviews(); // Загружаем отзывы при старте
});