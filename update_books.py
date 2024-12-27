import os
import json

# Define the paths for the PDFs and EPUBs directories
pdf_dir = 'books/pdfs'
epub_dir = 'books/epubs'
json_file = 'data/books.json'

def update_books_json():
    books = []  # Define the books list here

    # Get all PDF and EPUB files
    pdf_files = [f for f in os.listdir(pdf_dir) if f.endswith('.pdf')]
    epub_files = [f for f in os.listdir(epub_dir) if f.endswith('.epub')]

    for pdf in pdf_files:
        # Assume EPUB file has the same base name as the PDF file
        epub = pdf.replace('.pdf', '.epub')

        if epub in epub_files:
            book = {
                'title': pdf.replace('.pdf', '').replace('_', ' ').title(),
                'description': f'Description of {pdf.replace(".pdf", "").title()}',
                'pdfLink': f'{pdf_dir}/{pdf}',
                'epubLink': f'{epub_dir}/{epub}'
            }
            books.append(book)

    # Write to JSON file
    with open(json_file, 'w') as f:
        json.dump(books, f, indent=4)

    return books  # Return the books list here

if __name__ == "__main__":
    books = update_books_json()  # Capture the return value of the function
    print(f'Updated {json_file} with {len(books)} books')
