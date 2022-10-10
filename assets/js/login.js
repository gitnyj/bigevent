$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    rpwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $(".reg-box [name=username]").val(),
      password: $(".reg-box [name=password]").val(),
    };
    $.ajax({
      method: "POST",
      url: "/api/reguser",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $("#link_login").click();
      },
    });
  });
  $("#form_login").submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
