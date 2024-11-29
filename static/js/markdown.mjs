import markdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/+esm';
import katex from '/static/js/katex.mjs';
import hljs from '/static/js/highlight.min.mjs';
function isValidDelim(r,n){var e,t,i=r.posMax,c=!0,o=!0;return e=n>0?r.src.charCodeAt(n-1):-1,t=n+1<=i?r.src.charCodeAt(n+1):-1,(32===e||9===e||t>=48&&t<=57)&&(o=!1),(32===t||9===t)&&(c=!1),{can_open:c,can_close:o}}function math_inline(r,n){var e,t,i,c,o;if("$"!==r.src[r.pos])return!1;if(!(c=isValidDelim(r,r.pos)).can_open)return n||(r.pending+="$"),r.pos+=1,!0;for(t=e=r.pos+1;-1!==(t=r.src.indexOf("$",t));){for(o=t-1;"\\"===r.src[o];)o-=1;if((t-o)%2==1)break;t+=1}return -1===t?(n||(r.pending+="$"),r.pos=e,!0):t-e==0?(n||(r.pending+="$$"),r.pos=e+1,!0):(c=isValidDelim(r,t)).can_close?(n||((i=r.push("math_inline","math",0)).markup="$",i.content=r.src.slice(e,t)),r.pos=t+1,!0):(n||(r.pending+="$"),r.pos=e,!0)}function math_block(r,n,e,t){var i,c,o,s,a,l=!1,u=r.bMarks[n]+r.tShift[n],$=r.eMarks[n];if(u+2>$||"$$"!==r.src.slice(u,u+2))return!1;if(u+=2,i=r.src.slice(u,$),t)return!0;for("$$"===i.trim().slice(-2)&&(i=i.trim().slice(0,-2),l=!0),o=n;!l&&!(++o>=e)&&(!((u=r.bMarks[o]+r.tShift[o])<($=r.eMarks[o]))||!(r.tShift[o]<r.blkIndent));){;"$$"===r.src.slice(u,$).trim().slice(-2)&&(s=r.src.slice(0,$).lastIndexOf("$$"),c=r.src.slice(u,s),l=!0)}return r.line=o+1,(a=r.push("math_block","math",0)).block=!0,a.content=(i&&i.trim()?i+"\n":"")+r.getLines(n+1,o,r.tShift[n],!0)+(c&&c.trim()?c:""),a.map=[n,r.line],a.markup="$$",!0}function math_plugin(r,n){n=n||{};var e=function(r){n.displayMode=!1;try{return katex.renderToString(r,n)}catch(e){return n.throwOnError&&console.log(e),r}},t=function(r,n){return e(r[n].content)},i=function(r){n.displayMode=!0;try{return"<p>"+katex.renderToString(r,n)+"</p>"}catch(e){return n.throwOnError&&console.log(e),r}},c=function(r,n){return i(r[n].content)+"\n"};r.inline.ruler.after("escape","math_inline",math_inline),r.block.ruler.after("blockquote","math_block",math_block,{alt:["paragraph","reference","blockquote","list"]}),r.renderer.rules.math_inline=t,r.renderer.rules.math_block=c}
const pureMarkdown = new markdownIt({
  html: !0,
  linkify: !0,
  typographer: !0,
    highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
}).use(math_plugin);
export default pureMarkdown ;
