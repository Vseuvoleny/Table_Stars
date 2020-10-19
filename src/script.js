const contacts = [
  { name: "Arthur", tel: 89565439854 },
  { name: "Igor", tel: +75672340988 },
  { name: "Sasha", tel: 23445309876 },
  { name: "Polina", tel: 11111111111 },
  { name: "Gas", tel: 76890653434 }
];

class ContactsTable {
  isAlertShowed = false;
  constructor(submitBtn, contacts) {
    this.submitBtn = submitBtn;
    this.contacts = contacts;
  }

  submit = event => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const tel = document.querySelector("#tel").value;
    if (!this.validate("name", name) || !this.validate("tel", tel)) {
      if (this.isAlertShowed) {
        return;
      } else {
        this.isAlertShowed = true;
        this.showAlert();
      }
    } else {
      this.contacts.push({ name, tel });
      this.renderContacts();
      document.querySelector("#tel").value = '';
      document.querySelector("#name").value='';
    }
  };

  renderContacts = () => {
    const table = document.querySelector(".table");
    table.innerHTML = "";
    this.contacts.map(item =>
      table.insertAdjacentHTML(
        "beforeend",
        `<div class="table_column">
        <div class="name_row">
    <p class="textarea" data-name>${item.name}</p>
        <button class="edit" form="nameForm">Редактировать</button>
        <button class="del" form="nameForm">Удалить</button>
        </div>
    <div class="tel_row">
        <p class="textarea" data-tel>${item.tel}</p>
        <button class="edit">Редактировать</button>
        <button class="del">Удалить</button>
    </div>
</div>`
      )
    );
    this.addListeners(
      document.querySelectorAll(".edit"),
      document.querySelectorAll(".del")
    );
  };

  addListeners = (edit_btn, del_btn) => {
    edit_btn.forEach(item =>
      item.addEventListener("click", event => {
        const parent = event.currentTarget.parentNode;
        const editedItem = parent.querySelector(".textarea");
        if (!editedItem.hasAttribute("contenteditable")) {
          editedItem.setAttribute("contenteditable", true);
          editedItem.focus();
          item.innerText = "Применить";
        } else if (editedItem.hasAttribute("contenteditable")) {
          if (
            (editedItem.hasAttribute("data-tel") &&
              this.validate("tel", editedItem.innerText)) ||
            (editedItem.hasAttribute("data-name") &&
              this.validate("name", editedItem.innerText))
          ) {
            editedItem.removeAttribute("contenteditable");
            item.innerText = "Редактировать";
          } else {
            if (this.isAlertShowed) {
              return;
            } else {
              this.isAlertShowed = true;
              this.showAlert();
            }
          }
        }
      })
    );
    del_btn.forEach(item =>
      item.addEventListener("click", event => {
        const parent = event.currentTarget.parentNode;
        const editedItem = parent.querySelector(".textarea");
        editedItem.innerText = "";
      })
    );
  };

  validate = (type, str) => {
    const validname = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    const validtel = /^\d{1,11}$|\+\d\(\d{3}\)\d{7}$|\+\d\d{3}\d{7}$/gm;
    switch (type) {
      case "name":
        return validname.test(str);
      case "tel":
        return validtel.test(str);
      default:
        return;
    }
  };

  showAlert = () => {
    const div = document.createElement("section");
    div.className = "alert_section";
    document.querySelector(".settings").append(div);
    div.insertAdjacentHTML(
      "beforeend",
      `<p class='alert_message'>Номер телефона должен содержать 11 цифр.
    Имя должно состоять из букв</p>`
    );
    setTimeout(() => {
      this.isAlertShowed = false;
      return div.remove();
    }, 3000);
  };
}
const app = new ContactsTable(submit, contacts);
app.renderContacts();
document.addEventListener("submit", app.submit);
