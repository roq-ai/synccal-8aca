import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { contentCategoryValidationSchema } from 'validationSchema/content-categories';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.content_category
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getContentCategoryById();
    case 'PUT':
      return updateContentCategoryById();
    case 'DELETE':
      return deleteContentCategoryById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContentCategoryById() {
    const data = await prisma.content_category.findFirst(convertQueryToPrismaUtil(req.query, 'content_category'));
    return res.status(200).json(data);
  }

  async function updateContentCategoryById() {
    await contentCategoryValidationSchema.validate(req.body);
    const data = await prisma.content_category.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteContentCategoryById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.content_category.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
