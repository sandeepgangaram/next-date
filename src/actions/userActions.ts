"use server";

import { Member, Photo } from "@prisma/client";
import {
  MemberEditSchema,
  memberEditSchema,
} from "../lib/schemas/memberEditSchema";
import { ActionResult } from "../types";
import { getAuthUserIdFromSession } from "./authActions";
import { prisma } from "../lib/prisma";
import { cloudinary } from "../lib/cloudinary";

export async function updateMemberProfile(
  data: MemberEditSchema,
  isNameUpdated: boolean
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserIdFromSession();

    const validated = memberEditSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, description, city, country } = validated.data;

    if (isNameUpdated) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
    }
    const member = await prisma.member.update({
      where: {
        userId,
      },
      data: {
        name,
        description,
        city,
        country,
      },
    });

    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong!" };
  }
}

export async function addImage(url: string, publicId: string) {
  try {
    const userId = await getAuthUserIdFromSession();

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  try {
    const userId = await getAuthUserIdFromSession();

    await prisma.user.update({
      where: { id: userId },
      data: { image: photo.url },
    });

    await prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteImage(photo: Photo) {
  try {
    const userId = await getAuthUserIdFromSession();

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    await prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserIdFromSession();
    return prisma.user.findUnique({
      where: { id: userId },
      select: { image: true, name: true },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
