(function(){
  function renderMarkdown(root){
    if(!root || root.dataset.markdownRendered==='true') return;
    var html=root.innerHTML;
    if(!/(\*\*|```|`[^`]+`|(^|\n)\s*-\s)/m.test(html)) return;

    html=html.replace(/```([a-zA-Z0-9_-]*)\n?([\s\S]*?)```/g,function(_,lang,code){
      return '<pre><code'+(lang?' data-language="'+lang+'"':'')+'>'+code.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</code></pre>';
    });
    html=html.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    html=html.replace(/`([^`\n]+)`/g,'<code>$1</code>');
    html=html.replace(/\\_/g,'_');

    var lines=html.split(/\n/),out=[],inList=false;
    lines.forEach(function(line){
      var m=line.match(/^\s*-\s+(.+)$/);
      if(m){
        if(!inList){out.push('<ul>');inList=true;}
        out.push('<li>'+m[1]+'</li>');
      }else{
        if(inList){out.push('</ul>');inList=false;}
        if(line.trim()) out.push(line);
      }
    });
    if(inList) out.push('</ul>');
    root.innerHTML=out.join('\n');
    root.dataset.markdownRendered='true';
  }

  function scan(){document.querySelectorAll('#imLearningShell .im-original').forEach(renderMarkdown);}
  var observer=new MutationObserver(scan);
  function start(){
    var shell=document.getElementById('imLearningShell');
    if(shell){observer.observe(shell,{childList:true,subtree:true});scan();}
    else setTimeout(start,250);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();