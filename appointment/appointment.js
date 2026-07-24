let patientName=document.getElementById("pname");
let email=document.getElementById("email");
let phone=document.getElementById("phone");
let service=document.getElementById("service");
let date=document.getElementById("date");
let time=document.getElementById("time");
let doctor=document.getElementById("Doctor");
let notes=document.getElementById("notes");
let bookBtn=document.getElementById("bookBtn");
let updateBtn=document.getElementById("updateBtn");
currentIndex=0;
var patientArr=[];
if(localStorage.getItem("patient")!=null){
    patientArr= JSON.parse(localStorage.getItem("patient"));
    displayAppointment(patientArr);
}

function bookAppointment(){
    if(validateName()==true && validateAppointment() == true){
    var patient={
        name:patientName.value,
        email:email.value ,
        phone:phone.value,
        service:service.value,
        date:date.value,
        time:time.value ,
        doctor:doctor.value ,
        notes:notes.value ,

    };
    patientArr.push(patient);
    console.log(patientArr);
    localStorage.setItem("patient",JSON.stringify(patientArr));
    displayAppointment(patientArr);
    clear();
    
}
 else if (validateName() == false) {
        alert("The first and second name must start with a capital letter.");
    }
    else {
        alert("This appointment time is already booked.");
    }
}
function displayAppointment(arr){
    var cartoona="";
    for(var i=0;i<arr.length;i++){
        cartoona+=  ` <tr>
                 <td> ${arr[i].name}</td>
                 <td>  ${arr[i].email}</td>
                 <td>  ${arr[i].phone}</td>
                 <td>  ${arr[i].service}</td>
                 <td> ${arr[i].date}</td>
                 <td>  ${arr[i].time}</td>
                 <td> ${arr[i].doctor}</td>
                 <td>  ${arr[i].notes}</td>
                 <td> <button class="btn btn-outline-success" onclick="deleteRow(${i})"> Delete</button></td>
                 <td> <button class="btn btn-outline-primary" onclick="updateForm(${i})"> update</button></td>



            </tr> `

    
    }
    document.getElementById("tableBody").innerHTML=cartoona;

}

function clear(){
patientName.value="";
email.value="";
phone.value="";
service.value="";
date.value="";
time.value="";
doctor.value="";
notes.value="";
}
function deleteRow(index){
    patientArr.splice(index,1);
    displayAppointment(patientArr);
}

function updateForm (index){
    bookBtn.classList.replace("d-block","d-none");
    updateBtn.classList.replace("d-none","d-block");
    patientName.value=patientArr[index].name;
    email.value=patientArr[index].email;
    phone.value=patientArr[index].phone;
    service.value=patientArr[index].service;
    date.value=patientArr[index].date;
    time.value=patientArr[index].time;
    doctor.value=patientArr[index].doctor;
    notes.value=patientArr[index].notes;
    currentIndex=index;

}
function patientUpdate(){
    var patient={
        name:patientName.value,
        email:email.value,
        phone:phone.value,
        service:service.value,
        date:date.value,
        time:time.value,
        doctor:doctor.value,
        notes:notes.value,
    };
    patientArr[currentIndex]=patient;
    localStorage.setItem("patient",JSON.stringify(patientArr));
    displayAppointment(patientArr);
    clear();
    bookBtn.classList.replace("d-none","d-block");
    updateBtn.classList.replace("d-block","d-none");
}
function validateName(){
let regex=/^[A-Z][a-z]{3,8}\s[A-Z][a-z]{3,8}$/;
if(regex.test(patientName.value)==true){
    return true;
}
else{
    return false;
}
}
function validateAppointment() {
    for (var i = 0; i < patientArr.length; i++) {

        if (
            patientArr[i].doctor == doctor.value &&
            patientArr[i].date == date.value &&
            patientArr[i].time == time.value
        ) {
            return false;
        }
    }
    return true;
}