## Introduce
修改自https://github.com/x-shadow-x/tinymce-imageupload.git
改为适应只能一次上传一张图片的接口，可批量同步请求上传图片接口
tinymce图片上传插件，暂不支持图片拖拽排序

## Source
源码地址：https://github.com/a410702849/tinymce-images-upload

## Example

Performing a `GET` request

```js
import tinymce from "tinymce";
import "tinymce-imageupload";

tinymce.init({
    selector: "#tinymceEditer",
    height: 500,
    branding: false,
    elementpath: false,
    language_url: "/static/tinymce/langs/zh_CN.js", // 具体路径视项目结构而定
    skin_url: "/static/tinymce/skins/lightgray", // 具体路径视项目结构而定
    theme_url: "/static/tinymce/themes/modern/theme.js", // 具体路径视项目结构而定
    menubar: "edit insert view format table tools",
    convert_urls: false,
    plugins: "imageupload", // 注意引入的组件时~需要去掉前面的tinymce-前缀
    toolbar: "imageupload", // 注意引入的组件时~需要去掉前面的tinymce-前缀
    autosave_interval: "20s",
    image_advtab: true,
    // imageupload_headers: {
    //     token: this.token
    // },
    imageupload_headers: () => {
        return {
            token: this.token
        };
    },
    imageupload_url: '//localhost:3000', // 接收图片的后端地址
    imageupload_converCb: (res) => { // 根据后端返回的数据，转换成符合插件要求的数据结构
        return {
            error: res.data.error,
            path: res.data.data.url
        }
    },
    table_default_styles: {
        width: "100%",
        borderCollapse: "collapse"
    }
});
```

## Response data structure
```json
{
    error: 0,
    pathList: [
        "https://xxx/xxxx/img1.jpg",
        "https://xxx/xxxx/img2.jpg"
    ]
}
```

### Screenshot
<div align=center><img src="https://github.com/x-shadow-x/tinymce-imageupload/blob/master/res.webp" width="600" height="305" ><div>
