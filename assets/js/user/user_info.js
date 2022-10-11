$(function () {
  var form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    },
  });
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg();
        }
        form.val("formUserInfo", res.data);
      },
    });
  }
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
  $("#form_modfiy").submit(function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        window.parent.getUserInfo();
      },
    });
  });
});
