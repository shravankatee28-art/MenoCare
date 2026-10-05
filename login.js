// ==========================================
// MENOCARE LOGIN / REGISTER
// ==========================================


// Flask backend address

const API_URL = "http://127.0.0.1:5000";


// Wait until the page is completely loaded

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // CREATE ACCOUNT
    // ==========================================

    const registerButton =
        document.querySelector("#registerButton");


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                const name =
                    document.querySelector("#registerName").value.trim();

                const email =
                    document.querySelector("#registerEmail").value.trim();

                const password =
                    document.querySelector("#registerPassword").value;


                const message =
                    document.querySelector("#loginMessage");


                // Check fields

                if (
                    name === "" ||
                    email === "" ||
                    password === ""
                ) {

                    message.innerText =
                        "Please fill all the fields.";

                    return;

                }


                message.innerText =
                    "Creating account...";


                // Send registration information to Flask

                fetch(API_URL + "/register", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,

                        email: email,

                        password: password

                    })

                })


                .then(function (response) {

                    return response.json();

                })


                .then(function (data) {

                    message.innerText =
                        data.message;


                    if (data.success === true) {

                        document.querySelector(
                            "#registerName"
                        ).value = "";


                        document.querySelector(
                            "#registerEmail"
                        ).value = "";


                        document.querySelector(
                            "#registerPassword"
                        ).value = "";

                    }

                })


                .catch(function (error) {

                    console.log(error);

                    message.innerText =
                        "Could not connect to the MenoCare server.";

                });

            }

        );

    }



    // ==========================================
    // LOGIN
    // ==========================================

    const loginButton =
        document.querySelector("#loginButton");


    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function () {


                const email =
                    document.querySelector("#loginEmail").value.trim();


                const password =
                    document.querySelector("#loginPassword").value;


                const message =
                    document.querySelector("#loginMessage");


                // Check fields

                if (
                    email === "" ||
                    password === ""
                ) {

                    message.innerText =
                        "Please enter email and password.";

                    return;

                }


                message.innerText =
                    "Logging in...";


                // Send login information to Flask

                fetch(API_URL + "/login", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        email: email,

                        password: password

                    })

                })


                .then(function (response) {

                    return response.json();

                })


                .then(function (data) {

                    message.innerText =
                        data.message;


                    if (data.success === true) {


                        // Save user information

                        sessionStorage.setItem(
                            "menoCareUser",
                            data.name
                        );


                        sessionStorage.setItem(
                            "menoCareEmail",
                            data.email
                        );


                        // Go to Home page

                        setTimeout(function () {

                            window.location.href =
                                "index.html";

                        }, 1000);

                    }

                })


                .catch(function (error) {

                    console.log(error);

                    message.innerText =
                        "Could not connect to the MenoCare server.";

                });

            }

        );

    }

});