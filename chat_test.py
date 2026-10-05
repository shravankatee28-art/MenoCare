import requests


question = "What is perimenopause?"


response = requests.post(

    "http://127.0.0.1:5000/chat",

    json={
        "question": question
    }

)


print(response.json())