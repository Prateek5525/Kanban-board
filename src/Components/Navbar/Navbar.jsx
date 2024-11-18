import React, { useState } from 'react';
import filterIcon from '../../Assets/Images/Tuning.svg';
import downIcon from '../../Assets/Images/Down.svg';

import './Navbar.css';

export default function Navbar(props) {
  // State to toggle the visibility of the dropdown menu
  const [toggleFilter, settoggleFilter] = useState(false);

  // Handle the toggle for the grouping dropdown and update the selected grouping value
  function handleDisplayToggle(e) {
    // Toggle the dropdown visibility
    settoggleFilter(!toggleFilter);
    
    // If a valid option is selected, update the grouping value in the parent component
    if (e.target.value !== undefined) {
      props.handleGroupValue(e.target.value);
    }
  }

  // Handle the toggle for the ordering dropdown and update the selected ordering value
  function handleOrderingValue(e) {
    // Toggle the dropdown visibility
    settoggleFilter(!toggleFilter);

    // If a valid option is selected, update the ordering value in the parent component
    if (e.target.value !== undefined) {
      props.handleOrderValue(e.target.value);
    }
  }

  return (
    <>
      {/* Main section for the navbar */}
      <section className="nav">
        <div className="nav-container">
          <div>
            {/* Button to show/hide the dropdown menu */}
            <div className="nav-disp-btn" onClick={handleDisplayToggle}>
              <div className="nav-disp-icon nav-disp-filter">
                {/* Icon for filter button */}
                <img src={filterIcon} alt="icon" />
              </div>
              <div className="nav-disp-heading">
                Display
              </div>
              <div className="nav-disp-icon nav-disp-drop">
                {/* Icon for dropdown arrow */}
                <img src={downIcon} alt="icon" />
              </div>
            </div>

            {/* Dropdown menu for selecting grouping and ordering options */}
            <div className={toggleFilter ? "nav-disp-dropdown nav-disp-dropdown-show" : "nav-disp-dropdown"}>
              {/* Grouping section */}
              <div className="nav-disp-filters">
                <div className="nav-dropdown-category">
                  Grouping
                </div>
                <div className="nav-dropdown-selector">
                  {/* Dropdown to select the grouping category (e.g., Status, User, Priority) */}
                  <select 
                    value={props.groupValue} 
                    onChange={handleDisplayToggle} 
                    className='nav-selector' 
                    name="grouping"
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>

              {/* Ordering section */}
              <div className="nav-disp-filters">
                <div className="nav-dropdown-category">
                  Ordering
                </div>
                <div className="nav-dropdown-selector">
                  {/* Dropdown to select the ordering method (e.g., Priority, Title) */}
                  <select 
                    value={props.orderValue} 
                    onChange={handleOrderingValue} 
                    className='nav-selector' 
                    name="ordering"
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
