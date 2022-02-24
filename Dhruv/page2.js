//taking id 
// getting id from url
const myStorage = window.localStorage;
const params = new URLSearchParams(location.search);
const id = params.get("id");
var users = JSON.parse(myStorage.getItem("users")).user;
//sample DB
// var users = [{ id: "1", fname: "Sam", lname: "", address1: "123/1", address2: "delhi", gender: "male", age: "32", idProff: "Aadhar", identity: "adh67647676" },
//     { id: "2", fname: "Alex", lname: "Adams", address1: "123/2", address2: "noida", gender: "male", age: "74", idProff: "PAN", identity: "pan74636993809" },
//     { id: "3", fname: "Wick", lname: "", address1: "123/3", address2: "lucknow", gender: "male", age: "21", idProff: "Aadhar", identity: "adh93879235" },
//     { id: "4", fname: "Tim", lname: "", address1: "123/4", address2: "jaipur", gender: "male", age: "44", idProff: "Aadhar", identity: "pan935795" },
//     { id: "5", fname: "Simon", lname: "", address1: "123/5", address2: "manali", gender: "male", age: "23", idProff: "PAN", identity: "pan9357198537" },
//     { id: "6", fname: "James", lname: "", address1: "123/6", address2: "bangalore", gender: "male", age: "15", idProff: "PAN", identity: "pan35791857" },
//     { id: "7", fname: "Chris", lname: "", address1: "123/7", address2: "mumbai", gender: "male", age: "58", idProff: "PAN", identity: "pan53710935" },
//     { id: "8", fname: "Matt", lname: "", address1: "123/8", address2: "chennai", gender: "male", age: "86", idProff: "PAN", identity: "pan0350935" },
// ];

// getting the elements
var openmodal = document.querySelector(".openmodal");
var closemodal = document.querySelector(".modal-close")
var modal_bg = document.querySelector(".modal-bg");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var address1 = document.getElementById("address1");
var address2 = document.getElementById("address2");
var gender = document.getElementById("gender");
var age = document.getElementById("age");
var idProff = document.getElementById("idProff");
var identity = document.getElementById("identity");
var edit_Value = document.getElementById("edit_Value");
var profilepic = document.getElementById("profilepic");
var index;

//modal
openmodal.addEventListener('click',function(){
    modal_bg.classList.add('bg-active');
})

closemodal.addEventListener('click',function(){
    modal_bg.classList.remove('bg-active');
})

//globar variable to store the edit state
var newEditVal = edit_Value.value;

//filling the datafeilds of the form, from the database 
for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {
        console.log(users[i])
        index = i;
        fname.value = users[i].name.fname;
        lname.value = users[i].name.lname;
        address1.value = users[i].address.address1;
        address2.value = users[i].address.address2;
        gender.value = users[i].extras.gender;
        age.value = users[i].extras.age;
        idProff.value = users[i].identity.id_type;
        identity.value = users[i].identity.id_number;
        profilepic.src = users[i].extras.image;

        console.log(users[i]);
        console.log(index);
    }
    //console.log(users[i]);
}

//updating the profile pic


//changing state of the form form edit on to off and vice versa
function enableDisable() {

    if (edit_Value.value == "Edit On") {

        fname.removeAttribute("disabled");
        lname.removeAttribute("disabled");
        address1.removeAttribute("disabled");
        address2.removeAttribute("disabled");
        gender.removeAttribute("disabled");
        age.removeAttribute("disabled");
        idProff.removeAttribute("disabled");
        identity.removeAttribute("disabled");

        edit_Value.value = "Edit Off";
    } else {
        fname.setAttribute("disabled", "disabled");
        lname.setAttribute("disabled", "disabled");
        address1.setAttribute("disabled", "disabled");
        address2.setAttribute("disabled", "disabled");
        gender.setAttribute("disabled", "disabled");
        age.setAttribute("disabled", "disabled");
        idProff.setAttribute("disabled", "disabled");
        identity.setAttribute("disabled", "disabled");


        edit_Value.value = "Edit On";
    }
}

//console.log(users[0].name);

var form = document.querySelector("#form");

//submit funtion to store the newly entered values
form.addEventListener("submit", function(e) {

    e.preventDefault();

    //Storing the newly entered values..
    var fname2 = document.querySelector('#fname').value;
    var lname2 = document.querySelector('#lname').value;
    var age2 = document.querySelector('#age').value;
    var address1 = document.querySelector('#address1').value;
    var address2 = document.querySelector('#address2').value;
    var identity2 = document.querySelector('#identity').value;
    console.log(fname2);


    if(fname2!="" && lname2 !="" && age2!="" && address1 !="" && address2!="" && identity2!="" ){

            //..in DB
    users[index].fname = fname2;
    //in Form Fields
    document.getElementById("fname").innerHTML = users[index].name.fname;
    
    
    

    
    users[index].name.lname = lname2;
    document.getElementById("lname").innerHTML = users[index].name.lname;

    
    users[index].extras.age = age2;
    document.getElementById("age").innerHTML = users[index].extras.age;

    
    users[index].address.address1 = address1;
    document.getElementById("address1").innerHTML = users[index].address.address1;

    
    users[index].address.address2 = address2;
    document.getElementById("address2").innerHTML = users[index].address.address2;

    var gender = document.querySelector('#gender');
    users[index].extras.gender = gender.value;
    

    var idProff = document.querySelector('#idProff');
    users[index].identity.id_type = idProff.value;

    
    users[index].identity.id_number = identity2;
    document.getElementById("identity").value = users[index].identity.id_number;
    console.log(gender);
    
    if (users[index].extras.gender == "Male") {
        console.log("male");
        users[index].extras.image="C:\Users\Dhruv Yadav\Desktop\trying\public\newBoy.png";
        profilepic.src = "C:\Users\Dhruv Yadav\Desktop\trying\public\newBoy.png";
    } else {
        users[index].extras.image = "C:\Users\Dhruv Yadav\Desktop\trying\public\newGirl.png";
        profilepic.src = "C:\Users\Dhruv Yadav\Desktop\trying\public\newGirl.png";
        console.log("female");
    }

    }
    else{
        alert('enter all feilds');
    }

        if (users[index].extras.age > 0) {
            localStorage.setItem("users", JSON.stringify({ user: users }))
            
        } else {
            alert(" Age Must Be Greater Than 0")
        }

     //}
    //  else{
    //      alert("inavlid input");
    //  }
    location.reload();
    console.log(users[index]);

})
