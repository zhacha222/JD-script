/*
ruleId=d71b23a381ada0934039d890ad22ab8d  0.5元红包
ruleId=66d9058514891de12e96588697cc3bb3  3元红包
ruleId=b141ddd915d20f078d69f6910b02a60a  8元红包
ruleId=ed064605fdf60d4d94367e787eaf6cac  20元红包
ruleId=8609ec76a8a70db9a5443376d34fa26a  50元红包
ruleId=1848d61655f979f8eac0dd36235586ba  0.3元现金
ruleId=dac84c6bf0ed0ea9da2eca4694948440  1元现金
ruleId=53515f286c491d66de3e01f64e3810b2  3元现金
ruleId=da3fc8218d2d1386d3b25242e563acb8  8元现金
ruleId=7ea791839f7fe3168150396e51e30917  20元现金
ruleId=02b48428177a44a4110034497668f808  100元现金
使用代理：export JDPROXYURL="xxxxx"
定时：10 59 23 * * *  23点59分10秒
*/
const $ = new Env('大赢家提现');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const request = require("request");
let Yanchi = '40';  //执行间隔，每次xx毫秒
let ruleId = ["7ea791839f7fe3168150396e51e30917"];  //这里填写ruleId
let cookies = []
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookies.push(jdCookieNode[item])
    })
} else {
    cookies.push($.getdata('CookieJD'))
}

!(async () => {
  /*
    if (!cookies[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }
    */
    for (let i = 0; i < cookies.length; i++) {
        if (cookies[i]) {
            $.cookie = cookies[i];
            $.UserName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            const currentTime = await JDTIME();
            console.log(`当前时间：${currentTime}`);

            //定时
            let date = new Date();
            date.setHours(23);
            date.setMinutes(59);
            date.setSeconds(57);
            date.setMilliseconds(850);  //这里设置提现时间，时分秒毫秒
            let time = date.getTime();
            let nowtime = new Date().getTime();
            let waittime = time - nowtime;
            console.log(`等待 ${Math.floor(waittime / 1000)} 秒后开始执行`);
            await $.wait(waittime);
            for (let j = 1; j < 51; j++) {           ///循环提现次数
                const res = await dayingjiatx($.cookie, ruleId[0]);
                await new Promise(resolve => setTimeout(resolve, Yanchi));
                console.log(`${$.UserName}第${j}次提现结果：${res}`);
            }
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());



async function randomuserAgent() {
    let uuid = "", addressid = "", iosVer = "", iosV = "", clientVersion = "", iPhone = "", area = "", ADID = "", lng = "", lat = "";
    uuid = Array.from({length: 40}, () => (Math.random() * 36 | 0).toString(36)).join("");
    addressid = Array.from({length: 10}, () => (Math.random() * 10 | 0).toString(10)).join("");
    iosVer = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1"][Math.floor(Math.random() * 7)];
    iosV = iosVer.replace(".", "");
    clientVersion = ["10.3.0", "10.2.7", "10.2.4"][Math.floor(Math.random() * 3)];
    iPhone = ["8", "9", "10", "11", "12", "13"][Math.floor(Math.random() * 6)];
    area = Array.from({length: 2}, () => (Math.random() * 10 | 0).toString(10)).join("") + "" + Array.from({length: 4}, () => (Math.random() * 10 | 0).toString(10)).join("") + "" + Array.from({length: 5}, () => (Math.random() * 10 | 0).toString(10)).join("") + "" + Array.from({length: 4}, () => (Math.random() * 10 | 0).toString(10)).join("");
    ADID = Array.from({length: 8}, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("") + "-" + Array.from({length: 4}, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("") + "-" + Array.from({length: 4}, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("") + "-" + Array.from({length: 4}, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("") + "-" + Array.from({length: 12}, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("");
    lng = "119.31991256596" + (Math.random() * 999 | 0);
    lat = "26.1187118976" + (Math.random() * 999 | 0);
    let UserAgent = "";
if (!UserAgent) {
    return `jdapp;iPhone;10.0.4;${iosVer};${uuid};network/wifi;ADID/${ADID};model/iPhone${iPhone},1;addressid/${addressid};appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ${iosV} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1`;
} else {
    return UserAgent;
}
}


async function JDTIME() {
    return new Promise((resolve, reject) => {
      const url = 'https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5';
      const headers = {
        'Host': 'api.m.jd.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8',
        'Connection': 'keep-alive',
        'User-Agent': randomuserAgent(),
      };
      
      request({ url, headers }, (error, response, body) => {
        if (error) {
          reject(error);
        }
  
        const currentTime = JSON.parse(body).currentTime;
        const currentDate = new Date();
  
        if (currentTime === currentDate.getTime()) {
          resolve(currentTime);
        } else {
          // 将本地时间设置为与 API 返回的相同
          const offset = currentTime - currentDate.getTime();
          Date.now = function() {
            return Date.now() + offset;
          };
          resolve(currentTime);
        }
      });
    });
  }
/*  
  JDTIME().then(currentTime => {
    console.log(`当前时间: ${currentTime}`);
  }).catch(error => {
    console.error(`Error: ${error}`);
  });
    */


async function dayingjiatx(cookies, ruleId) {
    const date = new Date().getTime();
    const headers = {
        "Host": "api.m.jd.com",
        'Content-Type': 'text/plain',
        'Origin': 'https://wqs.jd.com',
        'User-Agent':randomuserAgent(),
        'Referer': 'https://wqs.jd.com/',
        "cookie": cookies
    };
  
    const options = {
      method: "GET",
      url: `https://api.m.jd.com/api?functionId=jxPrmtExchange_exchange&appid=cs_h5&body=%7B%22bizCode%22%3A%22makemoneyshop%22%2C%22ruleId%22%3A%22${ruleId}%22%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22%22%2C%22time%22%3A${date}%2C%22signStr%22%3A%22%22%7D`,
      headers: headers
    };
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        }
        if (response.statusCode == 200) {
          const jsonBody = JSON.parse(body);
          if (jsonBody.msg === "success") {
            resolve(jsonBody.msg);
          } else {
            resolve(jsonBody.msg);
          }
        } else {
          resolve(response.statusCode);
        }
      });
    });
  }

/*
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
      if (error) {
      reject(403);
      } else {
      const responseBody = JSON.parse(body);
      if (responseBody.msg) {
      resolve(responseBody.msg);
      } else {
      reject(403);
      }
      }
      });
      });
      }
  
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          const data = JSON.parse(body);
          if (data.hasOwnProperty("msg") && data.hasOwnProperty("prizeName")) {
            resolve(data.prizeName);
          } else {
            resolve(data.msg);
          }
        }
      });
    });
  }

*/

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
