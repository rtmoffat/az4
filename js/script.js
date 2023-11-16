cgptApiKey="YOURAPIKEY"

async function submit() {
    data={}
    data['comments']=document.getElementById("comments").value
    data['fname']=document.getElementById("fname").value
    data['lname']=document.getElementById("lname").value
    data['rating']=document.querySelector('input[name="rating"]:checked').value;
    //data=document.getElementById("comments").value
    document.getElementById("comments").value=""
    try {
        await fetch('./submit',
        {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then((res) => {
                console.log('fetched')
                updateAnalysis(res.json)
        })
    } catch(err) {
        console.log("fetch failed");
        updateAnalysis(err)
    }
}
function updateAnalysis(res) {
    
    document.getElementById('analysis').innerHTML=Date.now()+" result: "+res
    document.getElementById('analysis').innerHTML+='<br/>'+JSON.stringify(data)
}


//Reuires API key to be set
async function analyzeViaChatGPT() {
    /*curl https://api.openai.com/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
        {
        "role": "system",
        "content": "You are a helpful assistant."
        },
        {
        "role": "user",
        "content": "Determine if the following review is negative or positive:\nThe food was delicious and the service was fantastic!"
        }
    ],
    "temperature": 1,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
    }'*/

    try {
        cgptData={
            "model": "gpt-3.5-turbo",
            "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Determine if the following review is negative or positive:\nThe food was delicious and the service was fantastic!"
            }
            ],
            "temperature": 1,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
        }
        await fetch('https://api.openai.com/v1/chat/completions',
        {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+cgptApiKey
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(cgptData), // body data type must match "Content-Type" header
        })
            .then((res) => {
                console.log('fetched')
                updateAnalysis(res.json)
        })
    } catch(err) {
        console.log("fetch failed");
        updateAnalysis(err)
    }
}