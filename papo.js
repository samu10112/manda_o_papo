const firebaseConfig = {
    apiKey: "AIzaSyBHy778o_-OxYik3WWQhhQb-6kiWbH0F1s",
    authDomain: "manda-o-papo.firebaseapp.com",
    databaseURL: "https://manda-o-papo-default-rtdb.firebaseio.com",
    projectId: "manda-o-papo",
    storageBucket: "manda-o-papo.appspot.com",
    messagingSenderId: "159788505086",
    appId: "1:159788505086:web:1f7411beeecf46164592af"
  };

firebase.initializeApp(firebaseConfig);

var nome_usuario=localStorage.getItem("nome_usuario");
var nome_da_sala=localStorage.getItem("nome_sala");
function enviar(){
    var mensagem=document.getElementById("mensagem").value; 
    firebase.database().ref(nome_da_sala).push({
        name:nome_usuario,
        message:mensagem,
        like:0
    });
    document.getElementById("mensagem").value="";
}

function getData(){
  firebase.database().ref("/").on('value',function (snapshot){
    document.getElementById("output").innerHTML="";
    snapshot.forEach(function(childSnapshot){
      var childkey=childSnapshot.key;
      var roomName=childkey;
        document.getElementById("output").innerHTML+=caixa;
    }
  );}
);}
getData();
function logout(){
  localStorage.removeItem("nome_sala");
  localStorage.removeItem("nome_usuario");
  window.location="index.html";
}