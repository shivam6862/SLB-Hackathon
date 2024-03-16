# SLB-Hackathon

## Overview

This document outlines the workflow for translating text from a given language to another specified language in several steps. The process involves creating a dictionary of possible headings, filtering these headings, extracting sub-headings, and finally translating the text. The goal is to enhance translation quality and readability by organizing the text into meaningful sections.

## Step-by-Step Process

1. _Creating Dictionary of Possible Headings_:

   - Generate possible headings based on the following criteria:
     - If the word count in a line is less than or equal to 3.
     - If a colon is present in the line, take the slice to the left of the colon as a possible heading if the word count is less than or equal to 3.
   - Store these possible headings in a dictionary where keys represent the possible heading, and the values are tuples of start and end indices of the possible heading in the whole text.

2. _Filtering Headings_:

   - Use a Language Model (LLM) to determine the closeness of each possible heading to certain English words such as 'Warning Statement', 'Overview', 'Emergency Contact Numbers', 'Assistance', and 'Advice'.
   - Approve headings that are close to any of the above words based on the LLM's decision.

3. _Chunking Text_:

   - Create chunks of text based on the approved headings.
   - All the text between one approved heading and the next approved heading is taken as the body of the corresponding heading.

4. _Extracting Sub-headings_:

   - Further enhance translation quality and readability by extracting sub-headings from the body chunks.
   - Define rules to identify meaningful sub-headings within the body text.

5. _Translation_:
   - Translate the text to the final language using the generated dictionary of headings as keys and body text as values.
   - For headings like 'Overview', store a dictionary of sub-headings and text as the value.

## Workflow

![WorkFlow](/workflow.png)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/shivam6862/SLB-Hackathon.git
   cd SLB-Hackathon
   ```

2. Install dependencies and Run the application:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Install dependencies and Run the application:

   ```bash
   cd backend/python
   pip install -r requirements.txt
   cd slbbackend
   python manage.py runserver
   ```

4. Install dependencies and Run the application:

   ```bash
   cd backend/nodejs
   npm install
   npm start
   ```

5. Access the application at [port](http://localhost:3000)

## Contributors

- [Sarvagya Porwal](https://github.com/Sar2580P)
- [Shivam Kumar](https://github.com/shivam6862)
- [Puspendra Mahariya](https://github.com/silent-cipher)

## TEAMID -
