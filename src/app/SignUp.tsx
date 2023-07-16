"use client";

import Link from 'next/link';
import LoginForm from './LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectChallengeRequired, setAuthState, setChallengeRequired } from '@/store/authSlice';

export default function SignUp() {

  const dispatch = useDispatch();
  const challengeRequired = useSelector(selectChallengeRequired);

  const continueAction = () => {
    dispatch(setChallengeRequired(false));
    dispatch(setAuthState(true));
    window.location.reload();
  }

  if (challengeRequired) {

    // Present a dialogue telling the user they need to approve a challenge
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Logo
          </h1>
          <p className="mt-4 text-sm text-center text-gray-700">
            Please check your email and approve the challenge.<br />
            Once this is complete, press the button below.
            <br/><br/>
            <span className="text-center block">
              <button className="justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 hover:border-blue-800 hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto" onClick={continueAction}>
                Continue
              </button>
            </span>
          </p>
        </div>
      </div>
    )
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
