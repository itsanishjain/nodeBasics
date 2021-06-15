console.log("MainJs.....")



function passCodeAuth(){
    const passcode = document.getElementById('passcode').value;
    if(passcode == ""){
        document.getElementById('passcode-message').innerText = "Plese Enter the passcode"
    }
    else{
        document.getElementById('passcode-message').innerText = "";

        const url = "/openaiAPICall"
        fetch(url,{
            method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                passcode:passcode
            })
        })
        .then(function (response){
            // https://www.toptal.com/nodejs/secure-rest-api-in-nodejs
            // console.log("response",response.json(),response) 
            // never print response.json() over here 
            return response.json()

        })
        .then(function(data){
            console.log('Request succeeded with JSON response', data);
            console.log('Message:',data.message)
            // const  
            document.getElementById('auth-message').innerText = data.message;
        })
    }


}