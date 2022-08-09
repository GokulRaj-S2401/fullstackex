document.getElementById('registerForm').addEventListener('submit',(e)=>{
    let user = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let clgName = document.getElementById('clgName').value;
    let mbleNo = document.getElementById('mobileNo').value;
    let gender = document.getElementsByName('gender');
    let genderValue = false
    let error = [];

    if( user.length <= 2 || !user.match((/^[a-z]+$/)) ){
        error.push("invalid student name");
    }

    if(email.length < 5 || email.indexOf('@') == -1 || email.indexOf('.') == -1 ){
        error.push("Invalid Email Address");
    }

    if(clgName.length < 5){
        error.push("Invalid college name");
    }

    if(mbleNo.length != 10 || !mbleNo.match((/^[0-9]+$/)) ){
        error.push("Invalid Phone Number");
    }


    for(let i=0;i<gender.length;i++){
        if(gender[i].checked){
           genderValue = true
        }
    }
    
    if(genderValue == false){
        error.push("Plase select gender option")
    }

    if(error.length != 0){
        e.preventDefault()
        alert(error.map((data)=>`\n ${data}`))
    }

});