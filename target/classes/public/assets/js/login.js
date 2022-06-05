import * as httpRequest from './requests.js';

window.onload = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
        let body = `{
            \"nickname\":\"${user.nickname}\",
            \"password\":\"${user.password}\"
        }`;
    
        let res = await httpRequest.post("user/login", "", body);
        handleLogin(res, true);
    }
};

const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

// js code to appear signup and login form
signUp.addEventListener("click", () => {
        container.classList.add("active");
});

login.addEventListener("click", () => {
    container.classList.remove("active");   
});

function getId(htmlId) {
    return document.getElementById(htmlId);
}

function getClass(htmlClass) {
    return document.getElementsByClassName(htmlClass);
}

getId("btnLogin").addEventListener('click', async () => {
    let nickname = getId("loginUn").value;
    let password = toMD5(getId("loginPw").value);
    let rememberMe = getId("logCheck").checked;

    getId("loginUn").value = '';
    getId("loginPw").value = '';

    let body = `{
        \"nickname\":\"${nickname}\",
        \"password\":\"${password}\"
    }`;

    let res = await httpRequest.post("user/login", "", body);
    handleLogin(res, rememberMe);
});

function handleLogin(res, rememberMe) {
    if (res.data) {
        if (rememberMe) {
            sessionStorage.setItem('auth', JSON.stringify(res.data.auth_key));
            delete res.data['auth_key'];
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location.href = 'pesquisa.html';
        } else {
            sessionStorage.setItem('user', JSON.stringify(res.data));
            window.location.href = 'pesquisa.html';
        }
    } else {
        formAlert("loginAlert", "Usuário ou senha incorretos", "#ff0000", 8, 3000);
    }
}

getId("btnSignUp").addEventListener('click', async () => {
    let username = getId("su_username").value;
    let steam_id = getId("steam_id").value;
    let password = getId("su_password").value;
    let confirm_password = getId("su_confirm_password").value;
    getId("su_password").value= '';
    getId("su_confirm_password").value = '';

    if (!username.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$") ||
        await httpRequest.get(('user/check_name/' + username), '', '').then(req => { return req.status })) {
        formAlert("signUpAlert", "Nome de usuário inválido ou indisponível", "#ff0000", 4, 3000);
        return;
    } else if (password.length < 8 && !password.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")) {
        formAlert("signUpAlert", "A senha deve conter no mínimo:\n - 8 caracteres\n - Uma letra\n - Um número\n", "#ff0000", 8);
        return;
    } else if (!password.match(confirm_password)) {
        formAlert("signUpAlert", "As senhas não coincidem", "#ff0000", 8, 3000);
        return;
    } else if (await httpRequest.get(('user/check_id/' + steam_id), '', '').then(req => { return req.status })) {
        formAlert("signUpAlert", "ID da Steam já cadastrado", "#ff0000", 8, -1);
    } else {
        let body = `{
            \"nickname\":\"${username}\",
            \"password\":\"${toMD5(password)}\",
            \"steam_id\":\"${steam_id}\"
        }`;
        let aux = await httpRequest.post("user/signup", "", body);
        handleSignUp(aux);
    }

});

function handleSignUp(res) {
    if (res.status === "CREATED") {
        formAlert("signUpAlert", "Cadastro efetuado com sucesso!", "#000000", 8, 4000);
        setTimeout(() => {
            if (container.classList.contains("active"))
                container.classList.remove("active");
        }, 3000);
    } else {
        formAlert("signUpAlert", "Ocorreu um erro ao cadastrar,\n tente novamente.", "#ff0000", 8, 3000);
    }
}

function formAlert(divId, msg, color, fontSize, time) {
    let div = getId(divId);
    div.style = `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 20px 0 20px;
    color: #000000;`;
    div.style.color = color;
    div.innerText = msg;
    div.style.fontSize = fontSize;
    if (time != -1 ) setTimeout(() => {
        div.innerText = '';
        div.style.margin = '0';
    }, time);
}

function toMD5(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

