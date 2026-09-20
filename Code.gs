const SHEET_ID = '請貼上你的 Google Sheet ID';
function doGet(e){const action=e.parameter.action||'read';if(action==='read')return json_(readAll_());return json_({error:'unknown action'});}
function doPost(e){try{const body=JSON.parse(e.postData.contents);if(body.action==='save'){writeAll_(body.data);return json_({ok:true});}return json_({error:'unknown action'});}catch(err){return json_({error:String(err)});}}
function readAll_(){const ss=SpreadsheetApp.openById(SHEET_ID);return {schedule:read_(ss,'行程'),packing:read_(ss,'行李'),transport:read_(ss,'交通'),expenses:read_(ss,'記帳')};}
function read_(ss,name){const sh=ss.getSheetByName(name);if(!sh||sh.getLastRow()<2)return [];const values=sh.getDataRange().getValues(),heads=values.shift();return values.map(r=>Object.fromEntries(heads.map((h,i)=>[h,r[i]])));}
function writeAll_(data){const ss=SpreadsheetApp.openById(SHEET_ID);const map={schedule:'行程',packing:'行李',transport:'交通',expenses:'記帳'};Object.keys(map).forEach(k=>write_(ss,map[k],data[k]||[]));}
function write_(ss,name,rows){let sh=ss.getSheetByName(name)||ss.insertSheet(name);sh.clearContents();if(!rows.length)return;const heads=Object.keys(rows[0]);sh.getRange(1,1,1,heads.length).setValues([heads]);sh.getRange(2,1,rows.length,heads.length).setValues(rows.map(r=>heads.map(h=>r[h]??'')));sh.setFrozenRows(1);}
function json_(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}
