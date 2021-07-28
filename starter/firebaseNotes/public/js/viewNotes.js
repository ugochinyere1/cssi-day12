let googleUser;
//when you load a new page u wanna check if the user is logged in, if not redirect to old page
window.onload = (event) => {
  // Use this to retain user state between html pages. is someone logged in, and who is logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
 //get access to currect users notes 
    const dbRef = firebase.database().ref(`users/${userId}`)

    //when you read data, setup eventlistener to see when contenets of the database change, rerun everytime 
    dbRef.on('value', (snapshot) => {
        //document.querySelector("#app").innerHTML = " ";
        renderData(snapshot.val());
        console.log(snapshot.val());

    });

    const createCard = (note) => {
        return ` <div class=" column is-one-quarter ">
                   <div class="card">
                     <header class="card-header">
                         <p class ="card-header-title"> ${note.title} </p>
                    </header> 
                        <div>
                            <p> ${note.text} </p>
                        </div>
                    </div>
                 </div>`;
    }

    const renderData = (data) => {
        const destination = document.querySelector("#app");
        destination.innerHTML = " ";  
              
        console.log(data);
        for (let key in data){
            const currentNote =data[key];
           //console.log(note);

           const destination = document.querySelector("#app");

           destination.innerHTML += createCard(currentNote);
        }
    };
    
    
    
    // display them on the page
};