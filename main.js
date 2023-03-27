function addUser() {
  var nome_usuario=document.getElementById("userName").value;
  localStorage.setItem("nome_usuario", nome_usuario);
  window.location="manda.html";
}