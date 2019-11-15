const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

const COLLECTIONS = {
    cafes: 'cafes',

};

function renderCafe(doc) {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const city = document.createElement('span');
    const cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);

    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
    deleteData(cross);
}

const loadData = () => {
    db.collection(COLLECTIONS.cafes).orderBy('name').get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc => {
                renderCafe(doc);
            }));
        });
};

const savingData = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection(COLLECTIONS.cafes).add({
            name: form.name.value,
            city: form.city.value,
        });
        form.name.value = '';
        form.city.value = '';
    })
};


const deleteData = (crossNode) => {
    crossNode.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.target.parentElement.getAttribute('data-id');
        db.collection(COLLECTIONS.cafes).doc(id).delete();
    })
};

const realTimeListener = () => {
  db.collection(COLLECTIONS.cafes).orderBy('city').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
          if (change.type === 'added'){
              renderCafe(change.doc)
          } else if (change.type === 'removed'){
              let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
              cafeList.removeChild(li);
          }
      })
  })
};

// loadData();
realTimeListener();
savingData();