import pkg from '@prisma/client'

const { PrismaClient } = pkg

// Single shared Prisma instance across the app (avoids exhausting DB
// connections when this module is imported in multiple places).
export const prisma = new PrismaClient()
