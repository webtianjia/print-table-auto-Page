//打印自动分页JS
AutoPage = {
    table: null,//页面正文TableID
    totalHeight: null,//总的高度
    divBox: null,//全文divID
    init: function (table, totalHeight, divBox,callback) {
        AutoPage.table = table;
        AutoPage.totalHeight = parseFloat(totalHeight);
        AutoPage.divBox = divBox;
        //初始化分页信息
        AutoPage.initPageDouble();
        //隐藏原来的数据
        AutoPage.hidenContent();
        if(callback){
            callback()
        }
    },
    //分页
    initPageDouble: function () {
        var table = $("#" + AutoPage.table);
        var tableClass = table.prop("class")
        /*获取class*/
        var tableRows = table[0].rows; //表格全部
        var contentArrer = [];//表格内容
        var theadTr = $(table).find("thead >tr").size();//thead占有的tr
        var tfootTr = $(table).find("tfoot >tr").size();//tfoot占有的tr
        $.each(tableRows, function (index, val) {
            if (index > (theadTr - 1) && index <= tableRows.length - tfootTr) {
                contentArrer.push(val)
            }
        })
        var height_tmp = 0; //一页总高度
        var html_tmp = "";  //临时存储正文
        var tableHeader = '<table class="' + tableClass + '">';
        var tableFoot = "</table>";
        var page = 0; //页码
        var theadHeight = tableRows[0].clientHeight + tableRows[1].clientHeight; //table标题高度
        var ftHeight = tableRows[tableRows.length - 1].clientHeight;//table页脚高度
        height_tmp = theadHeight + ftHeight;//标题高度加页脚高度
        var theadHtml = "<thead><tr>" + tableRows[0].innerHTML + "</tr>" + "<tr>" + tableRows[1].innerHTML + "</tr></thead>";//标题内容
        var footHtml = '';

        for (var i = 1; i < contentArrer.length; i++) {
            var trHtmp = contentArrer[i - 1].clientHeight;//第i行高度
            var trMtmp = "<tr>" + contentArrer[(i - 1)].innerHTML + "</tr>";// 第i行内容
            height_tmp += trHtmp;//一页高度总，加上单行内容高度
            if (height_tmp < AutoPage.totalHeight) {//如果高度小于总高度
                if (height_tmp == (theadHeight + ftHeight + trHtmp)) {//新页
                    html_tmp += tableHeader + theadHtml;
                    page++;//页码
                }
                html_tmp += trMtmp;
                if (i == contentArrer.length - 1) {
                    footHtml = '<tfoot><tr><th class="text-center"  colspan="5"><div class="m-t-lg">';
                    footHtml += '<img src="../static/img/logo.png" alt="" width="60">';
                    footHtml += ' <span class="m-l-lg" >第' + (page) + '页，</span>';
                    footHtml += '<span class="printTotal-page"></span>';
                    footHtml += '</div></th></tr></tfoot>'
                    html_tmp += footHtml + tableFoot;
                }
            } else {
                footHtml = '<tfoot><tr><th class="text-center"  colspan="5"><div class="m-t-lg">';
                footHtml += '<img src="../static/img/logo.png" alt="" width="60">';
                footHtml += ' <span class="m-l-lg" >第' + (page) + '页，</span>';
                footHtml += '<span class="printTotal-page"></span>';
                footHtml += '</div></th></tr></tfoot>'
                html_tmp += footHtml + tableFoot + AutoPage.addPageBreak();//加翻页
                i--;
                height_tmp = theadHeight + ftHeight;//清0开新页面
            }
        };

        $("#" + AutoPage.divBox).html(html_tmp);
        $(".printTotal-page").html("共" + page + "页")
    },

    //隐藏原来的数据
    hidenContent: function () {
        $(AutoPage.content).hide();
    },
    ////添加分页符
    addPageBreak: function () {
        return "<p style='page-break-before:always;'></p>";
    },

};