import * as httpRequest from './requests.js';
let user = null;
if (sessionStorage.getItem('user')) {
    user = JSON.parse(sessionStorage.getItem('user'));
} else if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
} else {
    window.location.href = 'login.html';
}
let auth = JSON.parse(sessionStorage.getItem('auth'));

function getId(htmlId) {
    return document.getElementById(htmlId);
}
    
window.onload = async () => {
    getId("btnPlanLogOut").addEventListener('click', handleLogout);
    let aux = await httpRequest.get(('subscription/' + user.plan), auth);
    setPlan(aux.data.type);
    getId("btnFplan").addEventListener('click', async () => {
        let body = `{
            "id": ${user.plan},
            "type": 0,
            "cupons": ${aux.data.cupons}
        }`;
        let res = await httpRequest.put('subscription/update', auth, body)
        if (res.status === "UPDATED") {
            setPlan(0);
        };
    });
    getId("btnMplan").addEventListener('click', async () => {
        let body = `{
            "id": ${user.plan},
            "type": 1,
            "cupons": ${aux.data.cupons}
        }`;
        let res = await httpRequest.put('subscription/update', JSON.parse(sessionStorage.getItem('auth')), body)
        if (res.status === "UPDATED") {
            setPlan(1);
        };
    });
    getId("btnAplan").addEventListener('click', async () => {
        let body = `{
            "id": ${user.plan},
            "type": 2,
            "cupons": ${aux.data.cupons}
        }`;
        let res = await httpRequest.put('subscription/update', auth, body)
        if (res.status === "UPDATED") {
            setPlan(2);
        };
    });
}

function handleLogout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = './index.html';
}

async function setPlan(type) {
    getId("btnFplan").classList.add('btn-outline-secondary');
    getId("btnFplan").classList.remove('disabled', 'btn-secondary');
    getId("btnMplan").classList.add('btn-outline-secondary');
    getId("btnMplan").classList.remove('disabled', 'btn-secondary');
    getId("btnAplan").classList.add('btn-outline-secondary');
    getId("btnAplan").classList.remove('disabled', 'btn-secondary');
    switch(type) {
        case 0: {
            let aux = getId("btnFplan");
            aux.innerText = 'Plano Atual'
            aux.classList.remove('btn-outline-secondary');
            aux.classList.add('disabled', 'btn-secondary');
            break;
        }
        case 1: {
            let aux = getId("btnMplan");
            aux.innerText = 'Plano Atual'
            aux.classList.remove('btn-outline-secondary');
            aux.classList.add('disabled', 'btn-secondary');
            break;
        }
        case 2: {
            let aux = getId("btnAplan");
            aux.innerText = 'Plano Atual'
            aux.classList.remove('btn-outline-secondary');
            aux.classList.add('disabled', 'btn-secondary');
            break;
        }
    }
}