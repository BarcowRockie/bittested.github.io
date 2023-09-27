function t_menu__highlightActiveLinks(t)
{
    var r, o = window.location.href, i = window.location.pathname; "/" === o[o.length - 1] && (r = o.slice(0, -1)), "/" === i[i.length - 1] && (i = i.slice(0, -1)), "/" === i[0] && (i = i.slice(1)), "" === i && (i = "/"); t = document.querySelectorAll(t); Array.prototype.forEach.call(t, function (t) { var e, n = t.getAttribute("href"); n && ((e = t.href) !== o && e !== i && n !== o && n !== i && r !== o && r !== i || t.classList.add("t-active")) })
}
function t_menu__findAnchorLinks(t, e) { var n = document.getElementById("rec" + t), t = e + '[href*="#"]:not(.tooltipstered)', t = n ? n.querySelectorAll(t) : []; t.length && t_menu__updateActiveLinks(t, e) } function t_menu__updateActiveLinks(r, t) { t = t.slice(2); t = ".t" + (t = parseInt(t, 10)), r = Array.prototype.slice.call(r); var o = null, n = [], i = {}; (r = r.reverse()).forEach(function (t) { var e = t_menu__getSectionByHref(t); e && e.id && (n.push(e), i[e.id] = t) }), t_menu__updateSectionsOffsets(n), n.sort(function (t, e) { t = parseInt(t.getAttribute("data-offset-top"), 10) || 0; return (parseInt(e.getAttribute("data-offset-top"), 10) || 0) - t }), window.addEventListener("resize", t_throttle(function () { t_menu__updateSectionsOffsets(n) }, 200)); t = document.querySelectorAll(t); Array.prototype.forEach.call(t, function (t) { t.addEventListener("displayChanged", function () { t_menu__updateSectionsOffsets(n) }) }), setInterval(function () { t_menu__updateSectionsOffsets(n) }, 5e3), t_menu__highlightNavLinks(r, n, i, o), r.forEach(function (e, n) { e.addEventListener("click", function () { var t = t_menu__getSectionByHref(e); !e.classList.contains("tooltipstered") && t && t.id && (r.forEach(function (t, e) { e === n ? t.classList.add("t-active") : t.classList.remove("t-active") }), o = t.id) }) }), window.addEventListener("scroll", t_throttle(function () { o = t_menu__highlightNavLinks(r, n, i, o) }, 100)) } function t_menu__updateSectionsOffsets(t) { t.forEach(function (t) { var e = t.getBoundingClientRect().top + window.pageYOffset; t.setAttribute("data-offset-top", e.toString()) }) } function t_menu__getSectionByHref(t) { if (t) { var e = t.getAttribute("href"), n = e ? e.replace(/\s+/g, "") : ""; if (0 === n.indexOf("/") && (n = n.slice(1)), e && t.matches('[href*="#rec"]')) return n = n.replace(/.*#/, ""), document.getElementById(n); n = e ? e.trim() : "", e = -1 !== n.indexOf("#") && n.indexOf("#"); "number" != typeof e && "number" != typeof (e = -1 !== n.indexOf("/") && n.indexOf("/")) || (n = n.slice(e + 1)); n = '.r[data-record-type="215"] a[name="' + n + '"]'; return document.querySelector(n) ? document.querySelector(n).closest(".r") : null } } function t_menu__highlightNavLinks(t, e, n, r) { if (document.documentElement.classList.contains("t-body_scroll-locked")) return null; var o = window.pageYOffset, i = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight), a = r, l = e.length ? e[e.length - 1] : null, l = l && parseInt(l.getAttribute("data-offset-top"), 10) || 0; if (e.length && null === r && o + 300 < l) return t.forEach(function (t) { t.classList.remove("t-active") }), null; for (var u = 0; u < e.length; u++){ var s = parseInt(e[u].getAttribute("data-offset-top"), 10), c = e[u].id ? n[e[u].id] : null; if (s <= o + 300 || 0 === u && o >= i - window.innerHeight) { null === r && c && !c.classList.contains("t-active") ? (t.forEach(function (t) { t.classList.remove("t-active") }), c && c.classList.add("t-active"), a = null) : null !== r && e[u].id && r === e[u].id && (a = null); break } } return a } function t_menu__setBGcolor(t, e) { e = document.querySelectorAll(e); Array.prototype.forEach.call(e, function (t) { 980 < window.innerWidth ? "yes" === t.getAttribute("data-bgcolor-setbyscript") && (t.style.backgroundColor = t.getAttribute("data-bgcolor-rgba")) : (t.style.backgroundColor = t.getAttribute("data-bgcolor-hex"), t.setAttribute("data-bgcolor-setbyscript", "yes"), t.style.transform && (t.style.transform = ""), t.style.opacity && (t.style.opacity = "")) }) } function t_menu__showFixedMenu(t, e) { var n = [".t280", ".t282", ".t450", ".t451", ".t466", ".t453"].some(function (t) { return t === e }); if (!(window.innerWidth <= 980) || n) { t = document.getElementById("rec" + t); if (!t) return !1; t = t.querySelectorAll(e); Array.prototype.forEach.call(t, function (t) { var e, n = t.getAttribute("data-appearoffset"); n && (-1 !== n.indexOf("vh") && (n = Math.floor(window.innerHeight * (parseInt(n) / 100))), n = parseInt(n, 10), e = t.clientHeight, "number" == typeof n && window.pageYOffset >= n ? t.style.transform === "translateY(-" + e + "px)" && t_menu__slideElement(t, e, "toBottom") : "translateY(0px)" === t.style.transform ? t_menu__slideElement(t, e, "toTop") : (t.style.transform = "translateY(-" + e + "px)", t.style.opacity = "0")) }) } } function t_menu__changeBgOpacity(t, e) { var n = ["t280", "t282", "t451", "t466"].some(function (t) { return -1 !== e.indexOf(t) }); if (!(window.innerWidth <= 980) || n) { t = document.getElementById("rec" + t); if (!t) return !1; t = t.querySelectorAll(e); Array.prototype.forEach.call(t, function (t) { var e = t.getAttribute("data-bgcolor-rgba"), n = t.getAttribute("data-bgcolor-rgba-afterscroll"), r = t.getAttribute("data-bgopacity"), o = t.getAttribute("data-bgopacity-two"), i = t.getAttribute("data-menushadow") || "0", a = "100" === i ? i : "0." + i; t.style.backgroundColor = 20 < window.pageYOffset ? n : e, 20 < window.pageYOffset && "0" === o || window.pageYOffset <= 20 && "0.0" === r || " " === i ? t.style.boxShadow = "none" : t.style.boxShadow = "0px 1px 3px rgba(0,0,0," + a + ")" }) } } function t_menu__createMobileMenu(n, r) { var o, t, i, a, l, e, u, s, c = document.getElementById("rec" + n); c && (t = (o = c.querySelector(r)) ? o.getAttribute("data-mobile-burgerhook") : "", u = c.querySelector(r + "__mobile"), i = u || c.querySelector(".tmenu-mobile"), a = u ? r.slice(1) + "_opened" : "tmenu-mobile_opened", l = "t-menuburger-opened", i && (o && o.classList.contains(r.slice(1) + "__mobile_burgerhook") && t ? (i.querySelector(".tmenu-mobile__burger") ? s = i.querySelector(".tmenu-mobile__burger") : i.querySelector(".t-menuburger") && (s = i.querySelector(".t-menuburger")), s && (e = s.parentElement, (u = document.createElement("a")).href = t, e && (u.appendChild(s), e.appendChild(u)))) : (s = i.querySelector(".t-menuburger"), i.addEventListener("click", function (t) { t.target.closest("a") || (i.classList.contains(a) ? (t_menu__FadeOut(o, 300), i.classList.remove(a), s.classList.remove(l)) : (t_menu__fadeIn(o, 300, function () { o.style.transform && (o.style.transform = ""), o.style.opacity && (o.style.opacity = "") }), i.classList.add(a), s.classList.add(l), o.classList.contains("tmenu-mobile__menucontent_fixed") && (t = getComputedStyle(i).height, o.style.top = t)), t_menu_checkOverflow(n, r)) }))), window.innerWidth < 980 && c.addEventListener("click", function (t) { var e; o && o.classList.contains("tmenu-mobile__menucontent_fixed") && ((e = t.target.closest(".t-menu__link-item, .t978__submenu-link, .t966__menu-link, .t-menusub__link-item, .t-btn")) && (["t978__menu-link_hook", "t978__tm-link", "t966__tm-link", "t794__tm-link", "t-menusub__target-link"].some(function (t) { return e.classList.contains(t) }) ? o.addEventListener("menuOverflow", function () { t_menu_checkOverflow(n, r) }) : (t_menu__FadeOut(o, 300), i && i.classList.remove(a), i && s.classList.remove(l)))) }), window.addEventListener("resize", t_throttle(function () { 980 < window.innerWidth && (o && (o.style.opacity = ""), o && (o.style.display = ""), o && (o.style.top = ""), i && i.classList.remove(a)), t_menu_checkOverflow(n, r) }, 200))) } function t_menu_checkOverflow(t, e) { var n, r = document.getElementById("rec" + t), o = r ? r.querySelector(e) : null; !o || (n = r.querySelector(e + "__mobile") || r.querySelector(".tmenu-mobile")) && (t = n.offsetHeight, e = document.documentElement.clientHeight, r = o.style.position || window.getComputedStyle(o).position, n = o.offsetHeight, "fixed" === r && e - t < n && (o.style.overflow = "auto", o.style.maxHeight = "calc(100% - " + t + "px)")) } function t_menu__FadeOut(t, e, n) { if (!t) return !1; var r = 1; e = parseInt(e, 10); var o = setInterval(function () { t.style.opacity = r, (r -= .1) <= .1 && (t.style.opacity = "0", t.style.display = "none", "function" == typeof n && n(), clearInterval(o)) }, 0 < e ? e / 10 : 40) } function t_menu__fadeIn(t, e, n) { if (!t) return !1; if (("1" === getComputedStyle(t).opacity || "" === getComputedStyle(t).opacity) && "none" !== getComputedStyle(t).display) return !1; var r = 0, e = 0 < (e = parseInt(e, 10)) ? e / 10 : 40; t.style.opacity = r, t.style.display = "block"; var o = setInterval(function () { t.style.opacity = r, 1 <= (r += .1) && (t.style.opacity = "1", "function" == typeof n && n(), clearInterval(o)) }, e) } function t_menu__slideElement(t, e, n) { var r = "toTop" === n ? 0 : e, o = "toTop" === n ? 1 : 0, i = setInterval(function () { t.style.transform = "translateY(-" + r + "px)", t.style.opacity = o.toString(), o = "toTop" === n ? o - .1 : o + .1, r = "toTop" === n ? r + e / 20 : r - e / 20, "toTop" === n && e <= r && (t.style.transform = "translateY(-" + e + "px)", t.style.opacity = "0", clearInterval(i)), "toBottom" === n && r <= 0 && (t.style.transform = "translateY(0px)", t.style.opacity = "1", clearInterval(i)) }, 10) } function t_menu__interactFromKeyboard(t) { var i, a, l, u, s, c, d, f, m, _, y, p, b, t = document.getElementById("rec" + t); t && (i = t.querySelectorAll('[role="menubar"] > li > a'), t = t.querySelectorAll('[role="menubar"]  > li li'), a = 9, l = 13, u = 27, s = 32, c = 37, d = 38, f = 39, m = 40, _ = 0, p = function (t) { t === i.length ? t = 0 : t < 0 && (t = i.length - 1), i[t].focus(), _ = t }, b = function (t, e) { t = t.querySelectorAll("a"); e == t.length ? e = 0 : e < 0 && (e = t.length - 1), t[e].focus(), y = e }, Array.prototype.forEach.call(i, function (t, e) { var n, r, o; 0 == e ? t.setAttribute("tabindex", "0") : t.setAttribute("tabindex", "-1"), t.addEventListener("focus", function () { y = 0, Array.prototype.forEach.call(i, function (t) { t.hasAttribute("aria-haspopup") && t.setAttribute("aria-expanded", "false") }), 0 !== _ && 0 === Number(this.getAttribute("tabindex")) && this.setAttribute("tabindex", -1) }), (n = t).addEventListener("keydown", function (t) { var e = this.parentNode.querySelector(".t-menusub__list"); switch (t.keyCode) { case f: p(_ + 1); break; case c: p(_ - 1); break; case a: if (!t.shiftKey && _ <= i.length - 2) p(_ + 1); else { if (!(t.shiftKey && 0 < _)) return void n.setAttribute("tabindex", "0"); p(_ - 1) } break; case l: case m: case s: if (!e) return; this.click(), b(e, y = 0); break; case d: if (!e) return; this.click(), y = e.querySelectorAll("li").length - 1, b(e, y) }t.preventDefault() }), t.parentNode.querySelector(".t-menusub__menu") && (o = (r = t).parentNode.querySelector(".t-menusub__menu"), r.addEventListener("click", function (t) { var e; return "true" !== this.getAttribute("aria-haspopup") || "false" != this.getAttribute("aria-expanded") && null != this.getAttribute("aria-expanded") ? this.setAttribute("aria-expanded", "false") : (this.setAttribute("aria-expanded", "true"), e = (e = r.nextElementSibling) ? e.getAttribute("data-submenu-margin") : 0, t_menusub__showSubmenu(r, o, e)), t.preventDefault(), !1 })) }), Array.prototype.forEach.call(t, function (t) { var r, o; t.setAttribute("tabindex", "-1"), r = (t = t).closest(".t-menusub__menu"), o = !1, t.addEventListener("keydown", function (t) { var e = this.parentNode; switch (t.keyCode) { case a: o = !0; var n = e.querySelectorAll(".t-menusub__link-item").length; if (t.shiftKey) 0 === y ? (p(_), t_menusub__hideSubmenu(r)) : b(e, y - 1); else if (y === n - 1) { if (t_menusub__hideSubmenu(r), _ === i.length - 1) return void i[_].setAttribute("tabindex", "0"); p(_ + 1) } else b(e, y + 1); break; case f: o = !0, p(_ + 1), t_menusub__hideSubmenu(r); break; case c: o = !0, p(_ - 1), t_menusub__hideSubmenu(r); break; case l: case s: o = !1, t_menusub__hideSubmenu(r); break; case u: o = !0, p(_), t_menusub__hideSubmenu(r); break; case m: o = !0, b(e, y + 1); break; case d: o = !0, b(e, y - 1) }o && (t.preventDefault(), t.stopPropagation()) }) })) }