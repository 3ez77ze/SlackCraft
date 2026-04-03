const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// security headers for WASM
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

// serve frontend
app.use(express.static(__dirname));

// WASM proxy
app.use("/wasm", createProxyMiddleware({
    target: "https://x.mess.eu.org",
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/wasm/, "/ninja-wasm"),
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader("Origin", "https://x.mess.eu.org");
    }
}));

// JS proxy
app.use("/js", createProxyMiddleware({
    target: "https://x.mess.eu.org",
    changeOrigin: true,
    secure: true,
    pathRewrite: (path) => path.replace(/^\/js/, "/ninja-js"),
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader("Origin", "https://x.mess.eu.org");
    }
}));

// fallback error handler
app.use((err, req, res, next) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
});

app.listen(3000, () => {
    console.log("✅ SlackCraft running at http://localhost:3000");
});
