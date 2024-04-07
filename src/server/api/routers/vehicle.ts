import { z } from "zod";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const vehicleRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      model: z.string().min(1),
      year: z.number(),
      fuel: z.string().min(1),
      email: z.string().email().min(1),
      price: z.string().min(1),
      type: z.enum(["carros", "motos", "caminhoes"])
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.vehicleSale.create({
        data: {
          model: input.model,
          year: input.year,
          fuel: input.fuel,
          price: input.price,
          email: input.email,
          type: input.type,
        }
      })
    }),

  getAllFromType: publicProcedure
    .input(z.object({
      type: z.enum(["carros", "motos", "caminhoes"])
    }))
    .query(({ ctx, input }) => {
      return ctx.db.vehicleSale.findMany({
        where: {
          type: input.type
        }
      })
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.string().min(1),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.vehicleSale.delete({
        where: {
          id: input.id
        }
      })
    }),

  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.vehicleSale.findMany({})
    })

});
