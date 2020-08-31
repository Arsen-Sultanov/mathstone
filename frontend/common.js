function query(url, config, params) {
    const localData = JSON.parse(localStorage.getItem('data'));
    const fetchParams = params ? 
    {
        ...config,
        body: JSON.stringify({
            ...localData,
            ...params
        })
    }
    : 
    { ...config }
    return fetch(url, fetchParams) 
    .then((data)=> {
        localStorage.setItem('data', data.json());

        return data.json();
    });
}




document.addEventListener('DOMContentLoaded', ()=> {
    
            

    const [buttonCreate, buttonEnter] = document.querySelectorAll('.t-btn');
    buttonCreate.addEventListener('click', (event)=> {
        event.preventDefault();
        fetch('http://46.173.215.203:3000/api/v1/room/new',{method:'GET'})
            .then(req=>req.json())
            .then(req=>{
                localStorage.setItem("data", JSON.stringify(req));
            })
            .catch(e=>console.log(e))
})
})