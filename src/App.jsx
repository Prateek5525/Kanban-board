import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import './App.css';

import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';

function App() {
  // Static lists for grouping and filtering options
  const statusList = ['In progress', 'Backlog', 'Todo', 'Done', 'Cancelled'];
  const userList = ['Anoop sharma', 'Yogesh', 'Shankar Kumar', 'Ramesh', 'Suresh'];
  const priorityList = [
    { name: 'No priority', priority: 0 },
    { name: 'Low', priority: 1 },
    { name: 'Medium', priority: 2 },
    { name: 'High', priority: 3 },
    { name: 'Urgent', priority: 4 }
  ];

  // State for storing the selected grouping option (e.g., status, user, priority)
  const [groupValue, setgroupValue] = useState(getStateFromLocalStorage() || 'status');
  
  // State for storing the selected ordering option (e.g., by title or priority)
  const [orderValue, setorderValue] = useState('title');
  
  // State to hold the ticket data fetched from the API
  const [ticketDetails, setticketDetails] = useState([]);

  // Function to sort tickets based on the selected order value
  const orderDataByValue = useCallback(async (cardsArry) => {
    if (orderValue === 'priority') {
      // Sort by priority in descending order
      cardsArry.sort((a, b) => b.priority - a.priority);
    } else if (orderValue === 'title') {
      // Sort by title alphabetically
      cardsArry.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    // Update state with the sorted list
    await setticketDetails(cardsArry);
  }, [orderValue, setticketDetails]);

  // Save the current group selection to localStorage
  function saveStateToLocalStorage(state) {
    localStorage.setItem('groupValue', JSON.stringify(state));
  }

  // Retrieve the saved group selection from localStorage
  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem('groupValue');
    if (storedState) {
      return JSON.parse(storedState);
    }
    return null;
  }

  // Fetch data from the API when the component mounts or groupValue changes
  useEffect(() => {
    // Save group value to local storage whenever it changes
    saveStateToLocalStorage(groupValue);

    async function fetchData() {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      await refactorData(response);
    }
    
    fetchData();

    // Function to restructure data by combining ticket and user info
    async function refactorData(response) {
      let ticketArray = [];
      
      if (response.status === 200) {
        // Loop through tickets and match them with their respective users
        for (let i = 0; i < response.data.tickets.length; i++) {
          for (let j = 0; j < response.data.users.length; j++) {
            if (response.data.tickets[i].userId === response.data.users[j].id) {
              // Combine ticket info with user details
              let ticketJson = { ...response.data.tickets[i], userObj: response.data.users[j] };
              ticketArray.push(ticketJson);
            }
          }
        }
      }
      // Update state with processed ticket data and sort it based on the selected order
      await setticketDetails(ticketArray);
      orderDataByValue(ticketArray);
    }
    
  }, [orderDataByValue, groupValue]);

  // Handlers to update the group and order values
  function handleGroupValue(value) {
    setgroupValue(value);
    console.log(value); // Log the new group value for debugging
  }

  function handleOrderValue(value) {
    setorderValue(value);
    console.log(value); // Log the new order value for debugging
  }
  
  return (
    <>
      {/* Navbar component to handle grouping and ordering options */}
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {
            // Conditional rendering based on the selected group value
            {
              'status': (
                <>
                  {statusList.map((listItem) => {
                    return (
                      <List
                        groupValue='status'
                        orderValue={orderValue}
                        listTitle={listItem}
                        listIcon=''
                        statusList={statusList}
                        ticketDetails={ticketDetails}
                      />
                    );
                  })}
                </>
              ),
              'user': (
                <>
                  {userList.map((listItem) => {
                    return (
                      <List
                        groupValue='user'
                        orderValue={orderValue}
                        listTitle={listItem}
                        listIcon=''
                        userList={userList}
                        ticketDetails={ticketDetails}
                      />
                    );
                  })}
                </>
              ),
              'priority': (
                <>
                  {priorityList.map((listItem) => {
                    return (
                      <List
                        groupValue='priority'
                        orderValue={orderValue}
                        listTitle={listItem.priority}
                        listIcon=''
                        priorityList={priorityList}
                        ticketDetails={ticketDetails}
                      />
                    );
                  })}
                </>
              )
            }[groupValue]
          }
        </div>
      </section>
    </>
  );
}

export default App;
