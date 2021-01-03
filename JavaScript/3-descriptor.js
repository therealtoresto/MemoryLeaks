'use strict';

const fs = require('fs');

const memory = [];

const bytesToMb = bytes => Math.round(bytes / 1000, 2) / 1000;

let descriptor = 0;

const timer = setInterval(() => {
    for(let i = 0; i < 3; i++) {
        fs.open('3-descriptor.js', 'r', (err, fd) => {
            descriptor = fd;
        });
    }
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
        descriptor,
    };
    memory.push(row);
    console.table(memory);
}, 1000);

setInterval(() => {
    clearInterval(timer);
}, 10000);

setTimeout(() => {
    process.exit(0);
}, 15000)