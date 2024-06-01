let list = document.querySelector("#list");
let ekleyici = document.getElementById("liveToastBtn");
let alici = document.querySelector("#task");

ekleyici.addEventListener("click", anafonksiyon);

function createListItem(yeniler) {
  let listem = document.createElement('li');
  listem.innerHTML = yeniler;

  let closeBtn = document.createElement('span');
  closeBtn.textContent = 'X';
  closeBtn.className = 'close';

  closeBtn.addEventListener('click', function(event){
    event.stopPropagation();
    this.parentElement.remove();

    let hafiza = JSON.parse(localStorage.getItem('hafdisk')) || [];
    let index = hafiza.indexOf(yeniler);
    if (index !== -1) {
      hafiza.splice(index, 1);
      localStorage.setItem('hafdisk', JSON.stringify(hafiza));
    }
  });

  listem.appendChild(closeBtn);
  listem.addEventListener('click', function(){
    this.classList.toggle('checked');
  });

  list.append(listem);
}

window.onload = function() {
  let hafiza = JSON.parse(localStorage.getItem('hafdisk')) || [];
  hafiza.forEach(createListItem);
}

function newElement(){
  let yeniler= alici.value;
  createListItem(yeniler);

  let hafiza = JSON.parse(localStorage.getItem('hafdisk')) || [];
  hafiza.push(yeniler);
  localStorage.setItem('hafdisk', JSON.stringify(hafiza));
}

function bosmesaj (){
  let toastbos = document.querySelector(".error");
  let mesaj = new bootstrap.Toast(toastbos);
  mesaj.show();
}

function eklendimesaj (){
  let toastdolu = document.querySelector("#liveToast, .success");
  let dolumesaj = new bootstrap.Toast(toastdolu);
  dolumesaj.show();
}

function anafonksiyon () {
  if(alici.value===""){
    bosmesaj();
    console.log("boş değer");
  }
  else{
    console.log(alici.value);
    newElement();
    eklendimesaj();
  }
}