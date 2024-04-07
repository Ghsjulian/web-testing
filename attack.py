import os 
import requests
import json

os.system("clear")

def __login__(email,password):
    """docstring for __login__"""
    url = "http://localhost:8080/login/"
    payload = {
   "email" : email,
   "password" : password
}
    r = requests.post(url,json=payload)
    response = json.loads(r.content.decode())
    if response["status"] == "success":
        print("\n"+response["message"])
    else:
        print("\n"+response["message"])



__login__("ghsjulian@gmail.com","124567777")