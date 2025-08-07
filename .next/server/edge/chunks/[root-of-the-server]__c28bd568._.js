(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__c28bd568._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/src/lib/auth.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "signToken": ()=>signToken,
    "verifyToken": ()=>verifyToken
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
;
// Load the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
// Throw an error if no secret is defined (stops server from starting without one)
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}
// Convert the secret string to Uint8Array (required by jose)
const encoder = new TextEncoder();
const secret = encoder.encode(JWT_SECRET);
async function signToken(payload, expiresIn = "15m") {
    // Get current time in seconds
    const now = Math.floor(Date.now() / 1000);
    // Calculate expiration time in seconds
    let exp;
    if (expiresIn.endsWith("m")) {
        exp = now + parseInt(expiresIn) * 60; // minutes
    } else if (expiresIn.endsWith("h")) {
        exp = now + parseInt(expiresIn) * 60 * 60; // hours
    } else if (expiresIn.endsWith("d")) {
        exp = now + parseInt(expiresIn) * 60 * 60 * 24; // days
    } else {
        exp = now + parseInt(expiresIn); // fallback: treat as seconds
    }
    // Create, sign, and return the JWT
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: "HS256"
    }) // Set algorithm
    .setIssuedAt(now) // Set issue time
    .setExpirationTime(exp) // Set expiration time
    .sign(secret); // Sign with secret
}
async function verifyToken(token) {
    // jose throws if invalid; otherwise returns decoded payload
    const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret);
    return payload;
}
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "config": ()=>config,
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    // Extract the JWT token from cookies
    const token = request.cookies.get("auth_token")?.value;
    // Log the JWT_SECRET and token for debugging purposes (to be removed in production)
    console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
    console.log("Token in middleware:", token);
    // If no token is found, redirect to sign-in page
    if (!token) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/sign-in", request.url));
    }
    try {
        // Verify the token using jose (async function)
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["verifyToken"])(token);
        // If token is valid, proceed to the requested page
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } catch (e) {
        // If token verification fails, log the error and redirect to sign-in page
        console.log("Token verification failed in middleware:", e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/sign-in", request.url));
    }
}
const config = {
    matcher: [
        "/dashboard/:path*"
    ]
};
}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c28bd568._.js.map