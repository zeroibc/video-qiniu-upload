function uploadWithQiNiuSDK($this, successInput) {
    $.ajax({
        url: "/api/qiniu-uptoken", success: function (res) {
            var token = res.uptoken;
            var domain = res.domain;
            var config = {
                useCdnDomain: true,
                disableStatisticsReport: false,
                retryCount: 6,
                region: qiniu.region.z2
            };
            var putExtra = {
                fname: "",
                params: {},
                mimeType: null
            };

            uploadWithSDK($this, token, putExtra, config, domain, successInput);
        }
    });

}

function uploadWithSDK($this, token, putExtra, config, domain, successInput) {

    var file = $this.files[0];
    // eslint-disable-next-line
    var finishedAttr = [];
    var observable;
    if (file) {
        var key = file.name;
        // 添加上传dom面板
        var board = addUploadBoard(file, config, key, "");
        if (!board) {
            return;
        }
        putExtra.params["x:name"] = key.split(".")[0];
        board.start = true;
        var dom_total = $(board)
            .find("#totalBar")
            .children("#totalBarColor");

        // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作
        var error = function (err) {
            board.start = true;
            $(board).find(".control-upload").text("继续上传");
            console.log(err);
            alert("上传出错")
        };

        var complete = function (res) {
            $(board)
                .find("#totalBar")
                .addClass("hide");
            $(board)
                .find(".control-container")
                .html(
                    "<p><strong>Hash：</strong>" +
                    res.hash +
                    "</p>"
                );

            $(successInput).val(res.key);
            $('#video-preview').attr('src', '//image.v1.vodeshop.com/' + res.key);
        };

        var next = function (response) {
            var total = response.total;
            total.percent = total.percent.toFixed(2);
            $(board)
                .find(".speed")
                .text("进度：" + total.percent + "% ");
            dom_total.css(
                "width",
                total.percent + "%"
            );
        };

        var subObject = {
            next: next,
            error: error,
            complete: complete
        };
        var subscription;
        // 调用sdk上传接口获得相应的observable，控制上传和暂停
        observable = qiniu.upload(file, generateMixed(32) + '.' + key.split('.').pop(), token, putExtra, config);

        $(board)
            .find(".control-upload")
            .on("click", function () {
                if (board.start) {
                    $(this).text("暂停上传");
                    board.start = false;
                    subscription = observable.subscribe(subObject);
                } else {
                    board.start = true;
                    $(this).text("继续上传");
                    subscription.unsubscribe();
                }
            });
    }
}


//////////////////////////////

var BLOCK_SIZE = 4 * 1024 * 1024;

function addUploadBoard(file, config, key, type) {
    var count = Math.ceil(file.size / BLOCK_SIZE);
    var size = file.size / 1024 / 1024;

    var board = widget.add("tr", {
        data: {num: count, name: key, size: size.toFixed(2) + "M"},
        node: $("#fsUploadProgress" + type)
    });
    if (file.size > 100 * 1024 * 1024) {
        $(board).html("本实例最大上传文件100M");
        return "";
    }

    return board;
}

(function (global) {
    function widget() {
        this.widget = {};
    }

    widget.prototype.register = function (name, component) {
        this.widget[name] = component;
    };
    widget.prototype.add = function (name, obj) {
        if (this.widget[name]) {
            this.widget[name].node = obj.node;
            return this.widget[name].init(obj);
        }
        return false;
    };
    global.widget = new widget();
})(window);

(function () {
    var init = function (obj) {
        var data = obj.data;
        var name = data.name;
        var size = data.size;
        var parent =
            "<td>" +
            name +
            "<div class='wraper'><a class='linkWrapper'></a></div>" +
            "</td>" +
            "<td>" +
            size +
            "</td>" +
            "<td>" +
            "<div class='control-container'>" +
            '<button type="button" class="btn btn-default control-upload">开始上传</button>' +
            '</div>' +
            "<div style='overflow:hidden'><div id='totalBar' style='float:left;width:80%;height:30px;border:1px solid;border-radius:3px'>" +
            "<div id='totalBarColor' style='width:0;border:0;background-color:rgba(232,152,39,0.8);height:28px;'></div>" +
            "</div></div><p class='speed'></p></td>";
        var tr = document.createElement("tr");
        $(tr).html(parent);
        obj.node.html('');
        obj.node.append(tr);

        return tr;
    };
    widget.register("tr", {
        init: init
    });
})();

function generateMixed(an) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var res = "";
    for (var ia = 0; ia < an; ia++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}



