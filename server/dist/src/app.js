"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const orders_1 = __importDefault(require("./routes/orders"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', orders_1.default);
app.listen(3001, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0::${PORT}`);
});
