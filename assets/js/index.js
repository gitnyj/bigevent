$(function () {
  getUserInfo();
  $("#btnLogout").on("click", function () {
    layer.confirm(
      "此操作将退出登录，是否继续?",
      { icon: 3, title: "提示" },
      function (index) {
        localStorage.removeItem("token");
        location.href = "/login.html";
        layer.close(index);
      }
    );
  });
});

function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg();
      }
      renderAvatar(res.data);
    },
  });
}

function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎：&nbsp;" + name);
  if (user.user_pic !== null) {
    $(".text-avatar").hide();
    $(".layui-nav-img").attr("src", user.user_pic).show();
  } else {
    var first = name[0].toUpperCase();
    $(".layui-nav-img").hide();
    $(".text-avatar").html(first).show();
  }
}
