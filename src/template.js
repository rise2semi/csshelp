var fileTemplateContent =
    '<!DOCTYPE html>\r\n' +
    '<html lang="en">\r\n' +
    '<head>\r\n' +
    '    <meta charset="utf-8">\r\n' +
    '    <title>CSSHelp</title>\r\n' +
    '    <style>\r\n' +
    '        .code { float: left; width: 50% }\r\n' +
    '        .example { float: right; width: 50% }\r\n' +
    '        .block:after { display: block; content: ""; clear: both }\r\n' +
    '        .header { background-color: grey; }\r\n' +
    '    </style>\r\n' +
    '<link rel="stylesheet" href="{{include}}">\r\n' +
    '</head>\r\n' +
    '<body>\r\n' +
    '    <h1>CSS Help</h1>\r\n' +
    '    <h4>List of components which can be reused in project</h4>\r\n' +
    '    <hr>\r\n' +
    '    {{content}}\r\n' +
    '</body>\r\n' +
    '</html>';

var fileBlockContent =
    '<div class="block">\r\n' +
    '    <h4>{{title}}</h4>\r\n'+
    '    <div class="code"><pre>{{code}}</pre></div>\r\n' +
    '    <div class="example">{{example}}</div>\r\n' +
    '</div>\r\n';

var headerBlockContent =
    '<div class="header">\r\n' +
    '    <h4>{{title}}</h4>\r\n'+
    '</div>\r\n';

module.exports = {
    fileTemplate: fileTemplateContent,
    fileBlock: fileBlockContent,
    headerBlock: headerBlockContent
};
