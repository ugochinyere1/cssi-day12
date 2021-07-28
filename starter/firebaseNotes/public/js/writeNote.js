let googleUser;
//when you load a new page u wanna check if the user is logged in, if not redirect to old page
window.onload = (event) => {
  // Use this to retain user state between html pages. is someone logged in, and who is logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");
    // 1. Capture the form data (queryselector locate value of the var)
    const titleVar = document.querySelector("#noteTitle");
    const textVar = document.querySelector("#noteText");

    // 2. Format the data and write it to our database

    note = {

        title: titleVar.value,
        text:  textVar.value
    }

    // 3. Clear the form so that we can write a new note
    titleVar.value = "";
    textVar.value = "";

    //4. write it to our datatbase

    console.log(googleUser);
    console.log(note);
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    dbRef.push(note);//brings back a promise
    //we want a variable with the form:
        //note = {
    //       title:
    //       text:
    //  }
}
