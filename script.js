let myLibrary = [];
let data = localStorage["myLibrary"];
if (JSON.parse(data).length != 0) {
  myLibrary = JSON.parse(data);
}
displayForm();
addBookToLibrary();
displayLibrary();
closeButton();
removeRow();
saveToLocal();
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${author}, ${pages} pages, ${read}`;
};
function closeButton() {
  const close = document.querySelector(".close-button");
  const modalClass = document.querySelector(".modal");
  const body = document.querySelector("body");
  close.addEventListener("click", () => {
    body.style.pointerEvents = "auto";
    modalClass.classList.remove("active");
    modalClass.style.pointerEvents = "none";
  });
}
function saveToLocal() {
  const saveLocalBtn = document.querySelector("#saveLocal");
  saveLocalBtn.addEventListener("click", () => {
    // localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    localStorage["myLibrary"] = JSON.stringify(myLibrary);
    alert("successfully saved");
  });
}

function addBookToLibrary() {
  const formBook = document.querySelector("#submitValue");
  const table = document.querySelector("table");
  const formReset = document.querySelector("#formBook");
  formBook.addEventListener("click", addBook);
  function addBook() {
    const checkbox = document.querySelector("#readValue");
    let checkboxValue;
    const form = Array.from(
      document.querySelectorAll("#formBook input")
    ).reduce((book, input) => ({ ...book, [input.id]: input.value }), {});
    if (checkbox.checked) {
      checkboxValue = "read";
    } else {
      checkboxValue = "Has Not Read";
    }
    const newBook = new Book(
      form["bookValue"],
      form["authorValue"],
      form["pagesValue"],
      checkboxValue
    );
    myLibrary.push(newBook);
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
    displayLibrary();
    formReset.reset();
  }
}

function displayForm() {
  const newBookBtn = document.querySelector("#newBookBtn");
  const body = document.querySelector("body");
  const modalClass = document.querySelector(".modal");
  newBookBtn.addEventListener("click", () => {
    body.style.pointerEvents = "none";
    modalClass.classList.add("active");
    modalClass.style.pointerEvents = "auto";
  });
}

function displayLibrary() {
  const table = document.querySelector("table");
  const head = myLibrary[0];
  createTH(table, head);
  createTD(table, myLibrary);
  changeReadStatus();
  removeRow();
  function createTH(table, head) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (key in head) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      if (head.hasOwnProperty(key)) {
        th.appendChild(text);
        row.append(th);
      }
    }
  }
  function createTD(table, data) {
    let i = 0;
    data.forEach((elements) => {
      let row = table.insertRow();
      row.setAttribute("data-attribute", `${i++}`);
      for (book in elements) {
        if (elements.hasOwnProperty(book)) {
          let cell = row.insertCell();
          let text = document.createTextNode(elements[book]);
          cell.appendChild(text);
        }
      }
      let cell = row.insertCell();
      const changeReadStatus = document.createElement("button");
      changeReadStatus.textContent = "mark as read";
      changeReadStatus.classList.add("changeReadBtn");
      cell.append(changeReadStatus);
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "remove";
      removeBtn.classList.add("removeBtn");
      cell.append(removeBtn);
    });
  }
}
function changeReadStatus() {
  let changeReadBtn = document.querySelectorAll(".changeReadBtn");
  changeReadBtn.forEach((element) => {
    element.addEventListener("click", (e) => {
      const table = document.querySelector("table");
      const index = element.parentNode.parentNode.dataset.attribute;
      if (myLibrary[index].read == "Has Not Read") {
        myLibrary[index].read = "Read";
      } else myLibrary[index].read = "Has Not Read";
      while (table.rows.length > 0) {
        table.deleteRow(0);
      }
      displayLibrary();
    });
  });
}
function removeRow() {
  const removeBtn = document.querySelectorAll(".removeBtn");
  removeBtn.forEach((element) => {
    element.addEventListener("click", () => {
      const table = document.querySelector("table");
      const index = element.parentNode.parentNode.dataset.attribute;
      myLibrary.splice(index, 1);
      while (table.rows.length > 0) {
        table.deleteRow(0);
      }
      displayLibrary();
    });
  });
}
