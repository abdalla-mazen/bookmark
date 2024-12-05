var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var siteList = [];

if (localStorage.getItem("list") !== null) {
  siteList = JSON.parse(localStorage.getItem("list"));
  display();
}

function addSite() {
  var repatedName= false;
  if (validationName() && validationUrl()) {
    for (let i = 0; i < siteList.length; i++) {
      if (siteNameInput.value === siteList[i].name) {
        Swal.fire({
          title: "Warning",
          text: "Can't Add The Same Name Bookmark You Used It Before ",
          icon: "warning",
        });
        repatedName=true
      } 
    }
      if(repatedName==false) {
        var site = {
          name: siteNameInput.value,
          url: siteUrlInput.value,
        };

        siteList.push(site);
        display();
        localStorage.setItem("list", JSON.stringify(siteList));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Bookmark",
          showConfirmButton: false,
          timer: 1000
        });
        
        clearData();
      
      }
  } 
  else {
    Swal.fire({
      title: "Error!",
      text: "Invalid Site Name or URL. Please follow  rules",
      icon: "error",
      showCloseButton: true,
    });
  }
}

function clearData() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid")
  siteUrlInput.classList.remove("is-valid")
}

function display() {
  var conatiner = "";
  for (let i = 0; i < siteList.length; i++) {
    conatiner += `
       
        <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${siteList[i].name}</td>
                    <td><button class="btn btn-success "><a class="link-underline link-underline-opacity-0 text-white" href="${
                      siteList[i].url
                    }" target="_blank"> <i class="fa-solid fa-eye me-1"></i>Visit</a></button></td>
                    <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can me-1"></i>Delete</button></td>
                    
                  </tr>
       
       
       
       `;
  }
  document.getElementById("tbody").innerHTML = conatiner;
}

function deleteSite(index) {
  siteList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(siteList));
  display();
}

function validationName() {
  var regex = /^.{3,}$/;
  var text = siteNameInput.value;
  var term = document.getElementById("alertName");
  if (regex.test(text)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    term.classList.add("d-none");

    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");

    term.classList.remove("d-none");

    return false;
  }
}

function validationUrl() {
  var regex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
  var text = siteUrlInput.value;
  var term = document.getElementById("alertUrl");
  if (regex.test(text)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    term.classList.add("d-none");

    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    term.classList.remove("d-none");
    return false;
  }
}

//https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)
