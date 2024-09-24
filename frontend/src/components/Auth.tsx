"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button';
import LabelledInput from '@/components/LabelledInput'
import { SigninInput, SignupInput } from '@anchalrajdevsys/lekha-common'
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import { SignupResponseData } from '@/interfaces/SignupResponseInterface';
import Cookie from 'js-cookie'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SigninResponseData } from '@/interfaces/SigninResponseData';

export const Auth = ({type} : {type: "signup" | "signin"}) => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [signupInput, setSignupInput] = useState<SignupInput>({
        name: "",
        userName: "",
        password: ""
    })
    const [signinInput, setSigninInput] = useState<SigninInput>({
        userName: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState({signin: false, signup: false});

    const router = useRouter();

    const signUpChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSignupInput({
            ...signupInput,
            [e.target.name] : e.target.value
        })
    }

    const signInChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSigninInput({
            ...signinInput,
            [e.target.name] : e.target.value
        })
    }

    const handleSignupSubmission = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading((prev) => ({...prev, signup: true}));
            const { data } : AxiosResponse<SignupResponseData> = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput);
            if(data.status !== 200) {
                toast.error(data.message)
            } else {
                const { accessToken, refreshToken  } = data;
                if (accessToken) {
                    Cookie.set('accessToken', accessToken);
                }
                if (refreshToken) {
                    Cookie.set('refreshToken', refreshToken);
                }
                toast.success(data.message || "User signed up successfully!");
                router.replace('/blogs');
            }
            setIsLoading((prev) => ({...prev, signup: false}));
        } catch (error) {
           if(error instanceof Error) {
            toast.error(error.message);
           } else {
                toast.error("Unknow error while signing up...")
           }
           setIsLoading((prev) => ({...prev, signup: false}));
        }
    }

    const handleSigninSubmission = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading((prev) => ({...prev, signin: true}));
            const { data }: AxiosResponse<SigninResponseData> = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInput);
            if(data.status !== 200) {
                toast.error(data.message);
            } else {
                const { accessToken, refreshToken  } = data;
                if (accessToken) {
                    Cookie.set('accessToken', accessToken);
                }
                if (refreshToken) {
                    Cookie.set('refreshToken', refreshToken);
                }
                toast.success(data.message || "User signed up successfully!");
                router.replace('/blogs');
            }
            setIsLoading((prev) => ({...prev, signin: false}));
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Unknow error while signin...")
            }
            setIsLoading((prev) => ({...prev, signin: false}));
        }
    }

  return (
    <div className="min-h-screen w-full bg-teal-50 flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="md:bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="text-center text-teal-800">
                <h1 className="text-3xl font-bold">
                    {type === "signup" ? "Sign Up" : "Sign In"}
                </h1>
                <p className="text-muted-foreground">
                    {type === "signup" ? "Create your account" : "Sign In to your account"}
                </p>
            </div>
            <form
                onSubmit={type === "signup" ? handleSignupSubmission : handleSigninSubmission}
                className="space-y-4"
            >
                {
                    type === 'signup' && <LabelledInput
                                            label='name'
                                            id='name'
                                            placeholder="Enter your name"
                                            type="text"
                                            changeHandler={signUpChangeHandler}
                                        />
                }
                <LabelledInput
                    label='email'
                    id='userName'
                    placeholder="Enter your username"
                    type="email"
                    changeHandler={type === 'signup' ? signUpChangeHandler : signInChangeHandler}
                />
                <LabelledInput
                    label='password'
                    id='password'
                    placeholder="Enter your password"
                    type="password"
                    changeHandler={type === 'signup' ? signUpChangeHandler : signInChangeHandler}
                />
                <Button
                    type="submit"
                    className="w-full bg-teal-700 hover:bg-teal-600 text-white"
                >
                    {type === 'signup' && (isLoading.signup ? "...loading" : "Signup")}
                    {type === 'signin' && (isLoading.signin ? "...loading" : "Signin")}
                </Button>
            </form>
            <div className="text-center text-muted-foreground mt-5">
                {
                    type === "signup" ? "Already have an account ?" : "Don't have an account ?"
                }
                {" "}
                <Link href={type === "signup" ? "/publicRoutes/signin" : "/publicRoutes/signup"} className="font-medium hover:underline">
                {type === "signup" ? "Sign In" : "Sign Up"}
                </Link>
            </div>
        </div>
    </div>
  )
}
