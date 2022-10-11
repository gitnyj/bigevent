$(function () {
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samepwd: function (value) {
      var pwd = $("[name=oldPwd]").val();
      if (pwd === value) {
        return "新旧密码不能相同！";
      }
    },
    rpwd: function (value) {
      var pwd = $(".layui-form [name=newPwd]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
    sure: function (value) {
      var pwd = $(".layui-form [name=newPwd]").val();
      if (pwd !== value) {
        return "原密码错误！";
      }
    },
  });
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        $(".layui-form")[0].reset();
      },
    });
  });
});
