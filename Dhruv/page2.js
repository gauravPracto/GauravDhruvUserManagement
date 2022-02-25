const myStorage = window.localStorage;
const params = new URLSearchParams(location.search);
const id = params.get("id");
var users = JSON.parse(myStorage.getItem("users")).user;
var openmodal = document.querySelector(".openmodal");
var closemodal = document.querySelector(".modal-close");
var modal_bg = document.querySelector(".modal-bg");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var address1 = document.getElementById("address1");
var address2 = document.getElementById("address2");
var city = document.getElementById("city");
var state = document.getElementById("state");
var pincode = document.getElementById("pincode");
var gender = document.getElementById("gender");
var age = document.getElementById("age");
var idProff = document.getElementById("idProff");
var identity = document.getElementById("identity");
var edit_Value = document.getElementById("edit_Value");
var profilepic = document.getElementById("profilepic");

var outerfname = document.getElementById("outer-fname");
var outerlname = document.getElementById("outer-lname");
var outeraddress1 = document.getElementById("outer-address1");
var outeraddress2 = document.getElementById("outer-address2");
var outercity = document.getElementById("outer-city");
var outerstate = document.getElementById("outer-state");
var outerpincode = document.getElementById("outer-pincode");
var outergender = document.getElementById("outer-gender");
var outerage = document.getElementById("outer-age");
var outeridProff = document.getElementById("outer-idProff");
var outeridentity = document.getElementById("outer-identity");
var outeredit_Value = document.getElementById("outer-edit_Value");
var outerprofilepic = document.getElementById("outer-profilepic");

var index;
openmodal.addEventListener("click", function() {
    modal_bg.classList.add("bg-active");


    fname.removeAttribute("disabled");
    lname.removeAttribute("disabled");
    address1.removeAttribute("disabled");
    address2.removeAttribute("disabled");
    gender.removeAttribute("disabled");
    age.removeAttribute("disabled");
    idProff.removeAttribute("disabled");
    identity.removeAttribute("disabled");
    city.removeAttribute("disabled");
    state.removeAttribute("disabled");
    pincode.removeAttribute("disabled");

    edit_Value.value = "Edit Off";


});

closemodal.addEventListener("click", function() {
    modal_bg.classList.remove("bg-active");
});
var newEditVal = edit_Value.value;
for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) {

        index = i;
        fname.value = users[i].name.fname;
        lname.value = users[i].name.lname;
        address1.value = users[i].address.address1;
        address2.value = users[i].address.address2;
        city.value = users[i].address.city;
        state.value = users[i].address.state;
        pincode.value = users[i].address.pincode;
        gender.value = users[i].extras.gender;
        age.value = users[i].extras.age;
        idProff.value = users[i].identity.id_type;
        identity.value = users[i].identity.id_number;
        profilepic.src = users[i].extras.image;


        outerfname.value = users[i].name.fname;
        outerlname.value = users[i].name.lname;
        outeraddress1.value = users[i].address.address1;
        outeraddress2.value = users[i].address.address2;
        outercity.value = users[i].address.city;
        outerstate.value = users[i].address.state;
        outerpincode.value = users[i].address.pincode;
        outergender.value = users[i].extras.gender;
        outerage.value = users[i].extras.age;
        outeridProff.value = users[i].identity.id_type;
        outeridentity.value = users[i].identity.id_number;
        outerprofilepic.src = users[i].extras.image;



    }

}


var form = document.querySelector("#form");
form.addEventListener("submit", function(e) {
    e.preventDefault();

    var valid_age = 0;
    var valid_id = 0;
    var fname2 = document.querySelector("#fname").value;
    var lname2 = document.querySelector("#lname").value;
    var age2 = document.querySelector("#age").value;
    var address1 = document.querySelector("#address1").value;
    var address2 = document.querySelector("#address2").value;
    var city2 = document.querySelector("#city").value;
    var state2 = document.querySelector("#state").value;
    var pincode2 = document.querySelector("#pincode").value;
    var identity2 = document.querySelector("#identity").value;
    var idProff2 = document.querySelector("#idProff").value;


    if (
        fname2 != "" &&
        lname2 != "" &&
        age2 != "" &&
        address1 != "" &&
        address2 != "" &&
        identity2 != "" &&
        city2 != "" &&
        state2 != "" &&
        pincode2 != ""
    ) {


        users[index].name.fname = fname2;
        document.getElementById("fname").innerHTML = users[index].name.fname2;

        users[index].name.lname = lname2;
        document.getElementById("lname").innerHTML = users[index].name.lname;

        users[index].extras.age = age2;
        document.getElementById("age").innerHTML = users[index].extras.age;

        users[index].address.address1 = address1;
        document.getElementById("address1").innerHTML = users[index].address.address1;

        users[index].address.address2 = address2;
        document.getElementById("address2").innerHTML = users[index].address.address2;

        users[index].address.city = city2;
        document.getElementById("address2").innerHTML = users[index].address.city;

        users[index].address.state = state2;
        document.getElementById("address2").innerHTML = users[index].address.state;

        users[index].address.pincode = pincode2;
        document.getElementById("address2").innerHTML = users[index].address.pincode;

        var gender = document.querySelector("#gender");
        users[index].extras.gender = gender.value;

        var idProff = document.querySelector("#idProff");
        users[index].identity.id_type = idProff.value;

        users[index].identity.id_number = identity2;
        document.getElementById("identity").value = users[index].identity.id_number;


        if (users[index].extras.gender == "Male") {

            users[index].extras.image = "../public/newBoy.png";
            profilepic.src = "../public/newBoy.png";
        } else {
            users[index].extras.image = "../public/newGirl.png";
            profilepic.src = "../public/newGirl.png";

        }
    } else {
        alert("enter all feilds");
    }

    if (users[index].extras.age > 0) {

        valid_age = valid_age + 1;
    }



    if (idProff2 == "Aadhar") {
        if (!isNaN(identity2) && identity2.length == 12 && identity2[0] != 1 && identity2[0] != 0) {
            message = ''
            valid_id = valid_id + 1;
        } else {
            message = "enter valid aadhar card number "
        }
    }


    if (idProff2 == "PAN") {
        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!regex.test(identity2)) {
            message = "enter valid pan number"

        } else {
            message = ''
            valid_id = valid_id + 1;
        }
    }


    if (idProff2 == 'DL') {
        var regex = /^(([A-Z]{2}( )[0-9]{2})|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
        if (!regex.test(identity2)) {
            message = "enter valid DL number"
        } else {
            message = ''
            valid_id = valid_id + 1;
        }
    }

    if (valid_id > 0 && valid_age > 0) {
        localStorage.setItem("users", JSON.stringify({ user: users }));
    } else {
        alert("inavlid age or id number");
    }


    location.reload();

});