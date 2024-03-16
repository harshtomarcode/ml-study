## PDF to Multiple Choice Questions Generator
This code's objective is to ingest PDF documents (of online available textbooks) and to create multiple choice questions with answers and explanations out of them.


### Steps
1. PDFs are read using PDFminer.
2. These PDFs are cleaned up using an LLM and structured
3. Data is stored into structured database.
4. LLM is called on structured database to create a question, multple choice answers which may have one or more correct answers and reasoning for why each option is correct or incorrect.

