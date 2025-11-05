
# Dynamic Data Table Manager

A feature-rich **Dynamic Data Table Manager** built using **Next.js**, **Redux Toolkit**, and **Material UI (MUI)**. This project demonstrates advanced front-end concepts such as dynamic UIs, state management, and real-world features like import/export, searching, sorting, and inline editing.

---

## Table of Contents

- [Features](#features)  
  - [Core Features](#core-features)  
  - [Bonus Features](#bonus-features-optional)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Technologies Used](#technologies-used)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

### Core Features

1. **Table View**  
   - Display a table with default columns: `Name`, `Email`, `Age`, `Role`.  
   - Sorting on column headers (ASC/DESC toggle).  
   - Global search (search across all fields).  
   - Client-side pagination (10 rows per page).  

2. **Dynamic Columns**  
   - "Manage Columns" modal:  
     - Add new fields like `Department`, `Location`.  
     - Show/hide existing columns using checkboxes.  
     - Reflect changes dynamically in the table.  
   - Persist column visibility using **localStorage** or **Redux Persist**.  

3. **Import & Export**  
   - **Import CSV**:  
     - Upload CSV and parse using [PapaParse](https://www.papaparse.com/).  
     - Show errors for invalid formats.  
   - **Export CSV**:  
     - Export current table view to `.csv`.  
     - Only include visible columns.  

---

### Bonus Features (Optional but appreciated)

- Inline row editing:  
  - Double-click to edit fields inline.  
  - Validate inputs (e.g., age must be a number).  
  - “Save All” and “Cancel All” buttons.  
- Row actions: **Edit**, **Delete** (with confirmation).  
- Theme toggle: Light/Dark mode using MUI theming.  
- Column reordering via drag-and-drop.  
- Fully responsive design for mobile and desktop.  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/dynamic-data-table-manager.git
cd dynamic-data-table-manager
