//form
const elForm = document.querySelector(".form");
const elFormInput = document.querySelectorAll(".form__input");
const elFormText = document.querySelectorAll(".form__text");
const elFormButton = document.querySelector(".form__button");
//show
const elShow = document.querySelector(".show");
const elShowDate = document.querySelectorAll(".show__date");
const elShowBottom = document.querySelectorAll(".show__items-bottom");
const elShowItemsText = document.querySelector(".show__items-text");
const elShowCardsStatus = document.querySelector(".show__cards-status");
const elCardsRight = document.querySelector(".show__cards-right");

let date = (new Date()).toString();
let userStatus = {
  dateUser: date.slice(4,15),
  text: null,
  time: null,
  status: "In progress...",
};

if(Number(date.slice(15,18))+1 < 24) {
  userStatus.time = `${Number(date.slice(15,18))+1}${date.slice(18,21)}`
}else if (date.slice(15,18) == 23) {
  userStatus.time = `00${date.slice(18,21)}`;
}

elShowDate[0].textContent = `${userStatus.dateUser}`


let userInfo = [];
let userObject = [];
let months = [userStatus.dateUser];


let month = 0
let complete = false;
let empty = false;
let items = -1;
let indexBottom = 0;

elFormText[1].textContent = `Add deadline (default ${date.slice(4, 15)})`;
elFormText[2].textContent = `Time (default ${date.slice(15,21)} + 1 hour)`;


elForm.addEventListener("submit", (e)=> {
  e.preventDefault();
  let hasDate = false;

  
  if (!elFormInput[0].value) {
    elFormInput[0].style.cssText = `
    border: 1px solid red;
    `; 
    empty = true;
  }else {
    elFormInput[0].style.cssText = `
    border: 1px solid rgb(35, 35, 35);
    `; 
    empty = false;
  } 
  if (!empty) {
    items++;
    userInfo.push(userStatus)
    let {dateUser, text, time, status} = userStatus;
    dateUser =  elFormInput[1].value ? elFormInput[1].value : dateUser;
    time = elFormInput[2].value ? elFormInput[2].value : time;
    text = elFormInput[0].value.trim() ? elFormInput[0].value.trim() : "none"; 
    let dateName = dateUser;
    
    
    if (date.slice(8,10) < dateUser.slice(8)) {    
      status = "In progress...";
      complete = false;
    }else {
      status = "Completed";
      complete = true;
    }
    
    months.forEach((item, index)=>{
      if (item == dateUser) {;
        hasDate = true;
        indexBottom = index; 
        dateName = item;
      }
    });
    if (!months.includes(dateUser)) {
      months.push(dateUser);
    }
    

    if (!hasDate) {
    let elShowItems = document.querySelector(".show__items");
    elShowItems.innerHTML += `
      <div class="show__items-top">
        <span class="show__date">${dateUser}</span>
      </div>
        <div class="show__items-bottom">
                <div class="show__items-cards">
              <p class="show__items-text">${text}</p>
              <div class="show__cards-right">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.42 20.579a1 1 0 0 1-.737-.326a.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31L15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12l-.001.001Z"
                  />
                </svg>
                <span class="show__cards-time">${time}</span>
                <span class="show__cards-status">${status}</span>
              </div>
            </div>
        </div>
    `;
     }
     else {      
      const elShowBottom = document.querySelectorAll(".show__items-bottom");

      elShowBottom[months.indexOf(dateName)].innerHTML += `
        <div class="show__items-cards">
              <p class="show__items-text">${text}</p>
              <div class="show__cards-right">
                <svg
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4.42 20.579a1 1 0 0 1-.737-.326a.988.988 0 0 1-.263-.764l.245-2.694L14.983 5.481l3.537 3.536L7.205 20.33l-2.694.245a.95.95 0 0 1-.091.004ZM19.226 8.31L15.69 4.774l2.121-2.121a1 1 0 0 1 1.415 0l2.121 2.121a1 1 0 0 1 0 1.415l-2.12 2.12l-.001.001Z"
                  />
                </svg>
                <span class="show__cards-time">${time}</span>
                <span class="show__cards-status">${status}</span>
              </div>
            </div>
      `;
    }
    let elShowCardsStatus = document.querySelectorAll(".show__cards-status");
    
    if (status == "In progress...") {
      elShowCardsStatus[items].style.cssText = `
        background-color: red;
      `;
    }else {
      elShowCardsStatus[items].style.cssText = `
        background-color: rgb(4, 86, 37);
      `;
    }

  }
  
  
});

elFormInput[0].addEventListener("input", (e)=> {
  const inputValue = e.target.value;
  if(!inputValue) {
    elFormInput[0].style.cssText = `
      border: 1px solid red;
    `;
    empty = true;
  }else {
    elFormInput[0].style.cssText = `
      border: 1px solid rgb(35, 35, 35);
    `;
    empty = false; 
  }
});