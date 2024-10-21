'use client';

import Image from 'next/image';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-custom-sky-light">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-2 rounded-xl bg-white p-12 shadow-xl"
        >
          <h1 className="flex items-center justify-center gap-2 text-center text-xl font-semibold">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            School Dashboard Pro
          </h1>
          <h2 className="text-center text-sm font-medium text-gray-400">Sign in to your account</h2>

          <Clerk.GlobalError className="text-sm text-red-500" />

          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              className="rounded-md p-1.5 ring-1 ring-gray-400"
              required
            ></Clerk.Input>
            <Clerk.FieldError className="text-sm text-red-500" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">Password</Clerk.Label>
            <Clerk.Input
              type="password"
              className="rounded-md p-1.5 ring-1 ring-gray-400"
              required
            ></Clerk.Input>
            <Clerk.FieldError className="text-sm text-red-500" />
          </Clerk.Field>

          <SignIn.Action submit className="mt-2 rounded-md bg-blue-500 p-2 text-white">
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
