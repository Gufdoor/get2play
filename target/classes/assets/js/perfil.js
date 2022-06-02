import * as httpRequest from './requests.js';

function getId(htmlId) {
    return document.getElementById(htmlId);
}

function getClass(htmlClass) {
    return document.getElementsByClassName(htmlClass);
}

function toMD5(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

let user = null;
if (sessionStorage.getItem('user')) {
    user = JSON.parse(sessionStorage.getItem('user'));
} else if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
} else {
    window.location.href = 'login.html';
}
let auth = JSON.parse(sessionStorage.getItem('auth'));

window.onload = async () => {
    getId("btn_logout").addEventListener('click', handleLogout);
    getId("nomeUsuario").innerText = user.nickname;
    getId("steamId").innerText = user.steam_id;
    let aux = await httpRequest.get(('subscription/' + user.plan), auth);
    setPlan(aux.data.type);
    getId("btnEditUsr").addEventListener('click', () => {
        $("#editModal").modal('show');
        getId("btnSaveEdit").addEventListener('click', async () => {
            let username = getId("username").value, password = getId("password").value,
            newUsername = getId("NewUn").value, newPw = getId("newPw").value, confNewPw = getId("confirmNewPw").value;
            getId("username").value = '', getId("password").value ='', getId("NewUn").value = '', getId("newPw").value = '', getId("confirmNewPw").value = '';
            if (username != user.nickname || toMD5(password) != user.password) {
                formAlert("modalAlert", "Nome de usuário ou senha Incorretos", 8, 3000);
                return;
            } else if (!newUsername.match("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$") ||
                await httpRequest.get(('user/check_name/' + newUsername), '').then(req => { return req.status })) {
                formAlert("modalAlert", "Nome de usuário inválido ou indisponível", "#ff0000", 4, 3000);
                return;
            } else if (newPw.length < 8 && !newPw.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")) {
                formAlert("modalAlert", "A senha deve conter no mínimo:\n - 8 caracteres\n - Uma letra\n - Um número\n", "#ff0000", 8);
                return;
            } else if (!newPw.match(confNewPw)) {
                formAlert("modalAlert", "As senhas não coincidem", "#ff0000", 8, 3000);
                return;
            } else {
                newPw = toMD5(newPw);
                let body = `{
                    "nickname": "${newUsername}",
                    "password": "${newPw}",
                    "steam_id": "${user.steam_id}"
                }`;
                let aux = await httpRequest.put("user/update", auth, body);
                handleUpdate(aux, newUsername, newPw);
            }
        });
        
    });
    getId("btnDelUsr").addEventListener('click', async () => {
        $("#delModal").modal('show');
        getId("btnExeDel").addEventListener('click', async () => {
            let username = getId("del_username").value, password = getId("del_password").value;
            getId("del_username").value = '', getId("del_password").value = '';
            if (username != user.nickname || toMD5(password) != user.password) {
                formAlert("modalDelAlert", "Nome de usuário ou senha Incorretos", 8, 3000);
                return;
            } else {
                let aux = await httpRequest.del(("user/delete/" + user.steam_id), auth);
                handleDelete(aux);
            }
        });
    });
}

function handleDelete(res) {
    if (res.status === "DELETED") {
        handleLogout();
    } else {
        formAlert("modalAlert", "Ocorreu um erro ao editar o usuário, tente novamente", "#ff0000", 8, 3000);
    }   
}

function handleUpdate(res, nickname, password) {
    if (res.status === "UPDATED") {
        user.nickname = nickname;
        user.password = password;

        if (sessionStorage.getItem('user')) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else if (localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify(user));
        }

        getId("nomeUsuario").innerText = user.nickname;
        getId("steamId").innerText = user.steam_id;
        $("#editModal").modal('hide');
    } else {
        formAlert("modalDelAlert", "Ocorreu um erro ao excluir sua conta, tente novamente", "#ff0000", 8, 3000);
    }
} 

function handleLogout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = './index.html';
}

async function setPlan(type) {
    switch(type) {
        case 0: {
            getId("tipoPlano").innerText = "Grátis";
            break;
        }
        case 1: {
            getId("tipoPlano").innerText = "Mensal";
            break;
        }
        case 2: {
            getId("tipoPlano").innerText = "Anual";
            break;
        }
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