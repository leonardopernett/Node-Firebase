const {Router}= require('express');
const router = Router();
const admin = require('firebase-admin')


//conexion firebase 
var serviceAccount = require("/home/leonardo/Escritorio/NodeJS/node-firebase/node-firebase-48b01-firebase-adminsdk-rhtfw-d9c8edc7ac.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://node-firebase-48b01.firebaseio.com"
      });

 const db= admin.database();


router.get('/', (req,res)=>{
    db.ref('contacts').once('value', (snapshot)=>{
        const data = snapshot.val();
        res.render('index',{contact:data})
    })
})

router.post('/new-contact', (req,res)=>{
    const newConctact = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    }

    db.ref('contacts').push(newConctact);
    res.redirect("/")
})


router.get('/delete/:id', (req,res)=>{
    const {id}= req.params
    
    db.ref('contacts').child(id).remove();
    //db.ref('contacts/'+id).remove(); otro metodo para eliminar en firebase
    res.redirect('/')
})

module.exports = router