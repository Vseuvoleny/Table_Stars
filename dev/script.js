"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contacts = [{
  name: "Arthur",
  tel: 89565439854
}, {
  name: "Igor",
  tel: +75672340988
}, {
  name: "Sasha",
  tel: 23445309876
}, {
  name: "Polina",
  tel: 11111111111
}, {
  name: "Gas",
  tel: 76890653434
}];

var ContactsTable = function ContactsTable(submitBtn, contacts) {
  var _this = this;

  _classCallCheck(this, ContactsTable);

  _defineProperty(this, "isAlertShowed", false);

  _defineProperty(this, "submit", function (event) {
    event.preventDefault();
    var name = document.querySelector("#name").value;
    var tel = document.querySelector("#tel").value;

    if (!_this.validate("name", name) || !_this.validate("tel", tel)) {
      if (_this.isAlertShowed) {
        return;
      } else {
        _this.isAlertShowed = true;

        _this.showAlert();
      }
    } else {
      _this.contacts.push({
        name: name,
        tel: tel
      });

      _this.renderContacts();

      document.querySelector("#tel").value = '';
      document.querySelector("#name").value = '';
    }
  });

  _defineProperty(this, "renderContacts", function () {
    var table = document.querySelector(".table");
    table.innerHTML = "";

    _this.contacts.map(function (item) {
      return table.insertAdjacentHTML("beforeend", "<div class=\"table_column\">\n        <div class=\"name_row\">\n    <p class=\"textarea\" data-name>".concat(item.name, "</p>\n        <button class=\"edit\" form=\"nameForm\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n        <button class=\"del\" form=\"nameForm\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n        </div>\n    <div class=\"tel_row\">\n        <p class=\"textarea\" data-tel>").concat(item.tel, "</p>\n        <button class=\"edit\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n        <button class=\"del\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n    </div>\n</div>"));
    });

    _this.addListeners(document.querySelectorAll(".edit"), document.querySelectorAll(".del"));
  });

  _defineProperty(this, "addListeners", function (edit_btn, del_btn) {
    edit_btn.forEach(function (item) {
      return item.addEventListener("click", function (event) {
        var parent = event.currentTarget.parentNode;
        var editedItem = parent.querySelector(".textarea");

        if (!editedItem.hasAttribute("contenteditable")) {
          editedItem.setAttribute("contenteditable", true);
          editedItem.focus();
          item.innerText = "Применить";
        } else if (editedItem.hasAttribute("contenteditable")) {
          if (editedItem.hasAttribute("data-tel") && _this.validate("tel", editedItem.innerText) || editedItem.hasAttribute("data-name") && _this.validate("name", editedItem.innerText)) {
            editedItem.removeAttribute("contenteditable");
            item.innerText = "Редактировать";
          } else {
            if (_this.isAlertShowed) {
              return;
            } else {
              _this.isAlertShowed = true;

              _this.showAlert();
            }
          }
        }
      });
    });
    del_btn.forEach(function (item) {
      return item.addEventListener("click", function (event) {
        var parent = event.currentTarget.parentNode;
        var editedItem = parent.querySelector(".textarea");
        editedItem.innerText = "";
      });
    });
  });

  _defineProperty(this, "validate", function (type, str) {
    var validname = /^['A-Za-z\u0410-\u044F][ '\x2DA-Za-z\u0410-\u044F]+['A-Za-z\u0410-\u044F]?$/;
    var validtel = /^\d{1,11}$|\+\d\(\d{3}\)\d{7}$|\+\d\d{3}\d{7}$/gm;

    switch (type) {
      case "name":
        return validname.test(str);

      case "tel":
        return validtel.test(str);

      default:
        return;
    }
  });

  _defineProperty(this, "showAlert", function () {
    var div = document.createElement("section");
    div.className = "alert_section";
    document.querySelector(".settings").append(div);
    div.insertAdjacentHTML("beforeend", "<p class='alert_message'>\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C 11 \u0446\u0438\u0444\u0440.\n    \u0418\u043C\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0441\u0442\u043E\u044F\u0442\u044C \u0438\u0437 \u0431\u0443\u043A\u0432</p>");
    setTimeout(function () {
      _this.isAlertShowed = false;
      return div.remove();
    }, 3000);
  });

  this.submitBtn = submitBtn;
  this.contacts = contacts;
};

var app = new ContactsTable(submit, contacts);
app.renderContacts();
document.addEventListener("submit", app.submit);