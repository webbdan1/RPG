from flask import Flask, render_template, request
import string
import secrets
import os

app = Flask(__name__)

globalUppercaseLetters = string.ascii_letters.upper()
globalLowercaseLetters = string.ascii_letters.lower()
globalDigits = string.digits
globalSpecial = string.punctuation
default = ""

getLowercase = lambda flag : (flag and globalLowercaseLetters or default)
getUppercase = lambda flag : (flag and globalUppercaseLetters or default)
getDigits = lambda flag : (flag and globalDigits or default)
getSpecial = lambda flag : (flag and globalSpecial or default)

def getPassword(enableLowercase=True, enableUppercase=True, enableDigits=True, enableSpecial=False, passwordLength=16):
    alphabet = getLowercase(enableLowercase) + getUppercase(enableUppercase) + getDigits(enableDigits) + getSpecial(enableSpecial)

    pwd = ''
    for i in range(passwordLength):
        pwd += ''.join(secrets.choice(alphabet))
    # hyphenated = ''
    # for idx, p in enumerate(pwd):
    #     if (idx%4==0) and (idx!=0):
    #         hyphenated += '-'
    #         hyphenated += p
    #     else:
    #         hyphenated += p
    return pwd

def getCheckboxString(flag):
    if flag:
        return "checked"
    return ""

@app.route('/_calculate', methods=['GET', 'POST'])
def calculate():
    result = 'Must select at least one option'
    length = request.json['length']
    enableLowercase = bool(request.json['enableLowercase'])
    enableUppercase = bool(request.json['enableUppercase'])
    enableDigits = bool(request.json['enableDigits'])
    enableSpecial = bool(request.json['enableSpecial'])

    if enableLowercase is False and enableUppercase is False and enableDigits is False and enableSpecial is False:
        return result
    else:
        result = getPassword(enableLowercase, enableUppercase, enableDigits, enableSpecial, int(length))
        return result


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
