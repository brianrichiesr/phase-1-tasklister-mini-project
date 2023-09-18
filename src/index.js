document.addEventListener("DOMContentLoaded", () => {
  /* Declare 'form' variable and assign it the value of the form element with the id 'create-task-form' */
  let form = document.querySelector("#create-task-form");
  /* Declare 'ul' variable and assign it the value of the ul element with the id 'tasks' */
  let ul = document.querySelector("#tasks");
  /* Declare 'priorityArr' variable and assign it the value of the different classes of priorities to be used to help the sorting of lis */
  let priorityArr = ["high", "medium", "low", "normalTask"];
  /* Declare 'lisCreated' variable so lis can be pushed into it as they are created.' */
  let lisCreated = [];

  /* Function that will delete the parentNode of the element it was called upon */
  const handleDelete = (e) => {
    e.target.parentNode.remove()
    /* Make an array of the remaining lis and assign the array to 'lisCreated' */
    lisCreated = Array.from(document.querySelectorAll("#tasks li"));
    
  }

  /* Function that will sort the lis created by user */
  const sortLis = () => {
    /* Create an array from the lis created by user and assign them to the variable 'opts' */
    let opts = Array.from(document.querySelectorAll("#tasks li"));
    /* Grab the priority value from the select element with the id 'sortby' */
    let liOrder = document.querySelector("#sortBy").value;
    /* Create an empty array and assign it to the variable 'liArr' */
    let liArr = [];
    /* If the value of 'liOrder' is descending sort lis from 'high' priority to 'normalTask' */
    if (liOrder === "descending") {
      /* Iterate through 'priorityArr' */
      priorityArr.forEach(each => {
        /* Iterate through 'opts' */
        opts.forEach(item => {
          /* Make an array out of the classList of each 'item' and check with the includes method if the array includes the value of 'each' */
          if (Array.from(item.classList).includes(each)) {
            /* If so, push 'item' into 'liArr' */
            liArr.push(item);
          }
        })
      })
    /* If the value of 'liOrder' is ascending sort lis from 'normalTask' priority to 'high' */
    } else if (liOrder === "ascending") {
      /* Create an array by using the spread operator, using the 'reverse' method to reverse the element contained within, then assigning the array to 'newArr' */
      let newArr = [...priorityArr].reverse()
      /* Iterate through 'newArr' */
      newArr.forEach(each => {
        /* Iterate through 'opts' */
        opts.forEach(item => {
          /* Make an array out of the classList of each 'item' and check with the includes method if the array includes the value of 'each' */
          if (Array.from(item.classList).includes(each)) {
            /* If so, push 'item' into 'liArr' */
            liArr.push(item);
          }
        })
      })
    /* Else sort the lis in the order they were created */
    } else {
      /* Iterate through 'lisCreated' */
      lisCreated.forEach(each => {
        /* Push 'each' into 'liArr' */
        liArr.push(each);
      })
    }
    /* Remove all of the contents of 'ul' */
    ul.innerHTML = "";
    /* Iterate through 'liArr' */
    liArr.forEach(item => {
      /* Append 'item' to 'ul' */
      ul.append(item)
    })
  }

  /* Function that takes a string argument inputted by user and completes a series of actions when form is submitted */
  const handleSubmit = (task) => {
    /* If the user does not fill out the 'Task Description' input, return an alert to inform them to do so and exit out of the function */
    if (form["new-task-description"].value.trim() === "") {
      return alert(`Please fill out the 'Task Description'.`)
    }
    /* Create an li element */
    let li = document.createElement("li");
    /* Create a button element */
    let btn = document.createElement("button");
    /* Add a click event to 'btn' that calls the 'handleDelete' function when clicked */
    btn.addEventListener("click", handleDelete);
    /* Put an 'Delete' inside of the button */
    btn.textContent = "Delete";
    /* Append 'task' and 'btn' to the 'li' element */
    li.append(task, btn);
    /* Add to the classList of 'li' the priority value selected by the user */
    li.classList.add(document.querySelector("#priority").value);
    /* Append 'li' to 'ul' */
    ul.append(li);
    /* Push 'li' to 'lisCreated' */
    lisCreated.push(li);
    /* Call 'sortLis' */
    sortLis();
  }

  /* Add a 'submit' event to 'form' that takes the event 'e' in the callback passed */
  form.addEventListener("submit", (e) => {
    /* Prevent the default behavior of the submit event */
    e.preventDefault();
    /* Call the 'handleSubmit' function with the value of the event target, the form field filled out by user, as the argument passed */
    handleSubmit(e.target["new-task-description"].value);
    /* Clear the form field */
    e.target["new-task-description"].value = "";
  })
  
  /* Add a 'change' event to the 'sortBy' selector to call the 'sortLis' function when user selects a different order to sort the lis by */
  document.querySelector("#sortBy").addEventListener("change", sortLis);
});
