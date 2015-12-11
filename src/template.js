var fileTemplateContent =
    '<!DOCTYPE html>\r\n' +
    '<html lang="en">\r\n' +
    '<head>\r\n' +
    '    <meta charset="utf-8">\r\n' +
    '    <title>CSSDoc</title>\r\n' +
    '<link type="text/css" rel="stylesheet" href="stylesheets/init.css" >\r\n' +
    '<link type="text/css" rel="stylesheet" href="{{include}}" >\r\n' +
    '</head>\r\n' +
    '<body>\r\n' +
    '<header class="app-header">\r\n' +
    '   <span class="logo-cssdoc">CSS Doc</span> List of components which can be reused in project\r\n' +
    '</header>\r\n' +
    '<div class="app-layout">\r\n' +
    '   <div class="app-sidebar">\r\n' +
    '       <p class="item">Grid system</p>\r\n' +
    '       <p class="item">Fluid grid system</p>\r\n' +
    '       <p class="item">Layouts</p>\r\n' +
    '       <p class="item">Typography</p>\r\n' +
    '       <p class="item">Forms</p>\r\n' +
    '   </div>\r\n' +
    '   <div class="app-main">\r\n' +
    '       <div id="show_grid">\r\n' +
    '           {{content}}\r\n' +
    '       </div>\r\n' +
    '   </div>\r\n' +
    '</div>\r\n' +
    '</body>\r\n' +
    '</html>';

var fileBlockContent =
    '<div class="block">\r\n' +
    '    <h4>{{title}}</h4>\r\n'+
    '    <div class="code">\r\n' +
    '    <pre class="code">\r\n' +
    '       <div class="legend"></div>\r\n' +
    '       <div class="prettyprint">{{code}}</div>' +
    '    </pre>\r\n' +
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
