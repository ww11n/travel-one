"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 假设用户未登录

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary-red">
                中国旅游
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/"
                className="border-transparent text-gray-500 hover:border-primary-red hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                首页
              </Link>
              <Link 
                href="/destinations"
                className="border-transparent text-gray-500 hover:border-primary-red hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                目的地
              </Link>
              <Link 
                href="/map"
                className="border-transparent text-gray-500 hover:border-primary-red hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                地图
              </Link>
              <Link 
                href="/guides"
                className="border-transparent text-gray-500 hover:border-primary-red hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                旅游攻略
              </Link>
              <Link 
                href="/about"
                className="border-transparent text-gray-500 hover:border-primary-red hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                关于我们
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <LanguageSwitcher />
            
            {isLoggedIn ? (
              <div className="relative">
                <Link href="/user/profile" className="flex items-center space-x-1">
                  <div className="h-8 w-8 rounded-full bg-primary-blue text-white flex items-center justify-center">
                    JD
                  </div>
                  <span className="hidden md:inline text-sm font-medium text-gray-700">John Doe</span>
                </Link>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary-red text-white hover:bg-opacity-90 px-3 py-2 rounded-md text-sm font-medium"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-red"
              onClick={toggleMenu}
            >
              <span className="sr-only">打开主菜单</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
          >
            首页
          </Link>
          <Link
            href="/destinations"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
          >
            目的地
          </Link>
          <Link
            href="/map"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
          >
            地图
          </Link>
          <Link
            href="/guides"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
          >
            旅游攻略
          </Link>
          <Link
            href="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
          >
            关于我们
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <LanguageSwitcher />
          </div>
          <div className="mt-3 space-y-1">
            {isLoggedIn ? (
              <>
                <Link
                  href="/user/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
                >
                  个人中心
                </Link>
                <button
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
                  onClick={() => console.log('Logout clicked')}
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary-red hover:text-gray-800"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 