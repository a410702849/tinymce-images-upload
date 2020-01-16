"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * 上传图片
 * @param {dom} editor
 * @param {Object} imgList 类数组，需要上传的图片的集合
 * @param {Object} options 其他选项
 *  @param {string} imageUploadUrl 接收上传图片的服务器url
 *  @param {function} convertCb 响应数据的数据结构转换函数
 *  @param {Object} headers 请求头设置参数
 */
var uploadpic = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(editor, imgList, options) {
        var _options, imageUploadUrl, convertCb, headers, files, config, uploadArr, key, file, param, upload;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _options = (0, _extends3.default)({}, options), imageUploadUrl = _options.imageUploadUrl, convertCb = _options.convertCb, headers = _options.headers;
                        /* eslint-disable no-undef */
                        // let param = new FormData()  // 创建form对象

                        files = imgList;

                        delete files['length'];

                        config = {
                            headers: (0, _extends3.default)({
                                'Content-Type': 'multipart/form-data'
                            }, headers && typeof headers === 'function' ? headers() : headers)
                        };
                        uploadArr = [];
                        _context.t0 = _regenerator2.default.keys(files);

                    case 6:
                        if ((_context.t1 = _context.t0()).done) {
                            _context.next = 17;
                            break;
                        }

                        key = _context.t1.value;
                        file = files[key];
                        param = new FormData(); // 创建form对象

                        param.append('file', file, file.name); // 通过append向form对象添加数据
                        _context.next = 13;
                        return _axios2.default.post(imageUploadUrl, param, config).then(function (res) {
                            var response = typeof convertCb == 'function' && convertCb(res) || res;
                            if ((typeof response === "undefined" ? "undefined" : (0, _typeof3.default)(response)) != "object" || response == null || typeof response.error == 'undefined') {
                                alert('上传出错');
                            } else {
                                if (response.error) {
                                    switch (response.error) {
                                        case "filetype":
                                            alert('请选择正确图片格式的文件上传');
                                            break;
                                        default:
                                            alert('未知错误');
                                            break;
                                    }
                                } else {
                                    if (typeof response.path != 'undefined') {
                                        var tpl = '<img src="%s" />';
                                        editor.insertContent(tpl.replace('%s', path));
                                        editor.focus();
                                    } else {
                                        alert('后端数据错误');
                                    }
                                }
                            }
                        });

                    case 13:
                        upload = _context.sent;

                        uploadArr.push(upload);
                        _context.next = 6;
                        break;

                    case 17:
                        return _context.abrupt("return", _axios2.default.all(uploadArr));

                    case 18:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function uploadpic(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 创建dom元素
 * @param {*} name dom元素名
 * @param {*} options dom属性
 */
function createElem(name, options) {
    var elem = document.createElement(name);
    elem.className = options && options.className;
    return elem;
}

/**
 * 将选择的图片显示到对话框中
 * @param {*} files 添加到预览列表的图片文件集
 * @param {*} orignalLen 原有预览列表的长度，结合files下标，以便可以给预览列表图片设置正确的索引
 * @param {*} $contain 指定将预览图片添加到哪个容器
 */
function imagePreview(files, orignalLen, $contain) {
    var frame = document.createDocumentFragment();
    for (var i = 0; i < files.length; i++) {
        //预览新添加的图片
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            alert("请选择图片类型上传");
            continue;
        }

        var imgOutBox = createElem("span", {
            className: "prev-img-out-box"
        });

        var imgBox = createElem("div", {
            className: "prev-img-box"
        });

        var handleHover = createElem("span", {
            className: "handle-hover"
        });

        var delBtn = createElem("i", {
            className: "del-btn"
        });

        delBtn.setAttribute("index", orignalLen + i);

        var img = createElem("img", {
            className: "prev-img"
        });

        handleHover.appendChild(delBtn);
        imgBox.appendChild(handleHover);
        imgBox.appendChild(img);
        imgOutBox.appendChild(imgBox);
        frame.appendChild(imgOutBox);

        img.file = file;

        var reader = new FileReader();
        reader.onload = function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        }(img);

        reader.readAsDataURL(file);
    }

    $contain.prepend(frame);
}

/**
 * dom事件代理
 * @param {dom} elem 设置事件处理函数的dom节点
 * @param {string} targetSelect 触发事件处理的目标节点，可以是类名或id值，无需一定用.或#指明使用的选择器是类还是id
 * @param {string} event 事件
 * @param {function} cb 事件处理函数
 */
function on(elem, targetSelect, event, cb) {
    targetSelect = targetSelect.replace(/[.#]/, '');

    elem.addEventListener(event, function (e) {
        if (e.target.className.indexOf(targetSelect) >= 0 || e.target.id == targetSelect) {
            cb(e);
        }
    });
}

/**
 * 递归寻找指定父元素
 * @param {dom} target 当前子元素
 * @param {string} selector 指定父节点选择器，可以是类名或id值，无需一定用.或#指明使用的选择器是类还是id
 */
function parentNodes(target, selector) {
    selector = selector.replace(/[.#]/, '');

    if (target.parentNode.className.indexOf(selector) >= 0 || target.parentNode.id == selector) {
        return target.parentNode;
    } else {
        if (target.parentNode) {
            return parentNodes(target.parentNode, selector);
        } else {
            console.error('未找到指定父元素');
            return;
        }
    }
}exports.default = {
    on: on,
    parentNodes: parentNodes,
    uploadpic: uploadpic,
    imagePreview: imagePreview
};