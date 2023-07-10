import { cookies } from 'next/headers'
import Link from 'next/link';
import LoginForm from './LoginForm';
import Feed from '@/app/Feed';

export default async function Home() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('token');

  if (tokenCookie) {
    const token = tokenCookie.value as string;

    return (
      <Feed token={token}/>
    )
  }

  async function handleSubmit(e: any) {

  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <LoginForm />
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
