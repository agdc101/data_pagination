/*--- VARIABLES ---*/
const linkList = document.querySelector('.link-list');
const header = document.querySelector('header');
const messageDiv = document.querySelector('.result_message');

// ------------------------- 
/*---  Display Page Function ---*/
const showPage = (list, page) => {
   const startIndex = (page * 9) - 9; // number is set to 9 as we want 9 students per page
   const endIndex = page * 9;
   let studentUl = document.querySelector('.student-list');
   studentUl.innerHTML = '';
   let html = '';
   list.forEach((student, index) => {
      if (index >= startIndex && index < endIndex) {
         html += `<li class = 'student-item cf'>
                     <div class = 'student-details'>
                        <img class = 'avatar' src = '${student.picture.medium}' alt = 'profile picture'>
                        <h3>${student.name.first} ${student.name.last}</h3>
                        <span class = 'email'>${student.email}</span>
                     </div>
                     <div class = 'joined-details'>
                        <span class = 'date'>Joined ${student.registered.date}</span>
                     </div>
                  </li>`;
      }
   });
   studentUl.insertAdjacentHTML('beforeend', html)
}
// ---------------------------------
/*--- Display page buttons function ---*/
const addPagination = (list) => {
   const numberBtnsNeeded = Math.ceil(list.length / 9);
   linkList.innerHTML = '';
   let btnHTML = '';
   for (let j = 1; j <= numberBtnsNeeded; j += 1) {
      btnHTML += `<li>
                   <button type = 'button'>${j}</button>
                 </li>`;
   }
   linkList.insertAdjacentHTML('beforeend', btnHTML);
   const firstBtn = document.querySelectorAll('button')[1];
   if (numberBtnsNeeded > 0) {
      firstBtn.classList.add('active');
   }
};
// --------------------------------- 
/*--- Page button click hander ---*/
linkList.addEventListener('click', (e) => {
   if (e.target.tagName === 'BUTTON') {
      const page = e.target.textContent;
      const btns = document.querySelectorAll('button');
      btns.forEach(button => {
         if (button.className === 'active') { // for-each loop removing the active class from the buttons
         button.classList.remove('active');
         }
      });
   if (!e.target.className) { // then adding active class to the button clicked (if it already does not have that class!)
      e.target.classList.add('active');
   } 
   if (!searchArray) { // check if the search bar has been used when buttons are being clicked.
      showPage(data, page);
   } else {
      showPage(searchArray, page);
   }
   }
 });

// Build search bar
const searchBarHTML = `<label for="search" class="student-search">
                        <input id="search" placeholder="Search by name...">
                        <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                       </label>`
header.insertAdjacentHTML('beforeend', searchBarHTML);

// ----------------------------------

// Search bar functionality
let searchArray;
const searchBar = document.querySelector('input');
searchBar.addEventListener('keyup', (e) => {
   let search = e.target.value.toLowerCase();
   searchArray = data.filter(student => { // creating a new array with the students that match the user search.
      let studentName = `${student.name.first} ${student.name.last}`;
      if (studentName.toLowerCase().includes(search)) {
         return true;
      } else {
         return false;
      }
   })
   if (searchArray.length === 0) { // test condition which displays the no result message if there are no results.
      messageDiv.classList.remove('hide');
   } else {
      messageDiv.classList.add('hide');
   }
   showPage(searchArray, 1);
   addPagination(searchArray);
});
// --------------------------------
// Call functions
showPage(data, 1);
addPagination(data);