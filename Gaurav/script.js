var onRegisterButtonClick;
var onCloseButton;
var onDelete;
var onSubmit;
var onclick;
fetch("../localStorage/storage.json").then(
    response => response.json()
).then(data => {
    var id = 0;
    // var myData = JSON.parse(storage)
    const myStorage = window.localStorage
    var array;
    try {
        array = JSON.parse(myStorage.getItem("users")).user || data
    } catch {
        array = []
    }
    const form = document.getElementById("form")
    const form_div = document.getElementById("form-div")
    const popUp = document.getElementById("pop-up")
    const alert = document.getElementById("alert")
    const body = document.getElementById("body")
    const navBar = document.getElementById("navBar")
    const section = document.getElementById("section")
    onRegisterButtonClick = (e) => {
        alert.style.display = "none"
        console.log(popUp.style.display)
        if (String(popUp.style.display) == "block") {
            section.style.display = "flex"
            popUp.style.display = "none"
            navBar.style.filter = "blur(0px)"
            section.style.filter = "blur(0px)"
        } else {
            // section.style.display = "none"
            console.log(body, navBar, section)
            popUp.style.display = "block"
            navBar.style.filter = "blur(2px)"
            section.style.filter = "blur(2px)"
        }
    }
    onCloseButton = () => {
        location.replace('./index.html')
        section.style.display = "flex"
        alert.style.display = "none"
        console.log('hjhjh')
        popUp.style.display = "none"
        navBar.style.filter = "blur(0px)"
        section.style.filter = "blur(0px)"
    }

    var element = null;

    if (edit != null) {
        element = array.filter(ele => ele.id == edit)[0]
        popUp.style.display = "block"
        document.getElementById("fname").value = element.name.split(" ")[0]
        document.getElementById("lname").value = element.name.split(" ")[1]
        document.getElementById("gender").value = element.gender
        document.getElementById("age").value = Number(element.age.split(" ")[0])
        document.getElementById("address1").value = element.address1
        document.getElementById("address2").value = element.address2
        document.getElementById("id-proof").value = element.idProff
        document.getElementById("identity").value = element.identity
    }




    console.log(myStorage.getItem("users"))
    array.map((element) => {
        console.log(element)
        section.innerHTML += '<div class="card"><a href="../Dhruv/page2.html?id=' + element.id + '"><img class="face-image" src=' + element.extras.image + ' alt="male"><h4><b>' + element.name.fname + " " + element.name.lname + '</b></h4><p>' + element.extras.gender + '</p><p>' + element.extras.age + " years" + '</p></a><button onclick="onDelete(event)" id="delete" value=' + element.id + '>Delete</button></div>'
    })


    onSubmit = (e) => {
        alert.style.display = "none"
        if (element != null) {
            id = Number(element.id)
        } else {
            id = Number(myStorage.getItem("id")) + 1 || 1
        }
        console.log(myStorage.getItem("id"), 'lastIndex')
        e.preventDefault()
        const fname = document.getElementById("fname").value
        const lname = document.getElementById("lname").value
        const gender = document.getElementById("gender").value
        const age = document.getElementById("age").value
        const address1 = document.getElementById("address1").value
        const address2 = document.getElementById("address2").value
        const idProff = document.getElementById("id-proof").value
        const identity = document.getElementById("identity").value
        const city = document.getElementById("city").value
        const state = document.getElementById("state").value
        const pincode = document.getElementById("pincode").value
        const DOB = document.getElementById("DOB").value
        console.log(DOB.split("-"))
        if (fname && lname && gender && age && address1 && idProff && identity && city && state && pincode) {
            if (age > 0) {
                var message = ''
                alert.style.display = "none"
                if (idProff == "Aadhar") {
                    if (!isNaN(identity) && identity.length == 12 && identity[0] != 1 && identity[0] != 0)
                        message = ''
                    else
                        message = "enter valid aadhar card number "
                }
                console.log(idProff)
                if (idProff == "PAN") {
                    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                    if (!regex.test(identity)) {
                        message = "enter valid pan number"
                        console.log('valid')
                    } else {
                        message = ''
                        console.log(regex.test(identity))
                    }
                }

                if (idProff == 'DL') {
                    var regex = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
                    if (!regex.test(identity)) {
                        message = "enter valid DL number"
                        console.log('valid Dl')
                    } else {
                        message = ''
                        console.log(regex.test(identity))
                    }
                }
                if (message != '') {
                    alert.style.display = "block"
                    alert.innerHTML = message
                } else {
                    const another = { lname: lname, fname: fname, id: id, name: fname + " " + lname, age: age, gender: gender, address1: address1, address2: address2, idProff: idProff, identity: identity, image: gender == "Female" ? "https://img.icons8.com/external-justicon-lineal-color-justicon/344/external-girl-christmas-avatar-justicon-lineal-color-justicon-2.png" : "https://img.icons8.com/external-justicon-lineal-color-justicon/344/external-boy-christmas-avatar-justicon-lineal-color-justicon-5.png" }
                    const element = {
                        address: {
                            address1: address1,
                            address2: address2,
                            pincode: pincode,
                            state: state,
                            city: city
                        },
                        name: {
                            fname: fname,
                            lname: lname
                        },
                        id: id,
                        identity: {
                            id_type: idProff,
                            id_number: identity
                        },
                        extras: {
                            image: gender == "Female" ? "https://img.icons8.com/external-justicon-lineal-color-justicon/344/external-girl-christmas-avatar-justicon-lineal-color-justicon-2.png" : "https://img.icons8.com/external-justicon-lineal-color-justicon/344/external-boy-christmas-avatar-justicon-lineal-color-justicon-5.png",
                            gender: gender,
                            DOB: DOB,
                            age: age
                        }
                    }
                    var ind = -1
                    array.forEach((ele, index) => { if (ele.id == id) ind = index })
                    if (ind != -1)
                        array[ind] = element
                    else
                        array.push(element)
                    myStorage.setItem("users", JSON.stringify({ user: array }))
                    if (ind == -1) {

                        myStorage.setItem("id", id);
                        section.innerHTML += '<div class="card"><a href="../Dhruv/page2.html?id=' + id + '"><img class="face-image" src=' + element.extras.image + ' alt="male"><h4><b>' + element.name.fname + " " + element.name.lname + '</b></h4><p>' + element.extras.gender + '</p><p>' + element.extras.age + " years" + '</p></a><button onclick="onDelete(event)" id="delete" value=' + id + '>Delete</button></div>'

                    } else {
                        location.replace("./index.html")
                    }
                    console.log(fname, lname, gender, age, address1, address2, idProff, identity)
                    popUp.style.display = "none"
                    navBar.style.filter = "blur(0px)"
                    section.style.filter = "blur(0px)"
                    section.style.display = "flex"

                    document.getElementById("fname").value = ''
                    document.getElementById("lname").value = ''
                    document.getElementById("gender").value = ''
                    document.getElementById("age").value = ''
                    document.getElementById("address1").value = ''
                    document.getElementById("address2").value = ''
                    document.getElementById("id-proof").value = ''
                    document.getElementById("identity").value = ''
                }
            } else {
                alert.style.display = "block"
                alert.innerHTML = "Age Must be greater than or equal to 1"
            }

        } else {
            alert.style.display = "block"
            alert.innerHTML = "Please Fill All The Values"
        }

    }


    onDelete = (event) => {
        const updatedArr = array.filter(ele => { return ele.id != event.target.value })
        array = updatedArr
        console.log(array)
        localStorage.setItem("users", JSON.stringify({ user: array }))
        try {
            array = JSON.parse(myStorage.getItem("users")).user || []
        } catch {
            array = []
        }
        section.innerHTML = ""
        array.map((element) => {
            console.log(element)
            section.innerHTML += '<div class="card"><a href="../Dhruv/page2.html?id=' + element.id + '"><img class="face-image" src=' + element.extras.image + ' alt="male"><h4><b>' + element.name.fname + " " + element.name.lname + '</b></h4><p>' + element.extras.gender + '</p><p>' + element.extras.age + " years" + '</p></a><button onclick="onDelete(event)" id="delete" value=' + element.id + '>Delete</button></div>'

        })
    }

    console.log('here')
}).catch(error => {
    const section = document.getElementById("section")
    section.innerHTML = ""

})