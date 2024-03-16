## PDF to Multiple Choice Questions Generator
This code's objective is to ingest PDF documents (of online available textbooks) and to create multiple choice questions with answers and explanations out of them.


### How does this work
1. PDFs are read using PDFminer.
2. Chunks of PDF are sent to LLM to to formulate a question, 4 candidate responses, 1 correct answer and the reason for the correct answer.
3. A frontend is created via HTML, JS, CSS.
4. A server is deployed using Python by running `python -m http.server`


