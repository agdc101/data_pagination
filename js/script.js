
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentUl = document.querySelector('.student-list');
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const linkList = document.querySelector('.link-list');
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
   const firstBtn = document.querySelectorAll('button')[0];
   firstBtn.classList.add('active');
 };

 linkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
       const page = e.target.textContent;
       const btns = document.querySelectorAll('button');
       btns.forEach(button => {
          if (button.className === 'active') {
            button.classList.remove('active');
          }
       });
      if (!e.target.className) {
         e.target.classList.add('active');
      } 
      showPage(data, page);
    }
 });

// Call functions
showPage(data, 1);
addPagination(data);