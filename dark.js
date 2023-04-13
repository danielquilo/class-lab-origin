const changeThemeBtn = document.querySelector("#change-theme");

changeThemeBtn.addEventListener("change", function () {
document.body.classList.toggle("dark");
});

.dark,
.dark header {
  background-color: #263238;
  color: #fff;
}