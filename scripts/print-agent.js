/**
 * Agente local de impresión — WebSocket bridge para impresora USB/CUPS.
 *
 * Instalar dependencia:  npm install ws
 * Ejecutar:              node scripts/print-agent.js
 *
 * El navegador (React) se conecta a ws://localhost:8765, envía los bytes
 * ESC/POS obtenidos del backend, y este script los manda a la impresora
 * usando CUPS (macOS/Linux) o copia directa (Windows).
 *
 * Variables de entorno:
 *   PRINTER_NAME  Nombre de la cola CUPS (default: OFICHIDO_POS_58)
 *   AGENT_PORT    Puerto WebSocket (default: 8765)
 */

const { WebSocketServer } = require("ws");
const { exec }            = require("child_process");
const fs                  = require("fs");
const os                  = require("os");
const path                = require("path");

const PRINTER = process.env.PRINTER_NAME || "OFICHIDO_POS_58";
const PORT    = parseInt(process.env.AGENT_PORT || "8765", 10);

// ─── Impresión ────────────────────────────────────────────────────────────────

function printBytes(data, callback) {
    const tmpFile = path.join(os.tmpdir(), `ticket-${Date.now()}.bin`);
    fs.writeFileSync(tmpFile, data);

    const platform = process.platform;

    if (platform === "darwin" || platform === "linux") {
        // macOS / Linux — CUPS con raw para evitar filtros PDF
        const cmd = `lp -d "${PRINTER}" -o raw "${tmpFile}"`;
        exec(cmd, (err, _stdout, stderr) => {
            fs.unlinkSync(tmpFile);
            if (err) return callback(new Error(stderr || err.message));
            callback(null);
        });
    } else if (platform === "win32") {
        // Windows — copia directa al recurso compartido
        const cmd = `copy /b "${tmpFile}" "\\\\localhost\\${PRINTER}"`;
        exec(cmd, (err, _stdout, stderr) => {
            fs.unlinkSync(tmpFile);
            if (err) return callback(new Error(stderr || err.message));
            callback(null);
        });
    } else {
        fs.unlinkSync(tmpFile);
        callback(new Error(`Plataforma no soportada: ${platform}`));
    }
}

// ─── WebSocket Server ─────────────────────────────────────────────────────────

const wss = new WebSocketServer({ port: PORT, host: "127.0.0.1" });

console.log(`[print-agent] Escuchando en ws://localhost:${PORT}`);
console.log(`[print-agent] Impresora: ${PRINTER}`);

wss.on("connection", (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`[print-agent] Navegador conectado desde ${ip}`);

    ws.on("message", (data) => {
        console.log(`[print-agent] Recibidos ${data.length} bytes`);

        printBytes(data, (err) => {
            if (err) {
                console.error("[print-agent] Error al imprimir:", err.message);
                ws.send(JSON.stringify({ ok: false, error: err.message }));
            } else {
                console.log("[print-agent] Impresión OK");
                ws.send(JSON.stringify({ ok: true }));
            }
        });
    });

    ws.on("close",   () => console.log("[print-agent] Navegador desconectado"));
    ws.on("error",   (err) => console.error("[print-agent] Error WS:", err.message));
});

wss.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`[print-agent] Puerto ${PORT} en uso. ¿Ya está corriendo el agente?`);
    } else {
        console.error("[print-agent] Error del servidor:", err.message);
    }
    process.exit(1);
});
