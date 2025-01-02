let selectedBookIndex = null;

// Function to fetch and display reviews for a specific book
const displayReviews = (index) => {
    const reviewsList = document.getElementById('reviews-list-${index}');
    const bookReviews = localStorage.getItem('reviews-${index}') ? JSON.parse(localStorage.getItem('reviews-${index}')) : [];
    reviewsList.innerHTML = '';
    bookReviews.forEach(review)
}