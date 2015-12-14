var fileTemplateContent =
    '<!DOCTYPE html>\r\n' +
    '<html lang="en">\r\n' +
    '<head>\r\n' +
    '    <meta charset="utf-8">\r\n' +
    '    <title>CSSHelp</title>\r\n' +
    '    <link type="text/css" rel="stylesheet" href="stylesheets/init.css" />\r\n' +
    '    <link type="text/css" rel="stylesheet" href="{{include}}" />\r\n' +
    '</head>\r\n' +
    '<body>\r\n' +
    '    <header class="app-header">\r\n' +
    '        <span class="logo-cssdoc">CSSHelp</span>\r\n' +
    '    </header>\r\n' +
    '    <div class="app-layout">\r\n' +
    '        <div class="app-sidebar">\r\n' +
    '           {{categories}}\r\n' +
    '        </div>\r\n' +
    '        <div class="app-main">\r\n' +
    '            <div id="show_grid">\r\n' +
    '                {{content}}\r\n' +
    '            </div>\r\n' +
    '        </div>\r\n' +
    '    </div>\r\n' +
    '    <script>\r\n' +
    '        document.querySelector(".app-sidebar").addEventListener("click", function ( event ) {\r\n' +
    '            event.preventDefault();\r\n' +
    '            \r\n' +
    '            if ( event.target.hasAttribute("href") ) {\r\n' +
    '                [].forEach.call( document.querySelectorAll(".block"), function ( block ) {\r\n' +
    '                    block.style.display = "none";\r\n' +
    '                });\r\n' +
    '                \r\n' +
    '                document.querySelector("#" + event.target.getAttribute("href") ).style.display = "block";\r\n' +
    '            }\r\n' +
    '        })\r\n' +
    '    </script>\r\n' +
    '</body>\r\n' +
    '</html>';

var fileBlockContent =
    '<div class="block" id="{{link}}" style="display: {{visible}}">\r\n' +
    '    <h4>{{title}}</h4>\r\n'+
    '    <div class="code">\r\n' +
    '        <pre class="code">\r\n' +
    '            <div class="prettyprint">{{code}}</div>' +
    '        </pre>\r\n' +
    '        <div class="example">{{example}}</div>\r\n' +
    '    </div>\r\n' +
    '</div>\r\n';

var categoryBlockContent =
    '<p class="item">\r\n' +
    '    <a href="{{link}}">{{title}}</a>\r\n'+
    '</p>\r\n';

module.exports = {
    fileTemplate: fileTemplateContent,
    fileBlock: fileBlockContent,
    categoryBlock: categoryBlockContent
};
