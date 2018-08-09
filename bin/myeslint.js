#!/usr/bin/env node

var cli = require("../lib/index");
cli.execute(Array.prototype.slice.call(process.argv, 2));

