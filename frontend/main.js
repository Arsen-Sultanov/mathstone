const [buttonCreate, buttonEnter] = document.querySelectorAll('.t-btn');
buttonCreate.addEventListener('click', (event)=> {
    event.preventDefault();
    fetch('http://46.173.215.203:3000/api/v1/room/new')
        .then((res)=> {
            console.log(res);
            
        })
})
