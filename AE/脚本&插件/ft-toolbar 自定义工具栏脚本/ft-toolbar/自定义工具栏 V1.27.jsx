var betaMode,betaExpiration,doRun,ftToolbar_registration,ftToolbar_serial_Check;
{
{
function FTToolbar()
{
var me,ftTB_ScriptName,ftTB_SettingsName;
{
this.XML = null;
this.version = "1.27";
this.UI = null;
me = this;
ftTB_ScriptName = File($.fileName).displayName.split(".")[0];
ftTB_SettingsName = ftTB_ScriptName + "_Settings";
this.Init = function (thisObj)
{
var contents,securitySetting;
{
securitySetting = app.preferences.getPrefAsLong("Main Pref Section","Pref_SCRIPTING_FILE_NETWORK_SECURITY");
if(! securitySetting)
{
alert("This script requires the scripting security preference to be set.\n\nGo to Edit / Preferences / General... and make sure \"Allow Scripts to Write Files and Access Network\" is checked.");
return  false;
}
me.userDataFolder = new Folder(Folder.userData.fsName + "/Aescripts/ftToolbar/");
if(! me.userDataFolder.exists)
{
me.userDataFolder.create();
}
me.xmlFile = app.settings.haveSetting(ftTB_SettingsName,"xmlFile")?new File(app.settings.getSetting(ftTB_SettingsName,"xmlFile")):new File(((me.userDataFolder.fsName + "/") + ftTB_ScriptName) + "_Config.xml");
contents = me.LoadXml(me.xmlFile);
if(contents)
{
me.XML = new XML(contents);
me.CheckXmlVersion(me.XML);
if(me.UI == null)
{
this.BuildGUI(thisObj);
}
}
}
}
;
this.CheckXmlVersion = function (xmlContent)
{
var j,isUpdated,commandValue,longNameValue,shortNameValue;
{
isUpdated = false;
if(xmlContent.general.version < 2)
{
for (  j=0 ; j<xmlContent.btns.btn.length() ; j = j+1)
{
commandValue = xmlContent.btns.btn[j].command;
longNameValue = xmlContent.btns.btn[j].longName;
shortNameValue = xmlContent.btns.btn[j].shortName;
if(((String(commandValue) != "") || (String(longNameValue) != "")) || (String(shortNameValue) != ""))
{
xmlContent.btns.btn[j].command = "";
xmlContent.btns.btn[j].longName = "";
xmlContent.btns.btn[j].shortName = "";
xmlContent.btns.btn[j].command["@value"] = String(commandValue);
xmlContent.btns.btn[j].longName["@value"] = String(longNameValue);
xmlContent.btns.btn[j].shortName["@value"] = String(shortNameValue);
}
}
xmlContent.general.version = 2;
isUpdated = true;
}
if(isUpdated)
{
me.SaveXml(me.xmlFile,xmlContent);
}
}
}
;
this.LoadXml = function (xmlFile)
{
var contents;
{
if(xmlFile.exists)
{
xmlFile.open("r");
contents = xmlFile.read();
xmlFile.close();
return  contents;
}
else
{
contents = me.GenerateXML();
return  contents;
}
}
}
;
this.SaveXml = function (xmlFile,xml)
{
{
xmlFile.open("w");
xmlFile.write(xml);
xmlFile.close();
return  true;
}
}
;
this.GenerateXML = function ()
{
var xmlContent,appVers,btnSX,btnSY;
{
appVers = parseFloat(app.version);
btnSX = "25";
btnSY = "17";
if($.os.indexOf("Mac") != -1)
{
if(appVers < 10)
{
btnSX = "37";
}
}
xmlContent = ((((((("<xml>\n\t\t\t\t\t\t\t\t\t\t\t<general>\n\t\t\t\t\t\t\t\t\t\t\t\t<btnSX>" + btnSX) + "</btnSX>\n\t\t\t\t\t\t\t\t\t\t\t\t<btnSY>") + btnSY) + "</btnSY>\n\t\t\t\t\t\t\t\t\t\t\t\t<version>2</version>\n\t\t\t\t\t\t\t\t\t\t\t</general>\n\t\t\t\t\t\t\t\t\t\t\t<btns>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"Fb\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Fast Blur\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>EFFECT</commandType>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<command value=\"ADBE Fast Blur\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconFile></iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed />\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"Lvl\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Levels\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>EFFECT</commandType>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<command value=\"ADBE Easy Levels2\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconFile></iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed />\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"Crv\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Curves\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>EFFECT</commandType>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<command value=\"ADBE CurvesCustom\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconFile>curves.png</iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed base64=\"iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAa5JREFUeNqslLGKwkAQhv+Eg4CSWIhN0MJCtBQiCBYpxE5SWfkAamljpwjWVhZi6TOYND6AsRCDvsNaCFroLghWc4Xo6XFnckf+aoYZfna+GVYiIkKI+gAASZJg2/a/DI7HI8bjMQBgvV4DRESappFt2/Ssd/lsNqNyuUypVIoKhQIZhkGGYRAR0QcAqKoa6DWXywX9fh+73Q75fB6O4yASiQAAHMf5GlnTtECGo9EIjDFMJhO4rvswe5ZERFQsFtHr9d6aMcYwnU7RbrcRi8V+7LEs68awUqn4Mmw2mzQcDn0Zy0FHZowhk8n49slBl3K9XqHrerA7vL/wvqm7nnNZlrFarbDf73+sP0RE1O12fRmWSiXabDbhMVQUBdFoNByGp9MJnHPE4/FwGC6XSyQSCbiu+yvjF4a2bb9laJrmyw36Mvxt5O12i2q1CtM0kc1mg39fqqqi0+lgMBigXq/jcDhgsVhAURQ0Gg3UajXM5/NAhhIRked5aLVaAIBcLgdd15FOp5FMJv/0N1qWdTMEAM/zHgUhBIQQ4JyDc/4Sf8/vsRAC5/P5yzAsfQ4Av1S3LX2iObQAAAAASUVORK5CYII=\"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"TrC\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Trim Comp to Work Area\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>MENU</commandType>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<command value=\"Trim Comp to Work Area\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconFile></iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed />\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"Cal\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Calculator\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>OS</commandType>") + (($.os.indexOf("Win") != -1)?"<command value=\"Calc\" />":"<command value=\"open -a Calculator\" />")) + "<iconFile></iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed />\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"Null\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Add Null\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>JAVASCRIPT</commandType>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<command value=\"if(app.project.activeItem){ &#xA;&#x9;app.project.activeItem.layers.addNull(); &#xA;};\" /> \n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconFile></iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed />\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"AES\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Launch AEScripts website\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<commandType>OS</commandType>") + (($.os.indexOf("Win") != -1)?"<command value=\"explorer http://www.aescripts.com\" />":"<command value=\"open http://www.aescripts.com\" />")) + "<iconFile/>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed/>\n\t\t\t\t\t\t\t\t\t\t\t\t</btn>\n\t\t\t\t\t\t\t\t\t\t\t</btns>\n\t\t\t\t\t\t\t\t\t\t</xml>";
me.xmlFile = new File(app.settings.haveSetting(ftTB_SettingsName,"xmlFile")?new File(app.settings.getSetting(ftTB_SettingsName,"xmlFile")):new File(((me.userDataFolder.fsName + "/") + ftTB_ScriptName) + "_Config.xml"));
app.settings.saveSetting(ftTB_SettingsName,"xmlFile",me.xmlFile.toString());
me.SaveXml(me.xmlFile,xmlContent);
return  xmlContent;
}
}
;
this.ApllyCommand = function (commandType,command)
{
var presetFile,scriptFile,i,path,nbLayers,fx;
{
if(String(commandType) == "EFFECT")
{
if(app.project.activeItem && app.project.activeItem.selectedLayers)
{
nbLayers = app.project.activeItem.selectedLayers.length;
for (  i=0 ; i<nbLayers ; i = i+1)
{
if(app.project.activeItem.selectedLayers[i].Effects.canAddProperty(String(command)))
{
fx = app.project.activeItem.selectedLayers[i].Effects.addProperty(String(command));
fx.selected = true;
}
}
}
}
if(String(commandType) == "ANIMATION PRESET")
{
path = "";
($.os.indexOf("Win") != -1)?path = Folder.appPackage.fsName + "/Presets/":path = Folder.appPackage.parent.fsName + "/Presets/";
presetFile = new File(path + String(command));
if(app.project.activeItem)
{
nbLayers = app.project.activeItem.selectedLayers.length;
for (  i=0 ; i<nbLayers ; i = i+1)
{
app.project.activeItem.selectedLayers[i].applyPreset(presetFile);
}
}
}
if(String(commandType) == "SCRIPT LAUNCHER")
{
path = "";
($.os.indexOf("Win") != -1)?path = Folder.appPackage.fsName + "/Scripts/":path = Folder.appPackage.parent.fsName + "/Scripts/";
scriptFile = new File(path + String(command));
if(scriptFile.exists)
{
$.evalFile(scriptFile);
}
}
if(String(commandType) == "JAVASCRIPT")
{
eval(String(command));
}
if(String(commandType) == "MENU")
{
if(app.findMenuCommandId(String(command)))
{
app.executeCommand(app.findMenuCommandId(String(command)));
}
}
if(String(commandType) == "OS")
{
system.callSystem(String(command));
}
}
}
;
this.BuildGUI = function (thisObj)
{
var panels,res,win;
{
win = (thisObj instanceof Panel)?thisObj:new Window("palette",("ft-Toolbar (" + me.version) + ")",undefined,{resizeable:true});
me.UI = win;
res = "group{orientation:'row', alignment:['fill','fill'], alignChildren:['fill','fill'], margins: 0, spacing: 0, \n\t\t\t\t\t\t\t\t\tgpBtn:Group{orientation:'row', alignment:['fill','fill'], alignChildren:['fill','fill'], margins: 0, spacing: 0, \n\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t}";
panels = win.add(res);
me.UI.panels = null;
me.UI.panels = panels;
me.GetButtonsString(panels.gpBtn);
win.layout.layout(true);
win.layout.resize();
win.onResizing = win.onResize = function ()
{
{
if(me.UI.windowBounds[2] < me.UI.windowBounds[3])
{
me.UI.panels.orientation = "column";
me.UI.panels.gpBtn.orientation = "column";
me.UI.btns.orientation = "column";
}
else
{
me.UI.panels.orientation = "row";
me.UI.panels.gpBtn.orientation = "row";
me.UI.btns.orientation = "row";
}
win.layout.resize();
}
}
;
if(win instanceof Window)
{
win.center();
win.show();
}
}
}
;
this.GetButtonsString = function (panels)
{
var i,current,j,editSX,btnString,iconFile,noCommand,list;
{
editSX = (me.XML.general.btnSX > 30)?me.XML.general.btnSX:30;
btnString = "group{orientation:'row', alignment:['fill','fill'], alignChildren:['center','center'], margins: 0, spacing: 0, ";
for (  i=0 ; i<me.XML.btns.btn.length() ; i = i+1)
{
iconFile = me.LoadIcon(me.XML.btns.btn[i].iconFile,String(me.XML.btns.btn[i].iconEmbed["@base64"]));
btnString = ((((((((((((((btnString + "btn") + String(i)) + ": ") + (iconFile.exists?"IconButton":"Button")) + " { text:'") + me.XML.btns.btn[i].shortName["@value"]) + "' , preferredSize:[") + me.XML.general.btnSX) + ",") + me.XML.general.btnSY) + "], helpTip:'") + me.XML.btns.btn[i].longName["@value"]) + "', ") + (iconFile.exists?String(("icon: '" + String(iconFile)) + "'"):"")) + "},";
}
btnString = ((((btnString + "edit: Button{ text:'Edit', preferredSize:[") + String(editSX)) + ",") + me.XML.general.btnSY) + "], helpTip:'Edit this toolbar'}}";
me.UI.btns = panels.add(btnString);
noCommand = new Array();
for (  j=0 ; j<me.XML.btns.btn.length() ; j = j+1)
{
current = "btn" + String(j);
me.UI.btns[current].command = me.XML.btns.btn[j].command["@value"];
if(String(me.XML.btns.btn[j].command["@value"]) == "")
{
noCommand[noCommand.length] = me.XML.btns.btn[j].shortName["@value"];
}
me.UI.btns[current].commandType = me.XML.btns.btn[j].commandType;
me.UI.btns[current].onClick = function ()
{
{
me.ApllyCommand(this.commandType,this.command);
}
}
;
}
me.UI.btns.edit.onClick = function ()
{
{
me.EditInit(me.XML);
me.UI.btns.edit.enabled = false;
}
}
;
me.UI.layout.layout(true);
if(me.UI.windowBounds[2] < me.UI.windowBounds[3])
{
me.UI.panels.orientation = "column";
me.UI.panels.gpBtn.orientation = "column";
me.UI.btns.orientation = "column";
}
else
{
me.UI.panels.orientation = "row";
me.UI.panels.gpBtn.orientation = "row";
me.UI.btns.orientation = "row";
}
me.UI.layout.resize();
if(noCommand.length > 0)
{
list = "";
for (  i=0 ; i<noCommand.length ; i = i+1)
{
list = ((list + "- ") + noCommand[i]) + "\n";
}
alert("\nThe following buttons do not have command.\nClick on 'Edit' to set a command for it \n\n" + list,"Warning !");
}
}
}
;
this.LoadIcon = function (iconFile,iconEmbed)
{
var myIcon,iconFolder;
{
myIcon = new File();
iconFolder = new Folder(((me.xmlFile.parent.toString() + "/Icon_") + ftTB_ScriptName) + "/");
if(! iconFolder.exists)
{
iconFolder.create();
}
if(iconFile != "")
{
if(iconEmbed != "")
{
myIcon = GetIcon(new File((iconFolder.fsName + "/") + iconFile),iconEmbed);
}
else
{
myIcon = new File(iconFile);
}
}
return  myIcon;
}
}
;
this.EditInit = function (xml)
{
{
me.xmlBackup = new XML(xml);
me.BuildEditUI(this);
}
}
;
this.BuildEditUI = function (thisObj)
{
var i,panels,res,xml,generalPl,editWin,buttonsPl;
{
xml = me.XML;
editWin = (thisObj instanceof Panel)?thisObj:new Window("palette","编辑 ft-Toolbar",undefined,{resizeable:false});
res = ((("group { orientation:'column', alignment:['fill','fill'], alignChildren:['fill','fill'], margins:0,  \n\t\t\t\t\t\t\t\t\t\t\t\t registred: StaticText { text:'自定工具栏 v." + me.version) + "        ") + ftToolbar_registration) + "', preferredSize: [300,20]}, \n\t\t\t\t\t\t\t\t\t\t\t\t  buttons: Panel{text:'按钮设置', orientation:'row', alignment:['fill','fill'], alignChildren:['center','center'], margins: 10, spacing: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgpList: Group{orientation:'column', alignment:['fill','fill'], alignChildren:['center','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   gpCtr: Group{orientation:'row', alignment:['left','top'], margins: 0, alignChildren:['center','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t addBtn: Button{ text: '添加',preferredSize: [50,20], helpTip:'添加按钮'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t deleteBtn: Button{ text: '删除', preferredSize: [50,20], helpTip:'删除所选按钮'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t upBtn: Button{ text: '上移' , preferredSize: [50,20], helpTip:'上移按钮'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t downBtn: Button{ text: '下移', preferredSize: [50,20], helpTip:'下移按钮'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   list: ListBox { alignment:['left','top'], preferredSize: [225,335], helpTip:'按钮列表'} , \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgpParam: Group{orientation:'column', alignment:['fill','fill'], margins: 20, alignChildren:['left','top'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  gpName: Group{orientation:'row', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlbl: StaticText { text:'名称: ', preferredSize: [50,15]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tval: EditText { properties:{multiline:false}, preferredSize:[150,20], helpTip:'这将是按钮名称（注意：如果名称长于按钮的大小，它可能被修剪）'}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  gpTip: Group{orientation:'row', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlbl: StaticText { text:'帮助提示: ', preferredSize: [50,15]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tval: EditText { properties:{multiline:false}, preferredSize:[150,20], helpTip:'帮助提示将会显示，当鼠标在按钮上悬停（较长名字？）' }, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t gpIcon: Group{orientation:'row', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlbl: StaticText { text:'图标: ', preferredSize: [50,15]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tval: EditText { properties:{multiline:false}, preferredSize:[100,20], helpTip:'图标文件路径' }, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbtn: Button { text:'浏览', preferredSize:[60,20], helpTip:'加载图标文件' },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t gpType: Group{orientation:'row', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t lbl: StaticText { text:'类型: ', alignment:['fill','center'], preferredSize: [50,15]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t val: DropDownList { alignment:['fill','center'], properties:{items:['EFFECT','ANIMATION PRESET','SCRIPT LAUNCHER','MENU','JAVASCRIPT','OS']}, preferredSize:[150,20], helpTip:'选择按钮类型 : \\nEFFECT -> 选定的层上应用效果 \\nANIMATION PRESET -> 应用 *动画预设 \\nSCRIPT LAUNCHER -> 运行一个 .js, .jsx, .jsxbin 脚本文件\\nMENU -> 从AE菜单调用命令 \\nOS -> 执行一个shell/终端操作系统命令 \\nJAVASCRIPT -> 执行一些AE相关的JavaScript'}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t gpCommand: Group{orientation:'column', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlbl: StaticText { text:'命令: ', preferredSize: [70,15]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tval: EditText { properties:{multiline:true}, align:[fill,fill],preferredSize: [250,170], helpTip:'Effect name or Matchname (recommended)效果名称或匹配名称（推荐）. \\n例如: 级别'}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgpHelpBtn: Group{orientation:'stack', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmatchNameBtn: Button{ text: '获取特效名称',preferredSize: [150,20], helpTip:'将返回的效果匹配名称（唯一名称） \\n-添加效果到任何一层 \\n-在效果控制面板中选择效果名称 \\n-点击按钮获得匹配名称'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tscriptBtn: Button{ text: '浏览脚本',preferredSize: [150,20], helpTip:'加载一个脚本文件 (.js, .jsx, .jsxbin)'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tpresetBtn: Button{ text: '浏览动画预设',preferredSize: [150,20], helpTip:'加载一个动画预设文件 (.ffx)'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgpJsBtn : Group{orientation:'row', alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tjsCodeBtn: Button{ text: '脚本示例',preferredSize: [125,20], helpTip:'查找用户共享的脚本'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tjsdocBtn: Button{ text: '脚本帮助',preferredSize: [125,20], helpTip:'Adobe After Effects 脚本指南'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgpValid: Group{orientation:'column', alignment:['fill','fill'], alignChildren:['right','top'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tokBtn: Button{ text: '确定',preferredSize: [60,20], helpTip:'新的配置将保存在您的硬盘'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcancelBtn: Button{ text: '取消',preferredSize: [60,20], helpTip:'将恢复旧的配置'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\timportBtn: Button{ text: '导入',preferredSize: [60,20], helpTip:'导入现有的配置文件'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texportBtn: Button{ text: '导出',preferredSize: [60,20], helpTip:'配置导出到一个XML'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taboutBtn: Button{ text: '关于',preferredSize: [60,20], helpTip:'关于/帮助'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t },\n\t\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\t\tgenerals: Panel{ text:'常规设置', orientation:'column', alignment:['fill','top'], alignChildren:['center','center'], margins: 10, spacing: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t gpBtnSize: Group{orientation:'row', alignment:['left','top'], alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlbl: StaticText { text:'按钮尺寸: ', preferredSize: [90,20]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twidth: EditText { properties:{multiline:false},preferredSize: [25,20], helpTip:'宽度'}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\theight: EditText { properties:{multiline:false},preferredSize: [25,20], helpTip:'高度'}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tgpXMLPath: Group{orientation:'row', alignment:['left','top'], alignChildren:['left','center'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlbl: StaticText { text:'配置文件路径: ', preferredSize: [90,20]}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tval: EditText { properties:{multiline:false},preferredSize: [425,20], helpTip:'XML文件路径'}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbtn: Button { text:'浏览', preferredSize:[60,20] },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t}";
panels = editWin.add(res);
buttonsPl = panels.buttons;
buttonsPl.gpList.gpCtr.deleteBtn.enabled = false;
buttonsPl.gpParam.gpName.val.enabled = false;
buttonsPl.gpParam.gpName.val.text = "";
buttonsPl.gpParam.gpTip.val.enabled = false;
buttonsPl.gpParam.gpTip.val.text = "";
buttonsPl.gpParam.gpIcon.val.enabled = false;
buttonsPl.gpParam.gpIcon.val.text = "";
buttonsPl.gpParam.gpIcon.btn.enabled = false;
buttonsPl.gpParam.gpType.val.enabled = false;
buttonsPl.gpParam.gpType.val.selection = null;
buttonsPl.gpParam.gpCommand.val.enabled = false;
buttonsPl.gpParam.gpCommand.val.text = "";
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
buttonsPl.gpList.gpCtr.upBtn.enabled = false;
buttonsPl.gpList.gpCtr.downBtn.enabled = false;
for (  i=0 ; i<xml.btns.btn.length() ; i = i+1)
{
buttonsPl.gpList.list.add("item",xml.btns.btn[i].shortName["@value"]);
}
buttonsPl.gpList.list.onChange = function ()
{
{
if(this.selection != null)
{
buttonsPl.gpList.gpCtr.deleteBtn.enabled = true;
if(this.selection.index > 0)
{
buttonsPl.gpList.gpCtr.upBtn.enabled = true;
}
else
{
buttonsPl.gpList.gpCtr.upBtn.enabled = false;
}
if(this.selection.index < (buttonsPl.gpList.list.items.length - 1))
{
buttonsPl.gpList.gpCtr.downBtn.enabled = true;
}
else
{
buttonsPl.gpList.gpCtr.downBtn.enabled = false;
}
buttonsPl.gpParam.gpName.val.enabled = true;
buttonsPl.gpParam.gpName.val.text = xml.btns.btn[this.selection.index].shortName["@value"];
buttonsPl.gpParam.gpTip.val.enabled = true;
buttonsPl.gpParam.gpTip.val.text = xml.btns.btn[this.selection.index].longName["@value"];
buttonsPl.gpParam.gpIcon.val.enabled = true;
buttonsPl.gpParam.gpIcon.val.text = File.decode(String(xml.btns.btn[this.selection.index].iconFile));
buttonsPl.gpParam.gpIcon.btn.enabled = true;
buttonsPl.gpParam.gpType.val.enabled = true;
buttonsPl.gpParam.gpType.val.selection = IdType(xml.btns.btn[this.selection.index].commandType);
buttonsPl.gpParam.gpCommand.val.enabled = true;
buttonsPl.gpParam.gpCommand.val.text = File.decode(String(xml.btns.btn[this.selection.index].command["@value"]));
}
else
{
buttonsPl.gpList.gpCtr.deleteBtn.enabled = false;
buttonsPl.gpList.gpCtr.upBtn.enabled = false;
buttonsPl.gpList.gpCtr.downBtn.enabled = false;
buttonsPl.gpParam.gpName.val.enabled = false;
buttonsPl.gpParam.gpName.val.text = "";
buttonsPl.gpParam.gpIcon.val.enabled = false;
buttonsPl.gpParam.gpIcon.val.text = "";
buttonsPl.gpParam.gpIcon.btn.enabled = false;
buttonsPl.gpParam.gpTip.val.enabled = false;
buttonsPl.gpParam.gpTip.val.text = "";
buttonsPl.gpParam.gpType.val.enabled = false;
buttonsPl.gpParam.gpType.val.selection = null;
buttonsPl.gpParam.gpCommand.val.enabled = false;
buttonsPl.gpParam.gpCommand.val.text = "";
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
}
}
}
;
buttonsPl.gpList.gpCtr.addBtn.onClick = function ()
{
var i,nodeIndex,selection;
{
selection = buttonsPl.gpList.list.selection;
nodeIndex = me.AddXMLBtn(xml,selection?xml.btns.btn[selection.index]:null);
buttonsPl.gpList.list.removeAll();
for (  i=0 ; i<xml.btns.btn.length() ; i = i+1)
{
buttonsPl.gpList.list.add("item",xml.btns.btn[i].shortName["@value"]);
}
buttonsPl.gpList.list.items[nodeIndex].selected = true;
}
}
;
buttonsPl.gpList.gpCtr.deleteBtn.onClick = function ()
{
{
if(buttonsPl.gpList.list.selection)
{
delete xml.btns.btn[buttonsPl.gpList.list.selection.index];
buttonsPl.gpList.list.remove(buttonsPl.gpList.list.selection.index);
}
buttonsPl.gpParam.gpName.val.enabled = false;
buttonsPl.gpParam.gpName.val.text = "";
buttonsPl.gpParam.gpTip.val.enabled = false;
buttonsPl.gpParam.gpTip.val.text = "";
buttonsPl.gpParam.gpIcon.val.enabled = false;
buttonsPl.gpParam.gpIcon.val.text = "";
buttonsPl.gpParam.gpIcon.btn.enabled = false;
buttonsPl.gpParam.gpType.val.enabled = false;
buttonsPl.gpParam.gpType.val.selection = null;
buttonsPl.gpParam.gpCommand.val.enabled = false;
buttonsPl.gpParam.gpCommand.val.text = "";
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
}
}
;
buttonsPl.gpList.gpCtr.upBtn.onClick = function ()
{
var i,nodeIndex,selection;
{
selection = buttonsPl.gpList.list.selection;
nodeIndex = me.MoveBtnUp(xml,selection.index);
buttonsPl.gpList.list.removeAll();
for (  i=0 ; i<xml.btns.btn.length() ; i = i+1)
{
buttonsPl.gpList.list.add("item",xml.btns.btn[i].shortName["@value"]);
}
buttonsPl.gpList.list.items[nodeIndex].selected = true;
}
}
;
buttonsPl.gpList.gpCtr.downBtn.onClick = function ()
{
var i,nodeIndex,selection;
{
selection = buttonsPl.gpList.list.selection;
nodeIndex = me.MoveBtnDown(xml,selection.index);
buttonsPl.gpList.list.removeAll();
for (  i=0 ; i<xml.btns.btn.length() ; i = i+1)
{
buttonsPl.gpList.list.add("item",xml.btns.btn[i].shortName["@value"]);
}
buttonsPl.gpList.list.items[nodeIndex].selected = true;
}
}
;
buttonsPl.gpParam.gpName.val.onChange = function ()
{
{
if(buttonsPl.gpList.list.selection)
{
buttonsPl.gpList.list.items[buttonsPl.gpList.list.selection.index].text = this.text;
xml.btns.btn[buttonsPl.gpList.list.selection.index].shortName["@value"] = this.text;
}
}
}
;
buttonsPl.gpParam.gpTip.val.onChange = function ()
{
{
if(buttonsPl.gpList.list.selection)
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].longName["@value"] = this.text;
}
}
}
;
buttonsPl.gpParam.gpIcon.val.onChange = function ()
{
var iconFile,processLoading,iconSize,iconPath;
{
if(buttonsPl.gpList.list.selection)
{
if(this.text != "")
{
processLoading = true;
iconSize = CheckImageSize(File(this.text));
if((xml.general.btnSX < iconSize[0]) || (xml.general.btnSY < iconSize[1]))
{
processLoading = confirm(((((((((((("This icon is " + String(iconSize[0])) + "x") + String(iconSize[0])) + " pixels while the button is ") + String(xml.general.btnSX)) + "x") + String(xml.general.btnSY)) + " pixels.\nUnfortunately the script is not able to resize your icon so it won't display entirely ! (it is recommended to use an icon with a size of ") + String(xml.general.btnSX)) + "x") + String(xml.general.btnSY)) + " pixels)\n\nAre you sure you want to use this icon ?",true,"Warning Icon Size");
}
if(processLoading)
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconFile = this.text;
iconFile = new File(this.text);
iconPath = iconFile.toString().split("/");
this.text = iconPath[iconPath.length - 1];
if(iconFile.exists)
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconFile = File.decode(String(iconPath[iconPath.length - 1]));
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconEmbed["@base64"] = Icon2b64(iconFile);
}
}
}
else
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconFile = "";
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconEmbed["@base64"] = "";
}
}
}
}
;
buttonsPl.gpParam.gpIcon.btn.onClick = function ()
{
var processLoading,iconSize,iconPath,extensionFilter,selectedIconFile,oldFile;
{
if(buttonsPl.gpList.list.selection)
{
extensionFilter = ($.os.indexOf("Mac") != -1)?pngImportFilter:"PNG files:*.png";
selectedIconFile = File.openDialog("Please select a PNG file to use as a button icon",extensionFilter);
if(selectedIconFile)
{
processLoading = true;
iconSize = CheckImageSize(selectedIconFile);
if((parseFloat(xml.general.btnSX) < iconSize[0]) || (parseFloat(xml.general.btnSY) < iconSize[1]))
{
processLoading = confirm(((((((((((("This icon is " + String(iconSize[0])) + "x") + String(iconSize[0])) + " pixels while the button is ") + String(xml.general.btnSX)) + "x") + String(xml.general.btnSY)) + " pixels.\nUnfortunately the script is not able to resize your icon so it won't display entirely ! (it is recommended to use an icon with a size of ") + String(xml.general.btnSX)) + "x") + String(xml.general.btnSY)) + " pixels)\n\nAre you sure you want to use this icon ?",true,"Warning Icon Size");
}
if(processLoading)
{
if(buttonsPl.gpParam.gpIcon.val.text != "")
{
oldFile = new File((((me.xmlFile.parent.toString() + "/Icon_") + ftTB_ScriptName) + "/") + buttonsPl.gpParam.gpIcon.val.text);
if(oldFile.exists)
{
oldFile.remove();
}
}
iconPath = selectedIconFile.toString().split("/");
buttonsPl.gpParam.gpIcon.val.text = File.decode(String(iconPath[iconPath.length - 1]));
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconFile = iconPath[iconPath.length - 1];
xml.btns.btn[buttonsPl.gpList.list.selection.index].iconEmbed["@base64"] = Icon2b64(selectedIconFile);
}
}
}
}
}
;
buttonsPl.gpParam.gpType.val.onChange = function ()
{
{
buttonsPl.gpParam.gpCommand.val.text = "";
if(buttonsPl.gpList.list.selection)
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].commandType = this.selection;
}
if(String(this.selection) == "EFFECT")
{
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = true;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
buttonsPl.gpParam.gpCommand.val.helpTip = "Effect name or Matchname (recommended). \\nFor example : Levels";
}
else
if(String(this.selection) == "JAVASCRIPT")
{
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = true;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
buttonsPl.gpParam.gpCommand.val.helpTip = "Javascript command that AE understands";
}
else
if(String(this.selection) == "ANIMATION PRESET")
{
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = true;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
buttonsPl.gpParam.gpCommand.val.helpTip = "Path to an Animation Preset file on your harddrive (.ffx)";
}
else
if(String(this.selection) == "SCRIPT LAUNCHER")
{
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = true;
buttonsPl.gpParam.gpCommand.val.helpTip = "Path to a Script file on your harddrive (.js, .jsx, .jsxbin)";
}
else
if(String(this.selection) == "OS")
{
buttonsPl.gpParam.gpCommand.val.helpTip = "Any Operating System command you can run into your terminal can be set here. For example calc (on Windows) or open -a Calculator (on Mac) would start the calculator";
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
}
else
if(String(this.selection) == "MENU")
{
buttonsPl.gpParam.gpCommand.val.helpTip = "Set the exact name of any menu item you want to call. For example : Time-Reverse Keyframes";
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
}
else
{
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.visible = false;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.visible = false;
}
}
}
;
buttonsPl.gpParam.gpCommand.val.onChange = function ()
{
var correctedText;
{
correctedText = this.text.replace(RegExp("\u201c|\u201d","g"),"\"");
this.text = correctedText;
if(buttonsPl.gpList.list.selection)
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].command["@value"] = correctedText;
}
}
}
;
buttonsPl.gpParam.gpCommand.gpHelpBtn.matchNameBtn.onClick = function ()
{
var mNwords,i,longName,shortName,name,matchname;
{
if(app.project.activeItem && app.project.activeItem.selectedLayers)
{
if(app.project.activeItem.selectedLayers[0].selectedProperties[0])
{
matchname = app.project.activeItem.selectedLayers[0].selectedProperties[0].matchName;
name = app.project.activeItem.selectedLayers[0].selectedProperties[0].name;
buttonsPl.gpParam.gpCommand.val.text = matchname;
if(buttonsPl.gpList.list.selection)
{
xml.btns.btn[buttonsPl.gpList.list.selection.index].command["@value"] = matchname;
}
if((buttonsPl.gpParam.gpName.val.text == "btn") || (buttonsPl.gpParam.gpTip.val.text == "Button"))
{
longName = name.replace(RegExp("[0-9\\+\\/\\=\\(\\)]","g")," ");
mNwords = longName.split(" ");
shortName = "";
for (  i=0 ; i<mNwords.length ; i = i+1)
{
shortName += mNwords[i].substr(0,1);
}
if(buttonsPl.gpParam.gpName.val.text == "btn")
{
buttonsPl.gpParam.gpName.val.text = shortName.toLowerCase();
buttonsPl.gpParam.gpName.val.notify("onChange");
}
if(buttonsPl.gpParam.gpTip.val.text == "Button")
{
buttonsPl.gpParam.gpTip.val.text = longName;
buttonsPl.gpParam.gpTip.val.notify("onChange");
}
}
}
else
{
alert("You need to select a filter in your comp");
}
}
else
{
alert("You need to select a filter in your comp");
}
}
}
;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.jsdocBtn.onClick = function ()
{
{
OpenWebLink("http://www.adobe.com/products/aftereffects/pdfs/aftereffectscs3_scripting_guide.pdf");
}
}
;
buttonsPl.gpParam.gpCommand.gpHelpBtn.gpJsBtn.jsCodeBtn.onClick = function ()
{
{
OpenWebLink("http://www.smipple.net/tag/ft-toolbar");
}
}
;
buttonsPl.gpParam.gpCommand.gpHelpBtn.presetBtn.onClick = function ()
{
var mNwords,presetFile,i,presetFolder,ffxPath,presetPath,ffxFile,path,longName,shortName,extensionFilter;
{
if(String(buttonsPl.gpParam.gpType.val.selection) == "ANIMATION PRESET")
{
path = "";
($.os.indexOf("Win") != -1)?path = Folder.appPackage.fsName + "/Presets/":path = Folder.appPackage.parent.fsName + "/Presets/";
presetFolder = new Folder(path);
presetFile = new File();
if(presetFolder.exists)
{
presetFile.changePath(presetFolder);
}
else
{
presetFile.changePath(new Folder(Folder.appPackage.fsName));
}
extensionFilter = ($.os.indexOf("Mac") != -1)?ffxImportFilter:"FFX files:*.ffx";
presetFile = presetFile.openDlg("Select a preset file",extensionFilter,false);
if(presetFile && presetFile.exists)
{
ffxPath = presetFile.toString().split("/");
presetPath = presetFolder.toString().split("/");
ffxFile = "";
$.writeln("preset parent : " + String(presetFile.parent.fsName));
$.writeln("path : " + String(presetFolder.fsName));
if(String(presetFile.parent.fsName).match(String(presetFolder.fsName)))
{
$.writeln("is in AE install");
}
else
{
$.writeln("is NOT in AE install");
}
for(i = presetPath.length;i < ffxPath.length;i++)
{
ffxFile += ("/" + ffxPath[i]);
}
buttonsPl.gpParam.gpCommand.val.text = File.decode(String(ffxFile));
xml.btns.btn[buttonsPl.gpList.list.selection.index].command["@value"] = ffxFile;
if((buttonsPl.gpParam.gpName.val.text == "btn") || (buttonsPl.gpParam.gpTip.val.text == "Button"))
{
longName = File.decode(ffxPath[ffxPath.length - 1]).replace(RegExp("[0-9\\+\\/\\=\\(\\)]","g")," ");
mNwords = longName.split(" ");
shortName = "";
for (  i=0 ; i<mNwords.length ; i = i+1)
{
shortName += mNwords[i].substr(0,1);
}
if(buttonsPl.gpParam.gpName.val.text == "btn")
{
buttonsPl.gpParam.gpName.val.text = shortName.toLowerCase();
buttonsPl.gpParam.gpName.val.notify("onChange");
}
if(buttonsPl.gpParam.gpTip.val.text == "Button")
{
buttonsPl.gpParam.gpTip.val.text = longName;
buttonsPl.gpParam.gpTip.val.notify("onChange");
}
}
}
presetFile = null;
}
}
}
;
buttonsPl.gpParam.gpCommand.gpHelpBtn.scriptBtn.onClick = function ()
{
var mNwords,i,scriptFile,j,scriptFolder,path,jsxPath,longName,scriptPath,jsxFile,shortName,isDockable,extensionFilter;
{
if(String(buttonsPl.gpParam.gpType.val.selection) == "SCRIPT LAUNCHER")
{
path = "";
($.os.indexOf("Win") != -1)?path = Folder.appPackage.fsName + "/Scripts/":path = Folder.appPackage.parent.fsName + "/Scripts/";
scriptFolder = new Folder(path);
scriptFile = new File();
if(scriptFolder.exists)
{
scriptFile.changePath(scriptFolder);
}
else
{
scriptFile.changePath(new Folder(Folder.appPackage.fsName));
}
extensionFilter = ($.os.indexOf("Mac") != -1)?jsxImportFilter:"JSX files:*.jsx,*.jsxbin,*.js";
scriptFile = scriptFile.openDlg("Select a script file",extensionFilter,false);
if(scriptFile && scriptFile.exists)
{
jsxPath = scriptFile.toString().split("/");
scriptPath = scriptFolder.toString().split("/");
jsxFile = "";
for(i = scriptPath.length;i < jsxPath.length;i++)
{
jsxFile += ("/" + jsxPath[i]);
}
isDockable = false;
for (  j=0 ; j<jsxPath.length ; j = j+1)
{
if(File.decode(jsxPath[j]).match("ScriptUI Panels") != null)
{
isDockable = true;
}
}
if(isDockable)
{
if(confirm("\nThis is a Dockable script. It is recommended to use a 'MENU' button type for them.\n\nWould you like to switch to 'MENU' button type now ?",true,"Warning Dockable Script"))
{
buttonsPl.gpParam.gpType.val.selection = IdType("MENU");
}
else
{
isDockable = false;
}
}
buttonsPl.gpParam.gpCommand.val.text = isDockable?File.decode(jsxPath[jsxPath.length - 1]):File.decode(String(jsxFile));
xml.btns.btn[buttonsPl.gpList.list.selection.index].command["@value"] = isDockable?File.decode(jsxPath[jsxPath.length - 1]):jsxFile;
if((buttonsPl.gpParam.gpName.val.text == "btn") || (buttonsPl.gpParam.gpTip.val.text == "Button"))
{
longName = File.decode(jsxPath[jsxPath.length - 1]).replace(RegExp("[0-9\\+\\/\\=\\(\\)]","g")," ");
mNwords = longName.split(" ");
shortName = "";
for (  i=0 ; i<mNwords.length ; i = i+1)
{
shortName += mNwords[i].substr(0,1);
}
if(buttonsPl.gpParam.gpName.val.text == "btn")
{
buttonsPl.gpParam.gpName.val.text = shortName.toLowerCase();
buttonsPl.gpParam.gpName.val.notify("onChange");
}
if(buttonsPl.gpParam.gpTip.val.text == "Button")
{
buttonsPl.gpParam.gpTip.val.text = longName;
buttonsPl.gpParam.gpTip.val.notify("onChange");
}
}
}
scriptFile = null;
}
}
}
;
buttonsPl.gpValid.okBtn.onClick = function ()
{
{
if(me.SaveXml(me.xmlFile,xml))
{
me.XML = new XML(me.LoadXml(me.xmlFile));
me.UI.panels.gpBtn.remove(0);
me.GetButtonsString(me.UI.panels.gpBtn);
me.xmlBackup = me.XML;
editWin.close();
me.UI.btns.edit.enabled = true;
}
}
}
;
buttonsPl.gpValid.cancelBtn.onClick = function ()
{
{
me.XML = new XML(me.xmlBackup);
editWin.close();
me.xmlBackup = null;
me.UI.btns.edit.enabled = true;
}
}
;
buttonsPl.gpValid.importBtn.onClick = function ()
{
var i;
{
if(me.ImportXML())
{
buttonsPl.gpList.list.removeAll();
xml = me.XML;
for (  i=0 ; i<xml.btns.btn.length() ; i = i+1)
{
buttonsPl.gpList.list.add("item",xml.btns.btn[i].shortName["@value"]);
}
}
}
}
;
buttonsPl.gpValid.exportBtn.onClick = function ()
{
{
me.ExportXML(xml);
}
}
;
buttonsPl.gpValid.aboutBtn.onClick = function ()
{
{
me.AboutDlg();
}
}
;
generalPl = panels.generals;
generalPl.gpBtnSize.width.text = xml.general.btnSX;
generalPl.gpBtnSize.height.text = xml.general.btnSY;
generalPl.gpBtnSize.width.onChange = function ()
{
{
xml.general.btnSX = generalPl.gpBtnSize.width.text;
}
}
;
generalPl.gpBtnSize.height.onChange = function ()
{
{
xml.general.btnSY = generalPl.gpBtnSize.height.text;
}
}
;
if(me.xmlFile)
{
generalPl.gpXMLPath.val.text = me.xmlFile.fsName;
}
generalPl.gpXMLPath.val.onChange = function ()
{
{
me.xmlFile.changePath(generalPl.gpXMLPath.val.text);
app.settings.saveSetting(ftTB_SettingsName,"xmlFile",me.xmlFile.toString());
}
}
;
generalPl.gpXMLPath.btn.onClick = function ()
{
var extensionFilter,tempFolder;
{
extensionFilter = ($.os.indexOf("Mac") != -1)?xmlImportFilter:"XML files:*.xml";
tempFolder = File(("~/Desktop/" + ftTB_ScriptName) + "_Config.xml").saveDlg("Where do you want your config file to be saved","XML files:*.xml");
if(tempFolder)
{
me.xmlFile = new File(tempFolder);
app.settings.saveSetting(ftTB_SettingsName,"xmlFile",me.xmlFile.toString());
generalPl.gpXMLPath.val.text = me.xmlFile.fsName;
}
tempFolder = null;
}
}
;
editWin.layout.layout(true);
if(editWin instanceof Window)
{
editWin.center();
editWin.show();
}
editWin.onClose = function ()
{
{
me.XML = new XML(me.xmlBackup);
me.xmlBackup = null;
me.UI.btns.edit.enabled = true;
}
}
;
}
}
;
this.AddXMLBtn = function (xml,position)
{
var newBtnIndex,newBtn;
{
newBtn = new XML("<btn> \n\t\t\t\t\t\t\t\t\t\t\t\t<shortName value=\"btn\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<longName value=\"Button\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<commandType>EFFECT</commandType>\n\t\t\t\t\t\t\t\t\t\t\t\t<command />\n\t\t\t\t\t\t\t\t\t\t\t\t<iconFile></iconFile>\n\t\t\t\t\t\t\t\t\t\t\t\t<iconEmbed />\n\t\t\t\t\t\t\t\t\t\t\t </btn>");
xml.btns.insertChildAfter(position,newBtn);
newBtnIndex = position?(position.childIndex() + 1):0;
return  newBtnIndex;
}
}
;
this.MoveBtnUp = function (xml,currentPosition)
{
var btnBackup,aboveBtn;
{
btnBackup = new XML(xml.btns.btn[currentPosition].toString());
aboveBtn = xml.btns.btn[currentPosition - 1];
xml.btns.insertChildBefore(aboveBtn,btnBackup);
delete xml.btns.btn[currentPosition + 1];
return  currentPosition - 1;
}
}
;
this.MoveBtnDown = function (xml,currentPosition)
{
var btnBackup,underBtn;
{
btnBackup = new XML(xml.btns.btn[currentPosition].toString());
underBtn = xml.btns.btn[currentPosition + 1];
xml.btns.insertChildAfter(underBtn,btnBackup);
delete xml.btns.btn[currentPosition];
return  currentPosition + 1;
}
}
;
this.ImportXML = function ()
{
var contents,importFile,extensionFilter;
{
extensionFilter = ($.os.indexOf("Mac") != -1)?xmlImportFilter:"XML files:*.xml";
importFile = File.openDialog("Select the config file you want to import",extensionFilter);
if(importFile)
{
importFile.open("r");
contents = importFile.read();
importFile.close();
me.XML = new XML(contents);
return  true;
}
return  false;
}
}
;
this.ExportXML = function (xml)
{
var exportFile;
{
exportFile = File(("~/Desktop/" + ftTB_ScriptName) + "_Config.xml").saveDlg("Where do you want to export your Config File","XML files:*.xml");
if(exportFile)
{
exportFile.open("w");
exportFile.write(xml);
exportFile.close();
}
}
}
;
this.AboutDlg = function ()
{
var dlg,panels,content,res;
{
content = "ft-Toolbar\n\n \n\tCopyright (c) 2010 Francois Tarlier\n \n\thttp://www.francois-tarlier.com \n\n \n\t该脚本赋予你自定义一个最常用的特效和命令的工具栏.\n\n \n\t工具栏的功能 : \n \n\t* 编辑界面: 添加,删除,命令,配置您的工具栏按钮\n\n \n\t* 5种按钮:\n \n\t\t- EFFECT : 设置您想要使用的效果名称.\n \n\t\t- ANIMATION PRESET : 选择应用一个动画预设文件（FFX）.\n \n\t\t- SCRIPT LAUNCHER : 选择启用一个脚本文件按 (.jsx or .jsxbin).\n \n\t\t- MENU : 设置任何你要调用的菜单项的确切名称. 例如：时间反转关键帧.\n \n\t\t- JAVASCRIPT : 键入任何AE理解的脚本命令，更先进的，你还可以用它做一些疯狂的宏命令. \n文档: http://www.adobe.com/products/aftereffects/pdfs/aftereffectscs3_scripting_guide.pdf\n你在这里可以找到JavaScript片段: http://www.smipple.net/tag/ft-toolbar (随意添加自己的, 并标记到: ft-Toolbar) \n\t\t\t- 效果名称：这需要的效果匹配名称。如果你不知道或不肯定效果匹配名称，应用层的作用，选择它，并点击此按钮。它会为你“匹配名称”。匹配独特的名称，让AE使用，以确定具体的效果，即使它们具有相同的名称。.\n \n\t\t- OS : 可以在这里设置你的终端上运行的任何操作系统命令。例如，计算器（Windows）或打开一个计算器（Mac），将启动计算器\n\n \n\t* 按钮图标 : 您可以指定一个自定义图像图标到每个按钮。所有的图标将被下载并保存到配置文件。当您导出另一台机器上使用的配置文件（XML），将包括所有的图标。.\n\n \n\t* 按钮尺寸 : 设置所有按钮尺寸\n\n \n\t* 导入/导出 : 可以导入和导出配置文件使多个计算机上的配置相同，或制作备份\n\n \n\t* 配置文件路径 (xml) : 你可以设置保存的配置文件的路径（XML）到任何地方。（即相同的配置，以配合您的电脑同步到Dropbox文件夹）. 配置文件将包括任何自定义图标的编码版本.\n\n ";
dlg = new Window("dialog","About",undefined,{resizeable:false});
res = "group{orientation:'column', alignment:['fill','fill'], alignChildren:['right','center'], margins: 0, spacing: 0, \n\t\t\t\t\t\t\t\t\teditTxt:EditText { properties:{multiline:true,readonly:true}, preferredSize:[400,300]}, \n\t\t\t\t\t\t\t\t\tgpBtns:Group{orientation:'row', alignment:['fill','fill'], alignChildren:['center','center'], margins: 0, spacing: 0, \n\t\t\t\t\t\t\t\t\t\t\t\t\t\tsiteBtn: Button{ text: '网站',preferredSize: [60,20], helpTip:'www.francois-tarlier.com'},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tokBtn: Button{ text: '确定',preferredSize: [60,20], helpTip:'关闭'},\n\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t}";
panels = dlg.add(res);
panels.editTxt.text = content;
panels.gpBtns.siteBtn.onClick = function ()
{
{
OpenWebLink("http://www.francois-tarlier.com");
}
}
;
panels.gpBtns.okBtn.onClick = function ()
{
{
dlg.close();
}
}
;
dlg.layout.layout(true);
if(dlg instanceof Window)
{
dlg.center();
dlg.show();
}
}
}
;
}
}
function IdType(typeName)
{
var id;
{
switch (String(typeName))
{

case "EFFECT":
{
id = 0;
break ;
}

case "ANIMATION PRESET":
{
id = 1;
break ;
}

case "SCRIPT LAUNCHER":
{
id = 2;
break ;
}

case "MENU":
{
id = 3;
break ;
}

case "JAVASCRIPT":
{
id = 4;
break ;
}

case "OS":
{
id = 5;
break ;
}
}
return  id;
}
}
function GetIcon(iconFile,b64Str)
{
var retFile,binStr;
{
retFile = iconFile;
if(! retFile.exists)
{
binStr = Base64Decode(b64Str);
retFile = new File(retFile.fsName);
retFile.encoding = "BINARY";
retFile.open("w");
retFile.write(binStr);
retFile.close();
}
return  retFile;
}
}
function Icon2b64(iconFile)
{
var b64Str,retFile,binStr;
{
retFile = iconFile;
if(retFile.exists)
{
retFile.encoding = "BINARY";
retFile.open("r");
binStr = retFile.read();
retFile.close();
b64Str = Base64Encode(binStr);
return  b64Str;
}
return  false;
}
}
function Base64Decode(input)
{
var output,i,chr1,chr2,chr3,enc1,enc2,enc3,enc4,key;
{
output = "";
i = 0;
input = input.replace(RegExp("[^A-Za-z0-9\\+\\/\\=]","g"),"");
key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
while (i < input.length)
{
enc1 = key.indexOf(input.charAt(i++));
enc2 = key.indexOf(input.charAt(i++));
enc3 = key.indexOf(input.charAt(i++));
enc4 = key.indexOf(input.charAt(i++));
chr1 = (enc1 << 2) | (enc2 >> 4);
chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
chr3 = ((enc3 & 3) << 6) | enc4;
output = output + String.fromCharCode(chr1);
if(enc3 != 64)
{
output = output + String.fromCharCode(chr2);
}
if(enc4 != 64)
{
output = output + String.fromCharCode(chr3);
}
}
return  output;
}
}
function Base64Encode(input)
{
var output,i,chr1,chr2,chr3,enc1,enc2,enc3,enc4,key;
{
output = "";
i = 0;
key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
while (i < input.length)
{
chr1 = input.charCodeAt(i++);
chr2 = input.charCodeAt(i++);
chr3 = input.charCodeAt(i++);
enc1 = chr1 >> 2;
enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
enc4 = chr3 & 63;
if(isNaN(chr2))
{
enc3 = enc4 = 64;
}
else
if(isNaN(chr3))
{
enc4 = 64;
}
output = (((output + key.charAt(enc1)) + key.charAt(enc2)) + key.charAt(enc3)) + key.charAt(enc4);
}
return  output;
}
}
function CheckImageSize(file)
{
var size;
{
myImage = ScriptUI.newImage(file);
size = new Array(myImage.size[0],myImage.size[1]);
myImage = null;
return  size;
}
}
function OpenWebLink(url)
{
var cmd;
{
cmd = "";
if($.os.indexOf("Win") != -1)
{
cmd = "explorer " + String(url);
}
else
{
cmd += (("open \"" + String(url)) + "\"");
}
try 
{
system.callSystem(cmd);
}

catch (e)
{
alert(e);
}
}
}
function pngImportFilter(f)
{
{
return  f.name.match(RegExp("\\.png$","i"));
}
}
function ffxImportFilter(f)
{
{
return  f.name.match(RegExp("\\.ffx$","i"));
}
}
function xmlImportFilter(f)
{
{
return  f.name.match(RegExp("\\.xml$","i"));
}
}
function jsxImportFilter(f)
{
{
return  f.name.match(RegExp("\\.(jsx|jsxbin|js)$","i"));
}
}
function ftToolbar_trial_serialization(cmd)
{
var doPrompt,myReg,regOK,myLicence,theLicense,strScriptName,theRegistration,supportEmail,trialLengthDays,trialLengthLaunches,strTrialUrl,strExpiredAlert,strRegSuccess,strInvalidCode,strCorruptedCode,strTrialThanks,strTrialTxt,strTrialTxt2,strTrialWelcomeHeader,strErrScriptAccess,prefsSectionName,prefsName,winProgramFiles,winBrowserCmd,macBrowserCmdStart,macBrowserCmdEnd,cmdKey,strTrialWelcomeMsg,privateNum,prefHeader,prefSection1,prefSection2;
{
function checkTrial()
{ trialExpired = false; return  trialExpired;
var launchCount,trialLengthSoFar,trialDaysLeft,launchesLeft,trialExpired,today,one_day,todayInMsFixed,trialStartDate;
{
trialExpired = false;
today = new Date();
one_day = 0x5265C00;
todayInMsFixed = (parseInt(today,10) / one_day) / 0xF4240.toFixed(6);
if(app.settings.haveSetting(prefHeader,prefSection1))
{
trialStartDate = app.settings.getSetting(prefHeader,prefSection1);
}
else
{
trialStartDate = todayInMsFixed;
app.settings.saveSetting(prefHeader,prefSection1,trialStartDate);
}
if(app.settings.haveSetting(prefHeader,prefSection2))
{
launchCount = parseInt(app.settings.getSetting(prefHeader,prefSection2),16) / 1000000000000.000000;
app.settings.saveSetting(prefHeader,prefSection2,(launchCount + 1) * 1000000000000.000000.toString(16));
}
else
{
launchCount = 1;
app.settings.saveSetting(prefHeader,prefSection2,launchCount * 1000000000000.000000.toString(16));
}
app.preferences.saveToDisk();
trialLengthSoFar = Math.max(0,(parseInt(today,10) / one_day) - (trialStartDate * 0xF4240));
clearOutput();
if((trialLengthSoFar > trialLengthDays) || (todayInMsFixed < trialStartDate))
{
trialDaysLeft = 0;
}
else
{
trialDaysLeft = Math.ceil(trialLengthDays - trialLengthSoFar);
}
launchesLeft = Math.max(0,trialLengthLaunches - launchCount);
if(trialDaysLeft > 0)
{
writeLn(strTrialThanks);
writeLn(strTrialTxt.replace(RegExp("%E","g"),trialDaysLeft));
}
else
{
writeLn(strTrialThanks);
writeLn(strTrialTxt2.replace(RegExp("%E","g"),launchesLeft));
}
if(((trialLengthSoFar > trialLengthDays) && (launchCount > trialLengthLaunches)) || (todayInMsFixed < trialStartDate))
{
trialExpired = true;
}
return  trialExpired;
}
}
function checkCode(doPrompt,myReg,privateNum)
{
var myRegArray,tempKey,nameEncode,goToUrl,name,key;
{
myLicense = "0";
if(doPrompt)
{
myReg = prompt(strTrialWelcomeMsg,"trial",strTrialWelcomeHeader);
}
regOK = false;  // myLicense ="Monter"; return regOK?myLicense:"0";
if(myReg)
{
if(myReg.toLowerCase() != "trial")
{
myRegArray = myReg.split("**");
if(myRegArray.length == 3)
{
myLicense = myRegArray[2].substring(myRegArray[2].length - 3,myRegArray[2].length);
name = (myRegArray[0] + myRegArray[1]) + myLicense;
tempKey = myRegArray[2].substring(0,myRegArray[2].length - 3);
nameEncode = (((((((((name.length * name.charCodeAt(0)) + name.charCodeAt(Math.floor((name.length - 1) * 0.100000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.200000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.300000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.400000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.500000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.700000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.800000))) + name.charCodeAt(Math.floor((name.length - 1) * 0.900000))) + name.charCodeAt(name.length - 1);
key = nameEncode * privateNum;
if(key == tempKey)
{
if(doPrompt)
{
app.settings.saveSetting(prefsSectionName,prefsName,myReg);
app.preferences.saveToDisk();
alert(strRegSuccess);
}
regOK = true;
}
else
{
if(doPrompt)
{
alert(strInvalidCode);
checkCode(doPrompt);
}
else
{
alert(strCorruptedCode);
doPrompt = true;
app.settings.saveSetting(prefsSectionName,prefsName,"bad");
app.preferences.saveToDisk();
checkCode(doPrompt);
}
}
}
else
{
alert(strInvalidCode);
doPrompt = true;
app.settings.saveSetting(prefsSectionName,prefsName,"bad");
app.preferences.saveToDisk();
checkCode(doPrompt);
}
}
else
{
if(checkTrial())
{
goToUrl = confirm(strExpiredAlert);
if(isSecurityPrefSet() && goToUrl)
openURL(strTrialUrl);
else
if(goToUrl)
alert(strErrScriptAccess);
}
else
{
myLicense = "trial";
regOK = true;
}
}
}
return  regOK?myLicense:"0";
}
}
function isSecurityPrefSet()
{
var securitySetting;
{
securitySetting = app.preferences.getPrefAsLong("Main Pref Section","Pref_SCRIPTING_FILE_NETWORK_SECURITY");
return  securitySetting == 1;
}
}
function XML(url)
{
{
if($.os.indexOf("Windows") != -1)
{
system.callSystem((("cmd /c \"" + winBrowserCmd) + url) + "\"");
}
else
{
system.callSystem((macBrowserCmdStart + url) + macBrowserCmdEnd);
}
}
}
function parseRegistration(checkReg)
{
var myReg,myLicense,myRegArray,regFirstName,regLastName,numLicenses,matchMutliLic,regName,regLicense,multiLicense,regHeader;
{
if(checkReg != null)
{
myReg = checkReg.replace(RegExp("_","g")," ");
myRegArray = myReg.split("**");
if(myRegArray.length == 3)
{
regFirstName = myRegArray[0];
regLastName = myRegArray[1];
numLicenses = 0;
matchMutliLic = regLastName.match(RegExp("([^\\(]+)\\(([0-9]+) Users\\)$",""));
if((matchMutliLic != null) && (matchMutliLic.length == 3))
{
regLastName = matchMutliLic[1];
numLicenses = parseFloat(matchMutliLic[2]);
}
regName = (regFirstName + " ") + regLastName;
regLicense = myRegArray[2].substring(myRegArray[2].length - 3,myRegArray[2].length);
multiLicense = (numLicenses > 1)?((" for " + numLicenses) + " Users"):" for 1 User";
switch (regLicense)
{

case "SUL":
{
myLicense = " - License" + multiLicense;
break ;
}

case "Pro":
{
myLicense = " - Pro License" + multiLicense;
break ;
}

case "STE":
{
myLicense = " - Site License";
break ;
}

case "psr":
{
myLicense = " - Pro Site License";
break ;
}
}
regHeader = (regName + " ") + myLicense;
}
else
{
alert("Registration length is incorrect.");
}
}
else
{
regHeader = "Trial";
}
return  regHeader;
}
}
if(cmd == undefined)
cmd = "license";
strScriptName = "ft-Toolbar";
supportEmail = "support@aescripts.com";
trialLengthDays = 14;
trialLengthLaunches = 25;
strTrialUrl = "http://aescripts.com/ft-toolbar/";
strExpiredAlert = localize({en:("Sorry, this trial version of the script has expired. \nYou can purchase a license at " + strTrialUrl) + "\n\nWould you like to go there now?",de:("Die Testversion des Skriptes ist leider abgelaufen.\n Du kannst unter " + strTrialUrl) + " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",fr:("D\xe9sol\xe9, cette version d'essais du script a expir\xe9. \nVous pouvez acheter une licence \xe0 " + strTrialUrl) + "\n\nVoulez vous y aller maintenant ?"});
strRegSuccess = localize({en:("Registration Successful\nThank you for purchasing " + strScriptName) + " and supporting the AE scripting community!",de:("Registrierung erfolgreich\nDanke f\xfcr den Kauf von " + strScriptName) + " und die Unterst\xfctzung der AE Scripting Community!",fr:("Enregistrement r\xe9ussi\nMerci d'avoir achet\xe9 " + strScriptName) + " et de contribuer \xe0 la communaut\xe9 de script AE"});
strInvalidCode = localize({en:"Sorry, the registration code is not valid\n\nIf you require assistance please contact " + supportEmail,de:"Entschuldigung, der Registrierungscode ist nicht g\xfcltig.\n\nWenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + supportEmail,fr:"D\xe9sol\xe9, le num\xe9ro de licence n'est pas valide\n\nSi vous avez besoin d'aide, merci de contacter " + supportEmail});
strCorruptedCode = localize({en:"Sorry, something must have happened to the registration code.  Please re-enter it at the prompt.\nIf you require assistance please contact " + supportEmail,de:"Entschuldigung, irgendetwas ist mit dem Registrierungscode passiert. Bitte gebe ihn erneut ein.\n\nWenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + supportEmail,fr:"D\xe9sol\xe9, il y a eu un probl\xe8me avec votre num\xe9ro de licence. Merci de bien vouloir l'entrer de nouveau \n\nSi vous avez besoin d'aide, merci de contacter " + supportEmail});
strTrialThanks = localize({en:("Thanks for trying " + strScriptName) + "!",de:("Danke, dass Du " + strScriptName) + " ausprobierst!",fr:("Merci d'utiliser " + strScriptName) + "!"});
strTrialTxt = localize({en:"%E days left in the trial",de:"%E Tage \xfcbrig f\xfcr die Testversion",fr:"Il vous reste %E jours d'essais"});
strTrialTxt2 = localize({en:"%E launches left in the trial",de:"%E Programmstarts \xfcbrig f\xfcr die Testversion",fr:"Il vous reste %E essais"});
strTrialWelcomeHeader = localize({en:"Welcome to " + strScriptName,de:"Willkommen bei " + strScriptName,fr:"Bienvenue sur " + strScriptName});
strErrScriptAccess = localize({en:"This script requires access to write files.\nGo to the \"General\" panel of the application preferences and make sure \"Allow Scripts to Write Files and Access Network\" is checked.",de:"Dieses Skript ben\xf6tigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik \"Allgemein\" und aktiviere die Option \"Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang\".",fr:"Ce script n\xe9cessite les droits d'\xe9criture de fichiers.\nAllez dans le panneau \"G\xe9n\xe9ral\" des pr\xe9f\xe9rences de l'application et cochez \n\"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau\""});
prefsSectionName = "FTToolbarSettings";
prefsName = strScriptName + "_Registration";
winProgramFiles = Folder.commonFiles.parent.fsName;
winBrowserCmd = ($.os.indexOf("XP") != -1)?(("\"" + winProgramFiles) + "\\Internet Explorer\\iexplore.exe\" "):"start ";
macBrowserCmdStart = "open \"";
macBrowserCmdEnd = "\"";
if($.os.indexOf("Mac") != -1)
{
cmdKey = "\u2318";
}
else
{
cmdKey = "Ctrl";
}
strTrialWelcomeMsg = localize({en:((("Please enter the license code.\nIf pasting the code with " + cmdKey) + "+V doesn't work try ") + ((parseFloat(app.version) >= 10)?"Right-Click and Paste":"Edit->Paste")) + "\nIf you need to retrieve your license you can do so at http://license.aescripts.com  To run in trial mode type: trial\n",de:("Bitte gebe den Lizenzcode ein. Wenn das Einf\xfcgen mit " + cmdKey) + "+V nicht funktioniert, versuche Bearbeiten->Einf\xfcgen\n Deinen Lizenzcode erf\xe4hrst Du unter http://license.aescripts.com. Um die Testversion zu starten, gebe \"trial\" ein.",fr:("Merci d'entrer votre num\xe9ro de licence.\nSi vous ne parvenez pas \xe0 coller le code avec " + cmdKey) + "+V essayez Clique droit et Coller \nSi vous avez besoin de retrouver votre num\xe9ro de licence vous pouvez aller sur http://license.aescripts.com Pour lancer en mode essais, tapez : trial\n"});
privateNum = 0x1D707;
prefHeader = "Texture Cache Options";
prefSection1 = "Max Texture Dimension";
prefSection2 = "Max Fragment Allowance";
if(cmd == "license")
{
if(app.settings.haveSetting(prefsSectionName,prefsName))
{
myReg = app.settings.getSetting(prefsSectionName,prefsName);
if(myReg == "bad")
{
doPrompt = true;
}
else
{
doPrompt = false;
}
theLicense = checkCode(doPrompt,myReg,privateNum);
}
else
{
doPrompt = true;
theLicense = checkCode(doPrompt,myReg,privateNum);
}
return  theLicense;
}
if(cmd == "parseReg")
{
if(app.settings.haveSetting(prefsSectionName,prefsName))
{
myReg = app.settings.getSetting(prefsSectionName,prefsName);
theRegistration = parseRegistration(myReg);
}
else
{
theRegistration = parseRegistration(null);
}
return  theRegistration;
}
}
}
betaMode = true;
betaExpiration = new Date(2011,1,1);
doRun = true;
/* ftToolbar_serial_Check = ftToolbar_trial_serialization("license");
if(ftToolbar_serial_Check != "0")
{
switch (ftToolbar_serial_Check)
{

case "trial":
{
doRun = true;
break ;
}

case "SUL":
{
doRun = true;
break ;
}

case "Pro":
{
break ;
}

default:
{
alert("Something must be wrong with your license, please contact support@aescripts.com");
break ;
}
}
}
 */
ftToolbar_registration = "注册给: ZHLMI 汉化" //+ ftToolbar_trial_serialization("parseReg");
if(doRun)
{
new FTToolbar().Init(this);
}
}
}
