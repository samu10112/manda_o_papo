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
document.getElementById("userName").innerHTML="bem-vindo(a) "+nome_usuario+"!";

function addRoom(){
var nome_sala=document.getElementById("roomName").value;
firebase.database().ref("/").child(nome_sala).update({
  purpose:"adicionando a sala"
})
localStorage.setItem("nome_sala", nome_sala);
window.location="papo.html";
}

function getData(){
firebase.database().ref("/").on('value',function (snapshot){
  document.getElementById("output").innerHTML="";
  snapshot.forEach(function(childSnapshot){
    var childkey=childSnapshot.key;
    var roomName=childkey;
    var caixa="<div class='room_name' id='"+roomName+"' onclick='redirecionar(this.id)'>#"+roomName+"</div><hr>";
    document.getElementById("output").innerHTML+=caixa;
  }
);}
);}
getData();

function redirecionar(room_name){
localStorage.setItem("nome_sala", room_name);
window.location="papo.html";
}
function logout(){
localStorage.removeItem("nome_sala");
localStorage.removeItem("nome_usuario");
window.location="index.html";
}