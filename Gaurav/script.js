var data, id, initial, myStorage, params, edit, onSubmit, form, form_div, popUp, body, nav, section, navBar, onRegisterButtonClick, onCloseButton, element, fname, lname, gender, age, address1, address2, identity, idProff, city, state, DOB, pincode, onDelete;

window.onload = function() {
    fetch("../localStorage/storage.json").then(
        response => response.json()
    ).then(store => {
        data = store
        id = 0;
        myStorage = window.localStorage
        params = new URLSearchParams(location.search);
        edit = params.get("id")
        try {
            initial = myStorage.getItem("initial") || true
        } catch {
            initial = true
        }
        var array;
        try {
            array = JSON.parse(myStorage.getItem("users")).user || []
        } catch {
            array = []
        }
        if (initial == true) {
            if (data != undefined) {
                initial = false
                myStorage.setItem("initial", initial)
                array = [...array, ...data]
                myStorage.setItem("users", JSON.stringify({ user: array }))

            }
        }


        form = document.getElementById("form")
        form_div = document.getElementById("form-div")
        popUp = document.getElementById("pop-up")
        var alert1 = document.getElementById("alert")
        body = document.getElementById("body")
        navBar = document.getElementById("navBar")
        section = document.getElementById("section")
        onRegisterButtonClick = (e) => {
            alert1.style.display = "none"

            if (String(popUp.style.display) == "block") {
                section.style.display = "flex"
                popUp.style.display = "none"
                navBar.style.filter = "blur(0px)"
                section.style.filter = "blur(0px)"
            } else {

                popUp.style.display = "block"
                navBar.style.filter = "blur(2px)"
                section.style.filter = "blur(2px)"
            }
        }
        onCloseButton = () => {
            location.replace('./index.html')
            section.style.display = "flex"
            alert1.style.display = "none"

            popUp.style.display = "none"
            navBar.style.filter = "blur(0px)"
            section.style.filter = "blur(0px)"
        }

        element = null;

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





        array.map((element) => {

            section.innerHTML += '<div class="card"><a href="../Dhruv/page2.html?id=' + element.id + '"><img class="face-image" src=../public/' + element.extras.image + ' alt="male"><h4><b>' + element.name.fname + " " + element.name.lname + '</b></h4><p>' + element.extras.gender + '</p><p>' + element.extras.age + " years" + '</p></a><button onclick="onDelete(event)" id="delete" value=' + element.id + '>Delete</button></div>'
        })


        onSubmit = (e) => {
            e.preventDefault()

            alert1.style.display = "none"
            fname = document.getElementById("fname").value
            lname = document.getElementById("lname").value
            gender = document.getElementById("gender").value
            age = document.getElementById("age").value
            address1 = document.getElementById("address1").value
            address2 = document.getElementById("address2").value
            idProff = document.getElementById("id-proof").value
            identity = document.getElementById("identity").value
            city = document.getElementById("city").value
            state = document.getElementById("state").value
            pincode = document.getElementById("pincode").value
            if (fname && lname && gender && age && address1 && idProff && identity && city && state && pincode) {
                if (age > 0) {
                    var message = ''
                    alert1.style.display = "none"
                    if (idProff == "Aadhar") {
                        if (!isNaN(identity) && identity.length == 12 && identity[0] != 1 && identity[0] != 0)
                            message = ''
                        else
                            message = "enter valid aadhar card number "
                    }

                    if (idProff == "PAN") {
                        var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                        if (!regex.test(identity)) {
                            message = "enter valid pan number"

                        } else {
                            message = ''

                        }
                    }

                    if (idProff == 'DL') {
                        var regex = /^(([A-Z]{2}( )[0-9]{2})|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/
                        if (!regex.test(identity)) {
                            message = "enter valid DL number"

                        } else {
                            message = ''

                        }
                    }
                    if (message != '') {
                        alert1.style.display = "block"
                        alert1.innerHTML = message
                    } else {
                        const id = localStorage.getItem("lastId") || 1000
                        localStorage.setItem("lastId", id + 1)
                        element = {
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
                                image: gender == "Female" ? "../public/newGirl.png" : "../public/newBoy.png",
                                gender: gender,
                                age: age
                            }
                        }
                        array.push(element)
                        myStorage.setItem("users", JSON.stringify({ user: array }))
                        section.innerHTML += '<div class="card"><a href="../Dhruv/page2.html?id=' + id + '"><img class="face-image" src=' + element.extras.image + ' alt="male"><h4><b>' + element.name.fname + " " + element.name.lname + '</b></h4><p>' + element.extras.gender + '</p><p>' + element.extras.age + " years" + '</p></a><button onclick="onDelete(event)" id="delete" value=' + id + '>Delete</button></div>'
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
                    alert1.style.display = "block"
                    alert1.innerHTML = "Age Must be greater than or equal to 1"
                }

            } else {
                alert1.style.display = "block"
                alert1.innerHTML = "Please Fill All The Values"
            }

        }


        onDelete = (event) => {
            const updatedArr = array.filter(ele => { return ele.id != event.target.value })
            array = updatedArr
            localStorage.setItem("users", JSON.stringify({ user: array }))
            try {
                array = JSON.parse(myStorage.getItem("users")).user || []
            } catch {
                array = []
            }
            section.innerHTML = ""
            array.map((element) => {
                section.innerHTML += '<div class="card"><a href="../Dhruv/page2.html?id=' + element.id + '"><img class="face-image" src=' + element.extras.image + ' alt="male"><h4><b>' + element.name.fname + " " + element.name.lname + '</b></h4><p>' + element.extras.gender + '</p><p>' + element.extras.age + " years" + '</p></a><button onclick="onDelete(event)" id="delete" value=' + element.id + '>Delete</button></div>'

            })
        }

    }).catch(e => console.log(e))


};