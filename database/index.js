const { PrismaClient } = require('@prisma/client');
const prompts = require('prompts');

const prisma = new PrismaClient();

module.exports = prisma;
