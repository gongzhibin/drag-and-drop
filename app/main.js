window.onload = function () {
    var dragElement = document.getElementById("test-drag");
    var targetElement = document.getElementById("main");

    //拖动对象操作
    dragElement.ondragstart = function (event) {
        console.log("开始拖拽");
        event.dataTransfer.setData("deleteDiv", this.id);

    };
    dragElement.ondrag = function () {
        console.log("拖动中");
    };
    dragElement.ondragend = function () {
        console.log("拖动结束");
    };


    //目标对象操作
    targetElement.ondragenter = function () {
        console.log("拖拽对象进入");
    };
    targetElement.ondragleave = function () {
        console.log("拖拽对象离开");
    };

    targetElement.ondragover = function (event) {
        console.log("拖拽对象在目标对象上");
        event.preventDefault(); //必须阻止默认事件，否则无法触发ondrop
    };

    targetElement.ondrop = function (event) {
        console.log("拖拽对象松手释放在目标对象上");

        var deleteDivId = event.dataTransfer.getData("deleteDiv"); //得到数据--id值  
        var deleteDiv = document.getElementById(deleteDivId); //根据id值找到相关的元素  
        deleteDiv.parentNode.removeChild(deleteDiv); //从父元素中删除子节点  
    };


    var imgDragBox = document.getElementById("img-drag");
    var dragHint = document.getElementById("drag-hint");
    imgDragBox.ondragover = function (event) {
        event.preventDefault();
        dragHint.innerText = "释放文件预览并上传";
    };
    imgDragBox.ondragleave = function (event) {
        event.preventDefault();
        dragHint.innerText = "将文件拖拽至此区域上传";
    };
    // 一、使用拖拽上传预览图片
    imgDragBox.ondrop = function (event) {
        event.preventDefault();
        var file = event.dataTransfer.files[0];
        // 检测是否为图片

        // 检测上传图片大小


        // // 1. 使用FileReader读图像文件进行预览
        // var reader = new FileReader();
        // //是否读完怎个文件
        // reader.onload = function (event) {
        //     // 将event对象传入,执行DOM操作
        //     deleteHintAndChangeImg.call(this);
        // };
        // reader.readAsDataURL(file);//以数据URI的形式读取


        // 2. 使用对象URL进行图像预览，不必读取文件
        //创建对象URL
        var objURL = window.URL.createObjectURL(file);
        var img = new Image();
        // var img = document.createElement('img');
        img.src = objURL;

        //设置图片最大宽度和最大高度，防止图片撑破容器
        img.style.setProperty("max-width", "80%");
        img.style.setProperty("max-height", "80%");


    };

    // 二、 使用文件选择上传图片
    var fileSelect = document.getElementById("select-img");
    fileSelect.onchange = function (event) {
        // 获取file文件
        var file = event.target.files[0];
        // 使用FileReader读图像文件进行预览
        var reader = new FileReader();
        //是否读完怎个文件
        reader.onload = function (event) {
            // 将event对象传入,执行DOM操作
            deleteHintAndChangeImg.call(this);
        };
        reader.readAsDataURL(file); //以数据URI的形式读取
    };


    // DOM操作：
    //  - 删除提示
    //  - 添加图片/更换图片(使用fileReader)
    function deleteHintAndChangeImg() {
        // 删除提示
        if (imgDragBox.contains(dragHint)) {
            imgDragBox.removeChild(dragHint);
        }

        // 如果imgDragBox内无图片
        if (imgDragBox.children.length == 0) {
            // 添加到DOM中
            var img = new Image();
            img.src = this.result; // this.result 为base64

            //设置图片最大宽度和最大高度，防止图片撑破容器
            img.style.setProperty("max-width", "80%");
            img.style.setProperty("max-height", "80%");
            imgDragBox.appendChild(img);
        } else {
            imgDragBox.children[0].src = this.result;
        }
    }
};