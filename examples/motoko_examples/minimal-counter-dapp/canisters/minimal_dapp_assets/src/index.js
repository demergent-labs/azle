import { azle as minimal_dapp } from '../../declarations/azle';

document.addEventListener('DOMContentLoaded', async function () {
    const counter = await minimal_dapp.getCount();
    document.getElementById('counter').innerText = 'Counter: ' + counter;
});

document.getElementById('clickMeBtn').addEventListener('click', async () => {
    const counter = await minimal_dapp.count();
    document.getElementById('counter').innerText = 'Counter: ' + counter;
});
