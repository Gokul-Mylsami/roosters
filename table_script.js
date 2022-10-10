let datas = [
  {
    role: "Cashier",
    waiverLimit: 100.4,
    approvalLimit: 20.0,
    remarks: "No Remarks",
  },
  {
    role: "Cashier Supervisor",
    waiverLimit: 100.3,
    approvalLimit: 34.56,
    remarks: "No Remarks",
  },
];

function fetchData() {
  const tbody = document.querySelector(".table-body");
  tbody.innerHTML = "";
  datas.map((data, index) => {
    tbody.innerHTML += `<tr id="row${index}">
    <td id="name_row${index}">${data.role}</td>
    <td id="country_row${index}">${data.waiverLimit}</td>
    <td id="age_row${index}">${data.approvalLimit}</td>
    <td id="remarks_row${index}">${data.remarks}</td>

    <td>
      <button
        type="button"
        id="edit_button${index}"
        value="Edit"
        class="edit"
        onclick="edit_row(${index})"
      >
        <i class="fa-solid fa-pen tooltip-container"
          ><span class="tooltip-text">Edit</span></i
        >
      </button>
      <button
        type="button"
        id="save_button${index}"
        value="Save"
        class="save"
        onclick="save_row(${index})"
        style="display: none"
      >
        <i class="fa-regular fa-floppy-disk tooltip-container">
          <span class="tooltip-text">Save</span>
        </i>
      </button>
      <button
        type="button"
        value="Delete"
        class="delete"
        onclick="delete_row(${index})"
      >
        <i class="fa-solid fa-trash tooltip-container"
          ><sapn class="tooltip-text">Delete</sapn></i
        >
      </button>
    </td>
  </tr>`;
  });
}

fetchData();
function edit_row(no) {
  document.getElementById("edit_button" + no).style.display = "none";
  document.getElementById("save_button" + no).style.display = "inline";

  var role = document.getElementById("name_row" + no);
  var waiverLimit = document.getElementById("country_row" + no);
  var approvalLimit = document.getElementById("age_row" + no);
  var remarks = document.getElementById("remarks_row" + no);

  var role_data = role.innerHTML;
  var waiverLimitData = waiverLimit.innerHTML;
  var approvalLimitData = approvalLimit.innerHTML;
  var remarksData = remarks.innerHTML;

  role.innerHTML = `<select type='text' id='name_text${no}' ><option value='Cashier' ${
    role_data === "Cashier" ? "selected" : ""
  }>Cashier</option><option value='Cashier-Supervisor' ${
    role_data === "Cashier-Supervisor" ? "selected" : ""
  }>Cashier Supervisor</option><option value='Finance Manager' ${
    role_data === "Finance Manager" ? "seleceted" : ""
  }>Finance Manager</option></select>`;
  waiverLimit.innerHTML =
    "<input type='text' id='country_text" +
    no +
    "' value='" +
    waiverLimitData +
    "'>";
  approvalLimit.innerHTML =
    "<input type='text' id='age_text" +
    no +
    "' value='" +
    approvalLimitData +
    "'>";

  remarks.innerHTML = `<input type='text' id='remarks_text${no}' value='${remarksData}' />`;
}

function save_row(no) {
  datas[no] = { role: "", waiverLimit: "", approvalLimit: "" };
  var waiverLimitField = document.getElementById("country_text" + no);
  var approvalLimitField = document.getElementById("age_text" + no);

  var role = document.getElementById("name_text" + no).value;
  var waiverLimit = document.getElementById("country_text" + no).value;
  var approvalLimit = document.getElementById("age_text" + no).value;
  var remarks = document.getElementById("remarks_text" + no).value;

  if (!role) {
    return setError("Make Sure You have Selected a Role");
  }

  if (!isFloat(waiverLimit)) {
    waiverLimitField.classList.add("error-field");
  }

  if (!isFloat(approvalLimit)) {
    approvalLimitField.classList.add("error-field");
  }

  if (role && waiverLimit && approvalLimit) {
    if (!(isFloat(waiverLimit) && isFloat(approvalLimit))) {
      return setError("Please Provide the Correct Value");
    }

    const waiverLimitValue = parseFloat(waiverLimit);
    const approvalLimitValue = parseFloat(approvalLimit);

    if (waiverLimitValue < approvalLimitValue) {
      return setError(
        "Waiver Limit must be Greater or Equal to Approved Limit"
      );
    }

    if (isRoleAlreadyExists(role)) {
      console.log("role", role);

      return setError("Role already exists");
    }

    document.getElementById("name_row" + no).innerHTML = role;
    document.getElementById("country_row" + no).innerHTML = waiverLimit;
    document.getElementById("age_row" + no).innerHTML = approvalLimit;
    document.getElementById("remarks_row" + no).innerHTML = remarks;

    document.getElementById("edit_button" + no).style.display = "inline";
    document.getElementById("save_button" + no).style.display = "none";

    datas[no] = {
      role,
      waiverLimit: waiverLimitValue,
      approvalLimit: approvalLimitValue,
      remarks,
    };

    fetchData();
  } else {
    setError("Please fill all the fields below");
  }
}

function delete_row(no) {
  console.log(datas.splice(no, 1));
  fetchData();
}

function isFloat(n) {
  return !isNaN(n) && !isNaN(parseFloat(n));
}

function isRoleAlreadyExists(name) {
  let flag = 0;
  for (let data in datas) {
    if (datas[data].role === String(name)) {
      flag = 1;
      break;
    }
  }

  if (flag == 1) {
    return true;
  } else {
    return false;
  }
}

function add_row() {
  var waiverLimitField = document.getElementById("new_country");
  var approvalLimitField = document.getElementById("new_age");

  var role = document.getElementById("new_name").value;
  var waiverLimit = document.getElementById("new_country").value;
  var approvalLimit = document.getElementById("new_age").value;
  var remarks = document.getElementById("new_remarks").value;

  if (!role) {
    return setError("Make Sure You have Selected a Role");
  }

  if (!isFloat(waiverLimit)) {
    setError("Please fill the Correct Value , Waiver Limit Must be an Number ");
    return waiverLimitField.classList.add("error-field");
  }
  if (!isFloat(approvalLimit)) {
    setError(
      "Please fill the Correct Value , Approval Limit Must be an Number "
    );
    return approvalLimitField.classList.add("error-field");
  }
  if (role && waiverLimit && approvalLimit) {
    if (!(isFloat(waiverLimit) && isFloat(approvalLimit))) {
      return setError("Please Provide the Correct Value");
    }

    const waiverLimitValue = parseFloat(waiverLimit);
    const approvalLimitValue = parseFloat(approvalLimit);

    if (waiverLimitValue < approvalLimitValue) {
      return setError(
        "Waiver Limit must be Greater or Equal to Approved Limit"
      );
    }

    if (isRoleAlreadyExists(role)) {
      return setError("Role already exists");
    }

    var table = document.getElementById("data_table");
    var table_len = table.rows.length - 1;
    // var row = (table.insertRow(table_len).outerHTML =
    //   "<tr id='row" +
    //   table_len +
    //   "'><td id='name_row" +
    //   table_len +
    //   "'>" +
    //   role +
    //   "</td><td id='country_row" +
    //   table_len +
    //   "'>" +
    //   waiverLimit +
    //   "</td><td id='age_row" +
    //   table_len +
    //   "'>" +
    //   approvalLimit +
    //   "</td>" +
    //   "<td id='remarks_row" +
    //   table_len +
    //   "'" +
    //   ">" +
    //   remarks +
    //   "</td>" +
    //   "<td><button type='button' id='edit_button" +
    //   table_len +
    //   "' value='Edit' class='edit' onclick='edit_row(" +
    //   table_len +
    //   ")'> <i class='fa-solid fa-pen tooltip-container'><span class='tooltip-text'>Edit</span></i></button> <button type='button' id='save_button" +
    //   table_len +
    //   "' value='Save' class='save' style='display:none' onclick='save_row(" +
    //   table_len +
    //   ")'>  <i class='fa-regular fa-floppy-disk tooltip-container'><span class='tooltip-text'>Save</span></i></button> <button type='button' value='Delete' class='delete' onclick='delete_row(" +
    //   table_len +
    //   ")'>  <i class='fa-solid fa-trash tooltip-container'><span class='tooltip-text'>Delete</span></i></button></td></tr>");

    document.getElementById("new_name").value = "";
    document.getElementById("new_country").value = "";
    document.getElementById("new_age").value = "";
    document.getElementById("new_remarks").value = "";

    datas[table_len] = {
      role,
      waiverLimit,
      approvalLimit,
      remarks,
    };

    fetchData();
  } else {
    waiverLimitField.classList.add("error-field");
    approvalLimitField.classList.add("error-field");
    setError("Please fill all the fields below");
  }
}

function setError(errorMessage) {
  let errorContainer = document.querySelector(".error-container");
  var waiverLimitField = document.getElementById("new_country");
  var approvalLimitField = document.getElementById("new_age");

  errorContainer.style.display = "flex";
  let errorText = document.querySelector(".error-text");
  errorText.innerText = errorMessage;

  setTimeout(function () {
    errorContainer.style.display = "none";
    waiverLimitField.classList.remove("error-field");
    approvalLimitField.classList.remove("error-field");
  }, 10000); //
}

function take_print() {
  var specialElementHandlers = {
    ".no-export": function (element, renderer) {
      return true;
    },
  };

  function exportPDF() {
    var doc = new jsPDF("p", "pt", "a4");

    var source = document.querySelector(".table").innerHTML;

    var margins = {
      top: 10,
      bottom: 10,
      left: 10,
      width: 595,
    };

    doc.fromHTML(
      source,
      margins.left,
      margins.top,
      {
        width: margins.width,
        elementHandlers: specialElementHandlers,
      },

      function (dispose) {
        doc.save("Test.pdf");
      },
      margins
    );
  }
  exportPDF();
}
