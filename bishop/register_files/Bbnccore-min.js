var BLACKBAUD=BLACKBAUD||{};BLACKBAUD.netcommunity={jQuery:{setVersionReference:function(){if(jQuery){var e="v"+jQuery().jquery.replace(/\./gi,"_");var h=e.slice(0,e.lastIndexOf("_"));var b=parseInt(e.slice(e.lastIndexOf("_")+1,e.length),10);var f="latestVersion";if(e.split("_").length!==3){h=e;b=0;e+="_"+b}this[h]=jQuery;var a=false;for(var d=b;d>=0;d--){var g=h+"_"+d;if(this.compatibility[g]===false&&g==e){a=d}else{if(this.compatibility[g]===false&&g!=e){break}}var c;if(a===false){c=function(){return BLACKBAUD.netcommunity.jQuery[h].apply(null,arguments)};BLACKBAUD.netcommunity.jQuery[h].extend(c,BLACKBAUD.netcommunity.jQuery[h])}else{if(d!=b){c=function(){return BLACKBAUD.netcommunity.jQuery[h+"_"+a].apply(null,arguments)};BLACKBAUD.netcommunity.jQuery[h+"_"+a].extend(c,BLACKBAUD.netcommunity.jQuery[h+"_"+a])}else{c=jQuery}}this[g]=c;this[f]=c}}},compatibility:{}},Platform:{}};
BLACKBAUD.netcommunity.api=BLACKBAUD.netcommunity.api||{};BLACKBAUD.netcommunity.api.DonationConfirmation={add:function(a){this.list[this.list.length]=a},list:[],run:function(a){for(var b=0;b<this.list.length;b++){this.list[b](a)}}};

var UNDEF='undefined';var ROOT_PATH='';var bbnc=BLACKBAUD.netcommunity;BLACKBAUD.netcommunity.shell=new function(){this.viewport=new function(){this.north=null;this.center=null;this.south=null;this.formViewport=null;};}
function fadeElementIn(oel,duration){if(!oel){return}
if(typeof(oel.style)!=UNDEF){if(typeof(oel.style.filter)!=UNDEF){oel.style.display="none";oel.style.visibility="hidden";oel.style.filter="progid:DXImageTransform.Microsoft.Fade(duration="+duration+")";oel.filters[0].Apply();oel.style.visibility="visible";oel.style.display="inline";oel.style.zIndex=999;oel.filters[0].Play();}else{oel.style.visibility="visible";oel.style.display="inline";}}}
function showIt(oel){if(typeof(oel)!=UNDEF&&oel!=null&&typeof(oel.style)!=UNDEF){oel.style.visibility="visible";oel.style.display="inline";}}
function hideIt(oel){if(typeof(oel)!=UNDEF&&oel!=null&&typeof(oel.style)!=UNDEF){oel.style.visibility="hidden";oel.style.display="none";}}
function getAbsPos(el){var offsetTrail=el;var offsetLeft=0;var offsetTop=0;while(offsetTrail){offsetLeft+=offsetTrail.offsetLeft;offsetTop+=offsetTrail.offsetTop;offsetTrail=offsetTrail.offsetParent;}
if(navigator.userAgent.indexOf("Mac")!=-1&&typeof(document.body.leftMargin)!=UNDEF){offsetLeft+=document.body.leftMargin;offsetTop+=document.body.topMargin;}
return{left:offsetLeft,top:offsetTop};}
function getElement(id){var d=document;return d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];}
function browseURL(sURL){window.open(sURL,'browsePreview');return;}
function browseURLSelf(sURL){window.open(sURL,'_self');return;}
function popupURL(sURL){window.open(sURL,'_blank');return;}
function confirmPrompt(PostBackToCtlName,PostBackEventArg,prompt,sourceControl){var confirmed=window.confirm(prompt);if(confirmed){__doPostBack(PostBackToCtlName,PostBackEventArg);if(sourceControl){$(sourceControl).attr('onclick','');$(sourceControl).click(function(e){e.preventDefault();});};}}
var iGallerySelectedID=0
function galleryRadioSelected(radio,recID){iGallerySelectedID=recID
unCheckOtherDGRadios(radio);if(window.OnGalleryRadioSelected){window.OnGalleryRadioSelected(recID)}}
function unCheckOtherCBsInRepeater(chk,repeaterid){if(chk.checked){var otherChks=document.getElementById(repeaterid).getElementsByTagName('input');var rowCount=otherChks.length;for(var index=0;index<rowCount;index++){var elem=otherChks[index];if((elem!=null)&&(elem!=chk)&&(elem.parentNode!=null)&&chk.parentNode.cellIndex==elem.parentNode.cellIndex){elem.checked=false;}}}}
function unCheckOtherCBsInColumn(chk)
{if(chk.checked){var otherChks=chk.parentNode.parentNode.parentNode.getElementsByTagName('input');var rowCount=otherChks.length;for(var index=0;index<rowCount;index++)
{var elem=otherChks[index];if((elem!=null)&&(elem!=chk)&&(elem.parentNode!=null)&&chk.parentNode.cellIndex==elem.parentNode.cellIndex)
{elem.checked=false;}}}}
function ifDefaultMarkAsIncluded(rdo){if(rdo.checked){var chkInclude=rdo.parentNode.parentNode.parentNode.getElementsByTagName('input');var itemCount=chkInclude.length;for(var index=0;index<itemCount;index++){var elem=chkInclude[index];if((elem!=rdo)&&(elem.type=="checkbox")){elem.checked=true;}}}}
function unCheckOtherDGRadios(radio){var otherRadios=radio.parentNode.parentNode.parentNode.getElementsByTagName('input');var rowCount=otherRadios.length;var index;var elem;for(index=0;index<rowCount;index++){elem=otherRadios[index];if((elem!=null)&&(elem!=radio)){elem.checked=false;}}}
function Page_BBValidate(ValidationGroup){var i;var j=0;if(typeof(Page_Validators)!=UNDEF){var Temp=Page_Validators;Page_Validators=new Array();for(i=0;i<Temp.length;i++){if(typeof(Temp[i].ValidationGroup)!=UNDEF&&Temp[i].ValidationGroup==ValidationGroup){if(!Temp[i].disabled){Page_Validators[j]=Temp[i];j++;}}}}
if(typeof(Page_ValidationSummaries)!=UNDEF){var Temp2=Page_ValidationSummaries;Page_ValidationSummaries=new Array();j=0;for(i=0;i<Temp2.length;i++){if(typeof(Temp2[i].ValidationGroup)!=UNDEF&&Temp2[i].ValidationGroup==ValidationGroup){Page_ValidationSummaries[j]=Temp2[i]
j++;}}}
var bret=true;if(typeof(Page_ClientValidate)=='function'){bret=Page_ClientValidate();}
if(typeof(Page_Validators)!=UNDEF){Page_Validators=Temp};if(typeof(Page_ValidationSummaries)!=UNDEF){Page_ValidationSummaries=Temp2};return bret}
var TemplateMsgElement;var TemplateProcessingElement;var TemplateContentElement;var TemplateRepeatElement;var savePostBackFunc;var noPostBacks=false;var saveEventTarget;var saveEventArgument;function ForcePostBack(){noPostBacks=false;return BBProcMsg(saveEventTarget,saveEventArgument);}
function BBProcMsg(eventTarget,eventArgument){var omsg=TemplateMsgElement;var smsg;if(typeof(window.event)!=UNDEF&&window.event!=null&&typeof(window.event.srcElement)!=UNDEF&&window.event.srcElement!=null){smsg=window.event.srcElement.processingmsg;};if(typeof(savePostBackFunc)=='function'){if(!noPostBacks){noPostBacks=true;if(omsg&&typeof(smsg)!=UNDEF&&smsg!=null){omsg.innerHTML=smsg+', please wait&nbsp;...';};savePostBackFunc(eventTarget,eventArgument);hideIt(TemplateContentElement);hideIt(TemplateRepeatElement);showIt(TemplateProcessingElement);}else{saveEventArgument=eventArgument;saveEventTarget=eventTarget;showIt(TemplateRepeatElement);};};};function makeHot(oel,hotClass){if(typeof(oel.saveClassName)==UNDEF){oel.saveClassName=oel.className;oel.onmouseout=function(){this.className=this.saveClassName;};};if(typeof(hotClass)==UNDEF){oel.className=oel.saveClassName+"Hot";}
else{oel.className=hotClass;};}
function hotImg(oel,hotImgSrc){if(typeof(oel.saveSrc)==UNDEF){oel.saveSrc=oel.src;oel.onmouseout=function(){if(this.src!=this.saveSrc){this.src=this.saveSrc}}};if(oel.src!=hotImgSrc){oel.src=hotImgSrc;};}
function killEvent(){try
{if(window.event)
{window.event.cancelBubble=true;}}
catch(e){}
return false;}
function addEvent(obj,type,fn)
{if(obj.addEventListener)
obj.addEventListener(type,fn,false);else if(obj.attachEvent)
{obj["e"+type+fn]=fn;obj[type+fn]=function(){obj["e"+type+fn](window.event);}
obj.attachEvent("on"+type,obj[type+fn]);}}
function removeEvent(obj,type,fn)
{if(obj.removeEventListener)
obj.removeEventListener(type,fn,false);else if(obj.detachEvent)
{obj.detachEvent("on"+type,obj[type+fn]);obj[type+fn]=null;obj["e"+type+fn]=null;}}
function LTrim(value)
{var re=/\s*((\S+\s*)*)/;return value.replace(re,"$1");}
function RTrim(value)
{var re=/((\s*\S+)*)\s*/;return value.replace(re,"$1");}
function trim(value)
{return LTrim(RTrim(value));}
function AddBorderToPaddedElement(elt,borderStyle,paddingWithBorder){elt.style.border=borderStyle
elt.style.padding=paddingWithBorder}
function RemoveBorderFromPaddedElement(elt,paddingWithoutBorder){elt.style.border=''
elt.style.padding=paddingWithoutBorder}
function select_AddOption(selectControl,optionText,optionValue)
{var o=new Option(optionText,optionValue);o.Value=optionValue;selectControl.options.add(o);}
function select_GetSelectedText(selectControl)
{if(selectControl.selectedIndex>=0)
return selectControl.options[selectControl.selectedIndex].text;}
function select_GetSelectedStringValue(selectControl)
{if(selectControl.selectedIndex>=0)
return selectControl.options[selectControl.selectedIndex].value;}
function select_GetSelectedObjectValue(selectControl)
{if(selectControl.selectedIndex>=0)
return selectControl.options[selectControl.selectedIndex].Value;}
function newid()
{var result='';for(var j=0;j<32;j++)
{if(j==8||j==12||j==16||j==20)
result=result+'-';result=result+Math.floor(Math.random()*16).toString(16).toUpperCase();}
return result;}
function iframe_GetDocument(iframe)
{if(document.all)
{iframe=eval(iframe.id);return iframe.document;}
else
{return iframe.contentWindow.document;}}
function isNumeric(str){return str.length?!isNaN(str/1):false;}
function repeatString(string,count)
{var temp=new Array(count+1);return temp.join(string);}
function DisableMe(sender)
{sender.disabled=true;}
function getMousePosition(e)
{var pos=new Object();if(isIE)
{pos.x=event.clientX+document.body.scrollLeft;pos.y=event.clientY+document.body.scrollTop;}
else
{pos.x=e.clientX;pos.y=e.clientY;}
return pos;}
function PopUpDialogBB(controlName,sName,sFeatures,queryStringData,bHideCss,pid){this.ctl=controlName;this.name=sName;this.features=sFeatures;this.qsdata=queryStringData;this.Show=Show;this.GetURL=GetURL;this.HideCss=bHideCss?1:0;this.pid=pid||BLACKBAUD.api.pageInformation.pageId;function Show(){var url=this.GetURL();var popwin=BLACKBAUD.netcommunity.baseWindow.open(url,this.name,this.features);if(typeof(popwin)!="undefined"&&popwin)
{popwin.focus();}}
function GetURL()
{if(typeof(this.ctl)==UNDEF){alert("PopUpDialogBB assert: ctl parameter not set in arg object")}
return ROOT_PATH+"PopUp.aspx?ctl="+this.ctl+"&data="+this.qsdata+"&hidecss="+this.HideCss+"&pid="+this.pid;}}
function purge(d){var a=d.attributes,i,l,n;if(a){l=a.length;for(i=0;i<l;i+=1){n=a[i].name;if(typeof d[n]==='function'){d[n]=null;}}}
purgeChildren(d);}
function purgeChildren(d){a=d.childNodes;if(a){l=a.length;for(i=0;i<l;i+=1){purge(d.childNodes[i]);}}}
function setInnerHTML(element,value){if(isIE)
{purgeChildren(element);}
element.innerHTML=value;}
function removeChild(parent,child){if(isIE)
{purge(child);}
return parent.removeChild(child);}
function replaceChild(parent,newChild,oldChild){if(isIE)
{purge(oldChild);}
return parent.removeChild(newChild,oldChild);}
function removeClass(element,className)
{element.className=(" "+element.className+" ").replace(" "+className+" "," ").trim();}
function addClass(element,className)
{element.className+=(element.className?" ":"")+className;}
function replaceClass(element,oldClassName,newClassName)
{element.className=(" "+element.className+" ").replace(" "+oldClassName+" "," "+newClassName+" ").trim();}
function hasClass(element,className)
{return(" "+element.className+" ").indexOf(" "+className+" ")>=0;}
function bbAdminButton_setDisabled(buttonElement,disabled)
{var href;if(disabled)
{replaceClass(buttonElement,"BBAdminButton","BBAdminButtonDisabled");buttonElement.style.filter="alpha(opacity=40)";buttonElement.style.MozOpacity=0.5;cursor="default";}
else
{replaceClass(buttonElement,"BBAdminButtonDisabled","BBAdminButton");buttonElement.style.filter="alpha(opacity=100)";buttonElement.style.MozOpacity=1.0;cursor="hand";}
walkDom(buttonElement,function(element){if(element.tagName==="A")
{element.style.cursor=cursor;}});}
function image_setDisabled(img,disabled)
{if(disabled)
{img.style.cursor="auto";img.style.filter="alpha(opacity=40)";img.style.MozOpacity=0.5;}
else
{img.style.cursor="hand";img.style.filter="alpha(opacity=100)";img.style.MozOpacity=1.0;}}
function createEnum(namspace,enumName,enumEntries)
{var enumObj=namspace[enumName]={};var textObj=namspace[enumName+"Text"]={};for(var i=0;i<enumEntries.length;i++)
{var enumEntry=enumEntries[i];if(enumEntry)
{if(typeof enumEntry==='string')
{enumObj[enumEntry]=i;textObj[i]=enumEntry;}
else
{var enumValue,enumSymbolIndex;if(typeof enumEntry[0]==='number')
{enumValue=enumEntry[0];enumSymbolIndex=1;}
else
{enumValue=i;enumSymbolIndex=0;}
var symbol=enumEntry[enumSymbolIndex];var text=enumEntry[(enumEntry.length>enumSymbolIndex)?enumSymbolIndex+1:enumSymbolIndex];enumObj[symbol]=enumValue;textObj[enumValue]=text;}}}}
function walkDom(element,workerFunction)
{if(workerFunction(element)!==false)
{for(var i=0;i<element.childNodes.length;i++)
{if(!walkDom(element.childNodes[i],workerFunction))
{return false;}}
return true;}
return false;}
function getEvent(evt)
{evt=evt||event;evt.target=evt.target||evt.srcElement;return evt;}
function getObject(objectName,allowUndefinedFunction)
{try
{var parts=objectName.split('.');var reference=window;for(var i=0;i<parts.length;i++)
{reference=reference[parts[i]];}
if(reference||allowUndefinedFunction)
{return reference;}}
catch(e){}
throw new Error(String.format("Object does not exist: '{0}'",objectName));}
function getKeyCode(event){if(event){if(event.which){return event.which;}else if(event.keyCode){return event.keyCode;}else{return undefined;}}else{return undefined;}}
function isEnterPressed(event){if(getKeyCode(event)==13){return true;}else{return false;}}
function TabInTextArea(event,obj){var tabKeyCode=9;var keycode;keycode=getKeyCode(event);if(keycode==tabKeyCode){if(event.type=="keydown"){if(obj.setSelectionRange){var s=obj.selectionStart;var e=obj.selectionEnd;obj.value=obj.value.substring(0,s)+"\t"+obj.value.substr(e);obj.setSelectionRange(s+1,s+1);obj.focus();}else if(obj.createTextRange){document.selection.createRange().text="\t"
obj.onblur=function(){this.focus();this.onblur=null;};}else{}}
if(event.returnValue)
event.returnValue=false;if(event.preventDefault)
event.preventDefault();return false;}
return true;}
function toggleDisabledById(ctrlId)
{var ctrl=document.getElementById(ctrlId);ctrl.disabled=!(ctrl.disabled);}
function setDisabledById(ctrlId,disabled)
{var ctrl=document.getElementById(ctrlId);if(ctrl)
{ctrl.disabled=disabled;}}
function setDisabledByIds(ctrlIds,disabled)
{if(ctrlIds&&ctrlIds.length)
{for(var i=0;i<ctrlIds.length;i++)
{setDisabledById(ctrlIds[i],disabled);}}}
function setFauxDisabledById(ctrlId,disabled)
{var color=(disabled?"gray":"");setStyleAttributeById(ctrlId,"color",color);}
function setFauxDisabledByIds(ctrlIds,disabled)
{if(ctrlIds&&ctrlIds.length)
{for(var i=0;i<ctrlIds.length;i++)
{setFauxDisabledById(ctrlIds[i],disabled);}}}
function setStyleAttributeById(ctrlId,styleAttribute,styleValue)
{var ctrl=getElement(ctrlId);if(ctrl&&ctrl.style)
{ctrl.style[styleAttribute]=styleValue;}}
function swapStyleAttributeByIds(ctrl1Id,ctrl2Id,styleAttribute)
{var ctrl1=getElement(ctrl1Id);var ctrl2=getElement(ctrl2Id);if(ctrl1&&ctrl1.style&&ctrl2&&ctrl2.style)
{var style1=ctrl1.currentStyle[styleAttribute];ctrl1.style[styleAttribute]=ctrl2.currentStyle[styleAttribute];ctrl2.style[styleAttribute]=style1;}}
function convertToCurrentProtocol(url)
{if(url&&url.replace)
{url=url.replace(/http[s]?:/i,document.location.protocol);}
return url;}
function setChildrenDisabledById(ctrlId,disabled)
{var ctrl=document.getElementById(ctrlId);walkDom(ctrl,function(element)
{if(element.disabled!==undefined)
{element.disabled=disabled;}});}
function resetScrollPositionElements()
{var scrollX=document.getElementById('__SCROLLPOSITIONX');var scrollY=document.getElementById('__SCROLLPOSITIONY');if(scrollX&&scrollY)
{scrollX.value=0;scrollY.value=0;}
Sys.WebForms.PageRequestManager.getInstance()._scrollPosition=null;scrollTo(0,0);}
function BuildBBNCAnalyticsURL(base,pagekeys,pagevals){base=base.substring(base.indexOf('/')+2);base=base.substring(base.indexOf('/'));if(pagekeys.length>0){var aKeys=pagekeys.split(";");var aVals=pagevals.split(";");var aCount=0;base+="?";while(aCount<aKeys.length){base+=aKeys[aCount]+"="+aVals[aCount]+"&";aCount+=1;}
base=base.substring(0,base.length-1);}
if(isIE){base=base.substring(0,2000);}
return base;}
function nodeIsReallyVisible(node)
{if(node.style)
{if(!Sys.UI.DomElement.getVisible(node))
{return false;}
if(node.parentNode)
{return nodeIsReallyVisible(node.parentNode);}}
return true;}
function GetRadioListValue(ctrlID)
{var radioctrl=document.getElementById(ctrlID);var radio_inputs=radioctrl.getElementsByTagName('INPUT');for(var j=0;j<radio_inputs.length;j++)
{if(radio_inputs[j].checked)
{return radio_inputs[j].value;}}}
var coverElementWithDiv_DivArray=[];function coverElementWithDiv(ctrlId,addCover)
{var divCover=coverElementWithDiv_DivArray[ctrlId];var elementToCover=document.getElementById(ctrlId);if(addCover)
{if(divCover==undefined)
{divCover=window.top.document.createElement("DIV");divCover.style.cssText="z-index:1000;position:absolute;left:-9px;top:-3px;background-color:gray;filter:alpha(opacity=15);";divCover.style.MozOpacity=0.15;elementToCover.appendChild(divCover);coverElementWithDiv_DivArray[ctrlId]=divCover;}
else
{divCover.style.display='';}
SetDivDimensions(divCover,elementToCover);}
else
{if(divCover!==undefined)
{divCover.style.display='none';}}};function SetDivDimensions(div,elementToCover)
{div.style.height=Sys.UI.DomElement.getBounds(elementToCover).height+10+'px';div.style.width=Sys.UI.DomElement.getBounds(elementToCover).width+17+'px';}
function coverElementWithDiv_Redraw()
{for(var ctrlId in coverElementWithDiv_DivArray)
{if(typeof coverElementWithDiv_DivArray[ctrlId]!=="function")
{SetDivDimensions(coverElementWithDiv_DivArray[ctrlId],document.getElementById(ctrlId));document.getElementById(ctrlId).style.display='none';document.getElementById(ctrlId).style.display='';}}}
function getElementsByClassName(rootElement,className)
{var elements=[];walkDom(rootElement,function(element){if(element.className&&(" "+element.className+" ").indexOf(className,0)>=0)
{elements.push(element);}});return elements;}
function changeCursor(state)
{document.body.style.cursor=state;}
function CallWebServiceMethod(loc,methodName,onSuccess,onFail){args=Array.prototype.slice.call(arguments);args=args.slice(4,args.length);var argsString=ArrayToJsonString(args);BLACKBAUD.netcommunity.CallWebServiceMethod(loc,methodName,onSuccess,onFail,argsString);function ArrayToJsonString(myArgs){l=myArgs.length;var args="";if(l%2!=0)return'-1';for(var i=0;i<l;i+=2){if(args.length!=0)args+=',';args+="'"+myArgs[i]+"':'"+myArgs[i+1]+"'";}
args='{'+args+'}'
return args}}
BLACKBAUD.netcommunity.left=function(str,n)
{if(n<=0)
return"";else if(n>String(str).length)
return str;else
return String(str).substring(0,n);}
BLACKBAUD.netcommunity.right=function(str,n)
{if(n<=0)
return"";else if(n>String(str).length)
return str;else{var iLen=String(str).length;return String(str).substring(iLen,iLen-n);}}
BLACKBAUD.netcommunity.getDateTime=function()
{var right=BLACKBAUD.netcommunity.right;var d=new Date();var year=d.getYear();var month=right('0'+(d.getMonth()+1),2);var day=right('0'+d.getDate(),2);var hour=right('0'+d.getHours(),2);var minute=right('0'+d.getMinutes(),2);var second=right('0'+d.getSeconds(),2);if(year<2000)
{year+=1900;}
return year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second;}
BLACKBAUD.netcommunity.setBrowserDateTimeForServer=function(controlId)
{var hidBrowserDateTime=$get(controlId);if(hidBrowserDateTime)
{hidBrowserDateTime.value=BLACKBAUD.netcommunity.getDateTime();}}
BLACKBAUD.netcommunity.consoleLog=function(stuff)
{if(typeof(console)!=='undefined'&&console.log)
{console.log(stuff);}};BLACKBAUD.netcommunity.debuggerMaybe=function()
{if(DebugMode)
{debugger;}};BLACKBAUD.netcommunity.scrollIntoView=function(id)
{var ctrl=$get(id);if(ctrl&&ctrl.scrollIntoView)
{ctrl.scrollIntoView();};};BLACKBAUD.netcommunity.baseWindow=function()
{if(window.dialogArguments&&window.dialogArguments.baseWindow)
{return window.dialogArguments.baseWindow;}
else
{return window;}}();BLACKBAUD.netcommunity.download=function(url)
{BLACKBAUD.netcommunity.baseWindow.document.getElementById("BBDownloadFrame").src=url;};BLACKBAUD.netcommunity.submitDownload=function(form,postbackCall)
{var previousTarget=form.target;form.target="BBDownloadFrame";postbackCall();form.target=previousTarget;};BLACKBAUD.netcommunity.SafeDocWriteInUpdatePanel=function(str)
{function makeMap(str)
{var obj={},items=str.split(",");for(var i=0;i<items.length;i++)
obj[items[i]]=true;return obj;}
var startTag=/^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,endTag=/^<\/(\w+)[^>]*>/,attr=/(\w+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;var empty=makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");var block=makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul");var inline=makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");var closeSelf=makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");var fillAttrs=makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");var special=makeMap("script,style");var HTMLParser=function(html,handler)
{var index,chars,match,stack=[];stack.last=function()
{return this[this.length-1];};this.parse=function(moreHTML)
{last=html=moreHTML;while(html)
{chars=true;if(!stack.last()||!special[stack.last()])
{if(html.indexOf("<!--")==0)
{index=html.indexOf("-->");if(index>=0)
{if(handler.comment)
handler.comment(html.substring(4,index));html=html.substring(index+3);chars=false;}}else if(html.indexOf("</")==0)
{match=html.match(endTag);if(match)
{html=html.substring(match[0].length);match[0].replace(endTag,parseEndTag);chars=false;}}else if(html.indexOf("<")==0)
{match=html.match(startTag);if(match)
{html=html.substring(match[0].length);match[0].replace(startTag,parseStartTag);chars=false;}}
if(chars)
{index=html.indexOf("<");var text=index<0?html:html.substring(0,index);html=index<0?"":html.substring(index);if(handler.chars)
handler.chars(text);}}else
{html=html.replace(new RegExp("(.*)<\/"+stack.last()+"[^>]*>"),function(all,text)
{text=text.replace(/<!--(.*?)-->/g,"$1").replace(/<!\[CDATA\[(.*?)]]>/g,"$1");if(handler.chars)
handler.chars(text);return"";});parseEndTag("",stack.last());}
if(html&&html==last)
throw"Parse Error: "+html;last=html;}};function parseStartTag(tag,tagName,rest,unary)
{if(block[tagName])
{while(stack.last()&&inline[stack.last()])
{parseEndTag("",stack.last());}}
if(closeSelf[tagName]&&stack.last()==tagName)
{parseEndTag("",tagName);}
unary=empty[tagName]||!!unary;if(!unary)
stack.push(tagName);if(handler.start)
{var attrs=[];rest.replace(attr,function(match,name)
{var value=arguments[2]?arguments[2]:arguments[3]?arguments[3]:arguments[4]?arguments[4]:fillAttrs[name]?name:"";attrs.push({name:name,value:value,escaped:value.replace(/(^|[^\\])"/g,'$1\\\"')});});if(handler.start)
handler.start(tagName,attrs,unary);}}
function parseEndTag(tag,tagName)
{if(!tagName)
var pos=0;else
for(var pos=stack.length-1;pos>=0;pos--)
if(stack[pos]==tagName)
break;if(pos>=0)
{for(var i=stack.length-1;i>=pos;i--)
if(handler.end)
handler.end(stack[i]);stack.length=pos;}}
this.parse(html);};var htmlns='http://www.w3.org/1999/xhtml';var win=window;var doc=document;var isDOMLoaded=false;function markLoaded()
{isDOMLoaded=true;}
if(doc.addEventListener)
doc.addEventListener('DOMContentLoaded',markLoaded,false);if(win.addEventListener)
win.addEventListener('load',markLoaded,false);if(win.attachEvent)
win.attachEvent('onload',markLoaded);var scriptIgnoreIDs=makeMap("_firebugConsoleInjector,_firebugConsole");var parentNode;var lastScript;var parser;var thisScript;if(!isDOMLoaded)
{var scripts=doc.getElementsByTagName('script');for(var i=scripts.length-1;i>=0;i--)
{if(!scripts[i].id||!scriptIgnoreIDs[scripts[i].id])
{thisScript=scripts[i];break;}}
if(!parentNode)
{parentNode=thisScript.parentNode;}
if(thisScript!=lastScript)
{parentNode=thisScript.parentNode;parser=null;lastScript=thisScript;}}
else if(!parentNode)
{parentNode=doc.getElementsByTagName('body')[0];}
if(parser)
{parser.parse(str);}
else
{parser=new HTMLParser(str,{start:function(tag,attrs,unary)
{var el=doc.createElement(tag);for(var i=0;i<attrs.length;i++)
el.setAttribute(attrs[i].name,attrs[i].value);parentNode.appendChild(el);if(!unary)
parentNode=el;},end:function(tag)
{parentNode=parentNode.parentNode;},chars:function(text)
{if(text)
{parentNode.appendChild(doc.createTextNode(text));}},comment:function(text)
{parentNode.appendChild(doc.createComment(text));}});}};BLACKBAUD.netcommunity.CallWebServiceMethod=function(loc,methodName,onSuccess,onFail,methodArgs){loc=loc.toLowerCase();if(loc.indexOf("http")!=0){loc=ROOT_PATH+"WebServices/"+loc;}
if(loc.match(".asmx$")!=".asmx"){loc=loc+".asmx";}
var path=loc+"/"+methodName;var hbc=BLACKBAUD.netcommunity.GetQueryStringValue("hbc");var siteId=BLACKBAUD.netcommunity.GetQueryStringValue("siteid");if(hbc.length>0&&siteId.length>0){path=path+"?hbc="+encodeURIComponent(hbc)+"&siteid="+encodeURIComponent(siteId);}
if(path.indexOf("?")===-1){path=path+"?";}else{path=path+"&";}
path=path+"wmts="+(new Date().getTime());localOnSuccess=function(data,textStatus,jqXHR){if(onSuccess){onSuccess(data,textStatus,jqXHR);}};localOnFail=function(jqXHR,textStatus,errorThrown){if(onFail){onFail(jqXHR,textStatus,errorThrown);}};$.ajax({type:"POST",url:path,data:methodArgs,contentType:"application/json; charset=utf-8",dataType:"json",success:localOnSuccess,error:localOnFail});};BLACKBAUD.netcommunity.CoverElementWithLoadingScreen=function(elementID,remove){var element=$('#'+elementID);var wrapper=element.parent();var blockerID='divBlocker_'+elementID
if(!wrapper){wrapper=$(document);}
if(remove===true){wrapper.css('position','');element.find('#'+blockerID).remove();}
else{wrapper.css('position','relative');element.append("<div id='"+blockerID+"' style='position:absolute; opacity:0.6; background: #FFFFFF; top:0; left:0; height:100%; width:100%; z-index:20'></div>");var blocker=element.find('#'+blockerID);blocker.fadeTo(0,0.6)
blocker.append('<img id="imgSpinner"></img>');var spinner=blocker.find('#imgSpinner');spinner.attr('src',ROOT_PATH+'images/FormEngine/blue-loading.gif');var top=($(blocker).height()||0)/2-(spinner.height()||0)/2;var left=($(blocker).width()||0)/2-(spinner.width()||0)/2;spinner.css('position','relative');spinner.css('top',top);spinner.css('left',left);}};BLACKBAUD.netcommunity.Dialog=function(selector,param,jQuery){var $$;if(jQuery!=undefined){$$=jQuery;}
else{$$=$;}
var elem=$$('.ui-dialog').children(selector);var parents=elem.parent();elem.remove();parents.remove();var _open=function(event,ui){$$(this).parent().appendTo("form");$$(".ui-widget-overlay").appendTo("form");};param=param||{};if(!param.open){param.open=_open;}
else{var _oldOpen=param.open;param.open=function(){_open.apply(this,arguments);_oldOpen.apply(this,arguments);};}
$$(selector).dialog(param).parent().appendTo("form");};BLACKBAUD.netcommunity.PingWebServer=function(onSuccess,onFail){BLACKBAUD.netcommunity.CallWebServiceMethod("WebMethods","Ping",onSuccess,onFail);};BLACKBAUD.netcommunity.LastPing=new function(){this.time=new Date();this.timeoutId;}
BLACKBAUD.netcommunity.KeepSessionAlive=function(onSuccess,onFail){var minWaitDuration=60000;var maxWaitDuration=600000
resetTimeout();function resetTimeout(){clearTimeout(BLACKBAUD.netcommunity.LastPing.timeoutId);var delay=getDelay();BLACKBAUD.netcommunity.LastPing.timeoutId=setTimeout(function(){pingServer(onSuccess,onFail)},delay);}
function getDelay(){var delay;var now=new Date();var nextCallbackTimeRequested=(now.getTime()+minWaitDuration);var longestCallbackTimeAllowed=(BLACKBAUD.netcommunity.LastPing.time.getTime()+maxWaitDuration);if(nextCallbackTimeRequested>longestCallbackTimeAllowed){delay=longestCallbackTimeAllowed-now;}
else{delay=minWaitDuration;}
return Math.max(delay,0);}
function pingServer(onSuccess,onFail){BLACKBAUD.netcommunity.PingWebServer(onSuccess,onFail);BLACKBAUD.netcommunity.LastPing.time=new Date();}};BLACKBAUD.netcommunity.Cart={}
BLACKBAUD.netcommunity.Cart.CartUpdatedEvent=new function(){var handlers=[];this.Bind=function(handler){for(var i=0;i<handlers.length;i++){if(handlers[i]===handler){return;}}
var count=handlers.length;handlers[count]=handler;}
this.Unbind=function(handler){var index=-1;for(var i=0;i<handlers.length;i++){if(handlers[i]===handler){index=i;}}
if(index>=0){handlers.splice(index,1);}}
this.Trigger=function(){for(var i=0;i<handlers.length;i++){handlers[i]();}}};BLACKBAUD.netcommunity.Cart.AddDonationToCart=function(amount,designationID,description){function onSuccess(){BLACKBAUD.netcommunity.Cart.CartUpdatedEvent.Trigger();}
function onFail(){}
var param={};param.amount=amount;param.designationID=designationID;param.description=description;param.pageID=BLACKBAUD.netcommunity.PageID
BLACKBAUD.netcommunity.CallWebServiceMethod("WebMethods","AddDonationToCart",onSuccess,onFail,Sys.Serialization.JavaScriptSerializer.serialize(param));}
BLACKBAUD.netcommunity.GetQueryStringValue=function(key,querystring){if(!querystring)
querystring=window.location.search;querystring=querystring.toLowerCase();var re=new RegExp("[?|&]"+key+"=(.*?)&");var matches=re.exec(querystring+"&");if(!matches||matches.length<2)
return"";return decodeURIComponent(matches[1].replace("+"," "));}
BLACKBAUD.netcommunity.SetQueryStringValue=function(key,value,query){query=query||window.location.search;var q=query+"&";var re=new RegExp("[?|&]"+key+"=.*?&");if(!re.test(q))
q+=key+"="+encodeURI(value);else
q=q.replace(re,"&"+key+"="+encodeURIComponent(value)+"&");q=BLACKBAUD.netcommunity.String.TrimEnd(BLACKBAUD.netcommunity.String.TrimStart(q,"&"),"&");return q[0]=="?"?q:q="?"+q;}
BLACKBAUD.netcommunity.GetMaxZIndex=function(options){var defaults={selector:'*'};jQuery.extend(defaults,options);var zmax=0;jQuery(defaults.selector).each(function(){var cur=parseInt(jQuery(this).css('z-index'),10);zmax=cur>zmax?cur:zmax;});return zmax+1;}
BLACKBAUD.netcommunity.SetMaxZIndex=function(selector,options){setTimeout(function(){jQuery(selector).css('z-index',BLACKBAUD.netcommunity.GetMaxZIndex());},500);}
BLACKBAUD.netcommunity.ViewAsDesktop=function(url){if(!url){url=window.location.href;}
if(url.indexOf("?")==-1){url=url+"?";}
var onSuccess=function(){window.location.href=window.location.href;}
var params={deliveryChannelID:'23B56292-0F3C-43AC-AF13-7767AD9D4057'};BLACKBAUD.netcommunity.CallWebServiceMethod(BLACKBAUD.netcommunity.WebMethodsURL,'SetDeliveryChannelForSession',onSuccess,null,Sys.Serialization.JavaScriptSerializer.serialize(params));};BLACKBAUD.netcommunity.ViewAsMobile=function(url){if(!url){url=window.location.href;}
if(url.indexOf("?")==-1){url=url+"?";}
var onSuccess=function(){window.location.href=window.location.href;}
var params={deliveryChannelID:'3f6b7ea0-73e8-462b-a075-de89431816a4'};BLACKBAUD.netcommunity.CallWebServiceMethod(BLACKBAUD.netcommunity.WebMethodsURL,'SetDeliveryChannelForSession',onSuccess,null,Sys.Serialization.JavaScriptSerializer.serialize(params));};
BLACKBAUD.netcommunity.String=BLACKBAUD.netcommunity.String||{};BLACKBAUD.netcommunity.String.EscapeRegularExpression=function(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")};BLACKBAUD.netcommunity.String.TrimEnd=function(a,b){if(b){return a.replace(new RegExp(BLACKBAUD.netcommunity.String.EscapeRegularExpression(b)+"*$"),"")}return a.replace(/\s+$/,"")};BLACKBAUD.netcommunity.String.TrimStart=function(a,b){if(b){return a.replace(new RegExp("^"+BLACKBAUD.netcommunity.String.EscapeRegularExpression(b)+"*"),"")}return a.replace(/^\s+/,"")};BLACKBAUD.netcommunity.String.HtmlEncode=function(a){return $("<div/>").text(a).html()};BLACKBAUD.netcommunity.String.HtmlDecode=function(a){return $("<div/>").html(a).text()};BLACKBAUD.netcommunity.String.fixTextForDate=function(a,c,d){var b=/[^0-9\/]/g;if(typeof d!=="undefined"){if(d===1){b=/[^0-9\.]/g}else{b=/[^0-9\-]/g}}setTimeout(function(){$(a).val($(a).val().replace(b,""))},0);var e=getKeyCode(c);if((e>=65&&e<=90)||(e>=97&&e<=122)||e===32){return false}else{return true}};BLACKBAUD.netcommunity.isPageSSL=function(){return location.protocol==="https:"};BLACKBAUD.netcommunity.FixUltraWebTree=function(a){$(a).find("img[style]").not("[src]").attr("src",ROOT_PATH+"images/1x1.gif")};BLACKBAUD.netcommunity.AssignSubmitButton=function(b,a){b.bind("keydown",function(c){if(isEnterPressed(c)){a.click();return false}else{return true}})};BLACKBAUD.netcommunity.SelectElement=function(d){var b,c,a;b=document;if(d.createTextRange){c=d.createTextRange();c.collapse(true);c.moveStart("character",0);c.moveEnd("character",d.value.length);c.select()}else{if(d.select){d.focus();d.select()}else{if(window.getSelection){a=window.getSelection();c=b.createRange();c.selectNodeContents(d);a.removeAllRanges();a.addRange(c)}}}};(function(){var b=false;function c(h,i){var f,d,g,e;e=i.get_updatePanelsToUpdate();if(e&&e[0]){g=e[0].replace(/\$/g,"_");d=$("#"+g);if(d.length===1){if(!d.hasClass("BBUpdatePanelDoNotBlock")){BLACKBAUD.api.blockElement()}}}}function a(d,e){BLACKBAUD.api.unblockElement()}BLACKBAUD.netcommunity.enableSmoothUpdatePanels=function(){var d;if(!b){d=Sys.WebForms.PageRequestManager.getInstance();if(!d.get_isInAsyncPostBack()){d.add_beginRequest(c);d.add_endRequest(a)}b=true}}})();BLACKBAUD.netcommunity.head=BLACKBAUD.netcommunity.head||{};BLACKBAUD.netcommunity.head.addStyleSheetLink=function(d){var c,b,a;c=false;a=$("head");a.find("link[rel='Stylesheet']").each(function(){if($(this).attr("href")===d){c=true}});if(!c){b=$("<link />");b.attr("rel","Stylesheet");b.attr("href",d);a.append(b)}};BLACKBAUD.netcommunity.resizeWindow=function(a,b){window.resizeTo(a,b);window.moveTo(screen.availWidth/2-a/2,screen.availHeight/2-b/2)};
var nonModals=[];function NotifyOpener(a,b){try{if(typeof(window.opener)!="undefined"){if(window.opener&&!window.opener.closed){if(window.opener.PopUpNotify){setTimeout("window.opener.PopUpNotify('"+a+"')",100)}}else{NotifyFailure(a)}}else{if(typeof(BLACKBAUD.netcommunity.baseWindow)!="undefined"){if(BLACKBAUD.netcommunity.baseWindow){if(BLACKBAUD.netcommunity.baseWindow.PopUpNotify){setTimeout("BLACKBAUD.netcommunity.baseWindow.PopUpNotify('"+a+"')",100)}}else{NotifyFailure(a)}}}if(typeof(b)!="undefined"){if(b){setTimeout("window.close()",500)}}}catch(c){NotifyFailure(a)}}function NotifyFailure(a){if(a=="refresh"){alert("The browser window or tab that opened this dialog is no longer available, so it can not be refreshed automatically. Your changes have been saved but this dialog will now close.");window.close()}}function PopUpNotify(a){if(window.OnPopUpNotify){window.OnPopUpNotify(a);return}switch(a){case"refresh":setTimeout(CoreModalReloadPage,200);case"postback":setTimeout(CoreModalPostbackPage,200)}}function CoreModalReloadPage(){window.location=window.location.href}function CoreModalPostbackPage(){if(__doPostBack){__doPostBack("","")}else{window.location=window.location.href}}function ShowNonModalDialogRedirectVerb(f,j,h,g,d,b,a,c){if(typeof(g)=="string"){g=ConvertModalFeatures(g,d,b)}var i=window.top;if(typeof(nonModals[a])!="undefined"){if(window.focus){if(!nonModals[a].closed){nonModals[a].focus();return}}}var e=i.open(f,a,g);if(e==null){throw new Error(-1,"window has been blocked")}nonModals[a]=e;if(window.focus){e.focus()}}function showModalDialogRedirectVerb(f,h,a,g,d,b,e,i){if(!a){a="DefaultOnModalComplete"}var c={};c.PostbackJS=h;c.OnCompleteFunctionName=a;c.PostbackArg=e;c.ExternalCallbackFunction=i;ModalDialogManager.openModal(f,c,g,CompleteModalCall,d,b)}function CompleteModalCall(ret){var cmd="";jQuery(document.body).css("cursor","default");if(typeof(ret)!="undefined"){if(typeof(ret.CMD)=="undefined"){cmd="CANCEL"}else{if(ret.CMD==""){cmd="CANCEL"}else{cmd=ret.CMD}}if(typeof(ret.dialogArguments)!="undefined"){eval(ret.dialogArguments.OnCompleteFunctionName)(cmd,ret.dialogArguments.PostbackJS,ret.dialogArguments.PostbackArg,ret.dialogArguments.ExternalCallbackFunction)}}}function DefaultOnModalComplete(CMD,PostbackJS,PostbackArg,ExternalCallbackFunction){if(CMD=="SAVE"||CMD=="NEXT"){eval(PostbackJS)}}function ConvertModalFeatures(b,a,c){b=b.replace(";",",");b=b.replace(/;/g,",");b=b.replace(/px/g,"");b=b.replace(/:/g,"=");b=b.replace(/dialogWidth/g,"width");b=b.replace(/dialogHeight/g,"height");b=b.replace(/scroll/g,"scrollbars");b+=",left="+(screen.availWidth-c)/2+",top="+(screen.availHeight-a)/2;return b}var lastmodalwindowtime=0;function _ModalDialogManager(){function a(b,c,d){if(jQuery.proxy){return jQuery.proxy.apply(jQuery,arguments)}if(arguments.length===2){if(typeof c==="string"){d=b;b=d[c];c=undefined}else{if(c&&!jQuery.isFunction(c)){d=c;c=undefined}}}if(!c&&b){c=function(){return b.apply(d||jQuery,arguments)}}if(b){c.guid=b.guid=b.guid||c.guid||jQuery.guid++}return c}this.openModal=function(e,f,g,c,d,b){if(this.openingFakeModal){return}this.openingFakeModal=true;this.onCloseCallback=c;this.childsDialogArguments=f;if(typeof(g)=="string"){g=ConvertModalFeatures(g,d,b)}this.result=null;this.closeHandled=false;this.attachParentWindowEvents();this.showModalMask();this.childWindow=window.open(e,"",g);if(this.childWindow==null){throw new Error(-1,"window has been blocked")}this.onCheckChildClosed();this.openingFakeModal=false};this.showModalMask=function(){jQuery(window.document.body).css("overflow","hidden");this.modalMaskDiv=jQuery("<div/>");this.modalMaskDiv.css({"z-index":400000,position:"absolute",left:"0px",top:"0px","background-color":"gray",filter:"alpha(opacity=60)",opacity:0.6,MozOpacity:0.6});this.modalMaskDiv.height(jQuery(document).height()||0);this.modalMaskDiv.width(jQuery(document).width()||0);this.onParentFocusDelegate=a(this,"onParentFocus");this.modalMaskDiv.on("click",this.onParentFocusDelegate);jQuery(document.body).append(this.modalMaskDiv)};this.hideModalMask=function(){if(this.modalMaskDiv){this.modalMaskDiv.off("click",this.onParentFocusDelegate);this.modalMaskDiv.remove();this.modalMaskDiv=null;jQuery(document.body).css("overflow","auto")}};this.attachParentWindowEvents=function(){this.onParentUnloadDelegate=a(this,"onParentUnload");jQuery(window).on("unload",this.onParentUnloadDelegate)};this.detachParentWindowEvents=function(){jQuery(window).off("unload",this.onParentUnloadDelegate)};this.onParentFocus=function(c){if(!this.childWindow){return}var b;try{b=this.childWindow.closed}catch(c){b=true}if(b){this.onChildClosed();return}this.childWindow.focus();return};this.onParentUnload=function(b){if(!this.childWindow){return}try{this.childWindow.close()}catch(c){}};this.onCheckChildClosed=function(){try{if(this.childWindow==null||this.childWindow.closed){this.onChildClosed()}else{setTimeout(a(this,"onCheckChildClosed"),300)}}catch(b){}};this.onChildClosed=function(b){if(this.closeHandled){return}this.closeHandled=true;this.result=b;try{if(!this.result){this.result={};this.result.CMD="CANCEL"}this.result.dialogArguments=this.childsDialogArguments;if(this.onCloseCallback){this.onCloseCallback(this.result)}}catch(c){}finally{if(this.childWindow){try{this.childWindow.close()}catch(c){}}this.childWindow=null;this.result=null;this.hideModalMask();this.detachParentWindowEvents()}}}ModalDialogManager=new _ModalDialogManager();var openFakeModal=ModalDialogManager.openModal;var modallvl;function Browser(){var a=new Object();try{a.AgentName=navigator.userAgent.toLowerCase()}catch(b){a.AgentName=""}a.IsSafari=a.AgentName.indexOf("safari")>=0;a.IsOpera=a.AgentName.indexOf("opera")>=0;a.IsFireFox=a.AgentName.indexOf("firefox")>=0;a.IsIE=document.all!=null&&!a.IsOpera&&!a.IsSafari;return a}function ModalDialogBB_crossbrowser(a,d,f,c,h,k,b,g){try{this.AgentName=navigator.userAgent.toLowerCase()}catch(l){this.AgentName=""}this.IsSafari=this.AgentName.indexOf("safari")>=0;this.IsOpera=this.AgentName.indexOf("opera")>=0;this.IsFireFox=this.AgentName.indexOf("firefox")>=0;this.IsIE=document.all!=null&&!this.IsOpera&&!this.IsSafari;this.ctl=a;this.width=d;this.height=f;if(typeof(g)==UNDEF){this.dialogArguments={}}else{this.dialogArguments=g}this.qsdata=encodeURIComponent(c);this.features="scroll:no;status:no;";this.Show=i;this.GetURL=m;this.getFeatureString=j;if(typeof(modallvl)==UNDEF||modallvl<=0){modallvl=0}if(typeof(h)==UNDEF||h){this.resizable="yes"}else{this.resizable="no"}if(typeof(k)==UNDEF||!k){this.maximize="no"}else{this.maximize="yes"}if(typeof(b)==UNDEF){b=true}function i(n){var e;if(this.URL){e=this.URL}else{e=this.GetURL()}function o(p){modallvl--;if(n){n(p)}}ModalDialogManager.openModal(e,this.dialogArguments,this.getFeatureString(),o,f,d)}function j(){return"location:no;center:yes;"+this.features+"help:no;dialogWidth:"+this.width+"px;dialogHeight:"+this.height+"px;resizable:"+this.resizable+";maximize:"+this.maximize}function m(){if(typeof(this.ctl)==UNDEF){alert("showModalDialogBB assert: ctl parameter not set in arg object")}if(typeof(this.width)==UNDEF){alert("showModalDialogBB assert: width parameter not set in arg object")}if(typeof(this.height)==UNDEF){alert("showModalDialogBB assert: height parameter not set in arg object")}modallvl++;var n=(b?"AdminPage.aspx":"Popup.aspx");var q=document.location.href;var p=q.indexOf("CuteSoft");if(p!=-1){n=q.substring(0,p)+n}else{n=ROOT_PATH+n}this.ctl=encodeURIComponent(this.ctl);var r="";if(g!=null){if(typeof(g)!=UNDEF&&(g.hbc)!=UNDEF&&typeof(g.SiteID)!=UNDEF){r="&SiteID="+g.SiteID+"&hbc=1"}}if(r==""){var o=BLACKBAUD.netcommunity.GetQueryStringValue("hbc");var s=BLACKBAUD.netcommunity.GetQueryStringValue("siteid");if(o.length>0&&s.length>0){r="&SiteID="+encodeURIComponent(s)+"&hbc="+encodeURIComponent(o)}}var e=n+"?edit=3&md="+modallvl+r+"&ctl="+this.ctl+"&data="+this.qsdata;if(typeof(this.additionalQueryString)!==UNDEF){e=e+this.additionalQueryString}return e}}function GetPluginWrapperModalURL(e,b,a,h,g,c){var d="ctl="+e;d+="&data="+b;d+="&pg="+a;d+="&do="+h;if(g){d+="&pb=1"}var f=new ModalDialogBB_crossbrowser("~/Admin/TinyMCEPlugins/TinyMCEPluginWrapper.ascx",0,0,d,true,true,c);f.additionalQueryString="&hidecss=1";return f.GetURL()};
