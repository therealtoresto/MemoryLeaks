'use strict';

const { EventEmitter } = require('events');

const memory = [];

const bytesToMb = bytes => Math.round(bytes / 1000, 2) / 1000;

let ee = new EventEmitter;

const timer = setInterval(() => {
    ee.on('eventName', () => {});
}, 5);

setInterval(() => {
    console.clear();
    const usage = process.memoryUsage();
    const row = {
        rss: bytesToMb(usage.rss), // process resident set size
        heapTotal: bytesToMb(usage.heapTotal), // v8 heap allocated
        heapUsed: bytesToMb(usage.heapUsed), // v8 heap used
        external: bytesToMb(usage.external), // C++ allocated
        stack: bytesToMb(usage.rss - usage.heapTotal), //stack
        listeners: ee.listeners('eventName').length,
    };
    memory.push(row);
    console.table(memory);
}, 1000);

setInterval(() => {
    clearInterval(timer);
}, 10000);

setTimeout(() => {
    process.exit(0);
}, 15000);

process.on('warning', warning => {
    console.dir(warning);
    // process.exit(0);
})