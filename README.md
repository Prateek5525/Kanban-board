#  Kanban Board Application

## Project Overview

This project is an interactive **Kanban Board Application** built using **React.js**. The application allows users to dynamically display tickets grouped by **Status**, **User**, or **Priority** using data fetched from the provided API. The application aims to replicate the design provided in the assignment while also offering features like sorting and state persistence.

## Features

- **Dynamic Grouping**: 
  - Group tickets by **Status**, **User**, or **Priority**.
- **Sorting Options**:
  - Sort tickets by **Priority** (Descending).
  - Sort tickets by **Title** (Ascending).
- **Priority Levels**:
  - Urgent (4)
  - High (3)
  - Medium (2)
  - Low (1)
  - No priority (0)
- **State Persistence**:
  - The application saves the user's view preference, even after a page reload.
- **Responsive UI**: 
  - Designed to be fully responsive and visually appealing without using any CSS libraries like Bootstrap or Tailwind.

##  Tech Stack

- **React.js**: Frontend library for building user interfaces.
- **Pure CSS**: For styling (No external CSS libraries).
- **API Integration**: Fetch data from the provided API endpoint.
- **Local Storage**: To save user preferences and maintain state.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/kanban-board.git
   cd kanban-board
