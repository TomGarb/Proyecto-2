document.addEventListener('DOMContentLoaded', () => {
    // Al hacer clic en una saga, guardamos el estado en sessionStorage y redirigimos a hub.html
    const selectSaga = (saga) => {
        sessionStorage.setItem('selectedSaga', saga);
        window.location.href = 'hub.html';
    };

    document.getElementById('btn-saga-sw').addEventListener('click', () => selectSaga('sw'));
    document.getElementById('btn-saga-hp').addEventListener('click', () => selectSaga('hp'));
    document.getElementById('btn-saga-lotr').addEventListener('click', () => selectSaga('lotr'));
    document.getElementById('btn-saga-marvel').addEventListener('click', () => selectSaga('marvel'));
    document.getElementById('btn-saga-naruto').addEventListener('click', () => selectSaga('naruto'));
});
