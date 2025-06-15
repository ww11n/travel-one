import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">注册账户</h2>
          <p className="mt-2 text-sm text-gray-600">
            或{' '}
            <Link href="/auth/login" className="font-medium text-primary-blue hover:text-opacity-80">
              登录已有账户
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="姓名"
              placeholder="请输入您的姓名"
            />
            
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="电子邮箱"
              placeholder="请输入您的电子邮箱"
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              label="密码"
              placeholder="请设置密码"
            />
            
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              label="确认密码"
              placeholder="请再次输入密码"
            />
          </div>
          
          <div>
            <Button type="submit" className="w-full">
              注册
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                或通过第三方账号注册
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
            >
              <span className="sr-only">使用Google注册</span>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  fill="#4285F4"
                />
              </svg>
              Google
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
            >
              <span className="sr-only">使用Facebook注册</span>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  fill="#1877F2"
                />
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 