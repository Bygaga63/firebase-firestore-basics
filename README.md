# firebase-firestore-basics

#### add collection .add feature
```
db.collection('')
.add({...properties});
```

#### partial update by id .update feature
```
db.collection('')
.doc(id)
.update({...});
```

#### remove fields if they don't include in update object set by id .delete feature
```
db.collection('')
.doc(id)
.update({...});
```

#### delete by id .delete feature
```
db.collection('')
.doc(id)
.delete();
```

#### load All collections
```
db.collection('')
.get()
.then((snapshot) => snapshot.docs.forEach((doc => doc.data()));
```

#### load collection by param .where feature
```
db.collection(COLLECTIONS.cafes)
.where('city', '==', 'Ola')
.get()
.then((snapshot) => {
    snapshot.docs.forEach((doc => {
         renderCafe(doc);
    }));
});
```

## realtime changes .onSnapshot feature
```
db.collection('')
.onSnapshot(snapshot => {
let changes = snapshot.docChanges();
changes.forEach(change => {
     if (change.type === 'added'){
        enderCafe(change.doc)
     } else if (change.type === 'removed'){
        let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
        cafeList.removeChild(li);
     }
   })
})
```