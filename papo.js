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
      var childdata=childSnapshot.val;
      if(childkey!="purpose"){
        var fire_id=childkey;
        var message_data=childdata;
        var name_base=message_data["name"];
        var message_base=message_data["message"];
        var like_base=message_data["like"];

        var tag_name="<h4>"+name_base+"<img class='user_tick'src='manda_o _papo.jpeg'></h4>";
        var tag_mensagem="<h4 class='message_h4'>"+message_base+"</h4>";
        var tag_botao="<button class='btn btn-info' id='"+fire_id+"' value='"+like_base+"' onclick='atualizalike(this.id)'>";
        var tag_span="<span class='glyphicon glyphicon-thumbs-up'>like:"+like_base+"</span></button><hr>";
        var caixa=tag_name+tag_mensagem+tag_botao+tag_span;
        document.getElementById("output").innerHTML+=caixa;
      }
    }
  );}
);}
getData();

function atualizalike(id_da_mensagem){
  console.log("o botão de like foi apertado- "+id_da_mensagem);
  var id_do_botao=id_da_mensagem;
  var likes=document.getElementById(id_do_botao).value;
  var atualiza_like=Number(likes)+1;
  firebase.database().ref(nome_da_sala).childdata(id_da_mensagem).update({
    like:atualiza_like
  });
}

function logout(){
  localStorage.removeItem("nome_sala");
  localStorage.removeItem("nome_usuario");
  window.location="index.html";
}
