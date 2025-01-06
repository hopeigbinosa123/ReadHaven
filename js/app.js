// app.js

let selectedDownloadLink = null;

// Function to load books and display them on a specific page
const loadBooks = async () => {
  const booksList = document.getElementById('books-list');
  
  if (booksList) {
    booksList.innerHTML = '';

    try {
      const response = await fetch('data/books.json');
      const books = await response.json();

      books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <div class="download-buttons">
            <a href="${book.pdfLink}" class="download-btn" data-link="${book.pdfLink}">Download PDF</a>
            <a href="${book.epubLink}" class="download-btn" data-link="${book.epubLink}">Download EPUB</a>
          </div>
        `;
        booksList.appendChild(bookItem);
      });

      // Add event listeners for download buttons
      const downloadButtons = document.querySelectorAll('.download-btn');
      downloadButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          selectedDownloadLink = event.target.getAttribute('data-link');
          showTermsModal();
        });
      });

    } catch (error) {
      console.error('Error fetching books:', error);
    }
  } else {
    console.error('Error: booksList element not found.');
  }
}

// Function to load featured books and display them on the homepage
const loadFeaturedBooks = async () => {
  const booksContainer = document.querySelector('.books-container');
  
  if (booksContainer) {
    booksContainer.innerHTML = '';

    try {
      const response = await fetch('data/books.json');
      const books = await response.json();

      // Display the first few books as featured books
      const featuredBooks = books.slice(0, 3); // Change the number to display more/less featured books

      featuredBooks.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <a href="books.html" class="button">Learn More</a>
        `;
        booksContainer.appendChild(bookItem);
      });

    } catch (error) {
      console.error('Error fetching books:', error);
    }
  } else {
    console.error('Error: booksContainer element not found.');
  }
}

// Function to show the terms and conditions modal
const showTermsModal = () => {
  const termsModal = document.getElementById('termsModal');
  if (termsModal) {
    termsModal.style.display = 'block';
  }
}

// Function to hide the terms and conditions modal
const hideTermsModal = () => {
  const termsModal = document.getElementById('termsModal');
  if (termsModal) {
    termsModal.style.display = 'none';
  }
}

// Function to handle accepting terms and downloading the book
const acceptTermsAndDownload = () => {
  if (selectedDownloadLink) {
    window.location.href = selectedDownloadLink;
  }
  hideTermsModal();
}

// Add event listeners for modal buttons
const addModalEventListeners = () => {
  const acceptTermsButton = document.getElementById('acceptTerms');
  const closeTermsModalButton = document.getElementById('closeTermsModal');

  if (acceptTermsButton) {
    acceptTermsButton.addEventListener('click', acceptTermsAndDownload);
  }

  if (closeTermsModalButton) {
    closeTermsModalButton.addEventListener('click', hideTermsModal);
  }

  // Close the modal when clicking outside of it
  window.onclick = (event) => {
    const termsModal = document.getElementById('termsModal');
    if (event.target == termsModal) {
      hideTermsModal();
    }
  }
}

// Load appropriate content based on the current page
window.onload = () => {
  if (document.getElementById('books-list')) {
    loadBooks();
  }
  if (document.querySelector('.books-container')) {
    loadFeaturedBooks();
  }
  addModalEventListeners();
}
