"use server";

import { Member, Photo } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { GetMemberParams, PaginatedResponse, UserFilters } from "../types";
import { addYears } from "date-fns";
import { getAuthUserIdFromSession } from "./authActions";

export async function getMembers({
  ageRange = "18,100",
  gender = "male,female",
  orderBy = "updated",
  pageNumber = "1",
  pageSize = "12",
  withPhotos = "false",
}: GetMemberParams): Promise<PaginatedResponse<Member>> {
  const userId = await getAuthUserIdFromSession();
  const [minAge, maxAge] = ageRange.split(",");
  const currentDate = new Date();
  const minDob = addYears(currentDate, -maxAge - 1);
  const maxDob = addYears(currentDate, -minAge);

  const selectedGender = gender?.split(",");
  const page = parseInt(pageNumber);
  const limit = parseInt(pageSize);

  const skip = (page - 1) * limit;

  try {
    const count = await prisma.member.count({
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          ...(withPhotos === "true" ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId: userId,
        },
      },
    });
    const members = await prisma.member.findMany({
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
          ...(withPhotos === "true" ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId: userId,
        },
      },
      orderBy: { [orderBy]: "desc" },
      skip,
      take: limit,
    });

    return {
      items: members,
      totalCount: count,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({
      where: { userId },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  const currentUserId = await getAuthUserIdFromSession();
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: {
        photos: {
          where: currentUserId === userId ? {} : { isApproved: true },
        },
      },
    });

    if (!member) return null;

    return member.photos as Photo[];
  } catch (error) {
    console.log(error);
  }
}
