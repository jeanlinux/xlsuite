/*
 * Ext JS Library 2.2.1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.Toolbar=function(config){if(Ext.isArray(config)){config={buttons:config};}
Ext.Toolbar.superclass.constructor.call(this,config);};(function(){var T=Ext.Toolbar;Ext.extend(T,Ext.BoxComponent,{trackMenus:true,initComponent:function(){T.superclass.initComponent.call(this);if(this.items){this.buttons=this.items;}
this.items=new Ext.util.MixedCollection(false,function(o){return o.itemId||o.id||Ext.id();});},autoCreate:{cls:'x-toolbar x-small-editor',html:'<table cellspacing="0"><tr></tr></table>'},onRender:function(ct,position){this.el=ct.createChild(Ext.apply({id:this.id},this.autoCreate),position);this.tr=this.el.child("tr",true);},afterRender:function(){T.superclass.afterRender.call(this);if(this.buttons){this.add.apply(this,this.buttons);delete this.buttons;}},add:function(){var a=arguments,l=a.length;for(var i=0;i<l;i++){var el=a[i];if(el.isFormField){this.addField(el);}else if(el.render){this.addItem(el);}else if(typeof el=="string"){if(el=="separator"||el=="-"){this.addSeparator();}else if(el==" "){this.addSpacer();}else if(el=="->"){this.addFill();}else{this.addText(el);}}else if(el.tagName){this.addElement(el);}else if(typeof el=="object"){if(el.xtype){this.addField(Ext.ComponentMgr.create(el,'button'));}else{this.addButton(el);}}}},addSeparator:function(){return this.addItem(new T.Separator());},addSpacer:function(){return this.addItem(new T.Spacer());},addFill:function(){return this.addItem(new T.Fill());},addElement:function(el){return this.addItem(new T.Item(el));},addItem:function(item){var td=this.nextBlock();this.initMenuTracking(item);item.render(td);this.items.add(item);return item;},addButton:function(config){if(Ext.isArray(config)){var buttons=[];for(var i=0,len=config.length;i<len;i++){buttons.push(this.addButton(config[i]));}
return buttons;}
var b=config;if(!(config instanceof T.Button)){b=config.split?new T.SplitButton(config):new T.Button(config);}
var td=this.nextBlock();this.initMenuTracking(b);b.render(td);this.items.add(b);return b;},initMenuTracking:function(item){if(this.trackMenus&&item.menu){item.on({'menutriggerover':this.onButtonTriggerOver,'menushow':this.onButtonMenuShow,'menuhide':this.onButtonMenuHide,scope:this})}},addText:function(text){return this.addItem(new T.TextItem(text));},insertButton:function(index,item){if(Ext.isArray(item)){var buttons=[];for(var i=0,len=item.length;i<len;i++){buttons.push(this.insertButton(index+i,item[i]));}
return buttons;}
if(!(item instanceof T.Button)){item=new T.Button(item);}
var td=document.createElement("td");this.tr.insertBefore(td,this.tr.childNodes[index]);this.initMenuTracking(item);item.render(td);this.items.insert(index,item);return item;},addDom:function(config,returnEl){var td=this.nextBlock();Ext.DomHelper.overwrite(td,config);var ti=new T.Item(td.firstChild);ti.render(td);this.items.add(ti);return ti;},addField:function(field){var td=this.nextBlock();field.render(td);var ti=new T.Item(td.firstChild);ti.render(td);this.items.add(field);return ti;},nextBlock:function(){var td=document.createElement("td");this.tr.appendChild(td);return td;},onDestroy:function(){Ext.Toolbar.superclass.onDestroy.call(this);if(this.rendered){if(this.items){Ext.destroy.apply(Ext,this.items.items);}
Ext.Element.uncache(this.tr);}},onDisable:function(){this.items.each(function(item){if(item.disable){item.disable();}});},onEnable:function(){this.items.each(function(item){if(item.enable){item.enable();}});},onButtonTriggerOver:function(btn){if(this.activeMenuBtn&&this.activeMenuBtn!=btn){this.activeMenuBtn.hideMenu();btn.showMenu();this.activeMenuBtn=btn;}},onButtonMenuShow:function(btn){this.activeMenuBtn=btn;},onButtonMenuHide:function(btn){delete this.activeMenuBtn;}});Ext.reg('toolbar',Ext.Toolbar);T.Item=function(el){this.el=Ext.getDom(el);this.id=Ext.id(this.el);this.hidden=false;};T.Item.prototype={getEl:function(){return this.el;},render:function(td){this.td=td;td.appendChild(this.el);},destroy:function(){if(this.el){var el=Ext.get(this.el);Ext.destroy(el);}
Ext.removeNode(this.td);},show:function(){this.hidden=false;this.td.style.display="";},hide:function(){this.hidden=true;this.td.style.display="none";},setVisible:function(visible){if(visible){this.show();}else{this.hide();}},focus:function(){Ext.fly(this.el).focus();},disable:function(){Ext.fly(this.td).addClass("x-item-disabled");this.disabled=true;this.el.disabled=true;},enable:function(){Ext.fly(this.td).removeClass("x-item-disabled");this.disabled=false;this.el.disabled=false;}};Ext.reg('tbitem',T.Item);T.Separator=function(){var s=document.createElement("span");s.className="ytb-sep";T.Separator.superclass.constructor.call(this,s);};Ext.extend(T.Separator,T.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.reg('tbseparator',T.Separator);T.Spacer=function(){var s=document.createElement("div");s.className="ytb-spacer";T.Spacer.superclass.constructor.call(this,s);};Ext.extend(T.Spacer,T.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.reg('tbspacer',T.Spacer);T.Fill=Ext.extend(T.Spacer,{render:function(td){td.style.width='100%';T.Fill.superclass.render.call(this,td);}});Ext.reg('tbfill',T.Fill);T.TextItem=function(t){var s=document.createElement("span");s.className="ytb-text";s.innerHTML=t.text?t.text:t;T.TextItem.superclass.constructor.call(this,s);};Ext.extend(T.TextItem,T.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.reg('tbtext',T.TextItem);T.Button=Ext.extend(Ext.Button,{hideParent:true,onDestroy:function(){T.Button.superclass.onDestroy.call(this);if(this.container){this.container.remove();}}});Ext.reg('tbbutton',T.Button);T.SplitButton=Ext.extend(Ext.SplitButton,{hideParent:true,onDestroy:function(){T.SplitButton.superclass.onDestroy.call(this);if(this.container){this.container.remove();}}});Ext.reg('tbsplit',T.SplitButton);T.MenuButton=T.SplitButton;})();