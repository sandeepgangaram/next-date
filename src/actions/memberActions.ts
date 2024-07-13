"use server";

import { Photo } from "@prisma/client";
import { auth } from "../auth";
import { prisma } from "../lib/prisma";
import { UserFilters } from "../types";
import { addYears } from "date-fns";

export async function getMembers(searchParams: UserFilters) {
  const session = await auth();
  if (!session?.user) return null;

  const ageRange = searchParams?.ageRange?.toString().split(",") || [18, 100];
  const currentDate = new Date();
  const minDob = addYears(currentDate, -ageRange[1] - 1);
  const maxDob = addYears(currentDate, -ageRange[0]);

  const orderBySelector = searchParams?.orderBy || "updated";
  const selectedGender = searchParams?.gender?.toString()?.split(",") || [
    "male",
    "female",
  ];

  try {
    return prisma.member.findMany({
      where: {
        AND: [
          { dateOfBirth: { gte: minDob } },
          { dateOfBirth: { lte: maxDob } },
          { gender: { in: selectedGender } },
        ],
        NOT: {
          userId: session.user.id,
        },
      },
      orderBy: { [orderBySelector]: "desc" },
    });
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
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    });

    if (!member) return null;

    return member.photos as Photo[];
  } catch (error) {
    console.log(error);
  }
}
