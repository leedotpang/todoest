import { createRouter } from "./context";
import { z } from "zod";

export const todoRouter = createRouter()
  .mutation("create", {
    input: z.object({
      userId: z.string(),
      description: z.string(),
    }),
    async resolve({ ctx, input }) {
      const todo = await ctx.prisma.todo.create({
        data: {
          description: input.description,
          userId: input.userId
        }
      });

      console.log(todo)

      return {
        "message": "Created todo successfully",
        todo
      };
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      description: z.string().nullish(),
      status: z.enum(["done", "active"]).nullish()
    }),
    async resolve({ ctx, input }) {
      const todo = await ctx.prisma.todo.update({
        where: {
          id: input.id
        },
        data: {
          ...(input?.description && { description: input.description }),
          ...(input?.status && { status: input.status }),
        }
      });

      return todo;
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.todo.delete({
        where: {
          id: input.id
        },
      });

      return {
        "message": "successfully deleted todo",
        "id": input.id
      };
    }
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const todos = await ctx.prisma.todo.findMany({
        where: {
          userId: {
            equals: ctx.session?.user?.id
          }
        }
      });
      return todos || [];
    },
  });
