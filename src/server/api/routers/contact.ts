import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      sender: z.string().min(1),
      email: z.string().min(1),
      message: z.string().min(1),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.contactMessage.create({
        data: {
          sender: input.sender,
          email: input.email,
          message: input.message,
        }
      })
    }),

  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.contactMessage.findMany({})
    })

});
