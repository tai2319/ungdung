class Student {
  constructor(id, name, math, liture, english, GPA) {
    this.id = id;
    this.name = name;
    this.math = math;
    this.liture = liture;
    this.english = english;
    this.GPA = (+math + +liture + +english) / 3;
  }
}

class App {
  updateStudentid;
  constructor(ArraySV = []) {
    this.students = ArraySV;
  }
  addStudent(Student) {
    return this.students.push(Student);
  }

  deleteStudent(id) {
    let index = this.findIndex(id);
    if (index >= 0) {
      this.students.splice(index, 1); // xoa tu vt index 1 phan tu
    }
  }
  editStudent(id) {
    let stdeditIndex = this.findIndex(id);
    if (stdeditIndex >= 0) {
      this.updateStudentid = id;
      let stdedit = this.students[stdeditIndex];
      let nameStudent = document.querySelector("#name");
      let pointMath = document.querySelector("#math");
      let pointLiture = document.querySelector("#liture");
      let pointEnglish = document.querySelector("#english");
      nameStudent.value = stdedit.name;
      pointMath.value = stdedit.math;
      pointLiture.value = stdedit.liture;
      pointEnglish.value = stdedit.english;
    }
  }
  updateStudentid(id, Student) {}
  findIndex(id) {
    return this.students.findIndex(function (item) {
      return item.id == id;
    });
  }

  renderStudent() {
    let studentList = document.querySelector("#studentList");
    let studentHTML = "";

    for (let key in this.students) {
      let item = this.students[key];

      studentHTML += ` <tr>
            <td>${item.id}</td>
            <td>${item.name} </td>
            <td>${item.math}</td>
            <td>${item.liture}</td>
            <td>${item.english}</td>
            <td>${item.GPA} </td>
  
            <td>
              <button class="edit" data-id="${item.id}">Edit</button>
              <button id="deletebtn" data-id="${item.id}">Delete</button>
            </td>`;
    }

    studentList.innerHTML = studentHTML;

    let thisOfStd = this;

    this.inithanldeDelete(thisOfStd);
    this.inithandleEdit(thisOfStd);
    hidleupdate();
  }
  inithandleEdit(thisOfStd) {
    let editBtn = document.querySelectorAll(".edit");
    editBtn.forEach(function (studentItem) {
      console.log(studentItem);
      studentItem.addEventListener("click", function () {
        console.log("edit");
        let id = studentItem.getAttribute("data-id");

        thisOfStd.editStudent(id);
        showupdate();
      });
    });
  }
  inithanldeDelete(thisOfStd) {
    let deleteBtn = document.querySelectorAll("#deletebtn");
    deleteBtn.forEach(function (studentItem) {
      studentItem.addEventListener("click", function () {
        this;
        let id = studentItem.getAttribute("data-id");
        thisOfStd.deleteStudent(id);
        thisOfStd.renderStudent();
      });
    });
  }

  createStudent() {
    let nameStudent = document.querySelector("#name");
    let pointMath = document.querySelector("#math");
    let pointLiture = document.querySelector("#liture");
    let pointEnglish = document.querySelector("#english");

    let idCreate = +this.students[this.students.length - 1].id + 1;

    let createStudent = new Student(
      idCreate,
      nameStudent.value,
      pointMath.value,
      pointLiture.value,
      pointEnglish.value
    );

    if (nameStudent.value == "") {
      alert("Tên không được để trống");
    } else if (pointMath.value == "") {
      alert("Điểm toán không được để trống");
    
    } else if (pointLiture.value == "") {
      alert("Điểm văn không được để trống");
    } else if (pointEnglish.value == "") {
      alert("Điểm anh không được để trống");
    } else {
      this.addStudent(createStudent);
      this.renderStudent();
      this.clearCodeApp();
    }
  }

  handleUpdate() {
    console.log("update");

    if (this.updateStudentid) {
      let stdeditIndex = this.findIndex(this.updateStudentid);
      if (stdeditIndex >= 0) {
        let stdUpdate = this.students[stdeditIndex];
        let nameStudent = document.querySelector("#name");
        let pointMath = document.querySelector("#math");
        let pointLiture = document.querySelector("#liture");
        let pointEnglish = document.querySelector("#english");
        stdUpdate.name = nameStudent.value;
        stdUpdate.math = pointMath.value;
        stdUpdate.liture = pointLiture.value;
        stdUpdate.english = pointEnglish.value;

        this.students[stdeditIndex] = stdUpdate;
        this.renderStudent();

        this.clearCodeApp();
        this.UpdateStudent = "";
      }
    } else {
    }
  }
  clearCodeApp() {
    let nameStudent = document.querySelector("#name");
    let pointMath = document.querySelector("#math");
    let pointLiture = document.querySelector("#liture");
    let pointEnglish = document.querySelector("#english");
    nameStudent.value = "";
    pointMath.value = "";
    pointLiture.value = "";
    pointEnglish.value = "";
  }
}

let student1 = new Student("1", "tai", 7, 8, 9);
let std = new App();
let addbtn = document.querySelector("#addbtn");
addbtn.addEventListener("click", function () {
  std.createStudent();
});

let updatebtn = document.querySelector("#updatebtn");
updatebtn.addEventListener("click", function () {
  std.handleUpdate();
});
function hidleupdate() {
  updatebtn.style.display = "none";
}
function showupdate() {
  updatebtn.style.display = "block";
}

std.addStudent(student1);

console.log(std);
std.renderStudent();
