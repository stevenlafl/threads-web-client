import { cookies } from 'next/headers'
import Link from 'next/link';
import LoginForm from '../../LoginForm';
import Feed from '@/app/Feed';

export default function Page({ params }: { params: { slug: string } }) {

  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('token');

  const post_id = params.slug;

  if (tokenCookie) {
    const token = tokenCookie.value as string;

    return (
      <Feed token={token} post_id={post_id}/>
    )
  }

  async function handleSubmit(e: any) {

  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Logo
        </h1>
        <LoginForm />
        <p className="mt-4 text-sm text-center text-gray-700">
          Don&apos;t have an account?
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
