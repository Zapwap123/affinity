# Node.js(Backend) Conference Event Scheduler 

This project takes an uploaded string of events as a CSV file and sorts the events into the schedule. 

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Limitations](#limitations)

## Introduction

The scheduling of events starts at 9 am, and 12 pm for Lunch, and may end by 4 pm or 5 pm before a 1-hour Networking Event starts.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed
- npm package manager (included with Node.js)

## Installation

To get started, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Zapwap123/affinity.git
    ```

2. Navigate to the project directory:

    ```bash
    cd eventscheduler
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

To run the backend application:

1. Navigate to "eventscheduler" in the affinity folder.

  ```bash
    cd eventscheduler
  ```

2. Run the node.js application.
   
  ```bash
  # Run the application
  node app.js
  ```

To test the application, you need an application like Postman.

1. Using Postman, create a new post request and paste the link "http://localhost:3000/api/schedule".
2. Navigate to the body and select "form-data".
3. Within the key section type "file" and select from the dropdown within that section and select "File".
4. Within the value section, click "select file" and navigate to the CSV file within the cloned repository "affinity\the_conference_talk_inputs.csv"
   or select an available CSV file of yours.
5. Click send and view your output within Postman or your server console.

## Limitations

The last event within the CSV file is not added. The bug is to be fixed in future updates.
