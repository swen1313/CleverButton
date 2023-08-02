const btnNode = document.querySelector('.btn');
const contentNode = document.querySelector('#content');

function useRequest(page, limit) {
    return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .catch(() => {
            console.log('error');
            contentNode.innerHTML = '<p>Ошибка</p>';
        })
}

function displayContent(apiData){
    let images = '';

    apiData.forEach(item => {
        const imageBlock = `
        <div class="image">
        <img class="pic_image" src="${item.download_url}" alt="image">
        <p>${item.author}</p>
        </div>`;
        images = images + imageBlock;
    });

    contentNode.innerHTML = images;
}


function displayNoContent(page, limit){
    if ((page < sizeMin || page > sizeMax) && (limit < sizeMin || limit > sizeMax)){
        contentNode.innerHTML = `<h2>Номер страницы и лимит вне диапазона от ${sizeMin} до ${sizeMax}</h2>`;
    } else if ((page < sizeMin || page > sizeMax)){
        contentNode.innerHTML = `<h2>Номер страницы вне диапазона от ${sizeMin} до ${sizeMax}</h2>`;
    } else {
        contentNode.innerHTML = `<h2>Лимит вне диапазона от ${sizeMin} до ${sizeMax}</h2>`;
    }
}


const sizeMin = 1, sizeMax = 10;

if (localStorage.lastJson){
    const json = JSON.parse(localStorage.getItem('lastJson'));
    displayContent(json);
}

btnNode.addEventListener('click', async () => {

    const inputPage = document.querySelector('#page').value;
    const inputLimit = document.querySelector('#limit').value;
    localStorage.setItem('page', inputPage);
    localStorage.setItem('limit', inputLimit);

    if ((inputPage >= sizeMin && inputPage <= sizeMax) && (inputLimit >= sizeMin && inputLimit <= sizeMax)){
        const json = await useRequest(inputPage, inputLimit);
        localStorage.setItem('lastJson', JSON.stringify(json));
        console.log(localStorage.getItem('lastJson'))
        displayContent(json)
    } else {
        displayNoContent(inputPage, inputLimit)
    }
});

const urlRequest = "https://picsum.photos/v2/list";

const xhr = new XMLHttpRequest()
xhr.open('GET', urlRequest)
xhr.responseType = 'json';
xhr.onload = () => {
    console.log(xhr.response)
}
// отправим запрос:
xhr.send()
